# Umzug zu Mittwald – Schritt für Schritt

Website samt Kundenportal laufen künftig als Container `website` im Mittwald-Stack
„entwicklerhaus“, neben dem Datenbank-Container `pgvector` (PostgreSQL 18 + pgvector).
Bis zum Umschalten bleibt alles Bisherige unverändert live (Vercel + Supabase).

Mit **(prüfen)** markierte Stellen ließen sich aus der Mittwald-Dokumentation nicht sicher
klären – bitte in mStudio nachsehen, bevor du dich darauf verlässt.

**Übersicht der Reihenfolge**

1. Image bauen und in eine Registry legen
2. Dienst `website` im Stack anlegen
3. Testadresse (project.space) verbinden und vollständig testen
4. Sicherung einrichten und Wiederherstellung einmal üben
5. Umschalten: TTL senken → finaler Export/Import → Domain umstellen
6. Nach dem Umschalten aufräumen
7. Nach 14 Tagen stabilem Betrieb: Supabase und Vercel löschen

Voraussetzungen: Docker lokal, mittwald-CLI `mw` (angemeldet mit `mw login token`),
Zugriff auf mStudio.

---

## 1. Image bauen und bereitstellen

Mittwald baut keine Images aus dem Quellcode; der Container startet ein fertiges Image aus
einer Registry.

Immer aus einem **sauberen Git-Stand** bauen (keine lokalen Entwürfe, keine `.env`-Dateien):

```bash
git clone --branch mittwald-migration https://github.com/joka21/dasEntwicklerhaus.git /tmp/eh-build
cd /tmp/eh-build
docker build -t dasentwicklerhaus:<version> .      # <version> z. B. 2026-11-01-1
```

Zum `BETTER_AUTH_SECRET` beim Build: Next lädt beim Build die Server-Module, und Better Auth
verlangt dabei ein Secret. Das Dockerfile setzt dafür **nur im Build-Schritt** einen
Platzhalter (keine `ENV`-Anweisung). Er steht nicht im fertigen Image (geprüft) und wird zur
Laufzeit durch das echte Secret aus mStudio ersetzt. Das echte Secret gehört nie in den Build.

Registry – eine der beiden Varianten:

- **GitHub Container Registry** (privat):
  `docker tag dasentwicklerhaus:<version> ghcr.io/joka21/dasentwicklerhaus:<version>` und
  `docker push …` (vorher `docker login ghcr.io` mit einem GitHub-Token mit `write:packages`).
  **Gewählt: GHCR, privat.**
  In Mittwald die Zugangsdaten hinterlegen:
  `mw registry create --description "GitHub" --uri ghcr.io --username joka21`
  (Token mit `read:packages`) **(prüfen, ob ghcr.io so angebunden wird)**.
- **Eigene Registry im Projekt** mit dem Image `mittwald/registry:3` (Mittwald-Anleitung
  „Managing and deploying containerized applications“).

Feste Versions-Tags verwenden, nicht `latest` – dann ist der Rückweg auf eine ältere Version
nur ein Tag-Wechsel.

**Wichtig – nicht vorzeitig nach `main` mergen:** Vercel baut `main` automatisch. Der neue
Stand braucht `DATABASE_URL`, `BETTER_AUTH_SECRET` usw., die es auf Vercel nicht gibt – ein
Merge vor dem Umschalten würde das Live-Portal auf Vercel stilllegen und den Rückweg
verbauen. Das Image daher vom Branch `mittwald-migration` bauen und erst nach dem
Umschalten mergen, nachdem das automatische Deployment in Vercel abgeschaltet ist.

## 2. Dienst `website` im Stack anlegen

1. Inhalt von `docker-compose.mittwald.yml` (Dienst `website`, Volume `portal-dateien`) in die
   docker-compose des Stacks übernehmen.
2. Platzhalter ersetzen – echte Werte nur in mStudio bzw. in der Stack-Datei auf deinem
   Rechner, nie im Repository:
   - `DATABASE_URL`: Benutzer/Passwort der bestehenden Datenbank im Dienst `pgvector`,
     Datenbank `entwicklerhaus`
   - `BETTER_AUTH_SECRET`: neu erzeugen (`openssl rand -base64 32`), danach nicht mehr ändern
     (sonst sind alle abgemeldet)
   - `BETTER_AUTH_URL`: zunächst die Testadresse aus Schritt 3
   - SMTP-Zugangsdaten wie bisher (Vercel), `PORTAL_MAIL_FROM`, `PORTAL_ADMIN_EMAIL`
