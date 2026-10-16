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

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
    try {
        // For development: log to console
        if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
            console.log('📧 Email (Development Mode)')
            console.log('To:', to)
            console.log('Subject:', subject)
            console.log('Body:', html)
            return true
        }

        // Send email using Google SMTP
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.SMTP_USER,
            to,
            subject,
            html,
        })

        console.log('📧 Email sent to:', to)
        return true
    } catch (error) {
        console.error('Failed to send email:', error)
        return false
    }
}

// Re-export email templates
export { createChapterRejectionEmail, createChapterApprovalEmail } from './email/templates'
