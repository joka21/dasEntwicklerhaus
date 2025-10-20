import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="sr-only">
        <h1>Kontakt - Das Entwicklerhaus</h1>
      </div>
      <ContentSection>
        <main id="main-content">
          <h1 className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-8 text-center">
            Zeig, was du machst
          </h1>
          <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
            Du hast ein Projekt? Egal ob groß oder klein, fertig oder in Arbeit – erzähl mir davon.
            <br />
            Ich helf dir, dass es gesehen wird.
          </p>

          <ContactForm />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
              Oder schreib mir direkt
            </h2>
            <p className="text-secondary mb-4">
              Keine Lust auf Formulare? Versteh ich.
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