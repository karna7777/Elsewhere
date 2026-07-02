import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  CatmullRomCurve3,
  Mesh,
  MeshBasicMaterial,
  Quaternion,
  TubeGeometry,
  Vector3,
} from 'three'
import gsap from 'gsap'
import useStore from '../store/useStore'
import { latLngToUnit } from '../hooks/useFlyTo'

// The Flight Arc is a PURE VISUAL layer that appears ONLY during real
// navigation — travelling from one discovered destination to another. It owns no
// navigation, no camera, no globe rotation and no Zustand: it merely observes the
// EXISTING flight lifecycle and draws a cinematic arc between the two places.
//
// It is bound exclusively to `fly-whoosh` / `fly-complete`, which are dispatched
// ONLY by useFlyTo (i.e. the pushLevel → flyTo → CameraRig pipeline). The
// camera-only country focus introduced in Part 3 never dispatches these events,
// so the arc never appears during globe exploration — only during travel.
//
// Everything heavy is built ONCE per flight (one geometry, one material) and
// disposed on arrival or abort. The frame loop only copies the Earth's
// quaternion so the arc stays glued to the surface as the globe rotates — no
// allocations, no React state per frame, no geometry rebuilds.

const ARC_COLOR = 0x5fe6ff
const TUBE_SEGMENTS = 64
const TUBE_RADIAL = 6
const TUBE_RADIUS = 0.003
const DRAW_DURATION = 2.0 // the arc "draws" itself over ~2s
const FADE_DURATION = 0.6 // then fades smoothly after arrival
// Sit the endpoints just above the surface (globe r=1, boundaries r=1.0015) so
// the tube (radius 0.003) never dips into the globe and never z-fights borders.
const SURFACE_R = 1.006
// Height of the mid control point scales with flight length: short hops stay
// subtle, long (near-antipodal) journeys rise high — never a fixed elevation.
const MIN_LIFT = 0.1
const MAX_LIFT = 0.45

// The globe mesh is the source of truth for orientation (radius 1, 128 segs).
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

export default function FlightArc() {
  const { camera, scene } = useThree()
  const groupRef = useRef()
  // The live arc: { mesh, geometry, material }. Null when no flight is in view.
  const arcRef = useRef(null)
  const earthRef = useRef(null)
  const tweens = useRef([])

  // Reused every frame — never reallocated in useFrame.
  const frameQuat = useRef(new Quaternion())
  // Reused at flight start (once per flight) — kept out of the render path.
  const startQuat = useRef(new Quaternion())
  const invQuat = useRef(new Quaternion())
  const worldStart = useRef(new Vector3())

  useEffect(() => {
    const killTweens = () => {
      tweens.current.forEach((t) => t.kill())
      tweens.current = []
    }

    // Fully remove the current arc: stop tweens, unmount, free GPU memory. Called
    // on arrival (after fade), on abort, on a re-target, and on unmount. Nothing
    // is ever left behind — no ghost arcs.
    const dispose = () => {
      killTweens()
      const a = arcRef.current
      if (a) {
        groupRef.current?.remove(a.mesh)
        a.geometry.dispose()
        a.material.dispose()
        arcRef.current = null
      }
    }

    // A new flight has begun. Compute endpoints ONCE, build the geometry ONCE,
    // and animate the draw. `activeDestination` is already the new destination by
    // the time fly-whoosh fires (CameraRig sets it, then flyTo dispatches).
    const begin = () => {
      dispose() // clear any previous / in-flight arc first — never stack arcs
      const dest = useStore.getState().activeDestination
      if (!dest || dest.lat == null || dest.lng == null) return
      const earth = findEarthMesh(scene)
      const group = groupRef.current
      if (!earth || !group) return
      earthRef.current = earth

      // Work in the globe's LOCAL frame so both endpoints stay glued to their
      // landmasses while the globe rotates the destination toward the camera.
      earth.getWorldQuaternion(startQuat.current)
      invQuat.current.copy(startQuat.current).invert()

      // Start: the surface point currently facing the camera (camera lives on the
      // +Z axis, so this is where the previous destination sits). Projected onto
      // the sphere, then carried into the globe's local frame.
      const start = worldStart.current
        .copy(camera.position)
        .normalize()
        .applyQuaternion(invQuat.current)
        .multiplyScalar(SURFACE_R)
        .clone()
      // End: the destination coordinates from the existing flyTo pipeline. This is
      // already a local-space unit vector (the exact projection useFlyTo uses).
      const end = latLngToUnit(dest.lat, dest.lng).multiplyScalar(SURFACE_R)

      // Elevated midpoint — lift scales with the angular length of the journey.
      const angle = start.angleTo(end)
      const lift = MIN_LIFT + (MAX_LIFT - MIN_LIFT) * (angle / Math.PI)
      const midDir = start.clone().add(end)
      if (midDir.lengthSq() < 1e-6) midDir.copy(start).cross(new Vector3(0, 1, 0))
      const mid = midDir.normalize().multiplyScalar(1 + lift)

      const curve = new CatmullRomCurve3([start, mid, end])
      const geometry = new TubeGeometry(curve, TUBE_SEGMENTS, TUBE_RADIUS, TUBE_RADIAL, false)
      const material = new MeshBasicMaterial({
        color: ARC_COLOR,
        transparent: true,
        opacity: 0.5,
        depthWrite: false, // float above the Earth; Bloom gives the soft glow
      })
      const mesh = new Mesh(geometry, material)
      mesh.renderOrder = 10
      group.add(mesh)
      arcRef.current = { mesh, geometry, material }

      // Draw progressively by revealing the index buffer — geometry is NEVER
      // rebuilt; setDrawRange is a cheap GPU-side range change.
      const total = geometry.index ? geometry.index.count : 0
      geometry.setDrawRange(0, 0)
      const proxy = { c: 0 }
      tweens.current.push(
        gsap.to(proxy, {
          c: total,
          duration: DRAW_DURATION,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => geometry.setDrawRange(0, Math.floor(proxy.c)),
        })
      )
    }

    // Arrival: snap the draw to complete so a WHOLE arc fades (never a half-drawn
    // one), fade opacity smoothly, then dispose everything.
    const arrive = () => {
      const a = arcRef.current
      if (!a) return
      killTweens()
      const total = a.geometry.index ? a.geometry.index.count : 0
      a.geometry.setDrawRange(0, total)
      tweens.current.push(
        gsap.to(a.material, {
          opacity: 0,
          duration: FADE_DURATION,
          ease: 'power2.in',
          overwrite: true,
          onComplete: dispose,
        })
      )
    }

    window.addEventListener('fly-whoosh', begin)
    window.addEventListener('fly-complete', arrive)
    // If navigation is cleared mid-flight (back to the globe), abort with no trace.
    const unsub = useStore.subscribe(
      (s) => s.activeDestination,
      (dest) => {
        if (!dest) dispose()
      }
    )

    return () => {
      window.removeEventListener('fly-whoosh', begin)
      window.removeEventListener('fly-complete', arrive)
      unsub()
      dispose()
    }
  }, [camera, scene])

  useFrame(() => {
    const group = groupRef.current
    if (!group || !arcRef.current) return
    // Track the Earth's orientation so the arc stays glued to the surface as the
    // globe rotates the destination toward the camera. Read-only — we never drive
    // the globe. Re-find the mesh if it swapped (fallback → textured).
    if (!earthRef.current || !earthRef.current.parent) earthRef.current = findEarthMesh(scene)
    if (earthRef.current) group.quaternion.copy(earthRef.current.getWorldQuaternion(frameQuat.current))
  })

  return <group ref={groupRef} />
}
