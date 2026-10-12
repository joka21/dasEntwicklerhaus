# Kundenportal – Einrichtung

## 1. Supabase-Projekt

- Region: **Central EU (Frankfurt), eu-central-1** – lässt sich später nicht ändern.
- Migration einspielen: `supabase link --project-ref <ref>` und `supabase db push`
  oder den Inhalt von `migrations/20261012120000_kundenportal.sql` im SQL-Editor ausführen.

## 2. Authentication → Sign In / Providers

- **Allow new users to sign up: aus** (Kunden werden nur per Einladung angelegt)
- Email-Provider: an, **Confirm email** an
- Passwort-Login wird von der App nicht angeboten

## 3. Authentication → URL Configuration

- **Site URL:** `https://www.dasentwicklerhaus.de` (ohne Schrägstrich am Ende)
- **Redirect URLs** – hier muss jede Domain stehen, von der aus Kunden sich anmelden:
  - `https://www.dasentwicklerhaus.de`
  - Vercel-Preview: `https://*-<vercel-team-slug>.vercel.app`
    (Team-Slug steht in der Preview-URL hinter dem letzten Bindestrich, z. B.
    `dasentwicklerhaus-git-kundenportal-<team>.vercel.app`)
  - Lokal: `http://localhost:3000`

Die App schickt beim Anfordern des Links die aktuelle Domain mit (`emailRedirectTo`).
Steht sie nicht auf der Liste, setzt Supabase stattdessen die Site URL ein – der Link
führt dann auf die Live-Seite, und die Anmeldung auf der Preview klappt nicht.
Einladungen aus dem Dashboard führen immer auf die Site URL.

## 4. Authentication → Emails → SMTP Settings (eigenes SMTP)

| Feld | Wert |
|---|---|
| Enable Custom SMTP | an |
| Sender email | z. B. `portal@dasentwicklerhaus.de` |
| Sender name | `Das Entwicklerhaus` |
| Host | _eintragen_ |
| Port | `587` (STARTTLS) oder `465` (SSL) |
| Username | _eintragen_ |
| Password | _eintragen_ |

Danach unter **Rate Limits** das Limit für E-Mails anheben (mit Standard-SMTP sind es nur 2 pro Stunde).

## 5. Authentication → Emails → Templates

Die Links zeigen auf `{{ .RedirectTo }}/login/bestaetigen` (Token-Hash-Verfahren,
funktioniert auch, wenn der Kunde den Link in einem anderen Browser oder Gerät öffnet).

| Template | Betreff | Inhalt |
|---|---|---|
| Magic Link | `Ihr Anmeldelink für das Kundenportal` | `templates/magic-link.html` |
| Invite user | `Ihr Zugang zum Kundenportal` | `templates/invite.html` |

## 6. Kunden anlegen

1. **Authentication → Users → Invite user** mit der E-Mail-Adresse des Kunden.
2. Table Editor → `clients`: Kunde anlegen.
3. `client_members`: `client_id` + `user_id` (aus der Users-Liste) eintragen.
4. `projects`: `client_id`, `slug` (nur `a-z`, `0-9`, `-`), `title`, optional `description`.

## 7. Design-Varianten hochladen

1. Storage → Bucket `design-proposals` → Ordner mit der **Projekt-ID** (uuid) anlegen.
2. HTML-Datei hochladen (nur `text/html`, max. 4 MB – Vercel liefert Antworten
   über 4,5 MB nicht aus; große Bilder vorher komprimieren).
3. `design_variants`: `project_id`, `title`, `storage_path` = `<projekt-id>/<datei>.html`,
   optional `description`, `sort_order`.

Dateien ohne Eintrag in `design_variants` sind für Kunden nicht abrufbar.

## 8. Admin

Eigenen Nutzer einladen und in Tabelle `admins` eintragen (`user_id`). Admins sehen
alle Projekte, kommentieren und freigeben können nur Kunden.

Freigabe zurücksetzen: Zeile in `project_approvals` löschen.

## 9. Vercel

Umgebungsvariablen (Production + Preview):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `PORTAL_ADMIN_EMAIL` (Empfänger der Benachrichtigungen),
optional `SMTP_SECURE=true` für Port 465. Ohne `PORTAL_ADMIN_EMAIL` werden keine
Benachrichtigungen verschickt (nur ein Hinweis im Log).

`SUPABASE_SERVICE_ROLE_KEY` wird vom Portal nicht benutzt.

Functions-Region `fra1` ist in `vercel.json` gesetzt.
