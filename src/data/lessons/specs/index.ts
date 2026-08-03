// Spec lessons registry - maps spec module IDs to pre-written lesson content
import { csNetworkingBasicsLessons } from "./cs-networking-basics";
import { csCryptoBasicsLessons } from "./cs-crypto-basics";
import { csSqlInjectionLessons } from "./cs-sql-injection";
import { csPythonSecurityLessons } from "./cs-python-security";
import { csXssLessons } from "./cs-xss";

import { gdGameLoopsLessons } from "./gd-game-loops";
import { gdPhysicsEnginesLessons } from "./gd-physics-engines";
import { gdAiPathfindingLessons } from "./gd-ai-pathfinding";
import { gdInputSystemsLessons } from "./gd-input-systems";
import { gdShadersLessons } from "./gd-shaders";

import { dsDataStructuresLessons } from "./ds-data-structures";
import { dsSortingAlgorithmsLessons } from "./ds-sorting-algorithms";
import { dsDynamicProgrammingLessons } from "./ds-dynamic-programming";
import { dsMlBasicsLessons } from "./ds-ml-basics";
import { dsGraphAlgorithmsLessons } from "./ds-graph-algorithms";

import { mm3dModelingLessons } from "./mm-3d-modeling";
import { mmAnimationPrinciplesLessons } from "./mm-animation-principles";
import { mmVideoEditingLessons } from "./mm-video-editing";
import { mmSoundDesignLessons } from "./mm-sound-design";
import { mmWebAnimationLessons } from "./mm-web-animation";

import type { SubLessonContent } from "../index";

const specLessonRegistry: Record<string, SubLessonContent[]> = {
  // Cybersecurity
  "cs-networking-basics": csNetworkingBasicsLessons,
  "cs-crypto-basics": csCryptoBasicsLessons,
  "cs-sql-injection": csSqlInjectionLessons,
  "cs-python-security": csPythonSecurityLessons,
  "cs-xss": csXssLessons,

  // Game Development
  "gd-game-loops": gdGameLoopsLessons,
  "gd-physics-engines": gdPhysicsEnginesLessons,
  "gd-ai-pathfinding": gdAiPathfindingLessons,
  "gd-input-systems": gdInputSystemsLessons,
  "gd-shaders": gdShadersLessons,

  // Computer Science
  "ds-data-structures": dsDataStructuresLessons,
  "ds-sorting-algorithms": dsSortingAlgorithmsLessons,
  "ds-dynamic-programming": dsDynamicProgrammingLessons,
  "ds-ml-basics": dsMlBasicsLessons,
  "ds-graph-algorithms": dsGraphAlgorithmsLessons,

  // Multimedia
  "mm-3d-modeling": mm3dModelingLessons,
  "mm-animation-principles": mmAnimationPrinciplesLessons,
  "mm-video-editing": mmVideoEditingLessons,
  "mm-sound-design": mmSoundDesignLessons,
  "mm-web-animation": mmWebAnimationLessons,
};

export function getSpecLessonContent(moduleId: string, subLessonIndex: number): SubLessonContent | null {
  const lessons = specLessonRegistry[moduleId];
  if (!lessons || subLessonIndex < 0 || subLessonIndex >= lessons.length) {
    return null;
  }
  return lessons[subLessonIndex];
}

export function hasSpecLessons(moduleId: string): boolean {
  return moduleId in specLessonRegistry;
}
