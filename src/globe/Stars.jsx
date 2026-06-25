import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { inSphere } from 'maath/random'
import * as THREE from 'three'

const COUNT = 15000
const RADIUS = 20

export default function Stars() {
  const pointsRef = useRef()
  const seeds = useMemo(() => {
    const s = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) s[i] = Math.random() * Math.PI * 2
    return s
  }, [])

  const geometry = useMemo(() => {
    const positions = inSphere(new Float32Array(COUNT * 3), { radius: RADIUS })
    const colors = new Float32Array(COUNT * 3)
    colors.fill(1)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    const colors = pointsRef.current.geometry.attributes.color
    const t = clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      const brightness = 0.55 + 0.45 * Math.sin(t * 1.2 + seeds[i])
      colors.array[i * 3] = brightness
      colors.array[i * 3 + 1] = brightness
      colors.array[i * 3 + 2] = brightness
    }
    colors.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  )
}
