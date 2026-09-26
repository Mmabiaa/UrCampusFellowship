import { apiError, apiOk } from '@/lib/api-helpers'
import { StudentRegisterSchema } from '@/lib/validations'
import { createServiceClient } from '@/lib/supabase/service'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        
        // Debug: log what we received
        console.log('Received registration data:', json)
        
        const parsed = StudentRegisterSchema.safeParse(json)

        if (!parsed.success) {
            console.error('Validation failed:', parsed.error.issues)
            return apiError(parsed.error.issues[0].message, 422)
        }

        // Use service client to call the stored procedure
        const supabaseAdmin = createServiceClient() as any

        // Call stored procedure (no auth required - student ID generated in function)
        const { data, error } = await (supabaseAdmin as any).rpc('register_student', {
            p_chapter_id: parsed.data.chapterId,
            p_full_name: parsed.data.name,
            p_email: parsed.data.email,
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
