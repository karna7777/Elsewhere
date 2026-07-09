import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all network interfaces so tunnels (ngrok) and other devices on
    // the LAN can reach the dev server.
    host: true,
    // Disable Vite's host-header check so requests coming through an ngrok domain
    // aren't rejected with "Blocked request. This host is not allowed."
    // (Dev only — never ship this to a public production server.)
    allowedHosts: true,
  },
})
