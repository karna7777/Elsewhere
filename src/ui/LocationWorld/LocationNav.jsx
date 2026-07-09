import { memo } from 'react'

// Module definitions — a tab only appears when its data exists on the node.
// Ellie is always available. Order here is the tab order.
const MODULE_DEFS = [
  // Story is present while the AI Composer is still running, so a searched place
  // opens straight onto the (shimmering) Story tab that its real story fades into.
  { key: 'story', label: 'Story', has: (l) => !!l.story || l.aiStatus === 'pending' },
  { key: 'explore', label: 'Explore', has: (l) => l.wonders?.length > 0 },
  { key: 'hidden', label: 'Hidden', has: (l) => l.hiddenGems?.length > 0 },
  { key: 'food', label: 'Food', has: (l) => l.food?.length > 0 },
  { key: 'seasons', label: 'Seasons', has: (l) => !!l.seasons },
  { key: 'culture', label: 'Culture', has: (l) => !!l.culture },
  { key: 'ellie', label: 'Ellie', has: () => true },
]

// Single source of truth, shared with LocationWorld so the default/active
// module always matches the rendered tabs.
export function getAvailableModules(location) {
  return location ? MODULE_DEFS.filter((m) => m.has(location)) : []
}

// Sticky, transparent until scrolled past 40px (then glass blur). Receives the
// `scrolled` boolean (not raw scrollY) so it only re-renders on threshold cross.
function LocationNav({ location, scrolled, activeModule, onSelect }) {
  if (!location) return null
  const modules = getAvailableModules(location)

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        background: scrolled ? 'rgba(4,8,18,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'background 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
      }}
    >
      {/* Inner wrapper shares the same centered 1100px column as the module
          content, so the tabs line up with everything below them. */}
      <div
        className="lw-noscroll"
        style={{
          maxWidth: 'var(--content-max, 1280px)',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          gap: 38,
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
      {modules.map((m) => {
        const active = m.key === activeModule
        return (
          <button
            key={m.key}
            type="button"
            onClick={() => onSelect?.(m.key)}
            style={{
              flexShrink: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '22px 0',
              fontSize: 15,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: active ? '#7dd3fc' : 'rgba(255,255,255,0.4)',
              borderBottom: active ? '2px solid #7dd3fc' : '2px solid transparent',
              transition: 'color 0.2s ease',
            }}
          >
            {m.label}
          </button>
        )
      })}
      </div>
    </nav>
  )
}

export default memo(LocationNav)
