import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTransition, animated } from '@react-spring/web'
import { fetchPexelsImage } from '../../../utils/imageCache.js'
import ComposingShimmer from './shared/ComposingShimmer'

const EASE = [0.16, 1, 0.3, 1]

// Defined once at module scope (not rebuilt every render). The dataset stores
// experiences as full sentences, so we map sentence keywords onto these themed
// buckets — each carries an icon, a human category label and an accent colour so
// every experience card gets an honest identity (derived, never invented data).
const EXPERIENCE_THEMES = {
  trekking: { icon: '🥾', label: 'Adventure', color: '#34d399' },
  photography: { icon: '📷', label: 'Photography', color: '#60a5fa' },
  coffee: { icon: '☕', label: 'Slow moments', color: '#d6a06a' },
  history: { icon: '🏛️', label: 'History', color: '#c9a35a' },
  food: { icon: '🍽️', label: 'Food', color: '#f59e0b' },
  wildlife: { icon: '🦌', label: 'Wildlife', color: '#4ade80' },
  sunrise: { icon: '🌅', label: 'Golden hour', color: '#fb923c' },
  temple: { icon: '🛕', label: 'Sacred', color: '#a78bfa' },
  market: { icon: '🛍️', label: 'Local life', color: '#f472b6' },
  default: { icon: '✨', label: 'Experience', color: '#7dd3fc' },
}

const KEYWORDS = [
  ['trekking', ['trek', 'hike', 'hiking', 'trail', 'climb', 'summit', 'walk']],
  ['photography', ['photo', 'photograph', 'camera', 'sparkle', 'view', 'skyline', 'panorama']],
  ['coffee', ['coffee', 'tea ', 'teahouse', 'espresso', 'cafe', 'matcha', 'wine', 'picnic']],
  ['history', ['history', 'ancient', 'heritage', 'ruin', 'castle', 'fort', 'palace', 'old town', 'museum', 'louvre']],
  ['food', ['food', 'dinner', 'dining', 'taste', 'tasting', 'kaiseki', 'cuisine', 'sweet', 'cooking', 'eat']],
  ['wildlife', ['wildlife', 'safari', 'animal', 'bird', 'whale', 'jungle']],
  ['sunrise', ['sunrise', 'sunset', 'dawn', 'golden hour', 'after dark', 'night']],
  ['temple', ['temple', 'shrine', 'monk', 'meditation', 'zen', 'zazen', 'spiritual', 'cathedral']],
  ['market', ['market', 'bazaar', 'souk', 'shopping', 'quays', 'street']],
]

function themeFor(text) {
  const t = ` ${String(text).toLowerCase()} `
  for (const [bucket, words] of KEYWORDS) {
    if (words.some((w) => t.includes(w))) return EXPERIENCE_THEMES[bucket]
  }
  return EXPERIENCE_THEMES.default
}

