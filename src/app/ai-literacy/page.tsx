'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AILiteracyHero from '@/components/ai-literacy/AILiteracyHero'
import LearningPhase from '@/components/ai-literacy/LearningPhase'
import Quiz from '@/components/ai-literacy/Quiz'
import Certificate from '@/components/ai-literacy/Certificate'
import { learningPhases } from '@/data/ai-literacy'

export default function AILiteracyPage() {
  const [completedPhases, setCompletedPhases] = useState<number[]>([])
  const [showCertificate, setShowCertificate] = useState(false)

  const handlePhaseComplete = (phaseIndex: number) => {
    if (!completedPhases.includes(phaseIndex)) {
      const newCompleted = [...completedPhases, phaseIndex]
      setCompletedPhases(newCompleted)

      // Wenn alle 4 Phasen abgeschlossen sind, zeige Zertifikat
      if (newCompleted.length === 4) {
        setShowCertificate(true)
      }
    }
  }

  return (
    <>
      <Header />
      <div className="sr-only">
        <h1>AI Literacy Lernplattform - Das Entwicklerhaus</h1>
      </div>

      <AILiteracyHero />

      <main id="main-content" className="bg-light">
        {/* Fortschrittsanzeige */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-dark">Wo du gerade stehst</h2>
              <span className="text-lg font-semibold text-zukunft">
                {completedPhases.length} / 4 Phasen
              </span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-3">
              <div
                className="bg-zukunft h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedPhases.length / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lernphasen */}
        {learningPhases.map((phase, index) => (
          <LearningPhase
            key={index}
            phase={phase}
            phaseNumber={index + 1}
            isCompleted={completedPhases.includes(index)}
            onComplete={() => handlePhaseComplete(index)}
          />
        ))}

        {/* Zertifikat */}
        {showCertificate && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Certificate />
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
