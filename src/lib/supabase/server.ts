import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

/**
 * Server-side Supabase client (session-aware).
 * Uses the ANON key but reads the user's session cookie.
 * RLS is enforced using the authenticated user's role.
 * Use in: Server Components, API Routes, Server Actions.
 */
export async function createServerSupabaseClient() {
    const cookieStore = await cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // In Server Components, cookies can't be set — safe to ignore.
                        // The middleware handles session refresh.
                    }
                },
            },
        }
    )
}
