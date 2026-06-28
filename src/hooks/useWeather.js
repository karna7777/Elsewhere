import { useEffect, useState } from 'react'

// Live weather for a coordinate, owned entirely by this hook so UI components
// stay presentational. Resolved results are cached by rounded coordinate, the
// previous request is aborted when coordinates change, and StrictMode's
// double-invoke is harmless (AbortError is swallowed, cache dedups the refetch).
const resolved = new Map() // "lat,lng" -> weather object

const ICON_BY_MAIN = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
  Smoke: '🌫️',
  Dust: '🌫️',
  Sand: '🌫️',
  Tornado: '🌪️',
}

function normalize(data) {
  const main = data.weather?.[0]?.main ?? ''
  return {
    temp: typeof data.main?.temp === 'number' ? Math.round(data.main.temp) : null,
    description: data.weather?.[0]?.description ?? '',
    main,
    icon: ICON_BY_MAIN[main] ?? '🌡️',
  }
}

export function useWeather(lat, lng) {
  const [state, setState] = useState({ loading: false, weather: null, error: null })

  useEffect(() => {
    if (lat == null || lng == null) {
      setState({ loading: false, weather: null, error: 'no-coords' })
      return
    }

    const key = `${lat.toFixed(3)},${lng.toFixed(3)}`
    if (resolved.has(key)) {
      setState({ loading: false, weather: resolved.get(key), error: null })
      return
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY
    if (!apiKey || apiKey === 'your_key') {
      setState({ loading: false, weather: null, error: 'no-key' })
      return
    }

    const controller = new AbortController()
    let alive = true
    setState({ loading: true, weather: null, error: null })

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const weather = normalize(data)
        resolved.set(key, weather)
        if (alive) setState({ loading: false, weather, error: null })
      })
      .catch((err) => {
        if (err.name === 'AbortError' || !alive) return
        setState({ loading: false, weather: null, error: err.message || 'error' })
      })

    // Abort the previous request whenever coordinates change / on unmount.
    return () => {
      alive = false
      controller.abort()
    }
  }, [lat, lng])

  return state
}

export default useWeather