3. Ausrollen: `mw stack deploy` (liest `./docker-compose.yml`).
4. Logs ansehen: `mw container logs <container-id>` – erwartet:
   `Migrationen aktuell (2 eingespielt).` und `✓ Ready`.

Datenbank-Migrationen laufen beim Start automatisch (`DB_MIGRATIONEN_BEIM_START=1`, bereits
eingespielte werden übersprungen). Manuell: `mw container exec <container-id> node tools/migrieren.mjs`.

Werkzeuge im Container (`mw container exec <container-id> …`):

| Befehl | Zweck |
|---|---|
| `node tools/migrieren.mjs` | Migrationen einspielen |
| `node tools/admin-anlegen.mjs <email> ["Name"]` | Admin anlegen bzw. vorhandenen Nutzer zum Admin machen |
| `node tools/import.mjs <exportordner> [--ausfuehren]` | Datenübernahme aus dem Supabase-Export |
| `node tools/pruefen.mjs` | Passen Datenbank und Entwurfsdateien zusammen? |

Falls Uploads mit „Permission denied“ scheitern: Der Container läuft als Nutzer `app`
(UID 1001); das Volume muss für ihn beschreibbar sein **(prüfen, wie Mittwald Volumes
einhängt)**.

## 3. Testadresse und vollständiger Test

1. In mStudio unter **Domains** eine Subdomain der Projektadresse anlegen, z. B.
   `neu.p-XXXXXX.project.space`, und mit dem Container verbinden:
   `mw domain virtualhost create --hostname neu.p-XXXXXX.project.space --path-to-container /:<container-uid>:3000/tcp`
   (TLS übernimmt der Mittwald-Ingress).
2. `BETTER_AUTH_URL` auf `https://neu.p-XXXXXX.project.space` setzen,
   `mw container update <container-id> --recreate`.
3. Daten für den Test: entweder ein Probe-Import des aktuellen Supabase-Exports (wie in
   Schritt 5.3) oder Testdaten über den Admin-Bereich. **Vor dem finalen Import wird die
   Datenbank wieder geleert** (Schritt 5.3).
4. Ersten Admin anlegen: `mw container exec <container-id> node tools/admin-anlegen.mjs <deine-adresse>`
   – in Supabase gab es **keinen** Admin (`portal_admins` war leer).

Testliste (alles auf der Testadresse):

- [ ] Startseite, Angebotsseiten, Städteseiten, Blog, Projekte, Impressum, Datenschutz laden; Bilder werden angezeigt
- [ ] Kontaktformular: Mail kommt bei `admin@dasentwicklerhaus.de` an
- [ ] `/login`: Anmeldelink kommt an, Link öffnet die Bestätigungsseite, „Jetzt anmelden“ führt ins Portal
- [ ] Admin-Bereich: Kunde anlegen, Person einladen (Einladung kommt an), Projekt anlegen, Entwurf hochladen (auch eine Datei mit einigen MB)
- [ ] Als eingeladene Person: Projekt sehen, Entwurf öffnen, kommentieren (Mail an dich), freigeben (Mail an dich)
- [ ] Als Admin: antworten (Hinweis-Mail an den Kunden), Freigabe zurücksetzen, Entwurf löschen, Person entfernen
- [ ] Container neu erstellen (`mw container recreate <container-id>`): Entwürfe sind noch da, Anmeldung gilt weiter
- [ ] `node tools/pruefen.mjs` meldet „passen zusammen“

## 4. Sicherung und Wiederherstellung

**Was gesichert wird**

| Daten | Sicherung |
|---|---|
| Datenbank `entwicklerhaus` | Databasus (SQL-Dumps) |
| Entwürfe im Volume `portal-dateien` (`/data/portal`) | **nicht** von Databasus. Laut Mittwald-Doku sind alle Volumes (Projekt- und Stack-Volumes) Teil des automatischen Projektbackups. |

In mStudio unter **Backups** prüfen **(prüfen)**:
- Wie oft und wie lange wird gesichert?
- Lässt sich ein einzelnes Volume (oder eine einzelne Datei) wiederherstellen, oder nur das ganze Projekt?

**Zusätzlicher Cronjob (empfohlen, wenn das Projektbackup nur gesamt wiederherstellbar ist
oder zu selten läuft):** ein kleiner Begleit-Container, der die Entwürfe täglich zur selben
Uhrzeit wie der Databasus-Dump als Archiv in das Projekt-Volume schreibt. So gibt es zu
jedem Datenbank-Dump einen passenden Dateistand.

