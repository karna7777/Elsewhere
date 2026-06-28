import destinations from '../data/destinations.js'
import { resolveNode } from '../data/NodeResolver.js'

// ─────────────────────────────────────────────────────────────────────────────
// discoveryUtils — PURE discovery algorithms (Prompt 10B-A foundation).
//
// No React. No Zustand. No API calls (no Pexels/Groq/Weather). No async. Given the
// same (node, radius, limit) these always return the same output. The curated
// dataset is NEVER mutated — we copy before sorting and every result is a fresh,
// resolved LocationNode (immediately usable by pushLevel() without normalization).
//
// Shared guarantees enforced by helpers below:
//   • exclude the current node              (Rule 8)
//   • dedupe by id                          (Rule 9)
//   • sort BEFORE slice                     (Rule 11)
//   • return <= limit                       (Rule 10)
//   • every result is a LocationNode        (Rule 5)
//
// ── RESOLUTION CONTRACT (owned here) ─────────────────────────────────────────
// Every LocationNode returned by ANY discovery helper is ALREADY
// NodeResolver-resolved before it leaves the helper. No helper ever returns a
// raw dataset object. Consumers MUST NOT call resolveNode() again — passing a
// discovery result straight to pushLevel(node) is correct and complete.
// (resolveNode is idempotent, but re-resolving is wasted work and a smell.)
// ─────────────────────────────────────────────────────────────────────────────

const EARTH_RADIUS_KM = 6371

function toRad(deg) {
  return (deg * Math.PI) / 180
}

function nodeId(node) {
  return node?.id ?? node?.name
}

// Resolve dataset objects into deduped LocationNodes. Dedupe happens here (by the
// resolved id) right before returning, after the caller has already sorted+sliced.
function toNodes(datasetObjects) {
  const seen = new Map()
  for (const d of datasetObjects) {
    const resolved = resolveNode(d)
    if (resolved && !seen.has(resolved.id)) seen.set(resolved.id, resolved)
  }
  return [...seen.values()]
}

// ── distanceKm — Haversine (Rule 12) ─────────────────────────────────────────
// Returns Infinity (never NaN, never throws) when any coordinate is missing or
// non-numeric, which naturally filters invalid locations out during sorting.
export function distanceKm(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Infinity
  const nums = [lat1, lng1, lat2, lng2].map(Number)
  if (nums.some((v) => Number.isNaN(v))) return Infinity
  const [a1, n1, a2, n2] = nums

  const dLat = toRad(a2 - a1)
  const dLng = toRad(n2 - n1)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a1)) * Math.cos(toRad(a2)) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return EARTH_RADIUS_KM * c
}

// ── getNearby — locations within radiusKm, nearest first ─────────────────────
// Returns NodeResolver-resolved LocationNodes (each carries a convenience
// `_distKm`); consumers pass them straight to pushLevel without re-resolving.
export function getNearby(node, radiusKm = 500, limit = 8) {
  // Gracefully handle a node without coordinates (Rule 7).
  if (!node || node.lat == null || node.lng == null) return []

  const currentId = nodeId(node)

  // Copy + measure (never sort the dataset in place, Rule 6).
  const within = []
  for (const dest of destinations) {
    if (nodeId(dest) === currentId) continue // exclude current (Rule 8)
    const dist = distanceKm(node.lat, node.lng, dest.lat, dest.lng)
    if (dist === Infinity || dist > radiusKm) continue
    within.push({ dest, dist })
  }

  // Sort ascending, THEN slice (Rule 11), THEN resolve (carrying _distKm).
  within.sort((a, b) => a.dist - b.dist)
  const sliced = within.slice(0, limit)

  const seen = new Map()
  for (const { dest, dist } of sliced) {
    const resolved = resolveNode({ ...dest, _distKm: dist })
    if (resolved && !seen.has(resolved.id)) seen.set(resolved.id, resolved)
  }
  return [...seen.values()]
}

// ── getSameCountry ───────────────────────────────────────────────────────────
// Preserves curated dataset order — there's no ranking metric here, and the
// dataset order is (eventually) intentional, so we never reorder it.
// Returns NodeResolver-resolved LocationNodes.
export function getSameCountry(node, limit = 8) {
  if (!node || !node.country) return []
  const currentId = nodeId(node)
  const matches = destinations.filter(
    (d) => d.country === node.country && nodeId(d) !== currentId
  )
  return toNodes(matches.slice(0, limit))
}

// ── getSameContinent ─────────────────────────────────────────────────────────
// Preserves curated dataset order (no ranking metric defined).
// Returns NodeResolver-resolved LocationNodes.
export function getSameContinent(node, limit = 8) {
  if (!node || !node.continent) return []
  const currentId = nodeId(node)
  const matches = destinations.filter(
    (d) => d.continent === node.continent && nodeId(d) !== currentId
  )
  return toNodes(matches.slice(0, limit))
}

// ── getSimilarVibes — mood overlap, most shared moods first ──────────────────
// Falls back to same-continent when the node has no moods. The internal overlap
// score is NEVER attached to a returned node. Returns NodeResolver-resolved
// LocationNodes (consumers must not re-resolve).
export function getSimilarVibes(node, limit = 8) {
  if (!node) return []
  if (!Array.isArray(node.moods) || node.moods.length === 0) {
    return getSameContinent(node, limit)
  }

  const currentId = nodeId(node)
  const moodSet = new Set(node.moods)

  const scored = []
  for (const d of destinations) {
    if (nodeId(d) === currentId) continue
    const overlap = (d.moods ?? []).reduce((n, m) => n + (moodSet.has(m) ? 1 : 0), 0)
    if (overlap > 0) scored.push({ d, overlap })
  }

  // Descending by overlap (stable ties keep dataset order), THEN slice.
  scored.sort((a, b) => b.overlap - a.overlap)
  return toNodes(scored.slice(0, limit).map((x) => x.d))
}

// ── getHiddenGemLocations — places rich in hidden gems ───────────────────────
// Sorted descending by hiddenGems count (a defined ranking metric).
// Returns NodeResolver-resolved LocationNodes (consumers must not re-resolve).
export function getHiddenGemLocations(node, limit = 8) {
  const currentId = nodeId(node)
  const matches = [...destinations]
    .filter((d) => (d.hiddenGems?.length ?? 0) >= 3 && nodeId(d) !== currentId)
    .sort((a, b) => (b.hiddenGems?.length ?? 0) - (a.hiddenGems?.length ?? 0))
  return toNodes(matches.slice(0, limit))
}
