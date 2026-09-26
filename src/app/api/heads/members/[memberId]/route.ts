import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { MemberActionSchema } from '@/lib/validations'

export async function PATCH(
    request: Request,
    context: { params: Promise<{ memberId: string }> }
) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'head' && role !== 'admin') return apiError('Forbidden: Chapter heads only', 403)

        const json = await request.json()
        const parsed = MemberActionSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { action } = parsed.data
        const { memberId } = await context.params

        const supabase = createServiceClient() as any

        const updateData: any = { status: action === 'flag' ? 'flagged' : 'removed' }

        if (action === 'flag') {
            updateData.flagged_at = new Date().toISOString()
            updateData.flagged_by = session.user.id
        } else if (action === 'remove') {
            updateData.left_at = new Date().toISOString()
        }

        const { error } = await supabase
            .from('memberships')
            .update(updateData)
            .eq('id', memberId)

        if (error) {
            return apiError('Failed to update member status', 500)
        }

        return apiOk({ message: `Member ${action === 'flag' ? 'flagged' : 'removed'} successfully` })
    } catch {
        return apiError('Internal server error', 500)
    }
}
