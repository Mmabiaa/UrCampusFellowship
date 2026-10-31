import { createServiceClient } from '@/lib/supabase/service'
import { HeadSignupSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'
import { emailQueue } from '@/lib/email/queue'
import { createWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = HeadSignupSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const { name, email, password, denominationId, chapterName, campusId } = parsed.data
        const supabase = createServiceClient() as any

        // 1. Check denomination exists
        const { data: denomination, error: denomError } = await (supabase as any)
            .from('denominations')
            .select('id')
            .eq('id', denominationId)
            .single()

        if (denomError || !denomination) {
            return apiError('Denomination not found. Select a valid denomination.', 400)
        }

        // 2. Check no duplicate chapter exists
        const { data: duplicate } = await (supabase as any)
            .from('chapters')
            .select('id')
            .eq('denomination_id', denominationId)
            .eq('campus_id', campusId)
            .ilike('name', chapterName.trim())
            .maybeSingle()

        if (duplicate) {
            return apiError('A chapter with this name already exists in this denomination and campus.', 409)
        }

        // 3. Create Supabase Auth user
        const { data: authData, error: authError } = await (supabase as any).auth.admin.createUser({
            email,
            password,
            user_metadata: { full_name: name },
            email_confirm: true,
        })

        if (authError || !authData.user) {
            console.error('Auth creation error:', authError)
            if (authError?.message.includes('already registered') || authError?.message.includes('User already registered')) {
                return apiError('An account with this email already exists. Please use a different email or try logging in.', 409)
            }
            if (authError?.message.includes('password')) {
                return apiError('Password does not meet requirements. Use at least 6 characters.', 400)
            }
            return apiError(authError?.message || 'Account creation failed. Please try again.', 500)
        }

        const userId = authData.user.id

        // 4. Set role to 'head'
        const { error: roleError } = await (supabase as any)
            .from('user_roles')
            .insert({ user_id: userId, role: 'head' })

        if (roleError) {
            // Rollback user
            await (supabase as any).auth.admin.deleteUser(userId)
            return apiError('Failed to setup user role.', 500)
        }

        // 5. Create Chapter in pending_approval state
        const { error: chapterError } = await (supabase as any)
            .from('chapters')
            .insert({
                head_user_id: userId,
                denomination_id: denominationId,
                campus_id: campusId,
                name: chapterName.trim(),
                status: 'pending_approval',
            })

        if (chapterError) {
            console.error('Chapter creation error:', chapterError)
            // Rollback user (cascade will handle user_roles ideally, but to be sure)
            await (supabase as any).auth.admin.deleteUser(userId)
            
            if (chapterError.code === '23505') {
                return apiError('A chapter with this name already exists for this denomination and campus. Please choose a different name.', 409)
            }
            if (chapterError.message?.includes('foreign key')) {
                return apiError('Invalid campus or denomination selected. Please refresh and try again.', 400)
            }
            return apiError('Failed to create chapter application. Please try again or contact support.', 500)
        }

        // To properly sign the user in, we need to instruct the client to use standard signInWithPassword,
        // or we can sign them in here using the server client if we have access to the request/response cookies.
        // However, signInWithPassword is best done directly via the server client in the route.
        const { createServerSupabaseClient } = await import('@/lib/supabase/server')
        const userClient = await createServerSupabaseClient()
        const { error: signInError } = await userClient.auth.signInWithPassword({
            email, password
        })

        if (signInError) {
            console.error('Sign-in error after creation:', signInError)
            // They were created, but couldn't sign in? Edge case, but just return success and let them login manually
            return apiOk({ 
                message: 'Account created successfully! Please log in to continue.',
                requiresLogin: true 
            })
        }

        // Send welcome email (non-blocking)
        let emailSent = false
        try {
            await emailQueue.addToQueue(
                email,
                'Welcome to UrCampus Fellowship!',
                createWelcomeEmail(name, chapterName)
            )
            emailSent = true
        } catch (error) {
            console.error('Failed to queue welcome email:', error)
            // Don't fail the request if email queueing fails
        }

        return apiOk({ 
            message: 'Account created successfully! Your chapter application is pending admin approval.',
            emailSent,
            ...(emailSent ? {} : { 
                notice: 'Welcome email could not be sent, but your account is active.' 
            })
        })
    } catch (error) {
        console.error('Unexpected signup error:', error)
        return apiError('An unexpected error occurred. Please try again or contact support if the problem persists.', 500)
    }
}
