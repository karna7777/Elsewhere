// The AI Composer: the single generative layer for a searched place. It receives
// one KnowledgeObject (the factual layer) and performs EXACTLY ONE Groq request
// that returns every AI section together. Its output is shaped to be BYTE-FOR-BYTE
// compatible with the curated destination schema, so every existing module renders
// it with no adapters, no transforms, no `if (temporary)`. It invents nothing: any
// failure, malformed JSON, or missing/mistyped field yields null, and the caller
// keeps its placeholders. Partial AI is never returned.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'
const TIMEOUT_MS = 15000
const MAX_TAGLINE_WORDS = 12
const MAX_BESTSEASON_WORDS = 40

const SYSTEM_PROMPT =
  'You are a travel writer and seasoned local guide for Elsewhere, a cinematic ' +
  'atlas. Your voice blends National Geographic, Lonely Planet, and someone who has ' +
  'lived in a place for years — evocative, precise, and grounded strictly in what is ' +
  'genuinely true. You never sound like a chatbot or an encyclopedia. You never ' +
  'mention AI, never greet, never apologise. You never invent statistics, dates, ' +
  'historical events, dish names, or place names; when unsure of a specific you omit ' +
  'it (use an empty array) rather than fabricate. You never use markdown. You respond ' +
  'with a single JSON object and nothing else.'

// The prompt is built ONLY from the KnowledgeObject.
function buildUserPrompt(knowledge) {
  const b = knowledge?.basic ?? {}
  const where = [b.state, b.country].filter(Boolean).join(', ')
  const place = where ? `${b.name}, ${where}` : b.name
  const kind = b.type || 'place'
  const region = b.continent ? ` on the ${b.continent} landmass` : ''

  const background = knowledge?.wikipedia?.summary
    ? `\n\nVerified background (rely on this; do not contradict it and do not copy it verbatim):\n"${knowledge.wikipedia.summary}"`
    : ''
  const conditions = knowledge?.weather?.current ? `\n\nCurrent conditions here: ${knowledge.weather.current}.` : ''

  return (
    `Compose the complete Elsewhere experience for ${place}${region}. It is a ${kind}.` +
    background +
    conditions +
    '\n\nReturn a JSON object with EXACTLY these keys and these exact structures:\n' +
    '{\n' +
    '  "tagline": "one evocative line, at most 12 words",\n' +
    '  "story": "a single flowing paragraph of 180 to 280 words, present tense, no markdown, no lists, no greeting — the opening page of a travel feature grounded in what is authentically characteristic of this place",\n' +
    '  "bestSeason": "a single sentence naming the best months to visit and why, at most 40 words",\n' +
    '  "culture": {\n' +
    '    "history": [ { "year": "period or year, e.g. 8th century", "description": "what happened, one sentence" } ],\n' +
    '    "traditions": [ { "name": "tradition name", "description": "one sentence" } ],\n' +
    '    "festivals": [ { "name": "festival name", "when": "month(s)", "description": "one sentence" } ],\n' +
    '    "etiquette": [ "a concise local custom or etiquette rule", "..." ]\n' +
    '  },\n' +
    '  "food": [ { "name": "dish or drink", "description": "one sentence", "culturalSignificance": "one sentence on its local role", "imageQuery": "2-4 words that would find a PHOTO OF THIS DISH, e.g. \\"jalebi indian sweet\\" — never include the city or landmark name" } ],\n' +
    '  "hiddenGems": [ { "name": "a REAL lesser-known place here", "description": "one sentence", "tip": "one insider tip", "imageQuery": "2-4 words that would find a photo of THIS place" } ],\n' +
    '  "photography": [ { "title": "short shot title", "description": "one sentence on the shot" } ],\n' +
    '  "nearby": [ { "name": "a REAL place near here", "type": "city / landmark / nature / etc", "description": "one sentence", "imageQuery": "2-4 words that would find a photo of THIS place" } ],\n' +
    '  "travelTips": [ "a concise practical tip", "..." ],\n' +
    '  "moods": [ "single-word mood", "..." ]\n' +
    '}\n\n' +
    'Rules: history/traditions/festivals 3-5 entries each; etiquette 3-5; food 4-6; ' +
    'hiddenGems 4-6 REAL places (never invented); photography 3-5; nearby 4-6 REAL ' +
    'places; travelTips 3-5; moods 3-6. imageQuery must be a specific, visual search ' +
    'phrase for THAT item only (a dish photo for food, that place for gems/nearby) and ' +
    'must NOT contain the destination/city/landmark name. Every array must be present — ' +
    'use [] only when you genuinely cannot supply real entries. Every detail must be ' +
    'real. Respond with only the JSON object.'
  )
}

// Parse strictly, but salvage a {...} block if the model wraps it in stray text.
function parseJson(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1))
      } catch {
        return null
      }
    }
    return null
  }
}

