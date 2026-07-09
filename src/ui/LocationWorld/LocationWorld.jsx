import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../../store/useStore'
import HeroSection from './HeroSection'
import LocationNav, { getAvailableModules } from './LocationNav'
import DiscoveryEngine from './discovery/DiscoveryEngine'
import AIStrip from '../AIStrip'
import ErrorBoundary from '../ErrorBoundary'
import ImageLightbox from './ImageLightbox'

// Modules are code-split. Story, Explore and Food are implemented.
const StoryModule = lazy(() => import('./modules/StoryModule'))
const ExploreModule = lazy(() => import('./modules/ExploreModule'))
const HiddenModule = lazy(() => import('./modules/HiddenModule'))
const FoodModule = lazy(() => import('./modules/FoodModule'))
const SeasonsModule = lazy(() => import('./modules/SeasonsModule'))
const CultureModule = lazy(() => import('./modules/CultureModule'))
const EllieModule = lazy(() => import('./modules/EllieModule'))

function ComingSoon({ name }) {
  return (
    <div
      style={{
        padding: '64px 48px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.35)',
        fontSize: 13,
        letterSpacing: '0.04em',
      }}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)} — coming soon
    </div>
  )
}

// LocationWorld owns scroll position + activeModule, and passes them down.
// It is the ONLY component with a scroll listener.
export default function LocationWorld() {
  const layoutState = useStore((s) => s.layoutState)
  // Internally the store still calls this activeDestination; surfaced as the
  // type-agnostic activeLocation per the V2 terminology.
  const activeLocation = useStore((s) => s.activeDestination)
  const breadcrumb = useStore((s) => s.breadcrumb)
  const closePanel = useStore((s) => s.closePanel)
  const popLevel = useStore((s) => s.popLevel)
  const levelDepth = useStore((s) => s.levelHistory.length)
  // Threaded into DiscoveryEngine → DontMissBeforeYouLeave (props-only). Changes
  // only on navigation, so it adds no rerenders beyond those activeLocation causes.
  const levelHistory = useStore((s) => s.levelHistory)

  const [scrollY, setScrollY] = useState(0)
  const [activeModule, setActiveModule] = useState('story')
  // Owned here (not in StoryModule) so future Explore filtering can read it.
  const [selectedMood, setSelectedMood] = useState(null)
  // Fullscreen image viewer: { items, index } while open, else null.
  const [lightbox, setLightbox] = useState(null)
  const rafRef = useRef(0)
  // The scroll container persists across location changes (its key is constant),
  // so its scrollTop must be reset explicitly whenever a new place opens.
  const scrollRef = useRef(null)

  // Key on id, falling back to name: recursive sub-nodes (wonders, gems…) carry
  // a name but no id, so without the fallback drilling between them wouldn't reset.
  const locationKey = activeLocation?.id ?? activeLocation?.name

  // Reset module / scroll / mood whenever the location changes (deep dives get a
  // fresh, valid default that matches the available tabs).
  useEffect(() => {
    const modules = getAvailableModules(activeLocation)
    setActiveModule(modules[0]?.key ?? 'ellie')
    setScrollY(0)
    setSelectedMood(null)
    // Scroll a newly opened place to the top — exactly like a curated destination.
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    // Keyed on locationKey (id|name) by design; activeLocation identity is broader.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationKey])

  // Back navigation: step up one level if we've drilled in, otherwise return to
  // the globe. No more reloading the page to get back.
  const goBack = useCallback(() => {
    if (levelDepth > 1) popLevel()
    else closePanel()
  }, [levelDepth, popLevel, closePanel])

  // Escape also goes back — but never while typing (e.g. in Ellie's input).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      goBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goBack])

  // Preload Story + Explore once mounted so the first tab switch never flashes
  // the Suspense fallback.
  useEffect(() => {
    import('./modules/StoryModule')
    import('./modules/ExploreModule')
  }, [])

  // Single, rAF-batched scroll handler (≤1 state update per frame).
  const onScroll = useCallback((e) => {
    const top = e.currentTarget.scrollTop
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      setScrollY(top)
    })
  }, [])

  // Open the fullscreen viewer at the given image list + start index.
  const openImage = useCallback((items, index) => {
    if (items?.length) setLightbox({ items, index: index ?? 0 })
  }, [])
  const closeImage = useCallback(() => setLightbox(null), [])

  // Hierarchy path reuses existing breadcrumb data (drop the 'Elsewhere' root).
  const hierarchy = breadcrumb.slice(1)

  // The active location's CONTENT can change without its id changing — background
  // AI composition streams sections in, and on failure removes the Story tab.
  // Derive the module to render so the selected tab is always valid: keep the
  // user's choice while it exists, otherwise fall back to the first available one.
  // (Derived, not stored, so it needs no setState-in-effect.)
  const availableModuleKeys = getAvailableModules(activeLocation).map((m) => m.key)
  const effectiveModule = availableModuleKeys.includes(activeModule)
    ? activeModule
    : availableModuleKeys[0] ?? 'ellie'

  // The location panel only mounts in 'location' mode (78vw, right-aligned); any
  // other state shows the globe full-screen. The strip insets to 22vw to sit under
  // the panel, else spans full width.
  const isGlobeMode = layoutState !== 'location'

  return (
    <>
      <AnimatePresence>
        {layoutState === 'location' && activeLocation && (
        <motion.section
          key="location-world"
          className="lw-theme"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: '78vw',
            // Editorial depth instead of flat near-black: a cool ink base lifted by
            // a warm top-right glow and a cool bottom-left one — subtle, never busy.
            background:
              'radial-gradient(125% 80% at 82% -5%, rgba(84,66,120,0.32), transparent 58%),' +
              'radial-gradient(110% 65% at -5% 105%, rgba(24,58,92,0.30), transparent 55%),' +
              'linear-gradient(180deg, #0a0e1a 0%, #0b0913 100%)',
            fontFamily: 'var(--font-body)',
            zIndex: 30,
            overflow: 'hidden',
          }}
        >
          <style>{`
            .lw-scroll::-webkit-scrollbar { display: none; }
            .lw-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            .lw-noscroll::-webkit-scrollbar { display: none; }
            .lw-noscroll { scrollbar-width: none; -ms-overflow-style: none; }

            /* ── Editorial typography, scoped to the panel ─────────────────────
               Section headings across every module adopt the display serif; body
               copy stays Inter. Sizes are nudged up for magazine-style reading.
               One exaggerated type scale, exposed as tokens so every module reads
               from the same hierarchy (hero → section → card → body → meta → tag). */
            .lw-theme {
              color: rgba(255,255,255,0.88);
              /* One exaggerated, premium type scale + layout rhythm. */
              --content-max: 1280px;
              --space-section: 100px;
              --fs-section: 40px;
              --fs-card: 24px;
              --fs-body: 18px;
              --fs-meta: 15px;
              --fs-tag: 15px;
              --fs-eyebrow: 14px;
            }
            @media (max-width: 1280px) {
              .lw-theme { --content-max: 1080px; }
            }
            @media (max-width: 560px) {
              .lw-theme {
                --fs-section: 30px; --fs-card: 20px; --fs-body: 16.5px;
                --fs-meta: 14px; --space-section: 60px;
              }
            }
            .lw-theme h1, .lw-theme h2, .lw-theme h3,
            .lw-theme .disc-title, .lw-theme .culture-title, .lw-theme .food-title {
              font-family: var(--font-display);
              font-weight: 400;
              letter-spacing: -0.015em;
            }
            .lw-theme .disc-title, .lw-theme .culture-title, .lw-theme .food-title {
              font-size: var(--fs-section); line-height: 1.08;
            }
            /* The tiny uppercase kicker labels (ModuleWrapper) stay as clean
               tracked sans — they read as captions, not headlines. */
            .lw-theme .lw-kicker {
              font-family: var(--font-body);
              font-size: 13px; font-weight: 600; text-transform: uppercase;
              letter-spacing: 0.16em; color: rgba(255,255,255,0.42);
            }
          `}</style>

          {/* Back button — floats over the hero, always visible, never scrolls.
              Steps up a level (drilled in) or returns to the globe. */}
          <button
            type="button"
            onClick={goBack}
            aria-label={levelDepth > 1 ? 'Back one level' : 'Back to globe'}
            className="lw-back-btn"
            style={{
              position: 'absolute',
              top: 22,
              left: 24,
              zIndex: 20,
              width: 44,
              height: 44,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(4,8,18,0.45)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
          >
            <style>{`
              .lw-back-btn:hover { background: rgba(4,8,18,0.7) !important; transform: scale(1.06); }
              .lw-back-btn:focus-visible { outline: 2px solid #7dd3fc; outline-offset: 3px; }
            `}</style>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="lw-scroll"
            onScroll={onScroll}
            style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
          >
            <HeroSection
              location={activeLocation}
              hierarchy={hierarchy}
              scrollY={scrollY}
              onOpenImage={openImage}
            />

            <LocationNav
              location={activeLocation}
              scrolled={scrollY > 40}
              activeModule={effectiveModule}
              onSelect={setActiveModule}
            />

            {/* Module router. Story + Explore implemented; the rest are
                placeholders. Suspense fallback is null because both real modules
                are preloaded above, so a tab switch never flashes. Wrapped in an
                error boundary so a single module's crash shows an inline error
                instead of taking the whole app (globe included) to a black screen.
                Keyed by module so switching tabs clears a previous error. */}
            <div id="location-content" style={{ minHeight: '60vh' }}>
              <ErrorBoundary key={effectiveModule} label={`module:${effectiveModule}`}>
              <Suspense fallback={null}>
                {effectiveModule === 'story' && (
                  <StoryModule
                    location={activeLocation}
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                  />
                )}
                {effectiveModule === 'explore' && (
                  <ExploreModule activeLocation={activeLocation} />
                )}
                {effectiveModule === 'hidden' && <HiddenModule location={activeLocation} />}
                {effectiveModule === 'food' && <FoodModule location={activeLocation} />}
                {effectiveModule === 'seasons' && <SeasonsModule location={activeLocation} />}
                {effectiveModule === 'culture' && <CultureModule location={activeLocation} />}
                {effectiveModule === 'ellie' && (
                  <EllieModule
                    activeLocation={activeLocation}
                    setActiveModule={setActiveModule}
                  />
                )}
                {effectiveModule !== 'story' &&
                  effectiveModule !== 'explore' &&
                  effectiveModule !== 'hidden' &&
                  effectiveModule !== 'food' &&
                  effectiveModule !== 'seasons' &&
                  effectiveModule !== 'culture' &&
                  effectiveModule !== 'ellie' && <ComingSoon name={effectiveModule} />}
              </Suspense>
              </ErrorBoundary>
            </div>

            {/* Discovery sits BELOW the module content, inside the scroll area —
                persistent while scrolling, never part of any slide. There's no
                LevelTransition wrapper in this build, so this is the faithful
                "below modules / outside transition" placement. */}
            <DiscoveryEngine
              location={activeLocation}
              levelHistory={levelHistory}
              setActiveModule={setActiveModule}
            />
          </div>
        </motion.section>
        )}
      </AnimatePresence>

      {/* Persistent companion strip — mounted once, outside the module router, so
          it survives module/location changes and stays present in globe mode. */}
      <AIStrip setActiveModule={setActiveModule} isGlobeMode={isGlobeMode} />

      {/* Fullscreen image viewer (portals to <body>, so it covers the whole
          viewport). Opened from the hero photo or any visual-journey thumbnail. */}
      {lightbox && (
        <ImageLightbox items={lightbox.items} index={lightbox.index} onClose={closeImage} />
      )}
    </>
  )
}
