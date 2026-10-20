# Supabase-Inventar – dasentwicklerhaus.de

Stand: 20.10.2026, Branch `main`. Reine Analyse des Codes in diesem Repository; am
Supabase-Projekt selbst (Dashboard, Live-Datenbank) wurde nichts abgefragt. Werte aus
`.env`-Dateien sind bewusst nicht enthalten.

**Kurz vorweg:** Supabase wird ausschließlich vom **Kundenportal** (`/login`, `/portal/*`)
genutzt. Showcase (Projekte, Blog) und Kontaktformular verwenden Supabase im Code nicht.

---

## 1. Clients und Konfiguration

### Stellen, an denen ein Client erzeugt wird

| Art | Datei | Bemerkung |
|---|---|---|
| Server (SSR, Cookie-Sitzung) | `src/lib/supabase/server.ts` | `createServerClient` aus `@supabase/ssr` mit Publishable Key; alle Abfragen laufen unter RLS mit der Sitzung des Nutzers. Wird in allen Portal- und Login-Dateien verwendet. |
| Server (Proxy/Middleware) | `src/proxy.ts` | Eigener `createServerClient` zum Erneuern der Sitzung und Schutz von `/portal/*` (Next 16 „proxy“). |
| Browser-Client | – | **Keiner.** Es gibt keinen `createBrowserClient`; alles läuft serverseitig. |
| Admin-Client (service_role) | – | **Keiner.** Die Verwaltung läuft über das Supabase-Dashboard. |
| Direkter REST-Aufruf | `src/app/portal/[projekt]/entwurf/[variante]/route.ts` | `fetch` auf `…/storage/v1/object/authenticated/…` mit dem Access Token des Nutzers (kein Client, aber Supabase-API). |

### Umgebungsvariablen (nur Namen)

| Variable | Verwendet im Code | Zweck |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ja (3 Stellen) | Projekt-URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ja (3 Stellen) | Publishable Key (öffentlich, RLS-geschützt) |
| `SUPABASE_SERVICE_ROLE_KEY` | **nein** | steht in `.env.local`, wird laut Code und `KUNDENPORTAL_SETUP.md` nicht benutzt |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | ja | Kontaktformular und Portal-Benachrichtigungen (nodemailer, kein Supabase) |
| `PORTAL_ADMIN_EMAIL` | ja | Empfänger der Portal-Benachrichtigungen |

### Versionen (laut `package-lock.json`)

- `@supabase/supabase-js`: **2.117.3** (`^2.117.3` in `package.json`)
- `@supabase/ssr`: **0.12.7** (`^0.12.7`)

---

## 2. Datenbank

### Migrationen

- **1 Migration** im Repository: `supabase/migrations/20261012180000_portal.sql`
- Laut Kommentar in der Migration und `KUNDENPORTAL_SETUP.md` liegen im selben
  Supabase-Projekt zusätzlich die Tabellen **`projects`, `blog_posts`,
  `contact_submissions`** und ein Schema **`private`**. Deren Struktur ist im Repository
  **nicht dokumentiert (unklar)**, und kein Code in diesem Repository greift darauf zu.
  Ob ein anderes Tool sie nutzt: **unklar**.
- Generierte Typdateien (`database.types.ts` o. ä.): keine vorhanden.

### Tabellen des Portals (Schema `public`)

**`portal_admins`** – wer Admin ist
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `user_id` | uuid | PK, FK → `auth.users(id)` on delete cascade |
| `created_at` | timestamptz | not null, default `now()` |

**`portal_clients`** – Kunde/Firma
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `id` | uuid | PK, default `gen_random_uuid()` |
| `name` | text | not null, 1–200 Zeichen |
| `created_at` | timestamptz | not null, default `now()` |

**`portal_client_members`** – Login ↔ Kunde (n:m)
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `client_id` | uuid | PK (mit `user_id`), FK → `portal_clients(id)` cascade |
| `user_id` | uuid | PK (mit `client_id`), FK → `auth.users(id)` cascade, Index |
| `created_at` | timestamptz | not null, default `now()` |

