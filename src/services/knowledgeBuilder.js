import { fetchPexelsPhoto } from '../utils/imageCache.js'
import { prefetchWeather } from '../hooks/useWeather.js'

// The single factual layer for a searched place. Given the basic Geoapify facts it
// gathers everything Elsewhere knows about a location from external sources — in
// parallel — and returns one KnowledgeObject. It never uses Groq and generates no
// prose: facts only. Every source fails independently; a KnowledgeObject is always
// returned, with missing data as null / [].
//
// Pexels (media) and OpenWeather (weather/timezone) reuse the existing app
// services — never re-implemented. Wikipedia and Wikimedia Commons have no existing
// helper, so their read-only public endpoints are called here.

const FETCH_TIMEOUT_MS = 6000

// A fetch that aborts after a timeout, so a slow public API can never stall the
// background enrichment indefinitely.
async function timedFetch(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

// The basic facts every downstream layer needs, taken straight from the geocoder
// result. Shared so the resolver (instant fly) and buildKnowledge agree exactly.
export function basicFromResult(result) {
  return {
    id: result?.id ?? null,
    name: result?.name ?? '',
    country: result?.country ?? '',
    state: result?.state ?? '',
    continent: result?.continent ?? '',
    lat: result?.lat ?? null,
    lng: result?.lng ?? null,
    type: result?.type ?? null,
    bbox: result?.bbox ?? null,
  }
}

// Wikipedia REST summary — a factual extract, canonical title and page URL.
async function fetchWikipedia(name) {
  if (!name) return null
  try {
    const res = await timedFetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
      { headers: { accept: 'application/json' } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (data.type === 'disambiguation') return null
    const summary = typeof data.extract === 'string' ? data.extract.trim() : ''
    if (!summary) return null
    return {
      title: data.title ?? name,
      summary,
      url: data.content_urls?.desktop?.page ?? null,
    }
  } catch {
    return null
  }
}

// Wikimedia Commons image search — freely-licensed photographs of the place.
// Fetches a generous set and keeps only real photos (drops SVG maps, PDFs, icons)
// so the gallery is varied rather than "the same landmark from four angles".
async function fetchCommonsImages(name) {
  if (!name) return []
  try {
    const url =
      'https://commons.wikimedia.org/w/api.php?origin=*&format=json&action=query' +
      '&generator=search&gsrnamespace=6&gsrlimit=24' +
      `&gsrsearch=${encodeURIComponent(name)}` +
      '&prop=imageinfo&iiprop=url&iiurlwidth=1200'
    const res = await timedFetch(url)
    if (!res.ok) return []
    const data = await res.json()
    const pages = data?.query?.pages
    if (!pages) return []
    const urls = Object.values(pages)
      .map((p) => p.imageinfo?.[0]?.thumburl ?? p.imageinfo?.[0]?.url ?? null)
      .filter((u) => u && /\.(jpe?g|png)/i.test(u)) // photos only, no svg/pdf/tif maps
    return [...new Set(urls)] // dedupe
  } catch {
    return []
  }
}

// OpenWeather returns a UTC offset in seconds; present it as "UTC±HH:MM".
function formatTimezone(offsetSeconds) {
  if (offsetSeconds == null) return null
  const sign = offsetSeconds < 0 ? '-' : '+'
  const abs = Math.abs(offsetSeconds)
  const hh = String(Math.floor(abs / 3600)).padStart(2, '0')
  const mm = String(Math.floor((abs % 3600) / 60)).padStart(2, '0')
  return `UTC${sign}${hh}:${mm}`
}

export async function buildKnowledge(location) {
  const { name, country, lat, lng } = location ?? {}
  const imageQuery = `${name ?? ''} ${country ?? ''}`.trim()

  // Everything in parallel — never sequential. Each source is guarded so one
  // failure never stops the others, and the whole thing always resolves.
  const [wikipedia, commonsImages, photo, weatherData] = await Promise.all([
    fetchWikipedia(name).catch(() => null),
    fetchCommonsImages(name).catch(() => []),
    fetchPexelsPhoto(imageQuery).catch(() => null),
    prefetchWeather(lat, lng).catch(() => null),
  ])

  const weather = weatherData?.weather
    ? {
        current: weatherData.weather.description || weatherData.weather.main,
        temperature: weatherData.weather.temp,
        icon: weatherData.weather.icon,
      }
    : null

  const timezone = weatherData
    ? { label: formatTimezone(weatherData.timezone), offsetSeconds: weatherData.timezone ?? null }
    : null

  return {
    basic: basicFromResult(location),
    wikipedia,
    media: {
      hero: photo?.url ?? null,
      photographer: photo?.photographer ?? null,
      commonsImages,
    },
    weather,
    timezone,
    // Carried so the destination's heroMedia can drive HeroSection's cache-warm load.
    imageQuery,
  }
}

export default buildKnowledge
