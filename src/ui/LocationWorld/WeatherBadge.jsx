import { memo } from 'react'
import useWeather from '../../hooks/useWeather'

// Pure presentational glass pill. All fetching/caching/aborting lives in
// useWeather. Renders nothing until weather is available, and disappears
// silently on any error (never a fallback string).
function WeatherBadge({ lat, lng }) {
  const { weather, error } = useWeather(lat, lng)

  if (error || !weather) return null

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '7px 14px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: 'white',
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      {/* live indicator */}
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#4ade80',
          boxShadow: '0 0 8px 1px rgba(74,222,128,0.8)',
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 15 }}>{weather.icon}</span>
      {weather.temp != null && <span style={{ fontWeight: 500 }}>{weather.temp}°C</span>}
      {weather.description && (
        <span style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>
          {weather.description}
        </span>
      )}
    </div>
  )
}

export default memo(WeatherBadge)
