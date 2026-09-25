import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { OtpVerifySchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = OtpVerifySchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { email, token } = parsed.data
        const supabase = await createServerSupabaseClient()

        const { data: authData, error: authError } = await (supabase as any).auth.verifyOtp({
            email,
            token,
            type: 'email',
        })

        if (authError || !authData.user) {
            return apiError(authError?.message || 'Verification failed', 401)
        }

        const userId = authData.user.id
        const serviceClient = createServiceClient() as any

        // Ensure student_profiles row exists (it upserts)
        const { error: profileError } = await serviceClient
            .from('student_profiles')
            .upsert({ id: userId }, { onConflict: 'id' })

        if (profileError) {
            return apiError('Failed to initialize student profile', 500)
        }

        // Ensure user_roles row exists for student
        const { error: roleError } = await serviceClient
            .from('user_roles')
            .upsert({ user_id: userId, role: 'student' }, { onConflict: 'user_id' })

        if (roleError) {
            return apiError('Failed to set user role', 500)
        }

        return apiOk({ message: 'Verified successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
