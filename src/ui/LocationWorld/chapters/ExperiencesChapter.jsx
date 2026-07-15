import { memo } from 'react'
import Chapter from './Chapter'
import { EditorialSplit } from './editorial'

// Sentence keywords → a themed identity (icon, category label, gold-safe accent)
// and, where the sentence implies timing, a "best time" chip. Derived only — no
// fabricated facts.
const THEMES = [
  { key: 'photography', label: 'Photography', icon: '📷', re: /\b(photo|photograph|camera|view|viewpoint|skyline|panorama|sparkle)\b/i },
  { key: 'dawn', label: 'Golden hour', icon: '🌅', re: /\b(sunrise|dawn|first light|early morning)\b/i, time: 'Dawn · 5:20–6:30 AM' },
  { key: 'dusk', label: 'Golden hour', icon: '🌇', re: /\b(sunset|dusk|after dark|at night|evening|nightfall)\b/i, time: 'Evening · golden hour' },
  { key: 'food', label: 'Taste', icon: '🍽️', re: /\b(eat|taste|dinner|dining|cuisine|street food|matcha|tea|coffee|market)\b/i },
  { key: 'temple', label: 'Sacred', icon: '⛩️', re: /\b(temple|shrine|monk|meditation|zen|cathedral|prayer|torii)\b/i },
  { key: 'trek', label: 'On foot', icon: '🥾', re: /\b(walk|hike|trek|climb|trail|path|stroll|wander)\b/i },
  { key: 'water', label: 'By the water', icon: '🌊', re: /\b(beach|canal|river|lake|sea|boat|harbour|harbor|coast)\b/i },
  { key: 'history', label: 'History', icon: '🏛️', re: /\b(history|ancient|ruins|castle|palace|old town|heritage|museum)\b/i },
]
const DEFAULT_THEME = { key: 'moment', label: 'A moment', icon: '✨' }

function themeFor(text) {
  for (const t of THEMES) if (t.re.test(text)) return t
  return DEFAULT_THEME
}

// ExperiencesChapter — "What should you feel here?" Each experience is a cinematic
// vignette (large photo beside an editorial caption), alternating sides down the
// page — never a checklist. Image resolves from the experience itself.
function ExperiencesChapter({ location }) {
  const items = location?.experiences ?? []
  if (!items.length) return null

  return (
    <Chapter
      id="experiences"
      kicker="What you'll live here"
      title="Moments to remember"
      lead="The experiences that stay with you long after you leave."
    >
      <style>{`
        .exp-vignettes { display: flex; flex-direction: column; gap: clamp(72px, 9vw, 128px); margin-top: 12px; }
        .exp-cat { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 18px;
          font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold); }
        .exp-cat-icon { font-size: 20px; }
        .exp-title { margin: 0; font-family: var(--font-display); font-weight: 400;
          font-size: clamp(28px, 3.4vw, 48px); line-height: 1.08; letter-spacing: -0.015em; color: #fff; }
        .exp-time { margin: 22px 0 0; display: inline-flex; align-items: center; gap: 9px;
          padding: 9px 16px; border-radius: 999px; font-size: 14px; color: var(--gold-bright);
          background: rgba(232,192,122,0.10); border: 1px solid var(--gold-line); }
      `}</style>

      <div className="exp-vignettes">
        {items.map((text, i) => {
          const theme = themeFor(text)
          return (
            <EditorialSplit
              key={`${text}-${i}`}
              flip={i % 2 === 1}
              query={`${text} ${location.name}`}
              caption={theme.label}
            >
              <p className="exp-cat">
                <span className="exp-cat-icon" aria-hidden="true">{theme.icon}</span>
                {theme.label}
              </p>
              <h3 className="exp-title">{text}</h3>
              {theme.time && (
                <span className="exp-time">
                  <span aria-hidden="true">🕔</span> {theme.time}
                </span>
              )}
            </EditorialSplit>
          )
        })}
      </div>
    </Chapter>
  )
}

export default memo(ExperiencesChapter)
