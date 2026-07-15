import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../../store/useStore'
import HeroSection from './HeroSection'
import Chapter from './chapters/Chapter'
import ChapterDivider, { ChapterDividerStyles } from './chapters/ChapterDivider'
import JourneyMap from './chapters/JourneyMap'
import AtmosphereChapter from './chapters/AtmosphereChapter'
import WhyThisPlaceChapter from './chapters/WhyThisPlaceChapter'
import ExperiencesChapter from './chapters/ExperiencesChapter'
import PhotographyChapter from './chapters/PhotographyChapter'
import { EditorialStyles, EllieNudge } from './chapters/editorial'
import DiscoveryEngine from './discovery/DiscoveryEngine'
import AIStrip from '../AIStrip'
import ErrorBoundary from '../ErrorBoundary'
import ImageLightbox from './ImageLightbox'

// Chapters are code-split; the whole journey renders as one continuous scroll.
const StoryModule = lazy(() => import('./modules/StoryModule'))
const ExploreModule = lazy(() => import('./modules/ExploreModule'))
const HiddenModule = lazy(() => import('./modules/HiddenModule'))
const FoodModule = lazy(() => import('./modules/FoodModule'))
const SeasonsModule = lazy(() => import('./modules/SeasonsModule'))
const CultureModule = lazy(() => import('./modules/CultureModule'))
const EllieModule = lazy(() => import('./modules/EllieModule'))

// The cinematic chapters the journey groups its sections into. Each opens with a
// ChapterDivider title card; the Journey Map indexes them. Data-gated: a chapter
// appears only when at least one of its member sections has content, and the
// Roman numbering re-flows over whatever is present ('arrival' = the hero, which
// opens the journey and therefore carries no divider of its own).
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
// `weight` shapes the arrival beat: 'major' chapters get a grand, tall title card;
// 'minor' ones a more compact card, so the journey has rhythm instead of eight
// identical announcements (Hidden & Seasons read as smaller discoveries).
const JOURNEY_DEFS = [
  { id: 'arrival', title: 'Arrival', subtitle: 'The first sight of the place', weight: 'major' },
  { id: 'why', title: 'Why This Place', subtitle: 'The reason it stays with you', weight: 'major' },
  { id: 'story', title: 'A Sense of Place', subtitle: 'What it feels like to be here', weight: 'major' },
  { id: 'moments', title: 'Moments', subtitle: "The experiences you'll carry home", weight: 'major' },
  { id: 'wonders', title: 'Iconic Wonders', subtitle: 'What you came to see', weight: 'major' },
  { id: 'culture', title: 'Culture & Taste', subtitle: 'How life is lived, and eaten', weight: 'major' },
  { id: 'hidden', title: 'The Hidden World', subtitle: 'Only the locals know', weight: 'minor' },
  { id: 'seasons', title: 'The Turning Year', subtitle: 'When to come', weight: 'minor' },
  { id: 'continue', title: 'Continue the Journey', subtitle: 'Where the road leads next', weight: 'major' },
]

