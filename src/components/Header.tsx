'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-light px-4 py-2 z-50 focus:z-50"
      >
        Zum Hauptinhalt springen
      </a>
      
      <header className="bg-light shadow-sm">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
          <nav className="flex h-16 items-center justify-between" aria-label="Hauptnavigation">
            <div className="flex items-center space-x-3">
              <Link 
                href="/" 
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 rounded-md"
                aria-label="Das Entwicklerhaus - Zur Startseite"
              >
                <Image
                  src="/images/logo/logo-Klein.webp"
                  alt=""
                  width={52}
                  height={40}
                  className="h-10 w-[52px]"
                />
                <span className="text-lg font-medium text-zusammenarbeit-800 lg:text-xl">
                  Das Entwicklerhaus
                </span>
              </Link>
            </div>
            
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link
                href="/projects"
                className="text-base font-medium text-umwelt-800 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Projekte
              </Link>
              <Link
                href="/blog"
                className="text-base font-medium text-menschen-800 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Blog
              </Link>
              <Link
                href="/ai-literacy"
                className="text-base font-medium text-zukunft-800 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 rounded-md px-2 py-1"
              >
                AI Literacy
              </Link>
              <Link
                href="/dieidee"
                className="text-base font-medium text-umwelt-800 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Die Idee
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-umwelt-800 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Kontakt
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-dark hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Hauptmenü {isMenuOpen ? 'schließen' : 'öffnen'}</span>
                <div className="h-6 w-6 flex flex-col justify-center items-center">
                  <span className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                  <span className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                  <span className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" id="mobile-menu">
            <div className="fixed inset-0 bg-dark bg-opacity-50" onClick={() => setIsMenuOpen(false)}></div>
            <div className="fixed top-0 right-0 bottom-0 w-64 bg-light shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-light-300">
                <span className="text-lg font-semibold text-dark">Menü</span>
                <button
                  type="button"
                  className="rounded-md p-2 text-dark hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Menü schließen</span>
                  <div className="h-6 w-6 flex flex-col justify-center items-center">
                    <span className="block h-0.5 w-6 bg-dark rotate-45 translate-y-1.5"></span>
                    <span className="block h-0.5 w-6 bg-dark -rotate-45 -translate-y-1.5"></span>
                  </div>
                </button>
              </div>
              
              <nav className="p-4 space-y-1">
                <Link
                  href="/projects"
                  className="block px-3 py-2 text-base font-medium text-umwelt-800 hover:text-primary hover:bg-light-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projekte
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2 text-base font-medium text-menschen-800 hover:text-primary hover:bg-light-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/ai-literacy"
                  className="block px-3 py-2 text-base font-medium text-zukunft-800 hover:text-primary hover:bg-light-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Literacy
                </Link>
                <Link
                  href="/dieidee"
                  className="block px-3 py-2 text-base font-medium text-umwelt-800 hover:text-primary hover:bg-light-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Die Idee
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-base font-medium text-umwelt-800 hover:text-primary hover:bg-light-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}