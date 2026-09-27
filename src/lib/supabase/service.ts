import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Service-role Supabase client.
 * Bypasses Row-Level Security entirely.
 *
 * ⚠️  ONLY import this in server-side code (API routes, server actions).
 * NEVER import in files that are bundled for the browser.
 * The service role key is in SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix).
 */
export function createServiceClient() {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set.')
    }
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}
