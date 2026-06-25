import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import auroraVert from '../shaders/aurora.vert?raw'
import auroraFrag from '../shaders/aurora.frag?raw'
import { useSunDirection } from './DayNight'

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

export default function Aurora() {
  const meshRef = useRef()
  const sunDirection = useSunDirection()

  const { auroraSpeed, auroraIntensity } = useControls(
    'Aurora',
    {
      auroraSpeed: { value: 1.0, min: 0.1, max: 4, step: 0.1 },
      auroraIntensity: { value: 1.2, min: 0, max: 3, step: 0.1 },
    },
    { render: () => import.meta.env.DEV }
  )

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      auroraSpeed: { value: 1.0 },
      auroraIntensity: { value: 1.2 },
      sunDirection: { value: new THREE.Vector3(1, 0.3, 0) },
    }),
    []
  )

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    mesh.material.uniforms.time.value += delta
    mesh.material.uniforms.auroraSpeed.value = auroraSpeed
    mesh.material.uniforms.auroraIntensity.value = auroraIntensity
    mesh.material.uniforms.sunDirection.value.copy(sunDirection)

    const earth = findEarthMesh(state.scene)
    if (earth) mesh.rotation.copy(earth.rotation)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.03, 64, 64]} />
      <shaderMaterial
        vertexShader={auroraVert}
        fragmentShader={auroraFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
