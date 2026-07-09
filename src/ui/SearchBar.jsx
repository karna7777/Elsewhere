import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import destinations from '../data/destinations.js'
import { resolveNode } from '../data/NodeResolver.js'
import { searchWorld } from '../services/geocoder'
import { createTemporaryLocation } from '../utils/createTemporaryLocation'
import { enrichDestination } from '../services/enrichDestination'
import SearchDropdown from './SearchDropdown'

const MAX_RESULTS = 8
const WORLD_DEBOUNCE_MS = 300
const LISTBOX_ID = 'elsewhere-search-listbox'

// Match a curated destination only on its own name / country / continent — NOT on
// nested wonder or hidden-gem names. Matching those made a query like "munnar"
// resolve to curated "Kerala" (which lists Munnar as a wonder) and suppressed the
// worldwide search, so the actual town never appeared. Now specific places fall
// through to the geocoder and surface directly.
function matches(dest, q) {
  if (dest.name.toLowerCase().includes(q)) return true
  if (dest.country.toLowerCase().includes(q)) return true
  if (dest.continent.toLowerCase().includes(q)) return true
  return false
}

export default function SearchBar() {
  const setActiveDestination = useStore((s) => s.setActiveDestination)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  // Worldwide results tagged with the query they belong to, so a stale response
  // (or the debounce gap) is never mistaken for "no results" — avoiding an empty
  // flash before the real results land.
  const [world, setWorld] = useState({ q: '', results: [], done: false })
  const inputRef = useRef(null)
  // Prevents a second selection while a worldwide result is being enriched.
  const resolvingRef = useRef(false)

  // Curated matches — always first-class, resolved synchronously from the dataset.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return destinations.filter((d) => matches(d, q)).slice(0, MAX_RESULTS)
  }, [query])

  // Hybrid fallback: only reach for the worldwide geocoder when curated search
  // finds nothing. Debounced and abortable, so rapid typing cancels stale
  // requests. ALL state changes happen inside the debounced callback (never
  // synchronously in the effect body), and results are tagged with their query.
  useEffect(() => {
    const q = query.trim()
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      if (!q || results.length > 0) {
        setWorld({ q, results: [], done: true })
        return
      }
      const found = await searchWorld(q, { signal: controller.signal })
      if (controller.signal.aborted) return
      setWorld({ q, results: found, done: true })
    }, WORLD_DEBOUNCE_MS)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, results.length])

  // ── Derived view state ──────────────────────────────────────────────────────
  const qTrim = query.trim()
  const usingWorld = results.length === 0 && qTrim.length > 0
  const worldReady = world.done && world.q === qTrim
  const worldResults = usingWorld && worldReady ? world.results : []
  const items = usingWorld ? worldResults : results
  const loading = usingWorld && !worldReady
  const empty = usingWorld && worldReady && world.results.length === 0
  const showDropdown = open && qTrim.length > 0
  const clampedIndex = items.length ? Math.min(activeIndex, items.length - 1) : 0

  const reset = () => {
    setQuery('')
    setOpen(false)
    setActiveIndex(0)
    setWorld({ q: '', results: [], done: false })
    inputRef.current?.blur()
  }

  // Resolve to a normalized LocationNode first (sync, pure), then enter — the store
  // stays free of resolution logic. Triggers the cinematic fly-to via the
  // activeDestination subscription and resets the navigation stack to this root.
  const selectCurated = (dest) => {
    if (!dest) return
    setActiveDestination(resolveNode(dest))
    reset()
  }

  // A worldwide result resolves INSTANTLY from geocoder facts (zero network), so
  // navigation flies the moment it's selected. The factual layer (Wikipedia, hero,
  // weather) and the AI composition both stream into the repository afterwards, in
  // the background — the fly is never blocked.
  const selectWorld = (result) => {
    if (!result || resolvingRef.current) return
    resolvingRef.current = true
    const location = createTemporaryLocation(result)
    resolvingRef.current = false
    if (location) {
      setActiveDestination(location) // fly now (facts + placeType already on it)
      enrichDestination(location, result) // background: knowledge + AI → repository → UI
    }
    reset()
  }

  const chooseAt = useCallback(
    (i) => {
      const item = items[i]
      if (!item) return
      if (usingWorld) selectWorld(item)
      else selectCurated(item)
    },
    // selectCurated/selectWorld are stable closures over store setter + refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, usingWorld]
  )

  const onHover = useCallback((i) => setActiveIndex(i), [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => (items.length ? (i + 1) % items.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0))
    } else if (e.key === 'Enter') {
      if (items.length) chooseAt(clampedIndex)
    } else if (e.key === 'Escape') {
      reset()
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
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={
            showDropdown && items.length ? `${LISTBOX_ID}-opt-${clampedIndex}` : undefined
          }
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

      {/* Autocomplete dropdown — curated matches first; worldwide results only when
          the curated search finds nothing. */}
      <AnimatePresence>
        {showDropdown && (
          <SearchDropdown
            listboxId={LISTBOX_ID}
            items={items}
            curated={!usingWorld}
            loading={loading}
            empty={empty}
            activeIndex={clampedIndex}
            query={query}
            onHover={onHover}
            onChoose={chooseAt}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
