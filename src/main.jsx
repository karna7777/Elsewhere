import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// A lazily-imported chunk can fail to load when the module graph shifts underneath
// an open tab — Vite re-optimizing deps / restarting in dev, or hashed chunks
// changing after a redeploy in prod. It surfaces as "Failed to fetch dynamically
// imported module". Recover automatically with a single hard reload (guarded by a
// session flag so a genuinely-broken chunk can't loop).
function reloadOnceOnChunkError(reason) {
  const msg = String(reason?.message || reason || '')
  if (!/dynamically imported module|Importing a module script failed|error loading dynamically/i.test(msg)) {
    return
  }
  if (sessionStorage.getItem('chunk-reloaded') === '1') return
  sessionStorage.setItem('chunk-reloaded', '1')
  window.location.reload()
}
window.addEventListener('vite:preloadError', (e) => reloadOnceOnChunkError(e?.payload))
window.addEventListener('unhandledrejection', (e) => reloadOnceOnChunkError(e?.reason))
// Clear the guard once a normal load succeeds, so future shifts can recover again.
window.addEventListener('load', () => sessionStorage.removeItem('chunk-reloaded'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
