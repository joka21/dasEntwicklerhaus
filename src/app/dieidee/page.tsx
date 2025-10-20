import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function DieIdeePage() {
  return (
    <>
      <Header />
      <ContentSection>
        <main id="main-content">
          <div className="bg-light-50 rounded-lg shadow-md p-8 lg:p-12 max-w-4xl mx-auto">

            <h1 className="text-h1 lg:text-h1-lg font-bold text-umwelt-800 mb-6">
              Warum es das Entwicklerhaus gibt
            </h1>

            <section className="mb-12">
              <div className="space-y-6 mb-8">
                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Ich bin jetzt seit über 20 Jahren Entwickler.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Hab Trends erlebt, manche mitgemacht, andere verpasst. Aber eigentlich war ich immer dabei – im Flow mit der Technik.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Und dann kam KI.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Plötzlich ist nichts mehr wie vorher. Werden unsere Fähigkeiten morgen noch gebraucht? Werde <em>ich</em> noch gebraucht?
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Die ehrliche Antwort: Keine Ahnung.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Keiner weiß, was in einem Jahr ist. Oder nächsten Monat. Was KI nächste Woche alles kann.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Aber nur zuschauen? Mit offenen Augen die Welt bestaunen, während sie sich verändert?
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed font-medium">
                  Das ist keine Option.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Also machen wir was. Entwickeln Ideen. Zeigen Ideen. Verbinden Menschen.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Dafür ist diese Plattform da. Nicht perfekt. Nicht riesig. Aber echt.
                </p>

                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Stell deine Ideen vor. Unterstütze Projekte, die du gut findest. Werde Teil von etwas, das wächst.
                </p>

                <p className="text-xl lg:text-2xl text-umwelt-800 leading-relaxed font-bold mt-8">
                  Gemeinsam sind wir weniger allein.
                </p>
              </div>

              <div className="space-y-4 my-8 border-l-4 border-umwelt-500 pl-6">
                <p className="text-dark leading-relaxed">
                  Gute Projekte passieren überall. Aber sie finden zu selten die Bühne, die sie verdienen.
                </p>
                <p className="text-dark leading-relaxed">
                  Das Entwicklerhaus schließt diese Lücke. Wir machen sichtbar, was sonst untergeht: Innovationen, soziale Initiativen, KI-Lösungen, Webportale, DIY-Ideen.
                </p>
                <p className="text-dark leading-relaxed">
                  Wir starten am Niederrhein. Wachsen über NRW. Dann Deutschland. Europa.
                </p>
                <p className="text-dark leading-relaxed">
                  Eine Landkarte entsteht – auf der Menschen Projekte entdecken, unterstützen, vernetzen.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Was uns wichtig ist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Ehrlich & transparent</h3>
                  <p className="text-gray-700">Keine Buzzwords. Keine Floskeln. Klare Projektbeschreibungen, echte Menschen dahinter.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Übersichtlich</h3>
                  <p className="text-gray-700">Nicht alles auf einmal. Geordnet nach Region, Thema, Wirkung. Damit du findest, was passt.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Für Menschen gemacht</h3>
                  <p className="text-gray-700">Lesbare Texte. Echte Bilder. Kontakt auf einen Blick. Keine Hürden.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Für alle nutzbar</h3>
                  <p className="text-gray-700">Mehrsprachig (DE/EN/FR). Mobil optimiert. Barrieren abbauen, nicht aufbauen.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Für wen das hier ist
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Du machst was</h3>
                  <p className="text-gray-700">Verein, Startup, Initiative, Bildungsprojekt – egal. Du baust etwas auf und willst, dass es gesehen wird? Dann bist du hier richtig.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Du willst unterstützen</h3>
                  <p className="text-gray-700">Du hast Zeit, Geld, Skills – und suchst Projekte, die es wert sind? Hier findest du sie.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Du bist neugierig</h3>
                  <p className="text-gray-700">Was passiert vor deiner Haustür? Was entsteht gerade? Wo kannst du mitmachen? Entdecke es hier.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Unsere Regeln
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Respekt & Verständlichkeit</h3>
                  <p className="text-gray-700">Klare Sprache. Einfache Navigation. Keine Trolls, keine Hetze. Die Community wird moderiert.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Datenschutz & Fairness</h3>
                  <p className="text-gray-700">Deine Daten gehören dir. Sponsoring wird gekennzeichnet. Keine versteckten Spielchen.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Feedback erwünscht</h3>
                  <p className="text-gray-700">Das Entwicklerhaus ist nicht fertig. Wird es nie sein. Wir bauen gemeinsam – sag uns, was fehlt.</p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}