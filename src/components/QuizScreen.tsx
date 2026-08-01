"use client";

import { useState, useEffect } from "react";
import { GameState, Screen, promoteRank, demoteRank } from "@/lib/state";
import { courses } from "@/data/courses";
import { QuizQuestion } from "@/data/curriculum";
import { generateDynamicQuestion } from "@/lib/ai";

interface QuizScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

export default function QuizScreen({
  state,
  updateState,
  navigate,
}: QuizScreenProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [containerFlash, setContainerFlash] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const course = courses.find((c) => c.id === state.currentCourseId);
  const currentModule = course?.modules[state.currentModuleIndex];

  useEffect(() => {
    async function loadQuestions() {
      if (!currentModule || !course) return;
      const qs = [...currentModule.quiz];

      // If AI key available, try to generate an extra question
      if (state.aiApiKey) {
        const aiQ = await generateDynamicQuestion(
          course.name,
          state.tier,
          state.aiApiKey,
          state.aiProvider
        );
        if (aiQ) {
          qs.push(aiQ);
        }
      }
      setQuestions(qs);
      setLoading(false);
    }
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!course || !currentModule) return null;
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-arcade-yellow text-xs blink">
          LOADING QUESTIONS...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];
  if (!currentQuestion) {
    // All questions answered - proceed to challenge
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="arcade-card bg-arcade-yellow p-8 text-center max-w-md">
          <p className="text-sm text-black mb-4">QUIZ COMPLETE!</p>
          <p className="text-[9px] text-black/70 mb-6">
            READY FOR THE CODE CHALLENGE?
          </p>
          <button
            onClick={() => navigate("challenge")}
            className="arcade-card bg-arcade-green px-6 py-3 text-[10px] text-black hover:bg-green-300 transition-colors cursor-pointer"
          >
            START CHALLENGE →
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
      const newConsecutive = state.consecutiveCorrect + 1;
      let newTier = state.tier;

      if (newConsecutive >= 2) {
        newTier = promoteRank(state.tier);
        setContainerFlash("flash-cyan");
      } else {
        setContainerFlash("flash-green");
      }

      setFeedback("+100 XP! GOOD GAME!");
      updateState({
        score: state.score + 100,
        streak: state.streak + 1,
        consecutiveCorrect: newConsecutive >= 2 ? 0 : newConsecutive,
        tier: newTier,
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
        totalCorrect: state.totalCorrect + 1,
      });
    } else {
      setContainerFlash("flash-red");
      setFeedback("WRONG! KEEP PUSHING!");
      updateState({
        streak: 0,
        consecutiveCorrect: 0,
        tier: demoteRank(state.tier),
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
      });
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setFeedback("");
    setContainerFlash("");
    setCurrentQIndex((prev) => prev + 1);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div
          className={`arcade-card bg-arcade-yellow p-6 md:p-8 relative ${containerFlash}`}
          onAnimationEnd={() => setContainerFlash("")}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="arcade-card bg-arcade-card text-arcade-green text-[8px] px-3 py-1">
              {state.tier}
            </span>
            <span className="text-[8px] text-black">
              Q: {currentQIndex + 1}/{questions.length}
            </span>
          </div>

          {/* Question */}
          <p className="text-[10px] md:text-xs text-black leading-relaxed mb-8">
            {currentQuestion.question}
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, i) => {
              let btnClass =
                "w-full arcade-card bg-white p-3 md:p-4 text-[9px] md:text-[10px] text-black text-left transition-colors cursor-pointer hover:bg-gray-100";

              if (showResult) {
                if (i === currentQuestion.correct) {
                  btnClass =
                    "w-full arcade-card bg-arcade-green p-3 md:p-4 text-[9px] md:text-[10px] text-black text-left";
                } else if (i === selected && i !== currentQuestion.correct) {
                  btnClass =
                    "w-full arcade-card bg-arcade-red p-3 md:p-4 text-[9px] md:text-[10px] text-white text-left";
                } else {
                  btnClass =
                    "w-full arcade-card bg-gray-200 p-3 md:p-4 text-[9px] md:text-[10px] text-gray-500 text-left";
                }
              }

              const labels = ["A", "B", "C", "D"];
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={btnClass}
                  disabled={showResult}
                >
                  {labels[i]}) {choice}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <div className="mt-6">
              <p
                className={`text-[10px] font-bold mb-2 ${
                  selected === currentQuestion.correct
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {feedback}
              </p>
              {currentQuestion.explanation && (
                <p className="text-[8px] text-black/70 mb-4">
                  💡 {currentQuestion.explanation}
                </p>
              )}
              <button
                onClick={handleNext}
                className="arcade-card bg-arcade-cyan px-5 py-3 text-[9px] text-black hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                {currentQIndex + 1 < questions.length
                  ? "NEXT QUESTION →"
                  : "FINISH QUIZ →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
