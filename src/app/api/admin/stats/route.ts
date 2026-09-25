import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        const [
            { count: chapterCount },
            { count: denomCount },
            { count: pendingCount },
        ] = await Promise.all([
            supabase.from('chapters').select('*', { count: 'exact', head: true }),
            supabase.from('denominations').select('*', { count: 'exact', head: true }),
            supabase.from('chapters').select('*', { count: 'exact', head: true }).eq('status', 'pending_approval'),
        ])

        return apiOk({
            totalChapters: chapterCount ?? 0,
            totalDenominations: denomCount ?? 0,
            pendingApprovals: pendingCount ?? 0,
        })
    } catch {
        return apiError('Internal server error', 500)
    }
}