**`portal_projects`** – Projekt
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `id` | uuid | PK, default `gen_random_uuid()` |
| `client_id` | uuid | not null, FK → `portal_clients(id)` cascade, Index |
| `slug` | text | not null, unique, Muster `^[a-z0-9]+(-[a-z0-9]+)*$` |
| `title` | text | not null, 1–200 Zeichen |
| `description` | text | optional |
| `created_at` | timestamptz | not null, default `now()` |

**`portal_design_variants`** – Design-Variante = HTML-Datei im Storage
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `id` | uuid | PK, default `gen_random_uuid()`; unique (`id`, `project_id`) |
| `project_id` | uuid | not null, FK → `portal_projects(id)` cascade |
| `title` | text | not null, 1–200 Zeichen |
| `description` | text | optional |
| `storage_path` | text | not null, unique; muss mit `<project_id>/` beginnen und auf `.html` enden |
| `sort_order` | integer | not null, default 0; Index (`project_id`, `sort_order`) |
| `created_at` | timestamptz | not null, default `now()` |

**`portal_variant_comments`** – Kommentare
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `id` | uuid | PK, default `gen_random_uuid()` |
| `variant_id` | uuid | not null, FK → `portal_design_variants(id)` cascade; Index (`variant_id`, `created_at`) |
| `author_id` | uuid | **default `auth.uid()`**, FK → `auth.users(id)` set null |
| `body` | text | not null, 1–5000 Zeichen (getrimmt) |
| `created_at` | timestamptz | not null, default `now()` |

**`portal_project_approvals`** – Freigabe (höchstens eine pro Projekt)
| Spalte | Typ | Eigenschaften |
|---|---|---|
| `project_id` | uuid | PK, FK → `portal_projects(id)` cascade |
| `variant_id` | uuid | not null; FK (`variant_id`, `project_id`) → `portal_design_variants(id, project_id)` (Variante muss zum Projekt gehören; freigegebene Variante nicht löschbar) |
| `approved_by` | uuid | **default `auth.uid()`**, FK → `auth.users(id)` set null |
| `approved_at` | timestamptz | not null, default `now()` |

Beziehungen im Überblick:
`portal_clients` 1–n `portal_projects` 1–n `portal_design_variants` 1–n `portal_variant_comments`;
`portal_projects` 1–0..1 `portal_project_approvals`; `portal_clients` n–m `auth.users` über
`portal_client_members`; `portal_admins` 1–1 `auth.users`.

### Postgres-Erweiterungen

- Keine `create extension` in der Migration. `gen_random_uuid()` ist seit Postgres 13
  eingebaut. Kein pgvector, pg_cron, uuid-ossp o. Ä. im Repository.
- Welche Erweiterungen im Supabase-Projekt sonst aktiv sind (Standard-Erweiterungen von
  Supabase, evtl. von den Alt-Tabellen genutzt): **unklar**.

### Funktionen, Trigger, Views

Funktionen im Schema `portal_private` (alle `language sql stable security definer`,
`search_path = ''`, EXECUTE nur für `authenticated`). Sie sind Hilfsfunktionen für RLS und
**keine** RPCs, die die App aufruft:

| Funktion | Liefert |
|---|---|
| `is_admin()` | true, wenn `auth.uid()` in `portal_admins` steht |
| `is_client_member(client_id)` | true, wenn `auth.uid()` Mitglied des Kunden ist |
| `is_project_member(project_id)` | true, wenn `auth.uid()` Mitglied des Kunden des Projekts ist |
| `can_access_project(project_id)` | `is_admin() or is_project_member()` |
| `variant_project_id(variant_id)` | Projekt-ID einer Variante |
| `can_read_design_object(name)` | true, wenn die Datei als Variante eines zugänglichen Projekts registriert ist (für Storage) |

- RPC-Aufrufe (`.rpc(`) im Code: **keine**
- Trigger: **keine**
- Views: **keine**

### Rechte (zusätzlich zu RLS)

- `anon`: kein Zugriff auf Portal-Tabellen.
- `authenticated`: `select` auf alle Portal-Tabellen außer `portal_admins`;
  `insert` nur auf die Spalten `variant_id, body` in `portal_variant_comments` und
  `project_id, variant_id` in `portal_project_approvals`. Kein `update`/`delete`.

