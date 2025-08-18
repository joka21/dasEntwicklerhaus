export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Kontakt
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kontaktinformationen
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> info@dasentwicklerhaus.de
              </p>
              <p className="text-gray-700">
                Wir freuen uns auf Ihre Nachricht und werden uns schnellstmöglich bei Ihnen melden.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Projekt einreichen
              </h2>
              <p className="text-gray-700">
                Haben Sie ein innovatives Projekt, das Sie präsentieren möchten? 
                Kontaktieren Sie uns gerne!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}