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
              Die Idee: Ein Zuhause für gute Projekte
            </h1>
            
            <section className="mb-8">
             
              <div className="space-y-4 mb-6">
                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Seit recht langer Zeit bin ich Entwickler. Viele Trends mitgemacht, viele Trends verpasst, aber immer auf dem Stand der Technik.
                </p>
                
                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Und nun kommt KI und plötzlich ist nichts mehr wie es war. Werden unsere Fähigkeiten morgen noch gebraucht? Werde ich noch gebraucht? Die einzig ehrliche Antwort auf diese Frage ist: Keine Ahnung!
                </p>
                
                <p className="text-lg lg:text-xl text-dark leading-relaxed">
                  Wir wissen nicht, was da auf uns zukommt. Wir wissen nicht, was KI in der nächsten Woche alles kann. Aber Zuschauen und mit offenen Augen die neue Welt bestaunen ist eine sehr schlechte Alternative.
                </p>
                
                <p className="text-lg lg:text-xl text-dark leading-relaxed font-medium">
                  Also auf geht's! Lass uns Ideen entwickeln, lass uns Ideen vorstellen – dafür gibt es diese Plattform. Werde ein Teil davon und stelle deine Ideen vor oder unterstütze Ideen, die du gut findest.
                </p>
                
                <p className="text-xl lg:text-2xl text-umwelt-800 leading-relaxed font-bold text-center mt-8">
                  Denn gemeinsam erreichen wir mehr.
                </p>
              </div>
              
              <p className="text-dark mb-4 leading-relaxed">
                Gute Projekte passieren überall – sie finden nur zu selten die Bühne, die sie verdienen. Das Entwicklerhaus schließt diese Lücke: Wir machen Innovationsprojekte, soziale Initiativen, KI‑Lösungen, Webportale und DIY‑Vorhaben sichtbar.
              </p>
              <p className="text-dark leading-relaxed">
                Unser Startpunkt ist der Niederrhein, der Ausbau führt über NRW nach Deutschland und weiter nach Europa. So entsteht eine wachsende Landkarte, auf der Menschen Projekte entdecken, unterstützen und miteinander vernetzen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Was uns antreibt
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Transparenz & Wirkung</h3>
                  <p className="text-gray-700">Klare Kurzsteckbriefe, nachvollziehbare Ziele und Ergebnisse.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Kuratiert statt chaotisch</h3>
                  <p className="text-gray-700">Projekte werden geordnet nach Region, Thema und Wirkung.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">People‑First</h3>
                  <p className="text-gray-700">Lesbare Texte, aussagekräftige Bilder, Kontaktmöglichkeiten auf einen Blick.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">Mehrsprachig & mobil‑first</h3>
                  <p className="text-gray-700">Inhalte in DE/EN/FR, optimiert für Smartphone‑Nutzung.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Für wen wir bauen
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Macher:innen</h3>
                  <p className="text-gray-700">Vereine, Startups, Kommunen, Bildungseinrichtungen und Initiativen, die ihre Arbeit sichtbar machen möchten.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Unterstützer:innen</h3>
                  <p className="text-gray-700">Förderer, Unternehmen, Stiftungen und Freiwillige, die passende Projekte suchen.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Entdecker:innen</h3>
                  <p className="text-gray-700">Menschen, die wissen wollen, was vor Ort entsteht und wie sie sich beteiligen können.</p>
                </div>
              </div>
            </section>

           

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Werte & Richtlinien
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Barrierearm & respektvoll</h3>
                  <p className="text-gray-700">Verständliche Sprache, klare Navigation, moderierte Community.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Datenschutz & Fairness</h3>
                  <p className="text-gray-700">Sorgfältiger Umgang mit Daten, transparente Kennzeichnung von Sponsoring.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Offen für Feedback</h3>
                  <p className="text-gray-700">Wir entwickeln das Entwicklerhaus gemeinsam mit der Community weiter.</p>
                </div>
              </div>
            </section>

           kannst du es stattdessen mit einer URL-Präfix-Property versuchen
          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}