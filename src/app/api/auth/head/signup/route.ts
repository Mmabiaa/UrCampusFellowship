import { createServiceClient } from '@/lib/supabase/service'
import { HeadSignupSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

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
            if (authError?.message.includes('already registered')) {
                return apiError('An account with this email already exists.', 409)
            }
            return apiError('Account creation failed.', 500)
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
            // Rollback user (cascade will handle user_roles ideally, but to be sure)
            await (supabase as any).auth.admin.deleteUser(userId)
            return apiError('Failed to create chapter application.', 500)
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
            // They were created, but couldn't sign in? Edge case, but just return success and let them login manually
            return apiOk({ message: 'Account created successfully. Please log in.' })
        }

        return apiOk({ message: 'Account created. Your chapter application is pending admin approval.' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
