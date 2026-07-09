<!-- # ELSEWHERE — Developer Handbook 
> Read this before making any changes to the project.
> This is the single source of truth for Elsewhere.
 
Elsewhere is a hybrid knowledge-driven world exploration platform.

Every agent, every session, every engineer must understand this before
touching any code.

OLD thinking (wrong):

"Read from destinations.js"
"Use the dataset"
"Check if dataset has this field"

NEW thinking (correct):

"Read from the current Elsewhere Knowledge Object"
"Use the canonical location object"
"Check if the location object has this field"

Modules never care which source provided the data.
They only read the canonical location object.
This is what makes Elsewhere infinitely scalable.


# 1. What Is Elsewhere

Elsewhere is a **cinematic world exploration platform** designed to inspire curiosity, wonder, and discovery.

It is built around a simple idea:

> **People don't travel because they know a place. They travel because they feel something about it.**

Most travel products focus on logistics.

Elsewhere focuses on emotion.

It transforms places into experiences through storytelling, culture, food, history, photography, intelligent recommendations, and cinematic interaction.

The interactive globe is only the entrance.

Every location is a living world with its own identity, atmosphere, stories, traditions, hidden places, and unforgettable experiences.

The journey never truly ends.

Every destination naturally leads to another discovery.

When someone opens Elsewhere, they should feel **wonder within the first three seconds**.

Not information.

Wonder.

---

# 2. What Elsewhere Is Not

Elsewhere deliberately avoids becoming another conventional travel application.

| ❌ Elsewhere is NOT              | ✅ Elsewhere IS                                                       |
| ------------------------------- | -------------------------------------------------------------------- |
| A travel booking website        | A cinematic discovery platform                                       |
| A navigation or map application | A world exploration experience                                       |
| A Wikipedia for destinations    | An immersive storytelling platform                                   |
| An AI that invents facts        | An AI that reasons over verified knowledge                           |
| A virtual 3D world simulator    | A gateway to the real world                                          |
| A static dataset application    | A hybrid knowledge platform powered by live data and curated content |
| A website that users browse     | A world that users explore                                           |
| Limited to curated destinations | Designed to scale to every discoverable place on Earth               |

Every design decision should reinforce this philosophy.

When choosing between **adding information** and **creating wonder**, choose wonder.

When choosing between **building another travel website** and **creating a memorable journey**, choose the journey.

That principle should guide every feature, every animation, every API integration, and every AI response throughout Elsewhere.



3. Knowledge Architecture — Most Important Section

Current State

The 50+ curated locations in destinations.js power the experience.
These are fully rich, hand-crafted, and serve as the foundation.

Dynamic Knowledge Pipeline

Every location — whether curated or not — is represented by one
canonical Elsewhere Knowledge Object assembled by LocationContextBuilder.

User selects any location
          │
          ▼
   LocationContextBuilder.build(location)
          │
   Stage 1 — Facts (all parallel via Promise.allSettled)
   ┌───────────────────────────────────────────────┐
   │  Wikipedia      → history, culture, summary   │
   │  OpenTripMap    → attractions, POIs, gems      │
   │  OpenWeather    → live weather, conditions     │
   │  Geoapify       → coordinates, nearby places   │
   │  Pexels         → photography                  │
   │  REST Countries → flag, capital, currency      │
   │  Wikimedia      → media fallback               │
   └───────────────────────────────────────────────┘
          │
          ▼ Promise.allSettled — never fails completely
   Normalized Elsewhere Knowledge Object assembled
          │
   AI Enhancement Layer
   ┌───────────────────────────────────────────────┐
   │  Groq receives the Knowledge Object           │
   │  Groq generates ONLY:                         │
   │    story, dontMiss, buildMyDay,               │
   │    Ellie responses, photography tips,          │
   │    sunrise/romantic/adventure recommendations  │
   │  Groq is a WRITER — never a database          │
   │  Groq never invents facts                     │
   └───────────────────────────────────────────────┘
          │
          ▼
   Complete Knowledge Object cached
          │
   UI modules consume the Knowledge Object. They never fetch data directly.
   ┌─────────────────────────────────────────────┐
   │  Story     → location.story                 │
   │  Food      → location.food                  │
   │  Culture   → location.culture               │
   │  Seasons   → location.seasons               │
   │  Discovery → location.hiddenGems            │
   │  Ellie     → location.aiContext             │
   └─────────────────────────────────────────────┘

The Transition Rule

