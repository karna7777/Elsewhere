import { memo, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import useStore from '../../store/useStore'
import { resolveNode } from '../../data/NodeResolver.js'
import BucketCard from './BucketCard'

// Bucket List panel. Renders saved places as draggable cards across three
// droppable columns. ONE DndContext wraps the whole panel (no nested contexts);
// each column is a droppable + SortableContext. Drag between columns →
// moveBucketItem. Card click → the canonical navigation pipeline.
//
// Subscriptions stay minimal (bucketPanelOpen + bucketList); the drag/remove/open
// handlers are memoized so cards never receive fresh callback identities.

const EXPO_OUT = [0.16, 1, 0.3, 1]
const keyOf = (i) => i?.id ?? i?.name

const COLUMNS = [
  { key: 'dream', label: 'Dream', emoji: '⭐', accent: '#f59e0b' },
  { key: 'upcoming', label: 'Upcoming', emoji: '📅', accent: '#0ea5e9' },
  { key: 'visited', label: 'Visited', emoji: '✓', accent: '#10b981' },
]

// One category: droppable body + sortable list of cards, or the empty placeholder.
// Memoized on (items, handlers) so only the columns whose list actually changed
// re-render after a move.
const Column = memo(function Column({ category, label, emoji, accent, items, onRemove, onOpen }) {
  const { setNodeRef, isOver } = useDroppable({ id: category, data: { type: 'column', category } })
  const ids = useMemo(() => items.map(keyOf), [items])
  const empty = items.length === 0

  return (
    <section style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 15 }} aria-hidden="true">
          {emoji}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, color: accent, letterSpacing: '0.02em' }}>
          {label}
        </span>
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 12 }} />

      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          style={{
            minHeight: 140,
            borderRadius: 12,
            padding: empty ? 0 : 8,
            display: 'flex',
            flexDirection: 'column',
            gap: empty ? 0 : 8,
            alignItems: empty ? 'center' : 'stretch',
            justifyContent: empty ? 'center' : 'flex-start',
            // Dashed placeholder only while empty; a subtle wash when a card hovers over.
            border: empty ? '1px dashed rgba(255,255,255,0.12)' : '1px solid transparent',
            background: isOver ? 'rgba(255,255,255,0.04)' : 'transparent',
            transition: 'background 0.15s ease',
          }}
        >
          {empty ? (
            <>
              <span style={{ fontSize: 30, opacity: 0.5 }} aria-hidden="true">
                {emoji}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
                Drop places here
              </span>
            </>
          ) : (
            items.map((item) => (
              <BucketCard
                key={keyOf(item)}
                item={item}
                category={category}
                onRemove={onRemove}
                onClick={onOpen}
              />
            ))
          )}
        </div>
      </SortableContext>
    </section>
  )
})

export default function BucketPanel() {
  const open = useStore((s) => s.bucketPanelOpen)
  const bucketList = useStore((s) => s.bucketList)
  const closeBucketPanel = useStore((s) => s.closeBucketPanel)
  const moveBucketItem = useStore((s) => s.moveBucketItem)
  const removeFromBucket = useStore((s) => s.removeFromBucket)
  const pushLevel = useStore((s) => s.pushLevel)

  // Small pointer movement = click; a real drag needs >6px, so card navigation
  // and dragging coexist on the same element.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event
      if (!over) return
      const fromCat = active.data.current?.category
      const toCat = over.data.current?.category // both cards and columns carry `category`
      if (!fromCat || !toCat || fromCat === toCat) return
      moveBucketItem(active.id, fromCat, toCat)
    },
    [moveBucketItem]
  )

  const handleRemove = useCallback((id) => removeFromBucket(id), [removeFromBucket])

  // Reuse the EXISTING navigation pipeline: a curated Knowledge Object if the name
  // resolves, else the item's own coordinates (it carries lat/lng) — both go
  // through pushLevel → activeDestination → CameraRig. No camera logic here.
  const handleOpen = useCallback(
    (item) => {
      const node = resolveNode(item.name) ?? resolveNode(item)
      if (node) {
        pushLevel(node)
        closeBucketPanel()
      }
    },
    [pushLevel, closeBucketPanel]
  )

  const total =
    (bucketList.dream?.length ?? 0) +
    (bucketList.upcoming?.length ?? 0) +
    (bucketList.visited?.length ?? 0)

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="bucket-panel"
          role="dialog"
          aria-label="My Elsewhere bucket list"
          initial={{ x: -420 }}
          animate={{ x: 0 }}
          exit={{ x: -420 }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: 'min(380px, 92vw)',
            background: 'rgba(8,12,24,0.85)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            padding: '28px 22px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            fontFamily: 'inherit',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 26,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: '#fff', letterSpacing: '0.01em' }}>
                My Elsewhere
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                {total} {total === 1 ? 'place' : 'places'} saved
              </p>
            </div>

            <button
              onClick={closeBucketPanel}
              aria-label="Close bucket list"
              style={{
                flexShrink: 0,
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Three droppable categories under a single DndContext. */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {COLUMNS.map((c) => (
              <Column
                key={c.key}
                category={c.key}
                label={c.label}
                emoji={c.emoji}
                accent={c.accent}
                items={bucketList[c.key] ?? []}
                onRemove={handleRemove}
                onOpen={handleOpen}
              />
            ))}
          </DndContext>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
