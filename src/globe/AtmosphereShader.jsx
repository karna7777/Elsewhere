import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import atmosphereVert from '../shaders/atmosphere.vert?raw'
import atmosphereFrag from '../shaders/atmosphere.frag?raw'

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

export default function AtmosphereShader() {
  const meshRef = useRef()

  const { glowColor, glowIntensity, rimPower } = useControls(
    'Atmosphere',
    {
      glowColor: { value: '#4488ff' },
      glowIntensity: { value: 0.35, min: 0, max: 4, step: 0.05 },
      rimPower: { value: 5.5, min: 0.5, max: 12, step: 0.1 },
    },
    { render: () => import.meta.env.DEV }
  )

  const uniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color('#4488ff') },
      glowIntensity: { value: 0.35 },
      rimPower: { value: 5.5 },
      time: { value: 0 },
    }),
    []
  )

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    mesh.material.uniforms.glowColor.value.set(glowColor)
    mesh.material.uniforms.glowIntensity.value = glowIntensity
    mesh.material.uniforms.rimPower.value = rimPower
    mesh.material.uniforms.time.value += delta

    const earth = findEarthMesh(state.scene)
    if (earth) mesh.rotation.copy(earth.rotation)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.03, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVert}
        fragmentShader={atmosphereFrag}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
