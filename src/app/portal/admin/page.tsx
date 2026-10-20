import Link from 'next/link'
import { notFound } from 'next/navigation'
import Seite from '@/components/portal/PortalSeite'
import { formatDatum } from '@/lib/portal'
import { ladeAdminUebersicht } from '@/lib/portal/admin'
import { aktuellerViewer } from '@/lib/portal/viewer'
import {
  entwurfHochladenAction,
  freigabeZuruecksetzenAction,
  kundeAnlegenAction,
  personEinladenAction,
  personEntfernenAction,
  projektAnlegenAction,
  varianteLoeschenAction,
} from './actions'

const OK: Record<string, string> = {
  kunde: 'Kunde angelegt.',
  einladung: 'Person zugeordnet und Einladung verschickt.',
  projekt: 'Projekt angelegt.',
  entwurf: 'Entwurf hochgeladen.',
  entfernt: 'Person vom Kunden entfernt.',
  'entfernt-abgemeldet': 'Person vom Kunden entfernt. Sie ist keinem Kunden mehr zugeordnet und wurde abgemeldet.',
  'freigabe-zurueck': 'Freigabe zurückgesetzt.',
  'entwurf-geloescht': 'Entwurf gelöscht.',
}

const feld = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
const label = 'block font-medium text-dark mb-1'
const knopf =
  'bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors'
