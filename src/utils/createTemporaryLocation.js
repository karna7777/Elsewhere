import { resolveTemporaryLocation } from '../services/locationResolver.js'

// A searched place becomes a first-class destination from geocoder facts alone —
// synchronously, with no network — so navigation can fly immediately. The factual
// layer (Wikipedia, hero, weather) and the AI composition stream in afterwards via
// the repository. Delegates to the resolver so callers stay unaware of the details.
export function createTemporaryLocation(result) {
  return resolveTemporaryLocation(result)
}

export default createTemporaryLocation
