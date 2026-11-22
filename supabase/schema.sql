-- ==============================================================================
-- UNVEILING CHRIST CHURCH (UCC) — COMPLETE SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- It creates all tables for website content management, public engagement,
-- sets up Row Level Security (RLS) policies, and pre-populates initial church data.
-- ==============================================================================

-- 1. Site Settings Table (Global Church Profile & Announcement)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  name TEXT NOT NULL DEFAULT 'Unveiling Christ Church',
  short_name TEXT DEFAULT 'UCC',
  tagline TEXT DEFAULT 'The city of gladness. Unstoppable grace.',
  description TEXT DEFAULT 'We exist to unveil Christ''s finished work and raise a generation established in grace and faith.',
  pastor_name TEXT DEFAULT 'Pastor Maurice Adero',
  email TEXT DEFAULT 'Unveilingchrist13@gmail.com',
  phone TEXT DEFAULT '+254 724 227 788',
  location TEXT DEFAULT 'Oyugis, Homa Bay County, Kenya',
  address TEXT DEFAULT 'P.O. Box 544-40222, Oyugis',
  map_url TEXT DEFAULT 'https://www.google.com/maps/search/?api=1&query=Unveiling+Christ+Church+Oyugis',
  service_times JSONB DEFAULT '[
    {"day": "Sunday", "name": "Sunday Celebration & Worship", "time": "8:00 AM"},
    {"day": "Friday", "name": "Friday Kesha (Night of Grace)", "time": "9:00 PM"},
    {"day": "Saturday", "name": "Praise & Worship Practice", "time": "2:00 PM"}
  ]'::jsonb,
  giving_details JSONB DEFAULT '[
    {"label": "Till Number", "value": "5425177"},
    {"label": "Paybill Number", "value": "522533"},
    {"label": "Account Number", "value": "8039919"},
    {"label": "Account Name", "value": "Unveiling Christ Church-Oyugis"}
  ]'::jsonb,
  announcement_active BOOLEAN DEFAULT FALSE,
  announcement_text TEXT DEFAULT 'Join us this Sunday at 8:00 AM in Oyugis or live online.',
  announcement_link TEXT DEFAULT '/live',
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Sermons Table
CREATE TABLE IF NOT EXISTS public.sermons (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  short_title TEXT,
  subtitle TEXT,
  speaker TEXT NOT NULL DEFAULT 'Pastor Maurice Adero',
  published_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  duration TEXT DEFAULT '1h 15m',
  tag TEXT DEFAULT 'Grace',
  scripture TEXT,
  youtube_url TEXT,
  thumbnail_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Special Service' CHECK (category IN ('Sunday Service', 'Worship Night', 'Revival', 'Conference', 'Youth', 'Outreach', 'Special Service')),
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT DEFAULT 'Main Sanctuary, Oyugis',
  time_label TEXT DEFAULT '8:00 AM',
  flyer_url TEXT,
  registration_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Ministries Table
CREATE TABLE IF NOT EXISTS public.ministries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT,
  kicker TEXT,
  tagline TEXT,
  summary TEXT,
  intro TEXT,
  leader_name TEXT,
  audience TEXT,
  meeting_schedule TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Prayer Requests Table (Public Submissions)
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone TEXT,
  request TEXT NOT NULL,
  is_confidential BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'prayed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. First-Time Visit Registrations Table
CREATE TABLE IF NOT EXISTS public.visit_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  visit_date DATE,
  guest_count INTEGER DEFAULT 1,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'welcomed')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Giving / Partnership Pledges Table
CREATE TABLE IF NOT EXISTS public.giving_pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  purpose TEXT DEFAULT 'Tithes & Offering' CHECK (purpose IN ('Tithes & Offering', 'Crusades & Revivals', 'Church Building', 'Community Outreach', 'General')),
  amount NUMERIC,
  reference_code TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.giving_pledges ENABLE ROW LEVEL SECURITY;

-- Drop any existing conflicting policies to allow clean re-runs
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public can view sermons" ON public.sermons;
DROP POLICY IF EXISTS "Public can view events" ON public.events;
DROP POLICY IF EXISTS "Public can view ministries" ON public.ministries;
DROP POLICY IF EXISTS "Public can insert prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Public can insert visit registrations" ON public.visit_registrations;
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Public can insert giving pledges" ON public.giving_pledges;
DROP POLICY IF EXISTS "Admin full access to site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin full access to sermons" ON public.sermons;
DROP POLICY IF EXISTS "Admin full access to events" ON public.events;
DROP POLICY IF EXISTS "Admin full access to ministries" ON public.ministries;
DROP POLICY IF EXISTS "Admin full access to prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Admin full access to visit registrations" ON public.visit_registrations;
DROP POLICY IF EXISTS "Admin full access to contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin full access to giving pledges" ON public.giving_pledges;

