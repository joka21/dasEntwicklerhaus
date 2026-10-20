# Migrationsplan Kundenportal: Supabase → PostgreSQL bei Mittwald

Stand: 20.10.2026, Branch `mittwald-migration`. Grundlage: `SUPABASE-INVENTAR.md`.

Zielarchitektur (fest): PostgreSQL 18 + pgvector im Mittwald-Stack „entwicklerhaus“
(`pgvector:5432`, Datenbank `entwicklerhaus`, nur über `DATABASE_URL`), Drizzle ORM mit
postgres.js und drizzle-kit, Better Auth mit Magic-Link-Plugin und Drizzle-Adapter,
Zugriffsregeln zentral in `src/lib/portal/authz.ts`, Dateien unter `PORTAL_STORAGE_PATH`,
später Next.js als Container im selben Stack.

Betroffen ist nur das Kundenportal (`/login`, `/portal/*`) und was es braucht. Website,
Projekte, Blog und Kontaktformular bleiben unverändert. Supabase wird nicht verändert.

---

## 1. Abbildung Supabase → Zielarchitektur

| Supabase heute | Ziel | Phase |
|---|---|---|
| Postgres (Supabase Cloud), 7 Tabellen `portal_*` | Postgres 18 bei Mittwald, Drizzle-Schema `src/lib/db/schema.ts`, Migrationen in `drizzle/` | 1 |
| `auth.users` (FK-Ziel) | Better-Auth-Tabelle `user` (dazu `session`, `account`, `verification`) | 1 / 2 |
| Spalten-Defaults `auth.uid()` (`author_id`, `approved_by`) | Kein DB-Default mehr; der Server setzt die ID des angemeldeten Nutzers | 1 / 3 |
| `gen_random_uuid()` | bleibt (Postgres-eigen) | 1 |
| Rollen `anon`/`authenticated`, `grant`s auf Spalten | Entfällt; die App verbindet sich mit einem DB-Benutzer. Welche Spalten gesetzt werden, bestimmt allein der Server-Code (nur `body` bzw. `variant_id`) | 3 |
| RLS-Policies + Hilfsfunktionen `portal_private.*` | Funktionen in `src/lib/portal/authz.ts`, je Policy eine (siehe Abschnitt 3) | 3 |
| Schema `portal_private` | Entfällt | 1 |
| Constraints (PK, FK, unique, check) | bleiben 1:1 in der Datenbank (sie sind keine RLS, sondern Datenintegrität) | 1 |
| `@supabase/ssr` Server-Client (`src/lib/supabase/server.ts`) | `src/lib/db/index.ts` (Drizzle + postgres.js) und `src/lib/auth.ts` (Better Auth) | 1 / 2 |
| Proxy: `supabase.auth.getUser()` | `auth.api.getSession()` im Proxy (Next 16 Proxy läuft in Node.js, DB-Zugriff möglich) | 2 |
| `signInWithOtp({ shouldCreateUser: false })` | Magic-Link-Plugin mit `disableSignUp: true` – nur vorhandene Nutzer erhalten einen Link | 2 |
| `verifyOtp` per Button auf `/login/bestaetigen` (Schutz vor Link-Scannern) | Bleibt so: Der Link in der Mail führt auf `/login/bestaetigen?token=…`, erst der Button löst den Token serverseitig ein (Server Action ruft Better Auth auf) | 2 |
| `signOut` | `auth.api.signOut` | 2 |
| Mailversand der Links über Supabase (Custom SMTP) | `sendMagicLink` → bestehendes `src/lib/mail.ts` (nodemailer, `SMTP_*`), Vorlagen aus `supabase/templates` übernommen | 2 |
| Einladung im Dashboard („Invite user“) | Admin-Bereich: Nutzer anlegen + Magic Link verschicken | 5 |
| Bucket `design-proposals` (privat, 4 MB, nur HTML) | Verzeichnis unter `PORTAL_STORAGE_PATH`, Pfad `<project_id>/<datei>.html` bleibt | 4 |
| Storage-Policy + `fetch` auf `/storage/v1/object/authenticated/…` | Route `/portal/[projekt]/entwurf/[variante]` liest nach authz-Prüfung aus dem Dateisystem und streamt | 4 |
| Upload im Dashboard | Upload im Admin-Bereich | 5 |
| Table Editor (Kunden, Projekte, Varianten, Freigabe zurücksetzen) | Admin-Bereich `/portal/admin` | 5 |
| Datenbestand | Export-/Import-Skripte in `scripts/migration/` | 6 |
| Hosting Vercel | Container im Mittwald-Stack, `output: "standalone"` | 7 |