// One editorial stylesheet. Everything reads from the panel type-scale tokens so
// the hierarchy is exaggerated and consistent: eyebrow → section → card → body →
// meta. Each section is a distinct "room": prose, photo band, facts, cards.
const STORY_STYLES = `
  .story-root { padding-bottom: 96px; }

  /* Section shell — an uppercase eyebrow above a large serif heading. Generous
     vertical padding gives ~100px of breathing room between major sections. */
  .story-section { max-width: var(--content-max, 1280px); margin: 0 auto; padding: 52px 48px; }
  @media (max-width: 560px) { .story-section { padding: 34px 20px; } }

  .story-eyebrow {
    margin: 0 0 12px; font-family: var(--font-body);
    font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.18em; color: #7dd3fc; opacity: 0.9;
  }
  .story-heading {
    margin: 0 0 34px; font-family: var(--font-display); font-weight: 400;
    font-size: var(--fs-section); line-height: 1.05; letter-spacing: -0.02em;
    color: #fff;
  }

  /* Opening lede — the biggest body voice, serif, with a drop cap. Kept to a
     comfortable reading measure (Apple-article width), not full column width. */
  .story-lede {
    margin: 0; max-width: 820px;
    font-family: var(--font-display);
    font-size: 30px; font-weight: 300; line-height: 1.7;
    color: rgba(255,255,255,0.95);
  }
  .story-lede::first-letter {
    font-size: 3.7em; float: left; line-height: 0.8;
    padding: 8px 16px 0 0; color: #7dd3fc; font-weight: 400;
    font-family: var(--font-display);
  }
  @media (max-width: 560px) { .story-lede { font-size: 23px; line-height: 1.7; } }

  /* Cinematic photo band — a wide image with a soft caption, breaks up the text. */
  .story-band {
    position: relative; overflow: hidden; border-radius: 20px;
    aspect-ratio: 21 / 9; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8);
  }
  @media (max-width: 560px) { .story-band { aspect-ratio: 4 / 3; border-radius: 16px; } }
  .story-band img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transform: scale(1.02); transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
  }
  .story-band:hover img { transform: scale(1.08); }
  .story-band-cap {
    position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 28px;
    background: linear-gradient(to top, rgba(5,8,16,0.85), transparent);
    color: #fff; pointer-events: none;
  }
  .story-band-kicker {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.16em; color: #7dd3fc;
  }
  .story-band-title {
    margin-top: 8px; font-family: var(--font-display); font-size: 28px;
    line-height: 1.18; color: #fff; max-width: 720px;
  }

  /* Image-beside-facts split (magazine style). */
  .story-split { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: center; }
  @media (max-width: 720px) { .story-split { grid-template-columns: 1fr; gap: 24px; } }
  .story-media {
    position: relative; overflow: hidden; border-radius: 18px;
    aspect-ratio: 4 / 3; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 24px 60px -32px rgba(0,0,0,0.8);
  }
  .story-media img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .story-media:hover img { transform: scale(1.06); }
  .story-facts { display: flex; flex-direction: column; }
  .story-fact {
    display: flex; align-items: baseline; gap: 18px;
    padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.09);
  }
  .story-fact:first-of-type { border-top: none; padding-top: 0; }
  .story-fact-label {
    flex: 0 0 92px; font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.14em; color: rgba(255,255,255,0.42);
  }
  .story-fact-value { font-size: var(--fs-body); line-height: 1.5; color: rgba(255,255,255,0.94); }

  /* Experience cards — full-width, image-free, but full of personality. */
  .exp-list { display: flex; flex-direction: column; gap: 18px; }
  .exp-card {
    position: relative; display: flex; align-items: center; gap: 26px;
    padding: 28px 32px; border-radius: 22px; overflow: hidden;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    box-shadow: 0 18px 44px -34px rgba(0,0,0,0.75);
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, background 0.35s ease;
  }
  .exp-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.065); }
  .exp-icon {
    flex-shrink: 0; width: 74px; height: 74px; border-radius: 20px;
    display: flex; align-items: center; justify-content: center; font-size: 34px;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .exp-card:hover .exp-icon { transform: scale(1.08) rotate(-3deg); }
  .exp-body { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
  .exp-cat {
    font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.13em;
  }
  .exp-title {
    margin: 0; font-size: var(--fs-card); font-weight: 500; line-height: 1.3;
    color: rgba(255,255,255,0.96); letter-spacing: -0.01em;
  }
  .exp-index {
    position: absolute; right: 28px; top: 50%; transform: translateY(-50%);
    font-family: var(--font-display); font-size: 66px; font-weight: 300;
    line-height: 1; color: rgba(255,255,255,0.06); pointer-events: none;
    transition: color 0.35s ease;
  }
  @media (max-width: 560px) { .exp-index { display: none; } }

  /* Character block — moods, travel style and ambience packed tightly so the
     page breathes with rhythm instead of dead space. */
  .char-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 44px; }
  @media (max-width: 760px) { .char-grid { grid-template-columns: 1fr; gap: 34px; } }
  .char-label {
    margin: 0 0 12px; font-size: var(--fs-eyebrow); font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.45);
  }
  .char-block + .char-block { margin-top: 26px; }
  .chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
  .sound-line {
    display: flex; align-items: baseline; gap: 12px; padding: 9px 0;
    border-top: 1px solid rgba(255,255,255,0.07); font-size: var(--fs-body);
    line-height: 1.5; color: rgba(255,255,255,0.8);
  }
  .sound-line:first-of-type { border-top: none; }
  .sound-mood {
    margin: 14px 0 0; font-size: var(--fs-body); font-style: italic;
    line-height: 1.65; color: rgba(255,255,255,0.66);
  }
`

// Reveal — a section that fades/slides in as it scrolls into view (scroll rhythm).
function Reveal({ children, className = 'story-section', delay = 0 }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.section>
  )
}

