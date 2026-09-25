import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { UserRole } from '@/lib/supabase/types'

/**
 * Retrieves the authenticated session from the current request context.
 * Returns null if not authenticated.
 */
export async function getSession() {
    const supabase = await createServerSupabaseClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return session
}

/**
 * Returns the role of a user from the user_roles table.
 * Uses the service client to bypass RLS for role lookups.
 */
export async function getUserRole(userId: string): Promise<UserRole | null> {
    const { createServiceClient } = await import('@/lib/supabase/service')
    const supabase = createServiceClient() as any
    const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single()
    return (data?.role as UserRole) ?? null
}

/**
 * Standard JSON error responses.
 */
export const apiError = (message: string, status: number) =>
    Response.json({ error: message }, { status })

export const apiOk = (data: unknown, status = 200) =>
    Response.json(data, { status })
