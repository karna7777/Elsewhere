import { Component, Suspense, useEffect, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// IntroSequence — the in-canvas cinematic opening. Beats:
//   1. "ELSE" + "WHERE" (obsidian body, glowing gold edge) rise in, centred.
//   2. The wordmark orbits gently.
//   3. The two halves part horizontally while the Earth grows in the gap and the
//      camera pushes in.
//   4. The wordmark shrinks + lifts + dissolves — the app UI fades in behind it.
// Everything is defensive: any failure (font/shader) resolves the intro so the
// app is never trapped behind it. It only animates the camera while CameraRig is
// idle (see CameraRig: it never sets the camera unless flying), and always ends
// at the default globe framing (z = 2.8), so the live app is unaffected.
// ─────────────────────────────────────────────────────────────────────────────

const FONT = '/fonts/fraunces.json' // Fraunces display cut (opsz 144) — matches the brand serif

// Obsidian body + fresnel gold rim. Bloom amplifies the rim into a glow.
const VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vN;
  varying vec3 vV;
  uniform vec3 uBase;
  uniform vec3 uEdge;
  uniform float uEdgePow;
  uniform float uEdgeGain;
  uniform float uOpacity;
  void main() {
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), uEdgePow);
    vec3 col = uBase + uEdge * f * uEdgeGain;
    gl_FragColor = vec4(col, uOpacity);
  }
`

// Tiny in-canvas boundary: on any render error, resolve the intro and vanish so
// the globe/app still come up.
class IntroBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFail?.()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function Title({ active, earthGroupRef, onDone }) {
  const { camera } = useThree()
  const wordRef = useRef()
  const elseRef = useRef()
  const whereRef = useRef()
  const startedRef = useRef(false)
  const doneRef = useRef(false)
  const fadedRef = useRef(false)
  const tlRef = useRef(null)
  const baseRef = useRef({ elseX: -1.1, whereX: 0.05 }) // fallback until measured

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        // Always draw on top of the Earth so the globe reads as emerging from
        // *behind* the wordmark, regardless of z-overlap.
        depthTest: false,
        depthWrite: false,
        uniforms: {
          // Warm near-black obsidian body + a tight, soft-gold reflective rim
          // (low gain, high power → a metallic glint that shifts as it turns,
          // not a constant emissive glow).
          uBase: { value: new THREE.Color('#17120c') },
          uEdge: { value: new THREE.Color('#f4c67a') },
          uEdgePow: { value: 4.5 },
          uEdgeGain: { value: 0.9 },
          uOpacity: { value: 1 },
        },
      }),
    []
  )

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    // Guarantee the live-app end state no matter how we got here.
    if (earthGroupRef?.current) earthGroupRef.current.scale.setScalar(1)
    camera.position.z = 2.8
    onDone?.()
  }

  // Measure the two halves so the joined word is correctly kerned + centred.
  const layout = () => {
    const gap = 0.04 // tight — the two halves must read as one wordmark when joined
    let eW = 1.9
    let wW = 2.4
    try {
      if (elseRef.current?.geometry) {
        elseRef.current.geometry.computeBoundingBox()
        const b = elseRef.current.geometry.boundingBox
        eW = b.max.x - b.min.x
      }
      if (whereRef.current?.geometry) {
        whereRef.current.geometry.computeBoundingBox()
        const b = whereRef.current.geometry.boundingBox
        wW = b.max.x - b.min.x
      }
    } catch {
      /* geometry not ready — keep fallbacks */
    }
    const total = eW + gap + wW
    const elseX = -total / 2
    const whereX = elseX + eW + gap
    baseRef.current = { elseX, whereX }
    if (elseRef.current) elseRef.current.position.x = elseX
    if (whereRef.current) whereRef.current.position.x = whereX
  }

  // Start the master timeline the first time the intro becomes active.
  useEffect(() => {
    if (!active || startedRef.current) return undefined
    startedRef.current = true

    const word = wordRef.current
    const earth = earthGroupRef?.current
    if (!word) {
      finish()
      return undefined
    }

    layout()
    const { elseX, whereX } = baseRef.current
    const spread = 1.4 // a touch wider — more Earth presence in the gap

    // Initial state.
    word.scale.setScalar(0.001)
    word.position.set(0, -0.1, 0)
    material.uniforms.uOpacity.value = 1
    if (earth) earth.scale.setScalar(0.001)
    camera.position.z = 4.6

    // ~6.1s total, luxurious and unhurried. The part → shrink beats overlap so the
    // wordmark never rests as two separate words; it opens, unveils the Earth, then
    // recedes as one mark.
    const tl = gsap.timeline({ onComplete: finish })
    tlRef.current = tl

    // 1 — the wordmark rises in.
    tl.to(word.scale, { x: 1, y: 1, z: 1, duration: 1.1, ease: 'back.out(1.4)' }, 0)
    tl.to(word.position, { y: 0, duration: 1.1, ease: 'power2.out' }, 0)

    // 2/3 — halves part while the Earth emerges from behind, camera eases in.
    if (elseRef.current) tl.to(elseRef.current.position, { x: elseX - spread, duration: 2.0, ease: 'power2.inOut' }, 2.0)
    if (whereRef.current) tl.to(whereRef.current.position, { x: whereX + spread, duration: 2.0, ease: 'power2.inOut' }, 2.0)
    if (earth) tl.to(earth.scale, { x: 1, y: 1, z: 1, duration: 2.3, ease: 'power2.out' }, 2.2)
    tl.to(camera.position, { z: 3.4, duration: 2.0, ease: 'power2.inOut' }, 2.0)

    // 4 — shrink + lift the mark away (overlaps the part), camera settles to rest.
    tl.to(word.scale, { x: 0.16, y: 0.16, z: 0.16, duration: 1.6, ease: 'power3.inOut' }, 4.0)
    tl.to(word.position, { y: 0.85, duration: 1.6, ease: 'power2.inOut' }, 4.0)
    tl.to(camera.position, { z: 2.8, duration: 1.6, ease: 'power2.inOut' }, 4.0)

    // 5 — dissolve the mark as the UI takes over.
    tl.to(material.uniforms.uOpacity, { value: 0, duration: 0.9, ease: 'power2.in', onStart: () => { fadedRef.current = true } }, 5.2)

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Gentle orbital sway until the word starts dissolving.
  useFrame((state) => {
    const word = wordRef.current
    if (!word || !active || fadedRef.current) return
    const t = state.clock.elapsedTime
    // Slow, shallow sway — a reflective turn to catch the rim light, not a spin.
    word.rotation.y = Math.sin(t * 0.28) * 0.14
    word.rotation.x = Math.sin(t * 0.2) * 0.035
  })

  const textProps = {
    font: FONT,
    size: 0.5,
    height: 0.14,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.009,
    bevelSegments: 3,
    renderOrder: 10, // drawn after the Earth (with depthTest off) → always on top
  }

  return (
    <group ref={wordRef} position={[0, 0, 0]} scale={0.001}>
      <Text3D ref={elseRef} {...textProps}>
        ELSE
        <primitive object={material} attach="material" />
      </Text3D>
      <Text3D ref={whereRef} {...textProps}>
        WHERE
        <primitive object={material} attach="material" />
      </Text3D>
    </group>
  )
}

export default function IntroSequence({ active, earthGroupRef, onDone }) {
  return (
    <IntroBoundary onFail={onDone}>
      <Suspense fallback={null}>
        <Title active={active} earthGroupRef={earthGroupRef} onDone={onDone} />
      </Suspense>
    </IntroBoundary>
  )
}
