import { createServerSupabaseClient } from '@/lib/supabase/server'
import { WaitlistSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = WaitlistSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { chapterId, email } = parsed.data
        const supabase = await createServerSupabaseClient()

        // Anyone can join waitlist (anon or authenticated)
        const { error } = await (supabase as any)
            .from('chapter_waitlist')
            .insert({
                chapter_id: chapterId,
                email,
            })

        if (error) {
            if (error.code === '23505') {
                return apiOk({ message: 'You are already on the waitlist for this chapter.' })
            }
            return apiError('Failed to join waitlist', 500)
        }

        return apiOk({ message: 'Successfully added to waitlist' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
