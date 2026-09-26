import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { DenominationSchema } from '@/lib/validations'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        const { data: denominations, error } = await supabase
            .from('denominations')
            .select('id, name, description, logo_url, created_at')
            .order('name')

        if (error) return apiError('Failed to fetch denominations', 500)

        return apiOk({ denominations })
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
        const parsed = DenominationSchema.safeParse(json)
        if (!parsed.success) return apiError(parsed.error.issues[0].message, 422)

        const supabase = createServiceClient() as any

        const { data, error } = await supabase
            .from('denominations')
            .insert(parsed.data)
            .select()
            .single()

        if (error) {
            if (error.code === '23505') return apiError('A denomination with this name already exists', 409)
            return apiError('Failed to create denomination', 500)
        }

        return apiOk({ message: 'Denomination created successfully', denomination: data })
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

        if (!id) return apiError('Denomination ID is required for updates', 400)

        const parsed = DenominationSchema.partial().safeParse(updateFields)
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
