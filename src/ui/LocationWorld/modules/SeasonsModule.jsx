import { memo, useMemo } from 'react'
import Chapter from '../chapters/Chapter'
import { FullBleed, Reveal } from '../chapters/editorial'

// Season order + an image-query hint so each frame reads unmistakably seasonal.
const SEASON_DEFS = [
  { key: 'spring', label: 'Spring', hint: 'spring blossom' },
  { key: 'summer', label: 'Summer', hint: 'summer' },
  { key: 'autumn', label: 'Autumn', hint: 'autumn foliage' },
  { key: 'winter', label: 'Winter', hint: 'winter snow' },
]

// Crowd level → a human phrase (never a meter bar).
const CROWD_PHRASE = {
  low: 'Quiet — you may have it to yourself',
  medium: 'Comfortable — rarely crowded',
  high: 'Lively and popular',
  peak: 'Peak season — book well ahead',
}

const STYLES = `
  .season-flow { display: flex; flex-direction: column; gap: clamp(64px, 8vw, 112px); margin-top: clamp(40px, 5vw, 68px); }

  .season-best { max-width: var(--content-max); margin: 0 auto; padding: 0 48px; width: 100%; box-sizing: border-box; }
  @media (max-width: 560px) { .season-best { padding: 0 20px; } }
  .season-best p { margin: 0; font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.16em; color: var(--gold); }
  .season-best span { color: rgba(255,255,255,0.6); font-weight: 500; text-transform: none; letter-spacing: 0.02em; }

  .season { display: flex; flex-direction: column; }
  .season-copy { max-width: var(--content-max); margin: 0 auto; padding: 28px 48px 0; width: 100%; box-sizing: border-box; }
  @media (max-width: 560px) { .season-copy { padding: 22px 20px 0; } }
  .season-para { margin: 0 0 16px; max-width: var(--measure); font-size: var(--fs-body); line-height: 1.7; color: rgba(255,255,255,0.8); }
  .season-para:last-of-type { margin-bottom: 0; }

  .season-facts { margin: 26px 0 0; display: flex; flex-direction: column; gap: 12px; max-width: var(--measure); }
  .season-fact { display: flex; gap: 14px; font-size: var(--fs-body); line-height: 1.55; color: rgba(255,255,255,0.72); }
  .season-fact-label { flex-shrink: 0; min-width: 108px; font-size: var(--fs-meta); font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em; color: var(--gold); padding-top: 3px; }
`

// Reads a season value (string description, or an object with rich fields).
function readSeason(value) {
  const isObject = value && typeof value === 'object'
  return {
    temp: isObject ? value.temp : undefined,
    crowd: isObject ? value.crowd : undefined,
    events: isObject ? value.events : undefined,
    packing: isObject ? value.packing : undefined,
    special: isObject ? value.special ?? value.description : typeof value === 'string' ? value : undefined,
  }
}

// SeasonsModule — "walking through the year." Each season is a cinematic frame
// with atmospheric copy; crowd/packing fold into quiet captions, never meters or
// pill rows. Dataset-only (location.seasons + location.bestSeason).
function SeasonsModule({ location }) {
  const seasons = useMemo(
    () => SEASON_DEFS.filter((d) => location.seasons?.[d.key]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location?.id]
  )

  if (!location.seasons || !seasons.length) return null

  return (
    <Chapter
      id="seasons"
      kicker="When to come"
      title="The year here"
      lead="Every season tells the place differently. Here is how it changes through the year."
    >
      <style>{STYLES}</style>

      <div className="season-flow">
        {location.bestSeason && (
          <div className="season-best">
            <p>
              Best time · <span>{location.bestSeason}</span>
            </p>
          </div>
        )}

        {seasons.map((def) => {
          const { temp, crowd, events, packing, special } = readSeason(location.seasons[def.key])
          const paragraphs = special ? String(special).split(/\n{2,}/).slice(0, 2) : []
          const lead = paragraphs[0]
          const rest = paragraphs.slice(1)
          const crowdPhrase = crowd ? CROWD_PHRASE[String(crowd).toLowerCase()] ?? crowd : null
          const eventList = Array.isArray(events) ? events.filter(Boolean) : []
          const packList = Array.isArray(packing) ? packing.filter(Boolean) : []

          return (
            <section className="season" key={def.key}>
              <FullBleed
                query={`${location.name} ${def.hint}`}
                kicker={temp ? `${temp}` : undefined}
                title={def.label}
                caption={lead || undefined}
                height="64vh"
              />

              {(rest.length > 0 || crowdPhrase || eventList.length || packList.length) && (
                <Reveal className="season-copy">
                  {rest.map((p, j) => (
                    <p className="season-para" key={j}>
                      {p}
                    </p>
                  ))}

                  <div className="season-facts">
                    {crowdPhrase && (
                      <p className="season-fact">
                        <span className="season-fact-label">Crowds</span>
                        <span>{crowdPhrase}</span>
                      </p>
                    )}
                    {eventList.length > 0 && (
                      <p className="season-fact">
                        <span className="season-fact-label">Around then</span>
                        <span>{eventList.join(' · ')}</span>
                      </p>
                    )}
                    {packList.length > 0 && (
                      <p className="season-fact">
                        <span className="season-fact-label">Pack</span>
                        <span>{packList.join(' · ')}</span>
                      </p>
                    )}
                  </div>
                </Reveal>
              )}
            </section>
          )
        })}
      </div>
    </Chapter>
  )
}

export default memo(SeasonsModule)
