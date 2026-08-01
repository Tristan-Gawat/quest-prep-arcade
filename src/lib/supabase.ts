import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DBProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  rank_tier: string;
  rank_division: number;
  total_xp: number;
  streak_best: number;
  streak_current: number;
  modules_completed: number;
  questions_answered: number;
  questions_correct: number;
  created_at: string;
  updated_at: string;
}

export interface DBLanguageProgress {
  id: string;
  user_id: string;
  language_id: string;
  xp: number;
  modules_completed: string[];
  rank_tier: string;
  rank_division: number;
  updated_at: string;
}

export interface DBLeaderboardEntry {
  user_id: string;
  username: string;
  avatar_url: string | null;
  rank_tier: string;
  rank_division: number;
  total_xp: number;
  modules_completed: number;
}
