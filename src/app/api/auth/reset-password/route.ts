import { createServiceClient } from '@/lib/supabase/service'
import { ResetPasswordSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = ResetPasswordSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { email } = parsed.data
        const supabase = createServiceClient() as any

        // Using service client because we might need to reset password for a user without anon access,
        // though resetPasswordForEmail can be called via anon key too.
        const { error } = await (supabase as any).auth.resetPasswordForEmail(email)

        if (error) {
            return apiError(error.message, 500)
        }

        // Always return ok to prevent user enumeration
        return apiOk({ message: 'If an account exists, a reset link has been sent.' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
