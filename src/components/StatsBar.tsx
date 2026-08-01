"use client";

import { GameState } from "@/lib/state";

interface StatsBarProps {
  state: GameState;
  onSettings: () => void;
  onHome: () => void;
}

export default function StatsBar({ state, onSettings, onHome }: StatsBarProps) {
  return (
    <div className="p-3 md:p-4">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex-1 flex items-center gap-2 md:gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 bg-bg-card border border-border rounded-full px-4 py-2 shrink-0">
            <span className="text-xs text-text-secondary">Score</span>
            <span className="text-sm font-medium text-accent-yellow">
              {String(state.score).padStart(5, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-bg-card border border-border rounded-full px-4 py-2 shrink-0">
            <span className="text-xs text-text-secondary">Streak</span>
            <span className="text-sm font-medium text-accent-cyan">
              {state.streak}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-bg-card border border-border rounded-full px-4 py-2 shrink-0">
            <span className="text-xs text-text-secondary">Rank</span>
            <span className="text-sm font-medium text-accent-purple">
              {state.tier}
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
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
