import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getSession, getUserRole, apiError, apiOk } from '@/lib/api-helpers'
import { ChapterSetupSchema } from '@/lib/validations'
import type { ChapterStatus } from '@/lib/supabase/types'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (!role || !['head', 'admin'].includes(role)) {
            return apiError('Forbidden', 403)
        }

        const supabase = await createServerSupabaseClient()
        const { data: chapter, error } = await (supabase as any)
            .from('chapters')
            .select('*')
            .eq('head_user_id', session.user.id)
            .single()

        if (error || !chapter) {
            return apiError('Chapter not found', 404)
        }

        // Wrap in 'chapter' key for consistent response shape
        return apiOk({ chapter })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const role = await getUserRole(session.user.id)
        if (!role || !['head', 'admin'].includes(role)) {
            return apiError('Forbidden', 403)
        }

        const json = await request.json()
        const parsed = ChapterSetupSchema.safeParse(json)

        if (!parsed.success) {
            return apiError('Invalid data provided', 422)
        }

        if (Object.keys(parsed.data).length === 0) {
            return apiError('No data provided to update', 400)
        }

        const { meeting_day, meeting_time, location, description, whatsapp_link } = parsed.data

        const supabase = await createServerSupabaseClient()

        // 1. Fetch current chapter to check status
        const { data: chapter, error: fetchError } = await (supabase as any)
            .from('chapters')
            .select('id, status, meeting_day, meeting_time, location, whatsapp_link')
            .eq('head_user_id', session.user.id)
            .single()

        if (fetchError || !chapter) {
            return apiError('Chapter not found', 404)
        }

        // Guard: cannot edit until approved
        if (['pending_approval', 'rejected', 'draft'].includes(chapter.status)) {
            return apiError('Chapter is not yet approved. You cannot edit details until approval.', 403)
        }

        // Merge existing and new data to check completion
        const merged = {
            meeting_day: meeting_day !== undefined ? meeting_day : chapter.meeting_day,
            meeting_time: meeting_time !== undefined ? meeting_time : chapter.meeting_time,
            location: location !== undefined ? location : chapter.location,
            whatsapp_link: whatsapp_link !== undefined ? whatsapp_link : chapter.whatsapp_link,
        }

        const requiredForActive = ['meeting_day', 'meeting_time', 'location', 'whatsapp_link']
        const isComplete = requiredForActive.every(
            (field) => (merged as any)[field] && (merged as any)[field].trim() !== ''
        )

        const newStatus: ChapterStatus = isComplete ? 'active' : 'coming_soon'

        // 2. Perform update and return the updated row
        const { data: updated, error: updateError } = await (supabase as any)
            .from('chapters')
            .update({ ...parsed.data, status: newStatus })
            .eq('id', chapter.id)
            .select()
            .single()

        if (updateError) {
            return apiError('Failed to update chapter details', 500)
        }

        return apiOk({ chapter: updated })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
