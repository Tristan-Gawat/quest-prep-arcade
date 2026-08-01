-- Community Modules: AI-generated lessons that all users can access
CREATE TABLE IF NOT EXISTS public.community_modules (
  id TEXT PRIMARY KEY,
  language_id TEXT NOT NULL,
  title TEXT NOT NULL,
  tier TEXT NOT NULL,
  topic TEXT NOT NULL,
  module_data JSONB NOT NULL,
  source TEXT NOT NULL DEFAULT 'auto', -- 'auto', 'admin', 'user-request'
  requested_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_community_modules_language ON public.community_modules(language_id);
CREATE INDEX idx_community_modules_published ON public.community_modules(published, created_at DESC);
CREATE INDEX idx_community_modules_source ON public.community_modules(source);

-- Row Level Security
ALTER TABLE public.community_modules ENABLE ROW LEVEL SECURITY;

-- Everyone can read published modules
CREATE POLICY "Published modules are viewable by everyone"
  ON public.community_modules FOR SELECT
  USING (published = true);

-- Only authenticated users can insert (for user-request source)
CREATE POLICY "Authenticated users can request modules"
  ON public.community_modules FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
