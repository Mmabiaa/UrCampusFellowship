import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { AdminChapterSchema } from '@/lib/validations'

function sanitizeChapterInput(input: any) {
    const cleaned = { ...input }
    for (const key of ['denomination_id', 'campus_id', 'meeting_day', 'meeting_time', 'location', 'description', 'whatsapp_link', 'logo_url']) {
        if (cleaned[key] === '') {
            delete cleaned[key]
        }
    }
    return cleaned
}

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
        const cleaned = sanitizeChapterInput(json)
        const parsed = AdminChapterSchema.safeParse(cleaned)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        const { data, error } = await supabase
            .from('chapters')
            .update(parsed.data)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return apiError('Failed to update chapter', 500)
        }

        return apiOk({ message: 'Chapter updated successfully', chapter: data })
    } catch {
        return apiError('Internal server error', 500)
    }
}
