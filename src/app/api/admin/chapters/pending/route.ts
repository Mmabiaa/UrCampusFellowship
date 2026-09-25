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
            .select(`id, name, status, submitted_at, denominations(id, name), campuses(id, name)`)
            .eq('status', 'pending_approval')
            .order('submitted_at', { ascending: true })

        if (error) return apiError('Failed to fetch pending chapters', 500)

        return apiOk({ pending: chapters })
    } catch {
        return apiError('Internal server error', 500)
    }
}
