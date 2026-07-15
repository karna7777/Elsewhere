import { memo } from 'react'
import ModuleWrapper from './ModuleWrapper'

// Shown in place of the story while the AI Composer runs in the background, so the
// section reads as intentional ("we're writing this") rather than empty. Uses the
// same ModuleWrapper shell as the real story, so the shimmer and the story that
// replaces it occupy the exact same space — the swap feels like a fade, not a jump.
const SHIMMER_CSS = `
  @keyframes els-shimmer { 0% { background-position: -180% 0 } 100% { background-position: 180% 0 } }
  @keyframes els-spark { 0%,100% { opacity: 0.5; transform: scale(1) } 50% { opacity: 1; transform: scale(1.15) } }
  .compose-line {
    height: 15px;
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.11) 37%, rgba(255,255,255,0.04) 63%);
    background-size: 180% 100%;
    animation: els-shimmer 1.6s ease-in-out infinite;
  }
  .compose-spark { display: inline-block; animation: els-spark 1.6s ease-in-out infinite; }
`

function ComposingShimmer({ label = 'Crafting your story' }) {
  return (
    <ModuleWrapper>
      <style>{SHIMMER_CSS}</style>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 22,
          color: '#e8c07a',
          fontSize: 14,
          letterSpacing: '0.04em',
        }}
      >
        <span className="compose-spark" aria-hidden="true">
          ✨
        </span>
        <span>{label}…</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, maxWidth: 680 }} aria-hidden="true">
        {['92%', '98%', '86%', '95%', '73%'].map((w, i) => (
          <div key={i} className="compose-line" style={{ width: w }} />
        ))}
      </div>
    </ModuleWrapper>
  )
}

export default memo(ComposingShimmer)
