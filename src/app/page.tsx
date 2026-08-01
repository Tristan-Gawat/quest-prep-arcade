"use client";

import { useState, useEffect, useCallback } from "react";
import { GameState, loadState, saveState, getInitialState } from "@/lib/state";
import { Screen } from "@/lib/state";
import StartScreen from "@/components/StartScreen";
import CourseSelect from "@/components/CourseSelect";
import LessonScreen from "@/components/LessonScreen";
import QuizScreen from "@/components/QuizScreen";
import ChallengeScreen from "@/components/ChallengeScreen";
import SettingsScreen from "@/components/SettingsScreen";
import StatsBar from "@/components/StatsBar";
import Ticker from "@/components/Ticker";

export default function Home() {
  const [state, setState] = useState<GameState>(() => {
    if (typeof window !== "undefined") {
      return loadState();
    }
    return getInitialState();
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveState(state);
  }, [state, mounted]);

  const navigate = useCallback((screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  }, []);

  const updateState = useCallback((updates: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = getInitialState();
    fresh.aiApiKey = state.aiApiKey;
    fresh.aiProvider = state.aiProvider;
    setState(fresh);
  }, [state.aiApiKey, state.aiProvider]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-arcade-yellow text-xs blink">LOADING...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {state.currentScreen !== "start" &&
        state.currentScreen !== "settings" && (
          <StatsBar
            state={state}
            onSettings={() => navigate("settings")}
            onHome={() => navigate("course-select")}
          />
        )}

      <div className="flex-1 flex flex-col">
        {state.currentScreen === "start" && (
          <StartScreen onStart={() => navigate("course-select")} />
        )}

        {state.currentScreen === "course-select" && (
          <CourseSelect
            state={state}
            updateState={updateState}
            navigate={navigate}
          />
        )}

        {state.currentScreen === "lesson" && (
          <LessonScreen
            state={state}
            navigate={navigate}
          />
        )}

        {state.currentScreen === "quiz" && (
          <QuizScreen
            state={state}
            updateState={updateState}
            navigate={navigate}
          />
        )}

        {state.currentScreen === "challenge" && (
          <ChallengeScreen
            state={state}
            updateState={updateState}
            navigate={navigate}
          />
        )}

        {state.currentScreen === "settings" && (
          <SettingsScreen
            state={state}
            updateState={updateState}
            navigate={navigate}
            resetProgress={resetProgress}
          />
        )}
      </div>

      {state.currentScreen !== "start" &&
        state.currentScreen !== "settings" && (
          <Ticker state={state} />
        )}
    </main>
  );
}
