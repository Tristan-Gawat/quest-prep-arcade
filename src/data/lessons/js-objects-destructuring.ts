// Pre-written full lessons for JavaScript Module: Objects & Destructuring
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const jsObjectsDestructuringLessons = [
  {
    title: "What is Objects & Destructuring?",
    definition: "Objects are JavaScript's primary data structure for grouping related data and behavior under named keys. Destructuring is a modern syntax that extracts values from objects (and arrays) into distinct variables in a single, readable statement — eliminating repetitive property access code.",
    explanation: `In every RPG, a character isn't just a name — it's a collection of stats, equipment, abilities, and status effects all bundled together. JavaScript objects serve this exact purpose: they group related pieces of data under one roof with descriptive key names.

An object is a collection of key-value pairs enclosed in curly braces. Keys (also called properties) are strings (or Symbols), and values can be anything: numbers, strings, arrays, other objects, or even functions (called methods when inside an object). This makes objects incredibly flexible — a single hero object can contain their name, level, stats, inventory array, and attack method.

Destructuring is syntactic sugar introduced in ES6 that lets you "unpack" values from objects into standalone variables. Instead of writing const name = hero.name; const level = hero.level; const hp = hero.hp; you write const { name, level, hp } = hero; — one line instead of three. It's not just shorter; it makes your intent clearer and reduces repetition.

Objects are reference types in JavaScript. When you assign an object to a new variable or pass it to a function, you're copying the REFERENCE (memory address), not the actual data. This means changes through one variable affect all variables pointing to the same object. Understanding this is critical for avoiding unintended mutations in game state.

The combination of objects and destructuring forms the backbone of modern JavaScript applications. React props are objects you destructure. API responses are objects you destructure. Game entity data, configuration, and state are all objects. Mastering these patterns means mastering how data flows through JavaScript programs.`,
    code: `// Object literal — grouping related data
const hero = {
  name: "Aria Shadowblade",
  class: "Rogue",
  level: 15,
  hp: 120,
  maxHP: 150,
  stats: { strength: 12, agility: 22, luck: 18 },
  inventory: ["dagger", "smoke_bomb", "lockpick"],
  isAlive() {
    return this.hp > 0;
  }
};

console.log(\`🦸 \${hero.name} — Lv.\${hero.level} \${hero.class}\`);
console.log(\`❤️ HP: \${hero.hp}/\${hero.maxHP}\`);
console.log(\`🗡️ Alive: \${hero.isAlive()}\`);

// Basic destructuring — extract properties into variables
const { name, level, hp } = hero;
console.log(\`\\n📋 Destructured: \${name}, Level \${level}, \${hp} HP\`);

// Nested destructuring — reach into sub-objects
const { stats: { agility, luck } } = hero;
console.log(\`🎯 Agility: \${agility} | 🍀 Luck: \${luck}\`);

// Renaming during destructuring
const { class: heroClass, hp: currentHealth } = hero;
console.log(\`⚔️ Class: \${heroClass} | Health: \${currentHealth}\`);

// Default values — fallback if property is undefined
const { mana = 0, shield = "none" } = hero;
console.log(\`✨ Mana: \${mana} | 🛡️ Shield: \${shield}\`);

// Destructuring in function parameters
const displayStats = ({ name, level, stats: { strength, agility: agi } }) => {
  console.log(\`\\n🎮 \${name} (Lv.\${level}) — STR:\${strength} AGI:\${agi}\`);
};
displayStats(hero);`,
    breakdown: `Let's analyze each object and destructuring pattern:

• const hero = { ... } — Object literal syntax. Key-value pairs separated by commas. Keys become property names, values can be any type: strings, numbers, nested objects, arrays, and functions.

• stats: { strength: 12, agility: 22, luck: 18 } — A NESTED object. Objects can contain other objects, creating hierarchical data structures. Access nested values: hero.stats.agility.

• isAlive() { return this.hp > 0; } — METHOD shorthand. A function inside an object is called a method. 'this' refers to the hero object, so this.hp accesses the hero's hp property.

• const { name, level, hp } = hero — DESTRUCTURING assignment. Creates three const variables (name, level, hp) and assigns them the corresponding property values from hero. Variable names must match property names.

• const { stats: { agility, luck } } = hero — NESTED destructuring. First navigates to hero.stats, then extracts agility and luck from that nested object. Note: 'stats' itself is NOT created as a variable — only agility and luck are.

• const { class: heroClass } = hero — RENAMING with colon syntax. Extracts hero.class but stores it in a variable called heroClass. Necessary here because 'class' is a reserved keyword in JavaScript.

• const { mana = 0, shield = "none" } = hero — DEFAULT values. Since hero has no 'mana' or 'shield' property, the defaults (0 and "none") are used. Without defaults, these would be undefined.

• ({ name, level, stats: { strength, agility: agi } }) — Destructuring directly in the function PARAMETER list. The function receives a hero object and immediately unpacks the needed properties. 'agility: agi' both destructures and renames.`,
    summary: `Objects group related data as key-value pairs — strings, numbers, arrays, nested objects, and methods. Destructuring extracts properties into variables with const { key } = object syntax. Nest destructuring for sub-objects, rename with colon syntax (property: newName), and provide defaults for missing properties. Destructure in function parameters for self-documenting APIs.`
  },

  {
    title: "How Objects & Destructuring works",
    definition: "Objects in JavaScript are dynamic collections stored as hash maps of property names to values. Properties are accessed via dot notation or bracket notation, can be added or removed at runtime, and follow prototype-based inheritance. Destructuring uses pattern matching to bind variables to corresponding property values during assignment.",
    explanation: `Understanding how objects work internally helps you use them effectively, avoid performance pitfalls, and leverage their dynamic nature for powerful patterns in game development.

Objects are stored in memory as HASH MAPS (dictionaries) — key-value lookup tables with O(1) average access time. When you write hero.name, JavaScript hashes the string "name" and directly accesses that memory slot. This is why object property access is fast regardless of how many properties the object has.

DOT NOTATION (hero.name) is the most common access pattern — clean and readable. BRACKET NOTATION (hero["name"]) is equivalent but accepts any expression as the key. This is crucial for dynamic access: when the property name is stored in a variable, computed at runtime, or contains special characters like spaces or hyphens. Game config systems heavily use bracket notation.

JavaScript objects are DYNAMIC — you can add, modify, and delete properties at any time after creation. This is unlike statically typed languages where object shapes are fixed at compile time. This flexibility is powerful (add abilities to a character at runtime) but dangerous (typos create new properties instead of throwing errors).

The PROTOTYPE CHAIN is JavaScript's inheritance mechanism. Every object has a hidden [[Prototype]] link to another object. When you access a property, JavaScript first checks the object itself, then its prototype, then the prototype's prototype, all the way up to Object.prototype (which has methods like toString() and hasOwnProperty()). This is how all objects have access to common methods.

Destructuring works through PATTERN MATCHING. The left side of the assignment mirrors the structure of the right side. JavaScript matches property names in the pattern to property names in the source object, then assigns the values. Unmatched properties in the pattern get undefined (or their default value). Extra properties in the source are simply ignored.`,
    code: `// Dot vs bracket notation
const player = {
  name: "Kael Stormwind",
  "equipped-weapon": "Thunder Axe",
  level: 10,
  skills: { fireball: 5, heal: 3, shield: 7 }
};

// Dot notation — simple, readable
console.log(\`🦸 \${player.name} (Lv.\${player.level})\`);

// Bracket notation — for dynamic access and special keys
console.log(\`🗡️ Weapon: \${player["equipped-weapon"]}\`); // Hyphenated key
const statToCheck = "fireball";
console.log(\`🔥 \${statToCheck} level: \${player.skills[statToCheck]}\`);

// Dynamic property access — iterate skills
console.log("\\n📊 Skill Levels:");
const skillNames = Object.keys(player.skills);
for (const skill of skillNames) {
  const bar = "█".repeat(player.skills[skill]);
  console.log(\`  \${skill.padEnd(10)} Lv.\${player.skills[skill]} \${bar}\`);
}

// Adding and modifying properties dynamically
player.title = "Dragonslayer"; // Add new property
player.level = 11; // Modify existing
console.log(\`\\n🏅 \${player.title} — now Lv.\${player.level}\`);

// Object.keys(), Object.values(), Object.entries()
const loot = { gold: 500, gems: 12, potions: 3, scrolls: 7 };
console.log("\\n💰 Loot Summary:");
console.log(\`  Items: \${Object.keys(loot).join(", ")}\`);
console.log(\`  Counts: \${Object.values(loot).join(", ")}\`);

// Object.entries() for key-value iteration
const totalItems = Object.entries(loot).reduce((total, [item, count]) => {
  console.log(\`  \${item}: \${count}\`);
  return total + count;
}, 0);
console.log(\`  Total: \${totalItems} items\`);

// Computed property names — dynamic key creation
const createStat = (statName, value) => ({
  [statName]: value,
  [\`max\${statName.charAt(0).toUpperCase() + statName.slice(1)}\`]: value * 2
});
console.log("\\n⚡", createStat("mana", 50));`,
    breakdown: `Let's trace through each access pattern:

• player["equipped-weapon"] — Bracket notation is REQUIRED for keys with special characters (hyphens, spaces, dots). Dot notation (player.equipped-weapon) would be interpreted as subtraction! Bracket notation accepts any string expression.

• player.skills[statToCheck] — DYNAMIC access: the variable statToCheck contains "fireball", so this resolves to player.skills.fireball which is 5. This pattern is essential for game UIs where the stat to display is chosen at runtime.

• Object.keys(player.skills) — Returns an array of the object's OWN enumerable string-keyed property names: ["fireball", "heal", "shield"]. Doesn't include inherited prototype properties.

• Object.values(loot) — Returns an array of values: [500, 12, 3, 7]. Paired with keys(), you get both sides of the object separately.

• Object.entries(loot) — Returns an array of [key, value] pairs: [["gold", 500], ["gems", 12], ...]. Perfect for iteration where you need both the key and value.

• .reduce((total, [item, count]) => ..., 0) — Destructures each [key, value] pair right in the callback parameters. 'item' gets the key string, 'count' gets the numeric value. Reduce accumulates the sum starting from 0.

• player.title = "Dragonslayer" — Adding a NEW property to an existing object. JavaScript objects are dynamic — properties can appear and disappear at any time. No need to pre-declare them.

• [statName]: value — COMPUTED PROPERTY NAME. The square brackets around the key mean "evaluate this expression as the property name." If statName is "mana", the key becomes "mana". Without brackets, the literal string "statName" would be the key.

• [\`max\${...}\`]: value * 2 — Computed property with a template literal. If statName is "mana", this creates the key "maxMana". Useful for generating related property names dynamically.`,
    summary: `Access object properties with dot notation (clean, simple) or bracket notation (dynamic keys, special characters). Objects are dynamic — add, modify, or delete properties anytime. Object.keys/values/entries convert objects into iterable arrays for processing. Computed property names ([expression]: value) create dynamic keys at object creation time. Use bracket notation when property names come from variables or user input.`
  },

  {
    title: "Objects & Destructuring syntax & usage",
    definition: "JavaScript provides spread syntax (...) to clone and merge objects, rest syntax to collect remaining properties, shorthand property names when variable names match keys, optional chaining (?.) for safe nested access, and nullish coalescing (??) for precise default values.",
    explanation: `Modern JavaScript has evolved powerful syntax for working with objects. These features eliminate boilerplate, prevent errors, and express common patterns concisely.

The SPREAD OPERATOR (...) with objects creates shallow copies and merges multiple objects together. When you write { ...objA, ...objB }, all properties from both objects are combined into a new object. If both have the same key, the later one wins. This is how game state updates work: spread the old state and override specific properties to create a new state without mutating the original.

REST WITH OBJECTS collects "everything else" into a new object. When destructuring, ...rest gathers all properties NOT explicitly destructured into a separate object. This is powerful for extracting some properties while passing the remainder along — like pulling out 'id' for routing while forwarding all other props to a component.

SHORTHAND PROPERTY NAMES eliminate redundancy when a variable name matches the desired key name. Instead of { name: name, level: level }, you write { name, level }. JavaScript understands that the key and value share the same name. Method shorthand (attack() { }) similarly drops the ': function' syntax.

OPTIONAL CHAINING (?.) safely accesses deeply nested properties without checking each level for null/undefined. player?.equipment?.weapon?.damage returns undefined if any link in the chain is nullish, instead of throwing a TypeError. This is essential for game data where entities might not have all properties loaded.

NULLISH COALESCING (??) provides defaults specifically for null or undefined (not for 0, "", or false). This is more precise than || which treats ALL falsy values as "missing." For game stats, player.damage ?? 10 correctly preserves 0 damage (a valid value) while defaulting truly missing properties.`,
    code: `// Spread — shallow clone and merge objects
const baseStats = { hp: 100, mp: 50, attack: 10, defense: 8 };
const levelBonus = { attack: 5, defense: 3, speed: 12 };

// Merge: levelBonus overrides matching keys in baseStats
const finalStats = { ...baseStats, ...levelBonus };
console.log("📊 Merged stats:", finalStats);

// Clone and modify without mutating original
const warrior = { name: "Grok", level: 5, hp: 200 };
const leveledUp = { ...warrior, level: warrior.level + 1, hp: 250 };
console.log("⬆️ Leveled:", leveledUp);
console.log("🔒 Original:", warrior); // Unchanged!

// Rest — collect remaining properties
const fullItem = { id: "sw01", name: "Flame Sword", damage: 45, rarity: "epic", weight: 5 };
const { id, name, ...itemDetails } = fullItem;
console.log(\`\\n🗡️ Item \${id}: \${name}\`);
console.log("  Details:", itemDetails); // { damage: 45, rarity: "epic", weight: 5 }

// Shorthand properties and methods
const playerName = "Shadow";
const playerLevel = 20;
const playerClass = "Assassin";
// Keys auto-match variable names
const profile = { playerName, playerLevel, playerClass, isActive: true };
console.log("\\n🎮 Profile:", profile);

// Optional chaining — safe nested access
const dungeon = {
  boss: { name: "Lich King", phase2: { enrage: true, damage: 999 } },
  miniBoss: null
};
console.log(\`\\n🐉 Boss enrage: \${dungeon.boss?.phase2?.enrage}\`); // true
console.log(\`👻 Mini-boss name: \${dungeon.miniBoss?.name}\`); // undefined (no error!)
console.log(\`❓ Secret: \${dungeon.secretRoom?.treasure?.value ?? "nothing found"}\`);

// Nullish coalescing vs OR operator
const settings = { volume: 0, username: "", vibration: null };
console.log(\`\\n🔊 Volume (??): \${settings.volume ?? 50}\`);    // 0 (preserved!)
console.log(\`🔊 Volume (||): \${settings.volume || 50}\`);     // 50 (wrong — treats 0 as falsy)
console.log(\`📳 Vibration: \${settings.vibration ?? true}\`);   // true (null triggers default)`,
    breakdown: `Let's trace through each pattern:

• { ...baseStats, ...levelBonus } — Spreads ALL properties from baseStats into a new object, then spreads levelBonus. Both have 'attack' and 'defense', so levelBonus values WIN (later spread overrides earlier). The result combines all unique properties with overridden conflicts.

• { ...warrior, level: warrior.level + 1, hp: 250 } — Creates a SHALLOW COPY of warrior, then overrides level and hp. The original warrior object is NEVER modified. This is the immutable update pattern used in Redux and game state management.

• const { id, name, ...itemDetails } = fullItem — Destructures id and name into variables, then REST (...itemDetails) collects everything ELSE into a new object. itemDetails contains damage, rarity, and weight — everything except what was explicitly extracted.

• { playerName, playerLevel, playerClass, isActive: true } — SHORTHAND: when the variable name matches the desired key name, just write the name once. playerName becomes the key "playerName" with the value of the playerName variable. Mix shorthand with regular key-value pairs freely.

• dungeon.boss?.phase2?.enrage — Each ?. checks if the preceding value is null or undefined. If boss exists AND phase2 exists, access enrage. If ANY link is nullish, the entire expression short-circuits to undefined instead of throwing TypeError.

• dungeon.miniBoss?.name — miniBoss is null, so ?.name returns undefined gracefully. Without ?., this would throw: "Cannot read property 'name' of null."

• settings.volume ?? 50 — Nullish coalescing: returns the right side ONLY if the left is null or undefined. 0 is NOT null/undefined, so 0 is preserved. This is correct behavior for game volume (0 = muted is valid).

• settings.volume || 50 — Logical OR: returns the right side for ANY falsy value (0, "", false, null, undefined, NaN). This incorrectly treats volume=0 as "missing" and defaults to 50. Use ?? for precise null/undefined checks.`,
    summary: `Spread (...) clones objects shallowly and merges multiple objects (later wins on conflicts). Rest (...rest) in destructuring collects remaining properties into a new object. Shorthand properties ({ name }) eliminate redundancy when keys match variable names. Optional chaining (?.) safely navigates nested properties without null errors. Nullish coalescing (??) defaults only for null/undefined — more precise than || which treats 0 and "" as missing.`
  },

  {
    title: "Practical examples of Objects & Destructuring",
    definition: "In real game development, objects and destructuring power character stat systems, inventory managers, configuration merging, entity-component architectures, save/load systems, and API response handling — any system that stores, transforms, and passes structured data.",
    explanation: `Let's build real game systems using objects and destructuring. These patterns appear in production game code, from character creation screens to multiplayer state synchronization.

A character creation system uses object literals, spread for applying race/class bonuses, and destructuring for clean stat display. This mirrors real RPG character builders where base stats are modified by player choices.

An equipment system demonstrates nested objects, computed properties for stat calculations, and destructuring to extract what each UI panel needs. Games constantly split equipment data between inventory view, stat sheet, and tooltip displays.

A game state manager uses immutable updates with spread to track state changes without mutation. This pattern (inspired by Redux) makes undo/redo trivial — just store each state snapshot. It also prevents the notorious "mutating shared state" bugs in multiplayer games.

A loot table system shows how Object.entries, destructuring, and random selection work together to create weighted random drops. Every RPG and looter game uses weighted probability tables for item drops.

A configuration merger demonstrates deep merging of default settings with user overrides, using spread and careful nesting. Game settings, difficulty modifiers, and mod configurations all need this pattern.`,
    code: `// Character creation with spread-based stat modifiers
const baseHero = { hp: 100, mp: 50, str: 10, agi: 10, int: 10, luk: 10 };
const raceBonus = { elf: { agi: 5, int: 3, mp: 20 }, orc: { str: 8, hp: 50 }, human: { luk: 5, hp: 10, mp: 10 } };
const classBonus = { mage: { int: 7, mp: 40 }, warrior: { str: 5, hp: 30 }, rogue: { agi: 6, luk: 3 } };

const createHero = (name, race, heroClass) => {
  const rMod = raceBonus[race] || {};
  const cMod = classBonus[heroClass] || {};
  // Merge base + race + class (later values override)
  const stats = { ...baseHero };
  for (const [key, val] of Object.entries(rMod)) stats[key] = (stats[key] || 0) + val;
  for (const [key, val] of Object.entries(cMod)) stats[key] = (stats[key] || 0) + val;
  return { name, race, class: heroClass, ...stats };
};
const myHero = createHero("Elyndra", "elf", "mage");
console.log("🧝 Created hero:", myHero);

// Equipment system with stat calculations
const equipment = {
  weapon: { name: "Staff of Frost", damage: 35, bonus: { int: 8, mp: 15 } },
  armor: { name: "Silk Robe", defense: 12, bonus: { mp: 20, int: 3 } },
  ring: { name: "Lucky Charm", bonus: { luk: 10, agi: 2 } }
};

const calculateEquipBonuses = (equip) => {
  const totals = {};
  for (const [slot, item] of Object.entries(equip)) {
    const { bonus = {} } = item;
    for (const [stat, val] of Object.entries(bonus)) {
      totals[stat] = (totals[stat] || 0) + val;
    }
  }
  return totals;
};
console.log("\\n⚔️ Equipment bonuses:", calculateEquipBonuses(equipment));

// Game state — immutable updates
let gameState = { level: 1, score: 0, lives: 3, combo: 0, items: [] };

const updateState = (state, action) => {
  switch (action.type) {
    case "SCORE":
      return { ...state, score: state.score + action.points, combo: state.combo + 1 };
    case "DEATH":
      return { ...state, lives: state.lives - 1, combo: 0 };
    case "LEVEL_UP":
      return { ...state, level: state.level + 1 };
    case "COLLECT":
      return { ...state, items: [...state.items, action.item] };
    default:
      return state;
  }
};

gameState = updateState(gameState, { type: "SCORE", points: 100 });
gameState = updateState(gameState, { type: "SCORE", points: 200 });
gameState = updateState(gameState, { type: "COLLECT", item: "star" });
gameState = updateState(gameState, { type: "LEVEL_UP" });
const { level, score, combo, items } = gameState;
console.log(\`\\n🎮 State: Lv.\${level} | Score: \${score} | Combo: x\${combo}\`);
console.log(\`📦 Items: [\${items.join(", ")}]\`);`,
    breakdown: `Let's trace through these game systems:

• const createHero = (name, race, heroClass) => — Factory function that builds a hero by merging base stats with race and class modifiers. Each bonus is additive: elf gets +5 agi, mage gets +7 int, they stack.

• for (const [key, val] of Object.entries(rMod)) stats[key] = (stats[key] || 0) + val — Iterates race bonus entries and ADDS to existing base stats. The || 0 handles cases where a bonus references a stat that might not exist in base. This is additive merging (not overwriting).

• return { name, race, class: heroClass, ...stats } — Combines identity info with all stats into one flat object. Shorthand properties for name and race, explicit 'class' key (renamed from heroClass), and spread for all stats.

• const { bonus = {} } = item — Destructuring with default: if an equipment piece has no bonus property, use an empty object. This prevents errors when iterating entries of undefined.

• totals[stat] = (totals[stat] || 0) + val — Accumulator pattern: if the stat key doesn't exist yet in totals, treat it as 0 and add the value. Builds up total bonuses across all equipment slots.

• const updateState = (state, action) => { switch... } — REDUCER pattern from Redux/game architecture. Takes current state + action, returns NEW state. Never mutates the input. Each case spreads old state and overrides specific properties.

• { ...state, score: state.score + action.points, combo: state.combo + 1 } — Immutable update: copies ALL existing state properties, then overrides score and combo with new values. Other properties (lives, items, level) carry forward unchanged.

• [...state.items, action.item] — Creates a new array with all existing items PLUS the new one. The spread inside array brackets copies the old array without mutating it.

• const { level, score, combo, items } = gameState — Destructures the final state for clean access. One line gives you four named variables ready for display.`,
    summary: `Real game objects use factory functions with spread for character creation (base + race + class modifiers). Equipment systems iterate entries to sum bonuses across slots. State management uses the reducer pattern: spread old state, override changed properties, return new object (never mutate). Array state updates use [...oldArray, newItem]. Destructure game state for clean variable access in UI rendering.`
  },

  {
    title: "Objects & Destructuring best practices",
    definition: "Professional JavaScript object code uses Object.freeze() for constants, avoids deep mutation, prefers immutable patterns with spread, validates object shapes, uses descriptive property names, and leverages destructuring for clean function interfaces — making code predictable and maintainable.",
    explanation: `Writing clean, bug-free object code requires discipline around mutability, naming, and structure. These best practices prevent the most common object-related bugs in game development.

IMMUTABILITY BY DEFAULT: Treat objects as immutable whenever possible. Instead of modifying properties in place, create new objects with spread. This eliminates an entire class of bugs where one system changes data that another system is still reading. In game state, immutable updates make undo/redo trivial and prevent race conditions in multiplayer code.

Object.freeze() prevents any modification to an object — adding, removing, or changing properties all silently fail (or throw in strict mode). Use it for configuration constants, lookup tables, and enum-like objects that should NEVER change. Note: freeze is SHALLOW — nested objects are not frozen automatically.

VALIDATE OBJECT SHAPES at system boundaries. When receiving data from APIs, user input, or other modules, verify the object has the expected structure before using it. Optional chaining (?.) handles missing nested properties gracefully, while explicit validation functions can throw meaningful errors for debugging.

PREFER DESTRUCTURING in function parameters to make interfaces self-documenting. A function signature like ({ name, level, stats }) => tells readers exactly what properties are needed. Combined with default values, this creates robust, flexible APIs that are hard to misuse.

AVOID DEEP NESTING — flat objects are easier to spread, destructure, and compare. When you need hierarchy, keep it to 2-3 levels maximum. Deep nesting leads to complex optional chaining, brittle destructuring patterns, and difficulty in creating immutable updates. Consider separate flat objects linked by IDs instead.`,
    code: `// GOOD: Object.freeze for constants
const DAMAGE_TYPES = Object.freeze({
  PHYSICAL: "physical",
  MAGICAL: "magical",
  TRUE: "true"
});
const RARITY_COLORS = Object.freeze({
  common: "#ffffff",
  rare: "#0070dd",
  epic: "#a335ee",
  legendary: "#ff8000"
});
// DAMAGE_TYPES.PHYSICAL = "hacked"; // Silently fails (throws in strict mode)
console.log(\`⚔️ Types: \${Object.values(DAMAGE_TYPES).join(", ")}\`);

// GOOD: Immutable updates — never mutate directly
const applyDamage = (entity, amount) => ({
  ...entity,
  hp: Math.max(entity.hp - amount, 0),
  lastHit: Date.now()
});
const addBuff = (entity, buff) => ({
  ...entity,
  buffs: [...(entity.buffs || []), buff]
});

let boss = { name: "Dragon", hp: 500, buffs: ["fire_aura"] };
boss = applyDamage(boss, 75);
boss = addBuff(boss, "enrage");
console.log(\`\\n🐉 Boss: \${boss.hp} HP | Buffs: \${boss.buffs.join(", ")}\`);

// GOOD: Validate object shape at boundaries
const validateItem = (item) => {
  const required = ["name", "type", "rarity"];
  const missing = required.filter(key => !(key in item));
  if (missing.length > 0) {
    throw new Error(\`Invalid item: missing \${missing.join(", ")}\`);
  }
  return { damage: 0, defense: 0, value: 0, ...item }; // Apply defaults
};
const sword = validateItem({ name: "Iron Sword", type: "weapon", rarity: "common", damage: 15 });
console.log("\\n✅ Validated item:", sword);

// GOOD: Clean function interfaces with destructuring + defaults
const renderTooltip = ({
  name,
  rarity = "common",
  damage = 0,
  defense = 0,
  description = "No description"
} = {}) => {
  const color = RARITY_COLORS[rarity] || "#ffffff";
  console.log(\`\\n┌─── \${name} ───┐\`);
  console.log(\`│ Rarity: \${rarity} (color: \${color})\`);
  if (damage) console.log(\`│ ⚔️ Damage: +\${damage}\`);
  if (defense) console.log(\`│ 🛡️ Defense: +\${defense}\`);
  console.log(\`│ \${description}\`);
  console.log(\`└\${"─".repeat(name.length + 8)}┘\`);
};
renderTooltip({ name: "Flame Blade", rarity: "epic", damage: 45, description: "Burns enemies on hit" });

// GOOD: Flat structures linked by ID (not deeply nested)
const entities = {
  player1: { id: "player1", name: "Hero", hp: 100, equipmentIds: ["eq1", "eq2"] },
  enemy1: { id: "enemy1", name: "Goblin", hp: 40, equipmentIds: ["eq3"] }
};
const equipmentById = {
  eq1: { id: "eq1", name: "Steel Sword", slot: "weapon", damage: 30 },
  eq2: { id: "eq2", name: "Iron Shield", slot: "shield", defense: 20 },
  eq3: { id: "eq3", name: "Club", slot: "weapon", damage: 8 }
};
// Access: look up equipment by ID
const playerWeapons = entities.player1.equipmentIds
  .map(id => equipmentById[id])
  .filter(eq => eq.slot === "weapon");
console.log(\`\\n🗡️ Player weapons: \${playerWeapons.map(w => w.name).join(", ")}\`);`,
    breakdown: `Let's examine each best practice:

• Object.freeze(DAMAGE_TYPES) — Makes the object IMMUTABLE. Any attempt to change, add, or delete properties silently fails. Use for constants, enums, and config that should never change. SHALLOW freeze: nested objects inside would still be mutable unless individually frozen.

• applyDamage returns { ...entity, hp: Math.max(...) } — PURE function: takes an entity, returns a NEW object with updated HP. The original entity is never modified. Caller must capture the return value: boss = applyDamage(boss, 75). This prevents bugs where multiple systems reference the same entity object.

• [...(entity.buffs || []), buff] — Safe array append: if entity.buffs is undefined, use empty array as fallback, then spread existing buffs plus the new one. Creates a new array each time (immutable).

• required.filter(key => !(key in item)) — SHAPE VALIDATION: checks if each required key exists in the item object. 'in' operator checks the object AND its prototype chain. Returns array of missing keys for a descriptive error message.

• { damage: 0, defense: 0, value: 0, ...item } — Default properties BEFORE spread. The spread overrides any matching defaults with actual values. This ensures the returned object always has all expected properties.

• ({ name, rarity = "common", ... } = {}) — The outer = {} is a DEFAULT for the entire parameter. If renderTooltip() is called with NO arguments, it receives an empty object instead of undefined. The inner defaults handle individual missing properties.

• Flat structures with IDs: entities reference equipment by ID strings, not by nesting equipment objects inside entity objects. This NORMALIZES the data: update an item once in equipmentById and all entities with that ID see the change. This mirrors how databases and game engines store data.

• .map(id => equipmentById[id]) — Resolves ID references into actual objects. This "join" pattern connects flat data structures for display without creating deep nesting in storage.`,
    summary: `Object best practices: use Object.freeze() for constants and enums. Prefer immutable updates (spread + override) over direct mutation. Validate object shapes at system boundaries with descriptive errors. Design function interfaces with destructured parameters and defaults for self-documenting APIs. Keep data structures flat with ID references instead of deep nesting — normalize like a database for maintainability and performance.`
  }
];
