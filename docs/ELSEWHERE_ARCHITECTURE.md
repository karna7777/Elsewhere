# ELSEWHERE — Developer Handbook 
> Read this before making any changes to the project.
> This is the single source of truth for Elsewhere.
> Every AI assistant, every new Cursor session, every future engineer starts here.
> Last updated: Prompts 0–9 complete. Prompt 10 is next.

---

## 1. What Is Elsewhere

Elsewhere is a **cinematic world exploration platform**.

It is not a travel booking website.
It is not a map application.
It is not a Wikipedia for destinations.
It is not a globe viewer.

**Elsewhere is the answer to a different question.**

Most travel apps answer: *"Where is this place?"*
Elsewhere answers: *"What will I feel when I get there?"*

The globe is only the entrance.
Every location is a world unto itself.
The experience never ends — every place leads deeper into another.

When someone opens Elsewhere they should feel **wonder within 3 seconds**.
Not information. **Wonder.**

---

## 2. What Elsewhere Is Not

| ❌ What it is NOT | ✅ What it IS |
|---|---|
| A travel booking site | A cinematic discovery platform |
| A Google Maps clone | A world exploration engine |
| A Wikipedia for places | An immersive storytelling experience |
| An AI that invents facts | An AI that reasons over curated facts |
| A 3D city renderer | A real photography showcase |
| A static information page | An infinitely deep recursive journey |
| A website you browse | A world you explore |

---

## 3. The Complete Experience Flow

```
User opens Elsewhere
        │
Black screen → stars appear → Earth emerges from darkness
(atmosphere glows, clouds drift, aurora at poles, city lights shine)
        │
"Every place has a story. Yours is Elsewhere."
        │
Globe rotates slowly — always alive, never stops
        │
User searches "Coorg" or clicks a country boundary
        │
Camera arcs cinematically through space
(not a cut — a flight, through clouds, bezier arc)
        │
Globe lands. Layout transforms:
  Globe → slides left → becomes 22% companion
  LocationWorld → expands right → 78% of screen
        │
Hero image fills the screen
Hero quote fades in
Location name appears
Live weather badge glows
        │
User explores modules:
  Story → narrative, experiences, moods, ambience
  Explore → wonders, hidden gems, adventures
  Food → dishes, culture, street food
  Seasons → Spring/Summer/Autumn/Winter
  Culture → history, traditions, etiquette, language
  Ellie → AI guide, cinematic text, globe moves mid-response
        │
User clicks a Wonder card
        │
pushLevel() fires:
  Globe companion zooms to landmark altitude
  Content transitions to sub-location
  Breadcrumb grows: Elsewhere › India › Karnataka › Coorg › Abbey Falls
        │
Discovery Engine always visible at bottom:
  Continue Your Journey → stay local, go deeper
  Discover More (filtered) → Nearby / Same Region / Vibes / Worldwide
  Hidden Local Secrets → what locals know
  You May Also Love → same feeling, different world
  Don't Miss Before You Leave → Ellie speaks automatically
  Build My Day → Ellie builds Morning→Evening itinerary
        │
The user never hits a dead end.
Every place leads to another.
```

---

## 4. The LocationNode — Unified Model

**This is the most important architectural decision in Elsewhere.**

Every place — country, state, city, landmark, trail, waterfall,
café, temple, viewpoint — is the **same object**.

```js
// LocationNode — every place is this shape
{
  id:             string,         // unique identifier
  name:           string,         // display name
  type:           string,         // 'country'|'state'|'city'|'landmark'|'sublocation'
  parent:         string | null,  // parent node id (NOT the full object)
  lat:            number,         // precise coordinates
  lng:            number,

  // Content (curated, never AI-generated)
  story:          string,         // 120-180 words, vivid narrative
  heroQuote:      string,         // one emotionally engaging sentence
  heroMedia:      { title, imageQuery, atmosphere },
  visualJourney:  [{ title, imageQuery, description }],
  photoCollections: { hero, nature, culture, food, night, hidden },
  ambience:       { soundscape, musicStyle, weatherMood },
  experiences:    [string],
  moods:          [string],
  travelStyle:    [string],
  aiSummary:      string,         // factual brief for Groq context

  // Exploration data
  wonders:        [{ name, description, lat, lng, images, tips, type? }],
  hiddenGems:     [{ name, whySpecial, bestTime, difficulty, tips, lat, lng }],
  food:           [{ name, description, culturalSignificance, region, images }],
  adventures:     [{ name, type, rating, difficulty, season, bookingTip }],
  seasons:        { spring, summer, autumn, winter },
  culture:        { history, traditions, festivals, etiquette, dresscode, phrases },

  // Internal resolver fields
  _resolved:      boolean,
  _source:        'curated' | 'api'
}
```

