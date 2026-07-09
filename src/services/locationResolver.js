import { basicFromResult } from './knowledgeBuilder.js'
import { createTemporaryDestination, idForResult } from './temporaryDestination.js'
import destinationRepository from './destinationRepository.js'

// Resolves a raw worldwide search result into a first-class Elsewhere destination
// INSTANTLY — from the geocoder facts alone, with zero network — so navigation can
// fly the moment the user selects. The heavy factual layer (Wikipedia, Wikimedia,
// Pexels, weather) and the AI composition both stream in afterwards, in the
// background, via the repository. The resolver never blocks on either.

export function resolveTemporaryLocation(result) {
  if (!result || result.lat == null || result.lng == null) return null

  // The repository is the single source of truth and the dedup point: a place
  // already resolved this session (facts + any streamed enrichment) is returned.
  const id = idForResult(result)
  const existing = destinationRepository.get(id)
  if (existing) return existing

  // Facts-only knowledge — no APIs. Media / weather / Wikipedia arrive later.
  const basic = basicFromResult(result)
  const imageQuery = `${basic.name ?? ''} ${basic.country ?? ''}`.trim()
  const location = createTemporaryDestination({ basic, imageQuery })

  destinationRepository.set(location)
  return location
}

export default resolveTemporaryLocation
