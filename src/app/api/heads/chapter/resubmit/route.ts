import { createServiceClient } from '@/lib/supabase/service'
import { getSession, apiError, apiOk } from '@/lib/api-helpers'

export async function POST() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const supabase = createServiceClient() as any

        // Fetch head's chapter
        const { data: chapter, error: fetchError } = await (supabase as any)
            .from('chapters')
            .select('id, status')
            .eq('head_user_id', session.user.id)
            .single()

        if (fetchError || !chapter) {
            return apiError('Chapter not found', 404)
        }

        if (chapter.status !== 'rejected') {
            return apiError('Only rejected chapters can be resubmitted.', 400)
        }

        // Reset to pending_approval, clear rejection reason
        const { error: updateError } = await (supabase as any)
            .from('chapters')
            .update({ status: 'pending_approval', rejection_reason: null })
            .eq('id', chapter.id)

        if (updateError) {
            return apiError('Failed to resubmit chapter application', 500)
        }

        return apiOk({ message: 'Chapter application resubmitted successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
