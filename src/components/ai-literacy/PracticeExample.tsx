'use client'

import { useState } from 'react'
import { PracticeExampleData } from '@/types/ai-literacy'

interface PracticeExampleProps {
  example: PracticeExampleData
}

export default function PracticeExample({ example }: PracticeExampleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-secondary-200 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 flex items-start justify-between hover:bg-light-50 transition-colors duration-200"
      >
        <div className="flex items-start gap-4 flex-grow">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-frieden-100 flex items-center justify-center">
            <span className="text-2xl">{example.icon}</span>
          </div>
          <div className="flex-grow">
            <h4 className="text-lg font-bold text-dark mb-1">{example.title}</h4>
            <p className="text-sm text-dark-600">{example.category}</p>
          </div>
        </div>
        <svg
          className={`w-6 h-6 text-dark-500 transition-transform duration-300 flex-shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 animate-fadeIn">
          {/* Situation */}
          <div>
            <h5 className="font-semibold text-dark mb-2">Ausgangssituation:</h5>
            <p className="text-dark-700 leading-relaxed">{example.situation}</p>
          </div>

          {/* AI Solution */}
          <div className="bg-zukunft-50 p-4 rounded-lg border border-zukunft-200">
            <h5 className="font-semibold text-dark mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-zukunft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              KI-Lösung:
            </h5>
            <p className="text-dark-700 leading-relaxed">{example.solution}</p>
          </div>

          {/* Benefits */}
          <div>
            <h5 className="font-semibold text-dark mb-2">Nutzen:</h5>
            <ul className="space-y-2">
              {example.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-dark-700">
                  <svg className="w-5 h-5 text-umwelt flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-secondary-200">
            <button className="w-full bg-frieden text-white py-3 rounded-lg hover:bg-frieden-hover transition-colors duration-200 font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Probier es aus!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
