// Icon per worldwide search-result type. Curated results use their own flag; this
// covers the geocoder's place vocabulary. Unknown types fall back to a pin.
const ICON_BY_TYPE = {
  country: '🌍',
  state: '🗺️',
  province: '🗺️',
  region: '🗺️',
  city: '🏙️',
  village: '🏡',
  suburb: '🏙️',
  landmark: '📍',
  monument: '🏛️',
  museum: '🖼️',
  mountain: '🏔️',
  lake: '🏞️',
  river: '🏞️',
  beach: '🏖️',
  island: '🏝️',
  forest: '🌲',
  airport: '✈️',
  park: '🌳',
  attraction: '📍',
}

export function iconForType(type) {
  return ICON_BY_TYPE[type] ?? '📍'
}