**The UI never needs to know what type a node is.**
`type` only determines:
- Camera altitude on arrival (`LEVEL_ALTITUDE[type]`)
- Which filter chips appear (`FILTERS_BY_TYPE[type]`)

A country simply has more children than a café.
The renderer is identical for both.

---

## 5. Layout States

Elsewhere has four distinct layout states.

```
'globe'     Full screen Earth. Search visible. Globe rotates.
            User feels: wonder, invitation.

'flying'    Full screen Earth. Camera arcing through space.
            Breadcrumb appears. SearchBar hides.
            User feels: travelling.

'location'  Globe: 22vw left companion.
            LocationWorld: 78vw right.
            User feels: arrived, immersed.

'deepdive'  Same as location but DeepDive back-nav bar appears.
            Globe companion zooms to sub-location altitude.
            User feels: going deeper, discovering.
```

**One React Three Fiber canvas at all times.**
Never create a second EarthScene.
The globe transitions between states — it never disappears and never duplicates.

---

## 6. Camera Altitude System

Every node type has a precise camera altitude and flight duration.
Defined in `src/data/constants.js` — never hardcoded in components.

```js
LEVEL_ALTITUDE = {
  earth:        2.8,   // full planet view
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
  country:      3.0,   // longest — crossing the planet
  state:        1.8,
  city:         1.2,
  landmark:     0.8,
  sublocation:  0.6    // shortest — local micro-movement
}

MIN_ALTITUDE = 0.85    // never go below — globe distorts
```

**Going deeper** → altitude decreases, duration decreases.
**Going back** → camera returns to parent's altitude, not Earth.
**The globe companion always reflects the current level.**

---

## 7. Data Ownership — Who Owns What

Every piece of data has exactly one owner. Never cross these boundaries.

### Curated Dataset (`destinations.js`)
**Owns permanently and exclusively:**
- Coordinates — precise, never AI-generated
- Story — vivid narrative, human-written
- Hero quote, hero media, visual journey
- Culture — history, traditions, festivals, etiquette, phrases
- Food — dishes, significance, region, cultural context
- Hidden gems — why special, difficulty, insider tips
- Adventures — rating, difficulty, booking tips
- Seasons — temperature, crowd level, events, packing
- Moods, travel styles, experiences, ambience
- AI summary — factual brief sent to Groq as context
- Photo collection queries — Pexels search keywords

**Rule: Never ask Groq to invent these fields.**
**Rule: Never replace with a live API.**
**Rule: This is the soul of Elsewhere. Treat it as sacred.**

---

### Pexels API (`imageCache.js`)
**Owns:** All photography — hero images, cards, galleries, food, seasons.

**Rules:**
- Never call Pexels directly from a component
- Always use `fetchPexelsImage(query)` from `imageCache.js`
- Always `orientation=landscape`, `large2x` size
- imageCache stores URL strings in memory — not images, not localStorage
- Cache resets on tab close — this is intentional

---

### OpenWeather API (`useWeather.js`)
**Owns:** Live temperature, conditions, humidity, sunrise/sunset.

**Rules:**
- Never cache permanently — weather must be live
- Never store in destinations.js
- Never show fallback text on failure — hide badge silently
- `useWeather(lat, lng)` hook owns all fetch logic
- Components receive `{ loading, weather, error }` only

---

### Groq API — Ellie (`EllieModule.jsx`)
**Owns:** Reasoning, conversation, recommendations, trip planning.

**Groq does NOT own facts. It reasons over facts.**

```
WRONG:  User asks about Coorg → Groq invents everything
CORRECT: User asks about Coorg
          → Load Coorg node from dataset
          → Send: story + hiddenGems + food + aiSummary as context
          → Send: full navigation path (levelHistory)
          → Groq explains it beautifully using only real facts
          → Groq includes {"flyTo":{"lat":12.33,"lng":75.81,"name":"Coorg"}}
          → Globe flies there mid-response
```

