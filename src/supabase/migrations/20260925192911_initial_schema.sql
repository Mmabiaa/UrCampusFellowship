-- ============================================================
-- UrCampusFellowship — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── Extensions ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Campuses ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campuses (
  id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE
);

-- Seed
INSERT INTO campuses (name) VALUES
  ('Main Campus'),
  ('Essikado')
ON CONFLICT (name) DO NOTHING;

-- ── Denominations ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS denominations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL UNIQUE,
  description text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── Chapters ──────────────────────────────────────────────────────────────
-- STATUS LIFECYCLE (v2 — head self-service model):
--   [*] → pending_approval  (head signs up and submits chapter)
--   pending_approval → coming_soon  (admin approves)
--   pending_approval → rejected     (admin rejects — head can revise and re-submit)
--   rejected → pending_approval     (head re-submits after corrections)
--   coming_soon → active            (head completes setup: day+time+location+whatsapp)
--   active → active                 (head edits details — stays active)
--   draft: reserved for admin-created shells (legacy / edge case)

CREATE TABLE IF NOT EXISTS chapters (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  denomination_id  uuid NOT NULL REFERENCES denominations(id) ON DELETE RESTRICT,
  campus_id        uuid NOT NULL REFERENCES campuses(id) ON DELETE RESTRICT,
  name             text NOT NULL,
  status           text NOT NULL DEFAULT 'pending_approval'
                     CHECK (status IN (
                       'pending_approval',
                       'coming_soon',
                       'active',
                       'rejected',
                       'draft'
                     )),
  meeting_day      text,
  meeting_time     text,
  location         text,
  description      text,
  whatsapp_link    text,
  head_user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  rejection_reason text,
  submitted_at     timestamptz NOT NULL DEFAULT now(),
  approved_at      timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Index: admin pending queue lookup
CREATE INDEX IF NOT EXISTS idx_chapters_status ON chapters(status);
-- Index: head's own chapter lookup
CREATE INDEX IF NOT EXISTS idx_chapters_head_user_id ON chapters(head_user_id);
-- Index: student directory lookup (campus + status)
CREATE INDEX IF NOT EXISTS idx_chapters_campus_status ON chapters(campus_id, status);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS chapters_updated_at ON chapters;
CREATE TRIGGER chapters_updated_at
  BEFORE UPDATE ON chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Student Profiles ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_profiles (
  id                 uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name          text,
  phone              text,
  program            text,
  hall               text,
  level              text CHECK (level IN ('100','200','300','400','postgrad')),
  campus_id          uuid REFERENCES campuses(id),
  current_chapter_id uuid REFERENCES chapters(id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS student_profiles_updated_at ON student_profiles;
CREATE TRIGGER student_profiles_updated_at
  BEFORE UPDATE ON student_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Memberships ───────────────────────────────────────────────────────────
-- Full audit log of every join/leave. current_chapter_id on student_profiles
-- is the fast lookup; this table is the history.
CREATE TABLE IF NOT EXISTS memberships (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  status     text NOT NULL DEFAULT 'active'
               CHECK (status IN ('active', 'flagged', 'removed')),
  joined_at  timestamptz NOT NULL DEFAULT now(),
  left_at    timestamptz,
  flagged_at timestamptz,
  flagged_by uuid REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_memberships_student ON memberships(student_id);
CREATE INDEX IF NOT EXISTS idx_memberships_chapter ON memberships(chapter_id);

-- ── Waitlist ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chapter_waitlist (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  email      text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_id, email)
);

-- ── User Roles ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_roles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role    text NOT NULL CHECK (role IN ('student', 'head', 'admin'))
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE campuses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE denominations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters          ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships       ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_waitlist  ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles        ENABLE ROW LEVEL SECURITY;

-- ── Campuses — public read ────────────────────────────────────────────────
CREATE POLICY "campuses_public_read" ON campuses
  FOR SELECT TO anon, authenticated USING (true);

-- ── Denominations — public read ───────────────────────────────────────────
CREATE POLICY "denominations_public_read" ON denominations
  FOR SELECT TO anon, authenticated USING (true);

-- ── Chapters ──────────────────────────────────────────────────────────────

-- Students (anon or authenticated) see only active + coming_soon
CREATE POLICY "chapters_public_read" ON chapters
  FOR SELECT TO anon, authenticated
  USING (status IN ('active', 'coming_soon'));

-- A head can see their own chapter at ANY status (pending, rejected, etc.)
CREATE POLICY "chapters_head_own_read" ON chapters
  FOR SELECT TO authenticated
  USING (head_user_id = auth.uid());

-- A head can INSERT a chapter only if they are the head_user_id
CREATE POLICY "chapters_head_insert" ON chapters
  FOR INSERT TO authenticated
  WITH CHECK (head_user_id = auth.uid());

-- A head can UPDATE their own chapter (API route enforces which fields are mutable)
CREATE POLICY "chapters_head_update" ON chapters
  FOR UPDATE TO authenticated
  USING (head_user_id = auth.uid())
  WITH CHECK (head_user_id = auth.uid());

-- ── Student Profiles ──────────────────────────────────────────────────────
-- Students can only read and write their own profile
CREATE POLICY "student_profiles_own_rw" ON student_profiles
  FOR ALL TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ── Memberships ───────────────────────────────────────────────────────────
-- Students see only their own memberships
CREATE POLICY "memberships_student_own" ON memberships
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

-- Heads see memberships only for their chapter
CREATE POLICY "memberships_head_read" ON memberships
  FOR SELECT TO authenticated
  USING (
    chapter_id IN (
      SELECT id FROM chapters WHERE head_user_id = auth.uid()
    )
  );

-- Heads can update (flag / remove) members of their chapter
CREATE POLICY "memberships_head_update" ON memberships
  FOR UPDATE TO authenticated
  USING (
    chapter_id IN (
      SELECT id FROM chapters WHERE head_user_id = auth.uid()
    )
  );

-- ── Waitlist ──────────────────────────────────────────────────────────────
-- Anyone can join the waitlist
CREATE POLICY "waitlist_insert" ON chapter_waitlist
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ── User Roles — users can read their own role only ───────────────────────
CREATE POLICY "user_roles_own_read" ON user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- STORED PROCEDURE — Atomic student registration
-- Guarantees the exclusivity check + profile upsert + membership insert
-- happen in a single transaction. Called via supabase.rpc('register_student')
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
SECURITY DEFINER  -- runs with the permissions of the function owner (admin), not the caller
AS $$
DECLARE
  v_existing_chapter_id uuid;
  v_existing_chapter_name text;
  v_chapter_status text;
  v_whatsapp_link text;
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

  -- Step 2: Exclusivity check — is this student already in a chapter?
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

  -- Step 3: Upsert student profile
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

  -- Step 4: Create membership record
  INSERT INTO memberships (student_id, chapter_id, status)
  VALUES (p_student_id, p_chapter_id, 'active');

  RETURN json_build_object('success', true, 'whatsapp_link', v_whatsapp_link);
END;
$$;
