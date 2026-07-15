import { memo } from 'react'

// ChapterRail — a slim, glassy scroll-spy that replaces the tab bar. It floats at
// the right edge of the panel: a column of ticks, one per chapter, the active one
// lit gold with its label shown. Hovering any tick reveals its label; clicking
// jumps (smooth-scroll) to that chapter. Presentational — the active id and the
// jump handler are owned by LocationWorld.
function ChapterRail({ chapters, activeId, onJump }) {
  if (!chapters?.length) return null

  return (
    <nav aria-label="Chapters" className="lw-rail">
      <style>{`
        .lw-rail {
          position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
          z-index: 18; display: flex; flex-direction: column; gap: 4px;
          padding: 10px 8px; border-radius: 999px;
        }
        @media (max-width: 720px) { .lw-rail { display: none; } }
        .lw-rail-item {
          display: flex; align-items: center; justify-content: flex-end; gap: 12px;
          background: none; border: none; cursor: pointer; padding: 7px 4px;
          color: rgba(255,255,255,0.5);
        }
        .lw-rail-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
          white-space: nowrap; opacity: 0; transform: translateX(6px);
          transition: opacity 0.25s ease, transform 0.25s ease, color 0.25s ease;
        }
        .lw-rail-tick {
          flex-shrink: 0; width: 26px; height: 2px; border-radius: 2px;
          background: rgba(255,255,255,0.28);
          transition: background 0.3s ease, width 0.3s ease;
        }
        .lw-rail-item:hover .lw-rail-label { opacity: 0.85; transform: translateX(0); }
        .lw-rail-item:hover .lw-rail-tick { background: rgba(255,255,255,0.6); }
        .lw-rail-item[data-active="true"] .lw-rail-label {
          opacity: 1; transform: translateX(0); color: var(--gold-bright);
        }
        .lw-rail-item[data-active="true"] .lw-rail-tick {
          background: var(--gold); width: 36px;
          box-shadow: 0 0 12px var(--gold-line);
        }
        .lw-rail-item:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 6px; }
      `}</style>

      {chapters.map((c) => {
        const active = c.id === activeId
        return (
          <button
            key={c.id}
            type="button"
            className="lw-rail-item"
            data-active={active}
            aria-current={active ? 'true' : undefined}
            onClick={() => onJump?.(c.id)}
          >
            <span className="lw-rail-label">{c.label}</span>
            <span className="lw-rail-tick" aria-hidden="true" />
          </button>
        )
      })}
    </nav>
  )
}

export default memo(ChapterRail)
