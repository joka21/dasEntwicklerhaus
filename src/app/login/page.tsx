import { redirect } from 'next/navigation'
import Seite from '@/components/portal/PortalSeite'
import { aktuelleSitzung } from '@/lib/auth'
import { requestMagicLink } from './actions'

const FEHLER: Record<string, string> = {
  ungueltig: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  link: 'Der Anmeldelink ist abgelaufen oder wurde bereits verwendet. Bitte fordern Sie einen neuen an.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ gesendet?: string; fehler?: string }>
}) {
  const { gesendet, fehler: fehlerCode } = await searchParams
  if (await aktuelleSitzung()) redirect('/portal')

  const fehler = fehlerCode ? FEHLER[fehlerCode] : undefined

  return (
    <Seite title="Kundenlogin">
      <div className="max-w-md space-y-6">
        {gesendet ? (
          <div role="status" className="rounded-lg border border-umwelt-300 bg-white p-6 text-dark">
            <p className="font-medium mb-2">Bitte prüfen Sie Ihr Postfach.</p>
            <p>
              Wenn die Adresse für das Kundenportal freigeschaltet ist, haben wir Ihnen einen
              Anmeldelink geschickt. Kommt nach einigen Minuten nichts an, sehen Sie bitte auch im
              Spam-Ordner nach.
            </p>
          </div>
        ) : (
          <>
            <p className="text-dark">
              Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link, mit dem Sie sich ohne
              Passwort anmelden.
            </p>
            {fehler && (
              <p role="alert" className="text-red-600">
                {fehler}
              </p>
            )}
            <form action={requestMagicLink} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-dark mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Anmeldelink anfordern
              </button>
            </form>
          </>
        )}
      </div>
    </Seite>
  )
}
