import { createServiceClient } from '@/lib/supabase/service'
import { getSession, apiError, apiOk } from '@/lib/api-helpers'

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        // Using service client because we need to transactionally:
        // 1. nullify current_chapter_id on student_profiles
        // 2. set status='removed' and left_at=now on memberships
        const supabase = createServiceClient() as any

        // Get their current active membership
        const { data: profile, error: profileError } = await (supabase as any)
            .from('student_profiles')
            .select('current_chapter_id')
            .eq('id', session.user.id)
            .single()

        if (profileError || !profile) {
            return apiError('Profile not found', 404)
        }

        if (!profile.current_chapter_id) {
            return apiError('You are not currently in a chapter.', 400)
        }

        const chapterId = profile.current_chapter_id

        // Update profile
        const { error: clearChapterError } = await (supabase as any)
            .from('student_profiles')
            .update({ current_chapter_id: null })
            .eq('id', session.user.id)

        if (clearChapterError) {
            return apiError('Failed to remove you from the chapter', 500)
        }

        // Update membership history
        await (supabase as any)
            .from('memberships')
            .update({
                status: 'removed',
                left_at: new Date().toISOString()
            })
            .eq('student_id', session.user.id)
            .eq('chapter_id', chapterId)
            .eq('status', 'active')

        return apiOk({ message: 'Successfully left the chapter' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
