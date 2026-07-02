import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../store/useStore'

// Persistent companion strip (12C-B). Always mounted near LocationWorld's root,
// outside the module router, so it never remounts when modules change. It
// subscribes to ONE store field (lastEllieSuggestion) and renders nothing until
// Ellie has produced a successful reply — so it never rerenders during streaming
// (that updates ellieStreamText, not this) and never blocks page rendering.
//
// Layout: fixed bottom bar. In globe mode it spans full width (left:0); when the
// location panel is open it insets to 22vw so it sits flush under the 78vw panel.
// Offset comes from the globe/sidebar state already in LocationWorld — no DOM
// measurement. Clicking anywhere opens the Ellie module (no routing).
//
// Motion (Part 2): the container fades in ONCE — because the component returns
// null while empty, the motion.div only mounts on the empty→populated transition
// and persists across later text changes, so `initial` never replays. Each new
// suggestion crossfades the middle text only (AnimatePresence, initial={false}),
// while the container stays still. Only opacity/transform animate — never blur,
// height, width, left or right.

const EASE = [0.16, 1, 0.3, 1]

const STRIP_CSS = `
  .ai-strip {
    padding: 0 20px;
    outline: none;
  }
  .ai-strip:focus-visible {
    outline: 2px solid rgba(125,211,252,0.5);
    outline-offset: -2px;
  }
  .ai-strip-hl {
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.065);
    opacity: 0; transition: opacity 180ms ease;
    pointer-events: none;
  }
  .ai-strip:hover .ai-strip-hl { opacity: 1; }
  .ai-strip-cta { transition: color 180ms ease; }
  .ai-strip:hover .ai-strip-cta { color: #fff; }
  .ai-strip-arrow {
    display: inline-block;
    transition: transform 180ms ease;
    will-change: transform;
  }
  .ai-strip:hover .ai-strip-arrow { transform: translateX(2px); }
  .ai-strip-text { max-width: 420px; }
  @media (max-width: 1024px) {
    .ai-strip { padding: 0 14px; }
    .ai-strip-text { max-width: 320px; }
  }
  @media (max-width: 640px) {
    .ai-strip-text { max-width: 220px; }
    .ai-strip-label { display: none; }
  }
`

// Single-line, ellipsised text — shared by the overlapping crossfade spans.
const TEXT_STYLE = {
  position: 'absolute',
  left: 0,
  right: 0,
  margin: 0,
  fontSize: 12,
  fontWeight: 300,
  lineHeight: '18px',
  color: 'rgba(255,255,255,0.55)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

function AIStrip({ setActiveModule, isGlobeMode }) {
  const suggestion = useStore((s) => s.lastEllieSuggestion)

  // Empty state: nothing mounted at all (no hidden container, no zero-opacity shell).
  if (!suggestion) return null

  const open = () => setActiveModule?.('ellie')

  return (
    <motion.div
      className="ai-strip"
      role="button"
      tabIndex={0}
      aria-label="Open Ellie"
      title="Open Ellie"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      // Entrance: plays once on the empty→populated mount, never on text change.
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: isGlobeMode ? 0 : '22vw',
        right: 0,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(4,8,18,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        zIndex: 40, // above the page/location panel (30), below dialogs
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <style>{STRIP_CSS}</style>
      <div className="ai-strip-hl" />

      {/* Left: gradient star */}
      <span
        aria-hidden="true"
        style={{
          position: 'relative',
          fontSize: 20,
          lineHeight: 1,
          flexShrink: 0,
          background: 'linear-gradient(180deg, #a855f7, #3b82f6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        ✦
      </span>

      {/* "Ellie:" label — hidden on mobile (<640) */}
      <span
        className="ai-strip-label"
        style={{
          position: 'relative',
          flexShrink: 0,
          fontSize: 12,
          color: '#7dd3fc',
          letterSpacing: '0.02em',
        }}
      >
        Ellie:
      </span>

      {/* Middle: latest suggestion. Only this crossfades. The two spans overlap
          (absolute) inside a fixed-height box so the container never reflows. */}
      <div
        className="ai-strip-text"
        style={{
          position: 'relative',
          flex: 1,
          minWidth: 0,
          height: 18,
        }}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={suggestion}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={TEXT_STYLE}
          >
            {suggestion}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Right: call to action, pinned right */}
      <span
        className="ai-strip-cta"
        style={{
          position: 'relative',
          flexShrink: 0,
          marginLeft: 'auto',
          fontSize: 12,
          fontWeight: 300,
          color: '#7dd3fc',
        }}
      >
        Ask Ellie <span className="ai-strip-arrow">→</span>
      </span>
    </motion.div>
  )
}

// AIStrip surfaces the latest Ellie line with live travel context.
// Do not add API-driven content here.
export default memo(AIStrip)
