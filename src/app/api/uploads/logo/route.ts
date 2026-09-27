import { createServiceClient } from '@/lib/supabase/service'
import { getSession, apiError, apiOk } from '@/lib/api-helpers'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
const MAX_BYTES = 2 * 1024 * 1024 // 2 MB

/**
 * POST /api/uploads/logo
 * 
 * Uploads a logo image to Supabase Storage and returns the public URL.
 * Accepts multipart/form-data with:
 *   - file  : the image file
 *   - folder: 'denominations' | 'chapters' | 'campuses'
 * 
 * Returns: { url: string }
 */
export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) return apiError('Unauthorized', 401)

        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const folder = (formData.get('folder') as string) ?? 'misc'

        if (!file) return apiError('No file provided', 400)

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return apiError(`Invalid file type. Allowed: JPG, PNG, WEBP, SVG`, 422)
        }

        // Validate file size
        if (file.size > MAX_BYTES) {
            return apiError('File is too large. Maximum size is 2 MB.', 422)
        }

        // Build a clean, unique storage path
        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
        const filename = `${folder}/${session.user.id}-${Date.now()}.${ext}`

        const buffer = await file.arrayBuffer()

        // Use service client so we bypass Storage RLS during upload from server
        const supabase = createServiceClient()
        const { data, error } = await supabase.storage
            .from('logos')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false,
            })

        if (error) {
            console.error('[upload/logo]', error)
            return apiError('Upload failed. Please try again.', 500)
        }

        // Construct the permanent public URL
        const { data: { publicUrl } } = supabase.storage
            .from('logos')
            .getPublicUrl(data.path)

        return apiOk({ url: publicUrl })
    } catch (err) {
        console.error('[upload/logo] unexpected error:', err)
        return apiError('Internal server error', 500)
    }
}
