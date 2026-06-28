import { memo, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const MONTHS_FULL = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]
const MONTHS_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Festival month (first one named in `when`) → season → chip colour.
function monthIndexOf(when) {
  if (!when) return -1
  const t = String(when).toLowerCase()
  for (let i = 0; i < 12; i++) if (t.includes(MONTHS_FULL[i])) return i
  return -1
}
function seasonColor(monthIdx) {
  if (monthIdx < 0) return 'rgba(255,255,255,0.25)'
  if (monthIdx >= 2 && monthIdx <= 4) return '#10b981' // spring
  if (monthIdx >= 5 && monthIdx <= 7) return '#f59e0b' // summer
  if (monthIdx >= 8 && monthIdx <= 10) return '#f97316' // autumn
  return '#60a5fa' // winter
}

const TRADITION_ICONS = {
  temple: '⛩️', shrine: '⛩️', dance: '💃', tea: '🍵', music: '🎵',
  market: '🛍️', craft: '🧵', festival: '🎉', ceremony: '🎎', tattoo: '🪡',
}
function traditionIcon(name) {
  const t = String(name).toLowerCase()
  for (const key in TRADITION_ICONS) if (t.includes(key)) return TRADITION_ICONS[key]
  return '🌏'
}

const CULTURE_STYLES = `
  .culture-module { max-width: 900px; margin: 0 auto; padding: 40px 48px 64px; display: flex; flex-direction: column; gap: 48px; }
  @media (max-width: 900px) { .culture-module { padding: 32px 24px 56px; } }
  @media (max-width: 560px) { .culture-module { padding: 28px 16px 48px; gap: 40px; } }

  .culture-title { margin: 0 0 20px; font-size: 22px; font-weight: 600; color: #fff; }
  .culture-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  @media (max-width: 560px) { .culture-grid-2 { grid-template-columns: 1fr; } }

  .culture-table { width: 100%; border-collapse: collapse; }
  .culture-table th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.4); padding: 8px 12px; }
  .culture-table td { padding: 10px 12px; font-size: 13px; color: rgba(255,255,255,0.8); vertical-align: middle; }
`

function SectionTitle({ children }) {
  return <h3 className="culture-title">{children}</h3>
}

// ── Etiquette chip lists ─────────────────────────────────────────────────────
function EtiquetteList({ items, mark, color, bg }) {
  if (!items?.length) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          style={{
            display: 'flex',
            gap: 8,
            fontSize: 13,
            lineHeight: 1.5,
            padding: '10px 14px',
            borderRadius: 10,
            background: bg,
            border: `1px solid ${color}33`,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          <span style={{ color, flexShrink: 0 }}>{mark}</span>
          <span>{item}</span>
        </span>
      ))}
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (insecure context) — no-op.
    }
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy phrase"
      style={{
        cursor: 'pointer',
        fontSize: 11,
        padding: '4px 10px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.15)',
        background: copied ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.06)',
        color: copied ? '#10b981' : 'rgba(255,255,255,0.7)',
      }}
    >
      {copied ? '✓' : 'Copy'}
    </button>
  )
}

