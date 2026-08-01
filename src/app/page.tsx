"use client";

import { useState, useEffect, useCallback } from "react";
import { GameState, loadState, saveState, getInitialState } from "@/lib/state";
import { Screen } from "@/lib/state";
import { supabase } from "@/lib/supabase";
import { addXP, updateStreak, updateQuestionStats, completeModule as dbCompleteModule } from "@/lib/auth";
import { getRankFromXP, getRankDisplay, getRankColor, getRankBadgeEmoji } from "@/lib/ranking";
import { User } from "@supabase/supabase-js";
import AuthScreen from "@/components/AuthScreen";
import Sidebar from "@/components/Sidebar";
import CourseSelect from "@/components/CourseSelect";
import LessonScreen from "@/components/LessonScreen";
import QuizScreen from "@/components/QuizScreen";
import ChallengeScreen from "@/components/ChallengeScreen";
import SettingsScreen from "@/components/SettingsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import ArenaScreen from "@/components/ArenaScreen";
import LearnNewScreen from "@/components/LearnNewScreen";
import Ticker from "@/components/Ticker";

export default function Home() {
  const [state, setState] = useState<GameState>(() => {
    if (typeof window !== "undefined") {
      return loadState();
    }
    return getInitialState();
  });
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setAuthChecked(true);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user && state.currentScreen === "start") {
        setState(prev => ({ ...prev, currentScreen: "course-select" }));
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setState((prev) => {
      const newState = { ...prev, ...updates };

      if (user && updates.score && updates.score > prev.score) {
        const xpGained = updates.score - prev.score;
        addXP(user.id, xpGained, prev.currentCourseId || undefined);
      }
      if (user && updates.streak !== undefined) {
        updateStreak(user.id, updates.streak);
      }
      if (user && updates.totalQuestionsAnswered && updates.totalQuestionsAnswered > prev.totalQuestionsAnswered) {
        const correct = (updates.totalCorrect || prev.totalCorrect) > prev.totalCorrect;
        updateQuestionStats(user.id, correct);
      }
      if (user && updates.completedModules && updates.completedModules.length > prev.completedModules.length) {
        const newModules = updates.completedModules.filter(m => !prev.completedModules.includes(m));
        for (const moduleId of newModules) {
          dbCompleteModule(user.id, moduleId, prev.currentCourseId || "");
        }
      }

      return newState;
    });
  }, [user]);

  const resetProgress = useCallback(() => {
    const fresh = getInitialState();
    fresh.aiApiKey = state.aiApiKey;
    fresh.aiProvider = state.aiProvider;
    fresh.currentScreen = "course-select";
    setState(fresh);
  }, [state.aiApiKey, state.aiProvider]);

  const handleSignOut = () => {
    setUser(null);
    setState(prev => ({ ...prev, currentScreen: "start" }));
  };

  if (!mounted || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-accent-blue text-sm pulse-soft">Loading...</p>
      </div>
    );
  }

  // Auth screen (no sidebar)
  if (!user && state.currentScreen === "start") {
    return (
      <main className="min-h-screen">
        <AuthScreen onSkip={() => navigate("course-select")} />
      </main>
    );
  }

  // Settings screen (full screen, no sidebar)
  if (state.currentScreen === "settings") {
    return (
      <main className="min-h-screen flex flex-col relative">
        <SettingsScreen
          state={state}
          updateState={updateState}
          navigate={navigate}
          resetProgress={resetProgress}
        />
      </main>
    );
  }

  const rank = getRankFromXP(state.score);

  return (
    <main className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        currentScreen={state.currentScreen}
        navigate={navigate}
        user={user}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar: rank + XP + settings */}
        <header className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-bg-secondary/30 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: getRankColor(rank.tier) }}>
                {getRankBadgeEmoji(rank.tier)} {getRankDisplay(rank)}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs text-text-muted">
              <span>XP: <strong className="text-accent-yellow">{state.score.toLocaleString()}</strong></span>
              <span>Streak: <strong className="text-accent-cyan">{state.streak}</strong></span>
            </div>
          </div>

          <button
            onClick={() => navigate("settings")}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-elevated transition-colors cursor-pointer text-text-muted hover:text-text-primary"
            title="Settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {state.currentScreen === "start" && (
            <CourseSelect state={state} updateState={updateState} navigate={navigate} />
          )}

          {state.currentScreen === "course-select" && (
            <CourseSelect state={state} updateState={updateState} navigate={navigate} />
          )}

          {state.currentScreen === "lesson" && (
            <LessonScreen state={state} navigate={navigate} />
          )}

          {state.currentScreen === "quiz" && (
            <QuizScreen state={state} updateState={updateState} navigate={navigate} />
          )}

          {state.currentScreen === "challenge" && (
            <ChallengeScreen state={state} updateState={updateState} navigate={navigate} />
          )}

          {state.currentScreen === "profile" && (
            <ProfileScreen state={state} navigate={navigate} userId={user?.id || null} onSignOut={handleSignOut} />
          )}

          {state.currentScreen === "leaderboard" && (
            <LeaderboardScreen state={state} navigate={navigate} userId={user?.id || null} />
          )}

          {state.currentScreen === "arena" && (
            <ArenaScreen state={state} updateState={updateState} navigate={navigate} />
          )}

          {state.currentScreen === "learn-new" && (
            <LearnNewScreen state={state} updateState={updateState} navigate={navigate} userId={user?.id || null} />
          )}
        </div>

        {/* Bottom ticker */}
        <Ticker state={state} />
      </div>
    </main>
  );
}
