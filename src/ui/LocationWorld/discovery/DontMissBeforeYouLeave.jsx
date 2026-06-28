import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const ELIGIBLE_TYPES = new Set(['city', 'landmark', 'sublocation'])

const SYSTEM_PROMPT =
  'You are Ellie, the travel companion inside Elsewhere. ' +
  'Never sound like a guidebook. Never start with "I". ' +
  'Recommend ONE specific thing. Mention an exact place, viewpoint, street, market, ' +
  'ritual, or time of day. Maximum three sentences.'

// Dedupe concurrent calls for the same cache key (e.g. StrictMode double-mount),
// guaranteeing a single network request. Module-scoped, but private to this file
// — this is the component's OWN helper, not a shared utility.
const inflight = new Map()

// Owns its own Groq access. Session cache first; stores only successful replies;
// no expiry; silent null on any failure (no logging, no retries).
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
          max_tokens: 180,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
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

// One last quiet recommendation before the traveler leaves an area. Props only —
// no Zustand subscription. Never blocks the Discovery Engine: it self-gates,
// shimmers while thinking, and silently renders null on any failure.
function DontMissBeforeYouLeave({ activeLocation, levelHistory, setActiveModule }) {
  const eligible =
    Array.isArray(levelHistory) &&
    levelHistory.length >= 2 &&
    ELIGIBLE_TYPES.has(activeLocation?.type)

  const [state, setState] = useState({ loading: true, text: null })

  useEffect(() => {
    if (!eligible) return
    let alive = true

    const navigationPath = levelHistory.map((node) => node.name).join(' → ')
    const prompt =
      `The traveler is exploring: ${activeLocation.name}, ${activeLocation.country ?? ''}. ` +
      `Their journey: ${navigationPath}. ` +
      'Tell them ONE thing they absolutely should not miss before leaving this area. ' +
      'Name an exact place or experience. Be warm. Never generic.'

    // id falls back to name for unresolved nodes (e.g. raw hidden-gem drills).
    const cacheKey = `ellie-dontmiss-${activeLocation.id ?? activeLocation.name}`

    callGroq(prompt, cacheKey).then((text) => {
      if (alive) setState({ loading: false, text: text ?? null })
    })

    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligible, activeLocation?.id])

  if (!eligible) return null
  if (state.loading) {
    return (
      <section className="disc-section">
        <Shimmer />
      </section>
    )
  }
  if (!state.text) return null // silent failure

  const name = activeLocation.name

  return (
    <motion.section
      className="disc-section"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <style>{`.ellie-ask:hover { text-decoration: underline; }`}</style>

      <h2 className="disc-title">Don't Miss Before You Leave</h2>
      <p
        className="disc-sub"
        style={{ fontStyle: 'italic', opacity: 0.55, color: 'rgba(255,255,255,0.55)' }}
      >
        Ellie thinks you should know…
      </p>

      <p
        style={{
          margin: 0,
          fontSize: 17,
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.75,
          maxWidth: 640,
          color: 'rgba(255,255,255,0.82)',
        }}
      >
        {state.text}
      </p>

      <p style={{ margin: '12px 0 0', fontSize: 12, color: 'rgba(125,211,252,0.6)' }}>— Ellie ✦</p>

      <button
        type="button"
        className="ellie-ask"
        aria-label={`Ask Ellie about ${name}`}
        onClick={() => setActiveModule('ellie')}
        style={{
          marginTop: 10,
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          color: '#7dd3fc',
        }}
      >
        Ask Ellie about {name} →
      </button>
    </motion.section>
  )
}

export default memo(DontMissBeforeYouLeave)
