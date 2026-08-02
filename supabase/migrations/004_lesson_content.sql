-- Pre-generated lesson content storage
CREATE TABLE IF NOT EXISTS public.lesson_content (
  id TEXT PRIMARY KEY, -- format: "module_id:sub_lesson_index:language"
  module_id TEXT NOT NULL,
  sub_lesson_index INTEGER NOT NULL,
  language_id TEXT NOT NULL,
  title TEXT NOT NULL,
  definition TEXT NOT NULL,
  explanation TEXT NOT NULL,
  code_example TEXT NOT NULL,
  breakdown TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lesson_content_module ON public.lesson_content(module_id);
CREATE INDEX idx_lesson_content_lang ON public.lesson_content(language_id);

ALTER TABLE public.lesson_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read lessons
CREATE POLICY "Lessons are viewable by everyone"
  ON public.lesson_content FOR SELECT
  USING (true);

-- Only authenticated users can insert (admin/developer)
CREATE POLICY "Admins can insert lessons"
  ON public.lesson_content FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
