import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import {
  BufferGeometry,
  Float32BufferAttribute,
  Quaternion,
  Raycaster,
  Vector2,
  Vector3,
  MathUtils,
} from 'three'
import { feature } from 'topojson-client'
import { geoBounds, geoCentroid, geoContains } from 'd3-geo'
import useStore from '../store/useStore'
import { resolveNode } from '../data/NodeResolver.js'

// Country boundaries are a subtle VISUAL layer. They own no navigation, no
// camera, no AI — they only expose interaction and route clicks through the
// canonical pipeline (resolveNode → pushLevel → existing flyTo → CameraRig).
//
// Everything heavy is built ONCE and cached for the app lifetime: the TopoJSON
// is fetched + converted a single time, projected onto the sphere into ONE
// merged LineSegments (one draw call, one material). Hover uses a single shared
// Raycaster against one invisible sphere + a CPU point-in-polygon test — never a
// mesh/React object per country. Nothing here assumes the data source: clicks
// simply ask the resolver, so the future LocationContextBuilder drops straight in.

const DEG = Math.PI / 180
const RAD = 180 / Math.PI
const LINE_R = 1.0015 // just above the surface — avoids z-fighting, never floats
const TIP_R = 1.02
const VISIBLE_Z = 2.0 // hide once the camera zooms deeper than a country view
const CHECK_INTERVAL = 0.05 // throttle hover raycasts (~20/s)
const FAINT = [0.3, 0.38, 0.52]
const BRIGHT = [0.55, 0.82, 1.0]
const TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// lat/lng → unit sphere (identical projection to useFlyTo, so borders align with
// where flyTo centres a destination). Written into a flat array (no allocations).
function projectInto(positions, colors, lng, lat, r) {
  const phi = (90 - lat) * DEG
  const theta = (lng + 180) * DEG
  const sp = Math.sin(phi)
  positions.push(-(sp * Math.cos(theta)) * r, Math.cos(phi) * r, sp * Math.sin(theta) * r)
  colors.push(FAINT[0], FAINT[1], FAINT[2])
}

// Inverse projection: a local unit vector → [lng, lat].
function unitToLngLat(v) {
  const lat = 90 - Math.acos(MathUtils.clamp(v.y, -1, 1)) * RAD
  let lng = Math.atan2(v.z, -v.x) * RAD - 180
  if (lng < -180) lng += 360
  if (lng > 180) lng -= 360
  return [lng, lat]
}

// ── Module-level cache: fetched + built exactly once, immutable thereafter ────
let cachePromise = null
function loadBoundaries() {
  if (!cachePromise) {
    cachePromise = fetch(TOPO_URL)
      .then((r) => r.json())
      .then((topo) => buildBoundaries(topo))
      .catch(() => null) // offline / failure → simply no boundaries
  }
  return cachePromise
}

