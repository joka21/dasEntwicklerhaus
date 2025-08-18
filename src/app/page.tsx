import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
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
              <p className="text-gray-700">
                Willkommen bei Das Entwicklerhaus - Ihrer Plattform für innovative 
                Projekte und Entwicklungen aus ganz Europa.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}