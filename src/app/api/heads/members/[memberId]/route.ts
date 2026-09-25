import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getSession, apiError, apiOk } from '@/lib/api-helpers'
import { MemberActionSchema } from '@/lib/validations'

export async function PATCH(
    request: Request,
    context: any
) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const json = await request.json()
        const parsed = MemberActionSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { action } = parsed.data
        const supabase = await createServerSupabaseClient()

        // RLS will ensure they can only update a membership if they own the target chapter
        const updateData: any = { status: action === 'flag' ? 'flagged' : 'removed' }

        if (action === 'flag') {
            updateData.flagged_at = new Date().toISOString()
            updateData.flagged_by = session.user.id
        } else if (action === 'remove') {
            updateData.left_at = new Date().toISOString()
        }

        const { error } = await (supabase as any)
            .from('memberships')
            .update(updateData)
            .eq('id', (await context.params).memberId)

        if (error) {
            return apiError('Failed to update member status', 500)
        }

        return apiOk({ message: `Member ${action === 'flag' ? 'flagged' : 'removed'} successfully` })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
