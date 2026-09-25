import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getSession, apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const supabase = await createServerSupabaseClient()

        // Get the head's chapter ID
        const { data: chapter } = await (supabase as any)
            .from('chapters')
            .select('id')
            .eq('head_user_id', session.user.id)
            .single()

        if (!chapter) {
            return apiError('Chapter not found for this head user.', 404)
        }

        // RLS policy on memberships lets heads see ONLY their chapter's members.
        // By joining student_profiles, we get everything we need.
        const { data: members, error } = await (supabase as any)
            .from('memberships')
            .select('id, status, joined_at, student_profiles(full_name, phone, program, hall, level)')
            .eq('chapter_id', chapter.id)
            .order('joined_at', { ascending: false })

        if (error) {
            return apiError('Failed to fetch roster', 500)
        }

        // Flatten data for easier UI consumption
        const flatMembers = members.map((m: any) => ({
            membershipId: m.id,
            status: m.status,
            joinedAt: m.joined_at,
            ...m.student_profiles,
        }))

        return apiOk({ members: flatMembers })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
