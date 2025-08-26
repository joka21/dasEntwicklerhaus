export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  timestamp: string
}

export const COOKIE_CONSENT_KEY = 'cookie-consent'

export const getStoredConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const storeConsent = (consent: Omit<CookieConsent, 'timestamp'>): void => {
  if (typeof window === 'undefined') return
  
  const consentWithTimestamp: CookieConsent = {
    ...consent,
    timestamp: new Date().toISOString()
  }
  
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp))
}

export const hasValidConsent = (): boolean => {
  const consent = getStoredConsent()
  if (!consent) return false
  
  const consentDate = new Date(consent.timestamp)
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
  
  return consentDate > thirtyDaysAgo
}

export const shouldShowAnalytics = (): boolean => {
  const consent = getStoredConsent()
  return consent?.analytics === true
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const loadGoogleAnalytics = (measurementId: string): void => {
  if (typeof window === 'undefined') return
  
  if (!window.gtag && shouldShowAnalytics()) {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `
    document.head.appendChild(script2)
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number): void => {
  if (typeof window !== 'undefined' && window.gtag && shouldShowAnalytics()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}