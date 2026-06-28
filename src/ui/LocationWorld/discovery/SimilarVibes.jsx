import { memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../../store/useStore'
import LocationCard from '../modules/shared/LocationCard'
import { getSimilarVibes } from '../../../utils/discoveryUtils.js'

const EASE = [0.16, 1, 0.3, 1]

// Mood-overlap chips (max 2) shown top-left of each card.
function MoodChips({ moods }) {
  if (!moods.length) return null
  return (
    <span style={{ display: 'flex', gap: 6 }}>
      {moods.map((m) => (
        <span
          key={m}
          style={{
            fontSize: 10,
            padding: '3px 8px',
            borderRadius: 20,
            background: 'rgba(4,8,18,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          {m}
        </span>
      ))}
    </span>
  )
}

// SimilarVibes — "places with the same soul". Results come from
// discoveryUtils.getSimilarVibes (already resolved), so clicks are a bare
// pushLevel(node). Mood overlap is computed once inside the memo, never per render.
function SimilarVibes({ location }) {
  const pushLevel = useStore((s) => s.pushLevel)
  const handleSelect = useCallback((node) => pushLevel(node), [pushLevel])

  const items = useMemo(() => {
    const mine = new Set(location?.moods ?? [])
    return getSimilarVibes(location, 6).map((node) => ({
      node,
      moods: (node.moods ?? []).filter((m) => mine.has(m)).slice(0, 2),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id])

  if (items.length === 0) return null

  return (
    <section className="disc-section">
      <h2 className="disc-title">You May Also Love</h2>
      <p className="disc-sub">Places with the same soul</p>

      <div className="disc-strip">
        {items.map(({ node, moods }, i) => (
          <motion.div
            key={node.id}
            className="sv-card"
            style={{ flexShrink: 0, scrollSnapAlign: 'start' }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, delay: i * 0.05, ease: EASE }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
          >
            <LocationCard
              item={node}
              title={node.name}
              subtitle={node.country}
              imageQuery={node.heroMedia?.imageQuery ?? node.name}
              badge={moods.length ? <MoodChips moods={moods} /> : null}
              onClick={handleSelect}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default memo(SimilarVibes)