**Ellie's four modes:**
```
Guide Mode     → location exists, Ellie acts as local guide
Discovery Mode → no location, Ellie is travel consultant
Planner Mode   → user mentions time/budget, Ellie builds itinerary
Explorer Mode  → user says "surprise me", Ellie leads the journey
```

**Rules:**
- Always send full navigation path (`levelHistory`) to every Groq call
- Always send current location data as context
- Never let Groq invent coordinates, dish names, historical events
- Parse `{"flyTo":{...}}` mid-stream → trigger pushLevel or flyTo immediately
- Strip flyTo JSON from displayed text — user never sees it

---

### REST Countries API (`countries.js`)
**Owns:** Official country name, capital, population, languages, currencies, flag.

**Rules:** Cache in `Map()`. Return `null` gracefully on failure.

---

## 8. NodeResolver — Data Orchestration

`src/data/NodeResolver.js` sits between user interaction and the UI.
The UI never cares where data came from.

```
resolveNode(query):
  Step 1 → Check nodeCache (in-memory Map)
  Step 2 → Check curated dataset (exact match → partial match)
  Step 3 → Return null (Stage 2 API pipeline, post-launch)

Stage 2 (post-launch):
  Nominatim (OSM)   → hierarchy, coordinates, children
  Wikipedia REST    → historical context for Groq
  Foursquare Places → restaurants, attractions
  All normalized into the same LocationNode shape
```

**Current behaviour:** Returns curated nodes only. Returns null gracefully for unknown locations. The UI handles null without crashing.

---

## 9. Discovery Engine

`src/ui/LocationWorld/discovery/DiscoveryEngine.jsx`

Always renders at the bottom of LocationWorld — below all modules.
The user should never think "I've reached the end."

Six sections, each with a distinct purpose:

```
Continue Your Journey   → depth. Stay local. Go deeper into this place.
Discover More           → freedom. Filter chips reshape results instantly.
Hidden Local Secrets    → intimacy. No images. Feels genuinely secret.
You May Also Love       → breadth. Same feeling, different world.
Don't Miss Before Leave → Ellie auto-speaks. sessionStorage cached per location.id.
Build My Day            → Ellie builds a Morning→Evening itinerary.
```

**Filter chips are context-aware by node type.**
A landmark shows: Nearby / Same Region / Same Country / Similar Vibes / Worldwide / Hidden / Adventure / Photography
A country shows: Best Regions / Hidden Places / Food Trails / Culture / Worldwide

**`discoveryUtils.js` powers all filtering** using:
- Haversine distance formula (true geographic proximity)
- Mood overlap scoring (Similar Vibes)
- Dataset field presence checks (Adventure, Photography, Food)

---

## 10. Folder Structure