const karte = 'rounded-lg border border-gray-200 bg-white p-6 space-y-4'
const h2 = 'text-h3 lg:text-h3-lg font-bold text-umwelt-800'
const kleinKnopf = 'text-sm text-red-700 underline hover:no-underline'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; fehler?: string }>
}) {
  const uebersicht = await ladeAdminUebersicht(await aktuellerViewer())
  if (!uebersicht) notFound()
  const { kunden, neuesteKommentare } = uebersicht
  const { ok, fehler } = await searchParams
  const projekte = kunden.flatMap((k) => k.projekte.map((p) => ({ ...p, kunde: k.name })))

  return (
    <Seite title="Admin-Bereich">
      {(ok || fehler) && (
        <p
          role={fehler ? 'alert' : 'status'}
          className={`rounded-lg border p-4 ${fehler ? 'border-red-300 text-red-700' : 'border-umwelt-300 text-dark'} bg-white`}
        >
          {fehler ?? OK[ok ?? ''] ?? 'Erledigt.'}
        </p>
      )}

      <section aria-labelledby="kunden" className="space-y-6">
        <h2 id="kunden" className={h2}>
          Kunden und Projekte
        </h2>
        {kunden.length === 0 && <p className="text-dark">Noch keine Kunden angelegt.</p>}
        {kunden.map((k) => (
          <article key={k.id} className={karte}>
            <h3 className="text-h4 lg:text-h4-lg font-semibold text-dark">{k.name}</h3>
            <div>
              <h4 className="font-semibold text-dark mb-1">Personen</h4>
              {k.mitglieder.length === 0 ? (
                <p className="text-secondary">Noch niemand eingeladen.</p>
              ) : (
                <ul className="text-dark space-y-1">
                  {k.mitglieder.map((m) => (
                    <li key={m.userId} className="flex flex-wrap items-baseline gap-x-3">
                      <span>
                        {m.name ? `${m.name} – ` : ''}
                        {m.email}{' '}
                        <span className="text-sm text-secondary">
                          ({m.angemeldet ? 'hat sich schon angemeldet' : 'noch nicht angemeldet'})
                        </span>
                      </span>
                      <form action={personEntfernenAction}>
                        <input type="hidden" name="client_id" value={k.id} />
                        <input type="hidden" name="user_id" value={m.userId} />
                        <button type="submit" className={kleinKnopf}>
                          von {k.name} entfernen
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-dark mb-1">Projekte</h4>
              {k.projekte.length === 0 ? (
                <p className="text-secondary">Noch keine Projekte.</p>
              ) : (
                <ul className="space-y-4 text-dark">
                  {k.projekte.map((p) => (
                    <li key={p.id} className="space-y-2">
                      <p>
                        <Link href={`/portal/${p.slug}`} className="text-primary hover:underline font-medium">
                          {p.title}
                        </Link>{' '}
                        <span className="text-sm text-secondary">
                          · {p.kommentare} {p.kommentare === 1 ? 'Kommentar' : 'Kommentare'}
                          {p.letzterKommentar && ` (zuletzt ${formatDatum(p.letzterKommentar, true)})`} ·{' '}
                          {p.freigabe
                            ? `freigegeben: „${p.freigabe.variantTitle}“ am ${formatDatum(p.freigabe.approvedAt)}${
                                p.freigabe.approvedBy ? ` von ${p.freigabe.approvedBy}` : ''
                              }`
                            : 'noch nicht freigegeben'}
                        </span>
                      </p>
                      {p.freigabe && (
                        <form action={freigabeZuruecksetzenAction} className="flex flex-wrap items-center gap-3 text-sm">
                          <input type="hidden" name="project_id" value={p.id} />
                          <label className="flex items-center gap-2">
                            <input type="checkbox" name="bestaetigt" value="ja" required />
                            Ja, Freigabe zurücksetzen – der Kunde kann danach erneut freigeben
                          </label>
                          <button type="submit" className={kleinKnopf}>
                            Freigabe zurücksetzen
                          </button>
                        </form>
                      )}
                      {p.varianten.length === 0 ? (
                        <p className="text-sm text-secondary">Noch keine Entwürfe.</p>
                      ) : (
                        <ul className="ml-4 space-y-1 text-sm">
                          {p.varianten.map((v) => (
                            <li key={v.id} className="flex flex-wrap items-center gap-x-3">
                              <span>
                                Entwurf „{v.title}“{v.freigegeben && ' (freigegeben)'}
                              </span>
                              {!v.freigegeben && (
                                <form action={varianteLoeschenAction} className="flex items-center gap-2">
                                  <input type="hidden" name="variant_id" value={v.id} />
                                  <label className="flex items-center gap-1">
                                    <input type="checkbox" name="bestaetigt" value="ja" required />
                                    samt Kommentaren löschen
                                  </label>
                                  <button type="submit" className={kleinKnopf}>
                                    Löschen
                                  </button>
                                </form>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="kommentare" className="space-y-4">
        <h2 id="kommentare" className={h2}>
          Neueste Kommentare
        </h2>
        {neuesteKommentare.length === 0 ? (
          <p className="text-dark">Noch keine Kommentare.</p>
        ) : (
          <ul className="space-y-3">
            {neuesteKommentare.map((c) => (
              <li key={c.id} className="rounded-lg bg-white border border-gray-200 p-4">
                <p className="text-sm text-secondary mb-1">
                  {c.vonAdmin ? 'Das Entwicklerhaus' : (c.autor ?? 'gelöschter Nutzer')} · {formatDatum(c.createdAt, true)} ·{' '}
                  <Link href={`/portal/${c.projektSlug}`} className="text-primary hover:underline">
                    {c.projektTitle} – {c.variantTitle}
                  </Link>
                </p>
                <p className="text-dark whitespace-pre-line">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm text-secondary">Antworten auf der jeweiligen Projektseite.</p>
      </section>

      <section aria-labelledby="verwalten" className="space-y-6">
        <h2 id="verwalten" className={h2}>
          Verwalten
        </h2>

        <form id="kunde-anlegen" action={kundeAnlegenAction} className={karte}>
          <h3 className="font-semibold text-dark text-lg">Kunde anlegen</h3>
          <div>
            <label htmlFor="kunde-name" className={label}>
              Name der Firma oder des Vereins
            </label>
            <input id="kunde-name" name="name" required maxLength={200} className={feld} />
          </div>
          <button type="submit" className={knopf}>
            Kunde anlegen
          </button>
        </form>

        <form id="person-einladen" action={personEinladenAction} className={karte}>
          <h3 className="font-semibold text-dark text-lg">Person einladen</h3>
          <p className="text-sm text-secondary">
            Legt den Zugang an, ordnet ihn dem Kunden zu und verschickt eine Einladung mit Anmeldelink.
          </p>
          <KundenAuswahl id="einladen-kunde" kunden={kunden} />
          <div>
            <label htmlFor="einladen-email" className={label}>
              E-Mail-Adresse
            </label>
            <input id="einladen-email" name="email" type="email" required maxLength={254} className={feld} />
          </div>
          <div>
            <label htmlFor="einladen-name" className={label}>
              Name (optional)
            </label>
            <input id="einladen-name" name="name" maxLength={200} className={feld} />
          </div>
          <button type="submit" className={knopf}>
            Einladen
          </button>
        </form>

        <form id="projekt-anlegen" action={projektAnlegenAction} className={karte}>
          <h3 className="font-semibold text-dark text-lg">Projekt anlegen</h3>
          <KundenAuswahl id="projekt-kunde" kunden={kunden} />
          <div>
            <label htmlFor="projekt-titel" className={label}>
              Titel
            </label>
            <input id="projekt-titel" name="title" required maxLength={200} className={feld} />
          </div>
          <div>
            <label htmlFor="projekt-slug" className={label}>
              Kurzname für die Adresse (/portal/…)
            </label>
            <input
              id="projekt-slug"
              name="slug"
              required
              maxLength={100}
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              placeholder="baeckerei-meier"
              className={feld}
            />
          </div>
          <div>
            <label htmlFor="projekt-beschreibung" className={label}>
              Beschreibung (optional, für den Kunden sichtbar)
            </label>
            <textarea id="projekt-beschreibung" name="description" rows={2} className={feld} />
          </div>
          <button type="submit" className={knopf}>
            Projekt anlegen
          </button>
        </form>

        <form id="entwurf-hochladen" action={entwurfHochladenAction} className={karte}>
          <h3 className="font-semibold text-dark text-lg">Entwurf hochladen</h3>
          <div>
            <label htmlFor="entwurf-projekt" className={label}>
              Projekt
            </label>
            <select id="entwurf-projekt" name="project_id" required defaultValue="" className={feld}>
              <option value="" disabled>
                Bitte wählen
              </option>
              {projekte.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.kunde} – {p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="entwurf-titel" className={label}>
              Titel der Variante
            </label>
            <input id="entwurf-titel" name="title" required maxLength={200} className={feld} />
          </div>
          <div>
            <label htmlFor="entwurf-beschreibung" className={label}>
              Beschreibung (optional, für den Kunden sichtbar)
            </label>
            <textarea id="entwurf-beschreibung" name="description" rows={2} className={feld} />
          </div>
          <div>
            <label htmlFor="entwurf-reihenfolge" className={label}>
              Reihenfolge (kleinere Zahl zuerst)
            </label>
            <input id="entwurf-reihenfolge" name="sort_order" type="number" defaultValue={0} step={1} className={feld} />
          </div>
          <div>
            <label htmlFor="entwurf-datei" className={label}>
              HTML-Datei (höchstens 10 MB)
            </label>
            <input id="entwurf-datei" name="datei" type="file" required accept=".html,text/html" className={feld} />
          </div>
          <button type="submit" className={knopf}>
            Hochladen
          </button>
        </form>
      </section>
    </Seite>
  )
}

function KundenAuswahl({ id, kunden }: { id: string; kunden: { id: string; name: string }[] }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        Kunde
      </label>
      <select id={id} name="client_id" required defaultValue="" className={feld}>
        <option value="" disabled>
          Bitte wählen
        </option>
        {kunden.map((k) => (
          <option key={k.id} value={k.id}>
            {k.name}
          </option>
        ))}
      </select>
    </div>
  )
}