```yaml
  portal-backup:
    image: alpine:3
    command: >-
      sh -c 'echo "15 3 * * * tar -czf /sicherung/portal-$$(date +\%Y\%m\%d).tar.gz -C /data portal &&
      find /sicherung -name \"portal-*.tar.gz\" -mtime +30 -delete" | crontab - && crond -f'
    volumes:
      - portal-dateien:/data/portal:ro
      - /home/p-XXXXXX/sicherung/portal:/sicherung     # Projekt-Volume (Pfad in mStudio prüfen)
```

Uhrzeit an die Databasus-Zeit anpassen, 30 Tage Aufbewahrung nach Bedarf.

**Datenbank und Dateien gemeinsam wiederherstellen**

Datenbank und Dateien gehören zusammen: Eine Variante in der Datenbank zeigt auf eine Datei
(`storage_path`).

1. Website stoppen: `mw container stop <website-id>`.
2. Datenbank aus Databasus auf einen Zeitpunkt **T** zurückspielen.
3. Dateien auf den Stand **T oder kurz danach** zurückspielen (Projektbackup bzw. Archiv
   `portal-JJJJMMTT.tar.gz` nach `/data/portal` entpacken). Ein etwas neuerer Dateistand ist
   unkritisch: Er enthält höchstens zusätzliche, verwaiste Dateien.
4. Website starten: `mw container start <website-id>`.
5. `mw container exec <website-id> node tools/pruefen.mjs`
   - „Varianten ohne Datei“: Datei fehlt – aus einem anderen Backup holen oder den Entwurf im
     Admin-Bereich löschen und neu hochladen.
   - „Dateien ohne Variante“: unkritisch, können gelöscht werden.

Die Wiederherstellung einmal mit der Testadresse durchspielen, bevor echte Kundendaten
darin liegen.

## 5. Umschalten

### 5.1 DNS: wo und was

Die Nameserver der Domain sind `ns01.agenturserver.de`, `.co` und `.it` – die DNS-Zone wird
also **bei Mittwald verwaltet** (mStudio → Domains → dasentwicklerhaus.de → DNS **(prüfen,
ob die Zone im mStudio oder noch im alten Kundencenter liegt)**).

Stand 20.10.2026:

| Eintrag | Heute (Vercel) | Nach dem Umschalten |
|---|---|---|
| `dasentwicklerhaus.de` A | `216.150.1.1` | Ziel-IP von Mittwald (zeigt mStudio beim Verbinden der Domain) |
| `www.dasentwicklerhaus.de` CNAME | `cname.vercel-dns.com` | Mittwald-Ziel (A-Eintrag oder CNAME, wie mStudio es vorgibt) |
| MX (`mx1`–`mx4.agenturserver.de`) | Mittwald | **unverändert** |
| TXT `v=spf1 include:agenturserver.de ~all` | | **unverändert** |
| TXT `google-site-verification=…` | | **unverändert** |

TTL heute: 3600 Sekunden (1 Stunde).

**Ändert mStudio die DNS-Einträge beim Verbinden der Domain mit dem Container selbst?**
Nach der Mittwald-Dokumentation **nein – davon nicht ausgehen**:

- A-, AAAA- und MX-Einträge sind bei Mittwald standardmäßig „managed“, zeigen also von selbst
  auf die Mittwald-Plattform. Bei dieser Domain ist der A-Eintrag aber **von Hand
  überschrieben** (Vercel-IP) und `www` ist ein eigener CNAME. Solche eigenen Einträge bleiben
  bestehen, bis man sie ändert oder auf „managed“ zurücksetzt.
- Das Verbinden einer Domain mit dem Container (virtueller Host/Ingress) ist laut CLI-Doku
  ein eigener Schritt; dass dabei DNS-Einträge geändert werden, steht nirgends.

Die Umstellung in 5.4 erfolgt deshalb **ausdrücklich**. Vorher den Ist-Stand ansehen (auch,
ob `www` eine eigene Zone hat):

```bash
mw domain dnszone list -o txt
mw domain dnszone get dasentwicklerhaus.de -o json
mw domain dnszone get www.dasentwicklerhaus.de -o json     # falls vorhanden
```

