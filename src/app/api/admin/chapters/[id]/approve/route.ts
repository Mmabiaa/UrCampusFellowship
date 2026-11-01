import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { emailQueue } from '@/lib/email/queue'
import { createChapterApprovalEmail } from '@/lib/email'

export async function POST(request: Request, context: any) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const { id } = await context.params
        const supabase = createServiceClient() as any

        const { data: chapter, error: fetchError } = await supabase
            .from('chapters')
            .select('id, status, head_user_id')
            .eq('id', id)
            .single()

        if (fetchError || !chapter) return apiError('Chapter not found', 404)

        // Allow approving both 'pending_approval' and 'coming_soon' (both are awaiting approval)
        if (!['pending_approval', 'coming_soon'].includes(chapter.status)) {
            return apiError(`Cannot approve a chapter with status '${chapter.status}'. Only pending chapters can be approved.`, 400)
        }

        // Check if chapter is complete (has all required fields)
        const { data: fullChapter } = await supabase
            .from('chapters')
            .select('meeting_day, meeting_time, location, whatsapp_link')
            .eq('id', id)
            .single()

        const requiredFields = ['meeting_day', 'meeting_time', 'location', 'whatsapp_link']
        const isComplete = fullChapter && requiredFields.every(
            field => fullChapter[field] && fullChapter[field].trim() !== ''
        )

        // Approved chapters become 'active' if complete, otherwise 'coming_soon'
        const newStatus = isComplete ? 'active' : 'coming_soon'

        const { error: updateError } = await supabase
            .from('chapters')
            .update({ status: newStatus, approved_at: new Date().toISOString() })
            .eq('id', id)

        if (updateError) return apiError('Failed to approve chapter', 500)

        // Send approval email to chapter head
        console.log('📧 [APPROVE] Sending approval email...')
        const { data: chapterData } = await supabase
            .from('chapters')
            .select('name')
            .eq('id', id)
            .single()

        if (chapter.head_user_id && chapterData) {
            try {
                const { data: userData } = await supabase.auth.admin.getUserById(chapter.head_user_id)
                
                if (userData?.user?.email) {
                    console.log('📧 [APPROVE] Queueing approval email to:', userData.user.email)
                    await emailQueue.addToQueue(
                        userData.user.email,
                        `Your ${chapterData.name} chapter has been approved!`,
                        createChapterApprovalEmail(
                            chapterData.name,
                            userData.user.user_metadata?.full_name
                        )
                    )
                    console.log('✅ [APPROVE] Email queued successfully')
                } else {
                    console.warn('⚠️ [APPROVE] No email found for head user')
                }
            } catch (emailError) {
                console.error('❌ [APPROVE] Failed to send email:', emailError)
            }
        }

        return apiOk({ message: 'Chapter approved successfully' })
    } catch {
        return apiError('Internal server error', 500)
    }
}
