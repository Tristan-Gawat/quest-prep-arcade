"use client";

import { useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { cybersecModules, SpecModule } from "@/data/uphsl-cybersec";
import { courses } from "@/data/courses";

interface SpecModulesScreenProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

// Map spec IDs to their module lists
const SPEC_DATA: Record<string, { title: string; icon: string; modules: SpecModule[] }> = {
  "uphsl-cybersec": { title: "Cybersecurity & Forensics", icon: "🛡️", modules: cybersecModules },
  "uphsl-gamedev": { title: "Game Development", icon: "🎮", modules: [] },
  "uphsl-compsci": { title: "Computer Science (Data Science)", icon: "🧬", modules: [] },
  "uphsl-multimedia": { title: "Entertainment & Multimedia", icon: "🎬", modules: [] },
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  fundamentals: { label: "Fundamentals", color: "#7dd3a0" },
  offense: { label: "Ethical Hacking", color: "#ff6b6b" },
  defense: { label: "Defense", color: "#6ea8fe" },
  forensics: { label: "Forensics", color: "#b387ff" },
};

export default function SpecModulesScreen({ state, updateState, navigate }: SpecModulesScreenProps) {
  const [selectedModule, setSelectedModule] = useState<SpecModule | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const specId = state.currentSpecId;
  const spec = specId ? SPEC_DATA[specId] : null;

  if (!spec) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card p-8 text-center">
          <p className="text-text-muted">Specialization not found</p>
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm mt-4">← Back</button>
        </div>
      </div>
    );
  }

  // Show language picker if module is selected
  if (selectedModule) {
    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer"
          >
            ← Back to modules
          </button>

          <div className="card p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: CATEGORY_LABELS[selectedModule.category]?.color,
                  background: CATEGORY_LABELS[selectedModule.category]?.color + "15",
                }}
              >
                {CATEGORY_LABELS[selectedModule.category]?.label}
              </span>
              <span className="text-[10px] text-text-muted">{selectedModule.difficulty}</span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">{selectedModule.title}</h2>
            <p className="text-sm text-text-secondary mb-4">{selectedModule.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedModule.concepts.map((c) => (
                <span key={c} className="text-[10px] bg-bg-elevated text-text-muted px-2 py-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-sm font-medium text-text-primary mb-4">
            Choose a language to learn this in:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => {
                  updateState({
                    currentSpecModuleId: selectedModule.id,
                    currentSpecLanguage: course.id,
                    currentScreen: "spec-lesson",
                  });
                }}
                className="card p-4 text-center transition-all hover:translate-y-[-2px] hover:border-accent-blue/50 cursor-pointer group"
              >
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
                  {course.icon}
                </span>
                <span className="text-xs text-text-secondary">{course.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Filter modules
  const filteredModules = filter === "all"
    ? spec.modules
    : spec.modules.filter((m) => m.category === filter);

  const categories = [...new Set(spec.modules.map((m) => m.category))];

  // Module list with hover-reveal quiz panel
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-5xl mx-auto fade-in">
        <button
          onClick={() => navigate("course-select")}
          className="text-xs text-text-muted hover:text-text-primary mb-4 cursor-pointer"
        >
          ← Back to courses
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{spec.icon}</span>
          <h2 className="text-xl md:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
            {spec.title}
          </h2>
        </div>
        <p className="text-sm text-text-secondary mb-6">
          Pick a topic to learn — hover for quiz, click to start lesson
        </p>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
              filter === "all" ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
            }`}
          >
            All ({spec.modules.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                filter === cat ? "bg-accent-blue/10 border-accent-blue text-accent-blue" : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
              }`}
            >
              <span style={{ color: CATEGORY_LABELS[cat]?.color }}>●</span>{" "}
              {CATEGORY_LABELS[cat]?.label} ({spec.modules.filter((m) => m.category === cat).length})
            </button>
          ))}
        </div>

        {/* Module list with hover quiz panel */}
        {spec.modules.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-muted text-sm">Modules coming soon! Check back later.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredModules.map((mod) => (
              <div key={mod.id} className="relative group">
                <button
                  onClick={() => setSelectedModule(mod)}
                  className="w-full card p-4 text-left transition-all hover:border-accent-blue/30 cursor-pointer flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          color: CATEGORY_LABELS[mod.category]?.color,
                          background: CATEGORY_LABELS[mod.category]?.color + "15",
                        }}
                      >
                        {CATEGORY_LABELS[mod.category]?.label}
                      </span>
                      <span className="text-[10px] text-text-muted">{mod.difficulty}</span>
                    </div>
                    <h3 className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{mod.description}</p>
                  </div>
                  <span className="text-text-muted group-hover:text-accent-blue transition-colors text-lg">→</span>
                </button>

                {/* Quiz panel - appears on hover to the right */}
                <div className="hidden group-hover:block absolute left-full top-0 ml-3 w-72 z-50">
                  <div className="card p-4 border-accent-purple/30 shadow-lg shadow-black/20">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-accent-purple">📝 Quick Quiz</span>
                      <span className="text-[9px] text-text-muted">— {mod.title}</span>
                    </div>
                    <div className="space-y-2">
                      {mod.concepts.slice(0, 3).map((concept, i) => (
                        <div key={i} className="p-2 rounded bg-bg-elevated text-[10px] text-text-secondary">
                          <span className="text-text-muted mr-1">Q{i + 1}:</span> What is {concept}?
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-text-muted mt-3 text-center">
                      Click module to start lesson & unlock full quiz
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
