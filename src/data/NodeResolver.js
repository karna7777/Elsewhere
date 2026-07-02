import destinations from './destinations.js'
import { LOCATION_TYPES } from '../constants.js'

// ─────────────────────────────────────────────────────────────────────────────
// NodeResolver — PURE data-resolution layer.
//
// Single responsibility: turn a query into a normalized, immutable LocationNode.
// It NEVER discovers nearby places, computes similarity/recommendations, filters,
// or ranks — that is the DiscoveryEngine's job. The curated dataset
// is never mutated; every result is a fresh spread copy tagged `_resolved`.
//
// ── LocationNode contract ────────────────────────────────────────────────────
// A LocationNode is a normalized copy of any explorable place. After resolveNode()
// these fields are GUARANTEED:
//
//   id        {string}  Stable, unique. Curated nodes keep their dataset id;
//                       children are namespaced under their parent: `${parentId}:${slug}`.
//   name      {string}  Display label (falls back to `title` upstream).
//   type      {LocationType}  One of LOCATION_TYPES (see constants.js):
//                       'continent' | 'country' | 'state' | 'city' | 'landmark' | 'sublocation'.
//                       Drives camera framing only — never which UI renders.
//   _resolved {true}    Marks the object as already normalized (idempotent).
//
// All other source fields (lat, lng, continent, country, wonders, story, etc.) are
// carried through untouched. Optional fields a node MAY carry:
//   lat, lng  {number}  Coordinates. When absent the camera holds position
//                       (we never invent coordinates).
//   parentId  {string}  The id of the level this node was drilled from.
//
// Input queries accepted: a dataset destination object, a child node object, or a
// string (matched against dataset id, then name). Returns null for unknown input.
// ─────────────────────────────────────────────────────────────────────────────

function slug(str) {
  return String(str ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// A stable id for nodes that lack one (curated destinations already have `id`;
// children like wonders/gems/adventures don't). Namespaced under their parent so
// two parents can each have a "Sunrise Hike" without colliding.
function makeId(node) {
  const base = slug(node?.name ?? node?.title)
  return node?.parentId ? `${node.parentId}:${base}` : base || 'node'
}

// inferType() is a FALLBACK only — an existing (supported) `type` always wins
// (see resolveNode). It only ever returns a value from LOCATION_TYPES; with the
// signals available it infers a safe subset ('city' | 'landmark' | 'sublocation').
// The remaining types ('continent' | 'country' | 'state') are reached by a node
// declaring `type` explicitly. Type never selects which UI renders.
export function inferType(node) {
  if (!node) return 'sublocation'
  // A drilled child of another node.
  if (node.parentId) return 'sublocation'
  // A curated top-level place carries continent/country + rich sub-content.
  if (node.continent && node.country && (node.wonders || node.hiddenGems || node.heroMedia)) {
    return 'city'
  }
  // Anything else that sits on the map but isn't a curated place.
  if (node.lat != null && node.lng != null) return 'landmark'
  return 'sublocation'
}

// Guard: never let an unsupported type through (e.g. a stray legacy value).
function normalizeType(node) {
  const t = node?.type
  return LOCATION_TYPES.includes(t) ? t : inferType(node)
}

function findInDataset(query) {
  const q = String(query).toLowerCase()
  return (
    destinations.find((d) => d.id === query) ||
    destinations.find((d) => d.name.toLowerCase() === q) ||
    null
  )
}

// Resolve a query into a normalized LocationNode (immutable copy), or null.
export function resolveNode(query) {
  if (!query) return null

  // Already resolved — use directly (still returns the same normalized object).
  if (typeof query === 'object' && query._resolved) return query

  const raw = typeof query === 'string' ? findInDataset(query) : query
  if (!raw) return null

  // Priority: a supported existing type is authoritative; inferType is the
  // fallback. normalizeType also rejects any unsupported/legacy type value.
  return {
    ...raw,
    id: raw.id ?? makeId(raw),
    type: normalizeType(raw),
    _resolved: true,
  }
}

export default resolveNode
