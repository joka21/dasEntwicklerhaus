import Link from 'next/link'
import Seite from '@/components/portal/PortalSeite'
import { createClient } from '@/lib/supabase/server'
import { formatDatum } from '@/lib/portal'

interface ProjektZeile {
  slug: string
  title: string
  description: string | null
  portal_project_approvals: { approved_at: string } | null
}

export default async function PortalPage() {
  const supabase = await createClient()
  // RLS liefert nur Projekte, zu denen der Nutzer gehört.
  const { data, error } = await supabase
    .from('portal_projects')
    .select('slug, title, description, portal_project_approvals(approved_at)')
    .order('created_at', { ascending: false })

  if (error) throw error
  const projekte = (data ?? []) as unknown as ProjektZeile[]

  return (
    <Seite title="Ihre Projekte">
      {projekte.length === 0 ? (
        <p className="text-dark">Für Ihr Konto sind noch keine Projekte freigeschaltet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {projekte.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/portal/${p.slug}`}
                className="block h-full rounded-lg border border-gray-200 bg-white p-6 hover:border-primary hover:shadow-md transition"
              >
                <h2 className="text-h5 lg:text-h5-lg font-semibold text-umwelt-800 mb-2">{p.title}</h2>
                {p.description && <p className="text-dark mb-4">{p.description}</p>}
                <p className="text-sm text-secondary">
                  {p.portal_project_approvals
                    ? `Design freigegeben am ${formatDatum(p.portal_project_approvals.approved_at)}`
                    : 'Design in Abstimmung'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Seite>
  )
}
