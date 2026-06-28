import { memo, useEffect, useState } from 'react'
import { fetchPexelsImage } from '../../utils/imageCache.js'

const GRADIENT = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'

// Single thumbnail — loads its own image through the cache (never Pexels direct).
const Thumb = memo(function Thumb({ item, onSelect }) {
  const [url, setUrl] = useState(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let alive = true
    if (item?.imageQuery) fetchPexelsImage(item.imageQuery).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [item?.imageQuery])

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 140,
        height: 90,
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: 0,
        cursor: 'pointer',
        background: url ? `url(${url}) center/cover` : GRADIENT,
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.25s ease',
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
          padding: 8,
          textAlign: 'left',
          background:
            'linear-gradient(to top, rgba(4,8,18,0.85), rgba(4,8,18,0) 70%)',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.25s ease',
          color: 'white',
          fontSize: 11,
          fontWeight: 500,
          lineHeight: 1.2,
        }}
      >
        {item?.title}
      </span>
    </button>
  )
})

// Horizontal visual-journey rail. Click prepares the fullscreen-viewer API by
// invoking onSelect(item); the viewer itself is built in a later prompt.
function VisualJourney({ images, onSelect }) {
  if (!images?.length) return null

  return (
    <div
      className="lw-noscroll"
      style={{
        display: 'flex',
        gap: 10,
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: 2,
      }}
    >
      {images.map((item, i) => (
        <Thumb key={`${item.title}-${i}`} item={item} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default memo(VisualJourney)
