import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { RejectChapterSchema } from '@/lib/validations'

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

        if (chapter.status !== 'pending_approval') {
            return apiError(`Cannot reject a chapter with status '${chapter.status}'. Only 'pending_approval' chapters can be rejected.`, 400)
        }

        const { error: updateError } = await supabase
            .from('chapters')
            .update({ status: 'rejected', rejection_reason: reason })
            .eq('id', id)

        if (updateError) return apiError('Failed to reject chapter', 500)

        return apiOk({ message: 'Chapter rejected successfully' })
    } catch {
        return apiError('Internal server error', 500)
    }
}
