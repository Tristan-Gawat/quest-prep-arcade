// Central registry mapping module IDs to their pre-written lesson content
// Each lesson file exports an array of 5 sub-lessons with: title, definition, explanation, code, breakdown, summary

import { pythonHelloWorldLessons } from "./python-hello-world";
import { pythonVariablesLessons } from "./python-variables";
import { pythonInputStringsLessons } from "./python-input-strings";
import { pythonConditionalsLessons } from "./python-conditionals";
import { pythonLoopsLessons } from "./python-loops";
import { pythonFunctionsLessons } from "./python-functions";
import { pythonListsTuplesLessons } from "./python-lists-tuples";
import { pythonDictsSetsLessons } from "./python-dicts-sets";
import { pythonErrorHandlingLessons } from "./python-error-handling";
import { pythonFileIOLessons } from "./python-file-io";
import { pythonOOPLessons } from "./python-oop";
import { pythonDecoratorsLessons } from "./python-decorators";

import { jsConsoleOutputLessons } from "./js-console-output";
import { jsVariablesTypesLessons } from "./js-variables-types";
import { jsOperatorsConditionalsLessons } from "./js-operators-conditionals";
import { jsArraysMethodsLessons } from "./js-arrays-methods";
import { jsLoopsIterationLessons } from "./js-loops-iteration";
import { jsFunctionsArrowsLessons } from "./js-functions-arrows";
import { jsObjectsDestructuringLessons } from "./js-objects-destructuring";
import { jsDomManipulationLessons } from "./js-dom-manipulation";
import { jsAsyncPromisesLessons } from "./js-async-promises";
import { jsClassesOOPLessons } from "./js-classes-oop";
import { jsModulesToolingLessons } from "./js-modules-tooling";
import { jsAdvancedPatternsLessons } from "./js-advanced-patterns";

export interface SubLessonContent {
  title: string;
  definition: string;
  explanation: string;
  code: string;
  breakdown: string;
  summary: string;
}

// Map module IDs to their pre-written lesson arrays
const lessonRegistry: Record<string, SubLessonContent[]> = {
  // Python modules
  "py-hello-world": pythonHelloWorldLessons,
  "py-variables": pythonVariablesLessons,
  "py-input-strings": pythonInputStringsLessons,
  "py-conditionals": pythonConditionalsLessons,
  "py-loops": pythonLoopsLessons,
  "py-functions": pythonFunctionsLessons,
  "py-lists-tuples": pythonListsTuplesLessons,
  "py-dicts-sets": pythonDictsSetsLessons,
  "py-error-handling": pythonErrorHandlingLessons,
  "py-file-io": pythonFileIOLessons,
  "py-oop": pythonOOPLessons,
  "py-decorators-generators": pythonDecoratorsLessons,

  // JavaScript modules
  "js-console-output": jsConsoleOutputLessons,
  "js-variables-types": jsVariablesTypesLessons,
  "js-operators-conditionals": jsOperatorsConditionalsLessons,
  "js-arrays-methods": jsArraysMethodsLessons,
  "js-loops-iteration": jsLoopsIterationLessons,
  "js-functions-arrows": jsFunctionsArrowsLessons,
  "js-objects-destructuring": jsObjectsDestructuringLessons,
  "js-dom-manipulation": jsDomManipulationLessons,
  "js-async-promises": jsAsyncPromisesLessons,
  "js-classes-oop": jsClassesOOPLessons,
  "js-modules-tooling": jsModulesToolingLessons,
  "js-advanced-patterns": jsAdvancedPatternsLessons,
};

/**
 * Get the pre-written sub-lesson content for a specific module and sub-lesson index.
 * Returns null if no pre-written content exists for this module/index combination.
 */
export function getSubLessonContent(moduleId: string, subLessonIndex: number): SubLessonContent | null {
  const lessons = lessonRegistry[moduleId];
  if (!lessons || subLessonIndex < 0 || subLessonIndex >= lessons.length) {
    return null;
  }
  return lessons[subLessonIndex];
}

/**
 * Check if a module has pre-written lesson content available.
 */
export function hasPrewrittenLessons(moduleId: string): boolean {
  return moduleId in lessonRegistry;
}
