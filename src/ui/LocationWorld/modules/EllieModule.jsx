import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../../store/useStore'
import destinations from '../../../data/destinations.js'
import { resolveNode } from '../../../data/NodeResolver.js'
import EllieDisplay from '../../ellie/EllieDisplay'
import EllieSuggestions from '../../ellie/EllieSuggestions'

const EASE = [0.16, 1, 0.3, 1]
const MAX_HISTORY = 20
// Replay only the last 8 exchanges (≈16 messages) to Groq alongside the system
// prompt + current location context. Keeps prompts small without losing thread.
const REPLAY_MESSAGES = 16
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const ERROR_MESSAGE = "I couldn't reach the world just now. Let's try again in a moment."
const PLANNER_SPARSE = 'I can build a richer itinerary once we explore a destination together.'
const EXPLORER_NONE = "I couldn't find somewhere surprising just yet. Let's keep exploring."

// ── Mode detection ───────────────────────────────────────────────────────────
const EXPLORER_RE = /surprise me|take me somewhere|unexpected|\brandom\b/i
const PLANNER_RE = /\b(plan|itinerary|day|days|week|weekend|weeks|trip)\b/i
// A refinement of the previous reply ("shorten it", "make it longer"…) keeps the
// current Planner/Explorer mode instead of dropping back to Guide/Discovery.
const FOLLOWUP_RE = /\b(shorten|shorter|longer|expand|simpler|again|instead|change|tweak|adjust|more|less|condense|summari[sz]e|it)\b/i

function detectExplicitMode(message) {
  const m = message.toLowerCase()
  if (EXPLORER_RE.test(m)) return 'explorer'
  if (PLANNER_RE.test(m)) return 'planner'
  return null
}

// Ellie remembers her mode: an explicit trigger wins; otherwise a follow-up keeps
// Planner/Explorer; otherwise the structural Guide/Discovery default applies.
function determineEllieMode(activeLocation, message = '', prevMode = 'guide') {
  const explicit = detectExplicitMode(message)
  if (explicit) return explicit
  if ((prevMode === 'planner' || prevMode === 'explorer') && FOLLOWUP_RE.test(message)) {
    return prevMode
  }
  return activeLocation ? 'guide' : 'discovery'
}

// ── Conversation topic (12D-A) ───────────────────────────────────────────────
// A sticky subject so vague follow-ups ("budget friendly", "near Gion") keep
// refining the same thread instead of resetting. An explicit topic keyword wins;
// otherwise the running topic carries; otherwise the mode's structural default.
const FOOD_RE = /\b(eat|eats|food|restaurant|restaurants|dish|dishes|cuisine|vegetarian|vegan|breakfast|lunch|dinner|cafe|coffee|meal|hungry|taste|drink|drinks)\b/i
const PHOTO_RE = /\b(photo|photos|photograph|photography|camera|sunrise|sunset|golden hour|shot|shots|viewpoint|instagram|picture|pictures)\b/i
const HISTORY_RE = /\b(history|historical|historic|ancient|ruins|heritage|empire|dynasty|monument|monuments|old town)\b/i
const CULTURE_RE = /\b(culture|cultural|festival|festivals|tradition|traditions|etiquette|language|religion|custom|customs|locals|local life)\b/i
const WEATHER_RE = /\b(weather|temperature|rain|rainy|climate|humid|snow|sunny|forecast)\b/i

function detectTopic(message, mode, prevTopic = 'general') {
  const m = message.toLowerCase()
  if (FOOD_RE.test(m)) return 'food'
  if (PHOTO_RE.test(m)) return 'photography'
  if (HISTORY_RE.test(m)) return 'history'
  if (CULTURE_RE.test(m)) return 'culture'
  if (WEATHER_RE.test(m)) return 'weather'
  if (PLANNER_RE.test(m)) return 'planner'
  // No explicit signal — keep the running topic (sticky refinement), else default.
  if (prevTopic && prevTopic !== 'general') return prevTopic
  if (mode === 'planner') return 'planner'
  if (mode === 'guide') return 'guide'
  return 'general'
}

// Heuristic, LLM-free compression (no new API): collapse whitespace and keep the
// opening sentence(s). Replayed to Groq in place of the full reply so history
// stays light; the on-screen reply (ellieStreamText) is untouched.
function compressReply(text) {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (t.length <= 240) return t
  const sentences = t.match(/[^.!?]+[.!?]+/g)
  if (sentences) {
    let out = ''
    for (const s of sentences) {
      if ((out + s).length > 240) break
      out += s
    }
    if (out.trim()) return out.trim()
  }
  return `${t.slice(0, 240).trim()}…`
}

// How many of the most recent assistant replies are replayed in FULL. Older
// assistant turns fall back to their stored summary so prompts stay light while
// recent nuance survives ("expand the second day", "rewrite the Kyoto part").
const FULL_ASSISTANT_REPLIES = 3

// Map stored history → Groq messages: user turns verbatim; the newest few
// assistant turns full, older ones summarized. Strips the extra `summary` field
// the API doesn't expect.
function buildReplay(history, fullCount = FULL_ASSISTANT_REPLIES) {
  let assistantSeen = 0
  const out = []
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const msg = history[i]
    if (msg.role === 'assistant') {
      assistantSeen += 1
      const full = assistantSeen <= fullCount
      out.push({ role: 'assistant', content: full ? msg.content : msg.summary ?? msg.content })
    } else {
      out.push({ role: msg.role, content: msg.content })
    }
  }
  return out.reverse()
}

// ── Context-aware idle greetings (12D-A) ─────────────────────────────────────
const GREETINGS = {
  guide: "I've spent quite a bit of time here.\nWhat would you like to discover first?",
  discovery: 'Some journeys begin with a destination.\nThe best ones begin with curiosity.',
  planner: "Tell me how much time you have.\nWe'll make every day count.",
  explorer: "Leave the map to me.\nI'll take you somewhere unforgettable.",
}

function greetingFor(mode, activeLocation) {
  if (mode === 'planner') return GREETINGS.planner
  if (mode === 'explorer') return GREETINGS.explorer
  if (mode === 'discovery' || !activeLocation) return GREETINGS.discovery
  return GREETINGS.guide
}

// ── Shared curated-context helpers (no duplicated prompt-building) ────────────
const BASE_PERSONA =
  'You are Ellie, the travel companion inside Elsewhere — warm, specific, and ' +
  'well-travelled. Speak naturally, like a knowledgeable friend, never like a ' +
  'guidebook. Never use bullet points or numbered lists.'

const GUIDE_INSTR =
  'Guide the traveler through the place they are currently exploring. Always answer ' +
  'specifically, preferring real names from the supplied context. Do not invent ' +
  'restaurants, streets, or landmarks — if something is not in the context and you ' +
  'do not truly know it, say so naturally. At most three paragraphs.'

const DISCOVERY_INSTR =
  'The traveler is choosing where to go next. Act as a travel consultant: attempt a ' +
  'concrete recommendation FIRST. Ask at most two questions, and only when essential ' +
  '— if you already have enough to suggest somewhere, recommend first and question ' +
  'second. At most three paragraphs.'

