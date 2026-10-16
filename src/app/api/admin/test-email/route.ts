import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { emailQueue } from '@/lib/email/queue'
import { sendEmail } from '@/lib/email'

/**
 * POST /api/admin/test-email
 * Send a test email (for debugging email configuration)
 */
export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const { to, useQueue = true } = json

        if (!to) {
            return apiError('Email address required', 400)
        }

        const testEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>🧪 Test Email from UrCampus Fellowship</h2>
                <p>This is a test email sent at ${new Date().toISOString()}</p>
                <p>If you received this, your email configuration is working correctly!</p>
                <hr>
                <p style="color: #666; font-size: 12px;">
                    Sent from: ${process.env.EMAIL_FROM || process.env.SMTP_USER}<br>
                    SMTP Host: ${process.env.SMTP_HOST}<br>
                    SMTP Port: ${process.env.SMTP_PORT}
                </p>
            </body>
            </html>
        `

        if (useQueue) {
            await emailQueue.addToQueue(to, '🧪 Test Email from UrCampus Fellowship', testEmailHtml)
            return apiOk({ message: 'Test email queued successfully', method: 'queue' })
        } else {
            const success = await sendEmail({
                to,
                subject: '🧪 Test Email from UrCampus Fellowship',
                html: testEmailHtml,
            })

            if (success) {
                return apiOk({ message: 'Test email sent successfully', method: 'direct' })
            } else {
                return apiError('Failed to send test email', 500)
            }
        }
    } catch (error) {
        console.error('Test email error:', error)
        return apiError('Internal server error', 500)
    }
}
