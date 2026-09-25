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
        submitted_at,
        denominations (id, name),
        campuses (id, name)
      `)
            .eq('status', 'pending_approval')
            .order('submitted_at', { ascending: true })

        if (error) {
            return apiError('Failed to fetch pending chapters', 500)
        }

        return apiOk({ pending: chapters })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
