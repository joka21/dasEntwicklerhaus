'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/types/ai-literacy'

interface QuizProps {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz beenden und Ergebnis berechnen
      const finalScore = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)
      setScore(finalScore)
      setShowResults(true)
      onComplete(finalScore)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setScore(0)
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = score >= 2

    return (
      <div className="text-center py-8">
        <div className={`text-6xl mb-6 ${passed ? 'animate-bounce' : ''}`}>
          {passed ? '🎉' : '💪'}
        </div>
        <h4 className="text-2xl font-bold text-dark mb-4">
          {passed ? 'Fantastisch!' : 'Weiter üben!'}
        </h4>
        <p className="text-xl text-dark-700 mb-6">
          Du hast <span className="font-bold text-zukunft">{score}</span> von{' '}
          <span className="font-bold">{questions.length}</span> Fragen richtig beantwortet
          ({percentage}%)
        </p>
        {passed ? (
          <p className="text-lg text-umwelt-700 mb-8">
            Du hast diese Phase erfolgreich abgeschlossen und kannst zur nächsten übergehen!
          </p>
        ) : (
          <p className="text-lg text-menschen-700 mb-8">
            Wiederhole die Lerninhalte und versuche es erneut. Du schaffst das!
          </p>
        )}
        <button
          onClick={handleRestart}
          className="bg-zukunft text-white px-8 py-3 rounded-lg hover:bg-zukunft-hover transition-colors duration-200 font-medium"
        >
          Quiz wiederholen
        </button>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== undefined

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-dark-600">
          Frage {currentQuestion + 1} von {questions.length}
        </span>
        <div className="flex-grow mx-4">
          <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
            <div
              className="bg-zukunft h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h4 className="text-xl font-bold text-dark mb-6">{question.question}</h4>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-zukunft bg-zukunft-100 shadow-md'
                  : 'border-secondary-300 bg-white hover:border-zukunft-300 hover:bg-zukunft-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-zukunft bg-zukunft'
                      : 'border-secondary-400'
                  }`}
                >
                  {selectedAnswers[currentQuestion] === index && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-dark-700">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {isAnswered && question.explanation && (
          <div className="mt-6 p-4 bg-zukunft-50 rounded-lg border border-zukunft-200">
            <p className="text-sm text-dark-700">
              <span className="font-semibold">Hinweis:</span> {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-dark-700 hover:bg-white"
        >
          ← Zurück
        </button>
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="bg-zukunft text-white px-8 py-3 rounded-lg hover:bg-zukunft-hover transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? 'Ergebnis anzeigen' : 'Weiter →'}
        </button>
      </div>
    </div>
  )
}
