import { useMemo, useRef, useState } from 'react'
import useStore from '../store/useStore'
import destinations from '../data/destinations.js'
import { resolveNode } from '../data/NodeResolver.js'

const MAX_RESULTS = 8

// Case-insensitive match across name/country/continent, plus a fuzzy pass over
// wonder and hidden-gem names so a search like "torii" or "lagoon" still lands.
function matches(dest, q) {
  if (dest.name.toLowerCase().includes(q)) return true
  if (dest.country.toLowerCase().includes(q)) return true
  if (dest.continent.toLowerCase().includes(q)) return true
  if (dest.wonders?.some((w) => w.name.toLowerCase().includes(q))) return true
  if (dest.hiddenGems?.some((g) => g.name.toLowerCase().includes(q))) return true
  return false
}

export default function SearchBar() {
  const setActiveDestination = useStore((s) => s.setActiveDestination)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return destinations.filter((d) => matches(d, q)).slice(0, MAX_RESULTS)
  }, [query])

  const showDropdown = open && results.length > 0

  const select = (dest) => {
    if (!dest) return
    // Resolve to a normalized LocationNode first (sync, pure), then enter — the
    // store stays free of resolution logic. Triggers the cinematic fly-to via the
    // activeDestination subscription and resets the navigation stack to this root.
    setActiveDestination(resolveNode(dest))
    setQuery('')
    setOpen(false)
    setActiveIndex(0)
    inputRef.current?.blur()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (results.length) select(results[Math.max(0, Math.min(activeIndex, results.length - 1))])
    } else if (e.key === 'Escape') {
      setQuery('')
      setOpen(false)
      setActiveIndex(0)
      inputRef.current?.blur()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        width: 400,
        zIndex: 50,
        fontFamily: 'inherit',
      }}
    >
      <style>{`
        .elsewhere-search-input::placeholder { color: rgba(255,255,255,0.4); }
        .elsewhere-search-input { caret-color: #7dd3fc; }
      `}</style>

      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 30,
          padding: '14px 24px',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.5, flexShrink: 0 }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          className="elsewhere-search-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder="Search destinations, cities, wonders…"
          aria-label="Search destinations"
          autoComplete="off"
          spellCheck={false}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 16,
          }}
        />
      </div>

      {/* Autocomplete dropdown */}
      {showDropdown && (
        <div
          role="listbox"
          style={{
            marginTop: 8,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 20,
            padding: 6,
            overflow: 'hidden',
          }}
        >
          {results.map((d, i) => (
            <div
              key={d.id}
              role="option"
              aria-selected={i === activeIndex}
              // mousedown (not click) so selection fires before the input blur closes the list
              onMouseDown={(e) => {
                e.preventDefault()
                select(d)
              }}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 14,
                cursor: 'pointer',
                background: i === activeIndex ? 'rgba(255,255,255,0.12)' : 'transparent',
                transition: 'background 0.15s ease',
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{d.flag}</span>
              <span style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>{d.name}</span>
              <span
                style={{
                  marginLeft: 'auto',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 13,
                }}
              >
                {d.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
