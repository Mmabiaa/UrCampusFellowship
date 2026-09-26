-- ============================================================
-- UrCampusFellowship — Migration 003: Clean test entries & seed real UMaT chapters
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Remove E2E test chapters and test denominations
DELETE FROM chapters WHERE name ILIKE 'E2E%';
DELETE FROM denominations WHERE name ILIKE 'E2E%';

-- 2. Insert real Denominations
INSERT INTO denominations (name, description) VALUES
  ('Pentecost Students and Associates (PENSA)', 'Official campus ministry of The Church of Pentecost'),
  ('Assemblies of God Campus Ministry (AGCM)', 'Official campus ministry of Assemblies of God Ghana'),
  ('Ghana Fellowship of Evangelical Students (GHAFES)', 'Inter-denominational evangelical student movement'),
  ('Catholic Campus Ministry (Pax Romana)', 'Catholic students and associates on campus')
ON CONFLICT (name) DO NOTHING;

-- 3. Seed real active Chapters for UMaT Main Campus
WITH main_campus AS (
  SELECT id FROM campuses WHERE name ILIKE '%Main Campus%' LIMIT 1
),
pensa_denom AS (
  SELECT id FROM denominations WHERE name ILIKE '%PENSA%' LIMIT 1
),
agcm_denom AS (
  SELECT id FROM denominations WHERE name ILIKE '%AGCM%' LIMIT 1
),
ghafes_denom AS (
  SELECT id FROM denominations WHERE name ILIKE '%GHAFES%' LIMIT 1
)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 
  'PENSA UMaT Chapter',
  'active',
  'Wednesday',
  '5:30 PM',
  'Old Lecture Theatre (OLT)',
  'Join PENSA UMaT as we worship, build faith, and serve together.',
  'https://chat.whatsapp.com/pensa-umat',
  main_campus.id,
  pensa_denom.id
FROM main_campus, pensa_denom
ON CONFLICT DO NOTHING;

WITH main_campus AS (
  SELECT id FROM campuses WHERE name ILIKE '%Main Campus%' LIMIT 1
),
agcm_denom AS (
  SELECT id FROM denominations WHERE name ILIKE '%AGCM%' LIMIT 1
)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 
  'AGCM UMaT Chapter',
  'active',
  'Sunday',
  '6:00 PM',
  'Auditorium 2',
  'Assemblies of God Campus Ministry at UMaT Main Campus.',
  'https://chat.whatsapp.com/agcm-umat',
  main_campus.id,
  agcm_denom.id
FROM main_campus, agcm_denom
ON CONFLICT DO NOTHING;

WITH essikado_campus AS (
  SELECT id FROM campuses WHERE name ILIKE '%Essikado%' LIMIT 1
),
ghafes_denom AS (
  SELECT id FROM denominations WHERE name ILIKE '%GHAFES%' LIMIT 1
)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 
  'GHAFES Essikado Chapter',
  'coming_soon',
  'Friday',
  '5:00 PM',
  'Essikado Main Hall',
  'Interdenominational student fellowship at UMaT Essikado Campus.',
  'https://chat.whatsapp.com/ghafes-essikado',
  essikado_campus.id,
  ghafes_denom.id
FROM essikado_campus, ghafes_denom
ON CONFLICT DO NOTHING;
