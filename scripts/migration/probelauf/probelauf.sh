#!/usr/bin/env bash
# Probelauf von Export und Import – vollständig lokal, ohne Supabase, mit erfundenen Daten.
#
#   bash scripts/migration/probelauf/probelauf.sh
#
# Voraussetzung: lokaler Container läuft (npm run db:up).
# Legt im lokalen Container die Datenbanken supabase_nachbau (Quelle) und
# entwicklerhaus_probe (Ziel) neu an. Die Entwicklungsdatenbank bleibt unberührt.
# Export und Ablage landen unter .supabase-export/probelauf/ (in .gitignore).
set -euo pipefail
cd "$(dirname "$0")/../../.."

PSQL=(docker compose -f docker-compose.dev.yml exec -T pgvector psql -v ON_ERROR_STOP=1 -q -U entwicklerhaus)
LOKAL=postgres://entwicklerhaus:entwicklerhaus_dev@localhost:5432
ORDNER=.supabase-export/probelauf
PORT=54399
SCHLUESSEL=probe-schluessel

echo "== Datenbanken neu anlegen"
"${PSQL[@]}" -d postgres -c "drop database if exists supabase_nachbau" -c "drop database if exists entwicklerhaus_probe" \
  -c "create database supabase_nachbau" -c "create database entwicklerhaus_probe"

echo "== Supabase nachstellen (Grundgerüst, Original-Migration, Testdaten)"
NACHBAU=scripts/migration/probelauf/supabase-nachbau.sql
sed -n '1,/^-- ORIGINAL-MIGRATION/p' "$NACHBAU" | "${PSQL[@]}" -d supabase_nachbau
"${PSQL[@]}" -d supabase_nachbau < supabase/migrations/20261012180000_portal.sql
sed -n '/^-- TESTDATEN/,$p' "$NACHBAU" | "${PSQL[@]}" -d supabase_nachbau

echo "== Schreibschutz der Exportverbindung prüfen (muss scheitern)"
AUSGABE=$(docker compose -f docker-compose.dev.yml exec -T -e PGOPTIONS='-c default_transaction_read_only=on' pgvector \
  psql -q -U entwicklerhaus -d supabase_nachbau -c "insert into public.portal_clients (name) values ('darf nicht')" 2>&1 || true)
if [[ "$AUSGABE" == *"read-only transaction"* ]]; then echo "   OK: Schreiben in schreibgeschützter Verbindung abgelehnt"; else echo "   FEHLER: $AUSGABE"; exit 1; fi

echo "== Bucket-Dateien anlegen und Speicher-Nachbau starten (nur GET)"
rm -rf "$ORDNER"; mkdir -p "$ORDNER/bucket/design-proposals/eeeeeeee-0000-4000-8000-000000000001"
B="$ORDNER/bucket/design-proposals/eeeeeeee-0000-4000-8000-000000000001"
printf '<!doctype html><meta charset="utf-8"><h1>Bäckerei – Variante Grün</h1>' > "$B/Entwurf Grün 1.html"
printf '<!doctype html><meta charset="utf-8"><h1>Bäckerei – Variante Klar</h1>' > "$B/entwurf-klar.html"
printf '<!doctype html><h1>verworfen</h1>' > "$B/alt-verworfen.html"
node scripts/migration/probelauf/speicher-nachbau.mjs "$ORDNER/bucket" $PORT $SCHLUESSEL > "$ORDNER/speicher-anfragen.log" 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 1

echo "== Export (gegen den Nachbau)"
SUPABASE_DB_URL="$LOKAL/supabase_nachbau" NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:$PORT" SUPABASE_SERVICE_ROLE_KEY=$SCHLUESSEL \
  npx tsx scripts/migration/export-supabase.ts --ausfuehren --ziel "$ORDNER/export"
EXPORT=$(ls -d "$ORDNER"/export/*/ | tail -1)
echo "   HTTP-Anfragen an den Speicher:"; sed 's/^/     /' "$ORDNER/speicher-anfragen.log"

echo "== Migrationen ins Ziel"
DATABASE_URL="$LOKAL/entwicklerhaus_probe" npx drizzle-kit migrate > /dev/null

echo "== Import: erst prüfen, dann ausführen"
DATABASE_URL="$LOKAL/entwicklerhaus_probe" PORTAL_STORAGE_PATH="$ORDNER/ablage" npx tsx scripts/migration/import.ts "$EXPORT"
DATABASE_URL="$LOKAL/entwicklerhaus_probe" PORTAL_STORAGE_PATH="$ORDNER/ablage" npx tsx scripts/migration/import.ts "$EXPORT" --ausfuehren

echo "== Zweiter Import muss abgelehnt werden (Ziel nicht leer)"
AUSGABE=$(DATABASE_URL="$LOKAL/entwicklerhaus_probe" PORTAL_STORAGE_PATH="$ORDNER/ablage" npx tsx scripts/migration/import.ts "$EXPORT" --ausfuehren 2>&1 || true)
if [[ "$AUSGABE" == *"nicht leer"* ]]; then echo "   OK: abgelehnt ($(echo "$AUSGABE" | tail -1))"; else echo "   FEHLER: $AUSGABE"; exit 1; fi
