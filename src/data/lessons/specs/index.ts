// Central registry for spec (specialization) lesson content
// Maps spec module IDs to their pre-written sub-lesson content

export interface SpecSubLessonContent {
  title: string;
  definition: string;
  explanation: string;
  code: string;
  breakdown: string;
  summary: string;
}

// Registry mapping spec module IDs to arrays of sub-lesson content
const specLessonRegistry: Record<string, SpecSubLessonContent[]> = {};

/**
 * Get the pre-written sub-lesson content for a specific spec module and sub-lesson index.
 * Returns null if no pre-written content exists for this module/index combination.
 */
export function getSpecLessonContent(moduleId: string, subLessonIndex: number): SpecSubLessonContent | null {
  const lessons = specLessonRegistry[moduleId];
  if (!lessons || subLessonIndex < 0 || subLessonIndex >= lessons.length) {
    return null;
  }
  return lessons[subLessonIndex];
}

/**
 * Check if a spec module has pre-written lesson content available.
 */
export function hasSpecLessons(moduleId: string): boolean {
  return moduleId in specLessonRegistry;
}
