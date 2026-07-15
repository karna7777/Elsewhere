import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// SpaceEnvironment — the deep-space backdrop the whole experience floats in.
// Three layers, back-to-front:
//   1. Nebula sphere  — a huge inverted sphere with an fbm-noise shader painting
//      deep-space colour, drifting nebula clouds and a tilted Milky-Way band.
//   2. drei <Stars>   — GPU-instanced, twinkling depth stars (cheap, no JS loop).
//   3. Sparkles       — a handful of brighter foreground stars for parallax depth.
// Everything is procedural, so it needs no textures. It renders behind the globe
// (large radius + depthWrite off) and never touches the camera/flyTo pipeline.
// ─────────────────────────────────────────────────────────────────────────────

const NEBULA_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const NEBULA_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vDir;
  uniform float uTime;
  uniform float uIntensity;

  // 3D value noise + fbm (seamless on a direction vector — no UV seams).
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec3 dir = normalize(vDir);
    float t = uTime * 0.008;

    // Deep-space base — a very dark blue-black, subtly darker "up".
    vec3 col = vec3(0.008, 0.012, 0.028);

    // Tilted Milky-Way band: bright near a great circle, cloudy via fbm.
    float band = 1.0 - abs(dot(dir, normalize(vec3(0.22, 1.0, 0.12))));
    band = pow(smoothstep(0.55, 1.0, band), 1.8);

    // Two nebula fields drifting in opposite directions for depth.
    float n1 = fbm(dir * 2.4 + t);
    float n2 = fbm(dir * 5.0 - t * 1.3);
    float n3 = fbm(dir * 3.1 + 12.0);

    // Premium palette: indigo core, teal, faint warm gold accent.
    vec3 indigo = vec3(0.10, 0.08, 0.30);
    vec3 teal   = vec3(0.03, 0.16, 0.21);
    vec3 warm   = vec3(0.26, 0.14, 0.06);

    col += indigo * pow(n1, 2.0) * 0.85;
    col += teal   * pow(n2, 2.6) * 0.55;
    col += warm   * pow(n3, 3.0) * 0.45;

    // Milky band brightening, modulated by cloud noise so it isn't a clean stripe.
    col += (indigo * 1.25 + vec3(0.05, 0.06, 0.10)) * band * (0.35 + 0.65 * n1);

    col *= uIntensity;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Nebula() {
  const matRef = useRef()
  const meshRef = useRef()
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uIntensity: { value: 1.0 } }),
    []
  )

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
    // Whisper-slow drift so the sky feels alive without ever reading as motion.
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.0015
  })

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-10}>
      <sphereGeometry args={[90, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={NEBULA_VERT}
        fragmentShader={NEBULA_FRAG}
      />
    </mesh>
  )
}

export default function SpaceEnvironment() {
  return (
    <>
      <Nebula />
      {/* Distant twinkling star field — GPU-driven, no per-frame CPU work. */}
      <Stars radius={80} depth={40} count={6000} factor={4} saturation={0} fade speed={0.6} />
      {/* A sparser, brighter near layer for a touch of parallax depth. */}
      <Stars radius={40} depth={12} count={900} factor={7} saturation={0.05} fade speed={1.1} />
    </>
  )
}