const str = (v) => (typeof v === 'string' ? v.trim() : '')
const arr = (v) => (Array.isArray(v) ? v : [])

function clampWords(text, max) {
  const words = text.split(/\s+/).filter(Boolean)
  return words.length <= max ? text : words.slice(0, max).join(' ')
}

function normalizeStrings(v, max) {
  const out = []
  for (const item of arr(v)) {
    const s = str(item)
    if (s) out.push(s)
    if (out.length >= max) break
  }
  return out
}

// Generic object-list normalizer: keep entries where the `required` string fields
// are all non-empty; carry `optional` string fields through when present.
function normalizeObjects(v, max, required, optional = []) {
  const out = []
  for (const item of arr(v)) {
    if (!item || typeof item !== 'object') continue
    const entry = {}
    let ok = true
    for (const k of required) {
      const s = str(item[k])
      if (!s) {
        ok = false
        break
      }
      entry[k] = s
    }
    if (!ok) continue
    for (const k of optional) {
      const s = str(item[k])
      if (s) entry[k] = s
    }
    out.push(entry)
    if (out.length >= max) break
  }
  return out
}

// Culture → the object shape CultureModule renders (history timeline, traditions,
// festivals, etiquette). Returns null when every section is empty, so an all-empty
// culture never surfaces an empty Culture tab.
function normalizeCulture(v) {
  if (!v || typeof v !== 'object') return null
  const history = normalizeObjects(v.history, 6, ['description'], ['year'])
  const traditions = normalizeObjects(v.traditions, 6, ['name'], ['description'])
  const festivals = normalizeObjects(v.festivals, 6, ['name'], ['when', 'description'])
  const etiquette = normalizeStrings(v.etiquette, 6)
  if (!history.length && !traditions.length && !festivals.length && !etiquette.length) return null
  return { history, traditions, festivals, etiquette }
}

// Every visual item carries an imageQuery that targets ITS OWN subject (a dish
// photo, that place) — never the destination — so thumbnails stop showing the
// landmark for every card. Falls back to the item's name when the model omits it.
function withImageQuery(items) {
  return items.map((it) => ({ ...it, imageQuery: it.imageQuery || it.name }))
}

function normalizeGems(v) {
  return withImageQuery(normalizeObjects(v, 6, ['name', 'description'], ['tip', 'imageQuery']))
}

const REQUIRED_STRINGS = ['tagline', 'story', 'bestSeason']
const REQUIRED_ARRAYS = ['food', 'hiddenGems', 'photography', 'nearby', 'travelTips', 'moods']

// One fully-validated destination-content object matching the curated schema, or
// null on ANY failure. null means "keep every placeholder".
export async function composeDestination(knowledge) {
  if (!knowledge?.basic?.name) return null

  const key = import.meta.env.VITE_GROQ_KEY
  if (!key || key === 'your_key') return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        temperature: 0.9,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(knowledge) },
        ],
      }),
    })
    if (!res.ok) return null

    const data = await res.json()
    const raw = data?.choices?.[0]?.message?.content?.trim()
    if (!raw) return null

    const parsed = parseJson(raw)
    if (!parsed) return null

    // Reject wrong types / missing fields — every required string must be present
    // and non-empty, every required array must be an array, and culture must be an
    // object. Otherwise discard the whole response (never a half-formed destination).
    for (const k of REQUIRED_STRINGS) {
      if (typeof parsed[k] !== 'string' || !parsed[k].trim()) return null
    }
    for (const k of REQUIRED_ARRAYS) {
      if (!Array.isArray(parsed[k])) return null
    }
    if (!parsed.culture || typeof parsed.culture !== 'object' || Array.isArray(parsed.culture)) return null

    return {
      tagline: clampWords(str(parsed.tagline), MAX_TAGLINE_WORDS),
      story: str(parsed.story),
      bestSeason: clampWords(str(parsed.bestSeason), MAX_BESTSEASON_WORDS),
      culture: normalizeCulture(parsed.culture),
      food: withImageQuery(
        normalizeObjects(parsed.food, 6, ['name', 'description'], ['culturalSignificance', 'imageQuery'])
      ),
      hiddenGems: normalizeGems(parsed.hiddenGems),
      photography: normalizeObjects(parsed.photography, 5, ['title', 'description']),
      nearby: withImageQuery(
        normalizeObjects(parsed.nearby, 6, ['name', 'description'], ['type', 'imageQuery'])
      ),
      travelTips: normalizeStrings(parsed.travelTips, 5),
      moods: normalizeStrings(parsed.moods, 6),
    }
  } catch {
    // Network error, timeout/abort, or bad JSON — degrade silently.
    return null
  } finally {
    clearTimeout(timer)
  }
}

export default composeDestination
