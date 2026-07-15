import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import gsap from 'gsap'
import { DefaultLoadingManager } from 'three'
import EarthScene from './globe/EarthScene'
import SearchBar from './ui/SearchBar'
import Breadcrumb from './ui/Breadcrumb'
import GlobeCompanion from './ui/LocationWorld/GlobeCompanion'
import LocationWorld from './ui/LocationWorld/LocationWorld'
import SurpriseMe from './ui/SurpriseMe'
import BucketPanel from './ui/BucketList/BucketPanel'
import ZoomIndicator from './ui/ZoomIndicator'
import MuteToggle from './ui/MuteToggle'
import LoadingScreen from './ui/LoadingScreen'
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
  const toggleBucketPanel = useStore((s) => s.toggleBucketPanel)

  // The opening experience runs through a single phase: the black loading
  // overlay, then the cinematic title sequence, then the live application.
  const [phase, setPhase] = useState('loading') // 'loading' | 'cinematic' | 'ready'
  const [progress, setProgress] = useState(0)

  const overlayRef = useRef(null)
  const wordmarkRef = useRef(null)
  const progressRef = useRef(null)
  const startedRef = useRef(false)
  const timelineRef = useRef(null)

  // Track real Three.js asset loading (globe textures) and, once the scene is
  // ready, play the loading overlay out before revealing the cinematic. A safety
  // timeout guarantees the intro always proceeds even if onLoad never fires
  // (e.g. fully cached assets that finished before this listener attached).
  useEffect(() => {
    const manager = DefaultLoadingManager
    const STALL_MS = 5000
    let stallTimer

    const finish = () => {
      if (startedRef.current) return // run exactly once
      startedRef.current = true
      clearTimeout(stallTimer)
      setProgress(100)

      // Pause the wordmark pulse so it doesn't shimmer beneath the fade-out.
      const mark = wordmarkRef.current?.querySelector('.els-wordmark')
      if (mark) mark.style.animationPlayState = 'paused'

      const tl = gsap.timeline({ onComplete: () => setPhase('cinematic') })
      timelineRef.current = tl
      if (progressRef.current) tl.to(progressRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      if (wordmarkRef.current) tl.to(wordmarkRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      if (overlayRef.current) tl.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.1')
      tl.to({}, { duration: 0.28 }) // a beat of black before the words appear
    }

    // Safety net only: if progress stalls for STALL_MS (assets cached before this
    // listener attached, a silent texture failure, or a load that never completes),
    // finish anyway. Re-armed on every real step, so it never fires mid-load.
    const armFallback = () => {
      clearTimeout(stallTimer)
      stallTimer = setTimeout(finish, STALL_MS)
    }

    manager.onProgress = (_url, loaded, total) => {
      if (startedRef.current) return // ignore any late callbacks once finishing
      const pct = total > 0 ? Math.min(100, Math.max(0, (loaded / total) * 100)) : 0
      setProgress(pct)
      armFallback()
    }
    manager.onLoad = finish

    armFallback()

    return () => {
      clearTimeout(stallTimer)
      timelineRef.current?.kill()
      // Detach so a queued callback can't fire into an unmounted tree.
      manager.onProgress = () => {}
      manager.onLoad = () => {}
    }
  }, [])

  // Safety net for the in-canvas cinematic: if the 3D intro never signals done
  // (font/shader failure, a stalled timeline), force the app to reveal anyway so
  // it can never be trapped behind the opening.
  useEffect(() => {
    if (phase !== 'cinematic') return undefined
    const MAX_INTRO_MS = 12000
    const t = setTimeout(() => setPhase('ready'), MAX_INTRO_MS)
    return () => clearTimeout(t)
  }, [phase])

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
          <EarthScene
            introActive={phase === 'cinematic'}
            onIntroDone={() => setPhase('ready')}
          />
        </motion.div>

        {/* Companion chrome (location mode only) */}
        <AnimatePresence>{isCompanion && <GlobeCompanion key="companion" />}</AnimatePresence>

        {/* Location world shell (self-gates + animates on layoutState) */}
        <LocationWorld />
      </LayoutGroup>

      {/* Application UI — always mounted so it never remounts or jumps. It stays
          invisible and inert until the opening experience finishes, then fades in
          as one. The globe (above) stays visible throughout. */}
      <motion.div
        initial={false}
        animate={{ opacity: phase === 'ready' ? 1 : 0 }}
        // Gradual, eased reveal so the search + navigation settle in rather than
        // snapping on all at once as the wordmark dissolves.
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          // Sit above the globe (z-index 1) so the overlays are not painted
          // behind the opaque canvas; the loading/cinematic layers stay above this.
          position: 'relative',
          zIndex: 5,
          pointerEvents: phase === 'ready' ? 'auto' : 'none',
        }}
      >
        {/* ── Per-mode overlays ─────────────────────────────────────────────
            Globe   : SearchBar (+ Surprise Me)
            Flying  : Breadcrumb, SearchBar hidden
            Location: SearchBar (kept as-is until the header redesign) */}
        {layoutState !== 'flying' && <SearchBar />}
      {layoutState !== 'globe' && <Breadcrumb />}
      {/* Surprise Me — Globe Mode only. */}
      {layoutState === 'globe' && <SurpriseMe />}

      {/* Bucket List. Glass heart in the top bar toggles the panel;
          hidden mid-flight to keep the cinematic clean, matching SearchBar. */}
      {layoutState !== 'flying' && (
        <>
          <style>{`
            .bucket-heart-btn { transition: transform 0.2s ease, border-color 0.2s ease; }
            .bucket-heart-btn:hover { border-color: rgba(244,114,182,0.45); transform: scale(1.05); }
            .bucket-heart-btn:focus-visible { outline: 2px solid rgba(244,114,182,0.6); outline-offset: 3px; }
          `}</style>
          <button
            className="bucket-heart-btn"
            onClick={toggleBucketPanel}
            aria-label="Open bucket list"
            style={{
              position: 'fixed',
              top: 24,
              left: 24,
              zIndex: 50,
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>
        </>
      )}

        {/* Bucket List panel shell — always mounted; self-gates via AnimatePresence. */}
        <BucketPanel />

        {/* Persistent UI widgets. Each self-gates and owns its own positioning. */}
        <ZoomIndicator />
        <MuteToggle />
      </motion.div>

      {/* Swallow all pointer input over the globe while the opening plays, so it
          cannot be dragged, zoomed or clicked. The globe keeps auto-rotating on
          its own; this sits below the loading/cinematic visuals and above the
          globe, and is removed once ready. */}
      {phase !== 'ready' && (
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'transparent' }} />
      )}

      {/* Opening experience overlays — rendered above the globe and the (hidden)
          application UI, driven by a single phase. */}
      {phase === 'loading' && (
        <LoadingScreen
          progress={progress}
          overlayRef={overlayRef}
          wordmarkRef={wordmarkRef}
          progressRef={progressRef}
        />
      )}
    </div>
  )
}
