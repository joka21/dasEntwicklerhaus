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
          <h1 className="text-3xl lg:text-4xl font-bold text-dark mb-8 text-center">
            Projekt einreichen
          </h1>
          <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
            Haben Sie ein innovatives Projekt, das Sie präsentieren möchten? 
            Teilen Sie es mit uns! Wir helfen dabei, Projekte sichtbar zu machen und zu vernetzen.
          </p>
          
          <ContactForm />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-dark mb-4">
              Direkter Kontakt
            </h2>
            <p className="text-secondary mb-4">
              Sie können uns auch direkt kontaktieren:
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