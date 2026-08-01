"use client";

import { useState, useEffect, useCallback } from "react";
import { GameState, loadState, saveState, getInitialState } from "@/lib/state";
import { Screen } from "@/lib/state";
import { supabase } from "@/lib/supabase";
import { addXP, updateStreak, updateQuestionStats, completeModule as dbCompleteModule } from "@/lib/auth";
import { User } from "@supabase/supabase-js";
import AuthScreen from "@/components/AuthScreen";
import ArenaScreen from "@/components/ArenaScreen";
import StartScreen from "@/components/StartScreen";
import CourseSelect from "@/components/CourseSelect";
import LessonScreen from "@/components/LessonScreen";
import QuizScreen from "@/components/QuizScreen";
import ChallengeScreen from "@/components/ChallengeScreen";
import SettingsScreen from "@/components/SettingsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
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
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check auth state
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

      // Sync XP to Supabase if user is logged in
      if (user && updates.score && updates.score > prev.score) {
        const xpGained = updates.score - prev.score;
        addXP(user.id, xpGained, prev.currentCourseId || undefined);
      }

      // Sync streak
      if (user && updates.streak !== undefined) {
        updateStreak(user.id, updates.streak);
      }

      // Sync question stats
      if (user && updates.totalQuestionsAnswered && updates.totalQuestionsAnswered > prev.totalQuestionsAnswered) {
        const correct = (updates.totalCorrect || prev.totalCorrect) > prev.totalCorrect;
        updateQuestionStats(user.id, correct);
      }

      // Sync module completion
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

  // Show auth screen if not logged in and on start
  if (!user && state.currentScreen === "start") {
    return (
      <main className="min-h-screen flex flex-col">
        <AuthScreen onSkip={() => navigate("course-select")} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {state.currentScreen !== "start" &&
        state.currentScreen !== "settings" &&
        state.currentScreen !== "profile" &&
        state.currentScreen !== "leaderboard" && (
          <StatsBar
            state={state}
            onSettings={() => navigate("settings")}
            onHome={() => navigate("course-select")}
            onProfile={() => navigate("profile")}
            onLeaderboard={() => navigate("leaderboard")}
            user={user}
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
          <LessonScreen state={state} navigate={navigate} />
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

        {state.currentScreen === "profile" && (
          <ProfileScreen
            state={state}
            navigate={navigate}
            userId={user?.id || null}
            onSignOut={handleSignOut}
          />
        )}

        {state.currentScreen === "leaderboard" && (
          <LeaderboardScreen
            state={state}
            navigate={navigate}
            userId={user?.id || null}
          />
        )}

        {state.currentScreen === "arena" && (
          <ArenaScreen
            state={state}
            updateState={updateState}
            navigate={navigate}
          />
        )}
      </div>

      {state.currentScreen !== "start" &&
        state.currentScreen !== "settings" &&
        state.currentScreen !== "profile" &&
        state.currentScreen !== "leaderboard" && (
          <Ticker state={state} />
        )}
    </main>
  );
}
