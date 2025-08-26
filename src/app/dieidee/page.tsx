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
            <div className="bg-umwelt-100 border border-umwelt-400 text-umwelt-700 px-4 py-3 rounded mb-4">
              ✅ Visitenkarten-URL /dieIdee funktioniert (zeigt Inhalt von /dieidee)
            </div>
            <h1 className="text-h1 lg:text-h1-lg font-bold text-umwelt-800 mb-6">
              Die Idee: Ein Zuhause für gute Projekte
            </h1>
            
            <section className="mb-8">
              <h2 className="text-h2 lg:text-h1-lg font-semibold text-umwelt-800 mb-4">
                Warum es das Entwicklerhaus gibt
              </h2>
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
                So funktioniert das Entwicklerhaus
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Projekt einreichen</h3>
                    <p className="text-gray-700">Du lädst Titel, Kurzbeschreibung, Ziele, Team und Medien hoch.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Kurze Prüfung & Einordnung</h3>
                    <p className="text-gray-700">Redaktionelle Sichtung, Zuordnung zu Region/Thema, Qualitätscheck.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Sichtbar werden</h3>
                    <p className="text-gray-700">Deine Seite erscheint in den Kategorie‑ und Region‑Hubs und in der Suche/Filterung.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Vernetzung</h3>
                    <p className="text-gray-700">Interessierte können dich kontaktieren, beitragen, fördern oder eure Geschichte teilen.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Ergebnis</h3>
                    <p className="text-gray-700">Aus einer Projektseite wird ein Treffpunkt – für Mitmacher:innen, Partner und Öffentlichkeit.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Was uns unterscheidet
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-indigo-600">•</span>
                    <div>
                      <strong className="text-gray-800">Regionale Tiefe:</strong> <span className="text-gray-700">Vom Niederrhein aus denken wir in Regionen, Städten und Nachbarschaften.</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-indigo-600">•</span>
                    <div>
                      <strong className="text-gray-800">Thematische Breite:</strong> <span className="text-gray-700">Von KI bis soziale Innovation, von Webportalen bis DIY – Hauptsache sinnvoll und nachvollziehbar.</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-indigo-600">•</span>
                    <div>
                      <strong className="text-gray-800">Qualitätskriterien:</strong> <span className="text-gray-700">Echte Projekte, klare Ansprechpartner, transparente Ziele; Werbung ist gekennzeichnet.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Wirkung, die wir messen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Reichweite</h3>
                  <p className="text-sm text-gray-700">Aufrufe, Lesezeit, geteilte Beiträge</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Verbindungen</h3>
                  <p className="text-sm text-gray-700">Kontaktanfragen, Kooperationen, Freiwilligen‑Matches</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Wachstum</h3>
                  <p className="text-sm text-gray-700">Neue Projekte, regionale Abdeckung, Mehrsprachigkeit</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Lernen</h3>
                  <p className="text-sm text-gray-700">Feedback‑Runden, Updates, dokumentierte Ergebnisse</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Roadmap
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">Phase 1 – Niederrhein</h3>
                  <p className="text-gray-700">MVP, erste Kategorien & Region‑Hubs, lokale Stories.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">Phase 2 – NRW</h3>
                  <p className="text-gray-700">Ausbau der Datenbasis, Kooperationen mit Netzwerken und Bildungseinrichtungen.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">Phase 3 – Deutschland/Europa</h3>
                  <p className="text-gray-700">Mehr Sprachen, länderübergreifende Projekte, Events & Partnerschaften.</p>
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

            <section className="mb-8">
              <div className="bg-indigo-50 rounded-lg p-6 text-center">
                <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
                  Mitmachen
                </h2>
                <p className="text-gray-700 mb-4">
                  Du hast ein Projekt, das hilft, Leben besser zu machen?<br />
                  Reiche es ein, erzähle deine Geschichte – und finde Menschen, die mit dir wirken möchten.
                </p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Projekt einreichen
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                FAQ zur Idee
              </h2>
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">Worum geht es beim Entwicklerhaus?</summary>
                  <p className="text-gray-700 mt-2">Um eine Plattform für gute Projekte: sichtbar machen, vernetzen, wachsen – vom Niederrhein bis Europa.</p>
                </details>
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">Welche Projekte passen zu euch?</summary>
                  <p className="text-gray-700 mt-2">Initiativen mit gesellschaftlichem, technologischem oder ökologischem Nutzen: z. B. KI‑Projekte, Webportale, soziale Innovation, DIY und Bildung.</p>
                </details>
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">Kostet das Einstellen eines Projekts etwas?</summary>
                  <p className="text-gray-700 mt-2">Das Einreichen ist im MVP kostenfrei. Sponsoring/Partnerschaften werden klar gekennzeichnet.</p>
                </details>
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">Wie stellt ihr Qualität sicher?</summary>
                  <p className="text-gray-700 mt-2">Kurzer Redaktionscheck, klare Kriterien (Projektziel, Ansprechperson, Aktualität), transparente Angaben und Kennzeichnung von Werbung/Sponsoring.</p>
                </details>
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">Warum startet ihr regional?</summary>
                  <p className="text-gray-700 mt-2">Weil Nähe wirkt: Mit dem Fokus auf den Niederrhein zeigen wir, was direkt vor Ort entsteht – und skalieren von dort.</p>
                </details>
              </div>
            </section>
          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}