import { createServerSupabaseClient } from '@/lib/supabase/server'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST() {
    try {
        const supabase = await createServerSupabaseClient()
        const { error } = await (supabase as any).auth.signOut()

        if (error) {
            return apiError(error.message, 500)
        }

        return apiOk({ message: 'Logged out successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
