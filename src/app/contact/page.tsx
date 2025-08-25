import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContentSection>
        <main>
          <h1 className="text-h1 lg:text-h1-lg font-bold text-dark mb-8">
            Kontakt
          </h1>
          <div className="bg-light-50 rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-h3 lg:text-h2-lg font-semibold text-dark mb-4">
                  Kontaktinformationen
                </h2>
                <p className="text-dark mb-2">
                  <strong>Email:</strong> <a href="mailto:info@dasentwicklerhaus.de" className="text-primary hover:text-primary-hover">info@dasentwicklerhaus.de</a>
                </p>
                <p className="text-dark">
                  Wir freuen uns auf Ihre Nachricht und werden uns schnellstmöglich bei Ihnen melden.
                </p>
              </div>
              <div>
                <h2 className="text-h3 lg:text-h2-lg font-semibold text-dark mb-4">
                  Projekt einreichen
                </h2>
                <p className="text-dark">
                  Haben Sie ein innovatives Projekt, das Sie präsentieren möchten? 
                  Kontaktieren Sie uns gerne!
                </p>
              </div>
            </div>
          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}