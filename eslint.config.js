import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // eslint-plugin-react-hooks v7 ships the opt-in React Compiler rules in its
      // recommended set. This project does NOT use the React Compiler and leans
      // heavily on React Three Fiber, whose model *requires* mutating live objects
      // (mesh.rotation, material.uniforms, geometry attributes) inside useFrame and
      // seeding geometry with Math.random(). The Compiler's purity/immutability
      // rules flag those legitimate R3F patterns as errors, so they are disabled.
      // The essential hook rules (rules-of-hooks, exhaustive-deps) stay on.
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      // The "reset local state when the id prop changes" pattern (clearing a stale
      // image before the next fetch resolves) is intentional and safe here.
      'react-hooks/set-state-in-effect': 'off',
      // Fast-Refresh hint, not a correctness issue — a couple of modules export a
      // small helper beside their component. Keep it visible as a warning.
      'react-refresh/only-export-components': 'warn',
    },
  },
])
