"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";
import { Module } from "@/data/curriculum";

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

  const handleSelectModule = (mod: Module, index: number) => {
    updateState({
      currentModuleIndex: index,
      currentScreen: "lesson",
    });
  };

  const completed = allModules.filter((m) => state.completedModules.includes(m.id)).length;
  const total = allModules.length;
  const progress = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-6xl mx-auto fade-in">
        <button onClick={() => navigate("course-select")} className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer">
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
