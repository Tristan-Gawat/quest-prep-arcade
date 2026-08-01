"use client";

import { useState, useEffect } from "react";
import { GameState, Screen, promoteRank, demoteRank } from "@/lib/state";
import { courses } from "@/data/courses";
import { QuizQuestion } from "@/data/curriculum";
import { generateDynamicQuestion } from "@/lib/ai";
import { getQuizXP, formatXPGain } from "@/lib/xp";

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
  const dynamicModules = state.generatedModules[course?.id || ""] || [];
  const allModules = course ? [...course.modules, ...dynamicModules] : [];
  const currentModule = allModules[state.currentModuleIndex];

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
        <p className="text-accent-blue text-sm pulse-soft">
          Loading questions...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];
  if (!currentQuestion) {
    // All questions answered - proceed to challenge
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card p-8 text-center max-w-md fade-in">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-lg font-semibold text-text-primary mb-2">Quiz Complete!</p>
          <p className="text-sm text-text-secondary mb-6">
            Ready for the code challenge?
          </p>
          <button
            onClick={() => navigate("challenge")}
            className="btn-success text-sm px-8 py-3"
          >
            Start Challenge →
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
        setContainerFlash("flash-correct");
      } else {
        setContainerFlash("flash-correct");
      }

      // Calculate XP based on module difficulty tier
      const moduleTier = currentModule?.tier || "EASY";
      const xpReward = getQuizXP(moduleTier, state.streak);

      setFeedback(formatXPGain(xpReward.total, xpReward.bonus));
      updateState({
        score: state.score + xpReward.total,
        streak: state.streak + 1,
        consecutiveCorrect: newConsecutive >= 2 ? 0 : newConsecutive,
        tier: newTier,
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
        totalCorrect: state.totalCorrect + 1,
      });
    } else {
      setContainerFlash("flash-wrong");
      setFeedback("Not quite — keep pushing!");
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
          className={`card p-6 md:p-8 relative ${containerFlash}`}
          onAnimationEnd={() => setContainerFlash("")}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="bg-bg-elevated text-accent-green text-xs font-medium px-3 py-1 rounded-full border border-border">
              {state.tier}
            </span>
            <span className="text-xs text-text-muted">
              Question {currentQIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question */}
          <p className="text-sm md:text-base text-text-primary leading-relaxed mb-8 font-medium">
            {currentQuestion.question}
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, i) => {
              let btnClass =
                "w-full p-4 text-sm text-text-primary text-left rounded-lg border transition-all cursor-pointer ";

              if (showResult) {
                if (i === currentQuestion.correct) {
                  btnClass +=
                    "bg-accent-green/10 border-accent-green text-accent-green";
                } else if (i === selected && i !== currentQuestion.correct) {
                  btnClass +=
                    "bg-accent-red/10 border-accent-red text-accent-red";
                } else {
                  btnClass +=
                    "bg-bg-card border-border text-text-muted opacity-60";
                }
              } else {
                btnClass +=
                  "bg-bg-card border-border hover:border-border-focus hover:bg-bg-elevated";
              }

              const labels = ["A", "B", "C", "D"];
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={btnClass}
                  disabled={showResult}
                >
                  <span className="text-text-muted mr-3">{labels[i]}.</span>
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <div className="mt-6 fade-in">
              <p
                className={`text-sm font-medium mb-2 ${
                  selected === currentQuestion.correct
                    ? "text-accent-green"
                    : "text-accent-red"
                }`}
              >
                {feedback}
              </p>
              {currentQuestion.explanation && (
                <p className="text-xs text-text-secondary mb-4">
                  💡 {currentQuestion.explanation}
                </p>
              )}
              <button
                onClick={handleNext}
                className="btn-primary text-sm px-6 py-2.5"
              >
                {currentQIndex + 1 < questions.length
                  ? "Next Question →"
                  : "Finish Quiz →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