pgvector: Die Erweiterung wird per Migration angelegt (`CREATE EXTENSION IF NOT EXISTS vector`),
das Portal selbst nutzt sie nicht.

---

## 2. Betroffene Dateien

### Ändern

| Datei | Änderung | Phase |
|---|---|---|
| `src/proxy.ts` | Supabase raus, Better-Auth-Sitzung prüfen | 2 |
| `src/app/login/page.tsx` | Sitzungsprüfung über Better Auth | 2 |
| `src/app/login/actions.ts` | Magic Link anfordern/einlösen, Logout über Better Auth | 2 |
| `src/app/login/bestaetigen/page.tsx` | Parameter `token` statt `token_hash`/`type` | 2 |
| `src/app/portal/layout.tsx` | Sitzung über Better Auth | 2 |
| `src/app/portal/page.tsx` | Projektliste über Daten-Modul + authz | 3 |
| `src/app/portal/[projekt]/page.tsx` | Projekt, Varianten, Kommentare, Freigabe über Daten-Modul + authz | 3 |
| `src/app/portal/[projekt]/actions.ts` | Kommentieren/Freigeben über Daten-Modul + authz | 3 |
| `src/app/portal/[projekt]/entwurf/[variante]/route.ts` | Datei aus `PORTAL_STORAGE_PATH` | 4 |
| `src/lib/mail.ts` | Zusätzlich Mail an beliebige Empfänger (Magic Link); `sendAdminMail` bleibt | 2 |
| `.env.local.example` → `.env.example` | einzige Platzhalter-Datei mit allen Variablen | 1 |
| `package.json` | neue Pakete, Skripte (`db:generate`, `db:migrate`, `test`) | 1–3 |
| `eslint.config.*` | Regel: `@/lib/db` nur in `src/lib/portal/**` und `src/lib/auth.ts` importierbar | 3 |
| `next.config.*` | `output: "standalone"` | 7 |

### Neu

| Datei | Zweck | Phase |
|---|---|---|
| `docker-compose.dev.yml` | lokaler Postgres (`pgvector/pgvector:pg18`) | 1 |
| `drizzle.config.ts`, `drizzle/*.sql` | drizzle-kit-Konfiguration und Migrationen | 1 |
| `src/lib/db/index.ts`, `src/lib/db/schema.ts` | DB-Verbindung, Schema (Portal + Better Auth) | 1 |
| `src/lib/auth.ts` | Better-Auth-Konfiguration | 2 |
| `src/lib/portal/authz.ts` | alle Zugriffsregeln | 3 |
| `src/lib/portal/daten.ts` | alle Portal-Abfragen, jede ruft authz auf | 3 |
| `src/lib/portal/*.test.ts` | Tests der Regeln gegen echte Test-Datenbank | 3 |
| `src/lib/portal/speicher.ts` | Lesen/Schreiben unter `PORTAL_STORAGE_PATH` mit Pfadprüfung | 4 |
| `src/app/portal/admin/**` | Admin-Bereich | 5 |
| `scripts/migration/export-supabase.ts`, `import.ts` | Datenübernahme | 6 |
| `scripts/admin-anlegen.ts` | ersten Admin anlegen (siehe Abschnitt 4) | 2 / 5 |
| `Dockerfile`, `.dockerignore`, `docker-compose.mittwald.yml` (Ergänzung), `DEPLOY.md` | Container | 7 |

### Später entfernen (erst nach Rückfrage, Phase 7)

`src/lib/supabase/server.ts`, `@supabase/ssr`, `@supabase/supabase-js`, Supabase-Variablen,
`supabase/` (Migration und Vorlagen ggf. als Archiv behalten).

### Unverändert

`src/components/portal/*` (reine UI; ggf. kleine Prop-Anpassungen), alles außerhalb des
Portals.

---

## 3. RLS-Policies → authz-Modul

Grundprinzip:

- Jede Seite/Action/Route holt zuerst den **Betrachter** (`Viewer = { userId, email, istAdmin }`)
  aus der Better-Auth-Sitzung. Ohne Sitzung: kein Viewer → kein Zugriff (401/Redirect).
