import { memo, useEffect, useState } from 'react'
import { fetchPexelsImage } from '../../utils/imageCache.js'

const GRADIENT = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'

// Single thumbnail — loads its own image through the cache (never Pexels direct).
const Thumb = memo(function Thumb({ item, index, onSelect }) {
  const [fetched, setFetched] = useState(null)
  const [hover, setHover] = useState(false)

  // An item may carry a direct image URL (e.g. Wikimedia Commons) — use it as-is;
  // otherwise resolve one from its imageQuery through the cache (never Pexels direct).
  useEffect(() => {
    if (item?.url) return
    let alive = true
    if (item?.imageQuery) fetchPexelsImage(item.imageQuery).then((u) => alive && setFetched(u))
    return () => {
      alive = false
    }
  }, [item?.url, item?.imageQuery])

  const url = item?.url ?? fetched

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item, index)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 232,
        height: 148,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: 0,
        cursor: 'pointer',
        background: url ? `url(${url}) center/cover` : GRADIENT,
        boxShadow: hover ? '0 24px 48px -26px rgba(0,0,0,0.85)' : 'none',
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
        willChange: 'transform',
      }}
    >
      {/* title overlay on hover */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 14,
          textAlign: 'left',
          background:
            'linear-gradient(to top, rgba(4,8,18,0.85), rgba(4,8,18,0) 70%)',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.25s ease',
          color: 'white',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.25,
        }}
      >
        {item?.title}
      </span>
    </button>
  )
})

// Horizontal visual-journey rail. Clicking a thumb calls onSelect(item, index)
// so the parent can open the fullscreen viewer at that image.
function VisualJourney({ images, onSelect }) {
  if (!images?.length) return null

  return (
    <div
      className="lw-noscroll"
      style={{
        display: 'flex',
        gap: 14,
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: 2,
      }}
    >
      {images.map((item, i) => (
        <Thumb key={`${item.title}-${i}`} item={item} index={i} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default memo(VisualJourney)
