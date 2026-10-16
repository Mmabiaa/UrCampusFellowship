/**
 * Email service for sending notifications using Google SMTP
 * Requires nodemailer package and Google App Password
 * Environment variables needed:
 * - SMTP_HOST (smtp.gmail.com)
 * - SMTP_PORT (587)
 * - SMTP_USER (your Gmail address)
 * - SMTP_PASS (your Google App Password)
 * - EMAIL_FROM (sender email address)
 */

import nodemailer from 'nodemailer'

interface EmailOptions {
    to: string
    subject: string
    html: string
}

// Check if email is configured
function isEmailConfigured(): boolean {
    return !!(
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS
    )
}

// Create reusable transporter only if configured
let transporter: any = null

function getTransporter(): any {
    if (!transporter && isEmailConfigured()) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            debug: true, // Enable debug output
            logger: true, // Log to console
        })
    }

    if (!transporter) {
        throw new Error('Email transporter not configured. Check environment variables.')
    }

    return transporter
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
    console.log('🔍 sendEmail called')
    console.log('  To:', to)
    console.log('  Subject:', subject)
    console.log('  SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET')
    console.log('  SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET')
    console.log('  SMTP_USER:', process.env.SMTP_USER || 'NOT SET')
    console.log('  SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'NOT SET')
    
    try {
        // Check if email is configured
        if (!isEmailConfigured()) {
            console.warn('⚠️ Email not configured. Missing environment variables.')
            console.log('Logging to console instead:')
            console.log('📧 Email (Development Mode - No SMTP Config)')
            console.log('To:', to)
            console.log('Subject:', subject)
            console.log('---')
            return true
        }

        console.log('✓ Email is configured, creating transporter...')
        const emailTransporter = getTransporter()

        // Verify transporter configuration
        console.log('Verifying SMTP connection...')
        await emailTransporter.verify()
        console.log('✓ Email server connection verified')

        // Send email using Google SMTP
        console.log('Sending email...')
        const info = await emailTransporter.sendMail({
            from: `"UrCampus Fellowship" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        })

        console.log('📧 Email sent successfully!')
        console.log('Message ID:', info.messageId)
        console.log('To:', to)
        console.log('Subject:', subject)
        
        return true
    } catch (error) {
        console.error('❌ Failed to send email:', error)
        if (error instanceof Error) {
            console.error('Error details:', error.message)
            console.error('Error stack:', error.stack)
        }
        return false
    }
}

// Re-export email templates
export {
    createChapterRejectionEmail,
    createChapterApprovalEmail,
    createWelcomeEmail,
    createWaitlistConfirmationEmail,
} from './email/templates'
