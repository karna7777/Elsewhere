import { memo } from 'react'
import useStore from '../store/useStore'

// A minimal vertical gauge showing how far the camera is zoomed into a location.
// Read-only: it reflects camera state and never drives the camera.

// Bounds for the gauge: the tightest location framing up to the globe's rest
// distance (fully zoomed out).
const MIN_ALTITUDE = 1.15
const MAX_CAMERA_Z = 2.8

const TRACK_HEIGHT = 80
const THUMB_SIZE = 8
const TRAVEL = TRACK_HEIGHT - THUMB_SIZE // thumb travel range in px

function ZoomIndicator() {
  const cameraZ = useStore((s) => s.cameraZ)
  const layoutState = useStore((s) => s.layoutState)

  // Only meaningful while inside a location.
  if (layoutState !== 'location' && layoutState !== 'deepdive') return null

  const percent = Math.min(
    1,
    Math.max(0, (cameraZ - MIN_ALTITUDE) / (MAX_CAMERA_Z - MIN_ALTITUDE))
  )
  // Top = zoomed out, bottom = zoomed in.
  const thumbTop = (1 - percent) * TRAVEL

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)' }}>
        ZOOM
      </span>

      <div
        style={{
          position: 'relative',
          width: 2,
          height: TRACK_HEIGHT,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            transform: `translate(-50%, ${thumbTop}px)`,
            transition: 'transform 0.18s ease-out',
          }}
        />
      </div>

      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>↕</span>
    </div>
  )
}

export default memo(ZoomIndicator)
