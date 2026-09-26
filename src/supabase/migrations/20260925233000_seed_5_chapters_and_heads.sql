-- ============================================================
-- UrCampusFellowship — Migration 004: Seed 5 Real Chapters & Chapter Heads
-- Run this in: Supabase Dashboard → SQL Editor
-- Default password for all 5 chapter head test accounts: Password123!
-- ============================================================

-- 1. Ensure Denominations exist
INSERT INTO denominations (name, description) VALUES
  ('Pentecost Students and Associates (PENSA)', 'Official campus ministry of The Church of Pentecost'),
  ('Assemblies of God Campus Ministry (AGCM)', 'Official campus ministry of Assemblies of God Ghana'),
  ('Ghana Fellowship of Evangelical Students (GHAFES)', 'Inter-denominational evangelical student movement'),
  ('Catholic Campus Ministry (Pax Romana)', 'Catholic students and associates on campus')
ON CONFLICT (name) DO NOTHING;

-- 2. Seed PENSA UMaT Chapter
WITH main_campus AS (SELECT id FROM campuses WHERE name ILIKE '%Main Campus%' LIMIT 1),
denom AS (SELECT id FROM denominations WHERE name ILIKE '%PENSA%' LIMIT 1)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 'PENSA UMaT Chapter', 'active', 'Wednesday', '5:30 PM', 'Old Lecture Theatre (OLT)', 'Join PENSA UMaT as we worship, build faith, and serve together.', 'https://chat.whatsapp.com/pensa-umat', main_campus.id, denom.id
FROM main_campus, denom
ON CONFLICT DO NOTHING;

-- 3. Seed AGCM UMaT Chapter
WITH main_campus AS (SELECT id FROM campuses WHERE name ILIKE '%Main Campus%' LIMIT 1),
denom AS (SELECT id FROM denominations WHERE name ILIKE '%AGCM%' LIMIT 1)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 'AGCM UMaT Chapter', 'active', 'Sunday', '6:00 PM', 'Auditorium 2', 'Assemblies of God Campus Ministry at UMaT Main Campus.', 'https://chat.whatsapp.com/agcm-umat', main_campus.id, denom.id
FROM main_campus, denom
ON CONFLICT DO NOTHING;

-- 4. Seed GHAFES UMaT Chapter
WITH main_campus AS (SELECT id FROM campuses WHERE name ILIKE '%Main Campus%' LIMIT 1),
denom AS (SELECT id FROM denominations WHERE name ILIKE '%GHAFES%' LIMIT 1)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 'GHAFES UMaT Chapter', 'active', 'Friday', '5:00 PM', 'Lecture Block B, Hall 4', 'Interdenominational evangelical student fellowship at UMaT Main Campus.', 'https://chat.whatsapp.com/ghafes-umat', main_campus.id, denom.id
FROM main_campus, denom
ON CONFLICT DO NOTHING;

-- 5. Seed Pax Romana UMaT Chapter
WITH main_campus AS (SELECT id FROM campuses WHERE name ILIKE '%Main Campus%' LIMIT 1),
denom AS (SELECT id FROM denominations WHERE name ILIKE '%Pax Romana%' OR name ILIKE '%Catholic%' LIMIT 1)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 'Pax Romana UMaT Chapter', 'active', 'Sunday', '7:00 AM', 'St. Thomas Aquinas Catholic Church, Tarkwa', 'Catholic Students and Associates at UMaT Main Campus.', 'https://chat.whatsapp.com/pax-umat', main_campus.id, denom.id
FROM main_campus, denom
ON CONFLICT DO NOTHING;

-- 6. Seed GHAFES Essikado Chapter
WITH essikado_campus AS (SELECT id FROM campuses WHERE name ILIKE '%Essikado%' LIMIT 1),
denom AS (SELECT id FROM denominations WHERE name ILIKE '%GHAFES%' LIMIT 1)
INSERT INTO chapters (name, status, meeting_day, meeting_time, location, description, whatsapp_link, campus_id, denomination_id)
SELECT 'GHAFES Essikado Chapter', 'coming_soon', 'Friday', '5:00 PM', 'Essikado Main Hall', 'Interdenominational student fellowship at UMaT Essikado Campus.', 'https://chat.whatsapp.com/ghafes-essikado', essikado_campus.id, denom.id
FROM essikado_campus, denom
ON CONFLICT DO NOTHING;