function SectionHead({ eyebrow, title }) {
  return (
    <>
      {eyebrow && <p className="story-eyebrow">{eyebrow}</p>}
      {title && <h2 className="story-heading">{title}</h2>}
    </>
  )
}

function Chip({ label, active, interactive, small, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      style={{
        fontSize: small ? 'var(--fs-tag)' : 'var(--fs-body)',
        padding: small ? '9px 18px' : '11px 22px',
        borderRadius: 30,
        cursor: interactive ? 'pointer' : 'default',
        background: active ? 'rgba(125,211,252,0.16)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${active ? '#7dd3fc' : 'rgba(255,255,255,0.12)'}`,
        color: active ? '#7dd3fc' : 'rgba(255,255,255,0.85)',
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

// One experience, rendered as a card with a themed icon, a category eyebrow, a
// real title and a faint editorial ordinal. Hover lifts the card and tints it.
function ExperienceCard({ text, index }) {
  const theme = themeFor(text)
  return (
    <animated.article
      className="exp-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.color}66`
        const idx = e.currentTarget.querySelector('.exp-index')
        if (idx) idx.style.color = `${theme.color}33`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        const idx = e.currentTarget.querySelector('.exp-index')
        if (idx) idx.style.color = 'rgba(255,255,255,0.06)'
      }}
    >
      <div
        className="exp-icon"
        style={{ background: `${theme.color}1f`, border: `1px solid ${theme.color}40` }}
        aria-hidden="true"
      >
        {theme.icon}
      </div>
      <div className="exp-body">
        <span className="exp-cat" style={{ color: theme.color }}>{theme.label}</span>
        <h3 className="exp-title">{text}</h3>
      </div>
      <span className="exp-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </animated.article>
  )
}

// A real photo of the place for the editorial split: prefer a direct Commons URL
// from the visual journey, otherwise resolve one through the image cache. State is
// only ever set from the async callback (tagged with the id it belongs to), so a
// stale fetch from a previous place is never shown and no setState fires in-effect.
function useStoryImage(location) {
  const first = location?.visualJourney?.[0]
  const directUrl = first?.url ?? null
  const [fetched, setFetched] = useState(null) // { id, url }
  useEffect(() => {
    if (directUrl) return undefined
    let alive = true
    const id = location?.id
    const query = first?.imageQuery ?? location?.heroMedia?.imageQuery ?? location?.name
    if (query) fetchPexelsImage(query).then((u) => alive && setFetched({ id, url: u }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id])
  return directUrl ?? (fetched?.id === location?.id ? fetched.url : null)
}

// The wide cinematic band deeper in the story. Picks a later visual-journey frame
// so it doesn't repeat the editorial-split photo, and resolves its own image.
function useBandImage(location, journey) {
  const item = journey?.[1] ?? journey?.[0] ?? null
  const directUrl = item?.url ?? null
  const [fetched, setFetched] = useState(null) // { id, url }
  useEffect(() => {
    if (directUrl) return undefined
    let alive = true
    const id = location?.id
    const query = item?.imageQuery ?? null
    if (query) fetchPexelsImage(query).then((u) => alive && setFetched({ id, url: u }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id])
  const url = directUrl ?? (fetched?.id === location?.id ? fetched.url : null)
  return url ? { url, title: item?.title, description: item?.description } : null
}

// The factual "At a glance" points paired with the image — only rows with data.
function glanceFacts(location) {
  const rows = []
  const where = [location.state, location.country].filter(Boolean).join(', ')
  if (where) rows.push(['Where', where])
  if (location.bestSeason) rows.push(['Best time', location.bestSeason])
  const w = location.weather
  if (w?.current) {
    const temp = w.temperature != null ? ` · ${Math.round(w.temperature)}°` : ''
    rows.push(['Right now', `${w.current}${temp}`])
  }
  if (location.timezone) rows.push(['Local time', location.timezone])
  if (location.moods?.length) rows.push(['Feels like', location.moods.slice(0, 3).join(' · ')])
  return rows
}

// StoryModule — arriving somewhere for the first time, not a Wikipedia article.
// Each section is a distinct "room" (prose → facts → photo → experiences →
// character), data-driven and omitted entirely when its data is absent.
// selectedMood is owned by LocationWorld and passed in (future Explore filtering).
function StoryModule({ location, selectedMood, setSelectedMood }) {
  // Hooks must run unconditionally — derive everything from an optional location.
  const expItems = location?.experiences ?? []
  const transitions = useTransition(
    expItems.map((e, i) => ({ e, i })),
    {
      keys: (x) => x.i,
      from: { opacity: 0, transform: 'translateY(18px)' },
      enter: { opacity: 1, transform: 'translateY(0px)' },
      trail: 80,
      config: { tension: 280, friction: 26 },
    }
  )
  const storyImg = useStoryImage(location)
  const band = useBandImage(location, location?.visualJourney)

  if (!location) return null

  const { story, moods, travelStyle, ambience } = location

  // A searched place opens here while the AI Composer is still running: show the
  // shimmer in the story's place until the real story arrives and fades in.
  const composing = !story && location.aiStatus === 'pending'

  const facts = glanceFacts(location)
  // The editorial split only earns its space when there's an image AND a couple
  // of facts to sit beside it.
  const showSplit = !!storyImg && facts.length >= 2

  const hasAmbience =
    ambience && (ambience.soundscape?.length > 0 || ambience.musicStyle || ambience.weatherMood)
  const hasCharacter = moods?.length > 0 || travelStyle?.length > 0 || hasAmbience

  return (
    <div className="story-root">
      <style>{STORY_STYLES}</style>

      {/* Opening narrative — shimmer while composing, then the real story fades in */}
      {composing && (
        <div className="story-section">
          <ComposingShimmer />
        </div>
      )}
      {story && (
        <Reveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="story-lede"
          >
            {story}
          </motion.p>
        </Reveal>
      )}

      {/* Editorial split — a real photo beside the at-a-glance facts */}
      {showSplit && (
        <Reveal>
          <div className="story-split">
            <div className="story-media">
              <img src={storyImg} alt={location.name} loading="lazy" />
            </div>
            <div className="story-facts">
              {facts.map(([label, value]) => (
                <div className="story-fact" key={label}>
                  <span className="story-fact-label">{label}</span>
                  <span className="story-fact-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Experiences — the centrepiece: premium, personality-rich cards */}
      {expItems.length > 0 && (
        <Reveal>
          <SectionHead eyebrow="What awaits you" title="Moments to live here" />
          <div className="exp-list">
            {transitions((style, { e, i }) => (
              <animated.div style={style}>
                <ExperienceCard text={e} index={i} />
              </animated.div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Cinematic photo band — a wide breath of imagery between the cards and
          the closing character block. Photo-driven, not text-driven. */}
      {band && (
        <Reveal>
          <div className="story-band">
            <img src={band.url} alt={band.title || location.name} loading="lazy" />
            <div className="story-band-cap">
              <div className="story-band-kicker">{location.name}</div>
              {(band.title || band.description) && (
                <div className="story-band-title">{band.description || band.title}</div>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {/* Character — moods, travel style and ambience in one tight, breathing room */}
      {hasCharacter && (
        <Reveal>
          <SectionHead eyebrow="The character" title="How this place feels" />
          <div className="char-grid">
            <div>
              {moods?.length > 0 && (
                <div className="char-block">
                  <p className="char-label">This place feels like</p>
                  <div className="chip-row">
                    {moods.map((m) => (
                      <Chip
                        key={m}
                        label={m}
                        interactive
                        active={m === selectedMood}
                        onClick={() => setSelectedMood?.(m === selectedMood ? null : m)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {travelStyle?.length > 0 && (
                <div className="char-block">
                  <p className="char-label">Perfect for</p>
                  <div className="chip-row">
                    {travelStyle.map((s) => (
                      <Chip key={s} label={s} small />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {hasAmbience && (
              <div>
                {ambience.soundscape?.length > 0 && (
                  <div className="char-block">
                    <p className="char-label">The sound of being here</p>
                    <div>
                      {ambience.soundscape.map((s) => (
                        <div className="sound-line" key={s}>
                          <span aria-hidden="true" style={{ color: '#7dd3fc' }}>♪</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {ambience.musicStyle && (
                  <p className="sound-mood" style={{ fontStyle: 'normal' }}>
                    🎵 <em>{ambience.musicStyle}</em>
                  </p>
                )}
                {ambience.weatherMood && <p className="sound-mood">{ambience.weatherMood}</p>}
              </div>
            )}
          </div>
        </Reveal>
      )}
    </div>
  )
}

export default memo(StoryModule)
