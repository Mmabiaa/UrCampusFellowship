import { createClient } from '@/lib/supabase/client'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const supabase = createClient()
        const { data: campuses, error } = await supabase
            .from('campuses')
            .select('id, name, logo_url')
            .order('name')

        if (error) return apiError('Failed to fetch campuses', 500)

        return apiOk({ campuses })
    } catch {
        return apiError('Internal server error', 500)
    }
}
