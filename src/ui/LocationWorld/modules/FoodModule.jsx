import { memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../../store/useStore'
import LocationCard from './shared/LocationCard'

const EASE = [0.16, 1, 0.3, 1]

const DRINK_WORDS = ['tea', 'coffee', 'chai', 'drink', 'beverage', 'juice', 'wine', 'beer', 'matcha']
// Word-boundary match so a dish like "steak" isn't miscategorized as a drink
// (plain substring "tea" lives inside "steak").
const DRINK_RE = new RegExp(`\\b(${DRINK_WORDS.join('|')})\\b`, 'i')

const FOOD_STYLES = `
  .food-module { max-width: 900px; margin: 0 auto; padding: 40px 48px 64px; }
  @media (max-width: 560px) { .food-module { padding: 32px 20px 56px; } }

  .food-intro {
    margin: 0; font-style: italic; font-size: 17px; font-weight: 300;
    line-height: 1.7; color: rgba(255,255,255,0.78); max-width: 680px;
  }
  .food-title { margin: 0 0 4px; font-size: 22px; font-weight: 600; color: #fff; }
  .food-sub { margin: 0 0 12px; font-size: 13px; color: rgba(255,255,255,0.5); }

  .food-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 12px; }
  @media (max-width: 560px) { .food-grid { grid-template-columns: 1fr; } }
`

// First sentence of a passage (fallback intro when no weatherMood).
function firstSentence(text) {
  if (!text) return ''
  const match = String(text).match(/^.*?[.!?](\s|$)/)
  return (match ? match[0] : String(text)).trim()
}

function RegionBadge({ region }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        padding: '3px 9px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {region}
    </span>
  )
}

// FoodModule — every dish behaves like a discoverable destination. Entirely
// dataset-driven (location.food); no AI, no Groq, no API/image fetching beyond
// LocationCard's existing imageCache. Sections collapse when empty.
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
    if (street.length) out.push({ key: 'street', title: 'Street Food', items: street })
    if (local.length) out.push({ key: 'local', title: 'Local Cuisine', items: local })
    if (drink.length) out.push({ key: 'drink', title: 'What to Drink', items: drink })
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.id])

  if (!location.food?.length) {
    return (
      <div className="food-module" style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Nothing to explore here yet.
        </p>
      </div>
    )
  }

  const intro = location.ambience?.weatherMood ?? firstSentence(location.story)

  return (
    <div className="food-module">
      <style>{FOOD_STYLES}</style>

      {intro && <p className="food-intro">{intro}</p>}

      {groups.map((group, gi) => (
        <motion.section
          key={group.key}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: gi * 0.05 }}
          style={{ marginTop: intro || gi > 0 ? 40 : 24 }}
        >
          <h3 className="food-title">{group.title}</h3>

          <div className="food-grid">
            {group.items.map((food, i) => {
              const subtitle = [food.region, food.culturalSignificance].filter(Boolean).join(' · ')
              const imageQuery =
                food.imageQuery ?? food.images?.[0] ?? `${food.name} ${location.name} food`
              return (
                <motion.div
                  key={food.name ?? i}
                  aria-label={`Explore ${food.name}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
                >
                  <LocationCard
                    item={food}
                    title={food.name}
                    subtitle={subtitle || undefined}
                    imageQuery={imageQuery}
                    aspectRatio="16 / 9"
                    badge={food.region ? <RegionBadge region={food.region} /> : null}
                    onClick={handleSelect}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      ))}
    </div>
  )
}

export default memo(FoodModule)
