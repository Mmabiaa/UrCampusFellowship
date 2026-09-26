-- ============================================================
-- Remove auth requirement for student registration
-- Students don't need accounts - just fill form and get WhatsApp link
-- ============================================================

-- Step 1: Drop the foreign key constraint to auth.users
ALTER TABLE student_profiles 
  DROP CONSTRAINT IF EXISTS student_profiles_id_fkey;

-- Step 2: Add email field (required for contact)
ALTER TABLE student_profiles 
  ADD COLUMN IF NOT EXISTS email text;

-- Step 3: Make phone unique (if not already)
ALTER TABLE student_profiles 
  DROP CONSTRAINT IF EXISTS student_profiles_phone_unique;

ALTER TABLE student_profiles 
  ADD CONSTRAINT student_profiles_phone_unique UNIQUE (phone);

-- Step 4: Update the register_student function to not require auth user ID
CREATE OR REPLACE FUNCTION register_student(
  p_chapter_id uuid,
  p_full_name  text,
  p_email      text,
  p_phone      text,
  p_program    text,
  p_hall       text,
  p_level      text,
  p_campus_id  uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_chapter_status text;
  v_whatsapp_link text;
  v_existing_student_id uuid;
  v_existing_chapter_id uuid;
  v_existing_chapter_name text;
  v_new_student_id uuid;
BEGIN
  -- Step 1: Check that target chapter exists and is active
  SELECT status, whatsapp_link
    INTO v_chapter_status, v_whatsapp_link
    FROM chapters
   WHERE id = p_chapter_id;

  IF v_chapter_status IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Chapter not found.');
  END IF;

  IF v_chapter_status != 'active' THEN
    RETURN json_build_object('success', false, 'error', 'Chapter is not open for registration.');
  END IF;

  -- Step 2: Check if this phone number is already registered to ANY chapter
  SELECT sp.id, sp.current_chapter_id, c.name
    INTO v_existing_student_id, v_existing_chapter_id, v_existing_chapter_name
    FROM student_profiles sp
    LEFT JOIN chapters c ON c.id = sp.current_chapter_id
   WHERE sp.phone = p_phone
     AND sp.current_chapter_id IS NOT NULL;

  IF v_existing_student_id IS NOT NULL THEN
    -- Phone is already registered to a chapter
    IF v_existing_chapter_id = p_chapter_id THEN
      -- Trying to re-register to the same chapter - just return success with existing link
      RETURN json_build_object(
        'success', true, 
        'whatsapp_link', v_whatsapp_link,
        'message', 'You are already registered with this chapter.'
      );
    ELSE
      -- Trying to register to a different chapter - block it
      RETURN json_build_object(
        'success', false,
        'error', format('This phone number is already registered with %s. Please contact them if you need to switch chapters.', v_existing_chapter_name)
      );
    END IF;
  END IF;

  -- Step 3: Generate new student ID
  v_new_student_id := gen_random_uuid();

  -- Step 4: Insert student profile
  INSERT INTO student_profiles (id, full_name, email, phone, program, hall, level, campus_id, current_chapter_id)
  VALUES (v_new_student_id, p_full_name, p_email, p_phone, p_program, p_hall, p_level, p_campus_id, p_chapter_id);

  -- Step 5: Create membership record
  INSERT INTO memberships (student_id, chapter_id, status)
  VALUES (v_new_student_id, p_chapter_id, 'active');

  RETURN json_build_object('success', true, 'whatsapp_link', v_whatsapp_link);
END;
$$;
