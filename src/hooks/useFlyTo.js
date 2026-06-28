import { useCallback, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { Quaternion, Vector3 } from 'three'
import useStore from '../store/useStore'

const FLIGHT_DURATION = 2.8
const CLOUD_BASE_OPACITY = 0.35
const _vecA = new Vector3()
const _vecB = new Vector3()
const _vecC = new Vector3()
const _point = new Vector3()
const _localDest = new Vector3()
// The camera always lives at (0, 0, z). The globe rotates so that the
// destination faces the camera, i.e., the destination points toward +Z.
const _faceTarget = new Vector3(0, 0, 1)
const _startQuat = new Quaternion()
const _endQuat = new Quaternion()

export const flightCameraPosition = new Vector3()

export function latLngToUnit(lat, lng) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(Math.sin(phi) * Math.cos(theta))
  const y = Math.cos(phi)
  const z = Math.sin(phi) * Math.sin(theta)
  return new Vector3(x, y, z).normalize()
}

function quadraticBezier(t, a, b, c, out) {
  const u = 1 - t
  out.copy(a).multiplyScalar(u * u)
  out.addScaledVector(b, 2 * u * t)
  out.addScaledVector(c, t * t)
  return out
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

function findCloudMesh(scene) {
  let clouds = null
  scene.traverse((obj) => {
    if (
      obj.isMesh &&
      obj.geometry?.type === 'SphereGeometry' &&
      obj.geometry.parameters?.radius === 1.015
    ) {
      clouds = obj
    }
  })
  return clouds
}

export function useFlyTo() {
  const { camera, scene } = useThree()
  const timelineRef = useRef(null)

  const flyTo = useCallback(
    (lat, lng, zoomLevel, duration = FLIGHT_DURATION) => {
      timelineRef.current?.kill()
      timelineRef.current = null

      // Cloud-dip + panel-open beats are choreographed against the default
      // 2.8s flight; scale their timeline positions so the choreography holds
      // for shorter/longer (type-driven) flights without a second system.
      const f = duration / FLIGHT_DURATION

      const earth = findEarthMesh(scene)
      const clouds = findCloudMesh(scene)

      // ── Camera model: globe rotates, camera stays on the +Z axis ─────────
      //
      // The camera never moves off the Z axis. It only changes depth (zoom).
      // The globe quaternion-slerps to bring the destination to face +Z.
      //
      // This means:
      //   - camera.position goes from (0, 0, startZ) to (0, 0, zoomLevel)
      //   - The Bezier arc lifts slightly in Y for a cinematic effect
      //   - camera.lookAt(0,0,0) is called every frame so it always faces the globe
      //   - earth.quaternion slerps so _localDest (destination on globe) → _faceTarget (+Z)
      //
      const startZ = camera.position.z
      _vecA.set(0, 0, startZ)
      _vecC.set(0, 0, zoomLevel)
      _vecB.set(0, 0.8, (startZ + zoomLevel) / 2) // cinematic arc — lift in Y at midpoint

      // ── Globe rotation plan ───────────────────────────────────────────────
      // Compute the quaternion that rotates the globe mesh so that the
      // destination unit vector (in globe-local space) ends up pointing at +Z.
      if (earth) {
        _localDest.copy(latLngToUnit(lat, lng))
        _startQuat.copy(earth.quaternion)
        _endQuat.setFromUnitVectors(_localDest, _faceTarget)
      }

      const flightPos = { t: 0 }
      const { setIsFlying, setCameraZ } = useStore.getState()

      setIsFlying(true)
      useStore.setState({ panelOpen: false })
      window.dispatchEvent(new Event('fly-whoosh'))

      const cloudMaterial = clouds?.material
      const cloudOpacity = { value: cloudMaterial?.opacity ?? CLOUD_BASE_OPACITY }

      const tl = gsap.timeline({
        onUpdate: () => {
          // Advance camera along the Z-axis arc
          quadraticBezier(flightPos.t, _vecA, _vecB, _vecC, _point)
          camera.position.copy(_point)
          flightCameraPosition.copy(_point)

          // Always look at the globe center — critical for correct framing.
          // Without this, camera.quaternion stays at identity (facing −Z) and
          // the globe appears to fly off into empty space.
          camera.lookAt(0, 0, 0)

          // Rotate globe to bring destination to face the camera (+Z)
          if (earth) {
            earth.quaternion.copy(_startQuat).slerp(_endQuat, flightPos.t)
          }
        },
        onComplete: () => {
          // Snap to exact final position to eliminate any floating-point residual
          camera.position.set(0, 0, zoomLevel)
          camera.lookAt(0, 0, 0)
          flightCameraPosition.copy(camera.position)

          // Tell Earth.jsx to zero auto-rotation velocity so the globe
          // does not immediately spin away from the destination
          window.dispatchEvent(new Event('fly-complete'))

          setIsFlying(false)
          setCameraZ(zoomLevel)
          timelineRef.current = null
        },
      })

      tl.to(flightPos, {
        t: 1,
        duration,
        ease: 'power2.inOut',
      })

      if (cloudMaterial) {
        const syncCloudOpacity = () => {
          cloudMaterial.opacity = cloudOpacity.value
        }
        tl.to(
          cloudOpacity,
          {
            value: 0,
            duration: 0.6 * f,
            ease: 'power2.inOut',
            onUpdate: syncCloudOpacity,
          },
          1.2 * f
        )
        tl.to(
          cloudOpacity,
          {
            value: CLOUD_BASE_OPACITY,
            duration: 0.6 * f,
            ease: 'power2.inOut',
            onUpdate: syncCloudOpacity,
          },
          1.8 * f
        )
      }

      tl.call(() => useStore.setState({ panelOpen: true }), null, 2.0 * f)
      timelineRef.current = tl
    },
    [camera, scene]
  )

  return { flyTo }
}