### RLS-Policies im Klartext

RLS ist auf allen sieben Tabellen aktiv.

| Tabelle | Policy | Bedeutung |
|---|---|---|
| `portal_admins` | – (bewusst keine) | Für die App unsichtbar; Pflege nur im Dashboard (service_role). |
| `portal_clients` | `portal_clients_select` | Lesen: Admins alle Kunden, sonst nur Kunden, bei denen man Mitglied ist. |
| `portal_client_members` | `portal_client_members_select` | Lesen: eigene Mitgliedschaften; Admins alle. |
| `portal_projects` | `portal_projects_select` | Lesen: Admins alle, sonst nur Projekte des eigenen Kunden. |
| `portal_design_variants` | `portal_design_variants_select` | Lesen: wenn man auf das Projekt zugreifen darf (Admin oder Mitglied). |
| `portal_variant_comments` | `portal_variant_comments_select` | Lesen: wenn man auf das Projekt der Variante zugreifen darf. |
| | `portal_variant_comments_insert` | Schreiben: nur Kundenmitglieder des Projekts (nicht Admins), `author_id` muss der eigene User sein. |
| `portal_project_approvals` | `portal_project_approvals_select` | Lesen: wenn man auf das Projekt zugreifen darf. |
| | `portal_project_approvals_insert` | Freigeben: nur Kundenmitglieder, `approved_by` = eigener User; zweite Freigabe scheitert am PK. Zurücksetzen nur im Dashboard. |
| `storage.objects` | `portal_design_proposals_select` | Datei im Bucket `design-proposals` lesen: nur wenn sie als Variante eines zugänglichen Projekts eingetragen ist. Upload/Löschen nur im Dashboard. |

---

## 3. Auth

- **Login-Methode:** nur **Magic Link / E-Mail-OTP** (`signInWithOtp` mit
  `shouldCreateUser: false`). Kein Passwort-Login, kein OAuth.
- **Bestätigung:** Token-Hash-Verfahren (`verifyOtp({ token_hash, type })`) erst nach
  Klick auf einen Button (Schutz vor Link-Scannern in Mailprogrammen). Erlaubte Typen:
  `email`, `magiclink`, `invite`.
- **Registrierung:** aus; Kunden werden im Dashboard per **„Invite user“** angelegt.

### Fundstellen

| Art | Datei | Was |
|---|---|---|
| Proxy (Middleware) | `src/proxy.ts` | `auth.getUser()`, Sitzung erneuern, `/portal/*` ohne Login → `/login` |
| Server Actions | `src/app/login/actions.ts` | `requestMagicLink` (`signInWithOtp`), `confirmLogin` (`verifyOtp`), `logout` (`signOut`) |
| Callback-Seite | `src/app/login/bestaetigen/page.tsx` | Ziel des Mail-Links, Formular → `confirmLogin` |
| Server Components | `src/app/login/page.tsx`, `src/app/portal/layout.tsx`, `src/app/portal/[projekt]/page.tsx` | `auth.getUser()` |
| Server Actions | `src/app/portal/[projekt]/actions.ts` | `auth.getUser()` vor Kommentar/Freigabe |
| Route Handler | `src/app/portal/[projekt]/entwurf/[variante]/route.ts` | `auth.getUser()` + `auth.getSession()` (Access Token für Storage) |
| Mail-Vorlagen | `supabase/templates/magic-link.html`, `invite.html` | werden im Supabase-Dashboard hinterlegt |

### Rollen/Admin-Rechte

- **Admin:** Eintrag in `portal_admins` (nur über Dashboard). Wirkt ausschließlich in der
  Datenbank über `portal_private.is_admin()` in den RLS-Policies; der App-Code prüft das
  nicht selbst.
- **Kunde:** Eintrag in `portal_client_members`. Die Projektseite fragt diese Tabelle ab,
  um Kommentar- und Freigabe-Formulare nur Kunden zu zeigen.

### Mailversand der Magic Links

