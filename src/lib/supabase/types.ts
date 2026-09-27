/**
 * Supabase Database TypeScript types.
 *
 * These are hand-crafted to match the SQL schema in:
 *   docs/migrations/001_initial_schema.sql
 *
 * Once the project is connected to a real Supabase project, replace this
 * with the generated types by running:
 *   npx supabase gen types typescript --project-id <your-project-id> > lib/supabase/types.ts
 */

export type ChapterStatus =
    | 'pending_approval'
    | 'coming_soon'
    | 'active'
    | 'rejected'
    | 'draft'

export type UserRole = 'student' | 'head' | 'admin'

export type MembershipStatus = 'active' | 'flagged' | 'removed'

export interface Database {
    public: {
        Tables: {
            campuses: {
                Row: {
                    id: string
                    name: string
                }
                Insert: {
                    id?: string
                    name: string
                }
                Update: {
                    id?: string
                    name?: string
                }
            }
            denominations: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                }
            }
            chapters: {
                Row: {
                    id: string
                    denomination_id: string
                    campus_id: string
                    name: string
                    status: ChapterStatus
                    meeting_day: string | null
                    meeting_time: string | null
                    location: string | null
                    description: string | null
                    whatsapp_link: string | null
                    head_user_id: string | null
                    rejection_reason: string | null
                    submitted_at: string
                    approved_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    denomination_id: string
                    campus_id: string
                    name: string
                    status?: ChapterStatus
                    meeting_day?: string | null
                    meeting_time?: string | null
                    location?: string | null
                    description?: string | null
                    whatsapp_link?: string | null
                    head_user_id?: string | null
                    rejection_reason?: string | null
                    submitted_at?: string
                    approved_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    denomination_id?: string
                    campus_id?: string
                    name?: string
                    status?: ChapterStatus
                    meeting_day?: string | null
                    meeting_time?: string | null
                    location?: string | null
                    description?: string | null
                    whatsapp_link?: string | null
                    head_user_id?: string | null
                    rejection_reason?: string | null
                    approved_at?: string | null
                    updated_at?: string
                }
            }
            student_profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    phone: string | null
                    program: string | null
                    hall: string | null
                    level: string | null
                    campus_id: string | null
                    current_chapter_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    phone?: string | null
                    program?: string | null
                    hall?: string | null
                    level?: string | null
                    campus_id?: string | null
                    current_chapter_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    full_name?: string | null
                    phone?: string | null
                    program?: string | null
                    hall?: string | null
                    level?: string | null
                    campus_id?: string | null
                    current_chapter_id?: string | null
                    updated_at?: string
                }
            }
            memberships: {
                Row: {
                    id: string
                    student_id: string
                    chapter_id: string
                    status: MembershipStatus
                    joined_at: string
                    left_at: string | null
                    flagged_at: string | null
                    flagged_by: string | null
                }
                Insert: {
                    id?: string
                    student_id: string
                    chapter_id: string
                    status?: MembershipStatus
                    joined_at?: string
                    left_at?: string | null
                    flagged_at?: string | null
                    flagged_by?: string | null
                }
                Update: {
                    status?: MembershipStatus
                    left_at?: string | null
                    flagged_at?: string | null
                    flagged_by?: string | null
                }
            }
            chapter_waitlist: {
                Row: {
                    id: string
                    chapter_id: string
                    email: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    chapter_id: string
                    email: string
                    created_at?: string
                }
                Update: never
            }
            user_roles: {
                Row: {
                    user_id: string
                    role: UserRole
                }
                Insert: {
                    user_id: string
                    role: UserRole
                }
                Update: {
                    role?: UserRole
                }
            }
        }
        Views: Record<string, never>
        Functions: {
            register_student: {
                Args: {
                    p_student_id: string
                    p_chapter_id: string
                    p_full_name: string
                    p_phone: string
                    p_program: string
                    p_hall: string
                    p_level: string
                    p_campus_id: string
                }
                Returns: {
                    success: boolean
                    whatsapp_link: string | null
                    error: string | null
                }
            }
        }
        Enums: {
            chapter_status: ChapterStatus
            user_role: UserRole
            membership_status: MembershipStatus
        }
    }
}
