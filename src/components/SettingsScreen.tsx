"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { signOut } from "@/lib/auth";

interface SettingsScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
  resetProgress: () => void;
}

export default function SettingsScreen({
  state,
  updateState,
  navigate,
  resetProgress,
}: SettingsScreenProps) {
  const [apiKey, setApiKey] = useState(state.aiApiKey || "");
  const [provider, setProvider] = useState(state.aiProvider);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = () => {
    updateState({
      aiApiKey: apiKey.trim() || null,
      aiProvider: provider,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirmReset) {
      signOut();
      resetProgress();
      setConfirmReset(false);
      navigate("start");
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  };

  const handleChangeAccount = async () => {
    await signOut();
    // Sign in again with Google (will show account picker)
    const { signInWithGoogle } = await import("@/lib/auth");
    await signInWithGoogle();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl fade-in">
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary text-center mb-8">
          Settings
        </h2>

        {/* AI Configuration */}
        <div className="card p-6 mb-6">
          <h3 className="text-sm font-medium text-accent-purple mb-2">
            🤖 AI Tutor Configuration
          </h3>
          <p className="text-xs text-text-muted mb-5">
            Add your API key to unlock AI-powered explanations, dynamic
            questions, and smart hints. Your key is stored locally and never
            sent to our servers.
          </p>

          {/* Provider Selection */}
          <div className="mb-5">
            <label className="text-xs text-text-secondary block mb-2">
              Provider
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setProvider("openai")}
                className={`px-4 py-2 text-sm rounded-lg border cursor-pointer transition-all ${
                  provider === "openai"
                    ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                    : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
                }`}
              >
                OpenAI
              </button>
              <button
                onClick={() => setProvider("anthropic")}
                className={`px-4 py-2 text-sm rounded-lg border cursor-pointer transition-all ${
                  provider === "anthropic"
                    ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                    : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
                }`}
              >
                Anthropic
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div className="mb-5">
            <label className="text-xs text-text-secondary block mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-... or sk-ant-..."
              className="w-full bg-bg-input border border-border rounded-lg text-sm text-text-primary p-3 outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-all"
            />
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={handleSave}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Save Configuration
            </button>
            {saved && (
              <span className="text-xs text-accent-green font-medium">
                ✓ Saved!
              </span>
            )}
          </div>

          {state.aiApiKey && (
            <p className="text-xs text-accent-green mt-3">
              ✓ AI Tutor Active ({state.aiProvider.toUpperCase()})
            </p>
          )}
        </div>

        {/* Stats Overview */}
        <div className="card p-6 mb-6">
          <h3 className="text-sm font-medium text-accent-cyan mb-4">
            📊 Your Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-xs text-text-secondary">Total Score</span>
              <span className="text-sm font-medium text-accent-yellow">{state.score}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-xs text-text-secondary">Current Rank</span>
              <span className="text-sm font-medium text-accent-purple">{state.tier}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-xs text-text-secondary">Questions</span>
              <span className="text-sm font-medium text-accent-cyan">
                {state.totalQuestionsAnswered}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-xs text-text-secondary">Accuracy</span>
              <span className="text-sm font-medium text-accent-green">
                {state.totalQuestionsAnswered > 0
                  ? Math.round(
                      (state.totalCorrect / state.totalQuestionsAnswered) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-xs text-text-secondary">Modules Done</span>
              <span className="text-sm font-medium text-accent-yellow">
                {state.completedModules.length}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-xs text-text-secondary">Best Streak</span>
              <span className="text-sm font-medium text-accent-cyan">{state.streak}</span>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="card p-6 mb-6 border-accent-red/30">
          <h3 className="text-sm font-medium text-accent-red mb-4">
            Account
          </h3>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-sm rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red hover:bg-accent-red/20 transition-all cursor-pointer"
            >
              {confirmReset ? "Are you sure?" : "Log Out"}
            </button>
            <button
              onClick={handleChangeAccount}
              className="px-5 py-2.5 text-sm rounded-lg bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 transition-all cursor-pointer"
            >
              Change Account
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("course-select")}
            className="btn-secondary text-sm"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
