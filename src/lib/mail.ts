import nodemailer from 'nodemailer'

// Nutzereingaben vor dem Einsetzen ins HTML der E-Mail maskieren.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface AdminMail {
  subject: string
  html: string
  text: string
}

// Benachrichtigung an mich. Wirft nie: Ein Mailfehler darf die eigentliche
// Aktion (Kommentar, Freigabe) nicht scheitern lassen – er wird nur geloggt.
export async function sendAdminMail({ subject, html, text }: AdminMail): Promise<void> {
  const empfaenger = process.env.PORTAL_ADMIN_EMAIL
  if (!empfaenger || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('PORTAL_ADMIN_EMAIL oder SMTP nicht konfiguriert – Benachrichtigung nicht gesendet:', subject)
    return
  }

  try {
    const port = parseInt(process.env.SMTP_PORT || '587')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: empfaenger,
      subject,
      html,
      text,
    })
  } catch (error) {
    console.error('Benachrichtigung fehlgeschlagen:', subject, error)
  }
}
