import { memo, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchPexelsImage } from '../../../utils/imageCache.js'

const EASE = [0.16, 1, 0.3, 1]
const GRADIENT = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const SEASON_DEFS = [
  { key: 'spring', label: 'Spring', icon: '🌸' },
  { key: 'summer', label: 'Summer', icon: '☀️' },
  { key: 'autumn', label: 'Autumn', icon: '🍂' },
  { key: 'winter', label: 'Winter', icon: '❄️' },
]

// ── bestSeason → highlighted month indices ───────────────────────────────────
const MONTH_PATTERN =
  '(january|february|march|april|may|june|july|august|september|october|november|december' +
  '|jan|feb|mar|apr|jun|jul|aug|sept|sep|oct|nov|dec)'
const MONTH_ALIAS = { sept: 8 }

function monthIndex(token) {
  const t = token.toLowerCase()
  if (t in MONTH_ALIAS) return MONTH_ALIAS[t]
  for (let i = 0; i < MONTHS.length; i++) {
    if (t === MONTHS[i].toLowerCase() || t.startsWith(MONTHS[i].toLowerCase())) return i
  }
  return -1
}

// Pure: scan free-text bestSeason for ranges (filled, wrapping) + standalone months.
function parseBestMonths(bestSeason) {
  const set = new Set()
  if (!bestSeason) return set

  const rangeRe = new RegExp(
    `${MONTH_PATTERN}\\s*(?:–|—|-|to|through|until)\\s*${MONTH_PATTERN}`,
    'gi'
  )
  let m
  while ((m = rangeRe.exec(bestSeason))) {
    const a = monthIndex(m[1])
    const b = monthIndex(m[2])
    if (a >= 0 && b >= 0) {
      let i = a
      for (let guard = 0; guard < 12; guard++) {
        set.add(i)
        if (i === b) break
        i = (i + 1) % 12
      }
    }
  }

  const singleRe = new RegExp(MONTH_PATTERN, 'gi')
  while ((m = singleRe.exec(bestSeason))) {
    const idx = monthIndex(m[1])
    if (idx >= 0) set.add(idx)
  }
  return set
}

// ── Crowd + packing helpers ──────────────────────────────────────────────────
const CROWD = {
  low: { w: '25%', c: '#10b981' },
  medium: { w: '50%', c: '#f59e0b' },
  high: { w: '75%', c: '#f97316' },
  peak: { w: '100%', c: '#ef4444' },
}

const PACK_ICONS = {
  jacket: '🧥',
  umbrella: '☂️',
  boots: '🥾',
  hat: '🧢',
  sunscreen: '🧴',
  camera: '📷',
  gloves: '🧤',
}
function packIcon(item) {
  const t = String(item).toLowerCase()
  for (const key in PACK_ICONS) if (t.includes(key)) return PACK_ICONS[key]
  return '🎒'
}

function CrowdBar({ level }) {
  const cfg = CROWD[String(level).toLowerCase()]
  if (!cfg) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      <div style={{ width: 280, maxWidth: '60%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)' }}>
        <div style={{ width: cfg.w, height: '100%', borderRadius: 3, background: cfg.c }} />
      </div>
      <span style={{ fontSize: 11, textTransform: 'capitalize', color: 'rgba(255,255,255,0.7)' }}>
        {level}
      </span>
    </div>
  )
}

function Chips({ items, withIcon }) {
  if (!items?.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          style={{
            fontSize: 12,
            padding: '6px 12px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          {withIcon ? `${packIcon(item)} ${item}` : item}
        </span>
      ))}
    </div>
  )
}

