import { Component, createContext, useContext, useEffect, useMemo, useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, SRGBColorSpace, Vector3, AdditiveBlending } from 'three'
import nightlightsFrag from '../shaders/nightlights.frag?raw'

const SunDirectionContext = createContext(new Vector3(1, 0.3, 0))

export function useSunDirection() {
  return useContext(SunDirectionContext)
}

const nightVert = `
varying vec2 vUv;
varying vec3 vWorldNormal;

void main() {
  vUv = uv;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

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

class NightErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn(
      '[Elsewhere] Night lights texture failed to load:',
      error?.message || error
    )
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function NightLightsOverlay({ sunDirection, meshRef }) {
  const nightMap = useLoader(TextureLoader, '/textures/earth_night.jpg')

  useEffect(() => {
    nightMap.colorSpace = SRGBColorSpace
    console.log('[Elsewhere] Loaded earth_night.jpg')
  }, [nightMap])

  const uniforms = useMemo(
    () => ({
      nightMap: { value: nightMap },
      sunDirection: { value: new Vector3(1, 0.3, 0) },
      cityGlow: { value: 2.5 },
    }),
    [nightMap]
  )

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    mesh.material.uniforms.sunDirection.value.copy(sunDirection)
    const earth = findEarthMesh(state.scene)
    if (earth) mesh.rotation.copy(earth.rotation)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.002, 64, 64]} />
      <shaderMaterial
        vertexShader={nightVert}
        fragmentShader={nightlightsFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  )
}

export default function DayNight({ children }) {
  const sunRef = useRef()
  const nightMeshRef = useRef()
  const sunDirection = useMemo(() => new Vector3(5, 1.5, 0), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const x = Math.cos(t * 0.05) * 5
    const z = Math.sin(t * 0.05) * 5
    const y = 1.5

    if (sunRef.current) {
      sunRef.current.position.set(x, y, z)
    }

    sunDirection.set(x, y, z).normalize()
  })

  return (
    <SunDirectionContext.Provider value={sunDirection}>
      <ambientLight intensity={0.15} />
      <directionalLight ref={sunRef} position={[5, 1.5, 0]} intensity={1.8} />
      <NightErrorBoundary>
        <Suspense fallback={null}>
          <NightLightsOverlay
            sunDirection={sunDirection}
            meshRef={nightMeshRef}
          />
        </Suspense>
      </NightErrorBoundary>
      {children}
    </SunDirectionContext.Provider>
  )
}