const PLANNER_INSTR =
  'Build a realistic itinerary using ONLY the supplied locations, food, attractions ' +
  'and cultural information. Never invent destinations. If information is missing, ' +
  'simply omit it. Write naturally, at most four short paragraphs.'

const EXPLORER_INSTR =
  'You know the traveller personally through your previous conversations. Recommend ' +
  'exactly ONE destination, chosen ONLY from the recommended destinations supplied ' +
  'below — never invent a place. Explain warmly why it matches how they travel, ' +
  'drawing on their preferences. Do not list all the options and do not sound like a ' +
  'search engine. At most two short paragraphs. When it fits, end with a gentle ' +
  'invitation such as "I think you\'d love this one."'

// Navigation directive — appended for modes that send the traveler somewhere new,
// so Groq emits a single flyTo line we can parse and act on mid-stream.
const NAV_DIRECTIVE =
  'When you are recommending one specific destination the traveler should go to now, ' +
  'include exactly one line containing only this JSON object, with real coordinates: ' +
  '{"flyTo":{"lat":<number>,"lng":<number>,"name":"<destination name>"}}. Put it on its ' +
  'own line. Do not mention or explain the JSON — just continue your reply naturally around it.'

function names(arr) {
  return (arr ?? []).map((x) => x?.name).filter(Boolean).join(', ')
}

function placeBlock(loc) {
  return [
    `Location: ${loc.name}, ${loc.country ?? ''}`.trim(),
    loc.story ? `Story: ${loc.story}` : null,
    names(loc.wonders) ? `Attractions: ${names(loc.wonders)}` : null,
    names(loc.hiddenGems) ? `Hidden gems: ${names(loc.hiddenGems)}` : null,
    names(loc.food) ? `Food: ${names(loc.food)}` : null,
    loc.bestSeason ? `Best season: ${loc.bestSeason}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function seasonsBlock(loc) {
  if (!loc.seasons) return null
  const parts = Object.entries(loc.seasons)
    .map(([k, v]) => (typeof v === 'string' && v ? `${k}: ${v}` : null))
    .filter(Boolean)
  return parts.length ? `Seasons:\n${parts.join('\n')}` : null
}

function cultureBlock(loc) {
  const c = loc.culture
  if (!c) return null
  const block = [
    c.language ? `Language: ${c.language}` : null,
    c.religion ? `Religion: ${c.religion}` : null,
    names(c.festivals) ? `Festivals: ${names(c.festivals)}` : null,
    c.etiquette?.length ? `Etiquette: ${c.etiquette.join(' ')}` : null,
  ]
    .filter(Boolean)
    .join('\n')
  return block || null
}

function pathLine(path) {
  return path ? `Navigation path: ${path}` : null
}

// A short continuity hint so vague follow-ups keep refining the same subject.
function focusLine(topic) {
  if (!topic || topic === 'general' || topic === 'guide') return null
  return `The conversation is currently focused on ${topic}. If the traveler's message is a brief refinement, keep building on that same thread rather than starting over.`
}

// System-message assembly is unified in buildGroqContext (Part 7), below. The
// persona/instruction constants and context sub-blocks above/below feed into it.

// ── World Knowledge Layer (12D-B Part 2) ─────────────────────────────────────
// A module-level, immutable index over the canonical Knowledge Objects, built
// ONCE at module evaluation — never in a hook, never in render, never memoized.
// It reasons over normalized entries only (Step 6: source-agnostic), so when
// LocationContextBuilder later emits the same Knowledge Object shape from live
// APIs, this layer indexes it unchanged. Part 2 builds the layer only; semantic
// ranking and any Groq wiring arrive in later parts.

// Tokens are the reasoning surface: lowercase word units, short/stop words
// dropped, deduped per entry. Unicode-aware so accented names (café, Þingvellir)
// still tokenize.
const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'into', 'over', 'you', 'your', 'that',
  'this', 'are', 'was', 'its', 'his', 'her', 'their', 'a', 'an', 'of', 'in',
  'on', 'to', 'at', 'by', 'de', 'di', 'la', 'le', 'el',
])

function tokenize(text) {
  const matches = String(text ?? '')
    .toLowerCase()
    .match(/[\p{L}\p{N}]+/gu)
  if (!matches) return []
  return matches.filter((w) => w.length >= 3 && !STOPWORDS.has(w))
}

// Curated budget is prose ("Premium · €150–350 / day"); derive a coarse category.
function deriveBudget(budget) {
  if (!budget) return null
  const s = String(budget).toLowerCase()
  if (s.includes('affordable') || s.includes('budget') || s.includes('cheap') || s.includes('backpack')) return 'budget'
  if (s.includes('moderate') || s.includes('mid-range') || s.includes('mid range') || s.includes('flexible') || s.includes('value')) return 'moderate'
  if (s.includes('premium')) return 'premium'
  if (s.includes('expensive') || s.includes('pricey') || s.includes('costly')) return 'expensive'
  if (s.includes('luxury') || s.includes('high-end')) return 'luxury'
  return null
}

const SEASON_RE = /\b(spring|summer|autumn|fall|winter|monsoon|january|february|march|april|may|june|july|august|september|october|november|december)\b/g

function seasonTokens(text) {
  if (!text) return []
  return String(text).toLowerCase().match(SEASON_RE) ?? []
}

const asStringList = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [])
const namesOf = (arr) => (Array.isArray(arr) ? arr.map((x) => x?.name).filter(Boolean) : [])

// Lightweight semantic representation of one Knowledge Object — never the whole
// object. Missing fields degrade gracefully (state/parent/aliases don't exist on
// curated data today). Reuses compressReply for a small summary excerpt.
function normalizeEntry(loc) {
  const moods = asStringList(loc.moods)
  const travelStyle = asStringList(loc.travelStyle)
  const budgetCategory = deriveBudget(loc.budget)

  const tokens = new Set()
  const add = (text) => {
    for (const t of tokenize(text)) tokens.add(t)
  }
  add(loc.name)
  add(loc.country)
  add(loc.continent)
  moods.forEach(add)
  travelStyle.forEach(add)
  if (budgetCategory) tokens.add(budgetCategory)
  seasonTokens(loc.bestSeason).forEach((t) => tokens.add(t))
  namesOf(loc.wonders).forEach(add)
  namesOf(loc.hiddenGems).forEach(add)
  namesOf(loc.food).forEach(add)
  namesOf(loc.adventures).forEach(add)
  namesOf(loc.culture?.festivals).forEach(add)

  return Object.freeze({
    id: loc.id ?? null,
    name: loc.name ?? null,
    nameLower: (loc.name ?? '').toLowerCase(),
    country: loc.country ?? null,
    continent: loc.continent ?? null,
    state: loc.state ?? null, // absent on curated data — graceful
    parent: loc.parent ?? null, // absent on curated data — graceful
    lat: typeof loc.lat === 'number' ? loc.lat : null,
    lng: typeof loc.lng === 'number' ? loc.lng : null,
    moods: Object.freeze(moods.slice()),
    moodsLower: Object.freeze(moods.map((m) => m.toLowerCase())),
    travelStyle: Object.freeze(travelStyle.slice()),
    travelStyleLower: Object.freeze(travelStyle.map((s) => s.toLowerCase())),
    budget: loc.budget ?? null,
    budgetCategory,
    bestSeason: loc.bestSeason ?? null,
    summary: compressReply(loc.aiSummary || loc.story || ''),
    tokens: Object.freeze([...tokens]),
  })
}