- Datenbankzugriffe im Portal stehen ausschließlich in `src/lib/portal/daten.ts`. Jede
  Funktion dort nimmt den Viewer entgegen und ruft die passende authz-Funktion auf bzw.
  filtert die Abfrage mit derselben Bedingung. Eine ESLint-Regel verhindert direkte
  DB-Importe an anderen Stellen.
- Lesen fremder Daten liefert wie bisher „nicht gefunden“ (404), nicht „verboten“, damit
  niemand erkennt, ob ein Projekt existiert.

| # | Bisherige Policy | Bisherige Regel | Geplante authz-Funktion | Prüfung |
|---|---|---|---|---|
| 1 | `portal_admins` (keine Policy) | Für die App unsichtbar | `istAdmin(userId)` | Wird nur intern zur Ermittlung des Viewers gelesen; keine Funktion gibt die Admin-Liste an Kunden heraus. Verwaltung nur im Admin-Bereich (Regel 11). |
| 2 | `portal_clients_select` | Admin oder Mitglied des Kunden | `darfKundeLesen(viewer, clientId)` | `viewer.istAdmin` oder Zeile in `portal_client_members (clientId, viewer.userId)` |
| 3 | `portal_client_members_select` | Eigene Mitgliedschaft oder Admin | `darfMitgliedschaftLesen(viewer, userId)` | `userId === viewer.userId` oder `viewer.istAdmin`; Abfragen filtern auf `user_id = viewer.userId`, außer für Admins |
| 4 | `portal_projects_select` | Admin oder Mitglied des Kunden des Projekts | `darfProjektLesen(viewer, projectId)`; Liste: `sichtbareProjekte(viewer)` | Admin: alle; sonst Join auf `portal_client_members` mit `user_id = viewer.userId` |
| 5 | `portal_design_variants_select` | Zugriff aufs Projekt | `darfProjektLesen(viewer, variante.projectId)` | wie 4, über die Projekt-ID der Variante |
| 6 | `portal_variant_comments_select` | Zugriff aufs Projekt der Variante | `darfProjektLesen(viewer, projektIdDerVariante)` | wie 4 |
| 7 | `portal_variant_comments_insert` | Nur Kundenmitglied des Projekts (nicht Admin); `author_id` = eigener User; nur Spalten `variant_id`, `body` | `darfKommentieren(viewer, variantId)` | Mitglied des Kunden des Projekts (Admin-Status allein reicht nicht); Insert setzt `author_id = viewer.userId` serverseitig, nur `variant_id` und `body` kommen aus dem Formular |
| 8 | `portal_project_approvals_select` | Zugriff aufs Projekt | `darfProjektLesen(viewer, projectId)` | wie 4 |
| 9 | `portal_project_approvals_insert` | Nur Kundenmitglied; `approved_by` = eigener User; nur `project_id`, `variant_id`; zweite Freigabe scheitert am PK | `darfFreigeben(viewer, projectId, variantId)` | Mitglied des Kunden; Variante gehört zum Projekt (zusätzlich durch zusammengesetzten FK in der DB); `approved_by = viewer.userId` serverseitig; PK `project_id` bleibt in der DB |
| 10 | `portal_design_proposals_select` (Storage) | Datei nur lesbar, wenn als Variante eines zugänglichen Projekts registriert | `darfEntwurfLesen(viewer, variantId)` | Variante laden, `darfProjektLesen`; Dateipfad **nur** aus `storage_path` der DB, nie aus der URL; Pfad muss innerhalb von `PORTAL_STORAGE_PATH` liegen |
| – | kein `update`/`delete` für `authenticated` | Kunden ändern/löschen nichts | – | Es gibt schlicht keine Kunden-Funktionen zum Ändern/Löschen |
| 11 | neu (ersetzt Dashboard/service_role) | – | `mussAdminSein(viewer)` | Jede Admin-Seite und -Action prüft `viewer.istAdmin`; sonst 404 |

Tests (Phase 3) je Regel: erlaubter Zugriff, Zugriff durch fremden Kunden, Zugriff ohne
Login; bei 7 und 9 zusätzlich „Admin darf nicht kommentieren/freigeben“ und „zweite
Freigabe scheitert“.

---

## 4. Admin-Rechte – Vorschlag

**Empfehlung: Tabelle `portal_admins` beibehalten** (FK auf `user.id`), wie heute.