- Über **Supabase Auth mit eigenem SMTP** („Custom SMTP“ im Dashboard, laut
  `KUNDENPORTAL_SETUP.md`). Welcher SMTP-Server dort tatsächlich eingetragen ist:
  **unklar** (nicht im Repository).
- Resend: wird nicht verwendet.
- Portal-Benachrichtigungen an den Admin (Kommentar/Freigabe) laufen **nicht** über
  Supabase, sondern über `src/lib/mail.ts` (nodemailer, `SMTP_*`).

---

## 4. Storage

| Bucket | Öffentlich | Limit | Zweck |
|---|---|---|---|
| `design-proposals` | **privat** | 4 MB, nur `text/html` | HTML-Design-Entwürfe für Kunden; Pfad `<project_id>/<datei>.html` |

Weitere Buckets im Supabase-Projekt: **unklar** (im Repository keine).

### Fundstellen

- **Download:** `src/app/portal/[projekt]/entwurf/[variante]/route.ts`. Die Datei wird per
  `fetch` mit dem Access Token des Nutzers geholt und gestreamt (Storage-Policy greift),
  dann mit `sandbox`-CSP ausgeliefert.
- **Upload/Löschen:** nicht im Code; nur manuell im Dashboard.
- **Signierte URLs:** keine.

---

## 5. Weitere Supabase-Dienste

| Dienst | Genutzt | Fundstelle |
|---|---|---|
| Realtime | nein | keine `channel(`/`realtime`-Aufrufe |
| Edge Functions | nein | kein `supabase/functions`, kein `functions.invoke` |
| Database Webhooks | nein (im Repo) | nichts gefunden; im Dashboard: unklar |
| Cron (pg_cron) | nein (im Repo) | nichts gefunden; im Dashboard: unklar |
| Supabase-Dashboard als Admin-Oberfläche | **ja** | Kunden einladen, Tabellen pflegen, Dateien hochladen, Freigaben zurücksetzen (`KUNDENPORTAL_SETUP.md`) |

---

## 6. Abhängigkeitsgrad

**10 Dateien** importieren Supabase direkt oder rufen die Supabase-API auf (davon 9 mit
Datenbank-/Auth-Aufrufen, eine nur für einen Typ-Import).

| Bereich | Dateien |
|---|---|
| Showcase (Projekte, Blog) | **keine** – Inhalte kommen aus `src/data/projects.ts` und `src/data/blog.ts` |
| Kontakt | **keine** – `src/app/api/contact/route.ts` verschickt nur per nodemailer |
| Kundenportal | `src/app/portal/layout.tsx`, `src/app/portal/page.tsx`, `src/app/portal/[projekt]/page.tsx`, `src/app/portal/[projekt]/actions.ts`, `src/app/portal/[projekt]/entwurf/[variante]/route.ts` |
| Kundenportal – Login | `src/app/login/page.tsx`, `src/app/login/actions.ts`, `src/app/login/bestaetigen/page.tsx` (importiert nur die Action, keinen Client) |
| Sonstiges (Infrastruktur) | `src/lib/supabase/server.ts`, `src/proxy.ts` |

Datenbankabfragen insgesamt: rund 10 `.from(…)`-Aufrufe, alle auf `portal_*`-Tabellen,
zwei davon mit Embeds (`portal_projects!inner(…)`, `portal_project_approvals(…)`).

---

## 7. Einschätzung für Weg B (nur PostgreSQL auf Mittwald, Auth und Storage ersetzen)

Annahme: Die Next.js-App bleibt technisch gleich (Server Components/Actions). Ob sie
weiter auf Vercel läuft oder ebenfalls zu Mittwald zieht, ist **unklar** und beeinflusst
Aufwand und Risiko (siehe Risiken).

