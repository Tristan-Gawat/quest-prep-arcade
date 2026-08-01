-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  rank_tier TEXT NOT NULL DEFAULT 'ROOKIE',
  rank_division INTEGER NOT NULL DEFAULT 3,
  total_xp INTEGER NOT NULL DEFAULT 0,
  streak_best INTEGER NOT NULL DEFAULT 0,
  streak_current INTEGER NOT NULL DEFAULT 0,
  modules_completed INTEGER NOT NULL DEFAULT 0,
  questions_answered INTEGER NOT NULL DEFAULT 0,
  questions_correct INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Language-specific progress
CREATE TABLE IF NOT EXISTS public.language_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  language_id TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  modules_completed TEXT[] NOT NULL DEFAULT '{}',
  rank_tier TEXT NOT NULL DEFAULT 'ROOKIE',
  rank_division INTEGER NOT NULL DEFAULT 3,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, language_id)
);

-- Indexes for leaderboard queries
CREATE INDEX idx_profiles_total_xp ON public.profiles(total_xp DESC);
CREATE INDEX idx_profiles_rank ON public.profiles(rank_tier, rank_division);
CREATE INDEX idx_language_progress_xp ON public.language_progress(language_id, xp DESC);
CREATE INDEX idx_language_progress_user ON public.language_progress(user_id);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.language_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can view, only owner can update
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Language progress: anyone can view, only owner can modify
CREATE POLICY "Language progress viewable by everyone"
  ON public.language_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can update own language progress"
  ON public.language_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own language progress"
  ON public.language_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- View for global leaderboard
CREATE OR REPLACE VIEW public.global_leaderboard AS
SELECT
  p.id AS user_id,
  p.username,
  p.avatar_url,
  p.rank_tier,
  p.rank_division,
  p.total_xp,
  p.modules_completed,
  p.streak_best
FROM public.profiles p
ORDER BY p.total_xp DESC;

-- View for per-language leaderboard
CREATE OR REPLACE VIEW public.language_leaderboard AS
SELECT
  lp.user_id,
  p.username,
  p.avatar_url,
  lp.language_id,
  lp.rank_tier,
  lp.rank_division,
  lp.xp,
  array_length(lp.modules_completed, 1) AS modules_done
FROM public.language_progress lp
JOIN public.profiles p ON p.id = lp.user_id
ORDER BY lp.xp DESC;
