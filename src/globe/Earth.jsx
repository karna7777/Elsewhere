import { Component, Suspense, useEffect, useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import { TextureLoader, SRGBColorSpace, MathUtils } from 'three'
import useStore from '../store/useStore'

const FALLBACK_COLOR = '#2266aa'
const DECAY = 0.92
const MIN_VEL = 0.0008
const ZOOM_LERP = 0.08
const DRAG_SENSITIVITY = 0.005

class TextureErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn(
      '[Elsewhere] Earth textures failed to load, using fallback:',
      error?.message || error
    )
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function EarthSphere({ material, handlers, meshRef }) {
  return (
    <mesh ref={meshRef} {...handlers}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshPhongMaterial {...material} />
    </mesh>
  )
}

function TexturedEarth({ handlers, meshRef }) {
  const [map, specularMap, normalMap] = useLoader(TextureLoader, [
    '/textures/earth_day.jpg',
    '/textures/earth_specular.jpg',
    '/textures/earth_normal.jpg',
  ])

  useEffect(() => {
    ;[map, specularMap, normalMap].forEach((tex) => {
      tex.colorSpace = SRGBColorSpace
    })
    console.log('[Elsewhere] Loaded earth_day.jpg')
    console.log('[Elsewhere] Loaded earth_specular.jpg')
    console.log('[Elsewhere] Loaded earth_normal.jpg')
  }, [map, specularMap, normalMap])

  return (
    <EarthSphere
      meshRef={meshRef}
      handlers={handlers}
      material={{ map, specularMap, normalMap, shininess: 25 }}
    />
  )
}

function FallbackEarth({ handlers, meshRef }) {
  return (
    <EarthSphere
      meshRef={meshRef}
      handlers={handlers}
      material={{ color: FALLBACK_COLOR, shininess: 25 }}
    />
  )
}

export default function Earth() {
  const meshRef = useRef()
  const { camera, gl } = useThree()
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: MIN_VEL })
  const targetZoom = useRef(2.8)
  const pinchRef = useRef(null)
  // Tracks the previous frame's flying state to detect the ownership handoff
  // moment (GSAP → Earth) so we can adopt the landed camera position exactly once.
  const wasFlying = useRef(false)
  // When a fly-to lands, we hold the globe still so the destination stays
  // locked on the +Z axis (centered in view). The hold is released the moment
  // the user interacts (drags), at which point normal idle rotation resumes.
  const rotationHold = useRef(false)

  const { rotationSpeed, minZoom, maxZoom } = useControls(
    'Earth',
    {
      rotationSpeed: { value: 1, min: 0.1, max: 3, step: 0.1 },
      minZoom: { value: 1.4, min: 1, max: 2, step: 0.1 },
      maxZoom: { value: 4.5, min: 3, max: 8, step: 0.1 },
    },
    { render: () => import.meta.env.DEV }
  )

  const handlers = {
    onPointerDown: (e) => {
      e.stopPropagation()
      // User is taking control — release any post-flight rotation lock.
      rotationHold.current = false
      dragging.current = true
      lastPointer.current = { x: e.clientX, y: e.clientY }
      e.target.setPointerCapture(e.pointerId)
    },
    onPointerMove: (e) => {
      if (!dragging.current) return
      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      lastPointer.current = { x: e.clientX, y: e.clientY }
      velocity.current.x = dy * DRAG_SENSITIVITY
      velocity.current.y = dx * DRAG_SENSITIVITY
      if (meshRef.current) {
        meshRef.current.rotation.y += dx * DRAG_SENSITIVITY
        meshRef.current.rotation.x += dy * DRAG_SENSITIVITY
      }
    },
    onPointerUp: (e) => {
      dragging.current = false
      e.target.releasePointerCapture(e.pointerId)
    },
  }

  useEffect(() => {
    const el = gl.domElement
    el.style.touchAction = 'none'

    const onWheel = (e) => {
      e.preventDefault()
      targetZoom.current = MathUtils.clamp(
        targetZoom.current + e.deltaY * 0.002,
        minZoom,
        maxZoom
      )
    }

    const onTouchStart = (e) => {
      if (e.touches.length !== 2) return
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchRef.current = {
        distance: Math.hypot(dx, dy),
        zoom: targetZoom.current,
      }
    }

    const onTouchMove = (e) => {
      if (!pinchRef.current || e.touches.length !== 2) return
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = pinchRef.current.distance / dist
      targetZoom.current = MathUtils.clamp(
        pinchRef.current.zoom * ratio,
        minZoom,
        maxZoom
      )
    }

    const onTouchEnd = () => {
      pinchRef.current = null
    }

    // Zero auto-rotation velocity when a fly-to completes so the globe
    // does not spin away from the destination the moment Earth takes back control.
    // The minimum idle spin (MIN_VEL) will resume naturally on the next frame.
    const onFlyComplete = () => {
      velocity.current.x = 0
      velocity.current.y = 0
      // Hold the globe still so the just-aligned destination stays centered
      // on +Z. Released on the next user drag (see onPointerDown).
      rotationHold.current = true
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    window.addEventListener('fly-complete', onFlyComplete)

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('fly-complete', onFlyComplete)
    }
  }, [gl, minZoom, maxZoom])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    // Read flying state directly from store (no React subscription needed in frame loop)
    const flying = useStore.getState().isFlying

    // ── Ownership handoff ────────────────────────────────────────────────────
    // On the exact frame that GSAP releases camera control (flying flips false),
    // adopt the camera's current position as the new zoom target. Without this,
    // targetZoom.current would still hold its old value (e.g. 2.8) and the lerp
    // below would immediately drag the camera away from the destination.
    if (wasFlying.current && !flying) {
      targetZoom.current = camera.position.z
    }
    wasFlying.current = flying

    // ── GSAP owns the camera during flight ───────────────────────────────────
    // Yield completely: no rotation increments (which would desync the
    // quaternion slerp in useFlyTo) and no zoom lerp (which would pull
    // camera.position.z back toward the old targetZoom).
    if (flying) return

    // While the post-flight hold is active, skip ALL idle rotation (including
    // the minimum-spin floor) so the destination remains locked dead-center.
    // Without this, MIN_VEL would re-spin the globe one frame after landing and
    // drag the destination off-axis — the root cause of the "drift" after a fly-to.
    if (!dragging.current && !rotationHold.current) {
      velocity.current.x *= DECAY
      velocity.current.y *= DECAY
      const minSpin = MIN_VEL * rotationSpeed
      if (velocity.current.y < minSpin) velocity.current.y = minSpin
      mesh.rotation.x += velocity.current.x
      mesh.rotation.y += velocity.current.y
    }

    camera.position.z = MathUtils.lerp(
      camera.position.z,
      targetZoom.current,
      ZOOM_LERP
    )
  })

  const fallback = <FallbackEarth handlers={handlers} meshRef={meshRef} />

  return (
    <TextureErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <TexturedEarth handlers={handlers} meshRef={meshRef} />
      </Suspense>
    </TextureErrorBoundary>
  )
}
