import { Component, Suspense, useEffect, useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import { TextureLoader, SRGBColorSpace, MathUtils } from 'three'

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

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [gl, minZoom, maxZoom])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    if (!dragging.current) {
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
