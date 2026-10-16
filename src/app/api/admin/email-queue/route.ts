import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { emailQueue } from '@/lib/email/queue'

/**
 * GET /api/admin/email-queue
 * Get the current email queue status (for debugging)
 */
export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const status = emailQueue.getQueueStatus()

        return apiOk({
            queue: status,
            emailConfigured: !!(
                process.env.SMTP_HOST &&
                process.env.SMTP_PORT &&
                process.env.SMTP_USER &&
                process.env.SMTP_PASS
            ),
            config: {
                host: process.env.SMTP_HOST || 'not set',
                port: process.env.SMTP_PORT || 'not set',
                user: process.env.SMTP_USER || 'not set',
                from: process.env.EMAIL_FROM || 'not set',
            },
        })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
