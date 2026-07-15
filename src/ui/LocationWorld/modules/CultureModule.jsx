import { memo, useMemo } from 'react'
import Chapter from '../chapters/Chapter'
import { EditorialSplit, FullBleed, Reveal } from '../chapters/editorial'

// Festival month (first one named in `when`) → index, for chronological ordering
// and a short month label. Purely derived — no fabricated dates.
const MONTHS_FULL = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]
const MONTHS_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function monthIndexOf(when) {
  if (!when) return -1
  const t = String(when).toLowerCase()
  for (let i = 0; i < 12; i++) if (t.includes(MONTHS_FULL[i])) return i
  return -1
}

const STYLES = `
  .culture-flow {
    display: flex; flex-direction: column; gap: clamp(80px, 10vw, 140px);
    margin-top: clamp(44px, 6vw, 76px);
  }

  /* Padded text column, shared by the non-image sections. */
  .cult-block { max-width: var(--content-max); margin: 0 auto; padding: 0 48px; width: 100%; box-sizing: border-box; }
  @media (max-width: 560px) { .cult-block { padding: 0 20px; } }

  .cult-h {
    margin: 0 0 clamp(28px, 3.5vw, 44px); font-family: var(--font-display); font-weight: 400;
    font-size: clamp(28px, 3.2vw, 44px); line-height: 1.06; letter-spacing: -0.02em; color: #fff;
  }
  .cult-prose { margin: 0; font-size: var(--fs-body); line-height: 1.7; color: rgba(255,255,255,0.8); max-width: var(--measure); }

  /* History — big serif years beside unhurried prose (no timeline dots). */
  .cult-eras { display: flex; flex-direction: column; gap: clamp(30px, 4vw, 52px); }
  .cult-era { display: grid; grid-template-columns: 150px 1fr; gap: 32px; align-items: start; }
  @media (max-width: 640px) { .cult-era { grid-template-columns: 1fr; gap: 8px; } }
  .cult-year { font-family: var(--font-display); font-size: clamp(26px, 3vw, 40px); line-height: 1; color: var(--gold); }

  /* Traditions — heading sits above the alternating editorial splits. */
  .cult-splits { display: flex; flex-direction: column; gap: clamp(72px, 9vw, 128px); }
  .cult-split-title { margin: 0 0 16px; font-family: var(--font-display); font-weight: 400;
    font-size: clamp(26px, 3vw, 40px); line-height: 1.08; letter-spacing: -0.015em; color: #fff; }

  /* Festivals — an elegant gold calendar list. */
  .cult-fests { display: flex; flex-direction: column; }
  .cult-fest { display: grid; grid-template-columns: 150px 1fr; gap: 30px; align-items: start;
    padding: clamp(24px, 3vw, 34px) 0; border-top: 1px solid rgba(255,255,255,0.09); }
  .cult-fest:first-child { border-top: none; }
  @media (max-width: 560px) { .cult-fest { grid-template-columns: 1fr; gap: 8px; } }
  .cult-fest-month { font-family: var(--font-display); font-size: clamp(19px, 2.1vw, 26px);
    line-height: 1.15; color: var(--gold); overflow-wrap: anywhere; }
  .cult-fest-name { margin: 0 0 10px; font-family: var(--font-display); font-weight: 400;
    font-size: var(--fs-card); line-height: 1.15; color: #fff; }
  .cult-note { margin: 12px 0 0; font-size: var(--fs-meta); font-style: italic; color: rgba(255,255,255,0.5); }

  /* Etiquette / dress — quiet two-column typographic lists, gold vs muted
     markers instead of red/green boxes. */
  .cult-two { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 64px); }
  @media (max-width: 680px) { .cult-two { grid-template-columns: 1fr; gap: 40px; } }
  .cult-sub { margin: 0 0 18px; font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.16em; color: var(--gold); }
  .cult-sub--muted { color: rgba(255,255,255,0.45); }
  .cult-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .cult-list li { display: flex; gap: 14px; padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.08);
    font-size: var(--fs-body); line-height: 1.6; color: rgba(255,255,255,0.82); }
  .cult-list li:first-child { border-top: none; }
  .cult-mark { flex-shrink: 0; color: var(--gold); line-height: 1.55; }
  .cult-list--muted .cult-mark { color: rgba(255,255,255,0.4); }

  /* Phrasebook — no table, no copy buttons. */
  .cult-phrases { display: flex; flex-direction: column; max-width: 760px; }
  .cult-phrase { display: grid; grid-template-columns: 1fr auto; gap: 4px 24px; align-items: baseline;
    padding: clamp(18px, 2.4vw, 26px) 0; border-top: 1px solid rgba(255,255,255,0.09); }
  .cult-phrase:first-child { border-top: none; }
  .cult-phrase-word { font-family: var(--font-display); font-size: clamp(22px, 2.4vw, 30px); line-height: 1.1; color: #fff; }
  .cult-phrase-say { font-style: italic; font-size: var(--fs-body); color: var(--gold); text-align: right; }
  .cult-phrase-mean { grid-column: 1 / -1; margin-top: 6px; font-size: var(--fs-body); line-height: 1.5; color: rgba(255,255,255,0.6); }
`