```
elsewhere/
├── public/
│   └── textures/                          ✅
│       ├── earth_day_8k.jpg
│       ├── earth_night.jpg
│       ├── earth_normal.jpg
│       ├── earth_specular.jpg
│       └── earth_clouds.jpg
│
├── src/
│   ├── main.jsx                           ✅
│   ├── App.jsx                            ✅
│   │
│   ├── store/
│   │   └── useStore.js                   ✅
│   │
│   ├── globe/                            ✅
│   │   ├── EarthScene.jsx
│   │   ├── Earth.jsx
│   │   ├── AtmosphereShader.jsx
│   │   ├── Clouds.jsx
│   │   ├── Stars.jsx
│   │   ├── Aurora.jsx
│   │   ├── DayNight.jsx
│   │   ├── LocationPin.jsx               ⬜ Prompt 14
│   │   ├── BucketPin.jsx                 ⬜ Prompt 14
│   │   ├── CountryBoundaries.jsx         ⬜ Prompt 13
│   │   └── FlightArc.jsx                 ⬜ Prompt 13
│   │
│   ├── camera/                           ✅
│   │   ├── CameraRig.jsx
│   │   └── useFlyTo.js
│   │
│   ├── hooks/
│   │   └── useWeather.js                 ✅ Prompt 8
│   │
│   ├── ui/
│   │   ├── SearchBar.jsx                 ✅
│   │   ├── Breadcrumb.jsx                ✅
│   │   ├── ZoomIndicator.jsx             ⬜ Prompt 14
│   │   ├── SurpriseMe.jsx                ⬜ Prompt 13
│   │   ├── MuteToggle.jsx                ⬜ Prompt 14
│   │   ├── LoadingScreen.jsx             ⬜ Prompt 15
│   │   ├── CinematicIntro.jsx            ⬜ Prompt 15
│   │   ├── AIStrip.jsx                   ⬜ Prompt 12
│   │   │
│   │   └── LocationWorld/               ✅ Prompt 7
│   │       ├── LocationWorld.jsx
│   │       ├── GlobeCompanion.jsx
│   │       ├── HeroSection.jsx           ✅ Prompt 8
│   │       ├── LocationNav.jsx           ✅ Prompt 8
│   │       ├── WeatherBadge.jsx          ✅ Prompt 8
│   │       ├── VisualJourney.jsx         ✅ Prompt 8
│   │       ├── DeepDive.jsx              ⬜ Prompt 10
│   │       ├── LevelTransition.jsx       ⬜ Prompt 10
│   │       │
│   │       ├── modules/
│   │       │   ├── shared/
│   │       │   │   ├── ModuleWrapper.jsx ✅ Prompt 9
│   │       │   │   └── LocationCard.jsx  ✅ Prompt 9
│   │       │   ├── StoryModule.jsx       ✅ Prompt 9
│   │       │   ├── ExploreModule.jsx     ✅ Prompt 9
│   │       │   ├── FoodModule.jsx        ⬜ Prompt 11
│   │       │   ├── SeasonsModule.jsx     ⬜ Prompt 11
│   │       │   ├── CultureModule.jsx     ⬜ Prompt 11
│   │       │   └── EllieModule.jsx       ⬜ Prompt 12
│   │       │
│   │       └── discovery/               ⬜ Prompt 10
│   │           ├── DiscoveryEngine.jsx
│   │           ├── DiscoveryFilters.jsx
│   │           ├── ContinueJourney.jsx
│   │           ├── HiddenSecrets.jsx
│   │           ├── SimilarVibes.jsx
│   │           ├── DontMissBeforeYouLeave.jsx
│   │           └── BuildMyDay.jsx
│   │
│   ├── BucketList/
│   │   ├── BucketPanel.jsx               ⬜ Prompt 14
│   │   └── BucketCard.jsx                ⬜ Prompt 14
│   │
│   ├── audio/
│   │   └── AudioEngine.js                ⬜ Prompt 16
│   │
│   ├── utils/
│   │   ├── imageCache.js                 ✅
│   │   └── discoveryUtils.js             ⬜ Prompt 10
│   │
│   ├── shaders/                          ✅
│   │   ├── atmosphere.vert / .frag
│   │   ├── aurora.vert / .frag
│   │   ├── nightlights.frag
│   │   └── bucketPin.frag
│   │
│   └── data/                             ✅
│       ├── constants.js                  ⬜ Prompt 7
│       ├── destinations.js
│       ├── countries.js
│       ├── NodeResolver.js               ⬜ Prompt 10
│       └── destinations/
│           ├── index.js
│           ├── Asia.js
│           ├── Europe.js
│           ├── Africa.js
│           ├── Americas.js
│           └── Oceania.js
│
└── docs/
    └── ELSEWHERE_ARCHITECTURE.md         ← this file
```

---

## 11. Zustand Store Shape

The full intended store shape. Fields added incrementally per prompt.
`activeModule` is **local UI state in LocationWorld** — not in Zustand.

```js
{
  // Layout
  layoutState: 'globe',         // 'globe'|'flying'|'location'|'deepdive'
  activeLevel: 'earth',         // current node type

  // Navigation
  activeLocation: null,         // LocationNode | null
  levelHistory: [],             // navigation stack — LocationNode[]
  breadcrumb: ['Elsewhere'],    // display path — string[]
  navigationDirection: 'forward', // 'forward'|'back' — controls transition

  // Discovery
  discoveryFilter: 'nearby',    // active filter chip
  visitedHistory: [],           // last 10 visited location ids

  // Globe pins
  activePins: [],

  // Bucket List (persisted to localStorage)
  bucketList: {
    dream: [],
    upcoming: [],
    visited: []
  },

  // Camera
  isFlying: false,
  cameraZ: 2.8,

  // Audio
  audioMuted: false,

  // Ellie
  lastEllieSuggestion: '',      // shown in AIStrip
  ellieHistory: [],             // conversation history for Groq
}
```

