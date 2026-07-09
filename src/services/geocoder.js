// Worldwide geocoding service. Pure and framework-agnostic: it knows nothing
// about React, the globe, the camera, or navigation. Given a text query it returns
// normalized place records for anything that exists geographically — countries,
// cities, natural features, and points of interest alike.
//
// Provider: Geoapify (the project's configured geocoder). No other provider is
// introduced. Results are cached in memory and failures degrade to an empty list.

const KEY = import.meta.env.VITE_GEOAPIFY_KEY
const ENDPOINT = 'https://api.geoapify.com/v1/geocode/autocomplete'
const LIMIT = 10
const MIN_QUERY = 2
const TTL = 10 * 60 * 1000 // 10 minutes

// query (normalized) -> { at, results }
const cache = new Map()

let warnedMissingKey = false

// Collapse Geoapify's result_type / category vocabulary into the place types the
// rest of Elsewhere understands.
function normalizeType(r) {
  const rt = (r.result_type || '').toLowerCase()
  const cat = (r.category || '').toLowerCase()

  if (rt === 'country') return 'country'
  if (rt === 'state') return 'state'
  if (rt === 'county') return 'province'
  if (rt === 'city') return 'city'
  if (rt === 'village' || rt === 'hamlet') return 'village'
  if (rt === 'suburb' || rt === 'district' || rt === 'neighbourhood' || rt === 'locality')
    return 'suburb'

  // Natural features + POIs are distinguished by category.
  if (cat.includes('mountain') || cat.includes('peak') || cat.includes('volcano')) return 'mountain'
  if (cat.includes('beach')) return 'beach'
  if (cat.includes('island') || cat.includes('islet') || cat.includes('archipelago')) return 'island'
  if (cat.includes('river') || cat.includes('stream') || cat.includes('waterway')) return 'river'
  if (cat.includes('lake') || cat.includes('reservoir') || cat.includes('water')) return 'lake'
  if (cat.includes('airport') || cat.includes('aeroway')) return 'airport'
  if (cat.includes('museum') || cat.includes('gallery')) return 'museum'
  if (cat.includes('monument') || cat.includes('memorial') || cat.includes('archaeolog'))
    return 'monument'
  if (cat.includes('national_park') || cat.includes('nature_reserve')) return 'park'
  if (cat.includes('forest') || cat.includes('wood')) return 'forest'
  if (cat.includes('park') || cat.includes('garden')) return 'park'
  if (
    cat.includes('historic') ||
    cat.includes('castle') ||
    cat.includes('ruins') ||
    cat.includes('landmark')
  )
    return 'landmark'
  if (cat.includes('tourism') || cat.includes('attraction')) return 'attraction'
  if (rt === 'amenity' || rt === 'building') return 'landmark'

  return 'attraction'
}

function normalize(r) {
  return {
    id: r.place_id ?? `${r.lat},${r.lon}`,
    name: r.name || r.address_line1 || r.formatted || '',
    type: normalizeType(r),
    country: r.country || '',
    state: r.state || r.county || '',
    lat: r.lat,
    lng: r.lon,
    bbox: r.bbox ? [r.bbox.lon1, r.bbox.lat1, r.bbox.lon2, r.bbox.lat2] : null,
    importance: r.rank?.importance ?? 0,
    // Kept only for ranking; stripped before results leave the service.
    _popularity: r.rank?.popularity ?? 0,
  }
}

// Order by importance, then popularity (population proxy), then exact match, then
// partial match — most significant / relevant places first.
function rank(results, query) {
  const q = query.toLowerCase()
  const exact = (r) => (r.name.toLowerCase() === q ? 1 : 0)
  const partial = (r) => (r.name.toLowerCase().includes(q) ? 1 : 0)
  return [...results]
    .sort((a, b) => {
      if (b.importance !== a.importance) return b.importance - a.importance
      if (b._popularity !== a._popularity) return b._popularity - a._popularity
      if (exact(b) !== exact(a)) return exact(b) - exact(a)
      return partial(b) - partial(a)
    })
    .slice(0, LIMIT)
    .map((r) => {
      const clean = { ...r }
      delete clean._popularity // drop the internal ranking field before returning
      return clean
    })
}

/**
 * Search anywhere in the world. Returns up to 10 normalized place records, or an
 * empty array on any failure (missing key, network error, abort, empty query).
 * Never throws.
 *
 * @param {string} query
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<Array>}
 */
export async function searchWorld(query, { signal } = {}) {
  const q = String(query ?? '').trim()
  if (q.length < MIN_QUERY) return []

  if (!KEY || KEY === 'your_key') {
    if (!warnedMissingKey) {
      warnedMissingKey = true
      console.warn('[Elsewhere] VITE_GEOAPIFY_KEY is missing — worldwide search is disabled.')
    }
    return []
  }

  const cacheKey = q.toLowerCase()
  const hit = cache.get(cacheKey)
  if (hit && Date.now() - hit.at < TTL) return hit.results

  try {
    const url =
      `${ENDPOINT}?text=${encodeURIComponent(q)}` +
      `&limit=${LIMIT}&format=json&apiKey=${KEY}`
    const res = await fetch(url, { signal })
    if (!res.ok) return []
    const data = await res.json()
    const results = rank((data.results ?? []).map(normalize), q)
    cache.set(cacheKey, { at: Date.now(), results })
    return results
  } catch {
    // Aborts (superseded keystrokes) and network failures both degrade silently.
    return []
  }
}

export default searchWorld
