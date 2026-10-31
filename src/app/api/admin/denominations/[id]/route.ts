import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { DenominationSchema } from '@/lib/validations'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const parsed = DenominationSchema.partial().safeParse(json)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        const { data, error } = await supabase
            .from('denominations')
            .update(parsed.data)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            if (error.code === '23505') return apiError('A denomination with this name already exists', 409)
            return apiError('Failed to update denomination', 500)
        }

        return apiOk({ message: 'Denomination updated successfully', denomination: data })
    } catch {
        return apiError('Internal server error', 500)
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        // Check if denomination exists
        const { data: denomination, error: fetchError } = await supabase
            .from('denominations')
            .select('id, name')
            .eq('id', id)
            .single()

        if (fetchError || !denomination) {
            return apiError('Denomination not found', 404)
        }

        // Check if denomination is being used by any chapters
        const { data: chapters, error: chaptersError } = await supabase
            .from('chapters')
            .select('id')
            .eq('denomination_id', id)
            .limit(1)

        if (chaptersError) {
            return apiError('Failed to check denomination usage', 500)
        }

        if (chapters && chapters.length > 0) {
            return apiError('Cannot delete denomination: it is currently being used by one or more chapters', 409)
        }

        // Delete the denomination
        const { error } = await supabase
            .from('denominations')
            .delete()
            .eq('id', id)

        if (error) {
            return apiError('Failed to delete denomination', 500)
        }

        return apiOk({ message: 'Denomination deleted successfully' })
    } catch {
        return apiError('Internal server error', 500)
    }
}