// Build the immutable layer: one normalized list + constant-time lookup maps that
// POINT AT the entries (no duplicated data). Operates only on the objects passed
// in, so it never depends on destinations.js specifics.
function buildWorldKnowledge(objects) {
  const entries = []
  const byId = new Map()
  const byName = new Map()
  const byCountry = new Map()
  const byContinent = new Map()

  const pushMulti = (map, key, entry) => {
    if (!key) return
    const k = String(key).toLowerCase()
    const bucket = map.get(k)
    if (bucket) bucket.push(entry)
    else map.set(k, [entry])
  }

  for (const loc of Array.isArray(objects) ? objects : []) {
    if (!loc) continue
    const entry = normalizeEntry(loc)
    entries.push(entry)
    if (entry.id) byId.set(String(entry.id).toLowerCase(), entry)
    if (entry.nameLower) byName.set(entry.nameLower, entry)
    pushMulti(byCountry, entry.country, entry)
    pushMulti(byContinent, entry.continent, entry)
  }

  for (const bucket of byCountry.values()) Object.freeze(bucket)
  for (const bucket of byContinent.values()) Object.freeze(bucket)

  return Object.freeze({
    entries: Object.freeze(entries),
    byId,
    byName,
    byCountry,
    byContinent,
  })
}

// Built exactly once, at module load. Its lifetime equals the module lifetime.
const WORLD = buildWorldKnowledge(destinations)

// ── Semantic Search Engine (12D-B Part 3) ────────────────────────────────────
// Deterministic semantic scoring over WORLD.entries only (never destinations,
// never WORLD rebuilt). Single-pass scoring + one sort. The foundation for
// recommendations / comparison / explorer / preference matching in later parts,
// and source-agnostic so LocationContextBuilder needs zero changes here.

const BUDGET_WORDS = ['budget', 'cheap', 'affordable', 'backpacking', 'backpack']
const LUX_WORDS = ['luxury', 'premium', 'honeymoon']
const SEASONS = ['spring', 'summer', 'autumn', 'fall', 'winter', 'monsoon']

const hasAny = (set, arr) => arr.some((w) => set.has(w))

// Normalize the query ONCE: lowercase, strip punctuation, collapse whitespace,
// plus a deduped word set (reusing the Part 2 tokenizer → drops stop/short words).
function normalizeQuery(query) {
  const queryStr = String(query ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return { queryStr, words: new Set(tokenize(query)) }
}

// Score one entry against a normalized query. Pure/read-only — never mutates the
// entry. Pass a `breakdown` array (dev/debug only) to collect labeled points.
function scoreEntry(entry, q, breakdown) {
  const { queryStr, words } = q
  let score = 0
  const add = (points, label) => {
    score += points
    if (breakdown) breakdown.push({ points, label })
  }

  // Place identity — substring match against the normalized query string.
  if (entry.nameLower && queryStr.includes(entry.nameLower)) add(100, 'name')
  if (entry.country && queryStr.includes(entry.country.toLowerCase())) add(40, 'country')
  if (entry.continent && queryStr.includes(entry.continent.toLowerCase())) add(20, 'continent')

  // Moods (+18 each) — exact word match, or substring for multi-word moods.
  let moodMatches = 0
  for (const m of entry.moodsLower) {
    if (words.has(m) || (m.includes(' ') && queryStr.includes(m))) moodMatches += 1
  }
  if (moodMatches) add(moodMatches * 18, `mood x${moodMatches}`)

  // Travel style (+14 each).
  let styleMatches = 0
  for (const s of entry.travelStyleLower) {
    if (words.has(s) || (s.includes(' ') && queryStr.includes(s))) styleMatches += 1
  }
  if (styleMatches) add(styleMatches * 14, `travelStyle x${styleMatches}`)

  // Budget intent (+18).
  if (entry.budgetCategory === 'budget' && hasAny(words, BUDGET_WORDS)) add(18, 'budget')
  if ((entry.budgetCategory === 'premium' || entry.budgetCategory === 'expensive') && hasAny(words, LUX_WORDS)) {
    add(18, 'budget-premium')
  }

  // Season (+12 per matching season the entry actually shares).
  let seasonScore = 0
  for (const s of SEASONS) {
    if (words.has(s) && entry.tokens.includes(s)) seasonScore += 12
  }
  if (seasonScore) add(seasonScore, 'season')

  // Semantic tokens (+4 each, capped at 24 to prevent keyword spam).
  let tokenMatches = 0
  for (const w of words) {
    if (entry.tokens.includes(w)) tokenMatches += 1
  }
  if (tokenMatches) add(Math.min(tokenMatches * 4, 24), `tokens x${tokenMatches}`)

  return { score, moodMatches, styleMatches }
}

// Deterministic ranked search. Single pass over WORLD.entries, one sort, slice.
function semanticSearch(query, options = {}) {
  const { currentId, limit = 5, excludeVisited = false, visitedIds = [] } = options
  const q = normalizeQuery(query)
  const visited = visitedIds && visitedIds.length ? new Set(visitedIds) : null

  const scored = []
  for (const entry of WORLD.entries) {
    // Current location: the -9999 rule realized as exclusion — never recommended.
    if (currentId && entry.id === currentId) continue
    const isVisited = visited ? visited.has(entry.id) : false
    if (isVisited && excludeVisited) continue
    const { score, moodMatches, styleMatches } = scoreEntry(entry, q)
    scored.push({
      entry,
      score: isVisited ? score - 20 : score,
      moodMatches,
      styleMatches,
    })
  }

  // Deterministic tie-break: score → more moods → more styles → alphabetical.
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      b.moodMatches - a.moodMatches ||
      b.styleMatches - a.styleMatches ||
      a.entry.name.localeCompare(b.entry.name)
  )

  return scored.slice(0, limit).map(({ entry, score }) => ({
    id: entry.id,
    name: entry.name,
    country: entry.country,
    continent: entry.continent,
    score,
    summary: entry.summary,
    moods: entry.moods,
    travelStyle: entry.travelStyle,
    budgetCategory: entry.budgetCategory,
    bestSeason: entry.bestSeason,
  }))
}

// Dev-only: top 5 with per-signal score breakdown. Never used in production.
function debugSemanticSearch(query) {
  const q = normalizeQuery(query)
  const scored = WORLD.entries.map((entry) => {
    const breakdown = []
    const { score } = scoreEntry(entry, q, breakdown)
    return { id: entry.id, name: entry.name, score, breakdown }
  })
  scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  return scored.slice(0, 5)
}

