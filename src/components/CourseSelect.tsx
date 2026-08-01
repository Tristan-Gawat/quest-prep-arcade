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
      <div className="w-full max-w-3xl">
        <h2 className="text-lg md:text-xl text-arcade-yellow text-center mb-2">
          SELECT YOUR QUEST
        </h2>
        <p className="text-[9px] text-arcade-cyan text-center mb-8">
          CHOOSE A LANGUAGE TO MASTER
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
                className="arcade-card p-4 md:p-6 text-left transition-transform hover:translate-y-[-4px] cursor-pointer"
                style={{ backgroundColor: course.color }}
              >
                <span className="text-2xl md:text-3xl block mb-3">
                  {course.icon}
                </span>
                <h3 className="text-[9px] md:text-xs text-black mb-1">
                  {course.name}
                </h3>
                <p className="text-[7px] md:text-[8px] text-black/70 mb-3">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 md:h-3 bg-black/20 border-2 border-black">
                  <div
                    className="h-full bg-black/40 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-[6px] md:text-[7px] text-black/60">
                    {completed}/{total} MODULES
                  </p>
                  {completed >= course.modules.length && (
                    <p className="text-[6px] md:text-[7px] text-black font-bold">
                      ∞ EXPANDING
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("settings")}
            className="text-[9px] text-gray-400 hover:text-arcade-purple transition-colors cursor-pointer"
          >
            ⚙ SETTINGS & AI CONFIG
          </button>
        </div>
      </div>
    </div>
  );
}
