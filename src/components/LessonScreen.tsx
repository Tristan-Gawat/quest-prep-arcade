"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { generateExplanation } from "@/lib/ai";

interface LessonScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
}

export default function LessonScreen({ state, navigate }: LessonScreenProps) {
  const [aiExplanation, setAiExplanation] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  const course = courses.find((c) => c.id === state.currentCourseId);
  if (!course) return null;

  const dynamicModules = state.generatedModules[course.id] || [];
  const allModules = [...course.modules, ...dynamicModules];
  const currentModule = allModules[state.currentModuleIndex];
  if (!currentModule) return null;

  const { lesson } = currentModule;

  const handleAskAI = async () => {
    if (!state.aiApiKey) return;
    setAiLoading(true);
    const explanation = await generateExplanation(
      course.name,
      lesson.concept,
      state.aiApiKey,
      state.aiProvider
    );
    setAiExplanation(explanation);
    setAiLoading(false);
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Module header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="arcade-card bg-arcade-card text-arcade-green text-[8px] px-3 py-1">
            {currentModule.tier}
          </span>
          <span className="text-[8px] text-gray-400">
            MODULE {state.currentModuleIndex + 1}/{allModules.length}
          </span>
        </div>

        {/* Lesson Title */}
        <h2 className="text-sm md:text-lg text-arcade-yellow mb-6">
          📖 {lesson.title}
        </h2>

        {/* Concept Card */}
        <div className="arcade-card bg-arcade-yellow p-5 md:p-6 mb-6">
          <p className="text-[9px] md:text-[10px] text-black font-bold mb-3">
            💡 KEY CONCEPT
          </p>
          <p className="text-[9px] md:text-[10px] text-black leading-relaxed">
            {lesson.concept}
          </p>
        </div>

        {/* Explanation */}
        <div className="arcade-card bg-arcade-card p-5 md:p-6 mb-6">
          <p className="text-[9px] md:text-[10px] text-arcade-cyan mb-3">
            📝 EXPLANATION
          </p>
          <p className="text-[9px] md:text-[10px] text-gray-200 leading-relaxed whitespace-pre-wrap">
            {lesson.explanation}
          </p>
        </div>

        {/* Code Example */}
        <div className="arcade-card bg-[#0d1117] p-5 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[9px] text-arcade-green">
              💻 CODE EXAMPLE ({lesson.language.toUpperCase()})
            </p>
          </div>
          <pre className="text-[9px] md:text-[10px] text-arcade-green leading-relaxed overflow-x-auto font-mono">
            {lesson.codeExample}
          </pre>
        </div>

        {/* AI Explanation (optional) */}
        {state.aiApiKey && (
          <div className="mb-6">
            {!aiExplanation ? (
              <button
                onClick={handleAskAI}
                disabled={aiLoading}
                className="arcade-card bg-arcade-purple px-4 py-3 text-[9px] text-white hover:bg-purple-400 transition-colors cursor-pointer disabled:opacity-50 w-full"
              >
                {aiLoading
                  ? "🤖 AI IS THINKING..."
                  : "🤖 ASK AI FOR MORE EXPLANATION"}
              </button>
            ) : (
              <div className="arcade-card bg-arcade-purple/20 border-arcade-purple p-5">
                <p className="text-[9px] text-arcade-purple mb-3">
                  🤖 AI TUTOR SAYS:
                </p>
                <p className="text-[9px] text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {aiExplanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("quiz")}
            className="arcade-card bg-arcade-cyan px-6 py-4 text-[10px] md:text-xs text-black hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            TAKE THE QUIZ →
          </button>
        </div>
      </div>
    </div>
  );
}
