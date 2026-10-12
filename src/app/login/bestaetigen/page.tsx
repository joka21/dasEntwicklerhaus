import Link from 'next/link'
import Seite from '@/components/portal/PortalSeite'
import { confirmLogin } from '../actions'

// Ziel des Links aus der Login- bzw. Einladungs-Mail (siehe
// supabase/templates). Der Token wird erst beim Klick auf den Button
// eingelöst, nicht schon beim Aufruf der Seite.
export default async function BestaetigenPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; type?: string }>
}) {
  const { token_hash: tokenHash, type } = await searchParams

  return (
    <Seite title="Anmeldung bestätigen">
      <div className="max-w-md space-y-6">
        {tokenHash && type ? (
          <form action={confirmLogin}>
            <input type="hidden" name="token_hash" value={tokenHash} />
            <input type="hidden" name="type" value={type} />
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
