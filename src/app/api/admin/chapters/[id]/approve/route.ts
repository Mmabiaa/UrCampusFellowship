import { createServiceClient } from '@/lib/supabase/service'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(
    request: Request,
    context: any
) {
    try {
        const supabase = createServiceClient() as any

        // 1. Verify chapter is in correct state
        const { data: chapter, error: fetchError } = await (supabase as any)
            .from('chapters')
            .select('id, status, head_user_id')
            .eq('id', (await context.params).id)
            .single()

        if (fetchError || !chapter) {
            return apiError('Chapter not found', 404)
        }

        if (chapter.status !== 'pending_approval') {
            return apiError('Chapter is not in pending_approval state.', 400)
        }

        // 2. Approve: set status to coming_soon and record timestamp
        const { error: updateError } = await (supabase as any)
            .from('chapters')
            .update({
                status: 'coming_soon',
                approved_at: new Date().toISOString()
            })
            .eq('id', (await context.params).id)

        if (updateError) {
            return apiError('Failed to approve chapter', 500)
        }

        // Optional: send approval email to head via Supabase Edge Function or direct SMTP here
        // await notifyHeadOfApproval(chapter.head_user_id)

        return apiOk({ message: 'Chapter approved successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
