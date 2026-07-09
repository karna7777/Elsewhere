import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

const EASE = [0.16, 1, 0.3, 1]

// Discovery Mode (no active location) — Ellie as a travel consultant.
const DISCOVERY_SUGGESTIONS = [
  'Where in the world should I go next?',
  'I have 7 days. Help me plan something unforgettable.',
  "Surprise me. Take me somewhere I've never considered.",
  'I want mountains, fewer crowds, and real local food.',
]

// Planner Mode idle prompts.
const PLANNER_SUGGESTIONS = [
  'Plan my next weekend',
  'Help me build a 7-day journey',
  'Design a slow travel itinerary',
  'How should I spend three perfect days?',
]

// Explorer Mode idle prompts.
const EXPLORER_SUGGESTIONS = [
  'Take me somewhere completely unexpected',
  'Show me a place most people overlook',
  'Surprise me with a hidden destination',
  "Pick somewhere I'd never think of",
]

// Guide Mode — Ellie already knows where you are.
function guideSuggestions(name) {
  return [
    `Take me somewhere unexpected near ${name}`,
    'What would a local show me here that tourists miss?',
    `Plan my perfect day in ${name}`,
    'Where should I eat tonight—something real, not touristy?',
    'I love photography. Where should I be at sunrise?',
  ]
}

const SUGGESTIONS_CSS = `
  .ellie-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
  @media (max-width: 560px) { .ellie-grid { grid-template-columns: 1fr; } }
  .ellie-card { transition: border-color 0.2s ease, color 0.2s ease; }
  .ellie-card:hover { border-color: rgba(125,211,252,0.3); color: #fff; }
`

// Presentational. The suggestion set follows Ellie's remembered mode (Planner/
// Explorer override the structural Guide/Discovery default). This is a leaf
// subscription with no streaming-path cost — the component is unmounted while a
// reply is streaming. Clicking a card sends it to Ellie via onSelect.
function EllieSuggestions({ activeLocation, onSelect }) {
  const mode = useStore((s) => s.ellieMode)

  const suggestions = useMemo(() => {
    if (mode === 'planner') return PLANNER_SUGGESTIONS
    if (mode === 'explorer') return EXPLORER_SUGGESTIONS
    return activeLocation ? guideSuggestions(activeLocation.name) : DISCOVERY_SUGGESTIONS
  }, [mode, activeLocation])

  return (
    <div className="ellie-grid">
      <style>{SUGGESTIONS_CSS}</style>
      {suggestions.map((text, i) => (
        <motion.div
          key={text}
          className="ellie-card"
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(text)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect?.(text)
            }
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
          style={{
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 18,
            padding: '26px 30px',
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.78)',
            cursor: 'pointer',
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  )
}

export default memo(EllieSuggestions)
