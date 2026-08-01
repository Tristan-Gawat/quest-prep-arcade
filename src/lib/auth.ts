import { supabase, DBProfile, DBLanguageProgress } from "./supabase";
import { getRankFromXP } from "./ranking";

export async function signInWithGoogle() {
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
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string): Promise<DBProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return null;
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
export async function getGlobalLeaderboard(limit = 50): Promise<DBProfile[]> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("total_xp", { ascending: false })
    .limit(limit);
  return data || [];
}

export async function getLanguageLeaderboard(languageId: string, limit = 50) {
  const { data } = await supabase
    .from("language_progress")
    .select("*, profiles(username, avatar_url)")
    .eq("language_id", languageId)
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
