import { createServiceClient } from '@/lib/supabase/service'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const supabase = createServiceClient() as any

        // We can do this with multiple concurrent promise calls OR a custom rpc. For simplicity, concurrent calls.
        const [
            { count: chapterCount },
            { count: denomCount },
            { count: pendingCount }
        ] = await Promise.all([
            supabase.from('chapters').select('*', { count: 'exact', head: true }),
            supabase.from('denominations').select('*', { count: 'exact', head: true }),
            supabase.from('chapters').select('*', { count: 'exact', head: true }).eq('status', 'pending_approval'),
        ])

        return apiOk({
            totalChapters: chapterCount || 0,
            totalDenominations: denomCount || 0,
            pendingApprovals: pendingCount || 0,
        })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
