import { Fragment, memo, useMemo } from 'react'
import useStore from '../../../store/useStore'
import { resolveNode } from '../../../data/NodeResolver.js'
import ModuleWrapper from './shared/ModuleWrapper'
import LocationCard from './shared/LocationCard'

// Difficulty → label + colour. A gem only shows a badge when it carries a
// difficulty; absent data renders no badge (never an empty pill).
const DIFFICULTY = {
  easy: { label: 'Easy Access', color: '#10b981' },
  moderate: { label: 'Some Effort', color: '#f59e0b' },
  hard: { label: 'Off the Beaten Path', color: '#f97316' },
  remote: { label: 'True Explorer', color: '#8b5cf6' },
}

// Keyword → activity icon (data carries no icon field, so derive from the name).
const ACTIVITY_ICONS = [
  ['🚣', ['boat', 'raft', 'kayak', 'river', 'canoe', 'cruise']],
  ['🚂', ['train', 'railway', 'rail']],
  ['🥾', ['hike', 'trek', 'trail', 'climb', 'summit', 'walk']],
  ['🤿', ['dive', 'diving', 'snorkel', 'reef']],
  ['🏄', ['surf', 'wave']],
  ['🎈', ['balloon']],
  ['🚲', ['bike', 'cycle', 'cycling']],
  ['🛶', ['paddle']],
  ['🐫', ['camel', 'desert', 'dune', 'safari']],
  ['⛷️', ['ski', 'snow', 'snowboard']],
]
function activityIcon(activity) {
  if (activity?.icon) return activity.icon
  const t = String(activity?.name ?? '').toLowerCase()
  for (const [icon, words] of ACTIVITY_ICONS) {
    if (words.some((w) => t.includes(w))) return icon
  }
  return '🧭'
}

function Badge({ color, children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color,
        background: `${color}22`,
        border: `1px solid ${color}55`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </span>
  )
}

// Gradient rule, not a flat border (per spec) — placed only between sections.
const Divider = () => (
  <div
    style={{
      height: 1,
      margin: '48px auto',
      maxWidth: 900,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
    }}
  />
)

// ExploreModule — begins recursive exploration. Every card calls pushLevel,
// which reuses the existing recursive camera system. type defaults only when
// the node doesn't already declare one (never hardcoded). Each section is
// data-driven and omitted entirely when empty, so the layout collapses.
function ExploreModule({ activeLocation }) {
  const pushLevel = useStore((s) => s.pushLevel)
  const loc = activeLocation

  const wonders = loc?.wonders ?? []
  const gems = loc?.hiddenGems ?? []
  // Memoized so its reference is stable for the adventureStars useMemo below.
  const adventures = useMemo(() => loc?.adventures ?? [], [loc])

  // Precompute stars once per dataset instead of regenerating every render.
  const adventureStars = useMemo(
    () =>
      adventures.map((a) => {
        if (a.rating == null) return null
        const filled = Math.max(0, Math.min(5, Math.round(a.rating)))
        return '★'.repeat(filled) + '☆'.repeat(5 - filled)
      }),
    [adventures]
  )

  if (!loc) return null

  const sections = []

  // ── Iconic Wonders — responsive CSS Grid (NOT columns) ──────────────────
  if (wonders.length > 0) {
    sections.push(
      <ModuleWrapper key="wonders" title="Iconic Wonders" icon="🏛️">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 18,
          }}
        >
          {wonders.map((w, i) => (
            <LocationCard
              key={w.name ?? i}
              item={w}
              title={w.name}
              subtitle={w.description}
              imageQuery={w.imageQuery ?? w.images?.[0]}
              onClick={() =>
                pushLevel(resolveNode({ ...w, type: w.type ?? 'landmark', parentId: loc.id }))
              }
            />
          ))}
        </div>
      </ModuleWrapper>
    )
  }

  // ── Hidden Gems — single column, feels more secretive ───────────────────
  if (gems.length > 0) {
    sections.push(
      <ModuleWrapper key="gems" title="Hidden Gems" icon="💎">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {gems.map((g, i) => {
            const diff = g.difficulty ? DIFFICULTY[String(g.difficulty).toLowerCase()] : null
            return (
              <LocationCard
                key={g.name ?? i}
                item={g}
                title={g.name}
                subtitle={g.description}
                imageQuery={g.imageQuery ?? g.images?.[0]}
                badge={diff ? <Badge color={diff.color}>{diff.label}</Badge> : null}
                onClick={() =>
                  pushLevel(resolveNode({ ...g, type: g.type ?? 'sublocation', parentId: loc.id }))
                }
              />
            )
          })}
        </div>
      </ModuleWrapper>
    )
  }

  // ── Adventures — horizontal scroll of compact cards ─────────────────────
  if (adventures.length > 0) {
    sections.push(
      <ModuleWrapper key="adventures" title="Adventures" icon="🧗">
        <div
          className="lw-noscroll"
          style={{ display: 'flex', gap: 14, overflowX: 'auto', overflowY: 'hidden', paddingBottom: 4 }}
        >
          {adventures.map((a, i) => (
            <button
              key={a.name ?? i}
              type="button"
              onClick={() =>
                pushLevel(resolveNode({ ...a, type: a.type ?? 'sublocation', parentId: loc.id }))
              }
              style={{
                flexShrink: 0,
                width: 240,
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: '18px 20px',
                borderRadius: 12,
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'inherit',
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>{activityIcon(a)}</span>
              <span style={{ fontSize: 14, color: 'white' }}>{a.name}</span>
              {(adventureStars[i] || a.difficulty) && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {adventureStars[i] && (
                    <span style={{ color: '#fbbf24', letterSpacing: '1px' }}>
                      {adventureStars[i]}
                    </span>
                  )}
                  {a.difficulty && <span>{a.difficulty}</span>}
                </span>
              )}
              <span style={{ marginTop: 2, fontSize: 11, color: '#7dd3fc', letterSpacing: '0.04em' }}>
                Explore →
              </span>
            </button>
          ))}
        </div>
      </ModuleWrapper>
    )
  }

  return (
    <div style={{ paddingBottom: 64 }}>
      {sections.map((section, i) => (
        <Fragment key={section.key}>
          {i > 0 && <Divider />}
          {section}
        </Fragment>
      ))}
    </div>
  )
}

export default memo(ExploreModule)
