import { memo, useCallback, useMemo } from 'react'
import useStore from '../../../store/useStore'
import Chapter from '../chapters/Chapter'
import { EditorialSplit, Reveal, useChapterImage } from '../chapters/editorial'

const DRINK_WORDS = ['tea', 'coffee', 'chai', 'drink', 'beverage', 'juice', 'wine', 'beer', 'matcha']
// Word-boundary match so a dish like "steak" isn't miscategorized as a drink
// (plain substring "tea" lives inside "steak").
const DRINK_RE = new RegExp(`\\b(${DRINK_WORDS.join('|')})\\b`, 'i')

const STYLES = `
  .food-flow { display: flex; flex-direction: column; gap: clamp(76px, 9vw, 128px); margin-top: clamp(40px, 5vw, 68px); }

  .food-block { max-width: var(--content-max); margin: 0 auto; padding: 0 48px; width: 100%; box-sizing: border-box; }
  @media (max-width: 560px) { .food-block { padding: 0 20px; } }

  .food-intro { margin: 0; max-width: var(--measure); font-family: var(--font-display); font-style: italic;
    font-weight: 300; font-size: clamp(22px, 2.6vw, 34px); line-height: 1.5; color: rgba(255,255,255,0.85); }

  .food-group { display: flex; flex-direction: column; gap: clamp(40px, 5vw, 64px); }
  .food-group-title { margin: 0; font-family: var(--font-display); font-weight: 400;
    font-size: clamp(26px, 3vw, 42px); line-height: 1.05; letter-spacing: -0.02em; color: #fff; }

  .food-kicker { margin: 0 0 12px; font-size: var(--fs-eyebrow); font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.16em; color: var(--gold); }
  .food-dish-title { margin: 0 0 18px; font-family: var(--font-display); font-weight: 400;
    font-size: clamp(26px, 3vw, 40px); line-height: 1.08; letter-spacing: -0.015em; color: #fff; }
  .food-prose { margin: 0 0 16px; font-size: var(--fs-body); line-height: 1.7; color: rgba(255,255,255,0.8); }
  .food-prose--muted { color: rgba(255,255,255,0.58); margin-bottom: 26px; }
  .food-more { display: inline-flex; align-items: center; gap: 9px; background: none; border: none; padding: 0;
    cursor: pointer; font: inherit; font-size: var(--fs-meta); font-weight: 600; letter-spacing: 0.04em; color: var(--gold); }
  .food-more span { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .food-more:hover span { transform: translateX(4px); }
  .food-more:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 6px; }

  .dish-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: clamp(22px, 2.6vw, 34px); }
  .dish-tile { display: flex; flex-direction: column; gap: 15px; padding: 0; background: none; border: none;
    text-align: left; color: inherit; cursor: pointer; }
  .dish-media { position: relative; aspect-ratio: 4 / 5; border-radius: 16px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 24px 60px -42px rgba(0,0,0,0.85); }
  .dish-img { position: absolute; inset: 0; background-size: cover; background-position: center;
    background-color: #0b1220; transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
  .dish-tile:hover .dish-img { transform: scale(1.05); }
  .dish-cap { display: flex; flex-direction: column; gap: 6px; }
  .dish-region { font-size: var(--fs-meta); text-transform: uppercase; letter-spacing: 0.12em; color: var(--gold); }
  .dish-name { font-family: var(--font-display); font-size: clamp(20px, 2.1vw, 26px); line-height: 1.15; color: #fff; }
  .dish-tile:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; border-radius: 18px; }
`

// First sentence of a passage (fallback intro when no weatherMood).
function firstSentence(text) {
  if (!text) return ''
  const match = String(text).match(/^.*?[.!?](\s|$)/)
  return (match ? match[0] : String(text)).trim()
}

function dishQuery(dish, locationName) {
  return dish.imageQuery ?? dish.images?.[0] ?? `${dish.name} ${locationName} food`
}

