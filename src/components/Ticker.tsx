"use client";

import { GameState } from "@/lib/state";

interface TickerProps {
  state: GameState;
}

export default function Ticker({ state }: TickerProps) {
  let message: string;

  if (state.streak >= 3) {
    message =
      "YOU ARE SMASHING IT! REMEMBER: EDUCATION IS FREE AND EQUITABLE FOR ALL!";
  } else if (state.tier === "ROOKIE" && state.totalQuestionsAnswered > 0) {
    message =
      "KEEP GOING ACADEMY STUDENT! FAILURE IS JUST A STEP TOWARDS MASTERING THE LEVEL!";
  } else {
    message =
      "WELCOME TO QUEST PREP ARCADE! LEARN TO CODE, LEVEL UP YOUR SKILLS, CHANGE THE WORLD!";
  }

  return (
    <div className="m-3 md:m-4 arcade-card bg-arcade-purple p-3 overflow-hidden">
      <div className="whitespace-nowrap">
        <span className="ticker-scroll inline-block text-[8px] md:text-[9px] text-white">
          {message}
        </span>
      </div>
    </div>
  );
}