- Entspricht 1:1 dem Bestand, Übernahme aus Supabase ohne Umdeutung.
- Admin-Status steht in der Datenbank, nicht in einer veränderbaren Benutzerspalte; ein
  Fehler in einer „Profil bearbeiten“-Funktion kann niemanden zum Admin machen.
- Kein zusätzliches Plugin nötig.
- Erster Admin: einmalig per Skript `scripts/admin-anlegen.ts <email>` (legt Nutzer an
  und trägt ihn in `portal_admins` ein); danach im Admin-Bereich nicht änderbar, nur per
  Skript – Admins sind selten.

Verworfen:
- *Better-Auth-Admin-Plugin (`role`-Spalte):* bringt viele Funktionen mit, die wir nicht
  brauchen (Bannen, Impersonation), und verlagert die Rolle in die Benutzertabelle.
- *E-Mail-Liste in einer Umgebungsvariable:* einfach, aber Änderungen brauchen ein
  Redeployment, und `PORTAL_ADMIN_EMAIL` ist schon als Empfänger belegt.

Kunden anlegen künftig: Admin-Bereich → E-Mail eingeben → Nutzer wird angelegt, dem
Kunden zugeordnet und erhält einen Magic Link (Einladung). Offene Registrierung bleibt aus
(`disableSignUp: true`).

---

## 5. Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Vergessene Prüfung zeigt fremde Daten (RLS war das Sicherheitsnetz) | Alle Abfragen nur in `daten.ts`, ESLint-Sperre für DB-Importe, Tests je Regel, Review in Phase 3 |
| Magic-Link-Einlösung per GET verbraucht Token durch Link-Scanner | Mail-Link zeigt auf eigene Bestätigungsseite, Einlösung erst per Button (wie heute) |
| Better-Auth-IDs sind standardmäßig Text, Bestand nutzt UUIDs | IDs als UUID erzeugen lassen und beim Import die Supabase-User-IDs übernehmen; Typ der FK-Spalten passend wählen (in Phase 1 festlegen) |
| Ablaufzeit Magic Link (Better Auth Standard: 5 Min, heute 1 Std.) | `expiresIn` auf 1 Stunde setzen (Mailtext sagt „eine Stunde“) |
| Pfad-Traversal beim Datei-Lesen/Upload | Pfad nur aus DB, Normalisierung + Prüfung „liegt unter `PORTAL_STORAGE_PATH`“, Dateinamen beim Upload selbst vergeben |
| Dateien im Container gehen verloren | Persistentes Volume für `PORTAL_STORAGE_PATH`, Backup einplanen (DEPLOY.md) |
| Mail-Flut durch Login-Anfragen | Eigene Grenze: höchstens 3 Anmeldelinks pro Adresse in 15 Minuten (gezählt in `auth_verification`); das Rate-Limit von Better Auth greift bei direkten `auth.api`-Aufrufen nicht |
| Übergangszeit: Vercel-Previews erreichen die Mittwald-DB nicht (intern) | Portal lokal testen; Live-Portal läuft bis zum Umzug weiter mit Supabase |
| Supabase-Einstellungen außerhalb des Repos (SMTP, Redirect-URLs) | Vor Phase 6 im Dashboard nachsehen, nichts ändern |
| Alt-Tabellen `projects`, `blog_posts`, `contact_submissions` | Nur Sicherung in Phase 6, keine Übernahme |
| Kein Test-Framework im Projekt | Vitest neu einführen (Phase 3), Tests gegen den lokalen Postgres-Container |

---

## 6. Entscheidungen (Freigabe Phase 0, 20.10.2026)

1. Neue `.env.example` als einzige Platzhalter-Datei; `.env.local.example` wird entfernt.
2. Tests mit Vitest gegen eine eigene Testdatenbank im lokalen Postgres-Container.
3. Uploadgrenze für Entwürfe: 10 MB.
4. Absender der Portal-Mails: `PORTAL_MAIL_FROM`, Fallback `SMTP_USER`.
5. Das Live-Portal bleibt bis zum Umzug auf Vercel mit Supabase; der neue Stand ist nur lokal testbar.
6. Admin-Bereich unter `/portal/admin`.
7. Admin-Rechte über `portal_admins` + Skript für den ersten Admin; Magic Link 1 Stunde gültig;
   Einlösung erst per Button auf der Bestätigungsseite.

## 7. Abweichungen in der Umsetzung

