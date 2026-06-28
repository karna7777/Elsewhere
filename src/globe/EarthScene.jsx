import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'
import Earth from './Earth'
import Stars from './Stars'
import DayNight from './DayNight'
import AtmosphereShader from './AtmosphereShader'
import Clouds from './Clouds'
import Aurora from './Aurora'
import CameraRig from './CameraRig'

export default function EarthScene() {
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
        <Stars />
        <DayNight>
          <Earth />
          <Clouds />
          <AtmosphereShader />
          <Aurora />
        </DayNight>
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
