import { Suspense } from 'react'
import Seite from '@/components/angebot/Seite'
import Platzhalter from '@/components/angebot/Platzhalter'
import ContactForm from '@/components/ContactForm'

export default function KontaktPage() {
  return (
    <Seite title="Kontakt">
      <Platzhalter>[Platzhalter: Einleitung zur Kontaktseite]</Platzhalter>

      {/* Suspense nötig, weil das Formular die Bausteine aus der URL liest
          (useSearchParams) – die Seite bleibt so statisch. */}
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">Direkt per E-Mail</h2>
        <p className="text-dark">
          <strong>E-Mail:</strong>{' '}
          <a href="mailto:admin@dasentwicklerhaus.de" className="text-primary-900 hover:underline">
            admin@dasentwicklerhaus.de
          </a>
        </p>
      </div>
    </Seite>
  )
}
