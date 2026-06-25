import { Component, Suspense, useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import { TextureLoader, SRGBColorSpace, DoubleSide } from 'three'

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

class CloudErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn(
      '[Elsewhere] Cloud texture failed to load:',
      error?.message || error
    )
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function CloudLayer({ meshRef, prevEarthY, opacity }) {
  const clouds = useLoader(TextureLoader, '/textures/earth_clouds.png')

  useEffect(() => {
    clouds.colorSpace = SRGBColorSpace
    console.log('[Elsewhere] Loaded earth_clouds.png')
  }, [clouds])

  useFrame((state) => {
    const clouds = meshRef.current
    const earth = findEarthMesh(state.scene)
    if (!clouds || !earth) return

    clouds.material.opacity = opacity
    clouds.rotation.x = earth.rotation.x
    const deltaY = earth.rotation.y - prevEarthY.current
    clouds.rotation.y += deltaY * 0.7
    prevEarthY.current = earth.rotation.y
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.015, 64, 64]} />
      <meshPhongMaterial
        map={clouds}
        alphaMap={clouds}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  )
}

export default function Clouds() {
  const meshRef = useRef()
  const prevEarthY = useRef(0)

  const { cloudOpacity } = useControls(
    'Clouds',
    {
      cloudOpacity: { value: 0.35, min: 0, max: 1, step: 0.01 },
    },
    { render: () => import.meta.env.DEV }
  )

  return (
    <CloudErrorBoundary>
      <Suspense fallback={null}>
        <CloudLayer
          meshRef={meshRef}
          prevEarthY={prevEarthY}
          opacity={cloudOpacity}
        />
      </Suspense>
    </CloudErrorBoundary>
  )
}