The curated destinations.js data IS the Knowledge Object for curated locations.
Its fields map exactly to the Knowledge Object shape.
When LocationContextBuilder is active, it produces
the same shape — modules never need to change.

This is why building modules as pure data consumers was the right decision.


4. Canonical Elsewhere Knowledge Object

Every location — country, state, city, landmark, trail, café, waterfall —
is represented by this canonical shape.

js// The Elsewhere Knowledge Object
// Source: curated dataset or LocationContextBuilder (dynamic pipeline)
// Modules never care which source provided this object.
{
  // Identity
  id:               string,
  name:             string,
  type:             string,   // 'country'|'state'|'city'|'landmark'|'sublocation'
  parent:           string | null,
  lat:              number,
  lng:              number,

  // Curated content (always present for curated locations)
  story:            string,         // vivid narrative
  heroQuote:        string,         // one emotional sentence
  heroMedia:        { title, imageQuery, atmosphere },
  visualJourney:    [{ title, imageQuery, description }],
  photoCollections: { hero, nature, culture, food, night, hidden },
  ambience:         { soundscape, musicStyle, weatherMood },
  experiences:      [string],
  moods:            [string],
  travelStyle:      [string],
  aiSummary:        string,         // factual brief for Groq

  // Exploration data
  wonders:          [...],
  hiddenGems:       [...],
  food:             [...],
  adventures:       [...],
  seasons:          { spring, summer, autumn, winter },
  culture:          { history, traditions, festivals, etiquette, dresscode, phrases },

  // Dynamically assembled (added by LocationContextBuilder pipeline)
  wikipedia:        string | null,  // historical summary
  attractions:      [...] | null,   // from OpenTripMap
  weather:          object | null,  // from OpenWeather — never cached permanently
  country:          object | null,  // from REST Countries
  images:           [...] | null,   // from Pexels

  // AI-generated layer (Groq, cached in sessionStorage)
  aiStory:          string | null,
  dontMiss:         string | null,
  buildMyDay:       string | null,

  // Resolver metadata
  _resolved:        boolean,
  _source:          'curated' | 'api' | 'hybrid'
}

A country simply has more children than a café.
The UI never needs to know what type a node is.
Type only determines camera altitude and filter chips — nothing else.


5. The Complete Experience Flow

User opens Elsewhere
        │
Black screen → stars → Earth emerges from darkness
(atmosphere, clouds, aurora, city lights, stars)
        │
"Every place has a story. Yours is Elsewhere."
        │
Globe rotates slowly — always alive, never stops
        │
User searches or clicks country boundary
        │
Camera arcs cinematically through space
(bezier arc, through clouds, not a cut)
        │
Globe lands. Layout transforms:
  Globe → 22% left companion (still alive)
  LocationWorld → 78% right
        │
LocationContextBuilder.build(location) fires
  Curated location: instant (already in dataset)
  Unknown location: parallel API calls across data sources
        │
Hero image · quote · weather badge · visual journey
        │
Modules render from Knowledge Object:
  Story · Explore · Food · Seasons · Culture · Ellie
        │
Discovery Engine always at bottom:
  Continue Your Journey
  Discover More (filtered)
  Hidden Local Secrets
  You May Also Love
  Don't Miss Before You Leave (Ellie)
  Build My Day (Ellie)
        │
User clicks any card → pushLevel()
  Globe zooms to correct altitude
  Content transitions
  Breadcrumb grows
        │
The experience never ends.
Every place leads deeper into another.


6. Layout States

'globe'     Full screen Earth. Search visible. Globe rotates.
'flying'    Full screen Earth. Camera arcing. Breadcrumb shows.
'location'  Globe: 22vw left. LocationWorld: 78vw right.
'deepdive'  Same as location + DeepDive back-nav bar.

One React Three Fiber canvas at all times.
Never create a second EarthScene. Never duplicate the globe.


7. Camera Altitude System

Defined in src/data/constants.js — never hardcoded in components.

js
LEVEL_ALTITUDE = {
  earth:        2.8,
  continent:    2.1,
  country:      1.8,
  state:        1.35,
  city:         1.1,
  landmark:     0.95,
  sublocation:  0.88
}

LEVEL_DURATION = {
  earth:        0,
  continent:    2.5,
  country:      3.0,
  state:        1.8,
  city:         1.2,
  landmark:     0.8,
  sublocation:  0.6
}

MIN_ALTITUDE = 0.85   // never go below — globe distorts

Going deeper → altitude decreases, duration decreases.
Going back → camera returns to parent altitude, not Earth.


