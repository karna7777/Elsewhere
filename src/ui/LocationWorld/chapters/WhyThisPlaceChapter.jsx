import { memo } from 'react'
import Chapter from './Chapter'
import { FullBleed, Prose } from './editorial'
import ComposingShimmer from '../modules/shared/ComposingShimmer'

// Pick a visual-journey frame (by index) that the Hero/Story aren't already
// using, so the imagery never repeats. Falls back to the hero query.
function journeyFrame(location, index) {
  const j = location?.visualJourney ?? []
  const item = j[index] ?? j[j.length - 1] ?? null
  return {
    url: item?.url ?? null,
    query: item?.imageQuery ?? location?.heroMedia?.imageQuery ?? `${location?.name} landscape`,
    caption: item?.description ?? null,
  }
}

// WhyThisPlaceChapter — "Why does this place matter?" The emotional overture that
// arrives BEFORE any facts: the destination's story told large and unhurried, then
// a full-bleed cinematic breath. Pure feeling; the factual Story chapter follows.
function WhyThisPlaceChapter({ location }) {
  const story = location?.story
  const composing = !story && location?.aiStatus === 'pending'
  if (!story && !composing) return null
  const frame = journeyFrame(location, 2)

  return (
    <Chapter id="why" kicker="Why this place matters">
      <style>{`
        .why-lede {
          margin: 0; font-family: var(--font-display); font-weight: 300;
          font-size: var(--fs-lede); line-height: 1.62; color: rgba(255,255,255,0.94);
        }
        .why-lede::first-letter {
          float: left; font-size: 3.4em; line-height: 0.82; padding: 10px 18px 0 0;
          color: var(--gold); font-weight: 400;
        }
        .why-gap { height: clamp(48px, 7vw, 96px); }
      `}</style>

      {composing ? (
        <Prose>
          <ComposingShimmer />
        </Prose>
      ) : (
        <>
          <Prose>
            <p className="why-lede">{story}</p>
          </Prose>

          <div className="why-gap" />

          <FullBleed
            query={frame.query}
            url={frame.url}
            caption={location.heroQuote || frame.caption || undefined}
            height="68vh"
          />
        </>
      )}
    </Chapter>
  )
}

export default memo(WhyThisPlaceChapter)
