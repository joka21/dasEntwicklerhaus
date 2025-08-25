import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ContentSection>
        <div className="text-center">
          <h1 className="text-h1 lg:text-h1-lg font-bold text-dark mb-6">
            Das Entwicklerhaus
          </h1>
          <p className="text-h3 lg:text-h2-lg text-secondary mb-8">
            Innovative Projekte aus Europa
          </p>
          <div className="bg-light-50 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-dark mb-6">
              Willkommen bei Das Entwicklerhaus - Ihrer Plattform für innovative 
              Projekte und Entwicklungen aus ganz Europa.
            </p>
            <nav className="space-y-4" aria-label="Hauptnavigation">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/dieidee" className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  <h2 className="font-semibold text-primary-800 mb-2">Die Idee</h2>
                  <p className="text-sm text-dark">Erfahren Sie mehr über unser Konzept</p>
                </a>
                <a href="/projects" className="block p-4 bg-umwelt-50 rounded-lg hover:bg-umwelt-100 transition-colors">
                  <h2 className="font-semibold text-umwelt-800 mb-2">Alle Projekte</h2>
                  <p className="text-sm text-dark">Entdecken Sie innovative Projekte</p>
                </a>
                <a href="/contact" className="block p-4 bg-frieden-50 rounded-lg hover:bg-frieden-100 transition-colors">
                  <h2 className="font-semibold text-frieden-800 mb-2">Kontakt</h2>
                  <p className="text-sm text-dark">Reichen Sie Ihr Projekt ein</p>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </ContentSection>
      <Footer />
    </>
  )
}