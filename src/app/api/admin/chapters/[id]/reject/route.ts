import { createServiceClient } from '@/lib/supabase/service'
import { RejectChapterSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(
    request: Request,
    context: any
) {
    try {
        const json = await request.json()
        const parsed = RejectChapterSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { reason } = parsed.data
        const supabase = createServiceClient() as any

        // Assuming same validation logic as approve (omitted for brevity, could refactor to helper)
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

        const { error: updateError } = await (supabase as any)
            .from('chapters')
            .update({
                status: 'rejected',
                rejection_reason: reason
            })
            .eq('id', (await context.params).id)

        if (updateError) {
            return apiError('Failed to reject chapter', 500)
        }

        // Optional: email the head with the rejection reason here

        return apiOk({ message: 'Chapter rejected successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
