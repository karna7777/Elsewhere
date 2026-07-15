import { memo } from 'react'

// JourneyMap — the destination's chapter index, replacing the old scroll-spy tab
// rail. It always shows where you are (a Roman-numeral progress badge + the
// active chapter's name) and lets you travel to any cinematic chapter. Labels
// stay hidden until hover/active so it reads as a quiet map, not a menu.
function JourneyMap({ chapters, activeId, onJump }) {
  if (!chapters?.length) return null
  const active = chapters.find((c) => c.id === activeId) ?? chapters[0]

  return (
    <nav className="jmap" aria-label="Chapters">
      <style>{`
        .jmap {
          position: absolute; right: 22px; top: 50%; transform: translateY(-50%);
          z-index: 20; display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
          pointer-events: none;
        }
        .jmap-badge {
          pointer-events: auto; display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px;
          font-family: var(--font-display); color: var(--gold);
        }
        .jmap-badge b { font-size: 21px; font-weight: 400; line-height: 1; }
        .jmap-badge span { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.12em; }
        .jmap-list { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; pointer-events: auto; }
        .jmap-item {
          display: flex; align-items: center; gap: 12px; justify-content: flex-end;
          background: none; border: none; cursor: pointer; padding: 7px 0; color: inherit;
        }
        .jmap-label {
          font-size: 13px; letter-spacing: 0.01em; color: rgba(255,255,255,0.55); white-space: nowrap;
          opacity: 0; transform: translateX(6px);
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .jmap-item:hover .jmap-label,
        .jmap-item[data-active="true"] .jmap-label { opacity: 1; transform: translateX(0); }
        .jmap-item[data-active="true"] .jmap-label { color: #fff; }
        .jmap-tick {
          width: 22px; height: 2px; border-radius: 2px; flex-shrink: 0;
          background: rgba(255,255,255,0.25); transition: background 0.3s ease, width 0.3s ease;
        }
        .jmap-item:hover .jmap-tick { background: rgba(255,255,255,0.55); }
        .jmap-item[data-active="true"] .jmap-tick { background: var(--gold); width: 34px; }
        .jmap-item:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; border-radius: 6px; }
        @media (max-width: 640px) { .jmap { display: none; } }
      `}</style>

      <div className="jmap-badge" aria-hidden="true">
        <b>{active.roman}</b>
        <span>/ {chapters.length}</span>
      </div>

      <div className="jmap-list">
        {chapters.map((c) => (
          <button
            key={c.id}
            type="button"
            className="jmap-item"
            data-active={c.id === activeId}
            aria-current={c.id === activeId ? 'true' : undefined}
            aria-label={`Chapter ${c.roman}: ${c.title}`}
            onClick={() => onJump(c.id)}
          >
            <span className="jmap-label">{c.title}</span>
            <span className="jmap-tick" aria-hidden="true" />
          </button>
        ))}
      </div>
    </nav>
  )
}

export default memo(JourneyMap)