Die Live-Adresse ist `www.dasentwicklerhaus.de`; `dasentwicklerhaus.de` leitet heute (Vercel)
dorthin weiter. Auf Mittwald übernimmt das die App (Regel in `next.config.mjs`, 301, Pfad und
Query bleiben erhalten). Dafür müssen **beide** Domains mit dem Container verbunden sein und
der Ingress muss den Host-Header unverändert durchreichen – nach dem Umschalten prüfen
(Schritt 5.4).

### 5.2 Am Vortag: TTL senken

TTL der beiden Web-Einträge (A `dasentwicklerhaus.de`, `www`) auf **300** Sekunden senken,
Werte unverändert lassen (in mStudio oder per `mw domain dnszone update … --record <bisheriger
Wert> --ttl 300`). Wirkt erst, wenn die alte TTL (1 Stunde) abgelaufen ist – daher mindestens
einige Stunden vor dem Umschalten, am besten am Vortag.

Am Vortag außerdem schon in mStudio `www.dasentwicklerhaus.de` und `dasentwicklerhaus.de`
als virtuelle Hosts anlegen und mit dem Container `website` (Port 3000) verbinden:

```bash
mw domain virtualhost create --hostname www.dasentwicklerhaus.de --path-to-container /:<container-uid>:3000/tcp
mw domain virtualhost create --hostname dasentwicklerhaus.de --path-to-container /:<container-uid>:3000/tcp
```

Das ändert am Live-Betrieb nichts, solange DNS noch auf Vercel zeigt. Das Zertifikat kann
Mittwald zu diesem Zeitpunkt noch **nicht** ausstellen (siehe 5.4). Falls mStudio für die
Domain eine Bestätigung per TXT-Eintrag verlangt, diesen jetzt setzen **(prüfen)**.

### 5.3 Kurz vor dem Umschalten: finaler Export und Import

Zu einer ruhigen Zeit, damit zwischen Export und Umschalten niemand im alten Portal
kommentiert oder freigibt. Alles, was danach noch in Supabase passiert, fehlt im neuen
System.

1. **Testdaten in der Mittwald-Datenbank entfernen** (der Import verlangt eine leere
   Datenbank):
   ```bash
   mw container exec <pgvector-id> psql -U <benutzer> -d entwicklerhaus -c "truncate auth_user, auth_session, auth_account, auth_verification, portal_admins, portal_clients, portal_client_members, portal_projects, portal_design_variants, portal_variant_comments, portal_project_approvals restart identity cascade"
   mw container exec <website-id> sh -c "rm -rf /data/portal/*"
   ```
2. **Export** (nur lesend, auf deinem Rechner):
   ```bash
   npm run migration:export -- --ausfuehren --ziel C:\migration\supabase-export
   ```
3. **Import in die Mittwald-Datenbank** (im Website-Container, kein Datenbankport nach außen):
   ```bash
   mw container cp C:\migration\supabase-export\<zeitpunkt> <website-id>:/tmp/export
   mw container exec <website-id> node tools/import.mjs /tmp/export               # prüft nur
   mw container exec <website-id> node tools/import.mjs /tmp/export --ausfuehren  # importiert
   ```
   Der **Abgleich je Tabelle** muss in jeder Zeile `OK` zeigen.
4. **Ersten Admin anlegen:** `mw container exec <website-id> node tools/admin-anlegen.mjs <deine-adresse>`
5. **Prüfen:** `mw container exec <website-id> node tools/pruefen.mjs`
6. **Export im Container löschen:** `mw container exec <website-id> rm -rf /tmp/export`

Alternative, falls `mw container cp` nicht geht: `mw container port-forward <pgvector-id> 5432`
und den Import lokal mit `npm run migration:import` gegen den weitergeleiteten Port
ausführen; die Dateien dann mit `mw container cp` nach `/data/portal` kopieren **(prüfen)**.

### 5.4 Domain umstellen

**Zertifikat realistisch:** Mittwald holt das Let's-Encrypt-Zertifikat selbst (lässt sich
nicht abschalten). Let's Encrypt prüft dabei, ob die Domain auf Mittwald zeigt – das
Zertifikat kann also **erst nach der DNS-Umstellung** ausgestellt werden. Dazwischen liegt ein
kurzes Zeitfenster (meist Minuten, nicht garantiert), in dem Besucher, deren DNS schon auf
Mittwald zeigt, eine **Zertifikatswarnung** sehen oder die Seite nicht laden können. Andere
landen wegen gespeicherter DNS-Antworten (TTL 300) noch einige Minuten auf Vercel – beides
gleichzeitig ist normal.

