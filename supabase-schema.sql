-- ============================================================
-- CodeLapse Extended Schema: Profiles, Friends, Code Battles
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Extend profiles table with bio and last_seen for online status
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT now();

-- 2. Friendships table
CREATE TABLE IF NOT EXISTS friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(requester_id, addressee_id)
);

-- Index for fast friend lookups
CREATE INDEX IF NOT EXISTS idx_friendships_requester ON friendships(requester_id);
CREATE INDEX IF NOT EXISTS idx_friendships_addressee ON friendships(addressee_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON friendships(status);

-- 3. Code Battles table
CREATE TABLE IF NOT EXISTS code_battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opponent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled', 'expired')),
  language TEXT NOT NULL,
  problem_title TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  starter_code TEXT DEFAULT '',
  time_limit_seconds INTEGER NOT NULL DEFAULT 300,
  winner_id UUID REFERENCES profiles(id),
  challenger_code TEXT,
  opponent_code TEXT,
  challenger_output TEXT,
  opponent_output TEXT,
  challenger_completed_at TIMESTAMPTZ,
  opponent_completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_battles_challenger ON code_battles(challenger_id);
CREATE INDEX IF NOT EXISTS idx_battles_opponent ON code_battles(opponent_id);
CREATE INDEX IF NOT EXISTS idx_battles_status ON code_battles(status);

-- 4. Enable RLS on new tables
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_battles ENABLE ROW LEVEL SECURITY;

-- 5. Friendship policies
DROP POLICY IF EXISTS "Users can view their own friendships" ON friendships;
CREATE POLICY "Users can view their own friendships"
  ON friendships FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

DROP POLICY IF EXISTS "Users can send friend requests" ON friendships;
CREATE POLICY "Users can send friend requests"
  ON friendships FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

DROP POLICY IF EXISTS "Users can update friendships they are part of" ON friendships;
CREATE POLICY "Users can update friendships they are part of"
  ON friendships FOR UPDATE
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

DROP POLICY IF EXISTS "Users can delete their own friendships" ON friendships;
CREATE POLICY "Users can delete their own friendships"
  ON friendships FOR DELETE
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- 6. Code Battle policies
DROP POLICY IF EXISTS "Users can view battles they participate in" ON code_battles;
CREATE POLICY "Users can view battles they participate in"
  ON code_battles FOR SELECT
  USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

DROP POLICY IF EXISTS "Users can create battles" ON code_battles;
CREATE POLICY "Users can create battles"
  ON code_battles FOR INSERT
  WITH CHECK (auth.uid() = challenger_id);

DROP POLICY IF EXISTS "Participants can update their battles" ON code_battles;
CREATE POLICY "Participants can update their battles"
  ON code_battles FOR UPDATE
  USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

-- 7. Enable Supabase Realtime for battles (live updates)
ALTER PUBLICATION supabase_realtime ADD TABLE code_battles;

-- 8. Create storage bucket for avatars (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Avatar storage policies
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);


-- 9. Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'player';



-- 10. Messages table for real-time chat between friends
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for fast message lookups
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, receiver_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(receiver_id, is_read) WHERE is_read = false;

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Receivers can mark messages as read" ON messages;
CREATE POLICY "Receivers can mark messages as read"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can delete their own sent messages" ON messages;
CREATE POLICY "Users can delete their own sent messages"
  ON messages FOR DELETE
  USING (auth.uid() = sender_id);

-- Enable Supabase Realtime for messages (live chat updates)
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