| Bereich | Was ersetzt werden muss | Aufwand (grob) |
|---|---|---|
| Datenbank-Schema | Migration ohne Supabase-Bezüge: eigene `users`-Tabelle statt `auth.users`; Defaults `auth.uid()` entfernen; Rollen `anon`/`authenticated` und `grant`s neu denken; Bucket-Insert und Storage-Policy streichen | 3–5 h |
| Datenzugriff | `supabase.from(…)` durch einen Postgres-Client (z. B. `postgres`/`pg` oder Drizzle) ersetzen, ca. 10 Abfragen inkl. der zwei Joins; Connection-Handling | 4–6 h |
| Zugriffsregeln (RLS) | Entweder RLS behalten und pro Request `set local app.user_id` in einer Transaktion setzen (Funktionen auf `current_setting` umstellen), oder die Regeln als explizite `where`-Bedingungen in den Code verlagern | 4–8 h |
| Auth | Magic Link selbst bauen oder Bibliothek (z. B. Auth.js Email-Provider, Better Auth Magic-Link-Plugin): Token erzeugen/hashen/ablaufen lassen, Sitzungs-Cookie, Logout, Proxy-Prüfung, Bestätigung per POST beibehalten, keine Selbstregistrierung, Einladungsfluss | 8–14 h |
| Mailversand | Magic-Link- und Einladungsmails über vorhandenes `src/lib/mail.ts` (nodemailer); Vorlagen übernehmen | 1–2 h |
| Storage | HTML-Dateien im Dateisystem bzw. Volume des Containers oder S3-kompatiblem Speicher ablegen; Route liest nach Zugriffsprüfung von dort und streamt weiter | 2–4 h |
| Admin-Oberfläche (Ersatz für das Dashboard) | Minimal: SQL-Client über SSH-Tunnel plus SFTP/Skript für Uploads und Einladungen. Komfortabel: eigene Admin-Seiten (Kunden, Projekte, Varianten-Upload, Einladung, Freigabe zurücksetzen) | 2–4 h (minimal) bzw. 12–20 h (eigene Seiten) |
| Datenumzug | Portal-Tabellen und Nutzer (E-Mail, ID) exportieren und importieren, Dateien aus dem Bucket kopieren; Alt-Tabellen `projects`, `blog_posts`, `contact_submissions` sichten | 2–4 h (+ Alt-Tabellen: unklar) |
| Test und Sicherheitsprüfung | Zugriff fremder Projekte, Admin/Kunde, abgelaufene Links, Datei-Zugriff | 4–6 h |
| **Summe** | | **ca. 30–50 h** mit minimaler Admin-Lösung, **ca. 40–65 h** mit eigenen Admin-Seiten |

### Risiken

- **RLS-Logik wandert in den Code:** Heute schützt die Datenbank auch dann, wenn eine
  Abfrage im Code vergessen wird, auf Projekt oder Nutzer zu filtern. Ohne RLS muss jede
  Abfrage das selbst tun; ein vergessenes `where` zeigt fremde Projekte. RLS mit
  `set local` beizubehalten mindert das, ist aber fehleranfällig bei Connection-Pooling.
- **Eigene Auth ist sicherheitskritisch:** Token-Erzeugung, Einmal-Verwendung, Ablauf,
  Rate-Limit gegen Mail-Fluten, Cookie-Flags und Schutz vor Link-Scannern müssen
  selbst korrekt umgesetzt werden.
- **Wegfall des Dashboards:** Kunden anlegen, Dateien hochladen und Freigaben
  zurücksetzen gehen heute per Klick. Ohne Ersatz wird das Tagesgeschäft umständlicher.
- **Erreichbarkeit der Datenbank:** Bleibt die App auf Vercel, muss Postgres auf Mittwald
  von außen erreichbar sein (TLS, IP-Freigaben, Verbindungsgrenzen bei Serverless-
  Funktionen). Ob und wie Mittwald das für Container anbietet: **unklar**.
- **Datei-Speicher im Container:** Dateien im Container-Dateisystem gehen ohne
  persistentes Volume bei einem Neustart verloren; Backup muss eingeplant werden.
- **Alt-Tabellen und Schema `private`:** Im selben Supabase-Projekt, aber nicht in diesem
  Code. Ob sie noch gebraucht werden oder von einem anderen Tool genutzt werden:
  **unklar** – vor dem Umzug klären.
- **Supabase-Einstellungen außerhalb des Repos** (SMTP, Redirect-URLs, Rate-Limits,
  evtl. Webhooks/Erweiterungen) sind nur teilweise dokumentiert; vor dem Umzug im
  Dashboard prüfen.
