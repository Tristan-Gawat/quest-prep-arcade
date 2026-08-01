"use client";

import { useEffect, useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { getProfile, getUserLanguageProgress, signOut } from "@/lib/auth";
import { DBProfile, DBLanguageProgress } from "@/lib/supabase";
import { getRankDisplay, getRankColor, getRankBadgeEmoji, getXPForNextRank } from "@/lib/ranking";
import { courses } from "@/data/courses";

interface ProfileScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
  onSignOut: () => void;
}

export default function ProfileScreen({ state, navigate, userId, onSignOut }: ProfileScreenProps) {
  const [profile, setProfile] = useState<DBProfile | null>(null);
  const [langProgress, setLangProgress] = useState<DBLanguageProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!userId) { setLoading(false); return; }
      const p = await getProfile(userId);
      const lp = await getUserLanguageProgress(userId);
      setProfile(p);
      setLangProgress(lp);
      setLoading(false);
    }
    load();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-accent-blue pulse-soft">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card p-8 text-center max-w-md">
          <p className="text-lg font-semibold text-text-primary mb-2">Not Signed In</p>
          <p className="text-sm text-text-secondary mb-6">Sign in to see your profile and compete on leaderboards.</p>
          <button onClick={() => navigate("course-select")} className="btn-primary text-sm">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const rank = { tier: profile.rank_tier as "ROOKIE" | "ELITE" | "MASTER" | "GRANDMASTER" | "CHAMPION", division: profile.rank_division };
  const rankProgress = getXPForNextRank(profile.total_xp);
  const accuracy = profile.questions_answered > 0
    ? Math.round((profile.questions_correct / profile.questions_answered) * 100)
    : 0;

  const handleSignOut = async () => {
    await signOut();
    onSignOut();
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto fade-in">
        {/* Profile Header */}
        <div className="card p-6 md:p-8 mb-6 text-center">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2"
              style={{ borderColor: getRankColor(rank.tier) }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl border-2"
              style={{ borderColor: getRankColor(rank.tier), backgroundColor: getRankColor(rank.tier) + "20" }}
            >
              {profile.username.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-semibold text-text-primary mb-1">{profile.username}</h2>
          <p className="text-sm font-medium mb-4" style={{ color: getRankColor(rank.tier) }}>
            {getRankBadgeEmoji(rank.tier)} {getRankDisplay(rank)}
          </p>

          {/* Rank progress bar */}
          <div className="max-w-xs mx-auto">
            <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${rankProgress.progress}%`, backgroundColor: getRankColor(rank.tier) }}
              />
            </div>
            <p className="text-xs text-text-muted">
              {profile.total_xp} / {rankProgress.next} XP to next rank
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card p-4 text-center">
            <p className="text-lg font-semibold text-accent-yellow">{profile.total_xp.toLocaleString()}</p>
            <p className="text-xs text-text-muted">Total XP</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-lg font-semibold text-accent-green">{profile.modules_completed}</p>
            <p className="text-xs text-text-muted">Modules</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-lg font-semibold text-accent-cyan">{accuracy}%</p>
            <p className="text-xs text-text-muted">Accuracy</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-lg font-semibold text-accent-orange">{profile.streak_best}</p>
            <p className="text-xs text-text-muted">Best Streak</p>
          </div>
        </div>

        {/* Language Progress */}
        <div className="card p-6 mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Language Progress</h3>
          {langProgress.length === 0 ? (
            <p className="text-xs text-text-muted">No language progress yet. Start a course!</p>
          ) : (
            <div className="space-y-3">
              {langProgress.map((lp) => {
                const course = courses.find(c => c.id === lp.language_id);
                const lpRank = { tier: lp.rank_tier as "ROOKIE" | "ELITE" | "MASTER" | "GRANDMASTER" | "CHAMPION", division: lp.rank_division };
                return (
                  <div key={lp.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{course?.icon || "📝"}</span>
                      <div>
                        <p className="text-sm text-text-primary">{course?.name || lp.language_id}</p>
                        <p className="text-xs text-text-muted">{lp.modules_completed?.length || 0} modules</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: getRankColor(lpRank.tier) }}>
                        {getRankDisplay(lpRank)}
                      </p>
                      <p className="text-xs text-text-muted">{lp.xp} XP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Member since */}
        <div className="card p-4 mb-6 text-center">
          <p className="text-xs text-text-muted">
            Member since {new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
            ← Back to Courses
          </button>
          <button onClick={handleSignOut} className="px-5 py-2.5 text-sm rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red hover:bg-accent-red/20 transition-all cursor-pointer">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
