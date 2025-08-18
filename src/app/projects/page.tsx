export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Alle Projekte
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projekte werden hier dynamisch geladen */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500">Projekte werden geladen...</p>
          </div>
        </div>
      </div>
    </div>
  )
}