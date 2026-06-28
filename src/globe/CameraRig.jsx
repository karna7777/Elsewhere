import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useStore from '../store/useStore'
import { flightCameraPosition, useFlyTo } from '../hooks/useFlyTo'
import { DEFAULT_LEVEL, LEVEL_ALTITUDE, LEVEL_DURATION } from '../constants'

function sameDestination(a, b) {
  if (!a || !b) return a === b
  return a.lat === b.lat && a.lng === b.lng && a.name === b.name
}

// Type → camera framing, read from the single source of truth (constants.js).
// Type NEVER changes which UI renders; it only tunes the existing flyTo
// (altitude = final camera z, duration = seconds). Unknown/missing types fall
// back to DEFAULT_LEVEL ('city' = 1.5 / 2.8), preserving the main arrival feel.
function cameraForType(type) {
  return {
    altitude: LEVEL_ALTITUDE[type] ?? LEVEL_ALTITUDE[DEFAULT_LEVEL],
    duration: LEVEL_DURATION[type] ?? LEVEL_DURATION[DEFAULT_LEVEL],
  }
}

export default function CameraRig() {
  const { camera, gl } = useThree()
  const { flyTo } = useFlyTo()
  const setCameraZ = useStore((s) => s.setCameraZ)
  const isFlying = useStore((s) => s.isFlying)
  const panelTweenRef = useRef(null)
  const panelZOverride = useRef(null)
  const prevPanelOpen = useRef(useStore.getState().panelOpen)
  const prevDestination = useRef(useStore.getState().activeDestination)

  useFrame(() => {
    if (isFlying) {
      camera.position.copy(flightCameraPosition)
      camera.lookAt(0, 0, 0)
    } else if (panelZOverride.current != null) {
      camera.position.z = panelZOverride.current
    }
    setCameraZ(camera.position.z)
  }, 1)

  useEffect(() => {
    gl.domElement.style.pointerEvents = isFlying ? 'none' : 'auto'
  }, [isFlying, gl])

  useEffect(() => {
    const unsubDest = useStore.subscribe(
      (state) => state.activeDestination,
      (destination) => {
        if (
          !destination ||
          sameDestination(destination, prevDestination.current) ||
          destination.lat == null ||
          destination.lng == null
        ) {
          prevDestination.current = destination
          return
        }
        prevDestination.current = destination
        // Reuse the EXISTING flyTo pipeline — only altitude + duration vary by type.
        const { altitude, duration } = cameraForType(destination.type)
        flyTo(destination.lat, destination.lng, altitude, duration)
      }
    )

    const unsubPanel = useStore.subscribe(
      (state) => state.panelOpen,
      (panelOpen) => {
        if (prevPanelOpen.current && !panelOpen && !useStore.getState().isFlying) {
          panelTweenRef.current?.kill()
          panelTweenRef.current = gsap.to(camera.position, {
            z: 2.2,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
              panelZOverride.current = camera.position.z
              setCameraZ(camera.position.z)
            },
            onComplete: () => {
              panelZOverride.current = null
              useStore.getState().popBreadcrumb()
              setCameraZ(camera.position.z)
              panelTweenRef.current = null
            },
          })
        }
        prevPanelOpen.current = panelOpen
      }
    )

    return () => {
      unsubDest()
      unsubPanel()
      panelTweenRef.current?.kill()
    }
  }, [camera, flyTo, setCameraZ])

  return null
}
