import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'admin') return apiError('Forbidden: Admin only', 403)

        const supabase = createServiceClient() as any

        // Fetch chapters that are either 'pending_approval' or 'coming_soon'
        // Both statuses indicate chapters awaiting admin approval
        const { data: chapters, error } = await supabase
            .from('chapters')
            .select(`id, name, status, submitted_at, head_user_id, denominations(id, name), campuses(id, name)`)
            .in('status', ['pending_approval', 'coming_soon'])
            .order('submitted_at', { ascending: true })

        if (error) {
            console.error('Failed to fetch pending chapters:', error)
            return apiError('Failed to fetch pending chapters', 500)
        }

        // Enrich with head user data
        const enrichedChapters = await Promise.all(
            (chapters || []).map(async (chapter: any) => {
                if (chapter.head_user_id) {
                    const { data: userData } = await supabase.auth.admin.getUserById(chapter.head_user_id)
                    return {
                        ...chapter,
                        heads: {
                            name: userData?.user?.user_metadata?.full_name || 'N/A',
                            email: userData?.user?.email || 'N/A'
                        }
                    }
                }
                return {
                    ...chapter,
                    heads: { name: 'N/A', email: 'N/A' }
                }
            })
        )

        return apiOk({ pending: enrichedChapters })
    } catch {
        return apiError('Internal server error', 500)
    }
}
