import { createServiceClient } from '@/lib/supabase/service'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const supabase = createServiceClient() as any

        const { data: chapters, error } = await (supabase as any)
            .from('chapters')
            .select(`
        id, 
        name, 
        status, 
        created_at,
        denominations (id, name),
        campuses (id, name)
      `)
            .order('created_at', { ascending: false })

        if (error) {
            return apiError('Failed to fetch chapters', 500)
        }

        return apiOk({ chapters })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
