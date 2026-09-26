import { createServiceClient } from '@/lib/supabase/service'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (role !== 'head' && role !== 'admin') return apiError('Forbidden: Chapter heads only', 403)

        const supabase = createServiceClient() as any

        // Get the head's chapter ID
        const { data: chapter } = await supabase
            .from('chapters')
            .select('id')
            .eq('head_user_id', session.user.id)
            .single()

        if (!chapter) {
            return apiError('Chapter not found for this head user.', 404)
        }

        // Fetch memberships joined with student_profiles using service client to bypass RLS restrictions
        const { data: members, error } = await supabase
            .from('memberships')
            .select(`
                id,
                status,
                joined_at,
                student_id,
                student_profiles!inner(
                    id,
                    full_name,
                    phone,
                    program,
                    hall,
                    level,
                    campus_id,
                    campuses(name)
                )
            `)
            .eq('chapter_id', chapter.id)
            .order('joined_at', { ascending: false })

        if (error) {
            return apiError('Failed to fetch roster', 500)
        }

        // Fetch auth users to map email addresses
        const { data: authUsers } = await supabase.auth.admin.listUsers()
        const emailMap = new Map((authUsers?.users || []).map((u: any) => [u.id, u.email]))

        const flatMembers = (members || []).map((m: any) => {
            const profile = m.student_profiles || {}
            const studentEmail = emailMap.get(m.student_id) || ''

            return {
                id: m.id,
                membershipId: m.id,
                studentId: m.student_id,
                name: profile.full_name || 'Member',
                full_name: profile.full_name || 'Member',
                email: studentEmail,
                phone: profile.phone || '—',
                program: profile.program || '—',
                hall: profile.hall || '—',
                level: profile.level || '—',
                campus: profile.campuses?.name || 'Main Campus',
                status: m.status,
                created_at: m.joined_at,
                joinedAt: m.joined_at,
            }
        })

        return apiOk({ members: flatMembers })
    } catch {
        return apiError('Internal server error', 500)
    }
}
