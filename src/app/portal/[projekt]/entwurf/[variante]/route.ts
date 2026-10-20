import { type NextRequest } from 'next/server'
import { ladeEntwurfPfad } from '@/lib/portal/daten'
import { entwurfLesen } from '@/lib/portal/speicher'
import { aktuellerViewer } from '@/lib/portal/viewer'
import { UUID_RE } from '@/lib/portal'

function fehler(status: number, text: string) {
  return new Response(text, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

// Liefert die HTML-Datei einer Design-Variante. Zugriff nur mit Login und
// Projektzugehörigkeit (authz, Regel 10).
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projekt: string; variante: string }> }
) {
  const { projekt, variante: varianteId } = await params
  if (!UUID_RE.test(varianteId)) return fehler(404, 'Nicht gefunden')

  const viewer = await aktuellerViewer()
  if (!viewer) return fehler(401, 'Nicht angemeldet')

  // Rechteprüfung (Regel 10): Pfad nur aus der Datenbank, fremde Entwürfe -> 404.
  const pfad = await ladeEntwurfPfad(viewer, projekt, varianteId)
  if (!pfad) return fehler(404, 'Nicht gefunden')

  // Datei aus PORTAL_STORAGE_PATH streamen (nicht komplett in den Speicher laden).
  const datei = await entwurfLesen(pfad)
  if (!datei) {
    console.error('Entwurf nicht geladen:', pfad)
    return fehler(404, 'Nicht gefunden')
  }

  return new Response(datei, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Entwürfe sind statisches HTML: sandbox ohne Ausnahmen – keine Skripte,
      // keine Formulare, eigener Ursprung ohne Zugriff auf Cookies/Sitzung.
      // Gilt auch, wenn die Datei direkt in einem Tab geöffnet wird.
      'Content-Security-Policy': `sandbox; frame-ancestors ${request.nextUrl.origin}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': 'private, no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
