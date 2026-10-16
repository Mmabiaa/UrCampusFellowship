import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { AdminChapterSchema } from '@/lib/validations'
import { emailQueue } from '@/lib/email/queue'
import { createChapterApprovalEmail, createChapterRejectionEmail } from '@/lib/email'

function sanitizeChapterInput(input: any) {
    const cleaned = { ...input }
    for (const key of ['denomination_id', 'campus_id', 'meeting_day', 'meeting_time', 'location', 'description', 'whatsapp_link', 'logo_url']) {
        if (cleaned[key] === '') {
            delete cleaned[key]
        }
    }
    return cleaned
}

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        const { data: chapters, error } = await supabase
            .from('chapters')
            .select(`id, name, status, denomination_id, campus_id, meeting_day, meeting_time, location, description, whatsapp_link, logo_url, created_at, denominations(id, name), campuses(id, name)`)
            .order('created_at', { ascending: false })

        if (error) return apiError('Failed to fetch chapters', 500)

        return apiOk({ chapters })
    } catch {
        return apiError('Internal server error', 500)
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const cleaned = sanitizeChapterInput(json)
        const parsed = AdminChapterSchema.safeParse(cleaned)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        const { data, error } = await supabase
            .from('chapters')
            .insert(parsed.data)
            .select()
            .single()

        if (error) {
            return apiError('Failed to create chapter shell', 500)
        }

        return apiOk({ message: 'Chapter created successfully', chapter: data })
    } catch {
        return apiError('Internal server error', 500)
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const { id, ...updateFields } = json

        if (!id) return apiError('Chapter ID is required for updates', 400)

        const cleaned = sanitizeChapterInput(updateFields)
        const parsed = AdminChapterSchema.safeParse(cleaned)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        // Get the existing chapter data to detect status changes
        const { data: existingChapter } = await supabase
            .from('chapters')
            .select('id, name, status, head_user_id')
            .eq('id', id)
            .single()

        const { data, error } = await supabase
            .from('chapters')
            .update(parsed.data)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return apiError('Failed to update chapter', 500)
        }

        // Send email if status changed to approved or rejected
        if (existingChapter && parsed.data.status && existingChapter.status !== parsed.data.status) {
            const statusChanged = parsed.data.status

            if (statusChanged === 'active' && existingChapter.status === 'pending_approval') {
                // Get head user email
                const { data: userData } = await supabase.auth.admin.getUserById(existingChapter.head_user_id)
                
                if (userData?.user?.email) {
                    console.log('📧 Queueing approval email to:', userData.user.email)
                    await emailQueue.addToQueue(
                        userData.user.email,
                        `Your ${data.name} chapter has been approved!`,
                        createChapterApprovalEmail(
                            data.name,
                            userData.user.user_metadata?.full_name
                        )
                    )
                }
            } else if (statusChanged === 'rejected') {
                // Get head user email and rejection reason
                const { data: userData } = await supabase.auth.admin.getUserById(existingChapter.head_user_id)
                const rejectionReason = json.rejection_reason || 'Your application did not meet our current requirements.'
                
                if (userData?.user?.email) {
                    console.log('📧 Queueing rejection email to:', userData.user.email)
                    await emailQueue.addToQueue(
                        userData.user.email,
                        `Update on your ${data.name} chapter application`,
                        createChapterRejectionEmail(
                            data.name,
                            rejectionReason,
                            userData.user.user_metadata?.full_name
                        )
                    )
                }
            }
        }

        return apiOk({ message: 'Chapter updated successfully', chapter: data })
    } catch {
        return apiError('Internal server error', 500)
    }
}