Deshalb: **ruhige Uhrzeit wählen** (z. B. früher Morgen oder Sonntagabend), direkt im
Anschluss an 5.3, und Zeit für Rückweg einplanen.

1. **DNS umstellen** – MX und TXT nicht anfassen:
   - A `dasentwicklerhaus.de`: eigenen Eintrag `216.150.1.1` durch die Mittwald-IP ersetzen –
     entweder auf „managed“ zurücksetzen
     (`mw domain dnszone update dasentwicklerhaus.de a --managed`) oder die IP aus mStudio
     (Projekt-Übersicht bzw. Domain-Ansicht) eintragen
     (`mw domain dnszone update dasentwicklerhaus.de a --record <mittwald-ip> --ttl 300`).
   - `www.dasentwicklerhaus.de`: CNAME `cname.vercel-dns.com` entfernen und auf Mittwald
     zeigen lassen – je nach Ist-Stand aus 5.1 in der Zone `www.dasentwicklerhaus.de`
     `mw domain dnszone update www.dasentwicklerhaus.de cname --unset` und danach
     `… a --managed`, oder einen A-Eintrag mit der Mittwald-IP **(prüfen, wie mStudio `www`
     führt)**.
2. **Gleich danach** `BETTER_AUTH_URL=https://www.dasentwicklerhaus.de` setzen und
   `mw container update <website-id> --recreate` (die Anmeldelinks zeigen ab dann auf www).
3. **Zertifikat beobachten:** `mw domain virtualhost list` bzw.
   `mw domain virtualhost get <ingress-id> -o json` zeigt den TLS-/ACME-Zustand und
   DNS-Fehler des Ingress (u. a. „Frist für die Zertifikatsanforderung überschritten“).
   Prüfen mit `curl -sI https://www.dasentwicklerhaus.de` – kein Zertifikatsfehler mehr.
   Ist nach etwa **30 Minuten** noch kein gültiges Zertifikat da: Rückweg (5.5) und Ursache
   in Ruhe klären.
4. **Prüfen** (sobald das Zertifikat da ist):
   - `nslookup www.dasentwicklerhaus.de` und `nslookup dasentwicklerhaus.de` zeigen auf Mittwald
   - `https://www.dasentwicklerhaus.de` lädt mit gültigem Zertifikat;
     `https://dasentwicklerhaus.de` leitet mit 301 auf www weiter (Zertifikat auch für die
     Adresse ohne www)
   - Login per Magic Link (Link zeigt auf `https://www.dasentwicklerhaus.de/login/bestaetigen`)
   - Kontaktformular, ein Entwurf als Kunde, Admin-Bereich
   - Mailempfang für `@dasentwicklerhaus.de` funktioniert weiterhin (MX unverändert)
5. In der Google Search Console prüfen, ob die Seite erreichbar ist (die
   Verifizierungsdateien liegen weiterhin in `public/`).

### 5.5 Rückweg, falls nach dem Umschalten etwas nicht funktioniert

Möglich, solange Vercel und Supabase noch bestehen (daher erst nach 14 Tagen löschen, siehe 7).

1. DNS zurückstellen: A `dasentwicklerhaus.de` → `216.150.1.1`
   (`mw domain dnszone update dasentwicklerhaus.de a --record 216.150.1.1 --ttl 300`),
   `www` CNAME → `cname.vercel-dns.com`. Dank TTL 300 wirkt das nach wenigen Minuten; das
   Vercel-Zertifikat besteht weiter, es gibt also kein neues Zertifikatsfenster.
   Die Domains im Vercel-Projekt **nicht entfernen**, solange der Rückweg offen sein soll.
2. Die alte Website auf Vercel arbeitet weiter mit Supabase – dort ist der Stand vom finalen
   Export.
3. Was Kunden in der Zwischenzeit auf Mittwald kommentiert oder freigegeben haben, fehlt in
   Supabase: im Admin-Bereich auf Mittwald (neueste Kommentare, Freigaben) nachsehen und von
   Hand nachtragen.
4. Anmeldelinks, die Mittwald verschickt hat, funktionieren auf Vercel nicht – Kunden fordern
   dort einen neuen an.
5. Ursache auf der Testadresse beheben und den Umschalt-Ablauf ab 5.3 wiederholen (Mittwald-
   Datenbank vorher leeren).

Kleinere Fehler im neuen Image ohne DNS-Rückweg: vorheriges Image-Tag setzen,
`mw container update <website-id> --image <registry>/dasentwicklerhaus:<alte-version> --recreate`.

