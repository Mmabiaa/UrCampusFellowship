-- ============================================================
-- Temporary script to clear your own registration for testing
-- Run this in Supabase SQL Editor
-- ============================================================

-- This will clear your current chapter assignment
-- Replace 'your-user-id-here' with your actual auth.users id

UPDATE student_profiles
SET current_chapter_id = NULL
WHERE id = auth.uid(); -- This uses your current logged-in user ID

-- Or if you want to completely remove your profile to start fresh:
-- DELETE FROM student_profiles WHERE id = auth.uid();
