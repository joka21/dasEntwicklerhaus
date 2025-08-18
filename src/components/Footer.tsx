import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Das Entwicklerhaus
            </h3>
            <p className="text-gray-300">
              Innovative Projekte aus Europa entdecken und präsentieren.
            </p>
          </div>
          <nav aria-label="Footer Navigation">
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/projects" 
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                >
                  Projekte
                </Link>
              </li>
              <li>
                <Link 
                  href="/die-idee" 
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                >
                  dieIdee
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
            <address className="text-gray-300 not-italic">
              <a 
                href="mailto:info@dasentwicklerhaus.de"
                className="hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                aria-label="E-Mail an Das Entwicklerhaus senden"
              >
                info@dasentwicklerhaus.de
              </a>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-300">
            © 2024 Das Entwicklerhaus. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}