-- Add cover_photo_url column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cover_photo_url TEXT DEFAULT NULL;
