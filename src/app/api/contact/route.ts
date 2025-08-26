import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, project, projectDescription, privacyConsent } = await req.json()

    // Validation
    if (!name || !email || !project || !projectDescription || !privacyConsent) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    // Create transporter (you'll need to configure this with your email provider)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@dasentwicklerhaus.de',
      to: 'admin@dasentwicklerhaus.de',
      subject: `Neues Projekt: ${project}`,
      html: `
        <h2>Neues Projekt eingereicht</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Projekt:</strong> ${project}</p>
        <p><strong>Projektbeschreibung:</strong></p>
        <p>${projectDescription.replace(/\n/g, '<br>')}</p>
        <p><strong>Datenschutz-Zustimmung:</strong> ✅ Erteilt</p>
        <hr>
        <p><small>Eingereicht am: ${new Date().toLocaleString('de-DE')}</small></p>
      `,
      text: `
        Neues Projekt eingereicht
        
        Name: ${name}
        E-Mail: ${email}
        Projekt: ${project}
        
        Projektbeschreibung:
        ${projectDescription}
        
        Datenschutz-Zustimmung: Erteilt
        
        Eingereicht am: ${new Date().toLocaleString('de-DE')}
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'E-Mail erfolgreich gesendet' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der E-Mail' },
      { status: 500 }
    )
  }
}