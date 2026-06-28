import { useEffect, useMemo, useState } from 'react'
import useStore from '../../../store/useStore'
import { fetchCountry } from '../../../data/countries.js'

const MONTH_LETTERS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_RE =
  /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)/gi

// Mark a Don't only on clear negative imperatives (bare "no" excluded — too noisy).
const NEGATIVE_RE =
  /\b(don'?t|never|not|avoid|refrain|restricted|forbidden|prohibited|frowned|illegal|cannot|can'?t)\b/i

function monthIndex(token) {
  const t = token.slice(0, 3).toLowerCase()
  return ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(t)
}

// Parse the free-text bestSeason into a Set of highlighted month indices.
// Handles standalone months and inclusive ranges ("March–April", "Sept–March" wraps).
function bestMonths(text) {
  const set = new Set()
  if (!text) return set
  const found = []
  let m
  MONTH_RE.lastIndex = 0
  while ((m = MONTH_RE.exec(text))) {
    found.push({ start: m.index, end: MONTH_RE.lastIndex, idx: monthIndex(m[1]) })
  }
  for (let k = 0; k < found.length; k++) {
    const cur = found[k]
    set.add(cur.idx)
    const next = found[k + 1]
    if (next) {
      const between = text.slice(cur.end, next.start).trim().toLowerCase()
      const isRange = /^([–—-]|to|until|through)$/.test(between)
      if (isRange) {
        let i = cur.idx
        for (let n = 0; n < 12; n++) {
          set.add(i)
          if (i === next.idx) break
          i = (i + 1) % 12
        }
      }
    }
  }
  return set
}

function firstSentences(text, n = 2) {
  if (!text) return ''
  const parts = text.match(/[^.!?]+[.!?]+/g)
  if (!parts) return text
  return parts.slice(0, n).join(' ').trim()
}

function classifyEtiquette(items = []) {
  const dos = []
  const donts = []
  for (const item of items) (NEGATIVE_RE.test(item) ? donts : dos).push(item)
  return { dos: dos.slice(0, 3), donts: donts.slice(0, 3) }
}

const CATEGORIES = [
  { key: 'dream', label: '⭐ Dream' },
  { key: 'upcoming', label: '📅 Upcoming' },
  { key: 'visited', label: '✓ Visited' },
]

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: '10px 12px',
      }}
    >
      <div
        style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        title={typeof value === 'string' ? value : undefined}
        style={{
          fontSize: 13,
          color: 'white',
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {value || '—'}
      </div>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'rgba(255,255,255,0.5)',
        margin: '22px 0 10px',
      }}
    >
      {children}
    </div>
  )
}

export default function OverviewTab() {
  const dest = useStore((s) => s.activeDestination)
  const addToBucketList = useStore((s) => s.addToBucketList)
  const setActiveTab = useStore((s) => s.setActiveTab)

  const [country, setCountry] = useState(null)
  const [saveOpen, setSaveOpen] = useState(false)
  const [savedCat, setSavedCat] = useState(null)

  // REST Countries metadata (population, currency, language). Fails soft to null.
  useEffect(() => {
    let alive = true
    setCountry(null)
    setSaveOpen(false)
    setSavedCat(null)
    if (dest?.country) fetchCountry(dest.country).then((c) => alive && setCountry(c))
    return () => {
      alive = false
    }
  }, [dest?.id, dest?.country])

  const months = useMemo(() => bestMonths(dest?.bestSeason), [dest?.bestSeason])
  const { dos, donts } = useMemo(
    () => classifyEtiquette(dest?.culture?.etiquette),
    [dest]
  )

  if (!dest) return null

  const currency = country?.currencies?.[0]
  const stats = [
    {
      label: 'Population',
      value: country?.population
        ? country.population.toLocaleString()
        : dest.population
          ? dest.population.toLocaleString()
          : '—',
    },
    { label: 'Best Season', value: dest.bestSeason },
    {
      label: 'Currency',
      value: currency ? `${currency.symbol || ''} ${currency.name}`.trim() : '—',
    },
    { label: 'Language', value: country?.languages?.length ? country.languages.join(', ') : '—' },
    { label: 'Budget', value: dest.budget },
    { label: 'Timezone', value: dest.timezone },
  ]

  const chip = (text, kind) => (
    <span
      key={`${kind}-${text}`}
      title={text}
      style={{
        display: 'inline-block',
        maxWidth: '100%',
        padding: '5px 11px',
        borderRadius: 14,
        fontSize: 11.5,
        lineHeight: 1.35,
        background: kind === 'do' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
        border: `1px solid ${kind === 'do' ? 'rgba(74,222,128,0.30)' : 'rgba(248,113,113,0.30)'}`,
        color: kind === 'do' ? '#86efac' : '#fca5a5',
      }}
    >
      {text}
    </span>
  )

  return (
    <div style={{ color: 'white' }}>
      {/* Stat grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}
      >
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      {/* About */}
      <SectionTitle>About</SectionTitle>
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.78)',
        }}
      >
        {firstSentences(dest.story, 2)}
      </p>

      {/* Cultural preview */}
      {(dos.length > 0 || donts.length > 0) && (
        <>
          <SectionTitle>Cultural Etiquette</SectionTitle>
          {dos.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 8 }}>
              {dos.map((t) => chip(t, 'do'))}
            </div>
          )}
          {donts.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {donts.map((t) => chip(t, 'dont'))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('culture')}
            style={{
              marginTop: 12,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#7dd3fc',
              fontSize: 12,
            }}
          >
            See Culture tab for more →
          </button>
        </>
      )}

      {/* Best time to visit */}
      <SectionTitle>Best Time To Visit</SectionTitle>
      <div style={{ display: 'flex', gap: 4 }}>
        {MONTH_LETTERS.map((letter, i) => {
          const on = months.has(i)
          return (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '7px 0',
                borderRadius: 7,
                fontSize: 11,
                fontWeight: on ? 600 : 400,
                background: on ? 'rgba(125,211,252,0.22)' : 'rgba(255,255,255,0.04)',
                color: on ? '#7dd3fc' : 'rgba(255,255,255,0.3)',
              }}
            >
              {letter}
            </div>
          )
        })}
      </div>

      {/* Save to Elsewhere List */}
      <SectionTitle>Save</SectionTitle>
      {!saveOpen ? (
        <button
          type="button"
          onClick={() => setSaveOpen(true)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 12,
            border: '1px solid rgba(125,211,252,0.35)',
            background: savedCat ? 'rgba(125,211,252,0.18)' : 'rgba(125,211,252,0.10)',
            color: '#7dd3fc',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {savedCat
            ? `Saved to ${CATEGORIES.find((c) => c.key === savedCat)?.label}`
            : 'Save to Elsewhere List'}
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                addToBucketList(dest, c.key)
                setSavedCat(c.key)
                setSaveOpen(false)
              }}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: 13,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  )
}
