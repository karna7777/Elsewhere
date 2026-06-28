import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../../store/useStore'
import HeroSection from './HeroSection'
import LocationNav, { getAvailableModules } from './LocationNav'
import DiscoveryEngine from './discovery/DiscoveryEngine'

// Modules are code-split. Story, Explore and Food are implemented.
const StoryModule = lazy(() => import('./modules/StoryModule'))
const ExploreModule = lazy(() => import('./modules/ExploreModule'))
const FoodModule = lazy(() => import('./modules/FoodModule'))
const SeasonsModule = lazy(() => import('./modules/SeasonsModule'))
const CultureModule = lazy(() => import('./modules/CultureModule'))

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
  // Threaded into DiscoveryEngine → DontMissBeforeYouLeave (props-only). Changes
  // only on navigation, so it adds no rerenders beyond those activeLocation causes.
  const levelHistory = useStore((s) => s.levelHistory)

  const [scrollY, setScrollY] = useState(0)
  const [activeModule, setActiveModule] = useState('story')
  // Owned here (not in StoryModule) so future Explore filtering can read it.
  const [selectedMood, setSelectedMood] = useState(null)
  const rafRef = useRef(0)

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
  }, [locationKey])

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

  const handleImageSelect = useCallback((/* item */) => {
    // Fullscreen viewer API seam — implemented in a later prompt.
  }, [])

  // Hierarchy path reuses existing breadcrumb data (drop the 'Elsewhere' root).
  const hierarchy = breadcrumb.slice(1)

  return (
    <AnimatePresence>
      {layoutState === 'location' && activeLocation && (
        <motion.section
          key="location-world"
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
            background: 'rgba(4,8,18,0.97)',
            zIndex: 30,
            overflow: 'hidden',
          }}
        >
          <style>{`
            .lw-scroll::-webkit-scrollbar { display: none; }
            .lw-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            .lw-noscroll::-webkit-scrollbar { display: none; }
            .lw-noscroll { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>

          <div
            className="lw-scroll"
            onScroll={onScroll}
            style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
          >
            <HeroSection
              location={activeLocation}
              hierarchy={hierarchy}
              scrollY={scrollY}
              onImageSelect={handleImageSelect}
            />

            <LocationNav
              location={activeLocation}
              scrolled={scrollY > 40}
              activeModule={activeModule}
              onSelect={setActiveModule}
            />

            {/* Module router. Story + Explore implemented; the rest are
                placeholders. Suspense fallback is null because both real modules
                are preloaded above, so a tab switch never flashes. */}
            <div id="location-content" style={{ minHeight: '60vh' }}>
              <Suspense fallback={null}>
                {activeModule === 'story' && (
                  <StoryModule
                    location={activeLocation}
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                  />
                )}
                {activeModule === 'explore' && (
                  <ExploreModule activeLocation={activeLocation} />
                )}
                {activeModule === 'food' && <FoodModule location={activeLocation} />}
                {activeModule === 'seasons' && <SeasonsModule location={activeLocation} />}
                {activeModule === 'culture' && <CultureModule location={activeLocation} />}
                {activeModule !== 'story' &&
                  activeModule !== 'explore' &&
                  activeModule !== 'food' &&
                  activeModule !== 'seasons' &&
                  activeModule !== 'culture' && <ComingSoon name={activeModule} />}
              </Suspense>
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
  )
}
