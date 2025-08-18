import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DieIdeePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <main id="main-content" className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Die Idee
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 mb-4">
              Das Entwicklerhaus ist eine Plattform zur Präsentation innovativer 
              Projekte und Entwicklungen aus ganz Europa.
            </p>
            <p className="text-gray-700">
              Unser Ziel ist es, europäische Entwickler und ihre kreativen 
              Projekte zu vernetzen und einer breiteren Öffentlichkeit zugänglich zu machen.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}