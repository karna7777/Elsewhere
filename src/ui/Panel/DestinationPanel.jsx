import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../../store/useStore'
import { fetchPexelsImage } from '../../utils/imageCache.js'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'wonders', label: 'Wonders' },
  { key: 'hidden', label: 'Hidden' },
  { key: 'food', label: 'Food' },
  { key: 'adventure', label: 'Adventure' },
  { key: 'seasons', label: 'Seasons' },
  { key: 'culture', label: 'Culture' },
  { key: 'ai', label: 'AI' },
]

// Every tab is code-split and loaded on demand.
const TAB_COMPONENTS = {
  overview: lazy(() => import('./tabs/OverviewTab')),
  wonders: lazy(() => import('./tabs/WondersTab')),
  hidden: lazy(() => import('./tabs/HiddenTab')),
  food: lazy(() => import('./tabs/FoodTab')),
  adventure: lazy(() => import('./tabs/AdventureTab')),
  seasons: lazy(() => import('./tabs/SeasonsTab')),
  culture: lazy(() => import('./tabs/CultureTab')),
  ai: lazy(() => import('./tabs/AITab')),
}

export default function DestinationPanel() {
  const panelOpen = useStore((s) => s.panelOpen)
  const destination = useStore((s) => s.activeDestination)
  const activeTab = useStore((s) => s.activeTab)
  const setActiveTab = useStore((s) => s.setActiveTab)
  const closePanel = useStore((s) => s.closePanel)

  const [heroUrl, setHeroUrl] = useState(null)

  // Hero photography comes through imageCache.js (never the Pexels API directly),
  // keyed off the destination's first Wonder image query. null → gradient fallback.
  useEffect(() => {
    let alive = true
    setHeroUrl(null)
    const query = destination?.wonders?.[0]?.imageQuery
    if (query) {
      fetchPexelsImage(query).then((url) => {
        if (alive) setHeroUrl(url)
      })
    }
    return () => {
      alive = false
    }
  }, [destination?.id])

  const ActiveTab = TAB_COMPONENTS[activeTab] ?? TAB_COMPONENTS.overview

  return (
    <AnimatePresence>
      {panelOpen && destination && (
        <motion.aside
          key="destination-panel"
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 380,
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(8,12,24,0.82)',
            borderLeft: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
          }}
        >
          <style>{`
            .dp-scroll::-webkit-scrollbar { display: none; }
            .dp-scroll { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>

          {/* Hero */}
          <div
            style={{
              position: 'relative',
              height: 200,
              flexShrink: 0,
              backgroundColor: 'rgba(20,28,46,1)',
              backgroundImage: heroUrl ? `url(${heroUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gradient overlay: transparent down to near-solid panel colour */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(8,12,24,0.95) 100%)',
              }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close panel"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'white',
                fontSize: 16,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            {/* Bottom-left identity */}
            <div
              style={{
                position: 'absolute',
                left: 18,
                bottom: 14,
                right: 18,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 32, lineHeight: 1 }}>{destination.flag}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 500, color: 'white', lineHeight: 1.2 }}>
                  {destination.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: 3,
                  }}
                >
                  {destination.country} • {destination.continent}
                </div>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div
            className="dp-scroll"
            style={{
              flexShrink: 0,
              display: 'flex',
              gap: 18,
              padding: '0 18px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flexShrink: 0,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '14px 0',
                    fontSize: 10.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: active ? '#7dd3fc' : 'rgba(255,255,255,0.35)',
                    borderBottom: active ? '2px solid #7dd3fc' : '2px solid transparent',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div
            className="dp-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 18,
            }}
          >
            <Suspense
              fallback={
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, padding: '20px 0' }}>
                  Loading…
                </div>
              }
            >
              <ActiveTab />
            </Suspense>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
