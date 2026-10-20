import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Seite from '@/components/portal/PortalSeite'
import DesignVorschau from '@/components/portal/DesignVorschau'
import KommentarFormular from '@/components/portal/KommentarFormular'
import FreigabeButton from '@/components/portal/FreigabeButton'
import { entwurfUrl, formatDatum } from '@/lib/portal'
import { ladeProjekt, ladeProjektInhalt } from '@/lib/portal/daten'
import { aktuellerViewer } from '@/lib/portal/viewer'

interface PageProps {
  params: Promise<{ projekt: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const projekt = await ladeProjekt(await aktuellerViewer(), (await params).projekt)
  return { title: projekt?.title ?? 'Projekt' }
}

export default async function ProjektPage({ params }: PageProps) {
  const viewer = await aktuellerViewer()
  if (!viewer) redirect('/login')

  // Fremde oder unbekannte Projekte liefern null -> 404.
  const projekt = await ladeProjekt(viewer, (await params).projekt)
  if (!projekt) notFound()
  const inhalt = await ladeProjektInhalt(viewer, projekt.id)
  if (!inhalt) notFound()
  const { varianten, freigabe, kommentare, darfKommentieren, darfFreigeben } = inhalt

  const freigegebeneVariante = freigabe && varianten.find((v) => v.id === freigabe.variantId)

  return (
    <Seite title={projekt.title}>
      <div className="space-y-4">
        <Link href="/portal" className="text-primary hover:underline">
          ← Alle Projekte
        </Link>
        {projekt.description && <p className="text-dark text-lg">{projekt.description}</p>}
      </div>

      <section aria-labelledby="design-vorschlaege" className="space-y-8">
        <h2 id="design-vorschlaege" className="text-h3 lg:text-h3-lg font-bold text-umwelt-800">
          Design-Vorschläge
        </h2>

        {freigabe && (
          <p role="status" className="rounded-lg border border-umwelt-300 bg-white p-4 text-dark">
            Freigegeben am {formatDatum(freigabe.approvedAt)}:{' '}
            <strong>{freigegebeneVariante ? freigegebeneVariante.title : 'Variante'}</strong>
          </p>
        )}

        {varianten.length === 0 ? (
          <p className="text-dark">Die Entwürfe werden gerade vorbereitet. Wir melden uns, sobald sie bereitstehen.</p>
        ) : (
          varianten.map((v) => {
            const eigeneKommentare = kommentare.filter((k) => k.variantId === v.id)
            const istFreigegeben = freigabe?.variantId === v.id

            return (
              <article
                key={v.id}
                aria-labelledby={`variante-${v.id}`}
                className={`rounded-lg border bg-white p-6 space-y-6 ${
                  istFreigegeben ? 'border-umwelt-500 ring-2 ring-umwelt-500' : 'border-gray-200'
                }`}
              >
                <header className="space-y-2">
                  <h3 id={`variante-${v.id}`} className="text-h4 lg:text-h4-lg font-semibold text-dark">
                    {v.title}
                    {istFreigegeben && (
                      <span className="ml-3 align-middle inline-block rounded-full bg-umwelt-700 px-3 py-1 text-sm font-medium text-white">
                        Freigegeben
                      </span>
                    )}
                  </h3>
                  {v.description && <p className="text-dark">{v.description}</p>}
                </header>

                <DesignVorschau src={entwurfUrl(projekt.slug, v.id)} titel={v.title} />

                {eigeneKommentare.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-dark">Kommentare</h4>
                    <ul className="space-y-3">
                      {eigeneKommentare.map((k) => (
                        <li
                          key={k.id}
                          className={`rounded-lg p-4 ${k.vonAdmin ? 'border-l-4 border-umwelt-500 bg-white' : 'bg-gray-50'}`}
                        >
                          <p className="text-sm text-secondary mb-1">
                            {k.vonAdmin ? (
                              <span className="font-semibold text-umwelt-800">Das Entwicklerhaus</span>
                            ) : k.authorId === viewer.userId ? (
                              'Sie'
                            ) : viewer.istAdmin ? (
                              'Kunde'
                            ) : (
                              'Ihr Team'
                            )}{' '}
                            · {formatDatum(k.createdAt, true)}
                          </p>
                          <p className="text-dark whitespace-pre-line">{k.body}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {darfKommentieren && (
                  <div className="space-y-6 border-t border-gray-200 pt-6">
                    <KommentarFormular projektSlug={projekt.slug} varianteId={v.id} alsAdmin={viewer.istAdmin} />
                    {darfFreigeben && !freigabe && (
                      <FreigabeButton projektSlug={projekt.slug} varianteId={v.id} varianteTitel={v.title} />
                    )}
                  </div>
                )}
              </article>
            )
          })
        )}
      </section>
    </Seite>
  )
}