// One code-split module, wrapped so a single chapter's crash never takes the
// journey (or the globe) down — it shows an inline error instead.
function ChapterBody({ id, children }) {
  return (
    <ErrorBoundary key={id} label={`chapter:${id}`}>
      <Suspense fallback={null}>{children}</Suspense>
    </ErrorBoundary>
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
  // The cinematic chapter currently crossing the viewport centre (drives the map).
  const [activeJourney, setActiveJourney] = useState('arrival')
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

  // Reset scroll / chapter / mood whenever the location changes — a new place
  // always opens at the top of its story.
  useEffect(() => {
    setActiveJourney('arrival')
    setScrollY(0)
    setSelectedMood(null)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
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

  // Which chapters this destination supports — each collapses when its data is
  // absent, so no place ever shows an empty section. (Derived from real fields;
  // Story stays present while AI is still composing.)
  const has = {
    atmosphere: !!activeLocation?.bestSeason || activeLocation?.lat != null,
    why: !!activeLocation?.story || activeLocation?.aiStatus === 'pending',
    story:
      (activeLocation?.moods?.length ?? 0) > 0 ||
      (activeLocation?.travelStyle?.length ?? 0) > 0 ||
      !!activeLocation?.ambience ||
      (activeLocation?.visualJourney?.length ?? 0) > 0 ||
      !!activeLocation?.heroMedia,
    experiences: (activeLocation?.experiences?.length ?? 0) > 0,
    photography: (activeLocation?.visualJourney?.length ?? 0) >= 2,
    explore: (activeLocation?.wonders?.length ?? 0) > 0,
    culture: !!activeLocation?.culture,
    food: (activeLocation?.food?.length ?? 0) > 0,
    hidden: (activeLocation?.hiddenGems?.length ?? 0) > 0,
    seasons: !!activeLocation?.seasons,
  }

  // Group the present sections into cinematic chapters. `list` drives the Journey
  // Map; `meta` gives each divider its number + title. A chapter is present when
  // any of its member sections has content, and the numbering stays contiguous.
  const journey = useMemo(() => {
    const present = {
      arrival: true,
      why: has.why,
      story: has.story,
      moments: has.experiences || has.photography,
      wonders: has.explore,
      culture: has.culture || has.food,
      hidden: has.hidden,
      seasons: has.seasons,
      continue: true,
    }
    const list = JOURNEY_DEFS.filter((d) => present[d.id]).map((d, i, arr) => ({
      ...d,
      roman: ROMAN[i] ?? String(i + 1),
      index: i + 1,
      total: arr.length,
    }))
    const meta = Object.fromEntries(list.map((c) => [c.id, c]))
    return { list, meta }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationKey])

  // Smooth-scroll to a chapter. Doubles as the `setActiveModule` other components
  // still call ("open Ellie", "see it in Food") — now it jumps within the scroll.
  const goToChapter = useCallback((id) => {
    const el = scrollRef.current?.querySelector(`[data-chapter="${id}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Travel to a cinematic chapter — scrolls to its divider (or the hero, for
  // Arrival). goToChapter still handles in-chapter jumps (Ellie nudges, etc.).
  const goToJourney = useCallback((id) => {
    const el = scrollRef.current?.querySelector(`[data-journey="${id}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Scroll-spy: the cinematic chapter whose divider (or the hero) is crossing the
  // viewport centre becomes active, driving the Journey Map. Once a divider
  // passes, its chapter stays active until the next one arrives. A MutationObserver
  // re-registers anchors that mount late (lazy modules shifting layout).
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        let best = null
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e
        }
        const id = best?.target?.dataset?.journey
        if (id) setActiveJourney(id)
      },
      { root, rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] }
    )
    const seen = new Set()
    const scan = () => {
      root.querySelectorAll('[data-journey]').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el)
          io.observe(el)
        }
      })
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [locationKey])

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
              --measure: 720px;        /* comfortable reading width */
              --space-section: 120px;
              --chapter-gap: 200px;
              --fs-chapter: clamp(46px, 6.2vw, 92px);
              --fs-lede: clamp(27px, 3.2vw, 42px);
              --fs-section: 44px;
              --fs-card: 26px;
              --fs-body: 19px;
              --fs-meta: 15px;
              --fs-tag: 15px;
              --fs-eyebrow: 14px;
              /* Gold is the destination system's accent (migrating off cyan). */
              --gold: #e8c07a;
              --gold-bright: #f4d79a;
              --gold-soft: rgba(232,192,122,0.14);
              --gold-line: rgba(232,192,122,0.30);
            }
            @media (max-width: 1280px) {
              .lw-theme { --content-max: 1080px; }
            }
            @media (max-width: 560px) {
              .lw-theme {
                --fs-section: 32px; --fs-card: 21px; --fs-body: 17px;
                --fs-meta: 14px; --space-section: 64px; --chapter-gap: 104px;
              }
            }

            /* ── Chapter system ──────────────────────────────────────────────
               Each chapter is a "room" in the destination journey. Generous
               rhythm (chapters breathe), a gold kicker (the emotion it answers)
               above a huge serif title. */
            .lw-chapter { padding: calc(var(--chapter-gap) / 2) 0; }
            .lw-chapter--bare { padding: calc(var(--chapter-gap) / 2) 0; }
            .lw-chapter-head { max-width: var(--content-max); margin: 0 auto; padding: 0 48px; }
            @media (max-width: 560px) { .lw-chapter-head { padding: 0 20px; } }
            .lw-chapter-kicker {
              margin: 0 0 16px; font-family: var(--font-body);
              font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
              letter-spacing: 0.22em; color: var(--gold);
            }
            .lw-chapter-title {
              margin: 0 0 8px; font-family: var(--font-display); font-weight: 400;
              font-size: var(--fs-chapter); line-height: 1.02; letter-spacing: -0.02em;
              color: #fff;
            }
            .lw-chapter-lead {
              margin: 14px 0 0; max-width: 720px; font-size: var(--fs-body);
              line-height: 1.6; color: rgba(255,255,255,0.6);
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

          {/* The shared editorial design language (mounted once). */}
          <EditorialStyles />
          <ChapterDividerStyles />

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
              .lw-back-btn:focus-visible { outline: 2px solid #e8c07a; outline-offset: 3px; }
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
            {/* Chapter I — Arrival: the hero (its data-journey anchor opens the
                journey, so it needs no divider of its own). Atmosphere rides along. */}
            <section id="hero" data-chapter="hero" data-journey="arrival">
              <HeroSection
                location={activeLocation}
                hierarchy={hierarchy}
                scrollY={scrollY}
                onOpenImage={openImage}
              />
            </section>

            {/* Atmosphere ("What's it like right now?"), self-gating */}
            {has.atmosphere && <AtmosphereChapter location={activeLocation} />}

            {/* Chapter — Why This Place Matters (the emotional overture) */}
            {has.why && <ChapterDivider {...journey.meta.why} />}
            {has.why && <WhyThisPlaceChapter location={activeLocation} />}

            {/* Chapter — A Sense of Place (Story) */}
            {has.story && <ChapterDivider {...journey.meta.story} />}
            {has.story && (
              <ChapterBody id="story">
                <StoryModule
                  location={activeLocation}
                  selectedMood={selectedMood}
                  setSelectedMood={setSelectedMood}
                />
              </ChapterBody>
            )}

            {/* Ellie, woven in: what locals notice */}
            {has.story && (
              <EllieNudge
                label={`Ask Ellie what locals notice in ${activeLocation.name}`}
                prompt={`What do locals notice about ${activeLocation.name} that most visitors miss?`}
              />
            )}

            {/* Chapter — Moments (Experiences + Photography) */}
            {(has.experiences || has.photography) && <ChapterDivider {...journey.meta.moments} />}

            {/* Experiences — cinematic vignettes (self-contained chapter) */}
            {has.experiences && <ExperiencesChapter location={activeLocation} />}

            {/* Photography — full-bleed editorial gallery (self-contained chapter) */}
            {has.photography && (
              <PhotographyChapter location={activeLocation} onOpenImage={openImage} />
            )}

            {/* Chapter — Iconic Wonders (Explore) */}
            {has.explore && <ChapterDivider {...journey.meta.wonders} />}
            {has.explore && (
              <ChapterBody id="explore">
                <ExploreModule activeLocation={activeLocation} />
              </ChapterBody>
            )}

            {/* Chapter — Culture & Taste (Culture + Food) */}
            {(has.culture || has.food) && <ChapterDivider {...journey.meta.culture} />}

            {/* Culture — renders its own editorial <Chapter> (Story pattern) */}
            {has.culture && (
              <ChapterBody id="culture">
                <CultureModule location={activeLocation} />
              </ChapterBody>
            )}

            {/* Food — renders its own editorial <Chapter> (Story pattern) */}
            {has.food && (
              <ChapterBody id="food">
                <FoodModule location={activeLocation} />
              </ChapterBody>
            )}

            {/* Ellie, woven in: where locals actually eat */}
            {has.food && (
              <EllieNudge
                label={`Ask Ellie where locals actually eat in ${activeLocation.name}`}
                prompt={`Where do locals actually eat in ${activeLocation.name}? Somewhere real, not touristy.`}
              />
            )}

            {/* Chapter — The Hidden World (Hidden) */}
            {has.hidden && <ChapterDivider {...journey.meta.hidden} />}
            {has.hidden && (
              <Chapter id="hidden" bare>
                <ChapterBody id="hidden">
                  <HiddenModule location={activeLocation} />
                </ChapterBody>
              </Chapter>
            )}

            {/* Ellie, woven in: turning the secrets into a plan */}
            {has.hidden && (
              <EllieNudge
                label="Ask Ellie to plan these into a perfect afternoon"
                prompt={`Help me plan these hidden spots in ${activeLocation.name} into a perfect afternoon, in a sensible order.`}
              />
            )}

            {/* Chapter — The Turning Year (Seasons) */}
            {has.seasons && <ChapterDivider {...journey.meta.seasons} />}
            {has.seasons && (
              <ChapterBody id="seasons">
                <SeasonsModule location={activeLocation} />
              </ChapterBody>
            )}

            {/* Chapter — Continue the Journey (Nearby + Ellie) */}
            <ChapterDivider {...journey.meta.continue} />

            {/* Nearby — the discovery rails ("Where next?") */}
            <Chapter id="nearby" bare>
              <DiscoveryEngine
                location={activeLocation}
                levelHistory={levelHistory}
                setActiveModule={goToChapter}
              />
            </Chapter>

            {/* Ellie — the companion, as the closing chapter */}
            <Chapter id="ellie" bare>
              <ChapterBody id="ellie">
                <EllieModule activeLocation={activeLocation} setActiveModule={goToChapter} />
              </ChapterBody>
            </Chapter>
          </div>

          {/* The Journey Map — cinematic chapter index + progress */}
          <JourneyMap chapters={journey.list} activeId={activeJourney} onJump={goToJourney} />
        </motion.section>
        )}
      </AnimatePresence>

      {/* Persistent companion strip — mounted once, outside the module router, so
          it survives module/location changes and stays present in globe mode. */}
      <AIStrip setActiveModule={goToChapter} isGlobeMode={isGlobeMode} />

      {/* Fullscreen image viewer (portals to <body>, so it covers the whole
          viewport). Opened from the hero photo or any visual-journey thumbnail. */}
      {lightbox && (
        <ImageLightbox items={lightbox.items} index={lightbox.index} onClose={closeImage} />
      )}
    </>
  )
}
