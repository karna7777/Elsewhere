import { memo, useEffect, useState } from 'react'
import Chapter from '../chapters/Chapter'
import { EditorialSplit } from '../chapters/editorial'
import { fetchPexelsImage } from '../../../utils/imageCache.js'

// A real photo of the place for the editorial split. Prefer a direct Commons URL
// from the visual journey; otherwise resolve one through the image cache. State is
// only set from the async callback (tagged with its id) so a stale fetch from a
// previous place is never shown.
function useStoryImage(location) {
  const first = location?.visualJourney?.[0]
  const directUrl = first?.url ?? null
  const [fetched, setFetched] = useState(null)
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

function Chip({ label, active, interactive, small, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      style={{
        fontSize: small ? 'var(--fs-tag)' : 'var(--fs-body)',
        padding: small ? '10px 20px' : '12px 24px',
        borderRadius: 30,
        cursor: interactive ? 'pointer' : 'default',
        background: active ? 'rgba(232,192,122,0.16)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`,
        color: active ? 'var(--gold-bright)' : 'rgba(255,255,255,0.85)',
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

// StoryModule — the "Story" chapter, reframed as "A sense of place": the sensory
// character of the destination (its ambience, sound and mood), not its facts (that
// is Atmosphere) or its narrative (that is Why This Place Matters). Rebuilt in the
// editorial language. Kept at this path so LocationWorld's lazy import is unchanged.
function StoryModule({ location, selectedMood, setSelectedMood }) {
  const img = useStoryImage(location)
  if (!location) return null

  const { moods, travelStyle, ambience } = location
  const hasAmbience =
    ambience && (ambience.soundscape?.length > 0 || ambience.musicStyle || ambience.weatherMood)
  const hasCharacter = moods?.length > 0 || travelStyle?.length > 0
  if (!img && !hasCharacter && !hasAmbience) return null

  return (
    <Chapter id="story" kicker="The feeling of being there" title="A sense of place">
      <style>{`
        .story-mood-line { margin: 0 0 22px; font-family: var(--font-display); font-weight: 300;
          font-size: clamp(22px, 2.4vw, 32px); line-height: 1.45; color: rgba(255,255,255,0.92); font-style: italic; }
        .story-sound { display: flex; flex-direction: column; gap: 2px; margin: 0 0 20px; }
        .story-sound-item { display: flex; align-items: baseline; gap: 12px; padding: 8px 0;
          border-top: 1px solid rgba(255,255,255,0.08); font-size: var(--fs-body); color: rgba(255,255,255,0.78); }
        .story-sound-item:first-child { border-top: none; }
        .story-sound-note { color: var(--gold); }
        .story-music { margin: 0; font-size: var(--fs-body); color: rgba(255,255,255,0.72); }
        .story-character { max-width: var(--content-max); margin: clamp(56px,7vw,96px) auto 0; padding: 0 48px;
          display: flex; flex-direction: column; gap: 40px; }
        @media (max-width: 560px) { .story-character { padding: 0 20px; } }
        .story-label { margin: 0 0 16px; font-size: var(--fs-eyebrow); font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold); }
        .story-chip-row { display: flex; flex-wrap: wrap; gap: 12px; }
      `}</style>

      {(img || hasAmbience) && (
        <EditorialSplit url={img} query={`${location.name} atmosphere`} caption={location.name}>
          {ambience?.weatherMood && <p className="story-mood-line">{ambience.weatherMood}</p>}
          {ambience?.soundscape?.length > 0 && (
            <div className="story-sound">
              {ambience.soundscape.map((s) => (
                <span className="story-sound-item" key={s}>
                  <span className="story-sound-note" aria-hidden="true">♪</span>
                  {s}
                </span>
              ))}
            </div>
          )}
          {ambience?.musicStyle && (
            <p className="story-music">
              🎵 <em>{ambience.musicStyle}</em>
            </p>
          )}
        </EditorialSplit>
      )}

      {hasCharacter && (
        <div className="story-character">
          {moods?.length > 0 && (
            <div>
              <p className="story-label">This place feels like</p>
              <div className="story-chip-row">
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
            <div>
              <p className="story-label">Perfect for</p>
              <div className="story-chip-row">
                {travelStyle.map((s) => (
                  <Chip key={s} label={s} small />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Chapter>
  )
}

export default memo(StoryModule)
