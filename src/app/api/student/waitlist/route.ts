import { createServerSupabaseClient } from '@/lib/supabase/server'
import { WaitlistSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'
import { sendEmail } from '@/lib/email'
import { createWaitlistConfirmationEmail } from '@/lib/email'

export async function POST(request: Request) {
    console.log('🚀 [WAITLIST] API endpoint hit')
    try {
        const json = await request.json()
        console.log('🚀 [WAITLIST] Request data:', { chapterId: json.chapterId, email: json.email })
        
        const parsed = WaitlistSchema.safeParse(json)

        if (!parsed.success) {
            console.log('❌ [WAITLIST] Validation failed:', parsed.error.issues[0].message)
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { chapterId, email } = parsed.data
        const supabase = await createServerSupabaseClient()

        // Anyone can join waitlist (anon or authenticated)
        console.log('💾 [WAITLIST] Inserting into database...')
        const { error } = await (supabase as any)
            .from('chapter_waitlist')
            .insert({
                chapter_id: chapterId,
                email,
            })

        if (error) {
            console.log('❌ [WAITLIST] Database error:', error)
            if (error.code === '23505') {
                return apiOk({ message: 'You are already on the waitlist for this chapter.' })
            }
            return apiError('Failed to join waitlist', 500)
        }

        console.log('✅ [WAITLIST] Successfully added to database')

        // Get chapter name for email
        console.log('🔍 [WAITLIST] Fetching chapter details...')
        const { data: chapter, error: chapterError } = await (supabase as any)
            .from('chapters')
            .select('name')
            .eq('id', chapterId)
            .single()

        console.log('🔍 [WAITLIST] Chapter query result:', { chapter, error: chapterError })

        // Send waitlist confirmation email
        if (chapter) {
            console.log('📧 [WAITLIST] Preparing to send email')
            console.log('   To:', email)
            console.log('   Chapter:', chapter.name)
            
            try {
                const emailSent = await sendEmail({
                    to: email,
                    subject: `You're on the waitlist for ${chapter.name}!`,
                    html: createWaitlistConfirmationEmail(chapter.name, email)
                })
                
                console.log('📧 [WAITLIST] Email send result:', emailSent ? '✅ SUCCESS' : '❌ FAILED')
            } catch (emailError) {
                console.error('💥 [WAITLIST] Email sending threw error:', emailError)
            }
        } else {
            console.error('❌ [WAITLIST] Chapter not found, cannot send email')
        }

        console.log('✅ [WAITLIST] Returning success response')
        return apiOk({ message: 'Successfully added to waitlist' })
    } catch (error) {
        console.error('💥 [WAITLIST] Fatal error:', error)
        return apiError('Internal server error', 500)
    }
}
