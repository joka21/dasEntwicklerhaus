# syntax=docker/dockerfile:1
# Website samt Kundenportal als schlanker Container (Next.js standalone).
#
#   docker build -t dasentwicklerhaus .
#
# Laufzeit-Umgebung siehe .env.example und docker-compose.mittwald.yml.
# Am besten aus einem sauberen Git-Stand bauen (keine lokalen Entwürfe in public/).

FROM node:22-alpine AS basis
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# --- Abhängigkeiten (eigene Schicht, wird nur bei geändertem Lockfile neu gebaut)
FROM basis AS abhaengigkeiten
COPY package.json package-lock.json ./
RUN npm ci

# --- Build
FROM basis AS bau
COPY --from=abhaengigkeiten /app/node_modules ./node_modules
COPY . .
# Better Auth prüft beim Laden des Moduls, ob BETTER_AUTH_SECRET gesetzt ist, und
# Next lädt Server-Module beim Build. Deshalb hier ein Platzhalter NUR für den
# Build; er landet nicht im Image (keine ENV-Anweisung) und wird zur Laufzeit
# durch das echte Secret ersetzt. Die Datenbank wird beim Build nicht verbunden.
RUN BETTER_AUTH_SECRET=nur-fuer-den-build-wird-zur-laufzeit-ersetzt \
    DATABASE_URL=postgres://build:build@127.0.0.1:1/build \
    npm run build
# Werkzeuge für den Betrieb (Migrationen, Prüfung DB/Dateien, ersten Admin anlegen, Datenübernahme)
# als eigenständige Dateien – das Laufzeit-Image enthält keine Dev-Abhängigkeiten.
RUN npx esbuild scripts/container/migrieren.ts scripts/container/pruefen.ts scripts/admin-anlegen.ts scripts/migration/import.ts \
    --bundle --platform=node --format=esm --target=node22 --outdir=tools --entry-names=[name] --out-extension:.js=.mjs \
    "--banner:js=import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);"

# --- Laufzeit
FROM node:22-alpine AS laufzeit
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    PORTAL_STORAGE_PATH=/data/portal
RUN addgroup -S -g 1001 app && adduser -S -u 1001 -G app app \
    && mkdir -p /data/portal && chown app:app /data/portal
COPY --from=bau --chown=app:app /app/.next/standalone ./
COPY --from=bau --chown=app:app /app/.next/static ./.next/static
COPY --from=bau --chown=app:app /app/public ./public
COPY --from=bau --chown=app:app /app/drizzle ./drizzle
COPY --from=bau --chown=app:app /app/tools ./tools
COPY --from=bau --chown=app:app /app/scripts/container/start.sh ./start.sh
RUN chmod +x ./start.sh
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/ || exit 1
CMD ["./start.sh"]
