import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// The documentary-style title sequence shown once the loading overlay clears.
// Two lines reveal in turn, hold, then the whole block drifts up and fades — and
// only then does it hand control back via onComplete.

const EASE = [0.16, 1, 0.3, 1]
const HOLD_MS = 4200 // time the lines stay before the exit drift

const LINE_STYLE = {
  margin: 0,
  fontSize: 'clamp(17px, 2.6vw, 28px)',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.7)',
}

export default function CinematicIntro({ onComplete }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), HOLD_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={leaving ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      onAnimationComplete={() => {
        if (leaving) onComplete?.()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '0 24px',
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.85, ease: EASE }}
        style={LINE_STYLE}
      >
        Every place has a story.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.85, ease: EASE }}
        style={LINE_STYLE}
      >
        Yours is <span style={{ color: '#7dd3fc', fontWeight: 400 }}>Elsewhere.</span>
      </motion.p>
    </motion.div>
  )
}