const SEASONS_STYLES = `
  .seasons-module { max-width: 900px; margin: 0 auto; padding: 40px 48px 64px; }
  @media (max-width: 900px) { .seasons-module { padding: 32px 24px 56px; } }
  @media (max-width: 560px) { .seasons-module { padding: 28px 16px 48px; } }

  .season-timeline { display: flex; gap: 4px; margin-bottom: 28px; }
  .season-timeline > span { flex: 1; text-align: center; padding: 9px 4px; border-radius: 8px; font-size: 12px; }
  @media (max-width: 560px) {
    .season-timeline { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .season-timeline::-webkit-scrollbar { display: none; }
    .season-timeline { scrollbar-width: none; }
    .season-timeline > span { flex: 0 0 auto; min-width: 46px; }
  }

  .seasons-list { display: flex; flex-direction: column; gap: 16px; }
  .season-card { border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
  .season-head { display: block; width: 100%; height: 220px; position: relative; border: none; padding: 0; cursor: pointer; text-align: left; color: #fff; background: ${GRADIENT}; }
`

// Reads a season value (string description, or a future object with rich fields).
function readSeason(value) {
  const isObject = value && typeof value === 'object'
  return {
    temp: isObject ? value.temp : undefined,
    crowd: isObject ? value.crowd : undefined,
    events: isObject ? value.events : undefined,
    packing: isObject ? value.packing : undefined,
    special: isObject ? value.special ?? value.description : typeof value === 'string' ? value : undefined,
  }
}

const SeasonCard = memo(function SeasonCard({ location, def, expanded, onToggle }) {
  const [url, setUrl] = useState(null)
  const query = `${location.name} ${def.label}`

  useEffect(() => {
    let alive = true
    fetchPexelsImage(query).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [query])

  const { temp, crowd, events, packing, special } = readSeason(location.seasons[def.key])
  const bodyId = `season-body-${def.key}`
  // First two paragraphs of the special text.
  const paragraphs = special ? String(special).split(/\n{2,}/).slice(0, 2) : []

  return (
    <div className="season-card">
      <button
        className="season-head"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={bodyId}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: url ? `url(${url}) center/cover` : GRADIENT,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(4,8,18,0.92) 0%, rgba(4,8,18,0.25) 55%, rgba(4,8,18,0.1) 100%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, fontWeight: 300 }}>
              {def.label} {def.icon}
            </span>
            <span
              aria-hidden="true"
              style={{
                fontSize: 18,
                opacity: 0.7,
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              ⌄
            </span>
          </span>
          {temp != null && (
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{temp}</span>
          )}
          {crowd && <CrowdBar level={crowd} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={bodyId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '20px 24px 24px' }}>
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : '12px 0 0',
                    fontStyle: 'italic',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: 680,
                  }}
                >
                  {p}
                </p>
              ))}
              <Chips items={events} />
              <Chips items={packing} withIcon />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// SeasonsModule — walking through the year. Dataset-only (location.seasons +
// location.bestSeason); no AI/API. One season expanded at a time.
function SeasonsModule({ location }) {
  const [expanded, setExpanded] = useState(null)

  const seasonList = useMemo(
    () => SEASON_DEFS.filter((d) => location.seasons?.[d.key]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.id]
  )
  const highlighted = useMemo(
    () => parseBestMonths(location.bestSeason),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.id]
  )

  if (!location.seasons || Object.keys(location.seasons).length === 0) {
    return (
      <div className="seasons-module" style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Seasonal information coming soon.
        </p>
      </div>
    )
  }

  return (
    <div className="seasons-module">
      <style>{SEASONS_STYLES}</style>

      <div className="season-timeline">
        {MONTHS.map((month, i) => {
          const on = highlighted.has(i)
          return (
            <span
              key={month}
              style={{
                background: on ? '#7dd3fc' : 'rgba(255,255,255,0.06)',
                color: on ? 'rgba(4,8,18,0.92)' : 'rgba(255,255,255,0.55)',
                fontWeight: on ? 600 : 400,
              }}
            >
              {month}
            </span>
          )
        })}
      </div>

      <div className="seasons-list">
        {seasonList.map((def) => (
          <SeasonCard
            key={def.key}
            location={location}
            def={def}
            expanded={expanded === def.key}
            onToggle={() => setExpanded((prev) => (prev === def.key ? null : def.key))}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(SeasonsModule)
