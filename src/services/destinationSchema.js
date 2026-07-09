// The single Elsewhere destination shape. Given whatever is already KNOWN about a
// place (identity, geography, hero media, weather), it returns a complete
// destination object that carries every field a curated destination exposes —
// with all not-yet-known rich content present as empty placeholders.
//
// This exists so a searched place is structurally identical to a curated one:
// downstream components can read `location.story`, `location.food`, etc. without
// ever branching on whether the place is temporary. Future prompts will fill the
// placeholders in; this file invents nothing and generates no text.
//
// Placeholder convention: fields that gate UI by truthiness (story, culture,
// seasons, bestSeason, …) are `null` so they behave exactly like an absent field;
// list fields are `[]` so `.length` / `?? []` guards see "empty", never "missing".
//
// Composed-content shapes (what the AI Composer fills these placeholders with —
// byte-for-byte identical to curated destinations, so every module renders them):
//   story        : string
//   tagline      : string
//   bestSeason   : string
//   moods        : string[]
//   travelTips   : string[]
//   food         : { name, description, culturalSignificance? }[]
//   hiddenGems   : { name, description, tip?, imageQuery }[]
//   photography  : { title, description }[]
//   nearby       : { name, description, type? }[]
//   culture      : { history: {year?,description}[], traditions: {name,description?}[],
//                    festivals: {name,when?,description?}[], etiquette: string[] }
// These shapes are fixed — placeholders must never change shape later.
export function createDestinationSkeleton(location = {}) {
  const {
    // Identity & geography — the parts a resolver already knows.
    id = null,
    name = '',
    country = '',
    state = '',
    continent = '',
    lat = null,
    lng = null,
    bbox = null,
    type = 'landmark',
    // Presentation — computed by the resolver from real providers.
    heroMedia = null,
    heroQuote = null,
    overview = null,
    weather = null,
    timezone = null,
  } = location

  return {
    // ── Identity & geography (known) ──────────────────────────────────────────
    id,
    name,
    country,
    state,
    continent,
    lat,
    lng,
    bbox,
    type,
    flag: null, // curated destinations carry a flag emoji; a searched place has none

    // ── Presentation (known) ──────────────────────────────────────────────────
    heroMedia: heroMedia ?? { imageQuery: '', url: null, photographer: null },
    heroQuote,
    overview,
    weather,
    timezone,

    // ── Rich content — placeholders only, filled by future prompts ────────────
    story: null,
    tagline: null,
    explore: null,
    wonders: [],
    hiddenGems: [],
    food: [],
    adventures: [],
    culture: null,
    seasons: null,
    experiences: [],
    bestSeason: null,
    gallery: [],
    visualJourney: [],
    photoCollections: null,
    photography: [],
    travelTips: [],
    facts: [],
    nearby: [],
    moods: [],
    travelStyle: [],
    ambience: null,
    capital: null,
    population: null,
    budget: null,
    aiSummary: null,

    // ── Factual layer ─────────────────────────────────────────────────────────
    knowledge: null, // the raw KnowledgeObject (Wikipedia, media, weather, timezone…)
    // AI composition lifecycle: 'pending' while the background Composer runs, then
    // 'ready' or 'failed'. Curated destinations leave this null (never composing).
    aiStatus: null,

    // ── Flags ─────────────────────────────────────────────────────────────────
    isTemporary: true,
    _resolved: true, // already canonical, so resolveNode() passes it straight through
  }
}

export default createDestinationSkeleton
