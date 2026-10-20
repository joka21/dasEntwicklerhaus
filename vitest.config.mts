import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Tests laufen gegen die eigene Testdatenbank im lokalen Container
// (docker-compose.dev.yml legt "entwicklerhaus_test" an), nie gegen die
// Entwicklungsdatenbank. Abweichend per TEST_DATABASE_URL.
const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ?? 'postgres://entwicklerhaus:entwicklerhaus_dev@localhost:5432/entwicklerhaus_test'
// Auch für globalSetup, das im Hauptprozess läuft (test.env gilt nur für die Tests).
process.env.DATABASE_URL = TEST_DATABASE_URL

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['src/**/*.test.ts'],
    env: { DATABASE_URL: TEST_DATABASE_URL },
    globalSetup: ['./src/lib/portal/__tests__/global-setup.ts'],
    // Alle Tests teilen sich eine Datenbank.
    fileParallelism: false,
  },
})
