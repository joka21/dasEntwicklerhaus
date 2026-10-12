import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Supabase-Client mit der Sitzung des angemeldeten Nutzers – alle Abfragen
// laufen unter RLS. Pro Request neu erzeugen, nie zwischenspeichern.
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // In Server Components dürfen keine Cookies gesetzt werden;
            // die Middleware erneuert die Sitzung.
          }
        },
      },
    }
  )
}