if (import.meta.env.DEV) {
  // Console access in dev: window.ellieSearch.semanticSearch('luxury beach')
  window.ellieSearch = { semanticSearch, debug: debugSemanticSearch }
}

// ── Preference Memory (12D-B Part 4) ─────────────────────────────────────────
// Ephemeral, session-only travel preferences learned from the conversation.
// Module-level ONLY — never React state, never Zustand, never persisted. Sits
// between the user message and semantic search / world context: it enriches
// later stages, never searches or calls Groq itself. Lives for the module (tab)
// lifetime.
const elliePreferences = {
  crowds: null, // 'low' | 'high'
  budget: null, // 'low' | 'luxury'
  terrain: null, // 'mountain' | 'coastal' | 'nature' | 'urban'
  climate: null, // 'cold' | 'warm'
  interests: new Set(),
  travelStyle: new Set(),
}

// Intent markers gate the AMBIGUOUS overwrite categories (terrain/climate): a
// noun alone ("I visited a mountain once") must not set a preference, but an
// expressed desire ("I love mountain destinations") does.
const INTENT_RE = /\b(love|loved|prefer|prefers?|want|wanna|like|likes?|enjoy|into|looking for|rather|favou?rite|somewhere|give me|show me|need|craving|dream|keen on|interested in)\b/i

const CROWD_LOW_RE = /\b(fewer crowds?|less crowded|avoid tourists?|not touristy|non-touristy|peaceful|quiet(?:er)?|hidden places?|off-?beat|off the beaten|secluded|serene)\b/i
const CROWD_HIGH_RE = /\b(lively|nightlife|busy cit(?:y|ies)|bustling|popular destinations?|vibrant|party)\b/i
const BUDGET_LOW_RE = /\b(budget|cheap|backpacking|backpack|affordable|shoestring|inexpensive)\b/i
const BUDGET_LUX_RE = /\b(luxur(?:y|ious)|premium|honeymoon|five[- ]star|5[- ]star|high[- ]end|upscale|splurge)\b/i

const TERRAIN_RULES = [
  { re: /\b(mountains?|trek(?:king)?|hik(?:e|ing)|alpine|peaks?)\b/i, value: 'mountain' },
  { re: /\b(beach(?:es)?|ocean|coast(?:al)?|islands?|seaside|\bsea\b)\b/i, value: 'coastal' },
  { re: /\b(forests?|jungle|rainforest|wildlife|safari)\b/i, value: 'nature' },
  { re: /\b(cit(?:y|ies)|urban|architecture|metropolis|skyline)\b/i, value: 'urban' },
]
const CLIMATE_RULES = [
  { re: /\b(winter|snow(?:y)?|cold|chilly|arctic|frosty)\b/i, value: 'cold' },
  { re: /\b(summer|tropical|warm|hot|sunny|sunshine)\b/i, value: 'warm' },
]
const INTEREST_RULES = [
  ['history', /\b(history|historical|heritage|ancient)\b/i],
  ['culture', /\b(culture|cultural|traditions?|local life)\b/i],
  ['food', /\b(food|foodie|cuisine|dining|culinary|street food)\b/i],
  ['photography', /\b(photo|photos|photography|photograph)\b/i],
  ['architecture', /\b(architecture|architectural)\b/i],
  ['temples', /\b(temples?|shrines?)\b/i],
  ['wildlife', /\b(wildlife|safari|animals?)\b/i],
  ['coffee', /\b(coffee|caf[eé]s?)\b/i],
  ['art', /\b(\bart\b|galler(?:y|ies))\b/i],
  ['museums', /\b(museums?)\b/i],
  ['festivals', /\b(festivals?)\b/i],
  ['adventure', /\b(adventure|adventurous|adrenaline)\b/i],
  ['nature', /\b(nature|outdoors)\b/i],
  ['nightlife', /\b(nightlife|clubbing|bars)\b/i],
]
const STYLE_RULES = [
  ['solo', /\b(solo|by myself)\b/i],
  ['family', /\b(family|kids|children)\b/i],
  ['couple', /\b(couple|partner|honeymoon)\b/i],
  ['road trip', /\b(road[- ]?trip)\b/i],
  ['slow travel', /\b(slow travel|slow-paced|take it slow)\b/i],
  ['backpacking', /\b(backpacking|backpack)\b/i],
  ['luxury travel', /\b(luxury travel|luxury trip)\b/i],
]

// Analyse a single user message. Only high-confidence, explicit intent mutates
// memory; unrelated preferences are left untouched; interests/style accumulate.
function updatePreferences(message) {
  const text = String(message ?? '')
  if (!text.trim()) return
  const intent = INTENT_RE.test(text)

  // Crowds / budget — the trigger phrases are themselves preference-expressing.
  if (CROWD_LOW_RE.test(text)) elliePreferences.crowds = 'low'
  else if (CROWD_HIGH_RE.test(text)) elliePreferences.crowds = 'high'

  if (BUDGET_LUX_RE.test(text)) elliePreferences.budget = 'luxury'
  else if (BUDGET_LOW_RE.test(text)) elliePreferences.budget = 'low'

  // Terrain / climate — ambiguous nouns, so require an intent marker.
  if (intent) {
    for (const r of TERRAIN_RULES) {
      if (r.re.test(text)) {
        elliePreferences.terrain = r.value
        break
      }
    }
    for (const r of CLIMATE_RULES) {
      if (r.re.test(text)) {
        elliePreferences.climate = r.value
        break
      }
    }
  }

  // Accumulate — never overwrite.
  for (const [key, re] of INTEREST_RULES) if (re.test(text)) elliePreferences.interests.add(key)
  for (const [key, re] of STYLE_RULES) if (re.test(text)) elliePreferences.travelStyle.add(key)
}

// Lightweight snapshot for prompt/search construction. Empty categories omitted;
// null values never included.
function getCurrentPreferences() {
  const out = {}
  if (elliePreferences.crowds) out.crowds = elliePreferences.crowds
  if (elliePreferences.budget) out.budget = elliePreferences.budget
  if (elliePreferences.terrain) out.terrain = elliePreferences.terrain
  if (elliePreferences.climate) out.climate = elliePreferences.climate
  if (elliePreferences.interests.size) out.interests = [...elliePreferences.interests]
  if (elliePreferences.travelStyle.size) out.travelStyle = [...elliePreferences.travelStyle]
  return out
}

// Expand preferences into search-friendly words that match curated moods/tokens.
const TERRAIN_HINT = {
  mountain: 'mountain hiking trek alpine',
  coastal: 'beach coast island ocean',
  nature: 'nature wildlife forest jungle',
  urban: 'city urban architecture',
}
function preferenceQuery() {
  const p = getCurrentPreferences()
  const parts = []
  if (p.terrain) parts.push(TERRAIN_HINT[p.terrain] ?? p.terrain)
  if (p.climate) parts.push(p.climate)
  if (p.crowds === 'low') parts.push('quiet offbeat hidden')
  if (p.crowds === 'high') parts.push('lively nightlife popular')
  if (p.budget === 'low') parts.push('budget affordable')
  if (p.budget === 'luxury') parts.push('luxury premium')
  if (p.interests) parts.push(...p.interests)
  if (p.travelStyle) parts.push(...p.travelStyle)
  return parts.join(' ')
}

