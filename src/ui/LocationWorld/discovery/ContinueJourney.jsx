import { memo, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../../store/useStore'
import { fetchPexelsImage } from '../../../utils/imageCache.js'
import { resolveNode } from '../../../data/NodeResolver.js'
import { getNearby, getSameCountry } from '../../../utils/discoveryUtils.js'

const GRADIENT = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'
const EASE = [0.16, 1, 0.3, 1]
const MIN_CARDS = 4

// One journey card — loads its own image through the cache (never Pexels direct).
const JourneyCard = memo(function JourneyCard({ node, index, onClick }) {
  const [url, setUrl] = useState(null)
  const query = node.heroMedia?.imageQuery ?? node.imageQuery ?? node.name

  useEffect(() => {
    let alive = true
    if (query) fetchPexelsImage(query).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [query])

  const km = node._distKm != null ? `${Math.round(node._distKm)} km away` : null

  return (
    <motion.button
      type="button"
      className="cj-card"
      onClick={() => onClick(node)}
      aria-label={`Explore ${node.name}${km ? `, ${km}` : ''}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.24, delay: index * 0.04, ease: EASE }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
      style={{
        position: 'relative',
        flexShrink: 0,
        height: 145,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: 0,
        cursor: 'pointer',
        scrollSnapAlign: 'start',
        background: url ? `url(${url}) center/cover` : GRADIENT,
        color: 'white',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(4,8,18,0.85) 0%, rgba(4,8,18,0) 55%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 12,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, textAlign: 'left', lineHeight: 1.2 }}>
          {node.name}
        </span>
        {km && (
          <span
            style={{
              flexShrink: 0,
              fontSize: 10,
              padding: '3px 8px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {km}
          </span>
        )}
      </span>
    </motion.button>
  )
})

// ContinueJourney — there is ALWAYS somewhere to go next. Priority:
//   1) this location's wonders   2) its hidden gems   3) getNearby   4) getSameCountry
// Pulled in order until at least MIN_CARDS, deduped by id, current excluded. Raw
// sub-items are normalized to LocationNodes ONCE here; discoveryUtils results
// arrive resolved. Clicks call pushLevel(node) directly — never resolveNode again.
function ContinueJourney({ location }) {
  const pushLevel = useStore((s) => s.pushLevel)

  const journey = useMemo(() => {
    if (!location) return []
    const seen = new Set([location.id ?? location.name])
    const out = []
    const add = (nodes) => {
      for (const n of nodes) {
        if (!n) continue
        const id = n.id ?? n.name
        if (seen.has(id)) continue
        seen.add(id)
        out.push(n)
      }
    }

    add(
      (location.wonders ?? []).map((w) =>
        resolveNode({ ...w, type: w.type ?? 'landmark', parentId: location.id })
      )
    )
    if (out.length < MIN_CARDS) {
      add(
        (location.hiddenGems ?? []).map((g) =>
          resolveNode({ ...g, type: g.type ?? 'sublocation', parentId: location.id })
        )
      )
    }
    if (out.length < MIN_CARDS) add(getNearby(location))
    if (out.length < MIN_CARDS) add(getSameCountry(location))

    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id])

  if (journey.length === 0) return null

  return (
    <section className="disc-section">
      <h2 className="disc-title">Continue Your Journey</h2>
      <p className="disc-sub">Keep exploring {location.name}</p>

      <div className="disc-strip">
        {journey.map((node, i) => (
          <JourneyCard key={node.id} node={node} index={i} onClick={pushLevel} />
        ))}
      </div>
    </section>
  )
}

export default memo(ContinueJourney)
