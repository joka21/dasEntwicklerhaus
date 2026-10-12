import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Seite from '@/components/portal/PortalSeite'
import DesignVorschau from '@/components/portal/DesignVorschau'
import KommentarFormular from '@/components/portal/KommentarFormular'
import FreigabeButton from '@/components/portal/FreigabeButton'
import { createClient } from '@/lib/supabase/server'
import { entwurfUrl, formatDatum } from '@/lib/portal'

interface PageProps {
  params: Promise<{ projekt: string }>
}

interface Variante {
  id: string
  title: string
  description: string | null
}

interface Kommentar {
  id: string
  variant_id: string
  author_id: string | null
  body: string
  created_at: string
}

async function ladeProjekt(slug: string) {
  const supabase = await createClient()
  // RLS: Fremde Projekte sind unsichtbar und landen hier als null -> 404.
  const { data } = await supabase
    .from('portal_projects')
    .select('id, client_id, slug, title, description')
    .eq('slug', slug)
    .maybeSingle()
  return data
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const projekt = await ladeProjekt((await params).projekt)
  return { title: projekt?.title ?? 'Projekt' }
}

export default async function ProjektPage({ params }: PageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const projekt = await ladeProjekt((await params).projekt)
  if (!projekt) notFound()

  const [variantenRes, freigabeRes, mitgliedRes] = await Promise.all([
    supabase
      .from('portal_design_variants')
      .select('id, title, description')
      .eq('project_id', projekt.id)
      .order('sort_order')
      .order('created_at'),
    supabase
      .from('portal_project_approvals')
      .select('variant_id, approved_at')
      .eq('project_id', projekt.id)
      .maybeSingle(),
    // Kommentieren und Freigeben dürfen nur Kunden, nicht Admins.
    supabase
      .from('portal_client_members')
      .select('client_id')
      .eq('client_id', projekt.client_id)
      .eq('user_id', user.id)
      .maybeSingle(),
  ])
  if (variantenRes.error) throw variantenRes.error

  const varianten = (variantenRes.data ?? []) as Variante[]
  const freigabe = freigabeRes.data as { variant_id: string; approved_at: string } | null
  const istKunde = Boolean(mitgliedRes.data)

  let kommentare: Kommentar[] = []
  if (varianten.length > 0) {
    const { data, error } = await supabase
      .from('portal_variant_comments')
      .select('id, variant_id, author_id, body, created_at')
      .in(
        'variant_id',
        varianten.map((v) => v.id)
      )
      .order('created_at')
    if (error) throw error
    kommentare = (data ?? []) as Kommentar[]
  }

  const freigegebeneVariante = freigabe && varianten.find((v) => v.id === freigabe.variant_id)

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
            Freigegeben am {formatDatum(freigabe.approved_at)}:{' '}
            <strong>{freigegebeneVariante ? freigegebeneVariante.title : 'Variante'}</strong>
          </p>
        )}

        {varianten.length === 0 ? (
          <p className="text-dark">Die Entwürfe werden gerade vorbereitet. Wir melden uns, sobald sie bereitstehen.</p>
        ) : (
          varianten.map((v) => {
            const eigeneKommentare = kommentare.filter((k) => k.variant_id === v.id)
            const istFreigegeben = freigabe?.variant_id === v.id

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
                        <li key={k.id} className="rounded-lg bg-gray-50 p-4">
                          <p className="text-sm text-secondary mb-1">
                            {k.author_id === user.id ? 'Sie' : 'Ihr Team'} · {formatDatum(k.created_at, true)}
                          </p>
                          <p className="text-dark whitespace-pre-line">{k.body}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {istKunde && (
                  <div className="space-y-6 border-t border-gray-200 pt-6">
                    <KommentarFormular projektSlug={projekt.slug} varianteId={v.id} />
                    {!freigabe && (
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