// Groq context: a Traveller Preferences section, only when preferences exist.
function preferenceContextBlock() {
  const p = getCurrentPreferences()
  if (!Object.keys(p).length) return null
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
  const lines = ['Traveller Preferences']
  if (p.terrain) lines.push(`Preferred terrain: ${cap(p.terrain)}`)
  if (p.climate) lines.push(`Preferred climate: ${cap(p.climate)}`)
  if (p.budget) lines.push(`Budget: ${cap(p.budget)}`)
  if (p.crowds) lines.push(`Avoids crowds: ${p.crowds === 'low' ? 'Yes' : 'No'}`)
  if (p.interests) lines.push(`Interests: ${p.interests.map(cap).join(', ')}`)
  if (p.travelStyle) lines.push(`Travel style: ${p.travelStyle.map(cap).join(', ')}`)
  lines.push(
    'When making recommendations, naturally favour destinations matching these preferences. Do not explicitly list the preferences unless helpful.'
  )
  return lines.join('\n')
}

const fullById = (id) => destinations.find((d) => d.id === id) ?? null

// ── Recommendation Engine (12D-B Part 5) ─────────────────────────────────────
// Explorer selection = the engine picks, Groq only explains. Reuses preferences +
// semanticSearch (never destinations, never re-indexing WORLD). Produces a small
// pool diversified across country/continent/mood/style, novelty-rewarded, and
// steered away from where the traveller already is.
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

const shareAny = (a, b) => {
  if (!a?.length || !b?.length) return false
  const set = new Set(a.map((x) => String(x).toLowerCase()))
  return b.some((x) => set.has(String(x).toLowerCase()))
}

// Diversity pass: penalize a candidate for overlapping the already-chosen picks.
function diversityPenalty(cand, chosen) {
  let p = 0
  for (const c of chosen) {
    if (c.country && c.country === cand.country) p += 25
    if (c.continent && c.continent === cand.continent) p += 10
    if (shareAny(c.travelStyle, cand.travelStyle)) p += 10
    if (shareAny(c.moods, cand.moods)) p += 6
  }
  return p
}

// Assemble the recommendation pool from semanticSearch, then fine-tune order with
// novelty + stay-away-from-current + a greedy diversity pass. Never invents,
// never bypasses WORLD, never permanently bans visited (only lowers them).
function buildRecommendations(currentLocation, visitedHistory = []) {
  const visited = new Set(visitedHistory)
  const prefQ = preferenceQuery()

  const opts = {
    currentId: currentLocation?.id,
    excludeVisited: false, // penalize visited (−20 in the engine), don't ban
    visitedIds: visitedHistory,
    limit: 15,
  }
  // Strong preference matches first; widen to the general pool if too few surface.
  let pool = prefQ ? semanticSearch(prefQ, opts) : []
  if (pool.length < 3) pool = semanticSearch('', opts)
  if (!pool.length) return []

  const currentCountry = currentLocation?.country ?? null
  const scored = pool.map((r) => {
    let rec = r.score
    if (!visited.has(r.id)) rec += 8 // novelty bonus rewards discovery
    if (currentCountry && r.country === currentCountry) rec -= 30 // go somewhere different
    return { ...r, rec }
  })

  // Greedy diversity: strongest match stays first, then maximize spread.
  const remaining = scored.sort((a, b) => b.rec - a.rec || a.name.localeCompare(b.name))
  const chosen = []
  while (remaining.length && chosen.length < 5) {
    let bestIdx = 0
    let bestVal = -Infinity
    for (let i = 0; i < remaining.length; i += 1) {
      const val = remaining[i].rec - (chosen.length ? diversityPenalty(remaining[i], chosen) : 0)
      if (val > bestVal) {
        bestVal = val
        bestIdx = i
      }
    }
    chosen.push(remaining.splice(bestIdx, 1)[0])
  }
  return chosen
}

// Concise Groq context: the top 3 with a short reason + real coordinates, so the
// flyTo Groq emits for whichever one it picks is accurate.
function recommendationContextBlock(recs) {
  if (!recs.length) return null
  const lines = ['Recommended destinations (choose ONE to recommend to the traveller):']
  for (const r of recs.slice(0, 3)) {
    const full = fullById(r.id)
    const reason = [
      r.moods?.length ? r.moods.slice(0, 3).join(', ') : null,
      r.budgetCategory ? `${capitalize(r.budgetCategory)} budget` : null,
      r.bestSeason || null,
    ].filter(Boolean)
    const coord = full && full.lat != null ? ` [lat ${full.lat}, lng ${full.lng}]` : ''
    lines.push(`\n${r.name}, ${r.country}${coord}\nReason: ${reason.join(' · ')}`)
  }
  return lines.join('\n')
}

// ── Comparison Engine (12D-B Part 6) ─────────────────────────────────────────
// Ellie compares two REAL indexed destinations: the engine resolves both from
// WORLD and builds a structured comparison; Groq only explains it. Never invents,
// never bypasses WORLD, isolated from recommendation/explorer/general search.

const COMPARISON_INSTR =
  'You have personally experienced both destinations. Use ONLY the supplied structured ' +
  'comparison — never invent information. Explain what they share, then their key ' +
  'differences. If the traveller asked which is better, recommend the one that best fits ' +
  'the supplied traveller preferences, and be honest. At most three short paragraphs. ' +
  'End naturally.'

// Explicit comparison keywords, plus a loose "or" hook that the resolver confirms
// (if two real destinations don't resolve, we fall back to normal conversation).
const CMP_KEYWORDS_RE = /\b(compare|versus|better than|which is better|which one|difference between)\b|\bvs\.?\b|\bshould i (?:visit|choose|go to|pick)\b/i
// The traveller is explicitly asking us to pick a winner.
const CMP_DECISION_RE = /\b(which (?:is |one )?(?:is )?better|which should i|should i (?:choose|pick|visit|go)|better (?:choice|option|for me|fit)|which would you)\b/i

function detectComparison(message) {
  const m = String(message ?? '')
  return CMP_KEYWORDS_RE.test(m) || /\bor\b/i.test(m)
}