// CultureModule — premium cultural explorer. Dataset-only (location.culture);
// no AI/API. Renders only populated sections; empty ones collapse.
function CultureModule({ location }) {
  const culture = location.culture

  const history = useMemo(() => culture?.history ?? [], [location.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const traditions = useMemo(() => culture?.traditions ?? [], [location.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const festivals = useMemo(() => {
    const list = (culture?.festivals ?? []).map((f) => ({ ...f, _mi: monthIndexOf(f.when) }))
    return list.sort((a, b) => (a._mi < 0 ? 99 : a._mi) - (b._mi < 0 ? 99 : b._mi))
  }, [location.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!culture) {
    return (
      <div className="culture-module" style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Cultural information coming soon.
        </p>
      </div>
    )
  }

  // Etiquette: support a structured {do,dont} shape; otherwise a flat array.
  const etq = culture.etiquette
  const doList = culture.do ?? culture.dos ?? (etq && !Array.isArray(etq) ? etq.do ?? etq.dos : null)
  const dontList =
    culture.dont ?? culture.donts ?? (etq && !Array.isArray(etq) ? etq.dont ?? etq.donts : null)
  const flatEtiquette = Array.isArray(etq) ? etq : null
  const hasDoDont = (doList?.length ?? 0) > 0 || (dontList?.length ?? 0) > 0

  const dress = culture.dresscode
  const phrases = culture.phrases

  return (
    <div className="culture-module">
      <style>{CULTURE_STYLES}</style>

      {/* 1 — HISTORY TIMELINE */}
      {history.length > 0 && (
        <section>
          <SectionTitle>History</SectionTitle>
          <div style={{ position: 'relative', paddingLeft: 22 }}>
            <span
              aria-hidden="true"
              style={{ position: 'absolute', left: 3, top: 4, bottom: 4, width: 2, background: 'rgba(255,255,255,0.15)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {history.map((ev, i) => (
                <motion.div
                  key={`${ev.year ?? i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.1 }}
                  style={{ position: 'relative' }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: -22,
                      top: 5,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#7dd3fc',
                    }}
                  />
                  {ev.year != null && (
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#7dd3fc' }}>{ev.year}</div>
                  )}
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                    {ev.description ?? ev.event ?? ev.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2 — TRADITIONS */}
      {traditions.length > 0 && (
        <section>
          <SectionTitle>Traditions</SectionTitle>
          <div className="culture-grid-2">
            {traditions.map((t, i) => (
              <motion.div
                key={t.name ?? i}
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
                style={{
                  padding: '16px 18px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{traditionIcon(t.name)}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                {t.description && (
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {t.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 3 — FESTIVALS */}
      {festivals.length > 0 && (
        <section>
          <SectionTitle>Festivals</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {festivals.map((f, i) => {
              const color = seasonColor(f._mi)
              const chip = f._mi >= 0 ? MONTHS_ABBR[f._mi] : f.when ?? '—'
              const crowdTip = f.crowdTip ?? f.crowd ?? f.tip
              return (
                <div
                  key={f.name ?? i}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 999,
                        background: `${color}22`,
                        color,
                        border: `1px solid ${color}55`,
                      }}
                    >
                      {chip}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{f.name}</span>
                  </div>
                  {f.description && (
                    <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      {f.description}
                    </p>
                  )}
                  {crowdTip && (
                    <p style={{ margin: '6px 0 0', fontSize: 12, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
                      {crowdTip}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 4 — ETIQUETTE */}
      {(hasDoDont || flatEtiquette?.length) && (
        <section>
          <SectionTitle>Etiquette</SectionTitle>
          {hasDoDont ? (
            <div className="culture-grid-2">
              {doList?.length > 0 && (
                <div>
                  <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: '#10b981' }}>Do</h4>
                  <EtiquetteList items={doList} mark="✓" color="#10b981" bg="rgba(16,185,129,0.10)" />
                </div>
              )}
              {dontList?.length > 0 && (
                <div>
                  <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: '#ef4444' }}>Don't</h4>
                  <EtiquetteList items={dontList} mark="✗" color="#ef4444" bg="rgba(239,68,68,0.10)" />
                </div>
              )}
            </div>
          ) : (
            <EtiquetteList items={flatEtiquette} mark="✓" color="#7dd3fc" bg="rgba(255,255,255,0.04)" />
          )}
        </section>
      )}

      {/* 5 — DRESS CODE */}
      {dress && (dress.wear?.length || dress.avoid?.length) && (
        <section>
          <SectionTitle>Dress Code</SectionTitle>
          <div className="culture-grid-2">
            {dress.wear?.length > 0 && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#10b981' }}>Wear</h4>
                {[].concat(dress.wear).map((w, i) => (
                  <p key={i} style={{ margin: i ? '6px 0 0' : 0, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{w}</p>
                ))}
              </div>
            )}
            {dress.avoid?.length > 0 && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#ef4444' }}>Avoid</h4>
                {[].concat(dress.avoid).map((a, i) => (
                  <p key={i} style={{ margin: i ? '6px 0 0' : 0, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{a}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6 — LANGUAGE BASICS */}
      {phrases?.length > 0 && (
        <section>
          <SectionTitle>Language Basics</SectionTitle>
          <table className="culture-table">
            <thead>
              <tr>
                <th>Phrase</th>
                <th>Pronunciation</th>
                <th>Meaning</th>
                <th aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {phrases.map((p, i) => (
                <tr key={`${p.phrase ?? i}`} style={{ background: i % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)' }}>
                  <td style={{ fontWeight: 500, color: '#fff' }}>{p.phrase}</td>
                  <td style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>{p.pronunciation}</td>
                  <td>{p.meaning}</td>
                  <td style={{ textAlign: 'right' }}>
                    <CopyButton text={p.phrase} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}

export default memo(CultureModule)
