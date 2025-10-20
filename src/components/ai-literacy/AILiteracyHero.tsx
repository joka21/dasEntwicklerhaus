export default function AILiteracyHero() {
  return (
    <section className="relative bg-zukunft py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hauptüberschrift */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            AI Literacy
          </h1>

          {/* Untertitel */}
          <p className="text-xl lg:text-2xl text-white opacity-95 mb-8 max-w-3xl mx-auto">
            Versteh, was KI wirklich ist – und wie du sie nutzt
          </p>

          {/* Beschreibung */}
          <div className="max-w-4xl mx-auto text-white opacity-90 space-y-4">
            <p className="text-lg leading-relaxed">
              KI ist überall. Alle reden drüber. Die meisten wissen nicht genau, was dahinter steckt.
            </p>
            <p className="text-lg leading-relaxed">
              Das hier ist keine Uni-Vorlesung. Keine Marketing-Buzzwords. Keine theoretischen Modelle.
            </p>
            <p className="text-lg leading-relaxed">
              Sondern: Was du wirklich wissen musst. In vier Schritten. Praxisnah. Ehrlich.
            </p>
          </div>

          {/* Call-to-Action */}
          <div className="mt-12">
            <a
              href="#main-content"
              className="inline-block bg-white text-zukunft px-8 py-4 rounded-lg text-lg font-semibold hover:bg-light-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Jetzt starten
            </a>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-white font-medium">Lernphasen</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">12</div>
              <div className="text-white font-medium">Praxisbeispiele</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">1</div>
              <div className="text-white font-medium">Zertifikat</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
