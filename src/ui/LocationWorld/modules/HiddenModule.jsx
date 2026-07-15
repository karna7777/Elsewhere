import { memo, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../../store/useStore'
import { resolveNode } from '../../../data/NodeResolver.js'
import { fetchPexelsImage } from '../../../utils/imageCache.js'

const EASE = [0.16, 1, 0.3, 1]
const GRADIENT = 'linear-gradient(135deg, #08111f, #11223c, #0d3555)'

const HIDDEN_STYLES = `
  .hidden-root { max-width: var(--content-max, 1280px); margin: 0 auto; padding: 56px 48px 96px; }
  @media (max-width: 560px) { .hidden-root { padding: 34px 20px 64px; } }

  .hidden-eyebrow {
    margin: 0 0 12px; font-size: var(--fs-eyebrow); font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; color: #e8c07a; opacity: 0.9;
  }
  .hidden-heading {
    margin: 0 0 10px; font-family: var(--font-display); font-weight: 400;
    font-size: var(--fs-section); line-height: 1.05; letter-spacing: -0.02em; color: #fff;
  }
  .hidden-caption { margin: 0 0 40px; font-size: var(--fs-body); line-height: 1.5; color: rgba(255,255,255,0.55); }

  .hidden-list { display: flex; flex-direction: column; gap: 28px; }

  /* Image-first card: a big cinematic photo with the secret revealed over it.
     It is a real <button> (drills into the gem), so reset the native chrome. */
  .gem-card {
    position: relative; overflow: hidden; border-radius: 24px;
    min-height: 420px; display: flex; align-items: flex-end;
    width: 100%; text-align: left; color: inherit; font: inherit; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.09); padding: 0;
    box-shadow: 0 34px 80px -36px rgba(0,0,0,0.88);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease;
  }
  .gem-card:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
  @media (max-width: 560px) { .gem-card { min-height: 300px; } }
  .gem-card:hover { transform: translateY(-4px); border-color: rgba(232,192,122,0.4); }
  .gem-img {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
  }
  .gem-card:hover .gem-img { transform: scale(1.06); }
  .gem-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(4,7,14,0.94) 0%, rgba(4,7,14,0.5) 42%, rgba(4,7,14,0.05) 100%);
  }
  .gem-body {
    position: relative; padding: 38px 40px; width: 100%;
    display: flex; flex-direction: column; gap: 12px;
  }
  @media (max-width: 560px) { .gem-body { padding: 26px 24px; } }
  .gem-pin { font-size: var(--fs-eyebrow); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #e8c07a; }
  .gem-name { margin: 0; font-family: var(--font-display); font-size: 34px; line-height: 1.08; letter-spacing: -0.01em; color: #fff; }
  @media (max-width: 560px) { .gem-name { font-size: 26px; } }
  .gem-desc { margin: 0; max-width: 680px; font-size: var(--fs-body); line-height: 1.6; color: rgba(255,255,255,0.85); }
  .gem-tip {
    margin: 6px 0 0; display: inline-flex; align-items: baseline; gap: 10px; align-self: flex-start;
    padding: 13px 20px; border-radius: 14px; max-width: 680px;
    background: rgba(232,192,122,0.12); border: 1px solid rgba(232,192,122,0.28);
    font-size: var(--fs-meta); line-height: 1.55; font-style: italic; color: #f4d79a;
  }
  .gem-explore {
    margin-top: 4px; font-size: var(--fs-meta); font-weight: 600; letter-spacing: 0.04em;
    color: var(--gold); display: inline-flex; align-items: center; gap: 8px;
  }
  .gem-explore span { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .gem-card:hover .gem-explore span { transform: translateX(4px); }
`

// One hidden-gem card: a real place with its own image, description and the
// insider tip, laid over the photo like a cinematic postcard. Loads its image
// through the cache (never Pexels direct).
const GemCard = memo(function GemCard({ gem, index, onSelect }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    let alive = true
    const query = gem?.imageQuery ?? gem?.name
    if (query) fetchPexelsImage(query).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [gem?.imageQuery, gem?.name])

  return (
    <motion.button
      type="button"
      className="gem-card"
      aria-label={`Explore ${gem.name}`}
      onClick={() => onSelect?.(gem)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
    >
      <div className="gem-img" style={{ background: url ? `url(${url}) center/cover` : GRADIENT }} aria-hidden="true" />
      <div className="gem-scrim" aria-hidden="true" />
      <div className="gem-body">
        <span className="gem-pin">📍 Hidden</span>
        <h3 className="gem-name">{gem.name}</h3>
        {gem.description && <p className="gem-desc">{gem.description}</p>}
        {gem.tip && (
          <p className="gem-tip">
            <span aria-hidden="true">💡</span>
            <span>{gem.tip}</span>
          </p>
        )}
        <span className="gem-explore">
          Explore <span aria-hidden="true">→</span>
        </span>
      </div>
    </motion.button>
  )
})

// HiddenModule — the "Hidden" tab. Renders the composed hidden gems as cinematic
// image-first cards. Data-only (location.hiddenGems); the tab only appears when
// gems exist.
function HiddenModule({ location }) {
  const pushLevel = useStore((s) => s.pushLevel)
  const gems = location?.hiddenGems ?? []

  // Drill into a gem — the same recursive-navigation contract Explore used, so
  // moving the drill-in here changes nothing about how the camera/level system
  // resolves it (Hidden is now the single home for gems).
  const handleSelect = useCallback(
    (gem) => {
      pushLevel(resolveNode({ ...gem, type: gem.type ?? 'sublocation', parentId: location.id }))
    },
    [pushLevel, location]
  )

  if (!gems.length) return null

  return (
    <div className="hidden-root">
      <style>{HIDDEN_STYLES}</style>
      <p className="hidden-eyebrow">Only the locals know</p>
      <h2 className="hidden-heading">Hidden local secrets</h2>
      <p className="hidden-caption">Lesser-known corners worth seeking out.</p>
      <div className="hidden-list">
        {gems.map((gem, i) => (
          <GemCard key={gem.name ?? i} gem={gem} index={i} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  )
}

export default memo(HiddenModule)
