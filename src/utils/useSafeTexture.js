import { useLoader } from '@react-three/fiber'

import { loadSafeTexture } from '../utils/downscaleTexture'

export function useSafeTexture(input) {
  return useLoader(loadSafeTexture, input)
}
