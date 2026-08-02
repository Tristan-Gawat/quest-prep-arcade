import { supabase, DBProfile, DBLanguageProgress, isSupabaseConfigured } from "./supabase";
import { getRankFromXP } from "./ranking";

export async function signInWithGoogle() {
  if (!isSupabaseConfigured) return { data: null, error: new Error("Supabase not configured") };
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  try {
    // Try getSession first (reads from local storage, more reliable)
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) return session.user;
    // Fallback to getUser (makes API call to verify)
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function getProfile(userId: string): Promise<DBProfile | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return null;
  return data;
}

/**
 * Ensures a profile row exists for the given user. Creates one if missing.
 * This should be called after every successful authentication to handle first-time sign-ins.
 */
export async function ensureProfile(userId: string, email?: string | null, avatarUrl?: string | null): Promise<DBProfile | null> {
  if (!isSupabaseConfigured) return null;
  
  // First check if profile already exists
  const existing = await getProfile(userId);
  if (existing) return existing;

  // Profile doesn't exist — create one for this new user
  const username = email
    ? email.split("@")[0] // Use email prefix as default username
    : `Player_${userId.slice(0, 6)}`;

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      username,
      avatar_url: avatarUrl || null,
      rank_tier: "IRON",
      rank_division: 4,
      total_xp: 0,
      streak_best: 0,
      streak_current: 0,
      modules_completed: 0,
      questions_answered: 0,
      questions_correct: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Failed to create profile:", error);
    return null;
  }
  return data;
}

export async function updateProfile(userId: string, updates: Partial<DBProfile>) {
  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId);
  return { error };
}

export async function addXP(userId: string, xp: number, languageId?: string) {
  // Get current profile
  const profile = await getProfile(userId);
  if (!profile) return;

  // Skip XP update for developer accounts (check role in profile or email)
  // Developer profiles have role='developer' set via migration 003
  const { data: roleCheck } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  if (roleCheck?.role === "developer") return;

  const newTotalXP = profile.total_xp + xp;
  const newRank = getRankFromXP(newTotalXP);

  // Update global profile
  await supabase
    .from("profiles")
    .update({
      total_xp: newTotalXP,
      rank_tier: newRank.tier,
      rank_division: newRank.division,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  // Update language progress if specified
  if (languageId) {
    const { data: langProgress } = await supabase
      .from("language_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("language_id", languageId)
      .single();

    if (langProgress) {
      const newLangXP = langProgress.xp + xp;
      const langRank = getRankFromXP(newLangXP);
      await supabase
        .from("language_progress")
        .update({
          xp: newLangXP,
          rank_tier: langRank.tier,
          rank_division: langRank.division,
          updated_at: new Date().toISOString(),
        })
        .eq("id", langProgress.id);
    } else {
      const langRank = getRankFromXP(xp);
      await supabase
        .from("language_progress")
        .insert({
          user_id: userId,
          language_id: languageId,
          xp,
          rank_tier: langRank.tier,
          rank_division: langRank.division,
        });
    }
  }
}

export async function completeModule(userId: string, moduleId: string, languageId: string) {
  // Update profile modules count
  const profile = await getProfile(userId);
  if (!profile) return;

  await supabase
    .from("profiles")
    .update({
      modules_completed: profile.modules_completed + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  // Update language progress
  const { data: langProgress } = await supabase
    .from("language_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("language_id", languageId)
    .single();

  if (langProgress) {
    const currentModules = langProgress.modules_completed || [];
    if (!currentModules.includes(moduleId)) {
      await supabase
        .from("language_progress")
        .update({
          modules_completed: [...currentModules, moduleId],
          updated_at: new Date().toISOString(),
        })
        .eq("id", langProgress.id);
    }
  } else {
    await supabase
      .from("language_progress")
      .insert({
        user_id: userId,
        language_id: languageId,
        xp: 0,
        modules_completed: [moduleId],
      });
  }
}

export async function updateStreak(userId: string, streak: number) {
  const profile = await getProfile(userId);
  if (!profile) return;

  const updates: Partial<DBProfile> = {
    streak_current: streak,
    updated_at: new Date().toISOString(),
  };
  if (streak > profile.streak_best) {
    updates.streak_best = streak;
  }

  await supabase.from("profiles").update(updates).eq("id", userId);
}

export async function updateQuestionStats(userId: string, correct: boolean) {
  const profile = await getProfile(userId);
  if (!profile) return;

  const updates: Partial<DBProfile> = {
    questions_answered: profile.questions_answered + 1,
    updated_at: new Date().toISOString(),
  };
  if (correct) {
    updates.questions_correct = profile.questions_correct + 1;
  }

  await supabase.from("profiles").update(updates).eq("id", userId);
}

// Leaderboard queries
export async function getGlobalLeaderboard(limit = 50, country?: string | null): Promise<DBProfile[]> {
  let query = supabase
    .from("profiles")
    .select("*")
    .or("role.eq.player,role.is.null")
    .order("total_xp", { ascending: false })
    .limit(limit);

  if (country) {
    query = query.eq("country", country);
  }

  const { data } = await query;
  return data || [];
}

export async function getLanguageLeaderboard(languageId: string, limit = 50) {
  const { data } = await supabase
    .from("language_progress")
    .select("*, profiles!inner(username, avatar_url, role)")
    .eq("language_id", languageId)
    .or("role.eq.player,role.is.null", { referencedTable: "profiles" })
    .order("xp", { ascending: false })
    .limit(limit);
  return data || [];
}

export async function getUserLanguageProgress(userId: string): Promise<DBLanguageProgress[]> {
  const { data } = await supabase
    .from("language_progress")
    .select("*")
    .eq("user_id", userId);
  return data || [];
}
