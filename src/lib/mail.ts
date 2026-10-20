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

interface Mail {
  to: string
  subject: string
  html: string
  text: string
}

function smtpKonfiguriert(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

// Mail aus dem Kundenportal (Anmeldelinks, Benachrichtigungen). Absender ist
// PORTAL_MAIL_FROM, ersatzweise SMTP_USER. Wirft nie, sondern meldet über den
// Rückgabewert, ob die Mail angenommen wurde; Fehler werden geloggt.
export async function sendPortalMail({ to, subject, html, text }: Mail): Promise<boolean> {
  if (!smtpKonfiguriert()) {
    console.warn('SMTP nicht konfiguriert – Mail nicht gesendet:', subject)
    return false
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
      from: process.env.PORTAL_MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
      text,
    })
    return true
  } catch (error) {
    console.error('Mailversand fehlgeschlagen:', subject, error)
    return false
  }
}

// Benachrichtigung an mich. Ein Mailfehler darf die eigentliche Aktion
// (Kommentar, Freigabe) nicht scheitern lassen – er wird nur geloggt.
export async function sendAdminMail(mail: Omit<Mail, 'to'>): Promise<void> {
  const empfaenger = process.env.PORTAL_ADMIN_EMAIL
  if (!empfaenger) {
    console.warn('PORTAL_ADMIN_EMAIL nicht konfiguriert – Benachrichtigung nicht gesendet:', mail.subject)
    return
  }
  await sendPortalMail({ ...mail, to: empfaenger })
}
