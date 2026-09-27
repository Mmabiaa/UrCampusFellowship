import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

/**
 * Browser-side Supabase client.
 * Uses the ANON key — RLS is fully enforced.
 * Safe to import in Client Components and browser-side code.
 */
export function createClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
