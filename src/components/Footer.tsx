import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-dark bg-light" role="contentinfo">
      <div className="mx-auto max-w-[1500px] w-[90%] py-12 lg:py-16">
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-12 sm:justify-center lg:justify-center">
            <li>
              <Link 
                href="/contact" 
                className="text-dark underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors duration-200"
                aria-label="Zur Kontaktseite navigieren"
              >
                Kontakt
              </Link>
            </li>
            <li>
              <Link 
                href="/impressum" 
                className="text-dark underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors duration-200"
                aria-label="Zum Impressum navigieren"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link 
                href="/datenschutz" 
                className="text-dark underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors duration-200"
                aria-label="Zur Datenschutzerklärung navigieren"
              >
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}