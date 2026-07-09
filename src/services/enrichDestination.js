import { buildKnowledge } from './knowledgeBuilder.js'
import { composeDestination } from './AIComposer.js'
import destinationRepository from './destinationRepository.js'

// Background enrichment, run AFTER the instant fly. Two streamed stages, both
// patched into the repository (which flows to the store and UI):
//   1) the factual layer — Wikipedia overview, hero credit, weather, timezone,
//   2) the AI composition — story, culture, food, hidden gems… grounded on (1).
// Fire-and-forget: callers never await it. The fly already happened.
//
// Deduped by repository status + an in-flight set, so the same place never
// enriches twice.
const inflight = new Set()

// Real photographs of the place from Wikimedia Commons, as visual-journey items
// with a direct URL (no Pexels lookup needed).
function commonsGallery(knowledge) {
  const name = knowledge?.basic?.name ?? ''
  return (knowledge?.media?.commonsImages ?? []).map((url) => ({ title: name, url }))
}

// The full rail once AI has composed: many real photos of the place, then a
// thumbnail per hidden gem, dish and nearby highlight — each resolved via its own
// specific imageQuery so a card never shows the landmark instead of its subject.
// Deduped by image key; no artificial ceiling on how much media we surface.
function fullGallery(ai, knowledge) {
  const items = [...commonsGallery(knowledge)]
  for (const g of ai?.hiddenGems ?? []) items.push({ title: g.name, imageQuery: g.imageQuery })
  for (const f of ai?.food ?? []) items.push({ title: f.name, imageQuery: f.imageQuery })
  for (const n of ai?.nearby ?? []) items.push({ title: n.name, imageQuery: n.imageQuery })

  const seen = new Set()
  return items.filter((it) => {
    const key = it.url ?? it.imageQuery ?? it.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// Map a KnowledgeObject onto the destination fields it fills.
function knowledgeFields(knowledge, dest) {
  const media = knowledge?.media ?? {}
  const fields = {
    knowledge,
    weather: knowledge?.weather ?? dest.weather ?? null,
    timezone: knowledge?.timezone?.label ?? dest.timezone ?? null,
    heroMedia: {
      imageQuery: knowledge?.imageQuery ?? dest.heroMedia?.imageQuery ?? '',
      url: media.hero ?? dest.heroMedia?.url ?? null,
      photographer: media.photographer ?? dest.heroMedia?.photographer ?? null,
    },
    // Early gallery: real photos of the place, shown before AI finishes.
    visualJourney: commonsGallery(knowledge),
  }
  // Only upgrade the overview to the richer Wikipedia summary when we actually
  // have one — never downgrade the factual line to empty.
  if (knowledge?.wikipedia?.summary) fields.overview = knowledge.wikipedia.summary
  return fields
}

export async function enrichDestination(destination, result) {
  const id = destination?.id
  if (!id || !result) return
  if (destinationRepository.status(id) !== 'pending') return // ready / failed / absent
  if (inflight.has(id)) return

  inflight.add(id)
  try {
    const knowledge = await buildKnowledge(result)
    destinationRepository.patch(id, knowledgeFields(knowledge, destination))

    const ai = await composeDestination(knowledge)
    // ai (validated) → merged + a full media rail + 'ready'; null (any failure) →
    // 'failed' (the Commons gallery from the knowledge stage stays). Notifies either
    // way, so the composing shimmer always resolves.
    destinationRepository.applyAIComposition(
      id,
      ai ? { ...ai, visualJourney: fullGallery(ai, knowledge) } : null
    )
  } finally {
    inflight.delete(id)
  }
}

export default enrichDestination
