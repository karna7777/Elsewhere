import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPexelsImage } from '../../../utils/imageCache.js'

// ─────────────────────────────────────────────────────────────────────────────
// The Editorial Design Language — one shared vocabulary every chapter is composed
// from, so the whole destination reads as a single premium travel magazine:
// full-bleed cinematic imagery, alternating splits, generous measure, a warm gold
// accent, and quiet expensive motion. Photography leads; text supports.
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1]

// Resolve one real photo through the existing image cache (never Pexels direct).
// A direct URL (Commons) wins; otherwise the query resolves one. Stale results
// from a previous query are ignored.
export function useChapterImage(query, directUrl) {
  const [url, setUrl] = useState(directUrl ?? null)
  useEffect(() => {
    if (directUrl) {
      setUrl(directUrl)
      return undefined
    }
    if (!query) return undefined
    let alive = true
    fetchPexelsImage(query).then((u) => alive && setUrl(u))
    return () => {
      alive = false
    }
  }, [query, directUrl])
  return url
}

// A slow reveal as the block scrolls into view — the house motion.
export function Reveal({ children, y = 40, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

// Narrow, comfortable reading column.
export function Prose({ children, center, className = '' }) {
  return (
    <div className={`ed-prose${center ? ' ed-prose--center' : ''} ${className}`}>{children}</div>
  )
}

// A full-bleed cinematic band — edge-to-edge photography with a slow ken-burns
// drift and an optional caption. The emotional punctuation between chapters.
export function FullBleed({ query, url: directUrl, kicker, title, caption, height = '78vh', onClick }) {
  const url = useChapterImage(query, directUrl)
  return (
    <motion.div
      className="ed-bleed"
      style={{ height, cursor: onClick ? 'zoom-in' : 'default' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE }}
      onClick={onClick}
    >
      <div className="ed-bleed-img" style={{ backgroundImage: url ? `url(${url})` : undefined }} aria-hidden="true" />
      <div className="ed-bleed-scrim" aria-hidden="true" />
      {(kicker || title || caption) && (
        <div className="ed-bleed-cap">
          {kicker && <p className="ed-bleed-kicker">{kicker}</p>}
          {title && <h3 className="ed-bleed-title">{title}</h3>}
          {caption && <p className="ed-bleed-caption">{caption}</p>}
        </div>
      )}
    </motion.div>
  )
}

// A large image beside text — the magazine workhorse. `flip` alternates the side.
export function EditorialSplit({ query, url: directUrl, flip, caption, children }) {
  const url = useChapterImage(query, directUrl)
  return (
    <Reveal className={`ed-split${flip ? ' ed-split--flip' : ''}`}>
      <div className="ed-split-media">
        <div className="ed-split-img" style={{ backgroundImage: url ? `url(${url})` : undefined }} aria-hidden="true" />
        {caption && <span className="ed-split-caption">{caption}</span>}
      </div>
      <div className="ed-split-body">{children}</div>
    </Reveal>
  )
}

// The contextual companion. A quiet gold prompt that lives inside chapters and
// hands a seeded question to Ellie (scrolls to her chapter + fires the ask event
// the Ellie module listens for). No AI-pipeline changes — just an entry point.
export const EllieNudge = memo(function EllieNudge({ label, prompt }) {
  const onClick = () => {
    const el = document.querySelector('[data-chapter="ellie"]')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.dispatchEvent(new CustomEvent('elsewhere:ask-ellie', { detail: { prompt: prompt ?? label } }))
  }
  return (
    <Reveal className="ed-nudge-wrap">
      <button type="button" className="ed-nudge" onClick={onClick}>
        <span className="ed-nudge-avatar" aria-hidden="true">✦</span>
        <span className="ed-nudge-text">{label}</span>
        <span className="ed-nudge-arrow" aria-hidden="true">→</span>
      </button>
    </Reveal>
  )
})

// One stylesheet for the whole language, mounted once by LocationWorld.
export const EditorialStyles = memo(function EditorialStyles() {
  return (
    <style>{`
      .ed-prose { max-width: var(--measure); margin: 0 auto; padding: 0 48px; }
      .ed-prose--center { text-align: center; }
      @media (max-width: 560px) { .ed-prose { padding: 0 20px; } }

      /* Full-bleed cinematic band */
      .ed-bleed { position: relative; width: 100%; overflow: hidden; }
      .ed-bleed-img {
        position: absolute; inset: -6% -2%; background-size: cover; background-position: center;
        animation: ed-kenburns 26s ease-in-out infinite alternate;
        background-color: #0b1220;
      }
      @keyframes ed-kenburns {
        from { transform: scale(1.0) translateY(0); }
        to   { transform: scale(1.09) translateY(-1.5%); }
      }
      .ed-bleed-scrim {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(4,7,14,0.92) 0%, rgba(4,7,14,0.28) 42%, rgba(4,7,14,0.04) 100%);
      }
      .ed-bleed-cap {
        position: absolute; left: 0; right: 0; bottom: 0;
        max-width: var(--content-max); margin: 0 auto; padding: 0 48px 52px;
        box-sizing: border-box;
      }
      @media (max-width: 560px) { .ed-bleed-cap { padding: 0 20px 32px; } }
      .ed-bleed-kicker {
        margin: 0 0 14px; font-size: var(--fs-eyebrow); font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.22em; color: var(--gold);
      }
      .ed-bleed-title {
        margin: 0; font-family: var(--font-display); font-weight: 400;
        font-size: clamp(32px, 4vw, 60px); line-height: 1.05; letter-spacing: -0.02em; color: #fff;
        max-width: 900px;
      }
      .ed-bleed-caption { margin: 16px 0 0; max-width: var(--measure); font-size: var(--fs-body); line-height: 1.6; color: rgba(255,255,255,0.82); }

      /* Editorial split */
      .ed-split {
        max-width: var(--content-max); margin: 0 auto; padding: 0 48px;
        display: grid; grid-template-columns: 1.35fr 0.85fr; gap: 60px; align-items: center;
      }
      .ed-split--flip { direction: rtl; }
      .ed-split--flip > * { direction: ltr; }
      @media (max-width: 820px) { .ed-split { grid-template-columns: 1fr; gap: 28px; padding: 0 20px; } }
      .ed-split-media {
        position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 4 / 3;
        border: 1px solid rgba(255,255,255,0.09); box-shadow: 0 34px 80px -40px rgba(0,0,0,0.85);
      }
      .ed-split-img {
        position: absolute; inset: 0; background-size: cover; background-position: center;
        background-color: #0b1220; transition: transform 1s cubic-bezier(0.16,1,0.3,1);
      }
      .ed-split-media:hover .ed-split-img { transform: scale(1.06); }
      .ed-split-caption {
        position: absolute; left: 16px; bottom: 14px; padding: 6px 12px; border-radius: 999px;
        font-size: 12px; letter-spacing: 0.04em; color: #fff;
        background: rgba(4,7,14,0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      }
      .ed-split-body { min-width: 0; }

      /* Ellie contextual nudge */
      .ed-nudge-wrap { max-width: var(--content-max); margin: 40px auto 0; padding: 0 48px; }
      @media (max-width: 560px) { .ed-nudge-wrap { padding: 0 20px; } }
      .ed-nudge {
        display: inline-flex; align-items: center; gap: 16px; cursor: pointer;
        padding: 18px 24px; border-radius: 18px; text-align: left;
        background: linear-gradient(120deg, rgba(232,192,122,0.10), rgba(232,192,122,0.04));
        border: 1px solid var(--gold-line);
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease;
      }
      .ed-nudge:hover { transform: translateY(-2px); border-color: var(--gold); background: linear-gradient(120deg, rgba(232,192,122,0.16), rgba(232,192,122,0.06)); }
      .ed-nudge:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
      .ed-nudge-avatar {
        flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; font-size: 18px;
        color: var(--gold-bright); background: rgba(232,192,122,0.14); border: 1px solid var(--gold-line);
      }
      .ed-nudge-text { font-size: var(--fs-body); font-weight: 500; color: rgba(255,255,255,0.92); line-height: 1.4; }
      .ed-nudge-arrow { color: var(--gold); font-size: 20px; flex-shrink: 0; }
    `}</style>
  )
})
