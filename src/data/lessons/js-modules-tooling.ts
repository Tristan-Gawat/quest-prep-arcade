// Pre-written full lessons for JavaScript: Modules & Tooling
// Each sub-lesson has: title, definition, explanation, code, breakdown, summary

export const jsModulesToolingLessons = [
  {
    title: "What is Modules & Tooling?",
    definition: "Modules are self-contained units of code that export specific functionality and import what they need from other modules. Tooling refers to the ecosystem of build tools, package managers, and bundlers that help you develop, test, and deploy JavaScript applications.",
    explanation: `Imagine building an RPG where all your code — character logic, inventory systems, combat mechanics, UI rendering, and save/load — lives in one massive file. Finding anything would be like searching a dungeon with no map. Modules solve this by splitting your code into focused, manageable files that explicitly declare their dependencies.

Before ES modules, JavaScript had no built-in module system. The community created solutions: CommonJS (require/module.exports) for Node.js, and AMD for browsers. In 2015, ES6 introduced native modules with import/export syntax — a standard that works in both browsers and Node.js. Today, ES modules are the standard and the future of JavaScript.

A module is simply a file that exports values (functions, classes, constants, objects) and imports values from other files. Each module has its own scope — variables defined inside don't pollute the global namespace. This prevents the nightmare of two different files accidentally using the same variable name and conflicting.

The tooling ecosystem is what makes modern JavaScript development possible at scale. npm (Node Package Manager) lets you install and share reusable packages. Bundlers like Vite and webpack take your many small module files and combine them into optimized bundles for production. They also handle transpilation (converting modern JS to older versions for browser compatibility), minification, and tree shaking.

Understanding modules and tooling is the gateway from writing toy scripts to building real applications. Every framework (React, Vue, Angular), every library, and every production app uses modules. It's the foundation of professional JavaScript development.`,
    code: `// ====== characterStats.js — A module that EXPORTS ======
// Named exports — you can have many per file
export const MAX_LEVEL = 99;
export const BASE_HP = 100;

export function calculateDamage(level, strength, weaponDmg) {
  const baseDmg = strength * 2 + weaponDmg;
  const levelBonus = Math.floor(level * 1.5);
  return baseDmg + levelBonus;
}

export function calculateXPToNext(currentLevel) {
  // Classic RPG XP curve — exponential growth
  return Math.floor(100 * Math.pow(1.5, currentLevel));
}

// Default export — one per file, the "main" thing
export default class Character {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.hp = BASE_HP;
    this.xp = 0;
  }

  levelUp() {
    this.level++;
    this.hp += 20;
    console.log(\`\${this.name} reached level \${this.level}!\`);
  }
}

// ====== game.js — A module that IMPORTS ======
// import Character from './characterStats.js';
// import { calculateDamage, MAX_LEVEL } from './characterStats.js';
// const hero = new Character("Aria");
// console.log(calculateDamage(hero.level, 15, 30));`,
    breakdown: `Let's analyze the module syntax:

• export const MAX_LEVEL = 99 — Named export. The "export" keyword makes this constant available to other files. You can have unlimited named exports per file.

• export function calculateDamage(...) — Exporting a function by name. Importers must use this exact name (or rename with "as").

• export default class Character — Default export: the "primary" export of this module. Only ONE default per file. Importers can name it whatever they want.

• Named vs Default: Named exports are for utilities, constants, helper functions (things a module offers). Default exports are for the main thing the module represents (a class, a component, a primary function).

• Each file is its own scope — MAX_LEVEL, calculateDamage, etc. are NOT global. Other files can only access them through explicit imports. No naming conflicts possible.

• import Character from './characterStats.js' — Importing the DEFAULT export. You choose the name (could be "Char" or "Player" — it's whatever follows "import").

• import { calculateDamage, MAX_LEVEL } from './characterStats.js' — Importing NAMED exports. Curly braces required. Names must match exactly (unless you use "as" to rename).

• './characterStats.js' — Relative path to the module file. The ./ means "same directory." ../ means "parent directory." Always use relative paths for your own files.

• This separation means characterStats.js can be reused across multiple files — combat system, UI display, save system — without any code duplication.`,
    summary: `ES modules split code into focused files with explicit exports and imports. Named exports (export const/function) provide multiple values per file, while default exports (export default) designate the primary value. Each module has its own scope, preventing global namespace pollution and enabling clean code organization.`
  },
  {
    title: "How Modules & Tooling works",
    definition: "The module system works through static analysis at build time — the import/export structure is determined before code runs, enabling optimizations like tree shaking. Package managers (npm/yarn) handle dependency resolution, and bundlers compile modules into optimized bundles.",
    explanation: `When you write import statements, you're declaring dependencies at the top of your file. Unlike require() in CommonJS (which can be called anywhere, conditionally), ES module imports are "static" — they're processed before any code in the file runs. This lets tools analyze your entire dependency graph at build time without executing any code.

The dependency graph is like a map of your dungeon: each room (module) has doors (imports) connecting to other rooms. The bundler walks this graph starting from your entry point (usually index.js or main.js), collecting every module that's actually needed. Modules that are never imported are simply left out — this is "tree shaking."

npm (Node Package Manager) is the world's largest software registry. When you run "npm install lodash", npm downloads the package and all its dependencies into a node_modules folder, and records it in package.json (your project's manifest). package.json is like your game's save file — it records exactly what packages your project needs to run.

Bundlers like Vite and webpack solve the problem of shipping modules to browsers. While modern browsers support ES modules natively, loading hundreds of individual files is slow. Bundlers combine everything into a few optimized files, apply transformations (TypeScript → JavaScript, JSX → createElement calls), minimize code size, and split code into chunks that load on demand.

Vite (pronounced "veet" — French for "fast") is the modern standard. It uses native ES modules during development (no bundling needed, instant startup) and Rollup for production builds (optimized bundles). Webpack is older and more configurable but slower. Understanding these tools is essential for any production JavaScript project.`,
    code: `// ====== package.json — Your project's manifest ======
// {
//   "name": "dragon-quest-rpg",
//   "version": "1.0.0",
//   "type": "module",       // Enables ES module syntax
//   "scripts": {
//     "dev": "vite",         // Start dev server
//     "build": "vite build", // Production bundle
//     "test": "vitest"       // Run tests
//   },
//   "dependencies": {
//     "three": "^0.160.0"   // 3D rendering (runtime dep)
//   },
//   "devDependencies": {
//     "vite": "^5.0.0",     // Build tool (dev only)
//     "vitest": "^1.0.0"    // Test runner (dev only)
//   }
// }

// ====== Importing from npm packages ======
// No relative path needed — bundler resolves from node_modules
// import * as THREE from 'three';
// import { Vector3, Scene } from 'three';

// ====== Renaming imports to avoid conflicts ======
import { calculateDamage as calcDmg } from './combat.js';
import { calculateDamage as calcMagicDmg } from './magic.js';

// Both modules export "calculateDamage" — rename to avoid clash
const physicalHit = calcDmg(10, 20, 15);
const magicHit = calcMagicDmg(10, 30, "fire");

// ====== Re-exporting — barrel files for clean imports ======
// utils/index.js — re-exports everything from subdirectory
export { calculateDamage, calculateXP } from './combat.js';
export { formatGold, formatTime } from './display.js';
export { saveGame, loadGame } from './persistence.js';

// Now consumers import from one place:
// import { calculateDamage, formatGold, saveGame } from './utils/index.js';`,
    breakdown: `Let's examine the tooling and advanced import patterns:

• "type": "module" — In package.json, this tells Node.js to treat .js files as ES modules (import/export) instead of CommonJS (require/module.exports).

• "scripts": { "dev": "vite" } — npm scripts are shortcuts. Running "npm run dev" executes "vite" which starts a development server with hot module replacement (instant updates).

• "dependencies" vs "devDependencies" — Dependencies are needed at runtime (shipped to users). DevDependencies are only needed during development (build tools, test runners). Both install to node_modules.

• "^0.160.0" — Caret (^) means "compatible with." Allows minor and patch updates (0.160.x, 0.161.x) but not major breaks. This is semver (semantic versioning).

• import * as THREE from 'three' — Namespace import: all named exports bundled into one object. Access as THREE.Scene, THREE.Vector3, etc. Good for large libraries.

• import { calculateDamage as calcDmg } — The "as" keyword renames an import locally. Essential when two modules export the same name.

• const physicalHit = calcDmg(10, 20, 15) — Using the renamed import. Inside this file, it's known as calcDmg, but the source module still calls it calculateDamage.

• export { calculateDamage } from './combat.js' — Re-export without importing locally. This file acts as a "barrel" — a single entry point that aggregates exports from multiple files.

• Barrel files (index.js) simplify imports for consumers. Instead of remembering which sub-file contains what, import everything from the directory's index.`,
    summary: `Package.json defines your project's dependencies and scripts. npm manages installation, and bundlers like Vite compile modules into optimized bundles. Advanced patterns include namespace imports (import *), rename with "as" to avoid conflicts, and barrel files (re-exports) for clean import paths. The tooling ecosystem makes large-scale JavaScript development manageable.`
  },
  {
    title: "Modules & Tooling syntax & usage",
    definition: "Dynamic imports allow loading modules on demand at runtime using import() as a function, returning a Promise. This enables code splitting — loading only the code needed for the current view or feature, dramatically improving initial load performance.",
    explanation: `Static imports (at the top of a file) load everything upfront. But imagine an RPG with 50 different dungeons — you don't want to load all 50 dungeon maps when the player starts the game. Dynamic imports let you load modules ONLY when they're actually needed, like loading a dungeon map only when the player enters that dungeon.

The import() function (note: parentheses, not a statement) returns a Promise that resolves to the module's exports. You can use it anywhere — inside functions, inside if statements, inside event handlers. This is fundamentally different from static import declarations which must be at the top level.

Code splitting is the bundler's ability to break your app into multiple "chunks" that load independently. When you use dynamic import(), Vite and webpack automatically create a separate chunk for that module. The main bundle stays small and loads fast; additional chunks load on demand.

This pattern is essential for modern web applications. A complex game might have: a main menu chunk (loads immediately), a character creation chunk (loads when you click "New Game"), a combat system chunk (loads when you enter battle), and individual dungeon chunks (load as you explore). Users only download what they need.

React uses this pattern extensively with React.lazy() for component-level code splitting. Vue has async components. The core idea is the same: wrap a dynamic import in a UI abstraction that shows a loading state while the chunk downloads, then renders the component once it's ready.`,
    code: `// Dynamic import — load modules on demand
async function enterDungeon(dungeonId) {
  console.log("Loading dungeon assets...");

  // import() returns a Promise — loads the module at runtime
  const dungeonModule = await import(\`./dungeons/\${dungeonId}.js\`);

  // Access the module's exports
  const dungeon = new dungeonModule.default(dungeonId);
  dungeon.initialize();
  return dungeon;
}

// Conditional loading — only load heavy modules when needed
async function initCombatSystem(useAdvancedAI) {
  let aiModule;

  if (useAdvancedAI) {
    // This chunk only downloads if advanced AI is enabled
    aiModule = await import('./ai/advanced-pathfinding.js');
  } else {
    // Lightweight fallback
    aiModule = await import('./ai/basic-combat.js');
  }

  return aiModule.createAI();
}

// Loading multiple dynamic modules in parallel
async function loadGamePlugins(pluginNames) {
  const plugins = await Promise.all(
    pluginNames.map(async (name) => {
      const mod = await import(\`./plugins/\${name}.js\`);
      console.log(\`Plugin loaded: \${name}\`);
      return { name, instance: mod.default };
    })
  );

  // Initialize all plugins
  plugins.forEach((p) => p.instance.init());
  return plugins;
}

// Usage
enterDungeon("shadow-caverns");
loadGamePlugins(["minimap", "quest-tracker", "loot-filter"]);`,
    breakdown: `Let's analyze dynamic import patterns:

• await import(\`./dungeons/\${dungeonId}.js\`) — Dynamic import using a template literal path. Unlike static imports, the path can be a variable or expression. This is evaluated at RUNTIME.

• const dungeonModule = await import(...) — The resolved value is the module namespace object. It contains all the module's exports as properties.

• dungeonModule.default — Accessing the default export from a dynamically imported module. Named exports are accessed by name: dungeonModule.calculateDamage.

• new dungeonModule.default(dungeonId) — Instantiating the default-exported class. Dynamic imports work with any export type: classes, functions, objects, constants.

• if (useAdvancedAI) { aiModule = await import(...) } — Conditional importing. The heavy advanced AI module is NEVER downloaded if the flag is false. The bundler creates separate chunks for each path.

• Promise.all(pluginNames.map(async (name) => {...})) — Loading multiple dynamic modules IN PARALLEL. Each import() starts immediately; Promise.all waits for all to complete.

• const mod = await import(\`./plugins/\${name}.js\`) — Each plugin loads from a computed path. Bundlers use the static prefix ("./plugins/") to know which directory to split into chunks.

• return { name, instance: mod.default } — Wrapping the imported module with metadata. Clean pattern for plugin systems.

• plugins.forEach(p => p.instance.init()) — Initializing all loaded plugins. Each plugin module exports a default object with an init() method — a consistent interface.`,
    summary: `Dynamic import() loads modules on demand at runtime, returning a Promise with the module's exports. This enables code splitting — bundlers automatically create separate chunks for dynamic imports that load only when needed. Use it for conditional loading, route-based splitting, and plugin systems to keep initial bundle size small and load times fast.`
  },
  {
    title: "Practical examples of Modules & Tooling",
    definition: "Real-world module architecture involves organizing code into logical directories, creating public APIs through barrel files, managing shared state across modules, and structuring projects for scalability, maintainability, and team collaboration.",
    explanation: `A well-structured project is like a well-organized guild hall — everyone knows where to find what they need, new members can navigate easily, and expanding with new features doesn't require reorganizing everything. Module architecture is about defining these conventions clearly.

The most common pattern in modern JavaScript projects is "feature-based" organization. Instead of grouping by file type (all components in /components, all utilities in /utils), you group by feature: /features/combat/ contains combat components, combat logic, combat tests, and combat types all together. This keeps related code close and makes features independently deployable.

Barrel files (index.js/index.ts at each directory level) create a public API for each module/feature. Internal implementation details stay hidden; only what's re-exported through the barrel is "public." This is encapsulation at the module level — other features import from your barrel, not from your internal files.

Shared state across modules requires careful design. Common patterns include: a shared config module that exports settings, a central event bus for loose coupling between features, or a state management module. The key is that modules communicate through explicit imports/exports — never through global variables or side effects.

For team collaboration, consistent module structure means developers can jump into any feature and immediately understand the layout. ESLint rules can enforce import boundaries (no reaching into another feature's internals), and CI can verify that circular dependencies don't creep in. This architecture scales from solo projects to 100-person teams.`,
    code: `// ====== Project structure for an RPG game ======
// src/
//   features/
//     combat/
//       index.js         (barrel — public API)
//       CombatEngine.js
//       DamageCalculator.js
//       abilities.js
//     inventory/
//       index.js
//       Inventory.js
//       ItemFactory.js
//   shared/
//     constants.js
//     EventBus.js
//     utils.js
//   main.js

// ====== shared/EventBus.js — Loose coupling between modules ======
class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach((cb) => cb(data));
  }
}

export const gameEvents = new EventBus(); // Singleton instance

// ====== features/combat/index.js — Barrel (public API) ======
export { CombatEngine } from './CombatEngine.js';
export { calculateDamage } from './DamageCalculator.js';
// NOT exporting internal helpers — they stay private to this feature

// ====== features/inventory/Inventory.js ======
import { gameEvents } from '../../shared/EventBus.js';

export class Inventory {
  constructor(maxSlots = 20) {
    this.items = [];
    this.maxSlots = maxSlots;
  }

  addItem(item) {
    if (this.items.length >= this.maxSlots) {
      gameEvents.emit("inventory:full", { item });
      return false;
    }
    this.items.push(item);
    gameEvents.emit("inventory:itemAdded", { item });
    return true;
  }
}`,
    breakdown: `Let's examine the architecture patterns:

• Feature-based structure (src/features/combat/, src/features/inventory/) — Each feature is self-contained. New features get new directories without modifying existing code.

• shared/ directory — Code used across multiple features: constants, utilities, cross-cutting concerns like the event bus. Keep this small and stable.

• class EventBus — Decouples modules. Combat doesn't need to import Inventory directly; it emits events that Inventory listens to. This prevents circular dependencies.

• this.listeners = new Map() — Maps event names to arrays of callback functions. Clean pub/sub (publish/subscribe) pattern.

• export const gameEvents = new EventBus() — Singleton pattern: one shared instance exported for the entire app. All modules import and use this same instance.

• export { CombatEngine } from './CombatEngine.js' — Barrel file re-exports. External code imports from the barrel, not from internal files. If you reorganize internals, the barrel stays the same.

• NOT exporting internal helpers — Barrel files define the public API. Internal utility functions stay private to the feature. This is module-level encapsulation.

• import { gameEvents } from '../../shared/EventBus.js' — Cross-feature communication goes through shared modules. Features never import directly from each other's internals.

• gameEvents.emit("inventory:full", { item }) — Namespaced event names prevent collisions. The combat system could listen for "inventory:itemAdded" to update equipment stats without importing Inventory directly.`,
    summary: `Feature-based project structure keeps related code together and scales well for teams. Barrel files (index.js) create public APIs for each feature, hiding internal implementation. An EventBus enables loose coupling between features without direct imports. This architecture supports team collaboration, prevents circular dependencies, and makes features independently maintainable.`
  },
  {
    title: "Modules & Tooling best practices",
    definition: "Module best practices include avoiding circular dependencies, leveraging tree shaking for smaller bundles, using proper dependency management with lock files, and understanding the difference between dependencies and devDependencies for optimal build outputs.",
    explanation: `Tree shaking is one of the most powerful optimizations bundlers provide. Named "tree shaking" because it's like shaking a tree — dead leaves (unused code) fall off. If you import only one function from a large utility library, tree shaking ensures only that function (and its dependencies) end up in your final bundle. But it only works with ES modules (import/export), not CommonJS (require).

For tree shaking to work effectively, you need "side-effect-free" modules — modules where importing them doesn't DO anything unless you explicitly call their exports. If a module sets global variables, modifies prototypes, or registers event listeners just by being imported, the bundler can't safely remove it. Mark side-effect-free packages in package.json with "sideEffects": false.

Circular dependencies occur when Module A imports Module B, and Module B imports Module A (directly or through a chain). While JavaScript technically allows this, it creates subtle bugs: one module gets an incomplete version of the other during initialization. The fix is architectural: extract shared code into a third module both can import, or restructure to break the cycle.

Lock files (package-lock.json for npm, yarn.lock for Yarn) record the EXACT versions of every dependency installed. Without a lock file, two developers running "npm install" might get different versions, leading to "works on my machine" bugs. Always commit lock files to version control. They ensure reproducible builds.

Environment-specific builds are also critical. Development builds include source maps, hot reload, and verbose error messages. Production builds are minified, tree-shaken, and optimized. Vite handles this automatically: "vite" for dev, "vite build" for production. Understanding this distinction helps you write code that leverages both environments.`,
    code: `// ====== Tree shaking — only used exports are bundled ======
// gameUtils.js — a utility module
export function calculateDPS(damage, attackSpeed) {
  return damage * attackSpeed;
}

export function calculateHealPerSecond(healAmount, castTime) {
  return healAmount / castTime;
}

export function generateLootTable(difficulty, luck) {
  // Complex function with many dependencies...
  return { items: [], rarity: "common" };
}

// In another file — only calculateDPS is imported
// import { calculateDPS } from './gameUtils.js';
// Tree shaking removes calculateHealPerSecond and generateLootTable!

// ====== Avoiding circular dependencies ======
// BAD: Player imports from Inventory, Inventory imports from Player
// Fix: Extract shared types/interfaces into a third module

// shared/types.js — no dependencies on other modules
export const ITEM_TYPES = { WEAPON: "weapon", ARMOR: "armor", POTION: "potion" };
export const MAX_STACK = 99;

// features/inventory.js — imports from shared, not from player
import { ITEM_TYPES, MAX_STACK } from '../shared/types.js';

export class Inventory {
  addItem(item) {
    if (item.type === ITEM_TYPES.WEAPON) {
      return this.equipWeapon(item);
    }
    if (item.stackSize >= MAX_STACK) return false;
    return true;
  }

  equipWeapon(weapon) {
    console.log(\`Equipped: \${weapon.name}\`);
    return true;
  }
}

// ====== Proper npm dependency management ======
// npm install three          → dependencies (ships to users)
// npm install -D vite vitest → devDependencies (build only)
// npm ci                     → clean install from lock file (CI/CD)
// npm audit                  → check for security vulnerabilities`,
    breakdown: `Let's review the best practices:

• export function calculateDPS(...) — Each function is a named export. Tree shaking analyzes which exports are actually imported elsewhere and removes the rest from the bundle.

• Only calculateDPS is imported — The bundler's static analysis sees that calculateHealPerSecond and generateLootTable are never imported anywhere in the dependency graph. They get removed entirely from the production bundle.

• This only works with ES modules — CommonJS (require/module.exports) bundles entire modules because require() is dynamic and can't be statically analyzed. Always use import/export.

• shared/types.js — A module with NO imports from other project files. It defines constants used by multiple features. Because it has no dependencies, it can't create cycles.

• ITEM_TYPES and MAX_STACK — Shared constants prevent magic strings/numbers across modules. Change in one place, updates everywhere.

• import { ITEM_TYPES } from '../shared/types.js' — Inventory imports from shared, not from Player. Even if Player also imports from shared, there's no cycle because shared doesn't import from either.

• npm install -D vite vitest — The -D flag marks packages as devDependencies. They're available during development but don't increase your production bundle size.

• npm ci — "Clean install" — deletes node_modules and installs exactly what's in the lock file. Used in CI/CD for reproducible builds. Faster and safer than npm install.

• npm audit — Scans your dependency tree for known security vulnerabilities. Run periodically and before deployments.`,
    summary: `Tree shaking removes unused exports from production bundles — but only works with ES modules and side-effect-free code. Prevent circular dependencies by extracting shared code into independent modules. Use lock files for reproducible builds, npm ci in CI/CD pipelines, and npm audit for security. Proper dependency management keeps bundles small and builds reliable.`
  }
];
