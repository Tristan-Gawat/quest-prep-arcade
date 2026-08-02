import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Placeholder key in valid JWT format to prevent createClient from throwing
const PLACEHOLDER_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.placeholder";

let _supabase: SupabaseClient;
try {
  _supabase = createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || PLACEHOLDER_KEY
  );
} catch {
  _supabase = createClient("https://placeholder.supabase.co", PLACEHOLDER_KEY);
}

export const supabase = _supabase;

// Database types
export interface DBProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  cover_photo_url?: string | null;
  bio?: string;
  country?: string | null;
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

export interface DBFriendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: "pending" | "accepted" | "rejected" | "blocked";
  created_at: string;
  updated_at: string;
}

export interface DBCodeBattle {
  id: string;
  challenger_id: string;
  opponent_id: string | null;
  status: "pending" | "active" | "completed" | "cancelled" | "expired";
  language: string;
  problem_title: string;
  problem_description: string;
  expected_output: string;
  starter_code: string;
  time_limit_seconds: number;
  difficulty?: string;
  winner_id: string | null;
  challenger_code: string | null;
  opponent_code: string | null;
  challenger_output: string | null;
  opponent_output: string | null;
  challenger_completed_at: string | null;
  opponent_completed_at: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
}
