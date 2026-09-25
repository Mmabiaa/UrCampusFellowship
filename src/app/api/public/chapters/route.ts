import { createServerSupabaseClient } from '@/lib/supabase/server'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const campusId = searchParams.get('campusId')

        const supabase = await createServerSupabaseClient()

        // RLS "chapters_public_read" ensures only active + coming_soon are visible
        // We only need the anon key for this.
        const { createClient } = await import('@/lib/supabase/client')
        const publicClient = createClient()

        let query = publicClient
            .from('chapters')
            .select(`
        id, 
        name, 
        status, 
        meeting_day, 
        meeting_time, 
        location,
        description,
        denominations(id, name),
        campuses(id, name)
      `)
            .order('name')

        if (campusId) {
            query = query.eq('campus_id', campusId)
        }

        const { data: chapters, error } = await query

        if (error) {
            return apiError('Failed to fetch chapters directory', 500)
        }

        return apiOk({ chapters })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
