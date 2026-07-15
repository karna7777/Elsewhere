import { memo, useEffect, useMemo, useState } from 'react'
import { useWeather } from '../../../hooks/useWeather'
import Chapter from './Chapter'

// ── Sunset / golden hour (compact SunCalc port) ──────────────────────────────
// Accurate enough for a "golden hour" window; returns a UTC Date or null (polar
// day/night). Only ever shown when the location has a valid IANA timezone.
const rad = Math.PI / 180
const dayMs = 86400000
const J1970 = 2440588
const J2000 = 2451545
const e = rad * 23.4397

const toDays = (d) => d.valueOf() / dayMs - 0.5 + J1970 - J2000
const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d)
const eclipticLongitude = (M) =>
  M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + Math.PI
const declination = (l) => Math.asin(Math.sin(e) * Math.sin(l))
const J0 = 0.0009
const approxTransit = (Ht, lw, n) => J0 + (Ht + lw) / (2 * Math.PI) + n
const solarTransitJ = (ds, M, L) => J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)

function sunsetDate(date, lat, lng) {
  try {
    const lw = rad * -lng
    const phi = rad * lat
    const d = toDays(date)
    const n = Math.round(d - J0 - lw / (2 * Math.PI))
    const ds = approxTransit(0, lw, n)
    const M = solarMeanAnomaly(ds)
    const L = eclipticLongitude(M)
    const dec = declination(L)
    const h = -0.833 * rad
    const arg = (Math.sin(h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))
    if (arg < -1 || arg > 1) return null
    const w = Math.acos(arg)
    const a = approxTransit(w, lw, n)
    const Jset = solarTransitJ(a, M, L)
    const out = new Date((Jset - J1970 + 0.5) * dayMs)
    return Number.isNaN(out.valueOf()) ? null : out
  } catch {
    return null
  }
}

function validZone(tz) {
  if (!tz || typeof tz !== 'string' || !tz.includes('/')) return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

function fmtTime(date, tz) {
  try {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(date)
  } catch {
    return null
  }
}

const STYLES = `
  .atmo-strip {
    max-width: var(--content-max); margin: 8px auto 0; padding: 0 48px;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1px; background: rgba(255,255,255,0.09);
    border: 1px solid rgba(255,255,255,0.09); border-radius: 20px; overflow: hidden;
  }
  @media (max-width: 560px) { .atmo-strip { padding: 0 20px; grid-template-columns: 1fr 1fr; } }
  .atmo-cell {
    padding: 30px 32px; background: rgba(10,14,26,0.5); min-height: 120px;
    display: flex; flex-direction: column; justify-content: center; gap: 12px;
  }
  .atmo-label {
    font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em;
    color: var(--gold);
  }
  .atmo-value { font-size: 26px; font-weight: 400; line-height: 1.15; color: #fff; letter-spacing: -0.01em; }
  .atmo-sub { font-size: 14px; color: rgba(255,255,255,0.55); text-transform: capitalize; }
`

// AtmosphereChapter — "What's it like right now?" A calm strip of live signals:
// weather, best season, this evening's golden hour, and the local time. Each cell
// only appears when its data is real; the chapter collapses if none are.
function AtmosphereChapter({ location }) {
  const { weather } = useWeather(location?.lat, location?.lng)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const tz = location?.timezone
  const zoneOk = validZone(tz)

  const golden = useMemo(() => {
    if (location?.lat == null || location?.lng == null || !zoneOk) return null
    const sunset = sunsetDate(new Date(), location.lat, location.lng)
    if (!sunset) return null
    const start = new Date(sunset.valueOf() - 50 * 60000)
    const a = fmtTime(start, tz)
    const b = fmtTime(sunset, tz)
    return a && b ? `${a} – ${b}` : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id, zoneOk])

  const localTime = zoneOk ? fmtTime(now, tz) : null

  const cells = []
  if (weather) {
    cells.push({
      key: 'weather',
      label: 'Right now',
      value: (
        <span>
          {weather.icon} {weather.temp != null ? `${weather.temp}°C` : ''}
        </span>
      ),
      sub: weather.description || null,
    })
  }
  if (location?.bestSeason) cells.push({ key: 'season', label: 'Best season', value: location.bestSeason })
  if (golden) cells.push({ key: 'golden', label: 'Golden hour', value: golden })
  if (localTime) cells.push({ key: 'time', label: 'Local time', value: localTime })

  if (!cells.length) return null

  return (
    <Chapter id="atmosphere" kicker="What's it like right now" title="Atmosphere">
      <style>{STYLES}</style>
      <div className="atmo-strip">
        {cells.map((c) => (
          <div className="atmo-cell" key={c.key}>
            <span className="atmo-label">{c.label}</span>
            <span className="atmo-value">{c.value}</span>
            {c.sub && <span className="atmo-sub">{c.sub}</span>}
          </div>
        ))}
      </div>
    </Chapter>
  )
}

export default memo(AtmosphereChapter)
