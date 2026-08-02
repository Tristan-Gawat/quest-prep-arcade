export const jsConsoleOutputLessons = [
  {
    title: "What is Console & Output?",
    definition: "Console & Output refers to the browser's built-in debugging tool that lets you display messages, inspect values, and track your program's execution flow in real time.",
    explanation: `The console is your adventurer's journal in the world of JavaScript. Just as an RPG hero keeps a log of quests completed, items found, and enemies defeated, the console keeps a record of everything happening in your code. It's the first tool every developer learns to wield.

When you write JavaScript, your code runs invisibly behind the scenes. Without the console, you'd be wandering through a dungeon blindfolded. The console gives you sight — it lets you peek into variables, confirm that functions are firing, and trace the path your program takes through its logic.

The most common spell in your console grimoire is \`console.log()\`. This method prints any value you pass to it directly to the browser's developer tools console. Think of it as casting "Reveal" on your data — whatever was hidden becomes visible.

Beyond simple logging, the console offers a full toolkit of output methods. You can display warnings that glow yellow like caution signs in a dungeon, errors that flash red like a health bar hitting zero, and even formatted tables that organize your loot inventory neatly.

Mastering console output is the foundation of debugging. Before you can fix a bug, you must find it. Before you can find it, you must see it. The console is your torch in the darkness of code execution.`,
    code: `// Welcome to the Console Guild - your first quest begins here!

// The most basic spell: console.log()
// It reveals any value to the developer console
console.log("Quest Started: The Console Chronicles");

// You can log numbers, strings, booleans - any data type
const playerName = "Arcane Coder";
const level = 7;
const isAlive = true;

// Display your hero's stats
console.log("Hero:", playerName);
console.log("Level:", level);
console.log("Status:", isAlive);

// Combine multiple values in a single log
// Each value is separated by a space in the output
console.log("Player", playerName, "is level", level);

// Use template literals for cleaner string building
console.log(\`\${playerName} has reached level \${level}!\`);

// Log objects to inspect complex data structures
const playerStats = {
  health: 100,
  mana: 75,
  strength: 12,
  quest: "Console Mastery"
};
console.log("Full Stats:", playerStats);`,
    breakdown: `• \`console.log("Quest Started...")\` — prints a simple string message to the console, confirming your script is running
• \`const playerName = "Arcane Coder"\` — declares a constant string variable to use in output demonstrations
• \`const level = 7\` — stores a number value that we'll display in various ways
• \`console.log("Hero:", playerName)\` — prints a label followed by the variable's value, separated by a space
• \`console.log("Player", playerName, "is level", level)\` — demonstrates passing multiple arguments, each printed with automatic spacing
• \`console.log(\\\`\\\${playerName} has reached level \\\${level}!\\\`)\` — uses template literals to embed variables directly inside a string
• \`const playerStats = { health: 100, ... }\` — creates an object to show that console.log can display complex data
• \`console.log("Full Stats:", playerStats)\` — logs the entire object, which the console renders as an expandable tree`,
    summary: `Console.log() is your primary tool for displaying output in JavaScript. It accepts any number of arguments of any type and prints them to the browser's developer console, making it essential for debugging and understanding your code's behavior.`
  },
  {
    title: "How Console & Output works",
    definition: "The console API works by sending messages from your JavaScript runtime to the browser's developer tools interface, where they are displayed with timestamps, source locations, and interactive formatting.",
    explanation: `Understanding how the console works under the hood is like learning the mechanics of a magic system. When you cast \`console.log()\`, your message doesn't just appear — it travels through the JavaScript engine's internal messaging pipeline to reach the developer tools panel.

The JavaScript runtime maintains a reference to the console object, which is part of the Web API (not the core JavaScript language itself). When you call any console method, the engine serializes your data and passes it to the browser's rendering engine, which formats and displays it in the DevTools panel.

Template literals (backtick strings) are one of the most powerful tools for crafting console output. They allow you to embed expressions directly inside strings using the \`\$\{\}\` syntax. This is like having a magical scroll that automatically fills in the blanks with your current quest data — no manual string concatenation needed.

The \`\$\{\}\` syntax inside template literals can contain any valid JavaScript expression. This means you can perform calculations, call functions, or access object properties right inside your strings. It's like enchanting your text with live data bindings.

Each console method has a specific purpose in your debugging arsenal. Just as an RPG character has different abilities for different situations — healing spells, attack moves, buffs — the console gives you specialized tools for different types of information output.`,
    code: `// Understanding the console's inner workings

// Template literals use backticks and \${} for interpolation
const hero = "Shadow Mage";
const damage = 42;
const isCritical = true;

// Simple interpolation - embedding variables in strings
const battleLog = \`\${hero} dealt \${damage} damage!\`;
console.log(battleLog);

// Expressions inside \${} are evaluated before insertion
console.log(\`Critical hit: \${isCritical ? "YES! Double damage!" : "No"}\`);
console.log(\`Total damage with bonus: \${damage * 1.5}\`);

// Multi-line template literals preserve formatting
const questReport = \`
=== Quest Report ===
Hero: \${hero}
Damage Dealt: \${damage}
Critical: \${isCritical}
Bonus Damage: \${damage + 10}
====================\`;
console.log(questReport);

// String concatenation (old way) vs template literals (new way)
// Old: "The " + hero + " dealt " + damage + " damage"
// New: \`The \${hero} dealt \${damage} damage\`
// Template literals are cleaner and easier to read

// You can call functions inside template literals
const getTitle = (lvl) => lvl > 10 ? "Master" : "Apprentice";
console.log(\`\${hero} the \${getTitle(8)}\`);`,
    breakdown: `• \`const battleLog = \\\`\\\${hero} dealt \\\${damage} damage!\\\`\` — creates a string using template literal interpolation, embedding variable values directly
• \`\\\${isCritical ? "YES!..." : "No"}\` — evaluates a ternary expression inside the template, showing that any JS expression works in \\\${}
• \`\\\${damage * 1.5}\` — performs arithmetic inside the template literal, demonstrating expression evaluation
• The multi-line \`questReport\` — shows that template literals preserve line breaks and whitespace, unlike regular strings
• \`\\\${damage + 10}\` — addition inside interpolation, computed at the moment the string is created
• The comparison comment — highlights the readability advantage of template literals over string concatenation
• \`const getTitle = (lvl) => ...\` — defines an arrow function to demonstrate calling functions inside \\\${}
• \`\\\${getTitle(8)}\` — invokes the function during string creation, embedding its return value`,
    summary: `Template literals with \${} syntax allow you to embed any JavaScript expression directly inside strings. They replace clunky string concatenation with clean, readable interpolation and support multi-line formatting, making them the preferred way to build dynamic output strings.`
  },
  {
    title: "Console & Output syntax & usage",
    definition: "The console object provides multiple methods beyond log() — including warn(), error(), and table() — each designed to display information with different visual styling and semantic meaning in the developer tools.",
    explanation: `The console API is like a full utility belt for a dungeon-crawling hero. While \`console.log()\` is your basic sword — reliable and always ready — the other console methods are specialized weapons for specific encounters.

\`console.warn()\` displays messages with a yellow warning icon and background. Use it when something isn't broken yet but could become a problem — like a bridge that's creaking under weight. It signals "proceed with caution" to anyone reading the logs.

\`console.error()\` shows messages in red with an error icon and includes a stack trace. This is your alarm bell — it screams that something has gone wrong. Use it for actual errors, failed operations, or invalid states that need immediate attention.

\`console.table()\` takes arrays or objects and renders them as a formatted table with columns and rows. It's like organizing your inventory — instead of a jumbled pile of items, everything is sorted neatly where you can scan it at a glance.

\`console.group()\` and \`console.groupEnd()\` let you create collapsible sections in your output. Think of them as chapters in your quest log — you can expand the chapter you're interested in and collapse the rest to reduce visual clutter.`,
    code: `// The Console Arsenal - specialized tools for every situation

// console.warn() - yellow caution messages
const healthPotion = 1;
if (healthPotion <= 1) {
  console.warn("Low on health potions! Visit the shop soon.");
}

// console.error() - red error messages with stack trace
const loadGameSave = (slot) => {
  if (slot === null) {
    console.error("CRITICAL: Save file not found! Data corrupted.");
  }
};
loadGameSave(null);

// console.table() - beautiful formatted tables
const partyMembers = [
  { name: "Warrior", hp: 150, role: "Tank" },
  { name: "Mage", hp: 80, role: "DPS" },
  { name: "Cleric", hp: 100, role: "Healer" },
  { name: "Rogue", hp: 90, role: "DPS" }
];
console.table(partyMembers);

// console.group() - organized, collapsible sections
console.group("Battle Report: Dragon Encounter");
console.log("Location: Volcanic Cavern");
console.log("Enemy: Elder Dragon (Level 50)");
console.warn("Party HP is below 50%!");
console.groupEnd();

// console.time() - measure execution speed
console.time("Quest Completion");
// ... game logic would go here ...
console.timeEnd("Quest Completion");`,
    breakdown: `• \`console.warn("Low on health potions...")\` — displays a yellow warning message, ideal for non-critical but noteworthy situations
• \`console.error("CRITICAL: Save file not found!")\` — outputs a red error with stack trace, signaling a serious problem
• \`const partyMembers = [...]\` — creates an array of objects that will render beautifully as a table
• \`console.table(partyMembers)\` — displays the array as a formatted table with automatic columns for each property
• \`console.group("Battle Report...")\` — starts a collapsible group in the console, nesting all subsequent logs inside it
• \`console.log(...)\` inside the group — these messages appear indented within the group
• \`console.groupEnd()\` — closes the current group, returning to the normal nesting level
• \`console.time("Quest Completion")\` — starts a named timer to measure how long operations take
• \`console.timeEnd("Quest Completion")\` — stops the timer and prints the elapsed milliseconds`,
    summary: `The console API offers specialized methods for different output needs: warn() for caution messages, error() for critical failures, table() for structured data visualization, group()/groupEnd() for organized sections, and time()/timeEnd() for performance measurement.`
  },
  {
    title: "Practical examples of Console & Output",
    definition: "String interpolation and logging multiple values are practical techniques that let you build rich, informative console output for debugging game states, tracking events, and monitoring application behavior.",
    explanation: `Now that you've learned the individual spells in your console grimoire, it's time to combine them in real combat scenarios. Practical console usage is about choosing the right tool for the right moment — and often combining several techniques together.

String interpolation with template literals becomes incredibly powerful when you're tracking game state. Imagine monitoring a player's journey: their position changes, inventory updates, and combat outcomes all need to be logged clearly. Template literals let you build these messages naturally, like writing sentences with blanks that fill themselves in.

Logging multiple values in a single \`console.log()\` call is a rapid-fire technique. Instead of writing five separate log statements, you can pass multiple arguments separated by commas. The console automatically spaces them and formats each according to its type — objects become expandable trees, arrays show their contents, and primitives display inline.

Combining console methods with conditional logic creates smart logging systems. You can set up debug modes that only output when a flag is enabled, use different severity levels based on thresholds, and create formatted reports that aggregate data from multiple sources.

Real-world debugging often involves tracing a value through multiple transformations. By logging at each step, you create a trail of breadcrumbs through your code's execution — essential for finding where things go wrong in complex quest chains.`,
    code: `// Real-world console patterns for game development

// Tracking player state changes with interpolation
const player = { name: "Nova", hp: 85, maxHp: 100, gold: 250 };
const enemy = { name: "Goblin King", hp: 0, xpReward: 150 };

// Log a formatted battle result
console.log(\`\${player.name} defeated \${enemy.name}!\`);
console.log(\`XP Gained: +\${enemy.xpReward} | Gold: \${player.gold}\`);
console.log(\`HP Remaining: \${player.hp}/\${player.maxHp} (\${Math.round((player.hp / player.maxHp) * 100)}%)\`);

// Logging multiple values for quick inspection
console.log("Player:", player, "| Enemy:", enemy);

// Conditional debug logging system
const DEBUG_MODE = true;
const debugLog = (label, data) => {
  if (DEBUG_MODE) {
    console.log(\`[DEBUG] \${label}:\`, data);
  }
};

debugLog("Player State", player);
debugLog("Combat Result", { winner: player.name, xp: enemy.xpReward });

// Tracking value transformations step by step
let loot = [10, 25, 5, 50, 15];
console.log("Raw loot drops:", loot);

loot = loot.filter(gold => gold >= 10);
console.log("After filtering (>= 10):", loot);

const totalGold = loot.reduce((sum, g) => sum + g, 0);
console.log(\`Total gold collected: \${totalGold}\`);
console.log(\`Average per drop: \${(totalGold / loot.length).toFixed(1)}\`);`,
    breakdown: `• \`\\\${Math.round((player.hp / player.maxHp) * 100)}%\` — calculates HP percentage inline within the template literal
• \`console.log("Player:", player, "| Enemy:", enemy)\` — logs multiple objects in one call for side-by-side comparison
• \`const DEBUG_MODE = true\` — a flag that controls whether debug messages appear, simulating a toggleable debug system
• \`const debugLog = (label, data) => {...}\` — a reusable helper function that conditionally logs with a [DEBUG] prefix
• \`debugLog("Player State", player)\` — uses the helper to cleanly log labeled data only when debugging is enabled
• \`console.log("Raw loot drops:", loot)\` — captures the initial state before any transformations
• \`loot.filter(gold => gold >= 10)\` — transforms the array, and the next log shows the result for comparison
• \`(totalGold / loot.length).toFixed(1)\` — computes an average and formats it to one decimal place inside the template`,
    summary: `Practical console output combines template literal interpolation, multiple-value logging, conditional debug systems, and step-by-step value tracking. These patterns help you monitor game state, trace data transformations, and build toggleable debugging tools for real applications.`
  },
  {
    title: "Console & Output best practices",
    definition: "Console output best practices involve using meaningful labels, appropriate severity levels, structured formatting, and cleanup strategies to maintain readable, useful, and production-ready debugging output.",
    explanation: `A master adventurer doesn't leave random notes scattered across every dungeon floor — they keep an organized, clear, and purposeful journal. The same principle applies to console output. As your codebase grows from a simple quest into an epic saga, your logging discipline determines whether you can navigate it or get lost.

The first rule is labeling: never log a bare value. Always include context about what you're looking at and where it comes from. A log that says "42" tells you nothing a week later. A log that says "[CombatSystem] Damage calculated: 42 (base: 30, bonus: 12)" tells you everything.

Severity levels matter. Using \`console.error()\` for minor issues is like shouting "FIRE!" when someone burns toast — it desensitizes you to real emergencies. Reserve error for actual failures, warn for potential problems, and log for informational output.

Clean up your debugging logs before shipping code. Leftover console statements in production are like leaving your quest markers visible to other players — they clutter the environment and can accidentally expose sensitive information. Many teams use linters to catch stray console statements.

Finally, consider structured logging for complex applications. Instead of ad-hoc string messages, log objects with consistent shapes. This makes it possible to search, filter, and analyze your logs systematically — turning a pile of scattered scrolls into a searchable library.`,
    code: `// Console Best Practices - Level up your debugging game

// PRACTICE 1: Always label your output with context
// Bad: console.log(42);
// Good: console.log("[DamageCalc] Final damage:", 42);

// PRACTICE 2: Use a structured logger utility
const Logger = {
  info: (module, msg, data) =>
    console.log(\`[INFO][\${module}] \${msg}\`, data ?? ""),
  warn: (module, msg, data) =>
    console.warn(\`[WARN][\${module}] \${msg}\`, data ?? ""),
  error: (module, msg, data) =>
    console.error(\`[ERROR][\${module}] \${msg}\`, data ?? "")
};

Logger.info("Inventory", "Item added", { item: "Phoenix Feather", qty: 1 });
Logger.warn("Combat", "Player HP below 20%", { hp: 18, maxHp: 100 });
Logger.error("SaveSystem", "Failed to write save file", { slot: 3 });

// PRACTICE 3: Use console.table for collections
const inventory = [
  { item: "Health Potion", qty: 5, value: 50 },
  { item: "Mana Crystal", qty: 3, value: 75 },
  { item: "Iron Sword", qty: 1, value: 200 }
];
console.table(inventory);

// PRACTICE 4: Group related logs together
console.group("Level Up Summary");
Logger.info("LevelUp", "New level: 15");
Logger.info("LevelUp", "Stats increased", { str: +2, int: +3 });
Logger.info("LevelUp", "New ability unlocked: Fireball III");
console.groupEnd();

// PRACTICE 5: Performance-aware logging
const startTime = performance.now();
// ... heavy computation simulation ...
const elapsed = performance.now() - startTime;
Logger.info("Perf", \`Render completed in \${elapsed.toFixed(2)}ms\`);`,
    breakdown: `• The \`Logger\` object — creates a reusable utility with info/warn/error methods that prepend severity and module labels
• \`data ?? ""\` — uses nullish coalescing to avoid logging "undefined" when no data object is provided
• \`Logger.info("Inventory", "Item added", {...})\` — demonstrates clean, labeled, structured logging with context
• \`Logger.warn("Combat", ...)\` — appropriate use of warn level for a concerning but non-critical situation
• \`Logger.error("SaveSystem", ...)\` — reserves error level for actual failures that need attention
• \`console.table(inventory)\` — displays the inventory array as a clean table instead of a jumbled object dump
• \`console.group("Level Up Summary")\` — groups related log entries under a collapsible header for organization
• \`performance.now()\` — uses the high-resolution timer for accurate performance measurement instead of Date.now()
• \`elapsed.toFixed(2)\` — formats the timing to two decimal places for readable performance output`,
    summary: `Best practices for console output include always labeling values with context, using appropriate severity levels, creating reusable logger utilities, grouping related output, cleaning up debug logs before production, and measuring performance with high-resolution timers.`
  }
];
