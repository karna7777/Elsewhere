import { memo, useEffect, useState } from 'react'
import { fetchPexelsImage } from '../../../../utils/imageCache.js'

const GRADIENT = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'

// Completely generic explorable card. It knows nothing about wonders, gems,
// food, seasons or culture — callers supply the title/subtitle/imageQuery and
// an onClick (which is where pushLevel lives). Image comes ONLY through the
// existing image cache; on miss it shows the gradient placeholder.
function LocationCard({
  item,
  title,
  subtitle,
  imageQuery,
  badge,
  footer = 'Explore →',
  aspectRatio,
  children,
  onClick,
}) {
  const [url, setUrl] = useState(null)
  const [hover, setHover] = useState(false)

  const query = imageQuery ?? item?.imageQuery
  useEffect(() => {
    let alive = true
    setUrl(null)
    if (query) fetchPexelsImage(query).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [query])

  const imageBox = aspectRatio
    ? { width: '100%', aspectRatio: String(aspectRatio), position: 'relative', overflow: 'hidden' }
    : { width: '100%', height: 250, position: 'relative', overflow: 'hidden' }

  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        width: '100%',
        padding: 0,
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 18,
        background: 'rgba(255,255,255,0.045)',
        border: '1px solid rgba(255,255,255,0.09)',
        color: 'inherit',
        boxShadow: hover
          ? '0 30px 60px -28px rgba(0,0,0,0.85)'
          : '0 18px 40px -32px rgba(0,0,0,0.7)',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
        willChange: 'transform',
      }}
    >
      <div style={imageBox}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: url ? `url(${url}) center/cover` : GRADIENT,
            transform: hover ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}
        />
        {badge && <div style={{ position: 'absolute', top: 14, left: 14 }}>{badge}</div>}
      </div>

      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {title && (
          <span style={{ fontSize: 'var(--fs-card)', fontWeight: 500, lineHeight: 1.25, color: 'white' }}>
            {title}
          </span>
        )}
        {subtitle && (
          <span
            style={{
              fontSize: 'var(--fs-meta)',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.62)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtitle}
          </span>
        )}
        {children}
        {footer && (
          <span style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: '#7dd3fc', letterSpacing: '0.04em' }}>
            {footer}
          </span>
        )}
      </div>
    </button>
  )
}

export default memo(LocationCard)
