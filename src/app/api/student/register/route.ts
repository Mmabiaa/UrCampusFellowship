import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getSession, apiError, apiOk } from '@/lib/api-helpers'
import { StudentRegisterSchema } from '@/lib/validations'
import { createServiceClient } from '@/lib/supabase/service'

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const json = await request.json()
        const parsed = StudentRegisterSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        // Must use service role to invoke a security definer RPC successfully without RLS issues 
        // depending on how strict RLS is set up for memberships (even though auth is the user).
        const supabaseAdmin = createServiceClient() as any

        // Call stored procedure
        // Note: The types for RPC need manual defining usually, but relying on any since we hand crafted types.
        const { data, error } = await (supabaseAdmin as any).rpc('register_student', {
            p_student_id: session.user.id,
            p_chapter_id: parsed.data.chapterId,
            p_full_name: parsed.data.name,
            p_phone: parsed.data.phone,
            p_program: parsed.data.program,
            p_hall: parsed.data.hall,
            p_level: parsed.data.level,
            p_campus_id: parsed.data.campusId,
        })

        if (error) {
            return apiError(error.message, 500)
        }

        const result = data as any
        if (!result.success) {
            return apiError(result.error || 'Registration failed', 400)
        }

        return apiOk({
            message: 'Successfully registered',
            whatsapp_link: result.whatsapp_link
        })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
