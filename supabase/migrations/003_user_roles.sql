-- Add role column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'player';

-- Set developer accounts
UPDATE public.profiles SET role = 'developer' WHERE id IN (
  SELECT id FROM auth.users WHERE email IN (
    'tjgawat0113@gmail.com',
    'tristangawatschool@gmail.com',
    'c1-241-00124@uphsl.edu.ph'
  )
);

-- Index for role queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
