import { createServerSupabaseClient } from '@/lib/supabase/server'
import { LoginSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = LoginSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { email, password } = parsed.data
        const supabase = await createServerSupabaseClient()

        const { error } = await (supabase as any).auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return apiError(error.message, 401)
        }

        return apiOk({ message: 'Logged in successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
