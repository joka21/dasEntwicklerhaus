import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

// Flat Config für die ESLint-CLI (next lint gibt es seit Next 16 nicht mehr).
export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.reference/**']),
  // Kundenportal: Datenbankzugriff nur über src/lib/portal (mit Prüfung in
  // authz.ts) und für den Login über src/lib/auth.ts.
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/lib/db/**', 'src/lib/portal/**', 'src/lib/auth.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/lib/db', '@/lib/db/*', '**/lib/db', '**/lib/db/*', 'drizzle-orm', 'drizzle-orm/*', 'postgres'],
              message: 'Datenbankzugriff nur über src/lib/portal/daten.ts (Prüfung über authz.ts).',
            },
          ],
        },
      ],
    },
  },
])
