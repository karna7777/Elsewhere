import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchPexelsImage } from '../../utils/imageCache.js'

const EASE = [0.16, 1, 0.3, 1]

// Resolve an item to a displayable URL: a direct URL (Wikimedia Commons) is used
// as-is, otherwise its imageQuery is resolved through the cache (never Pexels
// direct). Tagged with the index so a slow fetch for a previous slide is ignored.
function useResolvedUrl(item, index) {
  const direct = item?.url ?? null
  const [fetched, setFetched] = useState(null) // { index, url }
  useEffect(() => {
    if (direct) return undefined
    let alive = true
    if (item?.imageQuery) {
      fetchPexelsImage(item.imageQuery).then((u) => alive && setFetched({ index, url: u }))
    }
    return () => {
      alive = false
    }
  }, [direct, item?.imageQuery, index])
  return direct ?? (fetched?.index === index ? fetched.url : null)
}

function NavButton({ side, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'absolute',
        [side]: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 56,
        height: 56,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        color: '#fff',
        cursor: 'pointer',
        zIndex: 2,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {side === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}

// Full-screen image viewer. Rendered through a portal to <body> so it covers the
// whole viewport (globe column included), not just the panel's stacking context.
export default function ImageLightbox({ items, index, onClose }) {
  // Seeded from the start index; the viewer remounts on each open, so no sync
  // effect is needed to track prop changes.
  const [i, setI] = useState(index)

  const count = items?.length ?? 0
  const clamped = count ? ((i % count) + count) % count : 0
  const current = items?.[clamped]
  const url = useResolvedUrl(current, clamped)

  const next = useCallback(() => setI((v) => v + 1), [])
  const prev = useCallback(() => setI((v) => v - 1), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, next, prev])

  if (!count) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(3,5,12,0.94)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {count > 1 && <NavButton side="left" onClick={(e) => { e.stopPropagation(); prev() }} label="Previous image" />}
        {count > 1 && <NavButton side="right" onClick={(e) => { e.stopPropagation(); next() }} label="Next image" />}

        {/* Image (stop propagation so clicking the photo doesn't close) */}
        <motion.figure
          key={clamped}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          style={{ margin: 0, maxWidth: '86vw', maxHeight: '86vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          {url ? (
            <img
              src={url}
              alt={current?.title ?? ''}
              style={{
                maxWidth: '86vw',
                maxHeight: '78vh',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              }}
            />
          ) : (
            <div style={{ width: '60vw', height: '60vh', borderRadius: 12, background: 'rgba(255,255,255,0.05)' }} />
          )}
          {current?.title && (
            <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}>
              <span style={{ fontSize: 15 }}>{current.title}</span>
              {count > 1 && (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                  {clamped + 1} / {count}
                </span>
              )}
            </figcaption>
          )}
        </motion.figure>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
