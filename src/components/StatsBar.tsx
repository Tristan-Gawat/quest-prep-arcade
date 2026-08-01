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
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="arcade-card bg-arcade-yellow p-2 md:p-3 text-center">
          <p className="text-[7px] md:text-[9px] text-black mb-1">SCORE</p>
          <p className="text-[10px] md:text-sm text-black">
            {String(state.score).padStart(5, "0")}
          </p>
        </div>
        <div className="arcade-card bg-arcade-cyan p-2 md:p-3 text-center">
          <p className="text-[7px] md:text-[9px] text-black mb-1">STREAK</p>
          <p className="text-[10px] md:text-sm text-black">
            {String(state.streak).padStart(2, "0")}
          </p>
        </div>
        <div className="arcade-card bg-arcade-purple p-2 md:p-3 text-center">
          <p className="text-[7px] md:text-[9px] text-black mb-1">RANK</p>
          <p className="text-[10px] md:text-sm text-white">{state.tier}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={onHome}
            className="arcade-card bg-arcade-card p-2 text-[9px] hover:bg-gray-600 transition-colors cursor-pointer"
            title="Home"
          >
            🏠
          </button>
          <button
            onClick={onSettings}
            className="arcade-card bg-arcade-card p-2 text-[9px] hover:bg-gray-600 transition-colors cursor-pointer"
            title="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
}
