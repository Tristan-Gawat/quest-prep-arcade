// Pre-written full lessons for JavaScript Module: Loops & Iteration
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const jsLoopsIterationLessons = [
  {
    title: "What is Loops & Iteration?",
    definition: "Loops and iteration are JavaScript's mechanisms for executing a block of code repeatedly — whether a fixed number of times, over each element of a collection, or until a condition is met. They are the backbone of any game loop, data processing pipeline, or interactive system.",
    explanation: `Imagine you're building an RPG and need to spawn 50 enemies on a battlefield, check every item in a player's inventory for enchantments, or keep a game running until the player's health hits zero. Writing the same code 50 times would be madness — loops let you write it once and repeat automatically.

JavaScript provides several loop types, each designed for different scenarios. The 'for' loop is your workhorse for counting — repeat something a known number of times. The 'while' loop keeps going as long as a condition stays true, perfect for game loops where you don't know how many frames will pass. The 'do...while' variant guarantees at least one execution before checking the condition.

Modern JavaScript adds 'for...of' to iterate directly over array values, strings, Maps, and Sets — no index tracking needed. Meanwhile 'for...in' walks through an object's enumerable property keys, useful for inspecting player stats or config objects. The Array method .forEach() provides a functional approach, calling a callback for each element.

Understanding iteration is critical because nearly every program involves processing collections of data: rendering a list of quest objectives, summing damage from multiple hits, filtering loot drops by rarity, or animating sprites across frames. Mastering loops means mastering the ability to automate repetitive logic efficiently.

The key difference between loop types is WHEN they check their condition and WHAT they iterate over. A for loop checks before each iteration and counts numerically. A while loop checks before each iteration but uses any boolean expression. A for...of loop pulls values from an iterable protocol. Choosing the right loop makes your code clearer and less error-prone.`,
    code: `// Basic for loop — spawn enemies on the battlefield
console.log("⚔️ Spawning enemies:");
for (let i = 1; i <= 5; i++) {
  console.log(\`  Enemy #\${i} spawned at position \${i * 100}\`);
}

// while loop — game loop that runs until HP is zero
let playerHP = 100;
let round = 1;
console.log("\\n🎮 Battle sequence:");
while (playerHP > 0) {
  const damage = Math.floor(Math.random() * 30) + 10;
  playerHP -= damage;
  console.log(\`  Round \${round}: took \${damage} damage | HP: \${Math.max(playerHP, 0)}\`);
  round++;
}
console.log("💀 Game Over!");

// do...while — always executes at least once
let lootRarity;
let attempts = 0;
do {
  lootRarity = Math.floor(Math.random() * 100);
  attempts++;
} while (lootRarity < 90); // Keep rolling until rare loot
console.log(\`\\n🎁 Got legendary loot (rarity: \${lootRarity}) after \${attempts} rolls!\`);`,
    breakdown: `Let's analyze each section of the code:

• for (let i = 1; i <= 5; i++) — Three parts separated by semicolons: initialization (let i = 1), condition checked BEFORE each iteration (i <= 5), and increment executed AFTER each iteration (i++). The loop runs 5 times with i values 1, 2, 3, 4, 5.

• \`Enemy #\${i} spawned at position \${i * 100}\` — Template literal using backticks. The \${} syntax embeds expressions directly in strings. i * 100 gives positions 100, 200, 300, 400, 500.

• while (playerHP > 0) — Checks the condition BEFORE each iteration. If playerHP starts at 0 or below, the loop body never executes. Each iteration reduces HP by random damage.

• Math.floor(Math.random() * 30) + 10 — Generates random integer between 10-39. Math.random() gives 0 to 0.999..., multiply by 30 gives 0-29.999, floor rounds down, then +10 shifts the range up.

• Math.max(playerHP, 0) — Prevents displaying negative HP. If playerHP is -5, this returns 0 for display purposes while the actual value still triggers loop exit.

• round++ — Post-increment operator, same as round = round + 1. Tracks which round we're on for display.

• do { ... } while (lootRarity < 90) — Executes the body FIRST, then checks the condition. Guarantees at least one loot roll even if the first roll is >= 90. The semicolon after the while condition is required.

• The do...while pattern is perfect for "try at least once" scenarios like rolling for loot, prompting for input, or initializing a connection before checking if it succeeded.`,
    summary: `Loops repeat code automatically in JavaScript. The 'for' loop counts with three parts (init; condition; increment). The 'while' loop repeats as long as a condition is true, checking BEFORE each run. The 'do...while' loop guarantees at least one execution by checking AFTER. Choose for when counting, while for unknown iterations, and do...while when you need at least one attempt.`
  },

  {
    title: "How Loops & Iteration works",
    definition: "JavaScript loops work by repeatedly evaluating a condition and executing a block of code. The for...of loop uses the iterable protocol to pull values from arrays and strings, while for...in enumerates an object's keys. Understanding the execution order and scope rules prevents common bugs like off-by-one errors and closure traps.",
    explanation: `Under the hood, JavaScript's loop mechanics follow precise execution orders that determine when conditions are checked, when variables update, and what scope those variables live in.

The for loop executes in a strict order: (1) initialization runs ONCE at the start, (2) condition is checked BEFORE each iteration — if false, the loop never runs, (3) the body executes, (4) the update expression runs AFTER the body. Then steps 2-4 repeat. This means the update (i++) happens at the END of each cycle, not the beginning.

The for...of loop leverages JavaScript's ITERABLE PROTOCOL. Arrays, strings, Maps, Sets, and NodeLists all implement Symbol.iterator, which returns an iterator object with a next() method. Each call to next() returns { value, done }. When done is true, the loop stops. You get clean access to VALUES without managing indices.

The for...in loop is fundamentally different — it iterates over an object's ENUMERABLE PROPERTY KEYS (as strings). This includes inherited properties from the prototype chain unless you guard with hasOwnProperty(). It's designed for objects, not arrays, because array indices are just string keys and the order isn't guaranteed in older engines.

A critical gotcha is the var vs let distinction in loops. Using var creates a single variable shared across all iterations — closures capture the SAME variable. Using let creates a new binding for each iteration, so closures correctly capture each iteration's value. This is the classic "setTimeout in a loop" bug that has tripped up countless developers.

The event loop interacts with loops too. A long-running synchronous loop BLOCKS the main thread — no UI updates, no event handling, nothing. For heavy processing, you need to break work into chunks using requestAnimationFrame, setTimeout, or Web Workers to keep the game responsive.`,
    code: `// for...of — iterate over array VALUES directly
const questLog = ["Defeat Dragon", "Find Artifact", "Save Village"];
console.log("📜 Active Quests:");
for (const quest of questLog) {
  console.log(\`  → \${quest}\`);
}

// for...of with strings — character by character
const spellName = "FIREBALL";
let encoded = "";
for (const char of spellName) {
  encoded += char + "✦";
}
console.log(\`\\n✨ Spell encoding: \${encoded}\`);

// for...in — iterate over object KEYS
const heroStats = { strength: 18, agility: 14, intellect: 22, luck: 7 };
console.log("\\n🦸 Hero Stats:");
for (const stat in heroStats) {
  const bar = "█".repeat(Math.floor(heroStats[stat] / 3));
  console.log(\`  \${stat.padEnd(12)} \${heroStats[stat].toString().padStart(3)} \${bar}\`);
}

// The var vs let closure trap
console.log("\\n⏰ Scheduling attacks (let — correct):");
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(\`  Attack \${i} fired!\`), i * 100);
}
// With var, ALL would print "Attack 4 fired!" because var is function-scoped

// Iterating a Map with for...of
const inventory = new Map([
  ["health_potion", 5],
  ["mana_potion", 3],
  ["elixir", 1]
]);
console.log("\\n🎒 Inventory (Map):");
for (const [item, count] of inventory) {
  console.log(\`  \${item}: x\${count}\`);
}`,
    breakdown: `Let's trace through each iteration pattern:

• for (const quest of questLog) — The 'of' keyword pulls VALUES from the array. First iteration: quest = "Defeat Dragon". Second: quest = "Find Artifact". No index management needed. Use 'const' since we don't reassign quest within the body.

• for (const char of spellName) — Strings are iterable in JavaScript. Each iteration yields one character: "F", "I", "R", "E", "B", "A", "L", "L". This correctly handles Unicode characters unlike charAt() with index.

• for (const stat in heroStats) — The 'in' keyword iterates over KEYS as strings. stat becomes "strength", "agility", "intellect", "luck". Access values with bracket notation: heroStats[stat].

• "█".repeat(Math.floor(heroStats[stat] / 3)) — Creates a visual bar. 22 / 3 = 7.33, floored to 7, gives 7 block characters. A simple text-based visualization.

• stat.padEnd(12) — Pads the stat name with spaces to 12 characters total, creating aligned columns. "luck" becomes "luck        " (8 trailing spaces).

• for (let i = 1; i <= 3; i++) with setTimeout — Each iteration creates a NEW 'i' binding thanks to 'let'. The closure in setTimeout captures that specific iteration's 'i'. With 'var', there's only ONE 'i' that ends up as 4 after the loop finishes.

• const [item, count] of inventory — Map entries are [key, value] pairs. Destructuring in the for...of header splits each entry into named variables. This is clean iteration over key-value pairs.

• Maps maintain insertion order, unlike plain objects in older JavaScript engines. for...of on a Map always yields entries in the order they were added.`,
    summary: `for...of iterates over VALUES from any iterable (arrays, strings, Maps, Sets) using the iterable protocol. for...in iterates over an object's enumerable KEYS as strings — use it for objects, not arrays. Always use 'let' (not 'var') in for loops to avoid closure bugs where all iterations share one variable. Maps preserve insertion order and support destructuring in for...of loops.`
  },

  {
    title: "Loops & Iteration syntax & usage",
    definition: "JavaScript provides forEach for functional-style iteration, break and continue for flow control within loops, labeled statements for nested loop control, and Array methods like map/filter/reduce that often replace traditional loops with more expressive patterns.",
    explanation: `Beyond basic for and while loops, JavaScript offers powerful tools for controlling iteration flow and expressing complex data transformations concisely.

The forEach() method is an array method that calls a function for each element. It receives the current value, index, and the array itself as arguments. Unlike for...of, forEach cannot be stopped early with break — it always processes every element. Use it when you want side effects (logging, DOM updates) for each item and don't need early termination.

break and continue give you fine-grained control inside any loop. break immediately exits the entire loop — no more iterations run. continue skips the rest of the current iteration and jumps to the next one. These are your tools for search patterns (break when found) and filter patterns (continue to skip unwanted items).

For nested loops, JavaScript supports labeled statements. A label is a name followed by a colon before a loop. You can then use "break labelName" or "continue labelName" to control an outer loop from inside an inner loop. Without labels, break and continue only affect the innermost loop.

Modern JavaScript often replaces loops entirely with array methods: map() transforms each element, filter() selects elements meeting a condition, reduce() accumulates elements into a single value, find() locates the first match, and some()/every() test conditions across elements. These are declarative — you say WHAT you want, not HOW to iterate.

The choice between loops and array methods depends on context. Use loops when you need break/continue, complex multi-step logic, or mutation. Use array methods when transforming data immutably, chaining operations, or writing functional-style code. In game development, loops are common for update cycles while array methods shine for data processing.`,
    code: `// forEach — functional iteration with index
const party = ["Warrior", "Mage", "Healer", "Rogue", "Ranger"];
console.log("🎮 Party Roster:");
party.forEach((member, index) => {
  const role = index === 0 ? "(Leader)" : "";
  console.log(\`  [\${index + 1}] \${member} \${role}\`);
});

// break — exit loop early when target found
const dungeon = ["empty", "trap", "empty", "treasure", "boss", "empty"];
console.log("\\n🏰 Exploring dungeon rooms:");
for (let room = 0; room < dungeon.length; room++) {
  console.log(\`  Room \${room + 1}: \${dungeon[room]}\`);
  if (dungeon[room] === "treasure") {
    console.log("  💰 Treasure found! Stopping exploration.");
    break; // Stop — no need to check remaining rooms
  }
}

// continue — skip unwanted iterations
const lootDrops = [12, 3, 45, 7, 89, 2, 67, 1, 34];
console.log("\\n🎁 Valuable loot only (worth > 10):");
for (const loot of lootDrops) {
  if (loot <= 10) continue; // Skip junk items
  console.log(\`  → \${loot} gold worth of loot collected\`);
}

// Labeled break — escape nested loops
console.log("\\n🗺️ Searching 3x3 grid for hidden boss:");
const grid = [
  ["empty", "empty", "empty"],
  ["empty", "boss", "empty"],
  ["empty", "empty", "empty"]
];
outerSearch:
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === "boss") {
      console.log(\`  🐉 Boss found at [\${row}, \${col}]!\`);
      break outerSearch; // Exits BOTH loops
    }
  }
}`,
    breakdown: `Let's examine each flow control mechanism:

• party.forEach((member, index) => { ... }) — Calls the arrow function once per element. First call: member="Warrior", index=0. forEach always processes ALL elements — you cannot break out of it. Use for...of if you need break.

• index === 0 ? "(Leader)" : "" — Ternary operator marks the first party member as leader. The conditional expression returns one of two values based on the condition.

• if (dungeon[room] === "treasure") { break; } — The moment we find treasure, break immediately terminates the for loop. Rooms after "treasure" (including "boss") are never visited. This is efficient — no wasted work.

• if (loot <= 10) continue — When loot is 10 or less, continue skips the console.log below it and jumps directly to the next iteration. Items worth 3, 7, 2, and 1 are all skipped. Only values > 10 reach the print statement.

• outerSearch: — A label marking the outer for loop. This is just a name (any valid identifier) followed by a colon, placed immediately before the loop statement.

• break outerSearch — Exits the loop LABELED "outerSearch" (the outer loop), not just the inner loop. Without the label, break would only exit the inner col-loop, and the outer row-loop would continue checking remaining rows.

• grid[row][col] — Accesses a 2D array. grid[1][1] is "boss". Nested loops with row/col are the standard pattern for traversing grids, game boards, and pixel data.

• The grid search stops the moment it finds "boss" at [1, 1]. Without the labeled break, it would exit the inner loop but continue with row 2, wasting time on unnecessary iterations.`,
    summary: `forEach calls a function for each array element but cannot be stopped early. break exits a loop immediately — use for searching. continue skips the current iteration — use for filtering. Labeled breaks (break labelName) escape outer loops from within nested loops. Choose forEach for side effects on every element, for...of when you need break/continue, and labeled statements for multi-level loop control.`
  },

  {
    title: "Practical examples of Loops & Iteration",
    definition: "In real game development, loops power inventory systems, damage calculations over multiple targets, XP grinding mechanics, leaderboard rendering, and animation frame processing — any feature that processes collections or repeats actions.",
    explanation: `Let's build real game systems using loops. These patterns appear in actual game code, from indie RPGs to multiplayer servers. Each example demonstrates a practical loop pattern you'll use repeatedly.

An inventory management system needs to iterate through items, calculate total weight, find specific equipment, and display formatted output. This combines for...of with running totals and conditional logic — the bread and butter of game UI code.

A multi-target damage system calculates and applies damage to multiple enemies in a single attack. Area-of-effect spells, cleave attacks, and chain lightning all need to loop through a collection of targets, apply modifiers, and track which enemies are defeated.

An XP grinding simulator demonstrates while loops with multiple exit conditions — the player keeps fighting until resources run out OR a goal is reached. Resource management games, idle clickers, and auto-battlers all use this pattern.

A leaderboard sorter and renderer combines array methods with traditional loops to process, rank, and display player data. This is the pattern behind every scoreboard, ranking page, and competitive ladder in online games.

A wave spawner demonstrates nested loops and timing — spawning groups of enemies in waves with increasing difficulty. Tower defense games, survival modes, and horde modes all rely on nested iteration patterns to control spawn timing and enemy composition.`,
    code: `// Inventory system — weight calculation and item search
const inventory = [
  { name: "Iron Sword", weight: 5, type: "weapon", damage: 25 },
  { name: "Health Potion", weight: 1, type: "consumable", damage: 0 },
  { name: "Dragon Shield", weight: 8, type: "armor", damage: 0 },
  { name: "Fire Staff", weight: 4, type: "weapon", damage: 40 },
  { name: "Mana Potion", weight: 1, type: "consumable", damage: 0 },
  { name: "Gold Ring", weight: 0.5, type: "accessory", damage: 0 }
];

let totalWeight = 0;
const weapons = [];
console.log("🎒 INVENTORY SCAN");
console.log("─".repeat(40));
for (const item of inventory) {
  totalWeight += item.weight;
  if (item.type === "weapon") weapons.push(item);
  console.log(\`  \${item.name.padEnd(16)} | \${item.weight}kg | \${item.type}\`);
}
console.log("─".repeat(40));
console.log(\`  Total weight: \${totalWeight}kg / 30kg capacity\`);
console.log(\`  Weapons found: \${weapons.map(w => w.name).join(", ")}\`);

// Multi-target damage — AoE spell hitting all enemies
const enemies = [
  { name: "Goblin", hp: 50, defense: 5 },
  { name: "Orc", hp: 120, defense: 15 },
  { name: "Skeleton", hp: 40, defense: 2 },
  { name: "Dark Knight", hp: 200, defense: 30 }
];
const spellDamage = 60;

console.log(\`\\n🔥 FIREBALL (base damage: \${spellDamage}):\`);
for (const enemy of enemies) {
  const actualDamage = Math.max(spellDamage - enemy.defense, 1);
  enemy.hp -= actualDamage;
  const status = enemy.hp <= 0 ? "💀 DEFEATED" : \`HP: \${enemy.hp}\`;
  console.log(\`  → \${enemy.name}: -\${actualDamage} dmg [\${status}]\`);
}`,
    breakdown: `Let's trace through the game systems:

• for (const item of inventory) — Iterates each object in the array. 'item' is the full object with name, weight, type, and damage properties. We use 'const' because we never reassign 'item' itself (we modify its properties).

• totalWeight += item.weight — Running total pattern. Starts at 0, adds each item's weight. After all 6 items: 5 + 1 + 8 + 4 + 1 + 0.5 = 19.5kg.

• if (item.type === "weapon") weapons.push(item) — Collecting matches into a separate array. This is a manual filter — forEach and for...of can't return filtered results like .filter() can.

• weapons.map(w => w.name).join(", ") — Chains two array methods: map extracts just the name from each weapon object, then join combines them into a comma-separated string. Clean one-liner for display.

• item.name.padEnd(16) — Pads the item name with spaces to exactly 16 characters, creating neat columns. "Iron Sword" becomes "Iron Sword      " for alignment.

• Math.max(spellDamage - enemy.defense, 1) — Damage formula: base damage minus defense, but never less than 1. The Goblin with 5 defense takes 55 damage. The Dark Knight with 30 defense takes 30 damage. Ensures every hit does something.

• enemy.hp -= actualDamage — Mutates the object directly. After the loop, each enemy's HP is permanently reduced. The Goblin (50 HP - 55 damage) and Skeleton (40 HP - 58 damage) are defeated.

• const status = enemy.hp <= 0 ? "💀 DEFEATED" : \`HP: \${enemy.hp}\` — Ternary chooses the display text based on remaining HP. Defeated enemies show a skull, survivors show remaining health.`,
    summary: `Real game loops combine iteration with running totals, conditional filtering, object mutation, and formatted output. Inventory systems use for...of to scan items and accumulate stats. Damage systems iterate targets while applying formulas and tracking defeats. Array methods like map() and join() create clean display strings. Always use Math.max() in damage calculations to prevent negative values.`
  },

  {
    title: "Loops & Iteration best practices",
    definition: "Professional JavaScript loop code avoids infinite loops with clear exit conditions, prefers const in for...of, uses array methods over manual loops where appropriate, avoids mutating arrays during iteration, caches array lengths for performance, and chooses the right loop type for each situation.",
    explanation: `Writing loops that work is the first step. Writing loops that are efficient, readable, maintainable, and bug-free is the professional standard. These best practices prevent the most common loop-related bugs in JavaScript and make your game code robust.

Avoid infinite loops by ensuring every while loop has a clear path to termination. Every while loop needs at least one of: a variable that changes inside the body, a break statement that can trigger, or an external event that modifies the condition. Add safety counters as a backup — if your game logic has a bug, a safety counter prevents the browser from freezing entirely.

Choose the right loop type for clarity. Use for when counting with a known range. Use for...of when iterating values of a collection. Use for...in only for object keys. Use while when the exit condition isn't count-based. Use forEach for side effects on every element. Using the wrong type makes code confusing and error-prone.

Never mutate an array while iterating it with a length-based for loop or for...of. Removing or adding elements during iteration causes skipped items or infinite loops. Instead, build a new array with filter(), iterate a copy, or loop backwards when removing elements.

Prefer array methods (map, filter, reduce, find, some, every) over manual loops for data transformation. They're declarative (express WHAT, not HOW), chainable, and don't mutate the original. Reserve traditional loops for complex multi-step logic, early termination needs, or async operations.

Cache expensive computations outside loops. If you call a method or access a property that doesn't change between iterations, compute it once before the loop. In game code with 60 FPS updates, even small optimizations inside loops multiply to significant gains.`,
    code: `// GOOD: Safety counter prevents infinite loops
function grindUntilLevelUp(currentXP, xpNeeded) {
  const maxIterations = 10000; // Safety net
  let iterations = 0;
  let xp = currentXP;
  while (xp < xpNeeded && iterations < maxIterations) {
    xp += Math.floor(Math.random() * 20) + 5;
    iterations++;
  }
  return { xp, iterations, reachedSafety: iterations >= maxIterations };
}
const result = grindUntilLevelUp(0, 500);
console.log(\`🎮 Reached \${result.xp} XP in \${result.iterations} battles\`);

// GOOD: Use array methods instead of manual loops for transforms
const monsters = [
  { name: "Slime", level: 2, xp: 10 },
  { name: "Wolf", level: 5, xp: 25 },
  { name: "Dragon", level: 20, xp: 500 },
  { name: "Bat", level: 1, xp: 5 },
  { name: "Golem", level: 15, xp: 200 }
];

// Filter + map + sort chain — declarative and readable
const worthyFoes = monsters
  .filter(m => m.level >= 5)           // Only level 5+
  .map(m => ({ ...m, xp: m.xp * 2 })) // Double XP bonus
  .sort((a, b) => b.level - a.level);  // Highest level first

console.log("\\n⚔️ Worthy Foes (2x XP):");
worthyFoes.forEach(m => {
  console.log(\`  Lv.\${m.level} \${m.name} — \${m.xp} XP\`);
});

// GOOD: Loop backwards when removing elements
const activeEffects = ["shield", "poison", "haste", "burn", "shield"];
console.log(\`\\n🧪 Before cleanup: [\${activeEffects.join(", ")}]\`);
for (let i = activeEffects.length - 1; i >= 0; i--) {
  if (activeEffects[i] === "shield") {
    activeEffects.splice(i, 1); // Safe — backwards doesn't skip
  }
}
console.log(\`   After cleanup:  [\${activeEffects.join(", ")}]\`);

// GOOD: Cache length and reuse computed values
const particles = Array.from({ length: 100 }, (_, i) => ({
  id: i, x: Math.random() * 800, y: Math.random() * 600, speed: Math.random() * 3 + 1
}));
const canvasWidth = 800; // Cache — don't recalculate every frame
const len = particles.length;
for (let i = 0; i < len; i++) {
  particles[i].x = (particles[i].x + particles[i].speed) % canvasWidth;
}
console.log(\`\\n✨ Updated \${len} particle positions\`);`,
    breakdown: `Let's examine each best practice pattern:

• maxIterations = 10000 — A safety counter that guarantees the while loop terminates even if the XP logic has a bug. The condition "iterations < maxIterations" acts as a circuit breaker. Production game code always includes these guards.

• reachedSafety: iterations >= maxIterations — Tells the caller whether the loop terminated normally or hit the safety limit. This helps debug issues — if reachedSafety is true, something might be wrong with the XP formula.

• monsters.filter().map().sort() — Method chaining reads like English: "take monsters, keep those level 5+, double their XP, sort by level descending." Each method returns a NEW array, so the original 'monsters' array is untouched (immutability).

• { ...m, xp: m.xp * 2 } — Spread operator creates a shallow copy of each monster object with the xp property overridden. This avoids mutating the original objects in the monsters array.

• for (let i = activeEffects.length - 1; i >= 0; i--) — Looping BACKWARDS when removing elements. If you splice index 4, then index 3, the remaining indices below are unaffected. Forward looping would skip elements after each splice because indices shift.

• activeEffects.splice(i, 1) — Removes one element at index i, mutating the array in place. When going backwards, this is safe because already-visited indices (higher numbers) are gone, and upcoming indices (lower numbers) haven't shifted.

• Array.from({ length: 100 }, (_, i) => ...) — Creates an array of 100 particle objects. The underscore _ means we ignore the first argument (undefined values). The index i becomes each particle's id.

• const len = particles.length — Caching the length avoids re-reading the property 100 times. In tight game loops running at 60 FPS, this micro-optimization adds up across thousands of iterations per second.

• (particles[i].x + particles[i].speed) % canvasWidth — Modulo (%) creates wrapping behavior. When x exceeds 800, it wraps back to near 0. This makes particles loop around the screen endlessly.`,
    summary: `Loop best practices: always add safety counters to while loops to prevent freezing. Prefer array methods (filter, map, sort) for data transformation — they're chainable, immutable, and declarative. Loop backwards when removing elements from arrays to avoid index-skipping bugs. Cache loop lengths and expensive values computed outside the loop body. Choose the right loop type: for...of for values, for...in for object keys, while for unknown iteration counts, and array methods for functional transforms.`
  }
];
