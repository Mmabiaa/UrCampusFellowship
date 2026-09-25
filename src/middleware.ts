import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Next.js middleware — runs on every matching request.
 *
 * Responsibilities:
 * 1. Refresh expired Supabase auth sessions (REQUIRED by @supabase/ssr)
 * 2. Protect /heads/** — must be authenticated with role = 'head' or 'admin'
 * 3. Protect /admin/** — must be authenticated with role = 'admin'
 * 4. Redirect unauthenticated users to /auth/login
 * 5. Prevent cross-role access (head → /admin is a redirect to /heads)
 */
export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Do not run logic between createServerClient and getUser.
    // A simple mistake can make auth state unpredictable.
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname

    // ── Public routes — always allow ─────────────────────────────────────
    const isPublicRoute =
        path === '/' ||
        path.startsWith('/about') ||
        path.startsWith('/how-it-works') ||
        path.startsWith('/for-leaders') ||
        path.startsWith('/terms') ||
        path.startsWith('/privacy') ||
        path.startsWith('/auth') ||
        path.startsWith('/student') ||
        path.startsWith('/api/auth') ||
        path.startsWith('/api/public') ||
        path.startsWith('/api-docs') ||
        path.startsWith('/swagger.json')

    if (isPublicRoute) return supabaseResponse

    // ── Protected routes — must be signed in ─────────────────────────────
    if (!user) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('redirect', path)
        return NextResponse.redirect(loginUrl)
    }

    // ── Role-based access ─────────────────────────────────────────────────
    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
        // Fetch role — use service client (server-side only, not exposed to browser)
        const { createClient } = await import('@supabase/supabase-js')
        const serviceClient: any = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { autoRefreshToken: false, persistSession: false } }
        )
        const { data: roleRow } = await serviceClient
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single()

        if (roleRow?.role !== 'admin') {
            // Head trying to access admin → redirect to their own dashboard
            return NextResponse.redirect(new URL('/heads', request.url))
        }
    }

    if (path.startsWith('/heads') || path.startsWith('/api/heads')) {
        // Heads and admins can both access /heads
        const { createClient } = await import('@supabase/supabase-js')
        const serviceClient: any = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { autoRefreshToken: false, persistSession: false } }
        )
        const { data: roleRow } = await serviceClient
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single()

        if (!roleRow || !['head', 'admin'].includes(roleRow.role)) {
            // Students have no business on /heads
            return NextResponse.redirect(new URL('/student', request.url))
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - _next/static (static files)
         * - _next/image (image optimisation)
         * - favicon.ico, sitemap.xml, robots.txt
         */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