## 6. Nach erfolgreichem Umschalten aufräumen

Erst wenn 5.4 vollständig geprüft ist:

1. **Supabase-Datenbankpasswort zurücksetzen** (Supabase-Dashboard → Settings → Database →
   Reset database password). Es stand im Klartext in einem Chat. Die alte Website auf Vercel
   nutzt es nicht (sie arbeitet mit API-Keys), der Rückweg bleibt also möglich.
2. **`SUPABASE_DB_URL` aus `.env.local` löschen**, ebenso `SUPABASE_SERVICE_ROLE_KEY`.
3. **Exportordner löschen** – sie enthalten echte Kundendaten:
   - `C:\migration\supabase-export` und `C:\migration\ablage-import`
   - `.supabase-export/` im Projekt (Probelauf, nur erfundene Daten)
   - lokale Datenbanken:
     `docker compose -f docker-compose.dev.yml exec pgvector psql -U entwicklerhaus -d postgres -c "drop database if exists entwicklerhaus_import" -c "drop database if exists entwicklerhaus_probe" -c "drop database if exists supabase_nachbau" -c "drop database if exists entwicklerhaus_container"`
4. TTL der Web-Einträge wieder auf 3600 setzen.

## 7. Nach 14 Tagen stabilem Betrieb

1. **Supabase-Projekt löschen** (vorher bei Bedarf einen letzten Export als Archiv behalten –
   außerhalb von OneDrive und verschlüsselt).
2. **Vercel-Projekt löschen** (damit entfallen auch die Domain-Einträge dort).
3. Supabase-Code und -Pakete aus dem Projekt entfernen (`@supabase/ssr`,
   `@supabase/supabase-js`, `src/lib/supabase/`, Supabase-Variablen) – nach Rückfrage.

---

## Datenübernahme im Detail

### Export (nur lesend)

Zugangsdaten in `.env.local` (nie einchecken):

| Variable | Woher |
|---|---|
| `SUPABASE_DB_URL` | Supabase-Dashboard → **Connect** → „Session pooler“ (Port 5432) oder „Direct connection“. Nicht den Transaction-Pooler (Port 6543). |
| `NEXT_PUBLIC_SUPABASE_URL` | steht schon drin |
| `SUPABASE_SERVICE_ROLE_KEY` | steht schon drin; wird nur für GET auf die privaten Dateien genutzt |

```bash
npm run migration:export                                              # zeigt nur, was passieren würde
npm run migration:export -- --ausfuehren --ziel C:\migration\supabase-export
```

- Immer einen Ordner **außerhalb von OneDrive** angeben; ohne `--ziel` landet der Export in
  `.supabase-export/` im Projekt (in `.gitignore`, aber im OneDrive-Ordner).
- Inhalt: `manifest.json` (Zählung je Tabelle, Dateiliste mit SHA-256), `tabellen/` (portal_*
  und die zugehörigen Benutzer), `alt/` (projects, blog_posts, contact_submissions – nur
  Sicherung, wird nicht übernommen), `dateien/` (Bucket design-proposals).
- Schutz: Sitzung schreibgeschützt (`SET SESSION CHARACTERISTICS … READ ONLY`), alle Abfragen
  in einer Read-only-Transaktion (vor der ersten Datenabfrage geprüft), Dateien nur per GET.

### Import

Verlangt eine leere Zieldatenbank und läuft alles-oder-nichts: Schlägt etwas fehl, bleibt die
Datenbank leer und kopierte Dateien werden wieder entfernt. Prüfsummen jeder Datei werden
kontrolliert; Dateinamen, die nicht zur Pfadregel passen, werden umbenannt. Am Ende steht der
Abgleich je Tabelle.

Lokaler Probelauf in eine eigene, leere Datenbank:

```bash
docker compose -f docker-compose.dev.yml exec pgvector psql -U entwicklerhaus -d postgres -c "create database entwicklerhaus_import"
export DATABASE_URL=postgres://entwicklerhaus:entwicklerhaus_dev@localhost:5432/entwicklerhaus_import
export PORTAL_STORAGE_PATH='C:\migration\ablage-import'
npx drizzle-kit migrate
npm run migration:import -- <exportordner>               # prüft nur
npm run migration:import -- <exportordner> --ausfuehren  # importiert
```

Den ganzen Ablauf ohne Supabase und mit erfundenen Daten zeigt
`bash scripts/migration/probelauf/probelauf.sh`.