8. API Stack — Who Owns What

Five keys. Two keyless. Zero redundancy.

APIOwnsKeyFree TierGroq (llama-3.3-70b)Reasoning, storytelling, Ellie responsesVITE_GROQ_KEY500k tokens/dayPexelsAll photographyVITE_PEXELS_KEY20k req/monthGeoapifyGeocoding + Places + Map tilesVITE_GEOAPIFY_KEY3k req/dayOpenWeatherLive weather onlyVITE_OPENWEATHER_KEY1k req/dayOpenTripMap10M+ POIs, attractionsVITE_OPENTRIPMAP_KEYFree (non-commercial)REST CountriesFlag, capital, currencyNone — public APIUnlimitedWikipediaHistorical summariesNone — public APIUnlimitedWikimedia CommonsImage fallbackNone — public APIUnlimited

Groq is a writer, never a database.
Groq receives assembled facts → generates human experience.
Groq never invents coordinates, dish names, or historical events.


9. The Groq Pattern — Critical Rule

WRONG:
  User asks about Coorg
  → Groq invents everything from scratch

CORRECT:
  User asks about Coorg
  → Load Knowledge Object (from dataset or LocationContextBuilder)
  → Send to Groq: story + hiddenGems + food + weather + attractions + aiSummary
  → Send navigation path: levelHistory
  → Groq explains it beautifully using only real assembled facts
  → Groq includes {"flyTo":{"lat":12.33,"lng":75.81,"name":"Coorg"}}
  → Globe flies there mid-response

Ellie's four modes:

Guide Mode     → location exists, speaks as local guide
Discovery Mode → no location, acts as travel consultant
Planner Mode   → user mentions time/budget, builds itinerary
Explorer Mode  → user says "surprise me", leads the journey

Every Groq call receives:


Full navigation path (levelHistory)
Current Knowledge Object (all fields)
User message
Conversation history



10. NodeResolver

src/data/NodeResolver.js

resolveNode(query):
  1. Check nodeCache (in-memory Map)
  2. Exact id match in curated dataset
  3. Exact name match in curated dataset
  4. Partial name match in curated dataset
  5. Return null (LocationContextBuilder handles unknown locations)

When a curated match is unavailable, NodeResolver delegates to
LocationContextBuilder to construct a Knowledge Object dynamically:

  5. LocationContextBuilder.build(query)
     → Parallel API calls
     → Returns full Knowledge Object
     → Cached in nodeCache

Modules never know which path was taken.


11. Discovery Engine

Always renders at bottom of LocationWorld — below all modules.
The user should never think "I've reached the end."

Continue Your Journey   → depth. Local. Go deeper.
Discover More           → freedom. Filter chips. User chooses scope.
Hidden Local Secrets    → intimacy. No images. Genuinely secret.
You May Also Love       → breadth. Same feeling, different world.
Don't Miss Before Leave → Ellie auto-speaks. sessionStorage cached.
Build My Day            → Ellie builds Morning→Evening itinerary.

Filter chips are context-aware per node type.
discoveryUtils.js powers all filtering using haversine distance + mood overlap.


12. Zustand Store Shape

js
{
  // Layout
  layoutState: 'globe',         // 'globe'|'flying'|'location'|'deepdive'
  activeLevel: 'earth',

  // Navigation
  activeLocation: null,         // Elsewhere Knowledge Object | null
  levelHistory: [],             // Knowledge Object stack
  breadcrumb: ['Elsewhere'],
  navigationDirection: 'forward',

  // Discovery
  discoveryFilter: 'nearby',
  visitedHistory: [],           // last 10 visited ids

  // Globe
  activePins: [],

  // Bucket List (localStorage persisted)
  bucketList: { dream:[], upcoming:[], visited:[] },

  // Camera
  isFlying: false,
  cameraZ: 2.8,

  // Audio
  audioMuted: false,

  // Ellie
  lastEllieSuggestion: '',
  ellieHistory: [],
  elliePreferences: {},         // crowd:low, style:adventure etc.
}

activeModule is local UI state in LocationWorld — never in Zustand.


15. Rendering Philosophy

Real photography over everything else.

✅ Real temples, landscapes, streets, mountains, food (Pexels + Wikimedia)
❌ 3D buildings, AI-generated images, illustrations, stock vectors

Globe visual standard:
Every decision must pass: "Does this look like a $200M travel documentary?"

Globe render layers (in order):