function buildBoundaries(topo) {
  const fc = feature(topo, topo.objects.countries)
  const positions = []
  const colors = []
  const countries = []

  const addRing = (ring) => {
    for (let i = 0; i < ring.length - 1; i += 1) {
      projectInto(positions, colors, ring[i][0], ring[i][1], LINE_R)
      projectInto(positions, colors, ring[i + 1][0], ring[i + 1][1], LINE_R)
    }
  }

  for (const f of fc.features) {
    const g = f.geometry
    if (!g) continue
    const start = positions.length / 3
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []
    for (const poly of polys) for (const ring of poly) addRing(ring)
    const count = positions.length / 3 - start
    if (!count) continue

    const [clng, clat] = geoCentroid(f)
    const cphi = (90 - clat) * DEG
    const cth = (clng + 180) * DEG
    const csp = Math.sin(cphi)
    countries.push({
      name: f.properties?.name ?? 'Unknown',
      start,
      count,
      feature: f,
      bounds: geoBounds(f), // [[minLng,minLat],[maxLng,maxLat]]
      centroid: [-(csp * Math.cos(cth)) * TIP_R, Math.cos(cphi) * TIP_R, csp * Math.sin(cth) * TIP_R],
    })
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  return { geometry, countries }
}

// Cheap bounding-box reject before the exact point-in-polygon test.
function inBounds([[minLng, minLat], [maxLng, maxLat]], lng, lat) {
  if (lat < minLat - 1 || lat > maxLat + 1) return false
  if (minLng <= maxLng && (lng < minLng - 1 || lng > maxLng + 1)) return false
  return true // wrapped (antimeridian) → skip the lng reject, let geoContains decide
}

function findCountry(countries, lng, lat) {
  for (let i = 0; i < countries.length; i += 1) {
    const c = countries[i]
    if (inBounds(c.bounds, lng, lat) && geoContains(c.feature, [lng, lat])) return i
  }
  return -1
}

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

export default function CountryBoundaries() {
  const { camera, gl, scene } = useThree()
  const [data, setData] = useState(null)
  const [tooltip, setTooltip] = useState(null) // { name, pos:[x,y,z] }

  const groupRef = useRef()
  const sphereRef = useRef()
  const earthRef = useRef(null)

  // Reused across frames — never reallocated in the loop.
  const raycaster = useRef(new Raycaster())
  const ndc = useRef(new Vector2())
  const scratch = useRef(new Vector3())
  const quat = useRef(new Quaternion())
  const hits = useRef([]) // reused intersection target — no per-pick array alloc

  const hasPointer = useRef(false)
  const pointerDown = useRef(null)
  const lastCheck = useRef(0)
  const hovered = useRef(-1)
  const brightness = useRef(null) // per-country current brightness
  const active = useRef(new Set()) // countries mid-transition
  // True while Surprise Me spins the globe. Observed from the EXISTING surprise
  // events (no new state) so hover + clicks are suppressed during the spin —
  // exploration input must not race the cinematic spin / the pushLevel it triggers.
  const spinBusy = useRef(false)

  useEffect(() => {
    let mounted = true
    loadBoundaries().then((d) => {
      if (mounted && d) {
        brightness.current = new Float32Array(d.countries.length)
        setData(d)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  // Write one country's colour range for a given brightness (0..1).
  const paint = (idx, b) => {
    const c = data.countries[idx]
    const arr = data.geometry.getAttribute('color').array
    const r = FAINT[0] + (BRIGHT[0] - FAINT[0]) * b
    const g = FAINT[1] + (BRIGHT[1] - FAINT[1]) * b
    const bl = FAINT[2] + (BRIGHT[2] - FAINT[2]) * b
    const end = (c.start + c.count) * 3
    for (let i = c.start * 3; i < end; i += 3) {
      arr[i] = r
      arr[i + 1] = g
      arr[i + 2] = bl
    }
  }

  const setHover = (idx) => {
    const prev = hovered.current
    if (idx === prev) return
    hovered.current = idx
    if (prev >= 0) active.current.add(prev)
    if (idx >= 0) {
      active.current.add(idx)
      const c = data.countries[idx]
      setTooltip({ name: c.name, pos: c.centroid })
    } else {
      setTooltip(null)
    }
  }

  // Raycast the invisible sphere → local point → [lng,lat] → country index.
  const pick = () => {
    const sphere = sphereRef.current
    const group = groupRef.current
    if (!sphere || !group || !data) return -1
    raycaster.current.setFromCamera(ndc.current, camera)
    hits.current.length = 0
    raycaster.current.intersectObject(sphere, false, hits.current)
    const hit = hits.current[0]
    if (!hit) return -1
    scratch.current.copy(hit.point)
    group.worldToLocal(scratch.current).normalize()
    const [lng, lat] = unitToLngLat(scratch.current)
    return findCountry(data.countries, lng, lat)
  }

  const navigate = (idx) => {
    if (idx < 0 || !data) return
    const c = data.countries[idx]
    // Prefer a real curated Knowledge Object — full navigation via the canonical
    // pipeline (resolveNode → pushLevel → existing flyTo → CameraRig).
    const existing = resolveNode(c.name)
    if (existing) {
      useStore.getState().pushLevel(existing)
      return
    }
    // No curated destination yet: a camera-only centroid fly that brings the
    // country to centre and STAYS in Globe Mode. We create NO placeholder/stub
    // destination — we only ask Earth (which owns the globe rotation) to focus
    // the centroid. When LocationContextBuilder later yields a real Knowledge
    // Object for this country, the resolveNode → pushLevel branch above handles
    // it with no change here.
    const [lng, lat] = geoCentroid(c.feature)
    window.dispatchEvent(new CustomEvent('country-focus', { detail: { lat, lng } }))
  }

  // Native pointer listeners (throttled raycast happens in the frame loop). These
  // sit alongside Earth's own drag handlers without interfering.
  useEffect(() => {
    const el = gl.domElement
    const setNdcFrom = (e) => {
      const rect = el.getBoundingClientRect()
      ndc.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )
      hasPointer.current = true
    }
    const onMove = (e) => setNdcFrom(e)
    const onDown = (e) => {
      pointerDown.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = (e) => {
      const start = pointerDown.current
      pointerDown.current = null
      if (!start) return
      // Never accept a country click while the globe is spinning (Surprise Me) or
      // while a real navigation is in flight — exploration input must not race
      // travel. (The canvas is also pointer-locked during flight, but this makes
      // the intent explicit and robust regardless of that.)
      if (spinBusy.current || useStore.getState().isFlying) return
      // A drag (globe rotation) must not count as a country click.
      if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) return
      if (!groupRef.current?.visible) return
      setNdcFrom(e)
      navigate(pick())
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
    }
    // navigate/pick close over `data`; re-bind when it loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, data])

  // Observe the surprise spin lifecycle (existing events — no new state) so hover
  // and clicks are suppressed for its duration. Bound once; independent of `data`.
  useEffect(() => {
    const onSpin = () => {
      spinBusy.current = true
    }
    const onSpinDone = () => {
      spinBusy.current = false
    }
    window.addEventListener('surprise-spin', onSpin)
    window.addEventListener('surprise-spin-complete', onSpinDone)
    return () => {
      window.removeEventListener('surprise-spin', onSpin)
      window.removeEventListener('surprise-spin-complete', onSpinDone)
    }
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    if (!group || !data) return

    // Follow the Earth's orientation exactly (spin, drag, fly-to) so borders stay
    // glued to the landmasses — this module never drives the camera itself.
    // Re-find if never found or if Earth swapped its fallback→textured mesh.
    if (!earthRef.current || !earthRef.current.parent) earthRef.current = findEarthMesh(scene)
    if (earthRef.current) group.quaternion.copy(earthRef.current.getWorldQuaternion(quat.current))

    // Boundaries are useful only while viewing the Earth. Beyond the threshold we
    // just stop rendering (geometry is preserved) and stop interacting.
    const visible = camera.position.z > VISIBLE_Z
    group.visible = visible

    if (visible && hasPointer.current && !spinBusy.current && !useStore.getState().isFlying) {
      const now = state.clock.elapsedTime
      if (now - lastCheck.current > CHECK_INTERVAL) {
        lastCheck.current = now
        setHover(pick())
      }
    } else if (hovered.current !== -1) {
      setHover(-1)
    }

    // Smoothly transition only the countries whose brightness is still changing.
    if (active.current.size) {
      for (const i of active.current) {
        const target = i === hovered.current ? 1 : 0
        let b = brightness.current[i] + (target - brightness.current[i]) * 0.18
        if (Math.abs(target - b) < 0.01) {
          b = target
          active.current.delete(i)
        }
        brightness.current[i] = b
        paint(i, b)
      }
      data.geometry.getAttribute('color').needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {data && (
        <lineSegments geometry={data.geometry}>
          <lineBasicMaterial vertexColors transparent opacity={0.6} depthWrite={false} />
        </lineSegments>
      )}
      {/* Single invisible raycast target — never per-country meshes. Rendered but
          draws nothing (colorWrite/depthWrite off) so it stays reliably
          raycastable across three versions while remaining fully invisible. */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
      {tooltip && (
        <Html position={tooltip.pos} center style={{ pointerEvents: 'none' }} zIndexRange={[30, 0]}>
          <div
            style={{
              transform: 'translateY(-18px)',
              padding: '5px 12px',
              borderRadius: 999,
              background: 'rgba(10,14,24,0.62)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.92)',
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            {tooltip.name}
          </div>
        </Html>
      )}
    </group>
  )
}
