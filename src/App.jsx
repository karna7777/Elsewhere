import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import EarthScene from './globe/EarthScene'
import SearchBar from './ui/SearchBar'
import Breadcrumb from './ui/Breadcrumb'
import GlobeCompanion from './ui/LocationWorld/GlobeCompanion'
import LocationWorld from './ui/LocationWorld/LocationWorld'
import useStore from './store/useStore'

// Companion column target width (matches GlobeCompanion / LocationWorld split).
const COMPANION_VW = 0.22
const COMPANION_MIN = 180
// Cinematic beat: hold the landed full-screen globe for a moment ("we've
// arrived") before it steps aside, so the UI doesn't explode in instantly.
const SETTLE_MS = 300

export default function App() {
  const layoutState = useStore((s) => s.layoutState)
  const setLayoutState = useStore((s) => s.setLayoutState)

  // Viewport size — drives the transform math; updates on resize.
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Drive layout entirely from the EXISTING flyTo lifecycle — no changes to
  // flyTo or CameraRig. useFlyTo dispatches 'fly-whoosh' on start and
  // 'fly-complete' on finish; clearing the destination returns to the globe.
  useEffect(() => {
    let settleTimer
    const onWhoosh = () => {
      clearTimeout(settleTimer)
      setLayoutState('flying')
    }
    const onComplete = () => {
      // Pause on the settled globe, THEN transform into companion mode.
      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => setLayoutState('location'), SETTLE_MS)
    }
    window.addEventListener('fly-whoosh', onWhoosh)
    window.addEventListener('fly-complete', onComplete)
    const unsub = useStore.subscribe(
      (s) => s.activeDestination,
      (dest) => {
        if (!dest) {
          clearTimeout(settleTimer)
          setLayoutState('globe')
        }
      }
    )
    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener('fly-whoosh', onWhoosh)
      window.removeEventListener('fly-complete', onComplete)
      unsub()
    }
  }, [setLayoutState])

  const isCompanion = layoutState === 'location'

  // GPU transform that shrinks the full-screen globe into the left column.
  // origin (0,0): scale = columnWidth / viewportWidth; translateY recentres it.
  const companionW = Math.max(COMPANION_VW * vp.w, COMPANION_MIN)
  const companionScale = companionW / vp.w
  const companionY = (vp.h * (1 - companionScale)) / 2

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      <LayoutGroup>
        {/* THE single, persistent React Three Fiber canvas — never unmounted or
            recreated. It stays full-screen at native resolution; only a GPU
            transform (scale + translate) animates it aside into companion mode.
            No width changes → no browser re-layout, no per-frame canvas resize. */}
        <motion.div
          initial={false}
          animate={
            isCompanion
              ? { scale: companionScale, x: 0, y: companionY }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            transformOrigin: '0% 0%',
            zIndex: 1,
          }}
        >
          <EarthScene />
        </motion.div>

        {/* Companion chrome (location mode only) */}
        <AnimatePresence>{isCompanion && <GlobeCompanion key="companion" />}</AnimatePresence>

        {/* Location world shell (self-gates + animates on layoutState) */}
        <LocationWorld />
      </LayoutGroup>

      {/* ── Per-mode overlays ─────────────────────────────────────────────
          Globe   : SearchBar (+ Surprise Me — Prompt 12)
          Flying  : Breadcrumb, SearchBar hidden
          Location: SearchBar (kept as-is until the Prompt 8 header redesign) */}
      {layoutState !== 'flying' && <SearchBar />}
      {layoutState !== 'globe' && <Breadcrumb />}
      {/* Surprise Me renders here in Globe Mode once implemented (Prompt 12). */}
    </div>
  )
}
