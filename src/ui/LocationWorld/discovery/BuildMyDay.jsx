import { memo, useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Self-contained per rule 9. The Groq helper and shimmer intentionally mirror
// DontMissBeforeYouLeave's PATTERN/visual language rather than importing it —
// DontMiss is on the don't-touch list and its shimmer is private, so this file
// owns identical copies instead of creating a shared dependency.

const ELLIE_SYSTEM =
  'You are Ellie, the travel companion inside Elsewhere. Write warmly and ' +
  'specifically, naming real places. Never use markdown.'

// Dedupe concurrent calls for the same cache key (StrictMode-safe). File-private.
const inflight = new Map()

async function callGroq(prompt, cacheKey) {
  try {
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) return cached
  } catch {
    // sessionStorage unavailable — fall through to a live request.
  }

  if (inflight.has(cacheKey)) return inflight.get(cacheKey)

  const key = import.meta.env.VITE_GROQ_KEY
  if (!key) return null

  const request = (async () => {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          stream: false,
          max_tokens: 400,
          messages: [
            { role: 'system', content: ELLIE_SYSTEM },
            { role: 'user', content: prompt },
          ],
        }),
      })
      if (!res.ok) return null
      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content?.trim()
      if (!text) return null
      try {
        sessionStorage.setItem(cacheKey, text)
      } catch {
        // best-effort cache; ignore quota/availability errors.
      }
      return text
    } catch {
      return null
    }
  })()

  inflight.set(cacheKey, request)
  const result = await request
  inflight.delete(cacheKey)
  return result
}

// Identical shimmer to DontMiss (same visual language, replicated per rule 9).
function Shimmer() {
  return (
    <div aria-hidden="true">
      <style>{`@keyframes ellie-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
      <div
        style={{
          height: 80,
          borderRadius: 8,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
          backgroundSize: '200% 100%',
          animation: 'ellie-shimmer 1.8s infinite',
        }}
      />
    </div>
  )
}

// Ordered timeline sections + their icons.
const SECTIONS = [
  { label: 'Morning', icon: '☀️' },
  { label: 'Midday', icon: '🌞' },
  { label: 'Afternoon', icon: '⛅' },
  { label: 'Sunset', icon: '🌇' },
  { label: 'Evening', icon: '🌙' },
]

// PURE parser (no React). Finds each "Label:" case-insensitively and slices the
// text between markers. Returns the rows it could find (in text order).
function parseTimeline(text) {
  if (!text) return []
  const lower = text.toLowerCase()

  const found = []
  for (const section of SECTIONS) {
    const idx = lower.indexOf(`${section.label.toLowerCase()}:`)
    if (idx !== -1) found.push({ ...section, idx })
  }
  if (found.length === 0) return []

  found.sort((a, b) => a.idx - b.idx)

  return found.map((section, i) => {
    const start = section.idx + section.label.length + 1 // skip "Label:"
    const end = i + 1 < found.length ? found[i + 1].idx : text.length
    return {
      label: section.label,
      icon: section.icon,
      content: text.slice(start, end).trim(),
    }
  })
}

// Scoped polish CSS: responsive width/padding, mobile row stacking, footer hover.
const BMD_STYLES = `
  .bmd { max-width: 700px; }
  @media (max-width: 900px) { .bmd { padding: 24px; } }

  .bmd-list { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 20px; }
  .bmd-row { display: flex; gap: 14px; }
  @media (max-width: 560px) { .bmd-row { flex-direction: column; gap: 6px; } }

  .bmd-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #e8c07a; font-weight: 600; }
  .bmd-content { font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.6; }
  .bmd-refine:hover { text-decoration: underline; }
`

// BuildMyDay — one-click AI itinerary. Props only, no Zustand. Fully isolated:
// own Groq helper, own session cache, one request per location, silent failure.
function BuildMyDay({ activeLocation, setActiveModule }) {
  const cacheKey = `ellie-buildday-${activeLocation?.id ?? activeLocation?.name}`

  // Lazy init from cache (no effect → no synchronous setState in render path).
  // Component is keyed by location in DiscoveryEngine, so this re-runs per place.
  const [plan, setPlan] = useState(() => {
    try {
      return sessionStorage.getItem(cacheKey)
    } catch {
      return null
    }
  })
  const [hasRequested, setHasRequested] = useState(() => !!plan)
  const [loading, setLoading] = useState(false)

  const name = activeLocation?.name

  const generatePlan = useCallback(async () => {
    if (hasRequested) return // one request per location, ever
    setHasRequested(true)
    setLoading(true)
    const prompt =
      `Build a perfect day in ${name}, ${activeLocation?.country ?? ''}. ` +
      'Structure it EXACTLY as\nMorning:\nMidday:\nAfternoon:\nSunset:\nEvening:\n' +
      'Name specific places whenever possible. Keep everything below 150 words. ' +
      'Do not use markdown. One short paragraph for each section.'
    const text = await callGroq(prompt, cacheKey)
    setPlan(text ?? null)
    setLoading(false)
  }, [hasRequested, name, activeLocation, cacheKey])

  // Only the parsed timeline is memoized.
  const rows = useMemo(() => (plan ? parseTimeline(plan) : []), [plan])

  if (!activeLocation) return null

  if (loading) {
    return (
      <section className="disc-section bmd">
        <Shimmer />
      </section>
    )
  }

  // Requested but nothing came back → render nothing (silent failure, rule 6).
  if (hasRequested && !plan) return null

  // Pre-generation: only the CTA, no container.
  if (!plan) {
    return (
      <section className="disc-section bmd">
        <motion.button
          type="button"
          aria-label={`Build my day in ${name}`}
          onClick={generatePlan}
          whileHover={{ scale: 1.02, borderColor: 'rgba(232,192,122,0.5)' }}
          transition={{ duration: 0.2, ease: EASE }}
          style={{
            cursor: 'pointer',
            padding: '16px 24px',
            borderRadius: 14,
            border: '1px solid rgba(232,192,122,0.25)',
            background: 'rgba(232,192,122,0.10)',
            color: '#e8c07a',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          ✦ Build my day in {name}
        </motion.button>
      </section>
    )
  }

  // Plan exists → staggered timeline (all five) or a single fallback block.
  const showTimeline = rows.length === SECTIONS.length

  return (
    <section className="disc-section bmd">
      <style>{BMD_STYLES}</style>
      <h3 className="disc-title">Your Day in {name}</h3>

      {showTimeline ? (
        <ul className="bmd-list">
          {rows.map((row, i) => (
            <motion.li
              key={row.label}
              className="bmd-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
            >
              <span style={{ fontSize: 20, lineHeight: 1.4, flexShrink: 0 }}>{row.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span className="bmd-label">{row.label}</span>
                <span className="bmd-content">{row.content}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="bmd-content" style={{ margin: '8px 0 0', whiteSpace: 'pre-line' }}>
          {plan}
        </p>
      )}

      {/* Ellie will be able to refine this itinerary in chat. */}
      <button
        type="button"
        className="bmd-refine"
        aria-label="Open Ellie"
        onClick={() => setActiveModule('ellie')}
        style={{
          marginTop: 18,
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          color: '#e8c07a',
        }}
      >
        Want Ellie to refine this plan →
      </button>
    </section>
  )
}

export default memo(BuildMyDay)