**Actions:**
```
setLayoutState(state)
pushLevel(locationNode)         → async, resolves via NodeResolver
popLevel()                      → returns to parent altitude
resetToGlobe()                  → full Earth view
setDiscoveryFilter(filterId)
addToVisitedHistory(locationId)
addToBucketList(node, category)
removeFromBucketList(id, category)
moveBucketItem(id, from, to)
setIsFlying(bool)
setCameraZ(z)                   → called every frame
toggleMute()
setLastEllieSuggestion(text)
```

---

## 12. Globe Texture Files

**Never rename, regenerate, replace, or move these files.**

| File | Purpose |
|---|---|
| `earth_day_8k.jpg` | Primary day surface — NASA Blue Marble |
| `earth_night.jpg` | City lights on dark side |
| `earth_normal.jpg` | Terrain bump detail |
| `earth_specular.jpg` | Ocean specular shine |
| `earth_clouds.jpg` | Cloud layer — .jpg extension, not .png |

---

## 13. Rendering Philosophy

### Real Photography Over Everything
```
✅ Real temples, landscapes, streets, mountains, food (Pexels)
❌ 3D buildings, generated imagery, illustrations, AI-generated photos
```

Every image must make the user feel like they could step through the screen.

### Globe Visual Standard
Every globe decision must pass: *"Does this look like a $200M travel documentary?"*

Globe render layers (in order):
1. Earth sphere — 8K texture, specular ocean, normal terrain
2. Night lights — city glow via GLSL blend
3. Cloud layer — rotating at 0.7× Earth speed
4. Atmosphere — Fresnel blue rim glow
5. Aurora — GLSL sine wave, poles only, night side
6. Postprocessing — Bloom, Vignette, ChromaticAberration

---

## 14. Animation Philosophy

**Nothing snaps. Nothing jumps. Every transition is earned.**

| Interaction | Principle | Implementation |
|---|---|---|
| Globe → companion | World steps aside | Framer Motion layout, 1.2s |
| LocationWorld reveal | Arrives after globe settles | 0.8s delay 0.5s |
| Camera fly-to | Cinematic arc, not straight line | GSAP + CatmullRomCurve3 |
| Level deepdive | Forward slide left | AnimatePresence, 0.3s |
| Level back | Reverse slide right | navigationDirection flag |
| Card hover | Subtle lift + image scale | translateY(-3px), scale 1.06 |
| Module entrance | Fades up from below | Framer Motion y:24→0 |
| Card stagger | Sequential entrance | react-spring, 70ms apart |
| Ellie text | Typewriter character stream | getReader() per token |
| Globe idle | Never fully stops | velX minimum 0.0008 |

---

## 15. Performance Principles

**Target: 60fps at all times. Non-negotiable.**
r3f-perf runs throughout development.
Do not proceed to next prompt if FPS drops below 55.

**Non-negotiable rules:**
- One React Three Fiber canvas — never duplicate
- GPU transforms only — never animate layout properties
- One scroll listener per scroll container — owned by parent, passed as prop
- Cache all Pexels responses — never repeat the same query
- requestAnimationFrame only — never setInterval
- Strip Leva and r3f-perf from production build

**Implementation guidance:**
- React.memo on all module and card components
- useCallback on globe event handlers
- useMemo on dataset filters and discovery computations
- IntersectionObserver for lazy image loading
- Debounce API calls 300ms
- LOD on globe sphere (segments 128 → 64 at far zoom)

---

## 16. Development Philosophy

**Architecture before implementation.**
Understand the full system before writing a single line.

**Surgical changes over rewrites.**
Only touch files listed in the current prompt.
If something works, protect it.

**One feature at a time.**
Complete each prompt fully. Run the checkpoint. Then proceed.

**Checkpoints are contracts.**
Not "mostly works." Fully passes. Every item checked.

**Data is curated, never generated.**
The dataset is the soul of Elsewhere.
Groq reasons over it. It never replaces it.

**Rendering is cinematic.**
If it looks like a default, it is not finished.

**Performance is a feature.**
60fps is not a bonus. It is part of the experience.

**Real photography over generated visuals.**
Pexels photography only. Never 3D cities or AI images.

**The user should never reach a dead end.**
Every location leads somewhere else.
The Discovery Engine is always at the bottom of every page.

**Documentation evolves with the codebase.**
Update this file when filenames, store fields, or APIs change.
Drifted documentation is worse than no documentation.

---

## 17. Coding Rules

