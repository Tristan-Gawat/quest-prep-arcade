"use client";

import { GameState } from "@/lib/state";

interface TickerProps {
  state: GameState;
}

export default function Ticker({ state }: TickerProps) {
  let message: string;

  if (state.streak >= 3) {
    message =
      "You're on fire! Remember: education is free and equitable for all.";
  } else if (state.tier === "EASY" && state.totalQuestionsAnswered > 0) {
    message =
      "Keep going! Failure is just a step towards mastering the level.";
  } else {
    message =
      "Welcome to CodeLapse! Learn to code, level up your skills, change the world.";
  }

  return (
    <div className="mx-3 md:mx-4 mb-3 md:mb-4">
      <div className="bg-bg-card border border-border rounded-lg px-4 py-2.5 text-center">
        <span className="text-xs text-text-secondary">
          {message}
        </span>
      </div>
    </div>
  );
}
