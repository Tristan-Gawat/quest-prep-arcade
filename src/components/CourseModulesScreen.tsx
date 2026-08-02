"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { Module } from "@/data/curriculum";
import { askBuiltinAI } from "@/lib/ai-builtin";
import CodeBlock from "@/components/CodeBlock";

interface CourseModulesScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

const TIER_COLORS: Record<string, string> = {
  EASY: "#7dd3a0",
  MEDIUM: "#ffd56b",
  HARD: "#ff6b6b",
  EXPERT: "#b387ff",
};

export default function CourseModulesScreen({ state, updateState, navigate }: CourseModulesScreenProps) {
  const [filter, setFilter] = useState<string>("all");

  const course = courses.find((c) => c.id === state.currentCourseId);
  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card p-8 text-center">
          <p className="text-text-muted">Course not found</p>
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm mt-4">← Back</button>
        </div>
      </div>
    );
  }

  const dynamicModules = state.generatedModules[course.id] || [];
  const allModules = [...course.modules, ...dynamicModules];

  const filteredModules = filter === "all" ? allModules : allModules.filter((m) => m.tier === filter);
  const tiers = [...new Set(allModules.map((m) => m.tier))];

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentSubLesson, setCurrentSubLesson] = useState<number>(-1);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [lesson, setLesson] = useState<{ explanation: string; code: string; breakdown?: string; together?: string } | null>(null);

  const handleSelectModule = (mod: Module, index: number) => {
    setSelectedModule(mod);
    setSelectedIndex(index);
    setCurrentSubLesson(-1);
    setLesson(null);
  };

  const loadSubLesson = (index: number) => {
    if (!selectedModule || !course) return;
    setCurrentSubLesson(index);
    setAiAnswer("");
    setAiQuestion("");
    
    // Use the pre-built static lesson content from the data file
    const codeLang = course.id === "htmlcss" ? "html" : course.id === "csharp" ? "csharp" : course.id;
    setLesson({
      explanation: selectedModule.lesson.explanation,
      code: selectedModule.lesson.codeExample,
      breakdown: "",
      together: "",
    });
  };

  const askAboutLesson = async () => {
    if (!aiQuestion.trim() || !selectedModule) return;
    setAiLoading(true);
    const result = await askBuiltinAI(
      `A student is learning "${selectedModule.title}" in ${course?.name}. They're looking at this code:\n\n${selectedModule.lesson.codeExample}\n\nTheir question: "${aiQuestion}"\n\nAnswer clearly and briefly (2-3 paragraphs max). Reference specific lines if relevant.`,
      500
    );
    setAiAnswer(result.success ? result.content : "AI unavailable — try again.");
    setAiLoading(false);
  };

  const completed = allModules.filter((m) => state.completedModules.includes(m.id)).length;
  const total = allModules.length;
  const progress = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

  // If a module is selected and a sub-lesson is being viewed
  if (selectedModule && currentSubLesson >= 0) {
    const subLessons = selectedModule.subLessons || [selectedModule.lesson.title];
    const codeLang = course.id === "htmlcss" ? "html" : course.id === "csharp" ? "csharp" : course.id;

    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto slide-up">
          <button onClick={() => { setCurrentSubLesson(-1); setLesson(null); }} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
            ← Back to sub-lessons
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">{course.icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">{subLessons[currentSubLesson]}</h2>
              <p className="text-xs text-text-muted">{selectedModule.title} • {course.name}</p>
            </div>
          </div>

          {!lesson ? (
            <div className="card p-8 text-center">
              <p className="text-accent-blue text-sm pulse-soft">AI is generating your lesson...</p>
              <p className="text-xs text-text-muted mt-2">Teaching: {subLessons[currentSubLesson]} in {course.name}</p>
            </div>
          ) : (
            <>
              <div className="card p-5 md:p-6 mb-6">
                <p className="text-xs font-medium text-accent-cyan mb-3">Overview</p>
                <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{lesson.explanation}</div>
              </div>

              {lesson.code && (
                <div className="mb-6">
                  <CodeBlock code={lesson.code} language={codeLang} label={`${subLessons[currentSubLesson]} — ${course.name}`} />
                </div>
              )}

              {lesson.breakdown && (
                <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-purple">
                  <p className="text-xs font-medium text-accent-purple mb-3">Code Breakdown — Line by Line</p>
                  <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{lesson.breakdown}</div>
                </div>
              )}

              {lesson.together && (
                <div className="card p-5 md:p-6 mb-6 border-l-4 border-l-accent-green">
                  <p className="text-xs font-medium text-accent-green mb-3">How It All Works Together</p>
                  <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{lesson.together}</div>
                </div>
              )}

              {/* Ask AI about this lesson */}
              <div className="card p-4 mb-6">
                <p className="text-xs font-medium text-accent-purple mb-2">🤖 Ask AI about this lesson</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askAboutLesson()}
                    placeholder="e.g., What does line 3 do? Why use this function?"
                    className="flex-1 bg-bg-input border border-border rounded-lg text-xs text-text-primary p-2.5 outline-none focus:border-border-focus"
                  />
                  <button
                    onClick={askAboutLesson}
                    disabled={!aiQuestion.trim() || aiLoading}
                    className="btn-primary text-xs px-3 shrink-0"
                  >
                    {aiLoading ? "..." : "Ask"}
                  </button>
                </div>
                {aiAnswer && (
                  <div className="mt-3 p-3 bg-bg-elevated rounded-lg">
                    <p className="text-xs text-text-secondary whitespace-pre-wrap">{aiAnswer}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {currentSubLesson > 0 && (
                  <button onClick={() => loadSubLesson(currentSubLesson - 1)} className="btn-secondary text-sm">← Previous</button>
                )}
                {currentSubLesson < subLessons.length - 1 && (
                  <button onClick={() => loadSubLesson(currentSubLesson + 1)} className="btn-primary text-sm">Next Lesson →</button>
                )}
                {currentSubLesson === subLessons.length - 1 && (
                  <button onClick={() => { updateState({ score: state.score + 50, completedModules: [...state.completedModules, selectedModule.id] }); setSelectedModule(null); setCurrentSubLesson(-1); }} className="btn-success text-sm">
                    ✓ Complete Module (+50 XP)
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // If a module is selected, show its sub-lessons
  if (selectedModule) {
    const subLessons = selectedModule.subLessons || [selectedModule.lesson.title];
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button onClick={() => setSelectedModule(null)} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
            ← Back to modules
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{course.icon}</span>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-text-primary">{selectedModule.title}</h2>
              <p className="text-xs text-text-muted">{selectedModule.tier} • {course.name}</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-6">{selectedModule.lesson.concept}</p>

          {/* Sub-lesson list */}
          <div className="space-y-2 mb-6">
            {subLessons.map((sub, i) => (
              <button
                key={i}
                onClick={() => loadSubLesson(i)}
                className="w-full card p-4 text-left flex items-center gap-4 hover:border-accent-blue/40 transition-all cursor-pointer group"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-elevated text-xs text-text-muted group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-colors">
                  {i + 1}
                </span>
                <span className="text-sm text-text-primary group-hover:text-accent-blue transition-colors">
                  {sub}
                </span>
                <span className="ml-auto text-text-muted group-hover:text-accent-blue text-sm">→</span>
              </button>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex gap-3">
            <button
              onClick={() => updateState({ currentModuleIndex: selectedIndex, currentScreen: "quiz" })}
              className="btn-secondary text-sm"
            >
              📝 Take Quiz
            </button>
            <button
              onClick={() => updateState({ currentModuleIndex: selectedIndex, currentScreen: "challenge" })}
              className="btn-secondary text-sm"
            >
              🖥️ Code Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-6xl mx-auto fade-in">
        <button onClick={() => navigate("course-select")} className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-accent-blue/80 mb-4 cursor-pointer bg-bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-bg-elevated transition-all">
          ← Back to courses
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{course.icon}</span>
          <h2 className="text-xl md:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
            {course.name}
          </h2>
        </div>
        <p className="text-sm text-text-secondary mb-2">{course.description}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-2 bg-bg-elevated rounded-full overflow-hidden max-w-xs">
            <div className="h-full bg-accent-green rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-text-muted">{completed}/{total} completed</span>
        </div>

        {/* Tier filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setFilter("all")} className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${filter === "all" ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : "bg-bg-card border-border text-text-secondary hover:border-border-focus"}`}>
            All ({allModules.length})
          </button>
          {tiers.map((tier) => (
            <button key={tier} onClick={() => setFilter(tier)} className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${filter === tier ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : "bg-bg-card border-border text-text-secondary hover:border-border-focus"}`}>
              <span style={{ color: TIER_COLORS[tier] }}>●</span> {tier} ({allModules.filter(m => m.tier === tier).length})
            </button>
          ))}
        </div>

        {/* Module grid — same design as SpecModulesScreen */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredModules.map((mod) => {
            const realIndex = allModules.findIndex((m) => m.id === mod.id);
            const isCompleted = state.completedModules.includes(mod.id);

            return (
              <button
                key={mod.id}
                onClick={() => handleSelectModule(mod, realIndex)}
                className={`card p-4 text-left transition-all hover:translate-y-[-2px] hover:border-accent-blue/40 cursor-pointer group ${isCompleted ? "border-accent-green/40" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ color: TIER_COLORS[mod.tier], background: TIER_COLORS[mod.tier] + "15" }}>
                    {mod.tier}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] text-accent-green">✓</span>
                  )}
                </div>
                <h3 className="text-xs font-medium text-text-primary mt-1 mb-1 group-hover:text-accent-blue transition-colors line-clamp-2">
                  {mod.title}
                </h3>
                <p className="text-[9px] text-text-muted line-clamp-2">{mod.lesson.concept}</p>
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("learn-new")}
            className="btn-primary text-sm"
          >
            🧠 Generate New Module
          </button>
          <button
            onClick={() => navigate("arena")}
            className="btn-secondary text-sm"
          >
            ⚔️ Code Arena
          </button>
        </div>
      </div>
    </div>
  );
}
