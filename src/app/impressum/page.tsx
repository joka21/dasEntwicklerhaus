import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <div className="sr-only">
        <h1>Impressum - Das Entwicklerhaus</h1>
      </div>
      <ContentSection>
        <main id="main-content" className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-dark mb-8">
            Impressum
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="bg-light-50 p-6 rounded-lg">
                <p className="mb-2">
                  <strong>Josef Kalenberg</strong><br />
                  Am Königshof 47<br />
                  47807 Krefeld<br />
                  Deutschland
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-4">
                Kontakt
              </h2>
              <div className="bg-light-50 p-6 rounded-lg">
                <p className="mb-2">
                  <strong>Telefon:</strong> 0176 42463017<br />
                  <strong>E-Mail:</strong> <a href="mailto:admin@dasentwicklerhaus.de" className="text-primary hover:underline">admin@dasentwicklerhaus.de</a><br />
                  <strong>Webseite:</strong> <a href="https://www.dasentwicklerhaus.de" className="text-primary hover:underline">www.dasentwicklerhaus.de</a>
                </p>
                
                <p className="mt-4">
                  <strong>Steuernummer:</strong> 117/5175/0155
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-4">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="bg-light-50 p-6 rounded-lg">
                <p>
                  Josef Kalenberg<br />
                  Am Königshof 47<br />
                  47807 Krefeld
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">
                Haftungsausschluss
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-dark mb-3">
                    Haftung für Inhalte
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-dark mb-3">
                    Haftung für Links
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-dark mb-3">
                    Urheberrecht
                  </h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                  <p className="text-secondary leading-relaxed">
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                  </p>
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