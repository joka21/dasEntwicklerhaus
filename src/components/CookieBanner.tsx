'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'

interface CookieConsent {
  necessary: boolean
  analytics: boolean
  timestamp: string
}

const STORAGE_KEY = 'cookie-consent'
// Auf dem Server ist die Einwilligung unbekannt – dann wird nichts gerendert.
const UNBEKANNT = 'unbekannt'

// localStorage als externe Quelle für useSyncExternalStore. Das storage-Event
// meldet nur Änderungen aus anderen Tabs, eigene Änderungen melden wir selbst.
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY)
}

function getServerSnapshot() {
  return UNBEKANNT
}

function parseConsent(raw: string | null): CookieConsent | null {
  if (!raw || raw === UNBEKANNT) return null
  try {
    return JSON.parse(raw) as CookieConsent
  } catch {
    return null
  }
}

function loadGoogleAnalytics() {
  if (typeof window !== 'undefined' && !window.gtag) {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true
      });
    `
    document.head.appendChild(script2)
  }
}

function saveConsent(newConsent: Omit<CookieConsent, 'timestamp'>) {
  const consentWithTimestamp = {
    ...newConsent,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consentWithTimestamp))
  listeners.forEach((listener) => listener())
}

export default function CookieBanner() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const savedConsent = parseConsent(raw)
  const isVisible = raw !== UNBEKANNT && savedConsent === null
  const [showSettings, setShowSettings] = useState(false)
  // Entwurf für den Einstellungsdialog; gespeichert wird erst beim Klick.
  const [analyticsDraft, setAnalyticsDraft] = useState(false)

  const analyticsErlaubt = savedConsent?.analytics === true
  useEffect(() => {
    if (analyticsErlaubt) loadGoogleAnalytics()
  }, [analyticsErlaubt])

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true })
    setShowSettings(false)
  }

  const handleAcceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false })
    setShowSettings(false)
  }

  const handleSaveSettings = () => {
    saveConsent({ necessary: true, analytics: analyticsDraft })
    setShowSettings(false)
  }

  const handleToggleAnalytics = () => {
    setAnalyticsDraft(prev => !prev)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {!showSettings ? (
          <div className="p-6">
            <h3 className="text-xl font-bold text-umwelt-800 mb-4">
              Wir verwenden Cookies
            </h3>
            <p className="text-secondary leading-relaxed mb-4">
              Wir nutzen Cookies, um unsere Website nutzerfreundlich zu gestalten und Ihnen bestimmte Funktionen bereitzustellen. Dazu zählen Cookies, die für den Betrieb der Seite notwendig sind, sowie solche, die zu Statistik- und Analysezwecken eingesetzt werden (z. B. Google Analytics).
            </p>
            <p className="text-secondary leading-relaxed mb-6">
              Sie können selbst entscheiden, ob Sie optionale Cookies zulassen möchten. Notwendige Cookies werden auch bei Ablehnung gesetzt. Weitere Informationen finden Sie in unserer{' '}
              <Link href="/datenschutz" className="text-primary hover:underline">
                Datenschutzerklärung
              </Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="bg-gray-200 text-dark px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Nur notwendige Cookies
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="border border-gray-300 text-dark px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Einstellungen
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-xl font-bold text-umwelt-800 mb-4">
              Cookie-Einstellungen
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-umwelt-800">
                    Notwendige Cookies
                  </h4>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Immer aktiv
                  </div>
                </div>
                <p className="text-secondary text-sm">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-umwelt-800">
                    Analyse-Cookies (Google Analytics)
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsDraft}
                      onChange={handleToggleAnalytics}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="text-secondary text-sm">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem sie Informationen anonym sammeln und melden.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleSaveSettings}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Einstellungen speichern
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="border border-gray-300 text-dark px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Zurück
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}