-- Add cover_photo_url and country columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cover_photo_url TEXT DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country TEXT DEFAULT NULL;

-- Index for country-based leaderboard queries
CREATE INDEX IF NOT EXISTS idx_profiles_country ON public.profiles(country);
