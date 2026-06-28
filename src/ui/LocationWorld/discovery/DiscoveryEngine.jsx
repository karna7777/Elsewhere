import { memo } from 'react'
import ContinueJourney from './ContinueJourney'
import DiscoveryFilters from './DiscoveryFilters'
import HiddenSecrets from './HiddenSecrets'
import SimilarVibes from './SimilarVibes'
import DontMissBeforeYouLeave from './DontMissBeforeYouLeave'
import BuildMyDay from './BuildMyDay'

// All shared discovery CSS lives here (mounted once with the engine): responsive
// wrapper/grid/card widths, snap strips with iOS momentum, and a single focus-ring
// rule covering every interactive button in the subtree. `:first-of-type` zeroes
// the top margin of whichever section renders first (sections collapse to null
// when empty, so this stays correct regardless of which one leads).
const DISCOVERY_STYLES = `
  .disc-wrap { max-width: 900px; margin: 0 auto; padding: 40px 48px 90px; }
  @media (max-width: 560px) { .disc-wrap { padding: 32px 20px 70px; } }

  .disc-section { margin-top: 56px; }
  .disc-wrap > section:first-of-type { margin-top: 0; }

  .disc-title { margin: 0; font-size: 22px; font-weight: 600; color: #fff; letter-spacing: -0.01em; }
  .disc-sub { margin: 6px 0 18px; font-size: 13px; color: rgba(255,255,255,0.55); }

  .disc-strip {
    display: flex; gap: 16px; overflow-x: auto; overflow-y: hidden;
    scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 4px;
  }
  .disc-strip::-webkit-scrollbar { display: none; }
  .disc-strip { scrollbar-width: none; -ms-overflow-style: none; }

  .disc-chips {
    display: flex; gap: 10px; overflow-x: auto; overflow-y: hidden;
    padding: 2px 0 6px; -webkit-overflow-scrolling: touch;
  }
  .disc-chips::-webkit-scrollbar { display: none; }
  .disc-chips { scrollbar-width: none; -ms-overflow-style: none; }

  .disc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  @media (max-width: 900px) { .disc-grid { gap: 10px; } }
  @media (max-width: 560px) { .disc-grid { grid-template-columns: 1fr; } }

  .cj-card { width: 220px; }
  @media (max-width: 900px) { .cj-card { width: 200px; } }
  @media (max-width: 560px) { .cj-card { width: 170px; } }

  .sv-card { width: 260px; }
  @media (max-width: 900px) { .sv-card { width: 220px; } }
  @media (max-width: 560px) { .sv-card { width: 190px; } }

  .disc-wrap button:focus-visible {
    outline: 2px solid rgba(125,211,252,0.8); outline-offset: 2px; border-radius: 8px;
  }
`

// Presentational shell. Receives `location` via props only (never reads
// activeLocation directly). It holds NO Zustand subscription, so memo() means it
// rerenders only when its props change — unaffected by scroll or module state.
// levelHistory + setActiveModule are threaded through purely to feed
// DontMissBeforeYouLeave (which must stay props-only / Zustand-free).
function DiscoveryEngine({ location, levelHistory, setActiveModule }) {
  if (!location) return null

  return (
    <div className="disc-wrap">
      <style>{DISCOVERY_STYLES}</style>
      <ContinueJourney location={location} />
      <DiscoveryFilters location={location} />
      <HiddenSecrets location={location} />
      <SimilarVibes location={location} />
      {/* Keyed by location so each new area gets a fresh shimmer→recommendation
          cycle instead of lingering on the previous location's text. */}
      <DontMissBeforeYouLeave
        key={location.id ?? location.name}
        activeLocation={location}
        levelHistory={levelHistory}
        setActiveModule={setActiveModule}
      />
      <BuildMyDay
        key={`bmd-${location.id ?? location.name}`}
        activeLocation={location}
        setActiveModule={setActiveModule}
      />
    </div>
  )
}

export default memo(DiscoveryEngine)
