import Header from '@/components/Header'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <div className="sr-only">
        <h1>Datenschutzerklärung - Das Entwicklerhaus</h1>
      </div>
      <ContentSection>
        <main id="main-content" className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-8">
            Datenschutzerklärung
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
                1. Allgemeine Hinweise
              </h2>
              <p className="text-secondary leading-relaxed">
                Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
                2. Verantwortlicher
              </h2>
              <p className="text-secondary mb-3">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="bg-light-50 p-6 rounded-lg">
                <p className="mb-2">
                  Josef Kalenberg<br />
                  Am Königshof 47<br />
                  47807 Krefeld<br />
                  Telefon: 0176 42463017<br />
                  E-Mail: <a href="mailto:admin@dasentwicklerhaus.de" className="text-primary hover:underline">admin@dasentwicklerhaus.de</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-6">
                3. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-umwelt-800 mb-4">
                    a) Beim Besuch der Website
                  </h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    Beim Aufrufen unserer Website werden automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Erfasst werden u. a.:
                  </p>
                  <ul className="text-secondary list-disc pl-6 space-y-1 mb-4">
                    <li>IP-Adresse des anfragenden Rechners,</li>
                    <li>Datum und Uhrzeit des Zugriffs,</li>
                    <li>Name und URL der abgerufenen Datei,</li>
                    <li>verwendeter Browser und ggf. Betriebssystem Ihres Rechners,</li>
                    <li>Name des Access-Providers.</li>
                  </ul>
                  <p className="text-secondary leading-relaxed mb-4">
                    Die genannten Daten werden zu folgenden Zwecken verarbeitet:
                  </p>
                  <ul className="text-secondary list-disc pl-6 space-y-1 mb-4">
                    <li>Gewährleistung eines reibungslosen Verbindungsaufbaus,</li>
                    <li>Gewährleistung einer komfortablen Nutzung,</li>
                    <li>Auswertung der Systemsicherheit und -stabilität.</li>
                  </ul>
                  <p className="text-secondary leading-relaxed">
                    Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-umwelt-800 mb-4">
                    b) Nutzung von Google Analytics
                  </h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    Wir verwenden Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                  </p>
                  <p className="text-secondary leading-relaxed mb-4">
                    Google Analytics verwendet Cookies, die eine Analyse der Benutzung unserer Website ermöglichen. Die durch Cookies erzeugten Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                  </p>
                  <p className="text-secondary leading-relaxed mb-4">
                    Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb der EU gekürzt wird. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
                  </p>
                  <p className="text-secondary leading-relaxed mb-4">
                    Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern. Darüber hinaus können Sie die Erfassung der durch das Cookie erzeugten Daten (inkl. Ihrer IP-Adresse) sowie deren Verarbeitung durch Google verhindern, indem Sie das unter folgendem Link verfügbare Browser-Plugin herunterladen und installieren: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout?hl=de</a>.
                  </p>
                  <p className="text-secondary leading-relaxed">
                    Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Diese wird beim ersten Besuch der Website über ein Cookie-Banner eingeholt.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-umwelt-800 mb-4">
                    c) Kontaktformular
                  </h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular (inklusive der dort angegebenen Kontaktdaten) zwecks Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p className="text-secondary leading-relaxed">
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
                4. Weitergabe von Daten
              </h2>
              <p className="text-secondary leading-relaxed mb-3">
                Eine Übermittlung Ihrer persönlichen Daten an Dritte findet nur statt, wenn:
              </p>
              <ul className="text-secondary list-disc pl-6 space-y-1">
                <li>Sie Ihre ausdrückliche Einwilligung erteilt haben,</li>
                <li>die Verarbeitung zur Vertragserfüllung erforderlich ist,</li>
                <li>eine gesetzliche Verpflichtung besteht,</li>
                <li>oder die Weitergabe zur Wahrung berechtigter Interessen erforderlich ist.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
                5. Betroffenenrechte
              </h2>
              <p className="text-secondary leading-relaxed mb-3">
                Sie haben das Recht:
              </p>
              <ul className="text-secondary list-disc pl-6 space-y-1">
                <li>gemäß Art. 15 DSGVO Auskunft über Ihre verarbeiteten Daten zu verlangen,</li>
                <li>gemäß Art. 16 DSGVO Berichtigung unrichtiger Daten zu verlangen,</li>
                <li>gemäß Art. 17 DSGVO Löschung Ihrer Daten zu verlangen,</li>
                <li>gemäß Art. 18 DSGVO Einschränkung der Verarbeitung zu verlangen,</li>
                <li>gemäß Art. 20 DSGVO Datenübertragbarkeit zu erhalten,</li>
                <li>gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung einzulegen,</li>
                <li>gemäß Art. 7 Abs. 3 DSGVO Ihre Einwilligung jederzeit zu widerrufen,</li>
                <li>gemäß Art. 77 DSGVO Beschwerde bei einer Aufsichtsbehörde einzulegen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
                6. Datensicherheit
              </h2>
              <p className="text-secondary leading-relaxed">
                Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen Manipulation, Verlust oder unbefugten Zugriff zu schützen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-umwelt-800 mb-4">
                7. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p className="text-secondary leading-relaxed">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2025. Wir behalten uns vor, sie bei Änderungen unserer Website oder gesetzlicher Vorgaben zu aktualisieren.
              </p>
            </section>
          </div>
        </main>
      </ContentSection>
      <Footer />
    </>
  )
}