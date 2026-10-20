# Umzug Kundenportal zu Mittwald – Anleitung

> Stand Phase 6. Die Abschnitte zu Container, mStudio, Migrationen auf Mittwald, Domain und
> Sicherung des Volumes folgen in Phase 7.

## Datenübernahme aus Supabase

Supabase wird dabei **nur gelesen**. Es wird dort nichts verändert oder gelöscht.

### 1. Zugangsdaten für den Export eintragen

In `.env.local` (wird nicht eingecheckt):

| Variable | Woher |
|---|---|
| `SUPABASE_DB_URL` | Supabase-Dashboard → **Connect** → „Session pooler“ (Port 5432) oder „Direct connection“. Nicht den Transaction-Pooler (Port 6543). |
| `NEXT_PUBLIC_SUPABASE_URL` | steht schon drin |
| `SUPABASE_SERVICE_ROLE_KEY` | steht schon drin; wird nur für GET auf die privaten Dateien genutzt |

### 2. Export (nur lesend)

```bash
npm run migration:export                 # zeigt nur, was passieren würde
npm run migration:export -- --ausfuehren --ziel <ordner>
```

- Ohne `--ziel` landet der Export in `.supabase-export/<zeitpunkt>/` im Projekt
  (in `.gitignore`, außerhalb von `public/`). **Achtung:** Das Projekt liegt im
  OneDrive-Ordner – ein Export dort wird in die OneDrive-Cloud synchronisiert. Besser einen
  Ordner außerhalb von OneDrive angeben, z. B. `--ziel C:\supabase-export`.
- Inhalt: `manifest.json` (Zählung je Tabelle, Dateiliste mit SHA-256), `tabellen/` (portal_*
  und die zugehörigen Benutzer), `alt/` (projects, blog_posts, contact_submissions – nur
  Sicherung, wird nicht übernommen), `dateien/` (Bucket design-proposals).
- Schutz: Die Datenbankverbindung ist schreibgeschützt (`default_transaction_read_only`), alle
  Abfragen laufen in einer Read-only-Transaktion, Dateien werden nur per GET geholt.

### 3. Probelauf lokal

In eine **eigene, leere** lokale Datenbank importieren, nicht in die Entwicklungsdatenbank:

```bash
docker compose -f docker-compose.dev.yml exec pgvector psql -U entwicklerhaus -d postgres -c "create database entwicklerhaus_import"

# Bash (Git Bash):
export DATABASE_URL=postgres://entwicklerhaus:entwicklerhaus_dev@localhost:5432/entwicklerhaus_import
export PORTAL_STORAGE_PATH=./.supabase-export/ablage-import
npx drizzle-kit migrate
npm run migration:import -- <exportordner>               # prüft nur
npm run migration:import -- <exportordner> --ausfuehren  # importiert
```

Am Ende steht der **Abgleich je Tabelle** (Supabase laut Export gegen neue Datenbank) und eine
Liste umbenannter Dateien, Varianten ohne Datei und Dateien ohne Variante. Jede Zeile muss `OK`
zeigen. Danach das Portal lokal gegen diese Datenbank starten und stichprobenartig prüfen
(Login per Magic Link über Mailpit, Projekte, Entwürfe, Kommentare, Freigaben).

Der Import verlangt eine leere Zieldatenbank und läuft alles-oder-nichts: Schlägt etwas fehl,
bleibt die Datenbank leer und kopierte Dateien werden wieder entfernt.

Den ganzen Ablauf ohne Supabase und mit erfundenen Daten zeigt
`bash scripts/migration/probelauf/probelauf.sh`.

### 4. Import auf Mittwald

Folgt in Phase 7 (gleiches Skript, Ziel ist die Datenbank im Stack „entwicklerhaus“).
Erst danach den ersten Admin prüfen bzw. mit `npm run admin:anlegen` ergänzen – der Import
verlangt eine leere Benutzertabelle.

### 5. Exportordner löschen

**Nach dem erfolgreichen Umzug den Exportordner vollständig löschen** – er enthält echte
Kundendaten (E-Mail-Adressen, Kommentare, Entwürfe, Kontaktanfragen aus `alt/`).

- Ordner aus dem `--ziel` bzw. `.supabase-export/` löschen, ebenso `.supabase-export/ablage-import`.
- Lag der Ordner im OneDrive-Bereich: auch aus dem OneDrive-Papierkorb (online) entfernen.
- Die lokale Probe-Datenbank löschen:
  `docker compose -f docker-compose.dev.yml exec pgvector psql -U entwicklerhaus -d postgres -c "drop database entwicklerhaus_import"`
- `SUPABASE_DB_URL` und `SUPABASE_SERVICE_ROLE_KEY` aus `.env.local` entfernen.
