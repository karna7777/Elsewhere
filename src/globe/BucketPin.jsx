import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Billboard, Html } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { Vector3 } from 'three'
import { latLngToUnit } from '../hooks/useFlyTo'
import { resolveNode } from '../data/NodeResolver.js'
import useStore from '../store/useStore'

const PIN_RADIUS = 1.01 // sit just above the globe surface
const OUTER_RADIUS = 0.025
const INNER_RADIUS = 0.012
const RING_INNER = 0.018
const PULSE_PERIOD = 2.2 // seconds for a full 1 → 1.25 → 1 breath
const TWO_PI_OVER_PERIOD = (Math.PI * 2) / PULSE_PERIOD

// Colour + a per-category phase so the three categories breathe out of sync.
const CATEGORY = {
  dream: { color: '#f59e0b', phase: 0 },
  upcoming: { color: '#0ea5e9', phase: 0.7 },
  visited: { color: '#10b981', phase: 1.4 },
}
const DEFAULT_CATEGORY = { color: '#0ea5e9', phase: 0 }

// The globe mesh owns orientation (radius 1, 128 segments).
function findEarthMesh(scene) {
  let earth = null
  scene.traverse((obj) => {
    if (
      obj.isMesh &&
      obj.geometry?.type === 'SphereGeometry' &&
      obj.geometry.parameters?.radius === 1 &&
      obj.geometry.parameters?.widthSegments === 128
    ) {
      earth = obj
    }
  })
  return earth
}

// Resolves the globe mesh once and publishes its world orientation into a shared
// quaternion each frame, so every pin can follow the globe without traversing the
// scene graph individually. Rendered before the pins, so the value is current
// within the same frame the pins read it.
export function EarthOrientationTracker({ orientation }) {
  const { scene } = useThree()
  const meshRef = useRef(null)

  useFrame(() => {
    if (!meshRef.current || !meshRef.current.parent) meshRef.current = findEarthMesh(scene)
    if (meshRef.current) meshRef.current.getWorldQuaternion(orientation)
  })

  return null
}

function BucketPin({ item, category, orientation }) {
  const { camera } = useThree()
  const { color, phase } = CATEGORY[category] ?? DEFAULT_CATEGORY

  // Near side = facing the camera. Flipped only on horizon crossings, never per
  // frame, so a pin re-renders a handful of times per rotation rather than 60/s.
  const [nearSide, setNearSide] = useState(true)
  const [hovered, setHovered] = useState(false)

  const outerRef = useRef()
  const pulseRef = useRef()
  const nearRef = useRef(true)

  // Base position in the globe's local frame — computed once per coordinate.
  const base = useMemo(
    () => latLngToUnit(item.lat, item.lng).multiplyScalar(PIN_RADIUS),
    [item.lat, item.lng]
  )

  // Scratch objects reused every frame — no per-frame allocations.
  const world = useRef(new Vector3())
  const dir = useRef(new Vector3())
  const cam = useRef(new Vector3())

  const { scale } = useSpring({
    scale: hovered ? 1.3 : 1,
    config: { tension: 300, friction: 22 },
  })

  useFrame((state) => {
    const outer = outerRef.current
    if (!outer) return

    // Follow the globe's rotation using the shared orientation.
    world.current.copy(base)
    if (orientation) world.current.applyQuaternion(orientation)
    outer.position.copy(world.current)

    // Hide pins on the far hemisphere: compare the pin's direction against the
    // camera's. A negative dot means it sits behind the globe.
    dir.current.copy(world.current).normalize()
    cam.current.copy(camera.position).normalize()
    const near = dir.current.dot(cam.current) >= 0
    if (near !== nearRef.current) {
      nearRef.current = near
      setNearSide(near)
    }

    // Continuous breathing pulse (1 → 1.25 → 1), phase-shifted per category.
    if (pulseRef.current) {
      const theta = state.clock.elapsedTime * TWO_PI_OVER_PERIOD + phase
      pulseRef.current.scale.setScalar(1 + 0.125 * (1 - Math.cos(theta)))
    }
  })

  const activate = useCallback(() => {
    const node = resolveNode(item.name)
    if (node) useStore.getState().pushLevel(node)
  }, [item.name])

  return (
    <group ref={outerRef} visible={nearSide}>
      <Billboard follow>
        <a.group scale={scale}>
          <group ref={pulseRef}>
            <mesh>
              <ringGeometry args={[RING_INNER, OUTER_RADIUS, 32]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.25}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
            <mesh>
              <circleGeometry args={[INNER_RADIUS, 32]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.95}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </group>
        </a.group>

        {nearSide && (
          <Html center zIndexRange={[40, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }}>
            <div style={{ position: 'relative', pointerEvents: 'none' }}>
              {/* Transparent, focusable hit target — carries all interaction so the
                  pin is reachable by both pointer and keyboard. */}
              <button
                tabIndex={0}
                aria-label={`${item.name}${item.country ? `, ${item.country}` : ''}`}
                onClick={activate}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              />
              {hovered && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 16,
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    padding: '4px 10px',
                    borderRadius: 12,
                    background: 'rgba(8,12,24,0.85)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>{item.name}</div>
                  {item.country && (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>
                      {item.country}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  )
}

export default memo(BucketPin)
