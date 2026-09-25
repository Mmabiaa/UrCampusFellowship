import { createServiceClient } from '@/lib/supabase/service'
import { OtpSendSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = OtpSendSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { email } = parsed.data
        const supabase = createServiceClient() as any

        const { error } = await (supabase as any).auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
            },
        })

        if (error) {
            return apiError(error.message, 500)
        }

        return apiOk({ message: 'OTP sent successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
