import { createDestinationSkeleton } from './destinationSchema.js'

// Geocoder place types → the camera-framing level the navigation pipeline expects.
// Anything that isn't an administrative area is framed as a landmark.
const LEVEL_BY_TYPE = {
  country: 'country',
  state: 'state',
  province: 'state',
  city: 'city',
  village: 'city',
  suburb: 'city',
}

// Stable destination id for a searched place. Shared with the resolver so the
// repository lookup and the built destination always agree on the key.
export function idForResult(basic) {
  const key = `${basic.lat},${basic.lng}`
  return basic.id ? `tmp:${basic.id}` : `tmp:${basic.name}:${key}`
}

// A factual, non-fabricated hero line built only from real fields — used when
// Wikipedia has no summary. No AI, no generated prose.
function buildOverview(basic) {
  const where = [basic.state, basic.country].filter(Boolean).join(', ')
  const article = /^[aeiou]/i.test(basic.type || '') ? 'an' : 'a'
  const kind = basic.type || 'place'
  return where
    ? `${basic.name} is ${article} ${kind} in ${where}.`
    : `${basic.name} is ${article} ${kind}.`
}

// Builds the single Elsewhere destination shape from a KnowledgeObject: the known
// facts are mapped into the skeleton; the rich content stays as placeholders and
// is filled asynchronously by the AI Composer (via the repository). Purely
// synchronous and AI-free — this layer never knows Groq exists — so navigation
// can begin the instant the facts are ready.
export function createTemporaryDestination(knowledge) {
  const basic = knowledge?.basic ?? {}
  const media = knowledge?.media ?? {}
  const wiki = knowledge?.wikipedia ?? null

  const factualLine = buildOverview(basic)

  const destination = createDestinationSkeleton({
    id: idForResult(basic),
    name: basic.name,
    country: basic.country,
    state: basic.state,
    continent: basic.continent,
    lat: basic.lat,
    lng: basic.lng,
    bbox: basic.bbox,
    type: LEVEL_BY_TYPE[basic.type] ?? 'landmark',

    heroMedia: {
      imageQuery: knowledge?.imageQuery ?? `${basic.name ?? ''} ${basic.country ?? ''}`.trim(),
      url: media.hero ?? null,
      photographer: media.photographer ?? null,
    },
    heroQuote: factualLine, // short factual hero line (HeroSection renders this)
    overview: wiki?.summary ?? factualLine, // richer factual text (Wikipedia), stored
    weather: knowledge?.weather ?? null,
    timezone: knowledge?.timezone?.label ?? null,
  })

  // The full factual layer travels on the destination (the repository stores it).
  destination.knowledge = knowledge ?? null
  // Raw geocoder type drives fine camera framing (mountain / island / beach…).
  destination.placeType = basic.type ?? null
  // The AI Composer will fill the rich content in the background; the UI shows a
  // composing shimmer until this flips to 'ready' (or 'failed').
  destination.aiStatus = 'pending'

  return destination
}

export default createTemporaryDestination
