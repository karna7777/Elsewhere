import { Fragment, memo } from 'react'
import useStore from '../../../store/useStore'

// Difficulty → badge styling. Rendered only when a gem declares a difficulty;
// missing difficulty collapses the badge entirely.
const DIFFICULTY = {
  easy: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', label: 'Easy Access' },
  moderate: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', label: 'Some Effort' },
  hard: { bg: 'rgba(249,115,22,0.15)', color: '#f97316', label: 'Off the Path' },
  remote: { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6', label: 'True Explorer' },
}

function DifficultyBadge({ difficulty }) {
  const d = DIFFICULTY[String(difficulty).toLowerCase()]
  if (!d) return null
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '3px 9px',
        borderRadius: 999,
        background: d.bg,
        color: d.color,
      }}
    >
      {d.label}
    </span>
  )
}

// HiddenSecrets — intentionally image-less, to feel like privileged local
// knowledge. Presentation only: reads the gems off `location`, never resolves
// nodes, never fetches, never computes discovery. Each reveal drills down via
// pushLevel with the raw gem (per spec: no resolveNode).
function HiddenSecrets({ location }) {
  const pushLevel = useStore((s) => s.pushLevel)

  if (!location?.hiddenGems?.length) return null

  return (
    <section
      className="disc-section"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '24px 28px',
      }}
    >
      <style>{`
        .secret-reveal { transition: opacity 0.2s ease; }
        .secret-reveal:hover { opacity: 0.7; }
      `}</style>

      <h2 className="disc-title">Hidden Local Secrets</h2>
      <p className="disc-sub" style={{ marginBottom: 20 }}>
        What the locals know
      </p>

      {location.hiddenGems.map((gem, i) => {
        const tip = gem.tips?.[0] ?? gem.insiderTips?.[0] ?? gem.tip ?? null
        return (
          <Fragment key={gem.name ?? i}>
            {i > 0 && <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '18px 0' }} />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>{gem.name}</span>
                <DifficultyBadge difficulty={gem.difficulty} />
              </div>

              {gem.description && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {gem.description}
                </p>
              )}

              {tip && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1.5,
                  }}
                >
                  {tip}
                </p>
              )}

              <button
                type="button"
                className="secret-reveal"
                aria-label={`Reveal more about ${gem.name}`}
                onClick={() => pushLevel({ ...gem, type: 'sublocation', parent: location.id })}
                style={{
                  alignSelf: 'flex-end',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 11,
                  color: '#e8c07a',
                  letterSpacing: '0.04em',
                }}
              >
                Reveal more →
              </button>
            </div>
          </Fragment>
        )
      })}
    </section>
  )
}

export default memo(HiddenSecrets)
