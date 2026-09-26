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
            { count: totalChapters },
            { count: activeChapters },
            { count: pendingApprovals },
            { count: comingSoonChapters },
            { count: totalDenominations },
            { count: totalMembers },
        ] = await Promise.all([
            supabase.from('chapters').select('*', { count: 'exact', head: true }),
            supabase.from('chapters').select('*', { count: 'exact', head: true }).eq('status', 'active'),
            supabase.from('chapters').select('*', { count: 'exact', head: true }).eq('status', 'pending_approval'),
            supabase.from('chapters').select('*', { count: 'exact', head: true }).eq('status', 'coming_soon'),
            supabase.from('denominations').select('*', { count: 'exact', head: true }),
            supabase.from('student_profiles').select('*', { count: 'exact', head: true }),
        ])

        return apiOk({
            totalChapters: totalChapters ?? 0,
            activeChapters: activeChapters ?? 0,
            pendingApprovals: pendingApprovals ?? 0,
            comingSoonChapters: comingSoonChapters ?? 0,
            totalDenominations: totalDenominations ?? 0,
            totalMembers: totalMembers ?? 0,
        })
    } catch {
        return apiError('Internal server error', 500)
    }
}
