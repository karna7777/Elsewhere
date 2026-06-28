// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for level/camera constants. Do NOT redefine these
// values anywhere else — import from here so there's exactly one camera config.
// ─────────────────────────────────────────────────────────────────────────────

// The only supported LocationNode types. `type` never selects which UI renders;
// it tunes camera framing (below) and, later, discovery filters + AI behaviour.
export const LOCATION_TYPES = [
  'continent',
  'country',
  'state',
  'city',
  'landmark',
  'sublocation',
]

// Camera altitude per level = final camera.position.z passed to flyTo().
// `city` is 1.5 — identical to the prior hardcoded curated-destination flight,
// so the established arrival feel is preserved. Deeper levels frame tighter.
export const LEVEL_ALTITUDE = {
  continent: 2.6,
  country: 2.2,
  state: 1.8,
  city: 1.5,
  landmark: 1.2,
  sublocation: 1.15,
}

// Camera flight duration per level, in seconds. `city` is 2.8 — identical to
// the pipeline's default FLIGHT_DURATION, so the main flight is unchanged.
export const LEVEL_DURATION = {
  continent: 3.2,
  country: 3.0,
  state: 2.8,
  city: 2.8,
  landmark: 2.2,
  sublocation: 2.2,
}

// Fallback level when a node's type is missing/unknown — matches the curated
// destination feel (1.5 / 2.8).
export const DEFAULT_LEVEL = 'city'
