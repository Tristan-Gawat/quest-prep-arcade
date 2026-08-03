// Central registry mapping module IDs to their pre-written lesson content
// Each lesson file exports an array of 5 sub-lessons with: title, definition, explanation, code, breakdown, summary

// Python imports
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

// JavaScript imports
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

// C# imports
import { csharpVariablesLessons } from "./csharp-variables";
import { csharpConsoleIOLessons } from "./csharp-console-io";
import { csharpConditionalsLessons } from "./csharp-conditionals";
import { csharpLoopsLessons } from "./csharp-loops";
import { csharpMethodsLessons } from "./csharp-methods";
import { csharpClassesLessons } from "./csharp-classes";
import { csharpInheritanceLessons } from "./csharp-inheritance";
import { csharpLinqLessons } from "./csharp-linq";
import { csharpAsyncLessons } from "./csharp-async";
import { csharpGenericsLessons } from "./csharp-generics";
import { csharpDelegatesLessons } from "./csharp-delegates";
import { csharpPatternMatchingLessons } from "./csharp-pattern-matching";

// Java imports
import { javaClassesLessons } from "./java-classes";
import { javaOOPLessons } from "./java-oop";
import { javaCollectionsLessons } from "./java-collections";
import { javaStreamsLessons } from "./java-streams";
import { javaGenericsLessons } from "./java-generics";
import { javaExceptionsLessons } from "./java-exceptions";


// C++ imports
import { cppPointersLessons } from "./cpp-pointers";
import { cppMemoryLessons } from "./cpp-memory";
import { cppClassesLessons } from "./cpp-classes";
import { cppSTLLessons } from "./cpp-stl";
import { cppTemplatesLessons } from "./cpp-templates";
import { cppRAIILessons } from "./cpp-raii";

// HTML/CSS imports
import { htmlStructureLessons } from "./html-structure";
import { cssBasicsLessons } from "./css-basics";
import { cssFlexboxLessons } from "./css-flexbox";
import { htmlFormsLessons } from "./html-forms";
import { cssGridLessons } from "./css-grid";
import { cssAnimationsLessons } from "./css-animations";

// Go imports
import { goGoroutinesLessons } from "./go-goroutines";
import { goChannelsLessons } from "./go-channels";
import { goInterfacesLessons } from "./go-interfaces";
import { goStructsLessons } from "./go-structs";
import { goSlicesLessons } from "./go-slices";
import { goErrorsLessons } from "./go-errors";

// Rust imports
import { rustOwnershipLessons } from "./rust-ownership";
import { rustBorrowingLessons } from "./rust-borrowing";
import { rustStructsLessons } from "./rust-structs";
import { rustEnumsLessons } from "./rust-enums";
import { rustTraitsLessons } from "./rust-traits";
import { rustLifetimesLessons } from "./rust-lifetimes";

// Ruby imports
import { rubyBlocksLessons } from "./ruby-blocks";
import { rubyClassesLessons } from "./ruby-classes";
import { rubyHashesLessons } from "./ruby-hashes";
import { rubySymbolsLessons } from "./ruby-symbols";
import { rubyGemsLessons } from "./ruby-gems";
import { rubyMetaprogrammingLessons } from "./ruby-metaprogramming";

// Swift imports
import { swiftOptionalsLessons } from "./swift-optionals";
import { swiftStructsClassesLessons } from "./swift-structs-classes";
import { swiftProtocolsLessons } from "./swift-protocols";
import { swiftClosuresLessons } from "./swift-closures";
import { swiftEnumsLessons } from "./swift-enums";
import { swiftGenericsLessons } from "./swift-generics";

// Kotlin imports
import { kotlinNullSafetyLessons } from "./kotlin-null-safety";
import { kotlinDataClassesLessons } from "./kotlin-data-classes";
import { kotlinCoroutinesLessons } from "./kotlin-coroutines";
import { kotlinExtensionsLessons } from "./kotlin-extensions";
import { kotlinSealedLessons } from "./kotlin-sealed";
import { kotlinHigherOrderLessons } from "./kotlin-higher-order";

