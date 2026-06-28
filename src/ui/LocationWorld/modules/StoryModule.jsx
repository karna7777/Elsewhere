import { memo } from 'react'
import { useTransition, animated } from '@react-spring/web'
import ModuleWrapper from './shared/ModuleWrapper'

// Defined once at module scope (not rebuilt every render). The dataset stores
// experiences as full sentences, so we map sentence keywords onto these buckets.
const experienceIconMap = {
  trekking: '🥾',
  photography: '📷',
  coffee: '☕',
  history: '🏛️',
  food: '🍽️',
  wildlife: '🦌',
  sunrise: '🌅',
  temple: '🛕',
  market: '🛍️',
}

const KEYWORDS = [
  ['trekking', ['trek', 'hike', 'hiking', 'trail', 'climb', 'summit', 'walk']],
  ['photography', ['photo', 'photograph', 'camera']],
  ['coffee', ['coffee', 'tea ', 'teahouse', 'espresso', 'cafe', 'matcha']],
  ['history', ['history', 'ancient', 'heritage', 'ruin', 'castle', 'fort', 'palace', 'old town']],
  ['food', ['food', 'dinner', 'dining', 'taste', 'tasting', 'kaiseki', 'cuisine', 'sweet', 'cooking', 'eat']],
  ['wildlife', ['wildlife', 'safari', 'animal', 'bird', 'whale', 'jungle']],
  ['sunrise', ['sunrise', 'sunset', 'dawn', 'golden hour']],
  ['temple', ['temple', 'shrine', 'monk', 'meditation', 'zen', 'zazen', 'spiritual']],
  ['market', ['market', 'bazaar', 'souk', 'shopping']],
]

function iconFor(text) {
  const t = ` ${String(text).toLowerCase()} `
  for (const [bucket, words] of KEYWORDS) {
    if (words.some((w) => t.includes(w))) return experienceIconMap[bucket]
  }
  return '✨'
}

const DROP_CAP_CSS = `
  .story-narrative::first-letter {
    font-size: 4em;
    float: left;
    line-height: 0.8;
    padding-right: 8px;
    color: #7dd3fc;
    font-weight: 300;
  }
`

function Chip({ label, active, interactive, small, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      style={{
        fontSize: small ? 12 : 14,
        padding: small ? '8px 16px' : '10px 20px',
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

// StoryModule — arriving somewhere for the first time, not a Wikipedia article.
// Every section is data-driven and omitted entirely when its data is absent.
// selectedMood is owned by LocationWorld and passed in (future Explore filtering).
function StoryModule({ location, selectedMood, setSelectedMood }) {
  // Hooks must run unconditionally — derive everything from an optional location.
  const expItems = location?.experiences ?? []
  const transitions = useTransition(
    expItems.map((e, i) => ({ e, i })),
    {
      keys: (x) => x.i,
      from: { opacity: 0, transform: 'translateY(16px)' },
      enter: { opacity: 1, transform: 'translateY(0px)' },
      trail: 70,
      config: { tension: 280, friction: 26 },
    }
  )

  if (!location) return null

  const { story, moods, travelStyle, ambience } = location

  const hasAmbience =
    ambience && (ambience.soundscape?.length > 0 || ambience.musicStyle || ambience.weatherMood)

  return (
    <div style={{ paddingBottom: 64 }}>
      {/* Opening narrative */}
      {story && (
        <ModuleWrapper>
          <style>{DROP_CAP_CSS}</style>
          <p
            className="story-narrative"
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.82)',
              maxWidth: 680,
            }}
          >
            {story}
          </p>
        </ModuleWrapper>
      )}

      {/* Experiences */}
      {expItems.length > 0 && (
        <ModuleWrapper title="What Awaits You" icon="✨">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 14,
            }}
          >
            {transitions((style, { e }) => (
              <animated.div
                style={{
                  ...style,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '16px 20px',
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{iconFor(e)}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.82)' }}>
                  {e}
                </span>
              </animated.div>
            ))}
          </div>
        </ModuleWrapper>
      )}

      {/* Moods */}
      {moods?.length > 0 && (
        <ModuleWrapper title="This Place Feels Like">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
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
        </ModuleWrapper>
      )}

      {/* Travel Style */}
      {travelStyle?.length > 0 && (
        <ModuleWrapper title="Perfect For">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {travelStyle.map((s) => (
              <Chip key={s} label={s} small />
            ))}
          </div>
        </ModuleWrapper>
      )}

      {/* Ambience */}
      {hasAmbience && (
        <ModuleWrapper title="The Feeling of Being There">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ambience.soundscape?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ambience.soundscape.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 12,
                      padding: '6px 14px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {ambience.musicStyle && (
              <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.78)' }}>
                🎵 <em>{ambience.musicStyle}</em>
              </p>
            )}
            {ambience.weatherMood && (
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                }}
              >
                {ambience.weatherMood}
              </p>
            )}
          </div>
        </ModuleWrapper>
      )}
    </div>
  )
}

export default memo(StoryModule)
