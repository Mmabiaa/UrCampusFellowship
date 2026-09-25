import { z } from 'zod'

// ─── Auth ─────────────────────────────────────────────────────────────────

export const OtpSendSchema = z.object({
    email: z.string().email('Enter a valid email address'),
})

export const OtpVerifySchema = z.object({
    email: z.string().email(),
    token: z.string().length(6, 'OTP must be 6 digits'),
})

export const LoginSchema = z.object({
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const ResetPasswordSchema = z.object({
    email: z.string().email('Enter a valid email address'),
})

export const HeadSignupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    denominationId: z.string().uuid('Select a valid denomination'),
    chapterName: z.string().min(3, 'Chapter name must be at least 3 characters'),
    campusId: z.string().uuid('Select a valid campus'),
})

// ─── Student ──────────────────────────────────────────────────────────────

export const StudentRegisterSchema = z.object({
    chapterId: z.string().uuid('Invalid chapter'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    program: z.string().min(2, 'Enter your program'),
    hall: z.string().min(2, 'Enter your hall or hostel'),
    level: z.enum(['100', '200', '300', '400', 'postgrad']),
    campusId: z.string().uuid('Select a valid campus'),
})

export const StudentProfileSchema = z.object({
    full_name: z.string().min(2).optional(),
    phone: z.string().min(10).optional(),
    program: z.string().min(2).optional(),
    hall: z.string().min(2).optional(),
    level: z.enum(['100', '200', '300', '400', 'postgrad'] as const).optional(),
    campus_id: z.string().uuid().optional(),
})

export const WaitlistSchema = z.object({
    chapterId: z.string().uuid('Invalid chapter'),
    email: z.string().email('Enter a valid email address'),
})

// ─── Head ─────────────────────────────────────────────────────────────────

export const ChapterSetupSchema = z.object({
    meeting_day: z.string().optional(),
    meeting_time: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    whatsapp_link: z.string().url('Enter a valid WhatsApp invite link').optional(),
    logo_url: z.string().url('Logo must be a valid URL').optional(),
})

export const MemberActionSchema = z.object({
    action: z.enum(['flag', 'remove']),
})

// ─── Admin ────────────────────────────────────────────────────────────────

export const DenominationSchema = z.object({
    name: z.string().min(3, 'Denomination name must be at least 3 characters'),
    description: z.string().optional(),
    logo_url: z.string().url('Logo must be a valid URL').optional(),
})

export const CampusLogoSchema = z.object({
    logo_url: z.string().url('Logo must be a valid URL'),
})

export const RejectChapterSchema = z.object({
    reason: z.string().min(10, 'Please provide a reason of at least 10 characters'),
})
