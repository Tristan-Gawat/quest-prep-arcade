"use client";

import { GameState, Screen } from "@/lib/state";
import { courses } from "@/data/courses";

interface CourseSelectProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  navigate: (screen: Screen) => void;
}

export default function CourseSelect({
  state,
  updateState,
  navigate,
}: CourseSelectProps) {
  const handleSelectCourse = (courseId: string) => {
    updateState({
      currentCourseId: courseId,
      currentModuleIndex: 0,
      currentScreen: "lesson",
    });
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="max-w-6xl mx-auto fade-in">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Your Courses
          </h2>
          <p className="text-sm text-text-secondary">
            Choose a language to master — or let the AI teach you something new
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {courses.map((course) => {
            const dynamicModules = state.generatedModules[course.id] || [];
            const allModules = [...course.modules, ...dynamicModules];
            const completed = allModules.filter((m) =>
              state.completedModules.includes(m.id)
            ).length;
            const total = allModules.length;
            const progress = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

            return (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)}
                className="card p-4 text-left transition-all hover:translate-y-[-2px] hover:border-accent-blue/50 cursor-pointer group"
              >
                <span className="text-2xl md:text-3xl block mb-3 group-hover:scale-110 transition-transform">
                  {course.icon}
                </span>
                <h3 className="text-xs md:text-sm font-semibold text-text-primary mb-0.5">
                  {course.name}
                </h3>
                <p className="text-[10px] text-text-muted mb-3 line-clamp-1">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <p className="text-[10px] text-text-muted">
                    {completed}/{total}
                  </p>
                  {completed >= course.modules.length && completed > 0 && (
                    <p className="text-[10px] text-accent-purple font-medium">
                      ∞
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("learn-new")}
              className="btn-primary text-sm"
            >
              🧠 Learn Something New
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
    </div>
  );
}
