import Link from 'next/link'
import { NAV_LINKS } from '@/lib/navigation'
import { staedte } from '@/data/staedte'

const linkClass =
  'text-dark underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors duration-200'

const headingClass = 'mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-800'

export default function Footer() {
  return (
    <footer className="border-t border-dark bg-light" role="contentinfo">
      <div className="mx-auto max-w-[1500px] w-[90%] py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <nav aria-label="Footer Navigation">
            <p className={headingClass}>Angebot</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Städte">
            <p className={headingClass}>Städte</p>
            <ul className="space-y-3">
              {staedte.map((stadt) => (
                <li key={stadt.slug}>
                  <Link href={`/${stadt.slug}`} className={linkClass}>
                    {stadt.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches und Info">
            <p className={headingClass}>Info</p>
            <ul className="space-y-3">
              <li>
                <Link href="/ueber-mich" className={linkClass}>
                  Über mich
                </Link>
              </li>
              <li>
                <Link href="/impressum" className={linkClass}>
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className={linkClass}>
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
