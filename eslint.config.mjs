import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

// Flat Config für die ESLint-CLI (next lint gibt es seit Next 16 nicht mehr).
export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.reference/**']),
])
