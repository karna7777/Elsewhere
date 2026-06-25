import { TextureLoader, SRGBColorSpace } from 'three'

const loader = new TextureLoader()
const cache = new Map()

export function loadSafeTexture(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url))
  }

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = SRGBColorSpace
        cache.set(url, texture)
        resolve(texture)
      },
      undefined,
      (error) => {
        console.warn(
          `[Elsewhere] Texture failed to load: ${url}`,
          error?.message || error
        )
        reject(new Error(`Could not load ${url}`))
      }
    )
  })
}

export const loadDownscaledTexture = loadSafeTexture

export function loadSafeTextures(urls) {
  const list = Array.isArray(urls) ? urls : [urls]
  return Promise.all(list.map((url) => loadSafeTexture(url)))
}
