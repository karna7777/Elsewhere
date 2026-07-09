// The Destination Repository — the single source of truth for resolved
// destinations, keyed by id. Today it is an in-memory Map; tomorrow the same
// interface can sit in front of a backend / IndexedDB / sync layer without any
// caller changing. Everything that needs a destination (the active page, and
// later Bucket List, History, Continue Journey, offline) reads from here.
//
// Writes are immutable (a new object per change) so React consumers re-render,
// and `applyAIComposition` — the async-AI patch — writes ONLY here, then notifies
// subscribers. It never touches Zustand directly; the store mirrors this.

const store = new Map() // id -> destination object
const statusById = new Map() // id -> 'pending' | 'ready' | 'failed'
const listeners = new Set()

function notify(id, destination) {
  for (const listener of listeners) listener(id, destination)
}

export const destinationRepository = {
  get(id) {
    return store.get(id) ?? null
  },

  has(id) {
    return store.has(id)
  },

  // Store a freshly-resolved destination. Its aiStatus seeds the repository status
  // (temporary destinations arrive 'pending'; curated ones have no aiStatus).
  set(destination) {
    if (!destination?.id) return destination
    store.set(destination.id, destination)
    statusById.set(destination.id, destination.aiStatus ?? 'ready')
    return destination
  },

  status(id) {
    return statusById.get(id) ?? 'idle'
  },

  // Merge arbitrary fields into a cached destination and notify. Used to stream the
  // factual layer (hero, weather, overview, gallery) in after the fly, separately
  // from the AI composition. Immutable → subscribers re-render.
  patch(id, fields) {
    const current = store.get(id)
    if (!current || !fields) return null
    const next = { ...current, ...fields }
    store.set(id, next)
    notify(id, next)
    return next
  },

  // Patch a cached destination with the composed AI object (or mark it failed when
  // `ai` is null). Immutable merge → notify. This is the only place AI content
  // enters a destination.
  applyAIComposition(id, ai) {
    const current = store.get(id)
    if (!current) return null
    const next = ai
      ? { ...current, ...ai, aiStatus: 'ready' }
      : { ...current, aiStatus: 'failed' }
    store.set(id, next)
    statusById.set(id, next.aiStatus)
    notify(id, next)
    return next
  },

  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

export default destinationRepository
