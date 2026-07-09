import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'
import { Quaternion } from 'three'
import Earth from './Earth'
import DayNight from './DayNight'
import AtmosphereShader from './AtmosphereShader'
import Clouds from './Clouds'
import Aurora from './Aurora'
import CameraRig from './CameraRig'
import CountryBoundaries from './CountryBoundaries'
import FlightArc from './FlightArc'
import BucketPin, { EarthOrientationTracker } from './BucketPin'
import { useBucketList } from '../store/useStore'

const PIN_CATEGORIES = ['dream', 'upcoming', 'visited']

export default function EarthScene() {
  const bucketList = useBucketList()

  // Shared globe orientation, resolved once per frame and read by every pin.
  const earthOrientation = useMemo(() => new Quaternion(), [])

  // Flatten the three categories into one list of saved, mappable places.
  const pins = useMemo(() => {
    const out = []
    for (const category of PIN_CATEGORIES) {
      for (const item of bucketList[category] ?? []) {
        if (item?.lat != null && item?.lng != null) out.push({ item, category })
      }
    }
    return out
  }, [bucketList])

  return (
    <>
      {/* Leva dev panel kept mounted (controls still drive the globe) but hidden from view */}
      <Leva hidden />
      <Canvas
        style={{ width: '100%', height: '100%', background: '#000000' }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        <PerspectiveCamera makeDefault position={[0, 0, 2.8]} fov={45} />
        <CameraRig />
        <DayNight>
          <Earth />
          <Clouds />
          <AtmosphereShader />
          <Aurora />
        </DayNight>
        <CountryBoundaries />
        <FlightArc />
        {pins.length > 0 && <EarthOrientationTracker orientation={earthOrientation} />}
        {pins.map(({ item, category }) => (
          <BucketPin
            key={`${category}:${item.id ?? item.name}`}
            item={item}
            category={category}
            orientation={earthOrientation}
          />
        ))}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
          <Vignette offset={0.3} darkness={0.8} />
        </EffectComposer>
        {import.meta.env.DEV && <Perf position="top-left" />}
      </Canvas>
    </>
  )
}