// TypeScript imports
import { tsBasicsLessons } from "./ts-basics";
import { tsInterfacesLessons } from "./ts-interfaces";
import { tsGenericsLessons } from "./ts-generics";
import { tsUtilityTypesLessons } from "./ts-utility-types";
import { tsAdvancedLessons } from "./ts-advanced";
import { tsDecoratorsLessons } from "./ts-decorators";


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

  // C# modules
  "csharp-variables": csharpVariablesLessons,
  "csharp-console-io": csharpConsoleIOLessons,
  "csharp-conditionals": csharpConditionalsLessons,
  "csharp-loops": csharpLoopsLessons,
  "csharp-methods": csharpMethodsLessons,
  "csharp-classes": csharpClassesLessons,
  "csharp-inheritance": csharpInheritanceLessons,
  "csharp-linq": csharpLinqLessons,
  "csharp-async": csharpAsyncLessons,
  "csharp-generics": csharpGenericsLessons,
  "csharp-delegates": csharpDelegatesLessons,
  "csharp-pattern-matching": csharpPatternMatchingLessons,

  // Java modules
  "java-classes": javaClassesLessons,
  "java-oop": javaOOPLessons,
  "java-collections": javaCollectionsLessons,
  "java-streams": javaStreamsLessons,
  "java-generics": javaGenericsLessons,
  "java-exceptions": javaExceptionsLessons,


  // C++ modules
  "cpp-pointers": cppPointersLessons,
  "cpp-memory": cppMemoryLessons,
  "cpp-classes": cppClassesLessons,
  "cpp-stl": cppSTLLessons,
  "cpp-templates": cppTemplatesLessons,
  "cpp-raii": cppRAIILessons,

  // HTML/CSS modules
  "html-structure": htmlStructureLessons,
  "css-basics": cssBasicsLessons,
  "css-flexbox": cssFlexboxLessons,
  "html-forms": htmlFormsLessons,
  "css-grid": cssGridLessons,
  "css-animations": cssAnimationsLessons,

  // Go modules
  "go-goroutines": goGoroutinesLessons,
  "go-channels": goChannelsLessons,
  "go-interfaces": goInterfacesLessons,
  "go-structs": goStructsLessons,
  "go-slices": goSlicesLessons,
  "go-errors": goErrorsLessons,

  // Rust modules
  "rust-ownership": rustOwnershipLessons,
  "rust-borrowing": rustBorrowingLessons,
  "rust-structs": rustStructsLessons,
  "rust-enums": rustEnumsLessons,
  "rust-traits": rustTraitsLessons,
  "rust-lifetimes": rustLifetimesLessons,

  // Ruby modules
  "ruby-blocks": rubyBlocksLessons,
  "ruby-classes": rubyClassesLessons,
  "ruby-hashes": rubyHashesLessons,
  "ruby-symbols": rubySymbolsLessons,
  "ruby-gems": rubyGemsLessons,
  "ruby-metaprogramming": rubyMetaprogrammingLessons,

  // Swift modules
  "swift-optionals": swiftOptionalsLessons,
  "swift-structs-classes": swiftStructsClassesLessons,
  "swift-protocols": swiftProtocolsLessons,
  "swift-closures": swiftClosuresLessons,
  "swift-enums": swiftEnumsLessons,
  "swift-generics": swiftGenericsLessons,

  // Kotlin modules
  "kotlin-null-safety": kotlinNullSafetyLessons,
  "kotlin-data-classes": kotlinDataClassesLessons,
  "kotlin-coroutines": kotlinCoroutinesLessons,
  "kotlin-extensions": kotlinExtensionsLessons,
  "kotlin-sealed": kotlinSealedLessons,
  "kotlin-higher-order": kotlinHigherOrderLessons,

  // TypeScript modules
  "ts-basics": tsBasicsLessons,
  "ts-interfaces": tsInterfacesLessons,
  "ts-generics": tsGenericsLessons,
  "ts-utility-types": tsUtilityTypesLessons,
  "ts-advanced": tsAdvancedLessons,
  "ts-decorators": tsDecoratorsLessons,
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
