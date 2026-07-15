import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPexelsImage } from '../../utils/imageCache.js'
import VisualJourney from './VisualJourney'

const GRADIENT_FALLBACK = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'
const EASE = [0.16, 1, 0.3, 1]

// Type-agnostic hero. Renders whatever location node is passed in (country,
// city, landmark, hidden gem, trail…). Pure: it reads no global state — scroll
// position and hierarchy are passed down from LocationWorld.
function HeroSection({ location, hierarchy = [], scrollY = 0, onOpenImage }) {
  const [imgUrl, setImgUrl] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // Hero image loaded through the image cache only — never Pexels directly.
  useEffect(() => {
    let alive = true
    setImgUrl(null)
    setLoaded(false)
    const query = location?.heroMedia?.imageQuery
    if (query) fetchPexelsImage(query).then((u) => alive && setImgUrl(u))
    return () => {
      alive = false
    }
    // Re-run only when the place changes (id), not on every heroMedia identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id])

  if (!location) return null

  // The viewer shows the hero photo first, then the whole visual journey. Thumb i
  // maps to viewer index i + heroOffset so the ordering stays consistent.
  const heroItem = imgUrl ? { url: imgUrl, title: location.name } : null
  const galleryItems = location.visualJourney ?? []
  const viewerItems = heroItem ? [heroItem, ...galleryItems] : galleryItems
  const heroOffset = heroItem ? 1 : 0

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '74vh',
        overflow: 'hidden',
      }}
    >
      {/* gradient fallback (always behind) */}
      <div style={{ position: 'absolute', inset: 0, background: GRADIENT_FALLBACK }} />

      {/* hero image — GPU parallax + fade-in on load */}
      {imgUrl && (
        <img
          src={imgUrl}
          alt=""
          onLoad={() => setLoaded(true)}
          onClick={() => onOpenImage?.(viewerItems, 0)}
          // If the URL ever fails, drop the image entirely so the gradient shows
          // through — never a broken image, never a white flash.
          onError={() => {
            setImgUrl(null)
            setLoaded(false)
          }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 600ms ease',
            willChange: 'transform',
            cursor: 'zoom-in',
          }}
        />
      )}

      {/* overlay — non-interactive so clicks fall through to the hero image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(4,8,18,0.55) 55%, rgba(4,8,18,0.97) 100%)',
        }}
      />

      {/* bottom content */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          // Centered on the same 1100px column as the nav + module content, so the
          // title, tabs and body copy all share one left edge.
          maxWidth: 'var(--content-max, 1280px)',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(24px, 3vw, 42px)',
            lineHeight: 1.35,
            maxWidth: 760,
            color: 'rgba(255,255,255,0.94)',
          }}
        >
          {location.heroQuote}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{
            margin: 0,
            fontWeight: 300,
            fontSize: 'clamp(56px, 6.8vw, 108px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            color: 'white',
          }}
        >
          {location.name}
        </motion.h1>

        {hierarchy.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {hierarchy.map((seg, i) => (
              <span key={`${seg}-${i}`} style={{ display: 'flex', gap: 8 }}>
                {i > 0 && <span style={{ opacity: 0.5 }}>•</span>}
                <span>{seg}</span>
              </span>
            ))}
          </motion.div>
        )}

        {/* Mood tag row — the essence of the place at a glance. */}
        {location.moods?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88, ease: EASE }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}
          >
            {location.moods.slice(0, 6).map((m) => (
              <span
                key={m}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 15px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(232,192,122,0.28)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#e8c07a', flexShrink: 0 }}
                />
                {m}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
          style={{ marginTop: 6 }}
        >
          <VisualJourney
            images={galleryItems}
            onSelect={(_item, i) => onOpenImage?.(viewerItems, i + heroOffset)}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default memo(HeroSection)
