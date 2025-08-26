'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string
  email: string
  project: string
  projectDescription: string
  privacyConsent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  project?: string
  projectDescription?: string
  privacyConsent?: string
}

export default function ContactForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    project: '',
    projectDescription: '',
    privacyConsent: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }

    if (!formData.project.trim()) {
      newErrors.project = 'Projektname ist erforderlich'
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Projektbeschreibung ist erforderlich'
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Datenschutz-Zustimmung ist erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setShowSuccessPopup(true)
        setFormData({
          name: '',
          email: '',
          project: '',
          projectDescription: '',
          privacyConsent: false
        })
      } else {
        console.error('Server error:', result)
        alert(`Fehler beim Senden: ${result.error || 'Unbekannter Fehler'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }))
    if (errors.privacyConsent) {
      setErrors(prev => ({ ...prev, privacyConsent: undefined }))
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessPopup(false)
    router.push('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-dark mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ihr vollständiger Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-dark mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ihre@email.de"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="project" className="block text-lg font-medium text-dark mb-2">
            Projekt *
          </label>
          <input
            type="text"
            id="project"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.project ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Name Ihres Projekts"
          />
          {errors.project && <p className="text-red-500 text-sm mt-1">{errors.project}</p>}
        </div>

        <div>
          <label htmlFor="projectDescription" className="block text-lg font-medium text-dark mb-2">
            Projektbeschreibung *
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-vertical ${
              errors.projectDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Beschreiben Sie Ihr Projekt ausführlich: Ziele, Zielgruppe, aktueller Stand, benötigte Unterstützung..."
          />
          {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
        </div>

        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={handleCheckboxChange}
              className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
            />
            <span className={`text-sm ${errors.privacyConsent ? 'text-red-500' : 'text-secondary'}`}>
              Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
              <a href="/datenschutz" className="text-primary hover:underline" target="_blank">
                Datenschutzerklärung
              </a>{' '}
              zu. *
            </span>
          </label>
          {errors.privacyConsent && <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Wird gesendet...' : 'Projekt einreichen'}
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-dark mb-4">
              Vielen Dank!
            </h3>
            <p className="text-secondary mb-6">
              Vielen Dank für Ihr Projekt, wir werden uns bald bei Ihnen melden.
            </p>
            <button
              onClick={handleSuccessClose}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Zur Startseite
            </button>
          </div>
        </div>
      )}
    </>
  )
}