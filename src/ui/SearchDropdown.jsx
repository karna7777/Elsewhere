import { memo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SearchResultItem from './SearchResultItem'
import { iconForType } from './searchIcons'

// Subtitle line. Curated results show their country; worldwide results show the
// richest available hierarchy — "state • country" — dropping empty segments so a
// missing level never leaves a dangling separator.
function secondaryFor(item, curated) {
  if (curated) return item.country || ''
  return [item.state, item.country].filter(Boolean).join(' • ')
}

const DROPDOWN_STYLE = {
  marginTop: 8,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 20,
  padding: 6,
  overflow: 'hidden',
}

const STATE_WRAP = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '18px 16px',
  color: 'rgba(255,255,255,0.55)',
  fontSize: 14,
}

const DROPDOWN_CSS = `
  .search-result-row { transition: background 0.15s ease, box-shadow 0.15s ease; }
  .search-list::-webkit-scrollbar { display: none; }
  .search-list { scrollbar-width: none; -ms-overflow-style: none; }
  .search-dots { display: inline-flex; gap: 4px; margin-left: 10px; }
  .search-dots i {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.55); display: inline-block;
    animation: search-bounce 1.2s infinite ease-in-out both;
  }
  .search-dots i:nth-child(1) { animation-delay: -0.24s; }
  .search-dots i:nth-child(2) { animation-delay: -0.12s; }
  @keyframes search-bounce {
    0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
`

// The autocomplete surface: a fading/sliding listbox that renders one of three
// states — a live loader while the world resolves, an empty message, or the
// staggered result rows. Presentational only: all selection state comes in via
// props, all actions go out via callbacks. Memoized.
function SearchDropdown({
  listboxId,
  items,
  curated,
  loading,
  empty,
  activeIndex,
  query,
  onHover,
  onChoose,
}) {
  const rowRefs = useRef([])

  // Keep the keyboard-selected row visible when selection moves past the fold.
  useEffect(() => {
    rowRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <motion.div
      role="listbox"
      id={listboxId}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={DROPDOWN_STYLE}
    >
      <style>{DROPDOWN_CSS}</style>

      {loading ? (
        <div style={STATE_WRAP} aria-live="polite">
          <span>Searching the world</span>
          <span className="search-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      ) : empty ? (
        <div
          style={{ ...STATE_WRAP, flexDirection: 'column', gap: 6, padding: '22px 16px', textAlign: 'center' }}
          aria-live="polite"
        >
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>No places found</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            Try another city, country or landmark.
          </span>
        </div>
      ) : (
        <div className="search-list" style={{ maxHeight: 360, overflowY: 'auto' }}>
          {items.map((item, i) => (
            <div key={item.id ?? `${item.name}-${i}`} ref={(el) => (rowRefs.current[i] = el)}>
              <SearchResultItem
                id={`${listboxId}-opt-${i}`}
                item={item}
                icon={curated ? item.flag ?? '📍' : iconForType(item.type)}
                secondary={secondaryFor(item, curated)}
                query={query}
                active={i === activeIndex}
                index={i}
                onHover={onHover}
                onChoose={onChoose}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default memo(SearchDropdown)