// CultureModule — the cultural chapter, rebuilt in the shared editorial language:
// image-led, unhurried, no tables/traffic-light boxes. Dataset-only
// (location.culture); every section collapses when its data is absent.
function CultureModule({ location }) {
  const culture = location?.culture

  const history = useMemo(() => culture?.history ?? [], [location?.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const traditions = useMemo(() => culture?.traditions ?? [], [location?.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const festivals = useMemo(() => {
    const list = (culture?.festivals ?? []).map((f) => ({ ...f, _mi: monthIndexOf(f.when) }))
    return list.sort((a, b) => (a._mi < 0 ? 99 : a._mi) - (b._mi < 0 ? 99 : b._mi))
  }, [location?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!culture) return null

  // Etiquette: support a structured {do,dont} shape; otherwise a flat array.
  const etq = culture.etiquette
  const doList = culture.do ?? culture.dos ?? (etq && !Array.isArray(etq) ? etq.do ?? etq.dos : null)
  const dontList =
    culture.dont ?? culture.donts ?? (etq && !Array.isArray(etq) ? etq.dont ?? etq.donts : null)
  const flatEtiquette = Array.isArray(etq) ? etq : null
  const hasDoDont = (doList?.length ?? 0) > 0 || (dontList?.length ?? 0) > 0

  const dress = culture.dresscode
  const wear = dress?.wear ? [].concat(dress.wear) : []
  const avoid = dress?.avoid ? [].concat(dress.avoid) : []
  const hasDress = wear.length > 0 || avoid.length > 0

  const phrases = culture.phrases ?? []

  // A cinematic opener image — prefer a festival/tradition subject over a generic
  // "culture" query so the frame feels specific to the place.
  const openerQuery =
    `${festivals[0]?.name ?? traditions[0]?.name ?? 'heritage old town'} ${location.name}`.trim()

  return (
    <Chapter
      id="culture"
      kicker="The soul of the place"
      title="Culture"
      lead="History, ritual, and the small courtesies that shape everyday life here."
    >
      <style>{STYLES}</style>

      <div className="culture-flow">
        {/* Opening cinematic frame — Culture is image-led from the first beat. */}
        <FullBleed query={openerQuery} height="60vh" />

        {/* History */}
        {history.length > 0 && (
          <section className="cult-block">
            <h3 className="cult-h">Through time</h3>
            <div className="cult-eras">
              {history.map((ev, i) => (
                <Reveal className="cult-era" key={`${ev.year ?? i}`}>
                  {ev.year != null && <span className="cult-year">{ev.year}</span>}
                  <p className="cult-prose">{ev.description ?? ev.event ?? ev.text}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Traditions — alternating editorial splits with real photography */}
        {traditions.length > 0 && (
          <section>
            <div className="cult-block">
              <h3 className="cult-h">Living traditions</h3>
            </div>
            <div className="cult-splits">
              {traditions.map((t, i) => (
                <EditorialSplit
                  key={t.name ?? i}
                  flip={i % 2 === 1}
                  query={`${t.name} ${location.name}`}
                  caption={t.name}
                >
                  <h4 className="cult-split-title">{t.name}</h4>
                  {t.description && <p className="cult-prose">{t.description}</p>}
                </EditorialSplit>
              ))}
            </div>
          </section>
        )}

        {/* Festivals — a gold calendar of celebrations */}
        {festivals.length > 0 && (
          <section className="cult-block">
            <h3 className="cult-h">The year in celebration</h3>
            <div className="cult-fests">
              {festivals.map((f, i) => {
                const month = f._mi >= 0 ? MONTHS_ABBR[f._mi] : f.when ?? '—'
                const crowdTip = f.crowdTip ?? f.crowd ?? f.tip
                return (
                  <Reveal className="cult-fest" key={f.name ?? i}>
                    <span className="cult-fest-month">{month}</span>
                    <div>
                      <h4 className="cult-fest-name">{f.name}</h4>
                      {f.description && <p className="cult-prose">{f.description}</p>}
                      {crowdTip && <p className="cult-note">{crowdTip}</p>}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        )}

        {/* Etiquette — do / with care, no traffic-light colour */}
        {(hasDoDont || flatEtiquette?.length) && (
          <section className="cult-block">
            <h3 className="cult-h">Local etiquette</h3>
            {hasDoDont ? (
              <div className="cult-two">
                {doList?.length > 0 && (
                  <div>
                    <p className="cult-sub">Do</p>
                    <ul className="cult-list">
                      {doList.map((item, i) => (
                        <li key={`${item}-${i}`}>
                          <span className="cult-mark" aria-hidden="true">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dontList?.length > 0 && (
                  <div>
                    <p className="cult-sub cult-sub--muted">With care</p>
                    <ul className="cult-list cult-list--muted">
                      {dontList.map((item, i) => (
                        <li key={`${item}-${i}`}>
                          <span className="cult-mark" aria-hidden="true">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <ul className="cult-list">
                {flatEtiquette.map((item, i) => (
                  <li key={`${item}-${i}`}>
                    <span className="cult-mark" aria-hidden="true">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Dress code — what to wear / leave behind */}
        {hasDress && (
          <section className="cult-block">
            <h3 className="cult-h">What to wear</h3>
            <div className="cult-two">
              {wear.length > 0 && (
                <div>
                  <p className="cult-sub">Wear</p>
                  <ul className="cult-list">
                    {wear.map((item, i) => (
                      <li key={`${item}-${i}`}>
                        <span className="cult-mark" aria-hidden="true">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {avoid.length > 0 && (
                <div>
                  <p className="cult-sub cult-sub--muted">Leave behind</p>
                  <ul className="cult-list cult-list--muted">
                    {avoid.map((item, i) => (
                      <li key={`${item}-${i}`}>
                        <span className="cult-mark" aria-hidden="true">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Language — an editorial phrasebook, no table */}
        {phrases.length > 0 && (
          <section className="cult-block">
            <h3 className="cult-h">A few words</h3>
            <div className="cult-phrases">
              {phrases.map((p, i) => (
                <Reveal className="cult-phrase" key={`${p.phrase ?? i}`}>
                  <span className="cult-phrase-word">{p.phrase}</span>
                  {p.pronunciation && <span className="cult-phrase-say">{p.pronunciation}</span>}
                  {p.meaning && <span className="cult-phrase-mean">{p.meaning}</span>}
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </Chapter>
  )
}

export default memo(CultureModule)
