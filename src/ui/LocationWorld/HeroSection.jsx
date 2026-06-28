import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPexelsImage } from '../../utils/imageCache.js'
import WeatherBadge from './WeatherBadge'
import VisualJourney from './VisualJourney'

const GRADIENT_FALLBACK = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'
const EASE = [0.16, 1, 0.3, 1]

// Type-agnostic hero. Renders whatever location node is passed in (country,
// city, landmark, hidden gem, trail…). Pure: it reads no global state — scroll
// position and hierarchy are passed down from LocationWorld.
function HeroSection({ location, hierarchy = [], scrollY = 0, onImageSelect }) {
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
  }, [location?.id])

  if (!location) return null

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '62vh',
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
          }}
        />
      )}

      {/* overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
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
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            margin: 0,
            fontWeight: 300,
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            lineHeight: 1.4,
            maxWidth: 600,
            color: 'rgba(255,255,255,0.92)',
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
            fontSize: 'clamp(36px, 4.4vw, 56px)',
            lineHeight: 1.05,
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
              gap: 8,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.45)',
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          style={{ marginTop: 4 }}
        >
          <WeatherBadge lat={location.lat} lng={location.lng} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
          style={{ marginTop: 6 }}
        >
          <VisualJourney images={location.visualJourney} onSelect={onImageSelect} />
        </motion.div>
      </div>
    </section>
  )
}

export default memo(HeroSection)