Earth sphere — 8K texture, specular ocean, normal terrain
Night lights — city glow via GLSL blend
Cloud layer — rotating 0.7× Earth speed
Atmosphere — Fresnel blue rim glow
Aurora — GLSL sine wave, poles only, night side
Postprocessing — Bloom, Vignette, ChromaticAberration



16. Animation Philosophy

Nothing snaps. Nothing jumps. Every transition is earned.

InteractionPrincipleTargetGlobe → companionWorld steps aside1.2s Framer Motion layoutLocationWorld revealAfter globe settles0.8s delay 0.5sCamera fly-toCinematic arcGSAP + CatmullRomCurve3Level deepdiveForward slides leftAnimatePresence 0.3sLevel backReverse slides rightnavigationDirection flagModule entranceFades upFramer Motion y:24→0Card staggerSequentialreact-spring 70ms apartEllie textTypewriter streamgetReader() per tokenGlobe idleNever stopsvelX minimum 0.0008


17. Performance Principles

Target: 60fps at all times. Non-negotiable.


One React Three Fiber canvas — never duplicate
GPU transforms only — never animate layout properties
One scroll listener per container — owned by parent, passed as prop
Promise.allSettled for parallel API calls — never Promise.all
Cache Knowledge Objects in nodeCache after first build
Cache Groq responses in sessionStorage per location.id
Cache Pexels responses in imageCache.js in-memory Map
Never cache weather permanently — always live
requestAnimationFrame only — never setInterval
React.memo on all module components
useMemo on all dataset/discovery computations
Strip Leva and r3f-perf from production build

 

Development Philosophy

Architecture before implementation.
Understand the full system before writing a single line.

Surgical changes over rewrites.
Only touch files listed in the current prompt.

One feature at a time.
Complete each prompt fully. Checkpoint passes. Then proceed.

Checkpoints are contracts.
Not "mostly works." Fully passes every item. Every time.

Knowledge Object over dataset.
Components consume the canonical location object.
They never care whether it came from destinations.js or the API pipeline.

Groq is a writer, never a database.
Facts come from APIs and curated data.
Groq transforms facts into the human experience.

The user should never reach a dead end.
Every location leads to another.
Discovery Engine is always at the bottom.

Real photography over generated visuals.
Pexels primary. Wikimedia fallback. Never AI-generated.

Performance is a feature.
60fps is not a bonus. It is the experience.

Documentation evolves with the codebase.
Update this file when anything changes.
Drifted documentation is worse than no documentation.

Environment Variables

| API            | Responsibility              | Key                    | Free Tier          |
| -------------- | --------------------------- | ---------------------- | ------------------ |
| Groq           | AI reasoning & storytelling | `VITE_GROQ_KEY`        | 500k tokens/day    |
| Pexels         | Photography                 | `VITE_PEXELS_KEY`      | 20k requests/month |
| Geoapify       | Geocoding, Places, Tiles    | `VITE_GEOAPIFY_KEY`    | 3k/day             |
| OpenWeather    | Live weather                | `VITE_OPENWEATHER_KEY` | 1k/day             |
| OpenTripMap    | Attractions & POIs          | `VITE_OPENTRIPMAP_KEY` | Free               |
| REST Countries | Country metadata            | None                   | Unlimited          |
| Wikipedia      | Historical summaries        | None                   | Unlimited          |
| Wikimedia      | Image fallback              | None                   | Unlimited          |


Never commit .env to git.
Never hardcode keys in source files.
OpenTileMap is covered by Geoapify — no separate key needed.
REST Countries has no API key — never add VITE_REST_COUNTRIES_KEY.


Coding Rules

✅ Components consume Knowledge Object — never fetch independently
✅ Every file fully implemented — no TODOs, no placeholders
✅ Build incrementally — never rewrite what works
✅ Touch only files listed in the current prompt
✅ props-down for all presentational components
✅ imageCache.js for ALL Pexels fetches
✅ Promise.allSettled for parallel API calls
✅ Send full Knowledge Object + navigation path to every Groq call
✅ Confirm 60fps before proceeding to next prompt
✅ Checkpoint passes before next prompt begins

❌ No second R3F canvas — ever
❌ No straight-line camera — always CatmullRomCurve3 arc
❌ No direct API calls from UI components
❌ No Groq calls that bypass Knowledge Object context
❌ No AI-invented coordinates, dish names, or history
❌ No permanent weather caching
❌ No hardcoded image URLs
❌ No layout property animations — GPU transforms only
❌ No multiple scroll listeners in same container
❌ No "dataset" thinking — think "Knowledge Object" -->