-- PUBLIC READ POLICIES (Everyone can see content on the church website)
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view sermons" ON public.sermons FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public can view ministries" ON public.ministries FOR SELECT USING (true);

-- PUBLIC SUBMISSIONS (Visitors can submit prayer requests, contact messages, etc.)
CREATE POLICY "Public can insert prayer requests" ON public.prayer_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert visit registrations" ON public.visit_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert giving pledges" ON public.giving_pledges FOR INSERT WITH CHECK (true);

-- ADMIN POLICIES (Authenticated users or backend service role can do anything)
CREATE POLICY "Admin full access to site settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to sermons" ON public.sermons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to ministries" ON public.ministries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to prayer requests" ON public.prayer_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to visit registrations" ON public.visit_registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to contact messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to giving pledges" ON public.giving_pledges FOR ALL USING (true) WITH CHECK (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_sermons_published ON public.sermons(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date ASC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created ON public.prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_registrations_created ON public.visit_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);

-- ==============================================================================
-- INITIAL SEED DATA (Pre-populates your website with church information)
-- ==============================================================================

-- Seed Global Site Settings
INSERT INTO public.site_settings (id, name, short_name, tagline, description, pastor_name, email, phone, location, address, map_url)
VALUES (
  'global',
  'Unveiling Christ Church',
  'UCC',
  'The city of gladness. Unstoppable grace.',
  'We exist to unveil Christ''s finished work and raise a generation established in grace and faith.',
  'Pastor Maurice Adero',
  'Unveilingchrist13@gmail.com',
  '+254 724 227 788',
  'Oyugis, Homa Bay County, Kenya',
  'P.O. Box 544-40222, Oyugis',
  'https://www.google.com/maps/search/?api=1&query=Unveiling+Christ+Church+Oyugis'
) ON CONFLICT (id) DO NOTHING;

-- Seed Initial Upcoming Events
INSERT INTO public.events (title, description, category, event_date, location, time_label, is_featured, status)
VALUES
  (
    'Worship Night: An Evening of Surrender',
    'Join the Unveiling Christ Church family for an extraordinary night of spontaneous praise, deep reverence, and the ministry of the Holy Spirit.',
    'Worship Night',
    TIMESTAMPTZ '2026-11-28 21:00:00+03',
    'Main Sanctuary, Oyugis',
    '9:00 PM – Dawn',
    true,
    'upcoming'
  ),
  (
    'Life in Christ Crusade & Revival',
    'Six life-transforming days of gospel proclamation, signs and wonders, and deep exposition of the finished work of Jesus Christ.',
    'Revival',
    TIMESTAMPTZ '2026-12-01 16:00:00+03',
    'Oyugis Town Grounds & Sanctuary',
    '4:00 PM Daily',
    true,
    'upcoming'
  ),
  (
    'Sunday Celebration & Word of Grace',
    'Experience uplifting fellowship, inspiring praise, and the Word of grace preached with clarity by Pastor Maurice Adero.',
    'Sunday Service',
    TIMESTAMPTZ '2026-11-29 08:00:00+03',
    'Main Sanctuary, Oyugis',
    '8:00 AM – 11:30 AM',
    false,
    'upcoming'
  )
ON CONFLICT DO NOTHING;

-- Seed Featured Sermon
INSERT INTO public.sermons (id, title, short_title, subtitle, speaker, tag, duration, scripture, is_featured, youtube_url, thumbnail_url)
VALUES (
  'Q9IOssdQCt8',
  'Have You Forgotten? How deeply God loves you · Part 1',
  'Have You Forgotten?',
  'How deeply God loves you · Part 1',
  'Pastor Maurice Adero',
  'The love of God',
  '1h 24m',
  '1 John 4:9-10',
  true,
  'https://www.youtube.com/watch?v=Q9IOssdQCt8',
  'https://i.ytimg.com/vi/Q9IOssdQCt8/maxresdefault.jpg'
) ON CONFLICT (id) DO NOTHING;
