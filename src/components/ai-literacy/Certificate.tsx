'use client'

import { useState } from 'react'

export default function Certificate() {
  const [userName, setUserName] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)
  const currentDate = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const handleGenerate = () => {
    if (userName.trim()) {
      setIsGenerated(true)
    }
  }

  const handleDownload = () => {
    window.print()
  }

  if (!isGenerated) {
    return (
      <div className="bg-gradient-to-br from-zukunft-100 via-menschen-100 to-umwelt-100 rounded-lg shadow-xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-3xl font-bold text-dark mb-4">Gratulation!</h2>
          <p className="text-lg text-dark-700 mb-8">
            Du hast alle vier Lernphasen erfolgreich abgeschlossen. Erstelle jetzt dein persönliches
            AI Literacy Zertifikat!
          </p>

          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <label className="block text-left text-sm font-medium text-dark-700 mb-2">
              Dein Name für das Zertifikat:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Vorname Nachname"
              className="w-full p-4 border-2 border-secondary-300 rounded-lg focus:border-zukunft focus:ring-2 focus:ring-zukunft-200 transition-colors duration-200"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!userName.trim()}
            className="bg-zukunft text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-zukunft-hover transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Zertifikat erstellen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Certificate */}
      <div
        id="certificate"
        className="bg-white rounded-lg shadow-2xl p-12 border-8 border-double border-zukunft relative overflow-hidden print:shadow-none"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zukunft via-menschen to-umwelt"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-zukunft to-menschen rounded-full flex items-center justify-center text-4xl shadow-lg">
              🏆
            </div>
          </div>

          {/* Header */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-dark-600 mb-2">Zertifikat</h3>
            <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-2">AI Literacy</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-zukunft via-menschen to-umwelt mx-auto"></div>
          </div>

          {/* Recipient */}
          <div className="py-8">
            <p className="text-lg text-dark-600 mb-4">Hiermit wird bestätigt, dass</p>
            <p className="text-3xl lg:text-4xl font-bold text-dark mb-4 px-8 py-4 bg-light-100 rounded-lg inline-block">
              {userName}
            </p>
            <p className="text-lg text-dark-600">
              die AI Literacy Lernplattform erfolgreich abgeschlossen hat
            </p>
          </div>

          {/* Competencies */}
          <div className="bg-light-50 rounded-lg p-6 my-8">
            <h4 className="text-lg font-bold text-dark mb-4">Erworbene Kompetenzen:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-umwelt flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-dark-700">Grundlagen der Künstlichen Intelligenz</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-umwelt flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-dark-700">Praktische KI-Anwendung im Berufsalltag</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-umwelt flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-dark-700">Ethischer und verantwortungsvoller KI-Einsatz</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-umwelt flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-dark-700">Datenschutz und KI-Sicherheit</span>
              </div>
            </div>
          </div>

          {/* Date and Organization */}
          <div className="flex justify-between items-end pt-8 border-t-2 border-secondary-200">
            <div className="text-left">
              <p className="text-sm text-dark-600">Ausstellungsdatum</p>
              <p className="text-lg font-semibold text-dark">{currentDate}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-dark-600">Ausgestellt von</p>
              <p className="text-lg font-bold text-zukunft">Das Entwicklerhaus</p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6">
            <p className="text-xs text-dark-500 italic">
              Menschen befähigen, Technologie sinnvoll einzusetzen
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 print:hidden">
        <button
          onClick={handleDownload}
          className="bg-zukunft text-white px-8 py-3 rounded-lg hover:bg-zukunft-hover transition-colors duration-200 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Drucken / Als PDF speichern
        </button>
        <button
          onClick={() => setIsGenerated(false)}
          className="bg-white text-dark border-2 border-secondary-300 px-8 py-3 rounded-lg hover:bg-light-50 transition-colors duration-200 font-medium"
        >
          Neues Zertifikat
        </button>
      </div>

      {/* Success Message */}
      <div className="bg-umwelt-50 rounded-lg p-6 text-center border border-umwelt-200 print:hidden">
        <h4 className="text-xl font-bold text-dark mb-2">Herzlichen Glückwunsch! 🎉</h4>
        <p className="text-dark-700 mb-4">
          Du hast wertvolle Kompetenzen im Umgang mit Künstlicher Intelligenz erworben. Setze dein Wissen
          jetzt in der Praxis ein und gestalte die digitale Zukunft aktiv mit!
        </p>
        <p className="text-sm text-dark-600">
          Teile dein Zertifikat gerne auf LinkedIn oder nutze es für deine berufliche Weiterentwicklung.
        </p>
      </div>
    </div>
  )
}
