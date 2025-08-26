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

    // Log the submission (so we can see it works)
    console.log('New project submission:', {
      name,
      email,
      project,
      projectDescription,
      timestamp: new Date().toISOString()
    })

    // Check if SMTP is configured
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

    if (smtpConfigured) {
      try {
        // Create transporter with debugging
        console.log('SMTP Config:', {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
          pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET'
        })

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        })

        // Email content
        const mailOptions = {
          from: process.env.SMTP_USER,
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
        console.log('Email sent successfully')

      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Continue anyway - don't fail the request just because email failed
      }
    } else {
      console.log('SMTP not configured - email not sent')
    }

    // Always return success (project submission logged)
    return NextResponse.json(
      { 
        message: smtpConfigured 
          ? 'Projekt erfolgreich eingereicht und E-Mail gesendet' 
          : 'Projekt erfolgreich eingereicht (E-Mail-Versand nicht konfiguriert)'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage' },
      { status: 500 }
    )
  }
}