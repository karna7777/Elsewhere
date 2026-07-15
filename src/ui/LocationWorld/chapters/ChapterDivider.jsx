import { memo } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const VIEWPORT = { once: true, margin: '0px 0px -20% 0px' }

// The shared divider stylesheet — mounted ONCE by LocationWorld (like
// EditorialStyles) so the eight dividers don't each duplicate it.
export const ChapterDividerStyles = memo(function ChapterDividerStyles() {
  return (
    <style>{`
      .jdiv {
        min-height: 72vh; display: flex; align-items: center; justify-content: center;
        text-align: center; padding: 0 48px; position: relative;
      }
      /* Minor chapters get a more compact arrival beat, for rhythm. */
      .jdiv--minor { min-height: 46vh; }
      @media (max-width: 560px) { .jdiv { min-height: 58vh; padding: 0 20px; } .jdiv--minor { min-height: 40vh; } }
      .jdiv-inner { max-width: 880px; }
      .jdiv-eyebrow {
        margin: 0 0 28px; display: inline-flex; align-items: center; gap: 14px;
        font-family: var(--font-body); font-size: var(--fs-eyebrow); font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.3em; color: var(--gold);
      }
      .jdiv-dot { opacity: 0.5; }
      .jdiv-progress { color: rgba(255,255,255,0.4); letter-spacing: 0.18em; }
      .jdiv-title {
        margin: 0; font-family: var(--font-display); font-weight: 400;
        font-size: clamp(40px, 6vw, 86px); line-height: 1.04; letter-spacing: -0.02em; color: #fff;
      }
      .jdiv--minor .jdiv-title { font-size: clamp(30px, 4.2vw, 58px); }
      .jdiv-rule {
        width: 96px; height: 1px; margin: 34px auto 0; transform-origin: center;
        background: linear-gradient(90deg, transparent, var(--gold), transparent);
      }
      .jdiv-sub {
        margin: 26px 0 0; font-family: var(--font-display); font-style: italic;
        font-size: clamp(17px, 1.9vw, 22px); line-height: 1.5; color: rgba(255,255,255,0.55);
      }
    `}</style>
  )
})

// ChapterDivider — the cinematic title card that opens each chapter: a quiet ink
// "arrival" beat between the loud image chapters. Announces the chapter number
// and name with a gold rule that draws in, and carries the `data-journey` anchor
// the Journey Map scrolls to.
function ChapterDivider({ id, roman, index, total, title, subtitle, weight = 'major' }) {
  return (
    <section
      id={`journey-${id}`}
      data-journey={id}
      className={`jdiv${weight === 'minor' ? ' jdiv--minor' : ''}`}
    >
      <div className="jdiv-inner">
        <motion.p
          className="jdiv-eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Chapter {roman}
          <span className="jdiv-dot" aria-hidden="true">·</span>
          <span className="jdiv-progress">{index} / {total}</span>
        </motion.p>
        <motion.h2
          className="jdiv-title"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="jdiv-rule"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          aria-hidden="true"
        />
        {subtitle && (
          <motion.p
            className="jdiv-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default memo(ChapterDivider)