- **Phase 2 – kein öffentlicher Better-Auth-Handler (`/api/auth/*`):** Anmelden, Einlösen und
  Abmelden laufen nur über Server Actions mit `auth.api`. Es gibt damit keinen GET-Endpunkt,
  der den Token beim Aufruf des Links verbraucht, und weniger Angriffsfläche.
- **Phase 2 – Mail-Grenze selbst umgesetzt** statt Rate-Limit von Better Auth (siehe Risiken).
- **Phase 2 – Mailpit** in `docker-compose.dev.yml` fängt lokal alle Mails ab.
- **Phase 3 – `src/lib/portal/viewer.ts`:** ermittelt den Viewer aus der Sitzung (getrennt von
  authz.ts, damit die Regeln ohne Next.js testbar sind).
- **Phase 3 – `@types/node` auf ^22:** Vitest 5 setzt mindestens die Typen für Node 22 voraus.
- **Phase 3 – Entwurfs-Route:** Rechteprüfung schon über authz; das Lesen der Datei folgt in Phase 4
  (bis dahin 404 für alle Entwürfe).
- **Phase 5 – Ergänzung (Freigabe Phase 3):** Admins können auf Kommentare antworten; ihre
  Kommentare werden als Admin gekennzeichnet. Regel 7 wird dafür um Admins erweitert.
  Freigeben (Regel 9) bleibt ausschließlich Kundenmitgliedern vorbehalten.
- **Phase 7 – vorgemerkt (Freigabe Phase 4):** Den in Phase 4 übersprungenen Symlink-Test im
  Linux-Container ausführen und das Ergebnis berichten. In DEPLOY.md beschreiben, wie das Volume
  `PORTAL_STORAGE_PATH` gesichert wird (Databasus sichert nur die Datenbank; Mittwald-Projektbackup
  prüfen, ggf. zusätzlicher Cronjob) und wie Datenbank und Dateien gemeinsam wiederhergestellt werden.
- **Phase 5 – Umsetzung:** Admin-Bereich `/portal/admin` (Übersicht Kunden/Personen/Projekte,
  neueste Kommentare, Formulare: Kunde anlegen, Person einladen, Projekt anlegen, Entwurf hochladen).
  Daten in `src/lib/portal/admin.ts`, jede Funktion prüft Regel 11. Antworten schreiben Admins auf
  der Projektseite; gekennzeichnet über `portal_admins` (kein neues Feld). Admin-Antworten lösen
  keine Benachrichtigung an `PORTAL_ADMIN_EMAIL` aus. `serverActions.bodySizeLimit` und
  `proxyClientMaxBodySize` auf 11 MB (Uploads bis 10 MB).
- **Phase 5 – Ergänzungen (Freigabe Phase 5):** Migration 0001 `portal_variant_comments.is_admin`
  (beim Speichern gesetzt, bestehende Admin-Kommentare befüllt). Admin-Antwort schickt allen Personen
  des Kunden einen Hinweis mit Link (ohne Antworttext, einzeln adressiert). Admin-Bereich: Person
  entfernen (ohne weiteren Kunden und kein Admin: Sitzungen beendet), Freigabe zurücksetzen und
  Entwurf löschen (jeweils mit Bestätigungshäkchen; freigegebene Entwürfe nicht löschbar).
- **Phase 6 – Umsetzung:** `scripts/migration/` (export-supabase.ts nur lesend, import.ts mit
  import-lib.ts, Abgleich je Tabelle). Probelauf ohne Supabase über
  `scripts/migration/probelauf/` (nachgestellte Quelle mit Original-Migration, Speicher-Nachbau nur
  GET). Exportordner `/.supabase-export/` in .gitignore. Dateinamen außerhalb der Pfadregel werden
  beim Import umbenannt.
- **Phase 7 – Umsetzung:** `output: 'standalone'`, mehrstufiges Dockerfile (node:22-alpine, Nutzer
  `app`, Werkzeuge migrieren/pruefen/admin-anlegen/import als gebündelte .mjs, Migrationen beim
  Start), `.dockerignore`, `docker-compose.mittwald.yml` (Dienst website, Volume portal-dateien),
  DEPLOY.md vollständig (Build, Registry, Stack, Testadresse, Sicherung/Wiederherstellung,
  Umschalt-Ablauf mit DNS und Rückweg, Aufräumen, Löschen nach 14 Tagen). Symlink-Test unter
  Linux ausgeführt (bestanden, Gegenprobe schlägt an).
