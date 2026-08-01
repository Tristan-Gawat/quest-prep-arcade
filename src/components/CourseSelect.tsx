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
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl fade-in">
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary text-center mb-2">
          Select Your Course
        </h2>
        <p className="text-sm text-text-secondary text-center mb-10">
          Choose a language to master
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
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
                className="card p-5 md:p-6 text-left transition-all hover:translate-y-[-2px] hover:shadow-lg cursor-pointer"
              >
                <span className="text-3xl md:text-4xl block mb-4">
                  {course.icon}
                </span>
                <h3 className="text-sm md:text-base font-medium text-text-primary mb-1">
                  {course.name}
                </h3>
                <p className="text-xs text-text-secondary mb-4">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-text-muted">
                    {completed}/{total} modules
                  </p>
                  {completed >= course.modules.length && (
                    <p className="text-xs text-accent-purple font-medium">
                      ∞ Expanding
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <div className="flex gap-3 justify-center flex-wrap">
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
            <button
              onClick={() => navigate("leaderboard")}
              className="btn-secondary text-sm"
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => navigate("profile")}
              className="btn-secondary text-sm"
            >
              👤 Profile
            </button>
            <button
              onClick={() => navigate("settings")}
              className="btn-secondary text-sm"
            >
              ⚙ Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
