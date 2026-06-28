import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

// GlobeCompanion is NOT a second globe. The single EarthScene canvas (owned by
// App) animates into this left column; this component only renders companion
// chrome ON TOP of it: a border, the current location label, and a pulsing
// coordinate indicator. It is pointer-events:none so the globe stays draggable.
//
// Note: the EarthScene canvas is opaque, so the spec'd rgba(4,8,18,0.6) panel
// background would simply dim the globe — instead it is applied as a soft bottom
// gradient behind the label (keeping the globe itself visually unchanged).
export default function GlobeCompanion() {
  const dest = useStore((s) => s.activeDestination)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '22vw',
        minWidth: 180,
        zIndex: 2,
        pointerEvents: 'none',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <style>{`
        @keyframes elsewhere-loc-pulse {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
          70%  { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
      `}</style>

      {/* Location indicator — after flyTo the chosen place faces the camera at
          the globe's centre, so the cyan marker sits at the canvas centre. */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgba(125,211,252,0.45)',
            transform: 'translate(-50%, -50%)',
            animation: 'elsewhere-loc-pulse 2.4s ease-out infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#7dd3fc',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 12px 3px rgba(125,211,252,0.7)',
          }}
        />
      </div>

      {/* Current location name, below the globe */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '36px 16px 22px',
          background: 'linear-gradient(to top, rgba(4,8,18,0.85), rgba(4,8,18,0))',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}
        >
          {dest?.name || ''}
        </span>
      </div>
    </motion.div>
  )
}
