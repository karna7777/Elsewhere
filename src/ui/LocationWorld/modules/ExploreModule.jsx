import { memo, useCallback } from 'react'
import useStore from '../../../store/useStore'
import { resolveNode } from '../../../data/NodeResolver.js'
import Chapter from '../chapters/Chapter'
import { EditorialSplit, Reveal } from '../chapters/editorial'

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

const STYLES = `
  .explore-flow { display: flex; flex-direction: column; gap: clamp(76px, 9vw, 128px); margin-top: clamp(40px, 5vw, 68px); }

  .explore-block { max-width: var(--content-max); margin: 0 auto; padding: 0 48px; width: 100%; box-sizing: border-box; }
  @media (max-width: 560px) { .explore-block { padding: 0 20px; } }

  .explore-wonders { display: flex; flex-direction: column; gap: clamp(72px, 9vw, 128px); }
  .explore-kicker { margin: 0 0 12px; font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.16em; color: var(--gold); }
  .explore-wonder-title { margin: 0 0 18px; font-family: var(--font-display); font-weight: 400;
    font-size: clamp(28px, 3.4vw, 48px); line-height: 1.06; letter-spacing: -0.015em; color: #fff; }
  .explore-prose { margin: 0 0 24px; font-size: var(--fs-body); line-height: 1.7; color: rgba(255,255,255,0.8); }
  .explore-more { display: inline-flex; align-items: center; gap: 9px; background: none; border: none; padding: 0;
    cursor: pointer; font: inherit; font-size: var(--fs-meta); font-weight: 600; letter-spacing: 0.04em; color: var(--gold); }
  .explore-more span { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .explore-more:hover span { transform: translateX(4px); }
  .explore-more:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 6px; }

  .explore-h { margin: 0 0 clamp(20px, 2.5vw, 32px); font-family: var(--font-display); font-weight: 400;
    font-size: clamp(26px, 3vw, 42px); line-height: 1.05; letter-spacing: -0.02em; color: #fff; }

  /* Adventures — a calm editorial list, no rating strings or badges. */
  .adv-list { display: flex; flex-direction: column; }
  .adv-row { display: flex; align-items: center; gap: 22px; width: 100%; text-align: left; color: inherit;
    cursor: pointer; background: none; border: none; border-top: 1px solid rgba(255,255,255,0.09);
    padding: clamp(20px, 2.4vw, 28px) 0; }
  .adv-row:first-child { border-top: none; }
  .adv-icon { flex-shrink: 0; font-size: 26px; line-height: 1; width: 34px; text-align: center; }
  .adv-name { flex: 1; min-width: 0; font-family: var(--font-display); font-size: clamp(20px, 2.1vw, 28px);
    line-height: 1.15; color: #fff; }
  .adv-diff { flex-shrink: 0; font-size: var(--fs-meta); text-transform: uppercase; letter-spacing: 0.12em; color: var(--gold); }
  .adv-arrow { flex-shrink: 0; color: var(--gold); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .adv-row:hover .adv-arrow { transform: translateX(4px); }
  .adv-row:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 8px; }
`

// ExploreModule — the recursive exploration entry point, rebuilt in the editorial
// language. Iconic wonders become cinematic splits; adventures a calm list. The
// drill contracts are UNCHANGED: every card still routes through
// resolveNode → pushLevel, which the recursive camera system already flies on.
function ExploreModule({ activeLocation }) {
  const pushLevel = useStore((s) => s.pushLevel)
  const loc = activeLocation

  const wonders = loc?.wonders ?? []
  const adventures = loc?.adventures ?? []

  const openWonder = useCallback(
    (w) => pushLevel(resolveNode({ ...w, type: w.type ?? 'landmark', parentId: loc?.id })),
    [pushLevel, loc]
  )
  const openAdventure = useCallback(
    (a) => pushLevel(resolveNode({ ...a, type: a.type ?? 'sublocation', parentId: loc?.id })),
    [pushLevel, loc]
  )

  if (!loc || (!wonders.length && !adventures.length)) return null

  return (
    <Chapter
      id="explore"
      kicker="What not to miss"
      title="Iconic wonders"
      lead="The landmarks and adventures that define the place — each one a doorway to explore further."
    >
      <style>{STYLES}</style>

      <div className="explore-flow">
        {wonders.length > 0 && (
          <div className="explore-wonders">
            {wonders.map((w, i) => (
              <EditorialSplit
                key={w.name ?? i}
                flip={i % 2 === 1}
                query={w.imageQuery ?? w.images?.[0] ?? `${w.name} ${loc.name}`}
                caption={w.name}
              >
                <p className="explore-kicker">Landmark</p>
                <h3 className="explore-wonder-title">{w.name}</h3>
                {w.description && <p className="explore-prose">{w.description}</p>}
                <button type="button" className="explore-more" onClick={() => openWonder(w)}>
                  Explore {w.name} <span aria-hidden="true">→</span>
                </button>
              </EditorialSplit>
            ))}
          </div>
        )}

        {adventures.length > 0 && (
          <section className="explore-block">
            <h3 className="explore-h">Adventures</h3>
            <Reveal className="adv-list">
              {adventures.map((a, i) => (
                <button
                  key={a.name ?? i}
                  type="button"
                  className="adv-row"
                  aria-label={`Explore ${a.name}`}
                  onClick={() => openAdventure(a)}
                >
                  <span className="adv-icon" aria-hidden="true">{activityIcon(a)}</span>
                  <span className="adv-name">{a.name}</span>
                  {a.difficulty && <span className="adv-diff">{a.difficulty}</span>}
                  <span className="adv-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </Reveal>
          </section>
        )}
      </div>
    </Chapter>
  )
}

export default memo(ExploreModule)
