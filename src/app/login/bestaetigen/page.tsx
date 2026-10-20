import Link from 'next/link'
import Seite from '@/components/portal/PortalSeite'
import { confirmLogin } from '../actions'

// Ziel des Links aus der Login- bzw. Einladungs-Mail (siehe
// src/lib/auth.ts). Der Token wird erst beim Klick auf den Button
// eingelöst, nicht schon beim Aufruf der Seite.
export default async function BestaetigenPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  return (
    <Seite title="Anmeldung bestätigen">
      <div className="max-w-md space-y-6">
        {token ? (
          <form action={confirmLogin}>
            <input type="hidden" name="token" value={token} />
            <button
              type="submit"
              className="w-full bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Jetzt anmelden
            </button>
          </form>
        ) : (
          <p className="text-dark">
            Dieser Link ist unvollständig.{' '}
            <Link href="/login" className="text-primary hover:underline">
              Neuen Anmeldelink anfordern
            </Link>
          </p>
        )}
      </div>
    </Seite>
  )
}
