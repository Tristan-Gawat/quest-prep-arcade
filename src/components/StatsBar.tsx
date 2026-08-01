"use client";

import { GameState } from "@/lib/state";
import { getRankDisplay, getRankColor, getRankBadgeEmoji } from "@/lib/ranking";
import { getRankFromXP } from "@/lib/ranking";
import { User } from "@supabase/supabase-js";

interface StatsBarProps {
  state: GameState;
  onSettings: () => void;
  onHome: () => void;
  onProfile: () => void;
  onLeaderboard: () => void;
  user: User | null;
}

export default function StatsBar({ state, onSettings, onHome, onProfile, onLeaderboard, user }: StatsBarProps) {
  const rank = getRankFromXP(state.score);

  return (
    <div className="p-3 md:p-4">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex-1 flex items-center gap-2 md:gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 bg-bg-card border border-border rounded-full px-4 py-2 shrink-0">
            <span className="text-xs text-text-secondary">XP</span>
            <span className="text-sm font-medium text-accent-yellow">
              {state.score.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-bg-card border border-border rounded-full px-4 py-2 shrink-0">
            <span className="text-xs text-text-secondary">Streak</span>
            <span className="text-sm font-medium text-accent-cyan">
              {state.streak}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-bg-card border border-border rounded-full px-4 py-2 shrink-0">
            <span className="text-xs" style={{ color: getRankColor(rank.tier) }}>
              {getRankBadgeEmoji(rank.tier)} {getRankDisplay(rank)}
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onLeaderboard}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-bg-card hover:border-border-focus transition-colors cursor-pointer"
            title="Leaderboard"
          >
            🏆
          </button>
          {user && (
            <button
              onClick={onProfile}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-bg-card hover:border-border-focus transition-colors cursor-pointer overflow-hidden"
              title="Profile"
            >
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="" className="w-full h-full rounded-lg object-cover" />
              ) : (
                "👤"
              )}
            </button>
          )}
          <button
            onClick={onHome}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-bg-card hover:border-border-focus transition-colors cursor-pointer"
            title="Home"
          >
            🏠
          </button>
          <button
            onClick={onSettings}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-bg-card hover:border-border-focus transition-colors cursor-pointer"
            title="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
}
