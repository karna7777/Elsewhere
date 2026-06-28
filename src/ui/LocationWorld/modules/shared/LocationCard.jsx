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
    : { width: '100%', height: 180, position: 'relative', overflow: 'hidden' }

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
        borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'inherit',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.25s ease',
        willChange: 'transform',
      }}
    >
      <div style={imageBox}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: url ? `url(${url}) center/cover` : GRADIENT,
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.25s ease',
            willChange: 'transform',
          }}
        />
        {badge && <div style={{ position: 'absolute', top: 10, left: 10 }}>{badge}</div>}
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {title && (
          <span style={{ fontSize: 15, fontWeight: 400, color: 'white' }}>{title}</span>
        )}
        {subtitle && (
          <span
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.6)',
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
          <span style={{ marginTop: 4, fontSize: 11, color: '#7dd3fc', letterSpacing: '0.04em' }}>
            {footer}
          </span>
        )}
      </div>
    </button>
  )
}

export default memo(LocationCard)