// A dish in the gallery — a portrait plate with its name in serif beneath. The
// whole tile drills into the dish (reuses the module's existing pushLevel path).
const DishTile = memo(function DishTile({ dish, locationName, onSelect }) {
  const url = useChapterImage(dishQuery(dish, locationName))
  return (
    <button type="button" className="dish-tile" aria-label={`Explore ${dish.name}`} onClick={() => onSelect(dish)}>
      <span className="dish-media">
        <span className="dish-img" style={{ backgroundImage: url ? `url(${url})` : undefined }} aria-hidden="true" />
      </span>
      <span className="dish-cap">
        {dish.region && <span className="dish-region">{dish.region}</span>}
        <span className="dish-name">{dish.name}</span>
      </span>
    </button>
  )
})

// FoodModule — every dish behaves like a discoverable place, now told in the
// editorial language: a cinematic anchor dish per group plus a refined gallery.
// Dataset-driven (location.food); grouping + drill-in are unchanged.
function FoodModule({ location }) {
  const pushLevel = useStore((s) => s.pushLevel)

  // Drill into a dish. The pushed node is intentionally transient (no resolveNode):
  // it borrows the parent's coordinates and synthesizes a story from the dish copy.
  const handleSelect = useCallback(
    (food) => {
      pushLevel({
        ...food,
        type: 'sublocation',
        lat: location.lat,
        lng: location.lng,
        story: `${food.description ?? ''}\n\n${food.culturalSignificance ?? ''}`,
        parentId: location.id,
      })
    },
    [pushLevel, location]
  )

  // Group once per location. Buckets: Street Food (tags include "street"),
  // What to Drink (name matches a beverage word), Local Cuisine (everything else).
  const groups = useMemo(() => {
    const food = location.food ?? []
    const street = []
    const drink = []
    const local = []

    for (const item of food) {
      const tags = item.tags ?? []
      const isStreet = tags.some((t) => String(t).toLowerCase().includes('street'))
      if (isStreet) street.push(item)
      else if (DRINK_RE.test(item.name ?? '')) drink.push(item)
      else local.push(item)
    }

    const out = []
    if (street.length) out.push({ key: 'street', title: 'Street food', items: street })
    if (local.length) out.push({ key: 'local', title: 'Local cuisine', items: local })
    if (drink.length) out.push({ key: 'drink', title: 'What to drink', items: drink })
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.id])

  if (!location.food?.length) return null

  const intro = location.ambience?.weatherMood ?? firstSentence(location.story)

  return (
    <Chapter
      id="food"
      kicker="A taste of place"
      title="What to eat"
      lead="The flavours that tell you where you are — the moment you sit down."
    >
      <style>{STYLES}</style>

      <div className="food-flow">
        {intro && (
          <div className="food-block">
            <p className="food-intro">{intro}</p>
          </div>
        )}

        {groups.map((group) => {
          const [hero, ...rest] = group.items
          return (
            <section className="food-group" key={group.key}>
              <div className="food-block">
                <h3 className="food-group-title">{group.title}</h3>
              </div>

              <EditorialSplit query={dishQuery(hero, location.name)} caption={hero.name}>
                {hero.region && <p className="food-kicker">{hero.region}</p>}
                <h4 className="food-dish-title">{hero.name}</h4>
                {hero.description && <p className="food-prose">{hero.description}</p>}
                {hero.culturalSignificance && (
                  <p className="food-prose food-prose--muted">{hero.culturalSignificance}</p>
                )}
                <button type="button" className="food-more" onClick={() => handleSelect(hero)}>
                  Explore {hero.name} <span aria-hidden="true">→</span>
                </button>
              </EditorialSplit>

              {rest.length > 0 && (
                <Reveal className="food-block">
                  <div className="dish-grid">
                    {rest.map((dish, i) => (
                      <DishTile
                        key={dish.name ?? i}
                        dish={dish}
                        locationName={location.name}
                        onSelect={handleSelect}
                      />
                    ))}
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

export default memo(FoodModule)
