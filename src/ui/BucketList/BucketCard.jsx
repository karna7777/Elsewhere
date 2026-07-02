import { memo, useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { fetchPexelsImage } from '../../utils/imageCache'

// A single saved place in the Bucket Panel. Draggable (dnd-kit sortable),
// clickable (navigate via the panel's handler), and removable. Memoized so a card
// only re-renders when its own props change — moving one card never re-renders
// the others.

const keyOf = (i) => i?.id ?? i?.name

function monthYear(ts) {
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

function BucketCard({ item, category, onRemove, onClick }) {
  const id = keyOf(item)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id, data: { type: 'card', category } })

  const [hover, setHover] = useState(false)
  const [img, setImg] = useState(null)

  // Thumbnail via the existing image cache (Pexels). Null → gradient fallback.
  useEffect(() => {
    let alive = true
    const query = item.heroMedia?.imageQuery || item.name
    fetchPexelsImage(query).then((url) => {
      if (alive && url) setImg(url)
    })
    return () => {
      alive = false
    }
  }, [item.heroMedia?.imageQuery, item.name])

  const base = CSS.Transform.toString(transform)
  const style = {
    transform: isDragging && base ? `${base} scale(1.03)` : base,
    transition,
    opacity: isDragging ? 0.85 : 1,
    boxShadow: isDragging ? '0 16px 40px rgba(0,0,0,0.35)' : 'none',
    zIndex: isDragging ? 50 : 'auto',
    position: 'relative',
    display: 'flex',
    gap: 12,
    padding: 10,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
    outline: 'none',
  }

  // Only show a date when the item actually carries one (no impure clock reads
  // in render). Older saved items without a timestamp fall back to a neutral line.
  const added = item.addedAt != null ? monthYear(item.addedAt) : null

  const activate = () => onClick?.(item)
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      activate()
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-label={`${item.name}${item.country ? `, ${item.country}` : ''}`}
      onClick={activate}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 60,
          height: 80,
          flexShrink: 0,
          borderRadius: 8,
          overflow: 'hidden',
          background: img
            ? undefined
            : 'linear-gradient(135deg, rgba(125,211,252,0.25), rgba(59,130,246,0.15))',
        }}
      >
        {img && (
          <img
            src={img}
            alt=""
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {[item.country, item.continent].filter(Boolean).join(' · ')}
        </span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
          {added ? `Added ${added}` : 'Saved'}
        </span>
      </div>

      {/* Remove — glass circle, hover only. */}
      <button
        aria-label="Remove from bucket list"
        onPointerDown={(e) => e.stopPropagation()} // don't start a drag from the button
        onClick={(e) => {
          e.stopPropagation()
          onRemove?.(id)
        }}
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          width: 22,
          height: 22,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(8,12,24,0.6)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'rgba(255,255,255,0.85)',
          cursor: 'pointer',
          padding: 0,
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.15s ease',
          pointerEvents: hover ? 'auto' : 'none',
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

export default memo(BucketCard)
