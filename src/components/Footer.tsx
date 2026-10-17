import Link from 'next/link'
import { ANGEBOTE_UEBERSICHT, UEBER_MICH_NAV, ZIELGRUPPEN_NAV } from '@/data/angebote-navigation'

const LINKS = [
  { href: ANGEBOTE_UEBERSICHT.href, label: ANGEBOTE_UEBERSICHT.label },
  ...ZIELGRUPPEN_NAV,
  UEBER_MICH_NAV,
  { href: '/contact', label: 'Kontakt' },
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
]

export default function Footer() {
  return (
    <footer className="border-t border-dark bg-light" role="contentinfo">
      <div className="mx-auto max-w-[1500px] w-[90%] py-12 lg:py-16">
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-dark underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
