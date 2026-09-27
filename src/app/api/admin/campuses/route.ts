import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { CampusSchema } from '@/lib/validations'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        const { data: campuses, error } = await supabase
            .from('campuses')
            .select('id, name, logo_url')
            .order('name')

        if (error) return apiError('Failed to fetch campuses', 500)

        return apiOk({ campuses })
    } catch {
        return apiError('Internal server error', 500)
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const parsed = CampusSchema.safeParse(json)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        const { data, error } = await supabase
            .from('campuses')
            .insert(parsed.data)
            .select()
            .single()

        if (error) {
            if (error.code === '23505') return apiError('A campus with this name already exists', 409)
            return apiError('Failed to create campus', 500)
        }

        return apiOk({ message: 'Campus created successfully', campus: data })
    } catch {
        return apiError('Internal server error', 500)
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const json = await request.json()
        const { id, ...updateFields } = json

        if (!id) return apiError('Campus ID is required for updates', 400)

        const parsed = CampusSchema.partial().safeParse(updateFields)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        const { data, error } = await supabase
            .from('campuses')
            .update(parsed.data)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            if (error.code === '23505') return apiError('A campus with this name already exists', 409)
            return apiError('Failed to update campus', 500)
        }

        return apiOk({ message: 'Campus updated successfully', campus: data })
    } catch {
        return apiError('Internal server error', 500)
    }
}
