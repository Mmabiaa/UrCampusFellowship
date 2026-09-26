import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Next.js middleware — runs on every matching request.
 *
 * Responsibilities:
 * 1. Refresh expired Supabase auth sessions (REQUIRED by @supabase/ssr)
 * 2. Protect /heads/** — must be authenticated with role = 'head' or 'admin'
 * 3. Protect /admin/** — must be authenticated with role = 'admin'
 * 4. For API routes (/api/**): return JSON 401/403, never redirect
 * 5. For page routes: redirect unauthenticated users to /auth/login
 * 6. Prevent cross-role access (head → /admin redirects to /heads)
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
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname
    const isApiRoute = path.startsWith('/api/')

    // ── Public routes — always allow ─────────────────────────────────────────
    // API routes that do NOT require authentication
    const isPublicApiRoute =
        path.startsWith('/api/auth') ||
        path.startsWith('/api/public') ||
        path.startsWith('/api/student/waitlist')   // joining a waitlist is anonymous

    // Page routes that do not require authentication
    const isPublicPageRoute =
        path === '/' ||
        path.startsWith('/about') ||
        path.startsWith('/how-it-works') ||
        path.startsWith('/for-leaders') ||
        path.startsWith('/terms') ||
        path.startsWith('/privacy') ||
        path.startsWith('/auth') ||
        path.startsWith('/student') ||
        path.startsWith('/api-docs') ||
        path.startsWith('/swagger.json')

    if (isPublicApiRoute || isPublicPageRoute) return supabaseResponse

    // ── Protected routes — must be signed in ─────────────────────────────────
    if (!user) {
        if (isApiRoute) {
            // Return JSON 401 for API calls — NEVER redirect to login page
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
        // For page routes, perform the standard browser redirect
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('redirect', path)
        return NextResponse.redirect(loginUrl)
    }

    // ── Role-based access ─────────────────────────────────────────────────────
    // Helper: fetch the user's role from user_roles table
    async function fetchRole(userId: string): Promise<string | null> {
        const { createClient } = await import('@supabase/supabase-js')
        const serviceClient: any = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { autoRefreshToken: false, persistSession: false } }
        )
        const { data } = await serviceClient
            .from('user_roles')
            .select('role')
            .eq('user_id', userId)
            .single()
        return data?.role ?? null
    }

    // ── /admin/** and /api/admin/** — admin-only ──────────────────────────────
    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
        const role = await fetchRole(user.id)
        if (role !== 'admin') {
            if (isApiRoute) {
                return Response.json({ error: 'Forbidden: Admin only' }, { status: 403 })
            }
            // Non-admin page visitor (e.g. a head) → send to their dashboard
            return NextResponse.redirect(new URL('/heads', request.url))
        }
    }

    // ── /heads/** and /api/heads/** — head or admin only ─────────────────────
    if (path.startsWith('/heads') || path.startsWith('/api/heads')) {
        const role = await fetchRole(user.id)
        if (role === 'admin' && !isApiRoute) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
        if (!role || !['head', 'admin'].includes(role)) {
            if (isApiRoute) {
                return Response.json({ error: 'Forbidden: Head access only' }, { status: 403 })
            }
            // Students have no business on /heads
            return NextResponse.redirect(new URL('/student', request.url))
        }
    }

    // ── /api/student/** (other than waitlist) — must be signed in ────────────
    if (path.startsWith('/api/student')) {
        // Already confirmed user is authenticated above.
        // Individual routes handle their own finer-grained checks.
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
