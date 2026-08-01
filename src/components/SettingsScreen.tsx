"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";

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
      resetProgress();
      setConfirmReset(false);
      navigate("start");
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-sm md:text-lg text-arcade-yellow text-center mb-8">
          ⚙ SETTINGS
        </h2>

        {/* AI Configuration */}
        <div className="arcade-card bg-arcade-card p-6 mb-6">
          <h3 className="text-[10px] text-arcade-purple mb-4">
            🤖 AI TUTOR CONFIGURATION
          </h3>
          <p className="text-[8px] text-gray-400 mb-4">
            Add your API key to unlock AI-powered explanations, dynamic
            questions, and smart hints. Your key is stored locally and never
            sent to our servers.
          </p>

          {/* Provider Selection */}
          <div className="mb-4">
            <label className="text-[8px] text-gray-300 block mb-2">
              PROVIDER:
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setProvider("openai")}
                className={`arcade-card px-4 py-2 text-[8px] cursor-pointer transition-colors ${
                  provider === "openai"
                    ? "bg-arcade-green text-black"
                    : "bg-arcade-card text-gray-400 hover:bg-gray-600"
                }`}
              >
                OPENAI
              </button>
              <button
                onClick={() => setProvider("anthropic")}
                className={`arcade-card px-4 py-2 text-[8px] cursor-pointer transition-colors ${
                  provider === "anthropic"
                    ? "bg-arcade-green text-black"
                    : "bg-arcade-card text-gray-400 hover:bg-gray-600"
                }`}
              >
                ANTHROPIC
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div className="mb-4">
            <label className="text-[8px] text-gray-300 block mb-2">
              API KEY:
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-... or sk-ant-..."
              className="w-full bg-black border-4 border-black text-arcade-green text-[9px] p-3 outline-none focus:border-arcade-purple"
            />
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={handleSave}
              className="arcade-card bg-arcade-green px-5 py-3 text-[9px] text-black hover:bg-green-300 transition-colors cursor-pointer"
            >
              SAVE CONFIG
            </button>
            {saved && (
              <span className="text-[8px] text-arcade-green">
                ✓ SAVED!
              </span>
            )}
          </div>

          {state.aiApiKey && (
            <p className="text-[7px] text-arcade-green mt-3">
              ✓ AI TUTOR ACTIVE ({state.aiProvider.toUpperCase()})
            </p>
          )}
        </div>

        {/* Stats Overview */}
        <div className="arcade-card bg-arcade-card p-6 mb-6">
          <h3 className="text-[10px] text-arcade-cyan mb-4">
            📊 YOUR STATS
          </h3>
          <div className="grid grid-cols-2 gap-4 text-[8px]">
            <div>
              <span className="text-gray-400">TOTAL SCORE:</span>
              <span className="text-arcade-yellow ml-2">{state.score}</span>
            </div>
            <div>
              <span className="text-gray-400">CURRENT RANK:</span>
              <span className="text-arcade-purple ml-2">{state.tier}</span>
            </div>
            <div>
              <span className="text-gray-400">QUESTIONS:</span>
              <span className="text-arcade-cyan ml-2">
                {state.totalQuestionsAnswered}
              </span>
            </div>
            <div>
              <span className="text-gray-400">ACCURACY:</span>
              <span className="text-arcade-green ml-2">
                {state.totalQuestionsAnswered > 0
                  ? Math.round(
                      (state.totalCorrect / state.totalQuestionsAnswered) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div>
              <span className="text-gray-400">MODULES DONE:</span>
              <span className="text-arcade-yellow ml-2">
                {state.completedModules.length}
              </span>
            </div>
            <div>
              <span className="text-gray-400">BEST STREAK:</span>
              <span className="text-arcade-cyan ml-2">{state.streak}</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="arcade-card bg-arcade-red/20 p-6 mb-6">
          <h3 className="text-[10px] text-arcade-red mb-4">
            ⚠ DANGER ZONE
          </h3>
          <button
            onClick={handleReset}
            className="arcade-card bg-arcade-red px-5 py-3 text-[9px] text-white hover:bg-red-400 transition-colors cursor-pointer"
          >
            {confirmReset ? "CONFIRM RESET?" : "RESET ALL PROGRESS"}
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("course-select")}
            className="arcade-card bg-arcade-yellow px-6 py-3 text-[9px] text-black hover:bg-yellow-300 transition-colors cursor-pointer"
          >
            ← BACK TO COURSES
          </button>
        </div>
      </div>
    </div>
  );
}
