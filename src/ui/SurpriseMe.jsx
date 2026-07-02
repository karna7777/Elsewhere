import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import destinations from '../data/destinations.js'
import { resolveNode } from '../data/NodeResolver.js'

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Lightweight, ISOLATED surprise selector. Deliberately independent from Ellie's
// private recommendation engine (which stays in EllieModule) — it follows the
// same philosophy (avoid current + recently visited, favour country/continent
// diversity, widen gracefully, never empty) WITHOUT any semantic search or
// indexes. Kept self-contained so it can be swapped for the shared engine later.
function selectSurprise(current, visitedIds) {
  const flyable = destinations.filter(
    (d) => d.lat != null && d.lng != null && d.id !== current?.id // 1 — never current
  )
  if (!flyable.length) return null

  // 2 — avoid recently visited; 6/7 — widen if that empties the pool.
  const visited = new Set(visitedIds)
  let pool = flyable.filter((d) => !visited.has(d.id))
  if (!pool.length) pool = flyable

  // 3 — traveller preferences are NOT in global app state (they live privately
  // inside Ellie), so this step is intentionally skipped. Never reach into Ellie.

  // 4 — prefer a different country.
  if (current?.country) {
    const diffCountry = pool.filter((d) => d.country !== current.country)
    if (diffCountry.length) pool = diffCountry
  }
  // 5 — prefer a different continent when reasonable (keep enough variety).
  if (current?.continent) {
    const diffContinent = pool.filter((d) => d.continent !== current.continent)
    if (diffContinent.length >= 3) pool = diffContinent
  }

  return rand(pool)
}

const STYLE = `
  .surprise-me { transition: transform 0.2s ease, border-color 0.2s ease; outline: none; }
  .surprise-me:hover { border-color: rgba(125,211,252,0.4); }
  .surprise-me:focus-visible { outline: 2px solid rgba(125,211,252,0.6); outline-offset: 3px; }
  .surprise-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    background: #7dd3fc; box-shadow: 0 0 10px rgba(125,211,252,0.9);
    animation: surprise-pulse 2s ease-in-out infinite;
  }
  @keyframes surprise-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.35; transform: scale(0.65); }
  }
`

// Globe-mode invitation to discover somewhere unexpected. Mounted only in Globe
// mode (App gates it), so it holds no store subscription and never rerenders on
// state changes. The whole flow is orchestrated with lightweight window events;
// navigation itself flows only through the canonical pipeline.
export default function SurpriseMe() {
  const busyRef = useRef(false)
  // Cancels a still-pending spin listener if we unmount before navigation commits.
  const cleanupRef = useRef(null)
  useEffect(() => () => cleanupRef.current?.(), [])

  const handleSurprise = useCallback(() => {
    if (busyRef.current) return
    const { activeDestination, visitedHistory, pushLevel } = useStore.getState()
    const dest = selectSurprise(activeDestination, visitedHistory)
    // Always resolve through the canonical pipeline — never hand-build a node.
    const node = dest ? resolveNode(dest) : null
    if (!node) return

    busyRef.current = true

    // Notify Ellie ONLY after arrival. A plain window listener (not React) so it
    // survives this component unmounting when we enter flying mode; self-removes.
    const onArrival = () => {
      window.removeEventListener('fly-complete', onArrival)
      window.dispatchEvent(
        new CustomEvent('ellie:surprise-arrival', { detail: { name: node.name } })
      )
    }
    // When the dramatic spin finishes, initiate navigation via the existing
    // pipeline: pushLevel → activeDestination subscription → flyTo → CameraRig.
    const onSpinDone = () => {
      window.removeEventListener('surprise-spin-complete', onSpinDone)
      cleanupRef.current = null // committed — let the arrival notice outlive unmount
      window.addEventListener('fly-complete', onArrival)
      pushLevel(node)
    }
    window.addEventListener('surprise-spin-complete', onSpinDone)
    cleanupRef.current = () =>
      window.removeEventListener('surprise-spin-complete', onSpinDone)

    // Hand the cinematic spin + interaction-lock to the existing globe mesh.
    window.dispatchEvent(new Event('surprise-spin'))
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSurprise()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 40,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <style>{STYLE}</style>
      <motion.div
        className="surprise-me"
        role="button"
        tabIndex={0}
        aria-label="Take me somewhere unexpected"
        onClick={handleSurprise}
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          padding: '12px 24px',
          borderRadius: 999,
          background: 'rgba(10,14,24,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.9)',
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span className="surprise-dot" aria-hidden="true" />
        Elsewhere
      </motion.div>
    </div>
  )
}
