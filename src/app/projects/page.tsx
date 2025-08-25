import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <div className="sr-only">
        <h1>Alle Projekte - Das Entwicklerhaus</h1>
      </div>
      <ContentSection>
        <main id="main-content">
          <h1 className="text-h1 lg:text-h1-lg font-bold text-dark mb-8">
            Alle Projekte
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Projekte werden hier dynamisch geladen */}
            <div className="bg-light-50 rounded-lg shadow-md p-6">
              <p className="text-secondary">Projekte werden geladen...</p>
            </div>
          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}