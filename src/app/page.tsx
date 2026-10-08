import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import BausteinLeiter from '@/components/angebot/BausteinLeiter'
import KontaktAufruf from '@/components/angebot/KontaktAufruf'
import Platzhalter from '@/components/angebot/Platzhalter'
import { LocalBusinessSchema } from '@/components/StructuredData'
import { staedte } from '@/data/staedte'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Onlineshop & Website Krefeld | Das Entwicklerhaus',
  description:
    'Onlineshops, Websites und Marketing für Krefeld und den Niederrhein – im Baukasten-Prinzip: vom Eintrag im Portal bis zur laufenden Betreuung.',
  path: '/',
})

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <main id="main-content">
        <Hero title="Onlineshops, Websites und Marketing für Krefeld und den Niederrhein" />

        <ContentSection>
          <div className="mx-auto max-w-5xl space-y-16">
            <section aria-labelledby="baukasten-prinzip">
              <h2 id="baukasten-prinzip" className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-6">
                Das Baukasten-Prinzip
              </h2>
              <Platzhalter>[Platzhalter: Erklärung des Baukasten-Prinzips]</Platzhalter>
            </section>

            <section aria-labelledby="stufen">
              <h2 id="stufen" className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-6">
                Sechs Stufen
              </h2>
              <BausteinLeiter />
              <p className="mt-6">
                <Link href="/baukasten" className="font-medium text-primary-900 underline hover:text-primary-700">
                  Stufen und Zusatzbausteine im Baukasten zusammenstellen
                </Link>
              </p>
            </section>

            <section aria-labelledby="staedte">
              <h2 id="staedte" className="text-3xl lg:text-4xl font-bold text-umwelt-800 mb-6">
                Einstieg nach Stadt
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {staedte.map((stadt) => (
                  <li key={stadt.slug}>
                    <Link
                      href={`/${stadt.slug}`}
                      className="block rounded-lg bg-white p-6 text-xl font-semibold text-dark shadow-md transition-shadow hover:shadow-lg"
                    >
                      {stadt.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <KontaktAufruf />
          </div>
        </ContentSection>
      </main>
    </>
  )
}
