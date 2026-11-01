import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { RejectChapterSchema } from '@/lib/validations'
import { emailQueue } from '@/lib/email/queue'
import { createChapterRejectionEmail } from '@/lib/email'

export async function POST(request: Request, context: any) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const parsed = RejectChapterSchema.safeParse(json)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const { id } = await context.params
        const { reason } = parsed.data
        const supabase = createServiceClient() as any

        const { data: chapter, error: fetchError } = await supabase
            .from('chapters')
            .select('id, status, head_user_id')
            .eq('id', id)
            .single()

        if (fetchError || !chapter) return apiError('Chapter not found', 404)

        // Allow rejecting both 'pending_approval' and 'coming_soon' (both are awaiting approval)
        if (!['pending_approval', 'coming_soon'].includes(chapter.status)) {
            return apiError(`Cannot reject a chapter with status '${chapter.status}'. Only pending chapters can be rejected.`, 400)
        }

        // Get chapter details and user info BEFORE updating/deleting
        console.log('📧 [REJECT] Fetching chapter and user details for email...')
        const { data: chapterData } = await supabase
            .from('chapters')
            .select('name')
            .eq('id', id)
            .single()

        let userEmail = null
        let userName = null

        if (chapter.head_user_id && chapterData) {
            try {
                const { data: userData } = await supabase.auth.admin.getUserById(chapter.head_user_id)
                userEmail = userData?.user?.email
                userName = userData?.user?.user_metadata?.full_name
            } catch (error) {
                console.error('⚠️ [REJECT] Failed to fetch user data:', error)
            }
        }

        // Update chapter status to rejected
        const { error: updateError } = await supabase
            .from('chapters')
            .update({ status: 'rejected', rejection_reason: reason })
            .eq('id', id)

        if (updateError) return apiError('Failed to reject chapter', 500)

        // Send rejection email BEFORE deleting the user
        if (userEmail && chapterData) {
            try {
                console.log('📧 [REJECT] Queueing rejection email to:', userEmail)
                await emailQueue.addToQueue(
                    userEmail,
                    `Update on your ${chapterData.name} chapter application`,
                    createChapterRejectionEmail(
                        chapterData.name,
                        reason || 'Your application did not meet our current requirements.',
                        userName
                    )
                )
                console.log('✅ [REJECT] Email queued successfully')
            } catch (emailError) {
                console.error('❌ [REJECT] Failed to send email:', emailError)
            }
        }

        // Delete the chapter and auth user to allow reapplication
        console.log('🗑️ [REJECT] Deleting chapter from database...')
        const { error: deleteChapterError } = await supabase
            .from('chapters')
            .delete()
            .eq('id', id)

        if (deleteChapterError) {
            console.error('❌ [REJECT] Failed to delete chapter:', deleteChapterError)
        } else {
            console.log('✅ [REJECT] Chapter deleted successfully')
        }

        if (chapter.head_user_id) {
            console.log('🗑️ [REJECT] Deleting auth user...')
            try {
                const { error: deleteUserError } = await supabase.auth.admin.deleteUser(chapter.head_user_id)
                
                if (deleteUserError) {
                    console.error('❌ [REJECT] Failed to delete user:', deleteUserError)
                } else {
                    console.log('✅ [REJECT] User deleted successfully - user can now reapply')
                }
            } catch (deleteError) {
                console.error('❌ [REJECT] Error during user deletion:', deleteError)
            }
        }

        return apiOk({ message: 'Chapter rejected and removed. User can reapply with the same email.' })
    } catch {
        return apiError('Internal server error', 500)
    }
}
