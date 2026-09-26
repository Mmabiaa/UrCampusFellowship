-- ============================================================
-- Force update register_student function only
-- (Skip the constraint since it already exists)
-- ============================================================

CREATE OR REPLACE FUNCTION register_student(
  p_student_id uuid,
  p_chapter_id uuid,
  p_full_name  text,
  p_phone      text,
  p_program    text,
  p_hall       text,
  p_level      text,
  p_campus_id  uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $
DECLARE
  v_existing_chapter_id uuid;
  v_existing_chapter_name text;
  v_chapter_status text;
  v_whatsapp_link text;
  v_phone_owner_id uuid;
  v_phone_owner_name text;
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

  -- Step 2: Check if phone number is already used by ANOTHER student
  SELECT sp.id, sp.full_name
    INTO v_phone_owner_id, v_phone_owner_name
    FROM student_profiles sp
   WHERE sp.phone = p_phone
     AND sp.id != p_student_id;

  IF v_phone_owner_id IS NOT NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', format('This phone number (%s) is already registered by another student. Each student must use their own phone number.', p_phone)
    );
  END IF;

  -- Step 3: Check if this student is already in a chapter
  SELECT sp.current_chapter_id, c.name
    INTO v_existing_chapter_id, v_existing_chapter_name
    FROM student_profiles sp
    LEFT JOIN chapters c ON c.id = sp.current_chapter_id
   WHERE sp.id = p_student_id;

  IF v_existing_chapter_id IS NOT NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', format('You are already registered with %s. Leave that chapter first.', v_existing_chapter_name)
    );
  END IF;

  -- Step 4: Upsert student profile
  INSERT INTO student_profiles (id, full_name, phone, program, hall, level, campus_id, current_chapter_id)
  VALUES (p_student_id, p_full_name, p_phone, p_program, p_hall, p_level, p_campus_id, p_chapter_id)
  ON CONFLICT (id) DO UPDATE
    SET full_name          = EXCLUDED.full_name,
        phone              = EXCLUDED.phone,
        program            = EXCLUDED.program,
        hall               = EXCLUDED.hall,
        level              = EXCLUDED.level,
        campus_id          = EXCLUDED.campus_id,
        current_chapter_id = EXCLUDED.current_chapter_id,
        updated_at         = now();

  -- Step 5: Create membership record
  INSERT INTO memberships (student_id, chapter_id, status)
  VALUES (p_student_id, p_chapter_id, 'active');

  RETURN json_build_object('success', true, 'whatsapp_link', v_whatsapp_link);
END;
$;
