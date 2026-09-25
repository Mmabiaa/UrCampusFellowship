import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        const { data: chapters, error } = await supabase
            .from('chapters')
            .select(`id, name, status, created_at, denominations(id, name), campuses(id, name)`)
            .order('created_at', { ascending: false })

        if (error) return apiError('Failed to fetch chapters', 500)

        return apiOk({ chapters })
    } catch {
        return apiError('Internal server error', 500)
    }
}
