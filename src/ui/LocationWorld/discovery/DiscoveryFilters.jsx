import { memo, useCallback, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../../../store/useStore'
import LocationCard from '../modules/shared/LocationCard'
import {
  getNearby,
  getSameContinent,
  getSameCountry,
} from '../../../utils/discoveryUtils.js'

const EASE = [0.16, 1, 0.3, 1]

// ── Single source of truth for discovery filters ─────────────────────────────
// (Config/copy lives in the UI layer, not the pure discoveryUtils.)
const FILTER_FUNCTIONS = {
  nearby: (loc) => getNearby(loc),
  region: (loc) => getSameCountry(loc),
  continent: (loc) => getSameContinent(loc),
}

const FILTER_LABELS = {
  nearby: 'Nearby',
  region: 'This Country',
  continent: 'Same Continent',
}

const FILTER_SUBHEADINGS = {
  nearby: 'Places within reach of here',
  region: 'More to explore in this country',
  continent: 'Keep exploring this continent',
}

const FILTERS_BY_TYPE = {
  continent: ['continent'],
  country: ['nearby', 'continent'],
  state: ['nearby', 'region', 'continent'],
  city: ['nearby', 'region', 'continent'],
  landmark: ['nearby', 'region'],
  sublocation: ['nearby', 'region'],
  default: ['nearby', 'continent'],
}

const BADGE_FILTERS = new Set(['nearby', 'region'])

function DistanceBadge({ km }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        padding: '3px 9px',
        borderRadius: 999,
        background: 'rgba(4,8,18,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: 'rgba(255,255,255,0.9)',
      }}
    >
      {Math.round(km)} km away
    </span>
  )
}

function subtitleFor(result) {
  return [result.country, result.continent].filter(Boolean).join(' · ')
}

// Owns its own discoveryFilter subscription so DiscoveryEngine doesn't have to
// (keeping the engine memo'd and scroll-stable). Memoized so it only rerenders
// on its store reads or a location change.
function DiscoveryFilters({ location }) {
  const discoveryFilter = useStore((s) => s.discoveryFilter)
  const setDiscoveryFilter = useStore((s) => s.setDiscoveryFilter)
  const pushLevel = useStore((s) => s.pushLevel)

  const chips = FILTERS_BY_TYPE[location.type] ?? FILTERS_BY_TYPE.default
  const chipRefs = useRef([])

  // Recompute ONLY when the location or active filter changes.
  const results = useMemo(
    () => (FILTER_FUNCTIONS[discoveryFilter] ?? FILTER_FUNCTIONS.nearby)(location),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.id, discoveryFilter]
  )

  const selectFilter = useCallback((id) => setDiscoveryFilter(id), [setDiscoveryFilter])
  const handleSelect = useCallback((node) => pushLevel(node), [pushLevel])

  // Roving arrow-key focus across chips.
  const onChipKeyDown = useCallback(
    (e, idx) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      const dir = e.key === 'ArrowRight' ? 1 : -1
      const next = (idx + dir + chips.length) % chips.length
      chipRefs.current[next]?.focus()
    },
    [chips.length]
  )

  const showBadge = BADGE_FILTERS.has(discoveryFilter)
  const subheading = FILTER_SUBHEADINGS[discoveryFilter] ?? ''

  return (
    <section className="disc-section">
      <h2 className="disc-title">Discover More</h2>
      <p className="disc-sub">{subheading}</p>

      {/* Filter chips */}
      <div className="disc-chips" role="tablist" aria-label="Discovery lenses">
        {chips.map((id, i) => {
          const active = id === discoveryFilter
          return (
            <button
              key={id}
              ref={(el) => (chipRefs.current[i] = el)}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectFilter(id)}
              onKeyDown={(e) => onChipKeyDown(e, i)}
              style={{
                flexShrink: 0,
                cursor: 'pointer',
                fontSize: 13,
                padding: '8px 16px',
                borderRadius: 30,
                border: '1px solid transparent',
                background: active ? '#7dd3fc' : 'rgba(255,255,255,0.07)',
                color: active ? 'rgba(4,8,18,0.9)' : 'rgba(255,255,255,0.7)',
                fontWeight: active ? 600 : 400,
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {FILTER_LABELS[id] ?? id}
            </button>
          )
        })}
      </div>

      {/* Results grid, or a graceful empty state (never a dead end) */}
      {results.length > 0 ? (
        <div className="disc-grid" style={{ marginTop: 18 }}>
          <AnimatePresence mode="popLayout">
            {results.map((result, i) => (
              <motion.div
                key={`${discoveryFilter}:${result.id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.24, delay: i * 0.04, ease: EASE } }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18, ease: EASE } }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
              >
                <LocationCard
                  item={result}
                  title={result.name}
                  subtitle={subtitleFor(result)}
                  imageQuery={result.heroMedia?.imageQuery ?? result.name}
                  badge={showBadge && result._distKm != null ? <DistanceBadge km={result._distKm} /> : null}
                  onClick={handleSelect}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ marginTop: 24, textAlign: 'center', padding: '32px 0' }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
            Nothing here yet
          </p>
          <p style={{ margin: '6px 0 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            Try another discovery lens.
          </p>
          <button
            type="button"
            onClick={() => selectFilter('nearby')}
            style={{
              cursor: 'pointer',
              fontSize: 13,
              padding: '9px 18px',
              borderRadius: 30,
              border: '1px solid transparent',
              background: '#7dd3fc',
              color: 'rgba(4,8,18,0.9)',
              fontWeight: 600,
            }}
          >
            Explore Nearby
          </button>
        </div>
      )}
    </section>
  )
}

export default memo(DiscoveryFilters)
