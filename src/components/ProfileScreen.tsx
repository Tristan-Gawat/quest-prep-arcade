"use client";

import { useEffect, useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { getProfile, getUserLanguageProgress, signOut, signInWithGoogle, ensureProfile, getCurrentUser } from "@/lib/auth";
import { DBProfile, DBLanguageProgress } from "@/lib/supabase";
import { getRankDisplay, getRankColor, getRankBadgeEmoji, getXPForNextRank, getRankFromXP, RankTier } from "@/lib/ranking";
import { courses } from "@/data/courses";
import ProfileEditModal from "@/components/ProfileEditModal";

interface ProfileScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
  userEmail?: string | null;
  onSignOut: () => void;
}

export default function ProfileScreen({ state, navigate, userId, userEmail, onSignOut }: ProfileScreenProps) {
  const [profile, setProfile] = useState<DBProfile | null>(null);
  const [langProgress, setLangProgress] = useState<DBLanguageProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvedUserId, setResolvedUserId] = useState<string | null>(userId);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    async function load() {
      let uid = userId;

      // If userId prop is null, double-check the Supabase session directly
      // This handles cases where the parent's user state is stale (e.g., after OAuth redirect)
      if (!uid) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          uid = currentUser.id;
          setResolvedUserId(uid);
        }
      }

      if (!uid) { setLoading(false); return; }

      // Try to get the profile — if it doesn't exist, create one
      let p = await getProfile(uid);
      if (!p) {
        // Profile doesn't exist yet — this happens on first sign-in
        p = await ensureProfile(uid);
      }
      const lp = await getUserLanguageProgress(uid);
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

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  if (!profile) {
    // If userId exists, the user IS signed in but profile creation failed
    if (resolvedUserId) {
      return (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="card p-8 text-center max-w-md fade-in">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-lg font-semibold text-text-primary mb-2">Profile Unavailable</p>
            <p className="text-sm text-text-secondary mb-6">We couldn&apos;t load your profile. This may be a temporary issue. Try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="btn-primary text-sm w-full mb-3">
              Refresh Page
            </button>
            <button onClick={() => navigate("course-select")} className="btn-secondary text-sm w-full">
              ← Back to Courses
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card p-8 text-center max-w-md fade-in">
          <div className="text-4xl mb-4">👤</div>
          <p className="text-lg font-semibold text-text-primary mb-2">Not Signed In</p>
          <p className="text-sm text-text-secondary mb-6">Sign in to see your profile, track progress, and compete on leaderboards.</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-all cursor-pointer mb-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm w-full">
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const rank = getRankFromXP(profile.total_xp, userEmail);
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
          {/* Avatar with + button */}
          <div className="relative w-20 h-20 mx-auto mb-4 group">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.username}
                className="w-20 h-20 rounded-full border-2 object-cover"
                style={{ borderColor: getRankColor(rank.tier) }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl border-2"
                style={{ borderColor: getRankColor(rank.tier), backgroundColor: getRankColor(rank.tier) + "20" }}
              >
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
            {/* Plus button overlay */}
            <button
              onClick={() => setShowEditModal(true)}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent-blue flex items-center justify-center text-white text-sm font-bold border-2 border-bg-card cursor-pointer hover:bg-accent-blue/80 transition-colors shadow-lg"
              title="Change profile picture"
            >
              +
            </button>
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-1">{profile.username}</h2>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-xs text-accent-blue hover:text-accent-blue/80 mb-2 cursor-pointer"
          >
            Edit Profile
          </button>
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
                const lpRank = { tier: lp.rank_tier as RankTier, division: lp.rank_division };
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

        {/* Bio */}
        {/* Bio */}
        {profile.bio ? (
          <div className="card p-4 mb-6 text-center">
            <p className="text-sm text-text-secondary italic">
              &ldquo;{profile.bio}&rdquo;
            </p>
          </div>
        ) : null}

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

      {/* Profile Edit Modal */}
      {showEditModal && resolvedUserId && (
        <ProfileEditModal
          userId={resolvedUserId}
          currentProfile={profile}
          onClose={() => setShowEditModal(false)}
          onSaved={(updatedProfile) => {
            setProfile(updatedProfile);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
