'use client'

import { useState } from 'react'
import Quiz from './Quiz'
import PracticeExample from './PracticeExample'
import InteractiveTask from './InteractiveTask'
import { LearningPhaseData } from '@/types/ai-literacy'

interface LearningPhaseProps {
  phase: LearningPhaseData
  phaseNumber: number
  isCompleted: boolean
  onComplete: () => void
}

export default function LearningPhase({ phase, phaseNumber, isCompleted, onComplete }: LearningPhaseProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true)
    if (score >= 2) { // Mindestens 2 von 3 Fragen richtig
      onComplete()
    }
  }

  return (
    <section className={`py-12 ${phaseNumber % 2 === 0 ? 'bg-light-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Phase Header */}
        <div className="flex items-start gap-6 mb-8">
          {/* Phase Number Circle */}
          <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
            isCompleted ? 'bg-umwelt text-white' : 'bg-zukunft text-white'
          }`}>
            {isCompleted ? '✓' : phaseNumber}
          </div>

          {/* Phase Title and Description */}
          <div className="flex-grow">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">
              {phase.title}
            </h2>
            <p className="text-lg text-dark-600 leading-relaxed mb-6">
              {phase.introduction}
            </p>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 bg-zukunft text-white px-6 py-3 rounded-lg hover:bg-zukunft-hover transition-colors duration-200 font-medium"
            >
              {isExpanded ? 'Weniger anzeigen' : 'Jetzt lernen'}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-8 animate-fadeIn">
            {/* Learning Objectives */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-zukunft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lernziele
              </h3>
              <ul className="space-y-2">
                {phase.learningGoals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3 text-dark-700">
                    <span className="text-zukunft font-bold mt-1">→</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Tasks */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark flex items-center gap-2">
                <svg className="w-7 h-7 text-menschen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Interaktive Übungen
              </h3>
              {phase.interactiveTasks.map((task, index) => (
                <InteractiveTask key={index} task={task} taskNumber={index + 1} />
              ))}
            </div>

            {/* Practice Examples */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark flex items-center gap-2">
                <svg className="w-7 h-7 text-frieden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Praxisbeispiele
              </h3>
              {phase.practiceExamples.map((example, index) => (
                <PracticeExample key={index} example={example} />
              ))}
            </div>

            {/* Quiz Section */}
            <div className="bg-gradient-to-r from-zukunft-100 to-menschen-100 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <svg className="w-7 h-7 text-zusammenarbeit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check dein Wissen
              </h3>
              {!quizCompleted ? (
                <Quiz questions={phase.quizQuestions} onComplete={handleQuizComplete} />
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-lg font-semibold text-umwelt-800">
                    Glückwunsch! Du hast diese Phase abgeschlossen.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
