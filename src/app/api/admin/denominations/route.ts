import { createServiceClient } from '@/lib/supabase/service'
import { DenominationSchema } from '@/lib/validations'
import { apiError, apiOk } from '@/lib/api-helpers'

export async function GET() {
    try {
        const supabase = createServiceClient() as any

        const { data: denominations, error } = await (supabase as any)
            .from('denominations')
            .select('id, name, description, created_at')
            .order('name')

        if (error) {
            return apiError('Failed to fetch denominations', 500)
        }

        return apiOk({ denominations })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const parsed = DenominationSchema.safeParse(json)

        if (!parsed.success) {
            return apiError(parsed.error.issues[0].message, 422)
        }

        const supabase = createServiceClient() as any

        const { error } = await (supabase as any)
            .from('denominations')
            .insert(parsed.data)

        if (error) {
            if (error.code === '23505') { // Unique violation
                return apiError('A denomination with this name already exists', 409)
            }
            return apiError('Failed to create denomination', 500)
        }

        return apiOk({ message: 'Denomination created successfully' })
    } catch (error) {
        return apiError('Internal server error', 500)
    }
}