// Resolve up to two WORLD entities from the message: name (highest confidence) →
// country → continent (lowest). Partial/prefix name matching supported. Ordered
// by where they appear in the message. Fewer than two → null (never fabricate).
function resolveComparisonTargets(message) {
  const text = String(message ?? '').toLowerCase()
  const words = tokenize(message)
  const posOf = (needle) => {
    const i = text.indexOf(needle)
    return i === -1 ? Infinity : i
  }

  const picks = []
  const usedIds = new Set()
  const usedCountries = new Set()
  const push = (entry, pos, conf) => {
    if (!entry || usedIds.has(entry.id)) return
    usedIds.add(entry.id)
    if (entry.country) usedCountries.add(entry.country.toLowerCase())
    picks.push({ entry, pos, conf })
  }

  // 1) Name matches — exact substring, else prefix-partial on a name word.
  for (const e of WORLD.entries) {
    if (!e.nameLower) continue
    if (text.includes(e.nameLower)) {
      push(e, posOf(e.nameLower), 100)
      continue
    }
    let pos = Infinity
    let hit = false
    const nameWords = e.nameLower.split(/\s+/)
    for (const w of words) {
      if (w.length < 4) continue
      for (const nw of nameWords) {
        if (nw.length >= 4 && (nw.startsWith(w) || w.startsWith(nw))) {
          hit = true
          pos = Math.min(pos, posOf(w))
        }
      }
    }
    if (hit) push(e, pos, 80)
  }

  // 2) Country matches — one representative per country not already covered.
  if (picks.length < 2) {
    for (const [country, bucket] of WORLD.byCountry) {
      if (usedCountries.has(country)) continue
      if (text.includes(country)) push(bucket[0], posOf(country), 60)
    }
  }

  // 3) Continent matches — one representative per continent.
  if (picks.length < 2) {
    for (const [continent, bucket] of WORLD.byContinent) {
      if (text.includes(continent)) {
        const e = bucket.find((x) => !usedIds.has(x.id))
        if (e) push(e, posOf(continent), 40)
      }
    }
  }

  if (picks.length < 2) return null
  picks.sort((a, b) => a.pos - b.pos || b.conf - a.conf)
  return { left: picks[0].entry, right: picks[1].entry }
}

const intersect = (a, b) => {
  const set = new Set(a ?? [])
  return (b ?? []).filter((x) => set.has(x))
}

