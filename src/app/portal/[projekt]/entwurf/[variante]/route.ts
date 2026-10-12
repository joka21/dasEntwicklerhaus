import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { UUID_RE } from '@/lib/portal'

const BUCKET = 'design-proposals'

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

// Liefert die HTML-Datei einer Design-Variante aus dem privaten Bucket.
// Zugriff wird doppelt geprüft: Die Variante wird unter RLS geladen, und die
// Datei wird mit dem Token des Nutzers geholt (Storage-Policy).
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projekt: string; variante: string }> }
) {
  const { projekt, variante: varianteId } = await params
  if (!UUID_RE.test(varianteId)) return fehler(404, 'Nicht gefunden')

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return fehler(401, 'Nicht angemeldet')

  const { data: variante } = await supabase
    .from('portal_design_variants')
    .select('storage_path, portal_projects!inner(slug)')
    .eq('id', varianteId)
    .eq('portal_projects.slug', projekt)
    .maybeSingle()
  if (!variante) return fehler(404, 'Nicht gefunden')

  // Token stammt aus dem Cookie; getUser() hat es oben bereits geprüft.
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) return fehler(401, 'Nicht angemeldet')

  // Direkt per fetch statt storage.download(), damit die Datei gestreamt und
  // nicht komplett in den Speicher geladen wird.
  const pfad = (variante.storage_path as string).split('/').map(encodeURIComponent).join('/')
  const datei = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/authenticated/${BUCKET}/${pfad}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      },
      cache: 'no-store',
    }
  )
  if (!datei.ok || !datei.body) {
    console.error('Entwurf nicht geladen:', variante.storage_path, datei.status)
    return fehler(404, 'Nicht gefunden')
  }

  return new Response(datei.body, {
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
