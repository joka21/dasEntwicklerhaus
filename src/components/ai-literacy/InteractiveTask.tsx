'use client'

import { useState } from 'react'
import { InteractiveTaskData } from '@/types/ai-literacy'

interface InteractiveTaskProps {
  task: InteractiveTaskData
  taskNumber: number
}

export default function InteractiveTask({ task, taskNumber }: InteractiveTaskProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setUserAnswer('')
    setIsSubmitted(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-menschen">
      {/* Task Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-menschen rounded-full flex items-center justify-center text-white font-bold">
          {taskNumber}
        </div>
        <div>
          <h4 className="text-lg font-bold text-dark mb-2">{task.title}</h4>
          <p className="text-dark-600 leading-relaxed">{task.description}</p>
        </div>
      </div>

      {/* Task Content */}
      <div className="space-y-4">
        {/* Prompt/Question */}
        {task.prompt && (
          <div className="bg-menschen-100 p-4 rounded-lg border border-menschen-200">
            <p className="text-dark-700 italic">{task.prompt}</p>
          </div>
        )}

        {/* Input Area */}
        {!isSubmitted ? (
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Deine Antwort:</label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Schreibe hier deine Gedanken..."
              className="w-full p-4 border-2 border-secondary-300 rounded-lg focus:border-menschen focus:ring-2 focus:ring-menschen-200 transition-colors duration-200 min-h-[120px] resize-y"
            />
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="mt-3 bg-menschen text-white px-6 py-2 rounded-lg hover:bg-menschen-hover transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Absenden
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* User's Answer */}
            <div>
              <p className="text-sm font-medium text-dark-700 mb-2">Deine Antwort:</p>
              <div className="bg-light-100 p-4 rounded-lg border border-secondary-200">
                <p className="text-dark-700 whitespace-pre-wrap">{userAnswer}</p>
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-umwelt-50 p-4 rounded-lg border border-umwelt-200">
              <h5 className="font-semibold text-dark mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-umwelt" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Gut gemacht!
              </h5>
              <p className="text-dark-700 leading-relaxed mb-3">{task.feedback}</p>
              {task.sampleAnswer && (
                <div className="mt-3 pt-3 border-t border-umwelt-200">
                  <p className="text-sm font-medium text-dark-700 mb-2">Beispielantwort:</p>
                  <p className="text-sm text-dark-600 italic">{task.sampleAnswer}</p>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="text-dark-600 hover:text-dark-800 transition-colors duration-200 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