// Structured, real-data-only comparison of the two entries.
function buildComparisonContext(left, right) {
  const block = (e, label) =>
    [
      label,
      `Name: ${e.name}`,
      e.country ? `Country: ${e.country}` : null,
      e.continent ? `Continent: ${e.continent}` : null,
      e.budgetCategory ? `Budget: ${capitalize(e.budgetCategory)}` : null,
      e.bestSeason ? `Best season: ${e.bestSeason}` : null,
      e.travelStyle?.length ? `Travel styles: ${e.travelStyle.join(', ')}` : null,
      e.moods?.length ? `Moods: ${e.moods.join(', ')}` : null,
      e.summary ? `Summary: ${e.summary}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  return `${block(left, 'Destination A')}\n\n${block(right, 'Destination B')}`
}

// Overlap + differences, so Groq reasons from richer context (not raw fields).
function comparisonSimilarity(left, right) {
  const lines = []
  const sharedMoods = intersect(left.moodsLower, right.moodsLower)
  const sharedStyles = intersect(left.travelStyleLower, right.travelStyleLower)
  if (sharedMoods.length) lines.push(`Shared moods: ${sharedMoods.join(', ')}`)
  if (sharedStyles.length) lines.push(`Shared travel styles: ${sharedStyles.join(', ')}`)
  if (left.budgetCategory && left.budgetCategory === right.budgetCategory) {
    lines.push(`Both are ${left.budgetCategory} budget`)
  }
  if (left.continent && left.continent === right.continent) lines.push(`Both in ${left.continent}`)
  if (left.continent && right.continent && left.continent !== right.continent) {
    lines.push(`Different continents: ${left.continent} vs ${right.continent}`)
  }
  if (left.budgetCategory && right.budgetCategory && left.budgetCategory !== right.budgetCategory) {
    lines.push(`Different budgets: ${left.budgetCategory} vs ${right.budgetCategory}`)
  }
  return lines.length ? `Similarities & differences:\n${lines.join('\n')}` : null
}

// Winner hints — only when the traveller explicitly asks which is better. Pulls
// from Part 4 preference memory. Provides hints; never decides.
function comparisonDecisionHints(message) {
  if (!CMP_DECISION_RE.test(String(message ?? ''))) return null
  const p = getCurrentPreferences()
  if (!Object.keys(p).length) {
    return 'The traveller asked which is better but has expressed no clear preferences yet — weigh both honestly.'
  }
  const bits = []
  if (p.terrain) bits.push(`prefers ${p.terrain} terrain`)
  if (p.climate) bits.push(`prefers ${p.climate} climate`)
  if (p.budget) bits.push(`${p.budget} budget`)
  if (p.crowds) bits.push(p.crowds === 'low' ? 'avoids crowds' : 'enjoys lively places')
  if (p.interests) bits.push(`interested in ${p.interests.join(', ')}`)
  if (p.travelStyle) bits.push(`travel style ${p.travelStyle.join(', ')}`)
  return `The traveller asked which is better. Traveller preferences to weigh: ${bits.join('; ')}. Recommend the one that best fits, and be honest.`
}

// ── Unified Groq Context Builder (12D-B Part 7) ──────────────────────────────
// The single place a Groq system message is assembled, in deterministic layers:
//   1 personality · 2 current location · 3 preferences · 4 recommendations ·
//   5 comparison (isolated) · 6 world context · 7 navigation.
// The engine has already decided WHAT to say; this only arranges it for Groq to
// WRITE. Grounding is appended whenever engine-selected candidates are supplied.
const GROUNDING =
  'Only discuss the locations supplied above. Never invent destinations, never invent ' +
  'facts, and never mention places outside the supplied context. If there is not enough ' +
  'information to answer well, say so honestly.'

const NO_RECS =
  'No curated recommendations are available for this request. Be honest about that and ' +
  'offer broad travel themes or a clarifying question instead — never invent specific ' +
  'destinations.'

// Layer 6 — world-level candidates: compact summaries + coordinates. Supplies the
// top 3 (well under the 5 ceiling) and never dumps raw dataset objects (summary is
// the Part-2 compressed excerpt).
function worldContextBlock(candidates) {
  if (!candidates?.length) return null
  const lines = ['World knowledge (reason ONLY over these real destinations):']
  for (const r of candidates.slice(0, 3)) {
    const full = fullById(r.id)
    const coord = full && full.lat != null ? ` [lat ${full.lat}, lng ${full.lng}]` : ''
    const summary =
      r.summary ||
      [r.moods?.slice(0, 3).join(', '), r.budgetCategory && `${capitalize(r.budgetCategory)} budget`]
        .filter(Boolean)
        .join(' · ')
    lines.push(`\n${r.name}, ${r.country}${coord}\n${summary}`)
  }
  return lines.join('\n')
}

function buildGroqContext({
  mode,
  currentLocation,
  path,
  topic,
  userMessage,
  recommendations,
  comparison,
  worldContext,
}) {
  const layers = [BASE_PERSONA] // Layer 1 — always first

  // Layer 5 — comparison is isolated: no recommendations, no world, no nav.
  if (comparison) {
    layers.push(
      COMPARISON_INSTR,
      buildComparisonContext(comparison.left, comparison.right),
      comparisonSimilarity(comparison.left, comparison.right),
      comparisonDecisionHints(userMessage),
      GROUNDING
    )
    return layers.filter(Boolean).join('\n\n')
  }

  const prefBlock = preferenceContextBlock() // Layer 3 — only when preferences exist

  if (mode === 'explorer') {
    layers.push(EXPLORER_INSTR)
    layers.push(recommendations?.length ? recommendationContextBlock(recommendations) : NO_RECS) // Layer 4 (≤3)
    layers.push(prefBlock) // Layer 3
    layers.push(NAV_DIRECTIVE) // Layer 7
    if (recommendations?.length) layers.push(GROUNDING)
    return layers.filter(Boolean).join('\n\n')
  }

  if (mode === 'planner') {
    const ctx = [pathLine(path), placeBlock(currentLocation), seasonsBlock(currentLocation)]
      .filter(Boolean)
      .join('\n\n')
    layers.push(PLANNER_INSTR, ctx, prefBlock, focusLine(topic))
    return layers.filter(Boolean).join('\n\n')
  }

  if (mode === 'discovery' || !currentLocation) {
    layers.push(DISCOVERY_INSTR, 'User is exploring the globe; no specific location is selected.')
    layers.push(prefBlock) // Layer 3
    if (worldContext?.length) {
      layers.push(worldContextBlock(worldContext)) // Layer 6 (≤5)
      layers.push(GROUNDING)
    }
    layers.push(focusLine(topic), NAV_DIRECTIVE) // Layer 7
    return layers.filter(Boolean).join('\n\n')
  }

  // Layer 2 — guide: current location only, nothing extra.
  const ctx = [
    pathLine(path),
    placeBlock(currentLocation),
    seasonsBlock(currentLocation),
    cultureBlock(currentLocation),
  ]
    .filter(Boolean)
    .join('\n\n')
  layers.push(GUIDE_INSTR, ctx, prefBlock, focusLine(topic))
  return layers.filter(Boolean).join('\n\n')
}

// ── flyTo navigation (12C-A) ─────────────────────────────────────────────────
// A complete flyTo block (the inner object has no braces, so [^}]+ is exact).
const FLYTO_RE = /\{"flyTo":\{[^}]+\}\}/
const FLYTO_RE_G = /\{"flyTo":\{[^}]+\}\}/g

// Strip flyTo JSON for display: remove any completed block, and hide a trailing
// partial block (not yet closed) so the user never sees raw JSON mid-stream.
function stripForDisplay(text) {
  let out = text.replace(FLYTO_RE_G, '')
  const partial = out.indexOf('{"flyTo"')
  if (partial !== -1) out = out.slice(0, partial)
  return out
}

// Parse one flyTo block and navigate using the EXISTING pipeline. resolveNode →
// pushLevel (recursive nav, which CameraRig already flies on); otherwise a minimal
// coords node routed through the same pipeline (type 'state' ≈ altitude 1.8).
// flyTo() the hook can't be called outside the R3F canvas, so navigation goes
// through pushLevel/activeDestination. Never throws — malformed JSON is ignored.
function navigateFromJson(jsonStr) {
  try {
    const fly = JSON.parse(jsonStr)?.flyTo
    if (!fly) return
    const { lat, lng, name } = fly
    const node = name ? resolveNode(name) : null
    const { pushLevel } = useStore.getState()
    if (node) {
      pushLevel(node)
    } else if (lat != null && lng != null) {
      pushLevel({ name: name ?? 'Destination', lat, lng, type: 'state' })
    }
  } catch {
    // malformed flyTo JSON — ignore, keep streaming.
  }
}

// ── Streaming (unchanged from 12B-A) ─────────────────────────────────────────
async function streamGroq(messages, onToken, signal) {
  const key = import.meta.env.VITE_GROQ_KEY
  if (!key) throw new Error('no-key')

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', stream: true, max_tokens: 700, messages }),
    signal,
  })
  if (!res.ok || !res.body) throw new Error('bad-response')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let acc = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    acc += decoder.decode(value, { stream: true })
    const lines = acc.split('\n')
    acc = lines.pop() ?? ''
    for (const line of lines) {
      const t = line.trim()
      if (!t.startsWith('data:')) continue
      const data = t.slice(5).trim()
      if (data === '[DONE]') continue
      try {
        const token = JSON.parse(data)?.choices?.[0]?.delta?.content
        if (token) {
          buffer += token
          onToken(buffer)
        }
      } catch {
        // partial JSON across chunk boundary — ignore.
      }
    }
  }
  return buffer
}

function EllieModule({ activeLocation }) {
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const streamingRef = useRef(false)
  // Cancellation: each send bumps runIdRef and owns an AbortController. A new send
  // aborts the in-flight stream; stale invocations bail on the runId mismatch so
  // they never touch the UI that now belongs to the newer prompt.
  const abortRef = useRef(null)
  const runIdRef = useRef(0)

  // ellieMode is read only to pick the idle greeting — it changes at most once per
  // message, never per token, so it costs no streaming rerenders.
  const ellieMode = useStore((s) => s.ellieMode)
  const setEllieMode = useStore((s) => s.setEllieMode)
  const setEllieHistory = useStore((s) => s.setEllieHistory)
  const setEllieStreamText = useStore((s) => s.setEllieStreamText)
  const setLastEllieSuggestion = useStore((s) => s.setLastEllieSuggestion)
  const setEllieConversationTopic = useStore((s) => s.setEllieConversationTopic)
  const setEllieThinking = useStore((s) => s.setEllieThinking)

  const guide = !!activeLocation
  const placeholder = guide
    ? `Ask Ellie about ${activeLocation.name}...`
    : "Tell Ellie what you're looking for..."
  const canSend = input.trim().length > 0

  // Set the baseline mode for a FRESH conversation only — never clobber a
  // remembered Planner/Explorer mode once an exchange is underway.
  useEffect(() => {
    if (useStore.getState().ellieHistory.length === 0) {
      setEllieMode(activeLocation ? 'guide' : 'discovery')
      setEllieConversationTopic('general')
    }
  }, [activeLocation, setEllieMode, setEllieConversationTopic])

  const sendToEllie = useCallback(
    async (raw) => {
      const prompt = String(raw ?? '').trim()
      if (!prompt) return

      // Interrupt any in-flight reply, then claim this run.
      if (streamingRef.current && abortRef.current) abortRef.current.abort()
      const myRun = (runIdRef.current += 1)
      const controller = new AbortController()
      abortRef.current = controller
      const isCurrent = () => runIdRef.current === myRun

      streamingRef.current = true
      setStarted(true)
      setInput('')
      setEllieStreamText('')
      setEllieThinking(true)

      const store = useStore.getState()
      // Learn preferences from THIS message before any search / context building.
      updatePreferences(prompt)
      const mode = determineEllieMode(activeLocation, prompt, store.ellieMode)
      setEllieMode(mode)
      const topic = detectTopic(prompt, mode, store.ellieConversationTopic)
      // Comparison intent takes precedence and bypasses recommendation/explorer/
      // general search. The engine resolves both destinations from WORLD; if two
      // don't resolve, we fall back to normal conversation (never hallucinate).
      const comparison = detectComparison(prompt) ? resolveComparisonTargets(prompt) : null

      const path = store.levelHistory.map((n) => n.name).join(' → ')
      // Stored transcript (capped). Assistant turns are compressed on the way in,
      // so replay stays light while the on-screen reply shows the full text.
      const historyWithUser = [...store.ellieHistory, { role: 'user', content: prompt }].slice(
        -MAX_HISTORY
      )
      setEllieHistory(historyWithUser)

      // Store BOTH the full reply and its summary; replay decides which to send.
      const appendAssistant = (text) =>
        setEllieHistory(
          [
            ...useStore.getState().ellieHistory,
            { role: 'assistant', content: text, summary: compressReply(text) },
          ].slice(-MAX_HISTORY)
        )

      // A finished reply commits the (compressed) turn and the remembered topic.
      const finishReply = (text) => {
        appendAssistant(text)
        setEllieConversationTopic(topic)
      }

      // Graceful, no-Groq responses when curated data can't support the mode.
      // Comparison bypasses all of this — only the two resolved destinations feed Groq.
      let recommendations = null
      let earlyMessage = null
      if (!comparison) {
        if (mode === 'planner' && !activeLocation) earlyMessage = PLANNER_SPARSE
        if (mode === 'explorer') {
          // The recommendation engine selects destinations; Groq only explains one.
          recommendations = buildRecommendations(activeLocation, store.visitedHistory)
          if (!recommendations.length) earlyMessage = EXPLORER_NONE
        }
      }
      if (earlyMessage) {
        setEllieThinking(false)
        setEllieStreamText(earlyMessage)
        finishReply(earlyMessage)
        streamingRef.current = false
        return
      }

      // Layer 6 — world-level candidates for discovery: the engine searches WORLD
      // (message + preferences) so Groq only reasons over real supplied destinations.
      // Gated on signal — a vague/greeting message stays an ungrounded, natural chat.
      let worldContext = null
      if (!comparison && mode !== 'explorer' && (mode === 'discovery' || !activeLocation)) {
        const worldQuery = `${prompt} ${preferenceQuery()}`.trim()
        const hits = semanticSearch(worldQuery, {
          currentId: activeLocation?.id,
          excludeVisited: false,
          visitedIds: store.visitedHistory,
          limit: 5,
        })
        if (hits.length && hits[0].score > 0) worldContext = hits
      }

      // Unified, deterministic prompt assembly — the engine has already decided
      // what to say; Groq only writes it.
      const system = buildGroqContext({
        mode,
        currentLocation: activeLocation,
        path,
        topic,
        userMessage: prompt,
        recommendations,
        comparison,
        worldContext,
      })
      // Replay the last 8 exchanges; within them, the newest assistant turns stay
      // full and older ones are summarized. System + location context ride separately.
      const replay = buildReplay(historyWithUser.slice(-REPLAY_MESSAGES))

      // Smooth, batched reveal (12D-A). Network tokens fill `target`; a rAF loop,
      // throttled to ~25ms, advances the displayed text a few characters at a time
      // — DOM updates are batched and characters appear smoothly, never whole
      // words. flyTo detection still runs per raw token (no setState there).
      let target = ''
      let shown = 0
      let done = false
      let firstToken = false
      let rafId = 0
      let lastFlush = 0
      const stopReveal = () => {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = 0
      }
      const tick = (now) => {
        if (!isCurrent()) {
          rafId = 0
          return // superseded by a newer prompt — stop touching the display
        }
        if (now - lastFlush >= 25) {
          lastFlush = now
          if (shown < target.length) {
            const remaining = target.length - shown
            const step = Math.max(1, Math.min(12, Math.ceil(remaining / 12)))
            shown = Math.min(target.length, shown + step)
            setEllieStreamText(target.slice(0, shown))
          } else if (done) {
            setEllieStreamText(target) // settle on the exact final text
            rafId = 0
            return
          }
        }
        rafId = requestAnimationFrame(tick)
      }

      let flyToTriggered = false
      const onToken = (buffer) => {
        if (!isCurrent()) return
        if (!firstToken) {
          firstToken = true
          setEllieThinking(false) // hide "thinking" the instant a token lands
        }
        if (!flyToTriggered) {
          const match = buffer.match(FLYTO_RE)
          if (match) {
            flyToTriggered = true
            navigateFromJson(match[0])
          }
        }
        target = stripForDisplay(buffer)
      }

      rafId = requestAnimationFrame(tick)

      try {
        const raw = await streamGroq(
          [{ role: 'system', content: system }, ...replay],
          onToken,
          controller.signal
        )
        if (!isCurrent()) return // a newer prompt now owns the UI
        const clean = stripForDisplay(raw).trim()
        if (clean) {
          target = clean
          done = true // let the reveal drain to the exact final text, then stop
          finishReply(clean)
          // Feed the persistent AIStrip — only on success, JSON already stripped.
          setLastEllieSuggestion(clean.slice(0, 120))
        } else {
          stopReveal()
          setEllieStreamText(ERROR_MESSAGE)
        }
      } catch {
        // Aborted streams (superseded) bail silently; real errors surface a message.
        if (isCurrent()) {
          stopReveal()
          setEllieStreamText(ERROR_MESSAGE)
        }
      } finally {
        if (isCurrent()) {
          setEllieThinking(false)
          streamingRef.current = false
        }
      }
    },
    [
      activeLocation,
      setEllieHistory,
      setEllieStreamText,
      setEllieMode,
      setLastEllieSuggestion,
      setEllieConversationTopic,
      setEllieThinking,
    ]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      sendToEllie(input)
    },
    [sendToEllie, input]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        minHeight: '70vh',
        maxWidth: 900,
        margin: '0 auto',
        padding: '40px 48px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`.ellie-input::placeholder { color: rgba(255,255,255,0.4); } .ellie-input { caret-color: #7dd3fc; }`}</style>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 24 }}>
        {started ? (
          <EllieDisplay />
        ) : (
          <>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(18px, 2.4vw, 26px)',
                fontWeight: 300,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.82)',
                whiteSpace: 'pre-line',
              }}
            >
              {greetingFor(ellieMode, activeLocation)}
            </p>
            <EllieSuggestions activeLocation={activeLocation} onSelect={sendToEllie} />
          </>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: 18,
        }}
      >
        <input
          className="ellie-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            // Esc clears the field; Ctrl/Cmd+Enter sends (plain Enter already
            // submits via the form).
            if (e.key === 'Escape') {
              setInput('')
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              sendToEllie(input)
            }
          }}
          placeholder={placeholder}
          aria-label="Ask Ellie"
          autoComplete="off"
          style={{
            flex: 1,
            minWidth: 0,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!canSend}
          style={{
            flexShrink: 0,
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(125,211,252,0.15)',
            color: '#7dd3fc',
            fontSize: 18,
            lineHeight: 1,
            opacity: canSend ? 1 : 0.35,
            cursor: canSend ? 'pointer' : 'default',
            transition: 'opacity 0.2s ease',
          }}
        >
          →
        </button>
      </form>
    </motion.div>
  )
}

export default memo(EllieModule)
