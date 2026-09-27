import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { CampusLogoSchema } from '@/lib/validations'

/**
 * PATCH /api/admin/campuses/[id]/logo
 * Admin-only: set a logo_url on a campus after uploading to Storage.
 */
export async function PATCH(request: Request, context: any) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const parsed = CampusLogoSchema.safeParse(json)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const { id } = await context.params
        const supabase = createServiceClient() as any

        const { error } = await supabase
            .from('campuses')
            .update({ logo_url: parsed.data.logo_url })
            .eq('id', id)

        if (error) return apiError('Failed to update campus logo', 500)

        return apiOk({ message: 'Campus logo updated successfully' })
    } catch {
        return apiError('Internal server error', 500)
    }
}
