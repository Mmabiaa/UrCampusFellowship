import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'

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

        if (chapter.status !== 'pending_approval') {
            return apiError(`Cannot approve a chapter with status '${chapter.status}'. Only 'pending_approval' chapters can be approved.`, 400)
        }

        const { error: updateError } = await supabase
            .from('chapters')
            .update({ status: 'coming_soon', approved_at: new Date().toISOString() })
            .eq('id', id)

        if (updateError) return apiError('Failed to approve chapter', 500)

        return apiOk({ message: 'Chapter approved successfully' })
    } catch {
        return apiError('Internal server error', 500)
    }
}
