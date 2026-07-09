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

// Finer framing for worldwide search results, keyed by the raw geocoder place
// type (which distinguishes natural features the six canonical levels can't:
// mountains, islands, beaches…). Values are {altitude, duration} in the same
// units as LEVEL_ALTITUDE / LEVEL_DURATION and feed the very same flyTo — this is
// tuning, not a second camera system. The camera stays on the +Z axis (only its
// depth changes), so "elevated"/"lower" angles are expressed as altitude: islands
// and mountains sit higher/farther to convey scale; beaches frame lower/closer.
// Only searched nodes carry a placeType, so curated destinations never touch this.
export const PLACE_TYPE_FRAMING = {
  country: { altitude: 2.2, duration: 3.0 },
  state: { altitude: 1.8, duration: 2.8 },
  province: { altitude: 1.8, duration: 2.8 },
  city: { altitude: 1.5, duration: 2.8 },
  village: { altitude: 1.45, duration: 2.6 },
  suburb: { altitude: 1.4, duration: 2.6 },
  island: { altitude: 1.9, duration: 3.0 }, // medium-high
  mountain: { altitude: 1.7, duration: 2.8 }, // slightly elevated
  lake: { altitude: 1.7, duration: 2.8 },
  river: { altitude: 1.7, duration: 2.8 },
  beach: { altitude: 1.35, duration: 2.4 }, // lower, closer
  forest: { altitude: 1.6, duration: 2.6 },
  park: { altitude: 1.55, duration: 2.6 },
  museum: { altitude: 1.25, duration: 2.2 },
  monument: { altitude: 1.2, duration: 2.2 }, // closest
  landmark: { altitude: 1.2, duration: 2.2 }, // closest
  attraction: { altitude: 1.3, duration: 2.2 },
  airport: { altitude: 1.5, duration: 2.6 },
}
