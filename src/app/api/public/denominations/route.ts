import { createClient } from '@/lib/supabase/client'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const supabase = createClient()
        const { data: denominations, error } = await supabase
            .from('denominations')
            .select('id, name, description, logo_url')
            .order('name')

        if (error) return apiError('Failed to fetch denominations', 500)

        return apiOk({ denominations })
    } catch {
        return apiError('Internal server error', 500)
    }
}
