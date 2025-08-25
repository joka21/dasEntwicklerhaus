import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Das Entwicklerhaus
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Innovative Projekte aus Europa
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <p className="text-gray-700 mb-6">
                Willkommen bei Das Entwicklerhaus - Ihrer Plattform für innovative 
                Projekte und Entwicklungen aus ganz Europa.
              </p>
              <nav className="space-y-4" aria-label="Hauptnavigation">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="/dieidee" className="block p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                    <h2 className="font-semibold text-indigo-800 mb-2">Die Idee</h2>
                    <p className="text-sm text-gray-700">Erfahren Sie mehr über unser Konzept</p>
                  </a>
                  <a href="/projects" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <h2 className="font-semibold text-green-800 mb-2">Alle Projekte</h2>
                    <p className="text-sm text-gray-700">Entdecken Sie innovative Projekte</p>
                  </a>
                  <a href="/contact" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <h2 className="font-semibold text-blue-800 mb-2">Kontakt</h2>
                    <p className="text-sm text-gray-700">Reichen Sie Ihr Projekt ein</p>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}