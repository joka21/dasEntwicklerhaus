import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import ContactFormMitThema from '@/components/ContactFormMitThema'
import { Suspense } from 'react'

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContentSection>
        <main id="main-content">
          <h1 className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-8 text-center">
            Kostenloses Erstgespräch anfragen
          </h1>
          <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
            Erzählen Sie kurz, worum es geht – Website für Ihren Verein, Ihren Handwerksbetrieb oder einen
            Onlineshop. Ich melde mich persönlich bei Ihnen.
          </p>

          {/* Liest ?thema= (von den Angebotsseiten); bis dahin das leere Formular */}
          <Suspense fallback={<ContactForm />}>
            <ContactFormMitThema />
          </Suspense>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
              Oder schreiben Sie mir direkt
            </h2>
            <p className="text-secondary mb-4">
              Lieber per E-Mail? Das geht natürlich auch.
            </p>
            <p className="text-dark">
              <strong>E-Mail:</strong>{' '}
              <a href="mailto:admin@dasentwicklerhaus.de" className="text-primary hover:underline">
                admin@dasentwicklerhaus.de
              </a>
            </p>
          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}