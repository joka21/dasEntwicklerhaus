import Link from 'next/link'
import Seite from '@/components/portal/PortalSeite'
import { formatDatum } from '@/lib/portal'
import { ladeProjektliste } from '@/lib/portal/daten'
import { aktuellerViewer } from '@/lib/portal/viewer'

export default async function PortalPage() {
  // Nur Projekte, zu denen der Nutzer gehört (Admins: alle).
  const projekte = await ladeProjektliste(await aktuellerViewer())

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
                  {p.freigegebenAm
                    ? `Design freigegeben am ${formatDatum(p.freigegebenAm)}`
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