```
✅ Every file fully implemented — no TODOs, no placeholders
✅ Build incrementally on top of what works
✅ Touch only files listed in the current prompt
✅ Never rename texture files
✅ Never regenerate curated location data
✅ Use activeLocation not activeDestination in new code
✅ Props-down for presentational components — no Zustand in leaves
✅ imageCache.js for ALL Pexels fetches — never call API directly
✅ Send location context + navigation path to every Groq call
✅ Run checkpoint before proceeding to next prompt
✅ Confirm 60fps before proceeding

❌ No second R3F canvas — ever
❌ No straight-line camera movement — always CatmullRomCurve3 arc
❌ No direct Pexels calls from components
❌ No Groq calls that bypass location context
❌ No AI-invented coordinates, dish names, or history
❌ No permanent weather caching
❌ No hardcoded image URLs
❌ No layout property animations — GPU transforms only
❌ No multiple scroll listeners in the same container
❌ No Prettier/linting changes when only logic changes are needed
```

---

## 18. Build Order

| Prompt | Feature | Status |
|---|---|---|
| 0 | Scaffold — folders, packages, imageCache | ✅ |
| 1 | Globe — sphere, stars, drag, zoom, Bloom | ✅ |
| 2 | Shaders — atmosphere, clouds, aurora, day/night | ✅ |
| 3 | Zustand store | ✅ |
| 4 | Camera — CameraRig, flyTo, CatmullRomCurve3 arc | ✅ |
| 5A–D | Locations dataset — 50+ entries, all fields | ✅ |
| 5R | Data refactor — continent files, index.js | ✅ |
| 6 | Search bar + Breadcrumb | ✅ |
| 7 | Layout transformation — globe companion + LocationWorld | ✅ |
| 8 | Location hero — image, quote, weather, visual journey, nav | ✅ |
| 9 | Story module + Explore module + LocationCard | ✅ |
| 10 | NodeResolver + Discovery Engine (all 6 sections) | ⬜ Next |
| 11 | Food + Seasons + Culture modules | ⬜ |
| 12 | Ellie — 4 modes, cinematic text, globe moves mid-stream | ⬜ |
| 13 | Surprise Me + Country boundaries + Flight arc | ⬜ |
| 14 | Bucket list + Globe pins + UI widgets | ⬜ |
| 15 | Opening cinematic + Loading screen | ⬜ |
| 16 | Spatial audio — Tone.js | ⬜ |
| 17 | Production cleanup + Mobile + Ship | ⬜ |

Total: 17 build prompts (0–17) + 5 data sub-prompts (5A–5D, 5R)

---

## 19. Post-Launch Roadmap (Stage 2)

Do not build these now. Do not let them influence current decisions.

**NodeResolver API pipeline:**
Nominatim (OSM) → hierarchy + coordinates
Wikipedia REST → historical context for Groq
Foursquare → restaurants, attractions
Enables recursive depth beyond curated 50+ locations.

**User accounts:**
Supabase → personal bucket lists synced across devices

**Community features:**
User-submitted hidden gems, ratings, local tips

**Trip planner:**
Ellie builds multi-destination itineraries with real routing

**Globe upgrade:**
MeshStandardMaterial + PBR rendering
Volumetric atmosphere (Rayleigh + Mie scattering)
Mapbox satellite tile streaming at deep zoom levels

---

## 20. Environment Variables

```
VITE_PEXELS_KEY        → pexels.com/api (free, instant, no approval)
VITE_GROQ_KEY          → console.groq.com (free, no card needed)
VITE_OPENWEATHER_KEY   → openweathermap.org/api (free tier, 1000/day)
```

Never commit `.env` to git.
Never hardcode keys in source files.

---

## 21. How to Use This Document

**Start every Cursor session with:**
```
Read docs/ELSEWHERE_ARCHITECTURE.md before making any changes.
```

**Start every prompt with:**
```
Project: Elsewhere V2
Read docs/ELSEWHERE_ARCHITECTURE.md before making any changes.
Prompts 0–N are complete.
```

**When something feels wrong, check:**
1. Am I touching files not listed in this prompt?
2. Am I calling Pexels directly instead of through imageCache?
3. Am I letting Groq invent facts instead of reasoning over context?
4. Am I animating layout properties instead of GPU transforms?
5. Am I below 60fps?
6. Am I creating a second R3F canvas?

If any answer is yes — stop immediately and reconsider.

---

*Update the Build Order table (Section 18) after every prompt completes.*
*Update folder structure (Section 10) as new files are created.*
*This document is a living record of Elsewhere — keep it accurate.*
