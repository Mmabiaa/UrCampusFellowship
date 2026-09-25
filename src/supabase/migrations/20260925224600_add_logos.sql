-- ============================================================
-- UrCampusFellowship — Migration 002
-- Adds logo_url to campuses, denominations and chapters.
-- Renames campuses to official UMaT names.
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. Add logo_url columns ───────────────────────────────────────────────
ALTER TABLE campuses
  ADD COLUMN IF NOT EXISTS logo_url text;

ALTER TABLE denominations
  ADD COLUMN IF NOT EXISTS logo_url text;

ALTER TABLE chapters
  ADD COLUMN IF NOT EXISTS logo_url text;

-- ── 2. Rename campuses to official UMaT names ────────────────────────────
UPDATE campuses SET name = 'UMaT Main Campus'     WHERE name = 'Main Campus';
UPDATE campuses SET name = 'UMaT Essikado Campus' WHERE name = 'Essikado';

-- ── 3. Ensure both campuses exist (idempotent) ────────────────────────────
INSERT INTO campuses (name) VALUES
  ('UMaT Main Campus'),
  ('UMaT Essikado Campus')
ON CONFLICT (name) DO NOTHING;

-- ── 4. Supabase Storage — create logos bucket ────────────────────────────
-- NOTE: Run this ONLY if the bucket does not yet exist.
-- You can also create it via the Supabase Dashboard → Storage → New Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- ── 5. Storage RLS — anyone can read logos (they are public) ─────────────
CREATE POLICY IF NOT EXISTS "logos_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'logos');

-- ── 6. Storage RLS — authenticated users can upload logos ────────────────
CREATE POLICY IF NOT EXISTS "logos_authenticated_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'logos');

-- ── 7. Storage RLS — owners can update/delete their own uploads ──────────
CREATE POLICY IF NOT EXISTS "logos_owner_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'logos' AND owner = auth.uid());

CREATE POLICY IF NOT EXISTS "logos_owner_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'logos' AND owner = auth.uid());
