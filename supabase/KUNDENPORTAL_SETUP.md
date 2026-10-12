# Kundenportal – Einrichtung

## 1. Supabase-Projekt

Das Portal läuft im bestehenden Projekt **„das entwicklerhaus“**. Alle Portal-Objekte
tragen das Präfix `portal_` (Tabellen, Constraints, Indizes, Policies; Hilfsfunktionen im
Schema `portal_private`). Die vorhandenen Tabellen `projects`, `blog_posts` und
`contact_submissions` sowie das Schema `private` werden nicht angefasst.

- Region prüfen (Settings → General): für Kundendaten sollte es **Central EU (Frankfurt),
  eu-central-1** sein. Die Region eines bestehenden Projekts lässt sich nicht ändern.
- Migration einspielen: Inhalt von `migrations/20261012180000_portal.sql` im SQL-Editor
  ausführen. `supabase db push` nur, wenn die Migrationshistorie des Projekts mit dem
  Ordner `supabase/migrations` übereinstimmt.
- Falls die Storage-Policy mit „must be owner of table objects“ scheitert: Policy
  `portal_design_proposals_select` unter Storage → Policies mit demselben Ausdruck anlegen.

**Achtung – die Schritte 2 bis 5 gelten für das ganze Projekt**, nicht nur für das
Portal. Falls die Website oder ein anderes Tool schon Supabase Auth nutzt (z. B. Logins
für Blog oder Kontaktverwaltung), vorher prüfen, ob die Änderungen dort etwas stören –
vor allem „Allow new users to sign up: aus“ und die Mail-Vorlagen.

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
2. Table Editor → `portal_clients`: Kunde anlegen.
3. `portal_client_members`: `client_id` + `user_id` (aus der Users-Liste) eintragen.
4. `portal_projects`: `client_id`, `slug` (nur `a-z`, `0-9`, `-`), `title`, optional `description`.

## 7. Design-Varianten hochladen

1. Storage → Bucket `design-proposals` → Ordner mit der **Projekt-ID** (uuid) anlegen.
2. HTML-Datei hochladen (nur `text/html`, max. 4 MB – Vercel liefert Antworten
   über 4,5 MB nicht aus; große Bilder vorher komprimieren).
3. `portal_design_variants`: `project_id`, `title`, `storage_path` = `<projekt-id>/<datei>.html`,
   optional `description`, `sort_order`.

Dateien ohne Eintrag in `portal_design_variants` sind für Kunden nicht abrufbar.

## 8. Admin

Eigenen Nutzer einladen und in Tabelle `portal_admins` eintragen (`user_id`). Admins sehen
alle Projekte, kommentieren und freigeben können nur Kunden.

Freigabe zurücksetzen: Zeile in `portal_project_approvals` löschen.

## 9. Vercel

Umgebungsvariablen (Production + Preview):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `PORTAL_ADMIN_EMAIL` (Empfänger der Benachrichtigungen),
optional `SMTP_SECURE=true` für Port 465. Ohne `PORTAL_ADMIN_EMAIL` werden keine
Benachrichtigungen verschickt (nur ein Hinweis im Log).

`SUPABASE_SERVICE_ROLE_KEY` wird vom Portal nicht benutzt.

Functions-Region `fra1` ist in `vercel.json` gesetzt.
