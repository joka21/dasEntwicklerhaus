'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CookieConsent {
  necessary: boolean
  analytics: boolean
  timestamp: string
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    timestamp: ''
  })

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent')
    if (!savedConsent) {
      setIsVisible(true)
    } else {
      const parsed = JSON.parse(savedConsent) as CookieConsent
      setConsent(parsed)
      
      if (parsed.analytics) {
        loadGoogleAnalytics()
      }
    }
  }, [])

  const saveConsent = (newConsent: Omit<CookieConsent, 'timestamp'>) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consentWithTimestamp))
    setConsent(consentWithTimestamp)
    
    if (newConsent.analytics) {
      loadGoogleAnalytics()
    }
  }

  const loadGoogleAnalytics = () => {
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

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true })
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleAcceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false })
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleSaveSettings = () => {
    saveConsent(consent)
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleToggleAnalytics = () => {
    setConsent(prev => ({ ...prev, analytics: !prev.analytics }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {!showSettings ? (
          <div className="p-6">
            <h3 className="text-xl font-bold text-dark mb-4">
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
            <h3 className="text-xl font-bold text-dark mb-4">
              Cookie-Einstellungen
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-dark">
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
                  <h4 className="text-lg font-semibold text-dark">
                    Analyse-Cookies (Google Analytics)
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
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