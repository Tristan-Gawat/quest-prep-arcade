// Pre-written full lessons for JavaScript Module: Functions & Arrow Functions
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const jsFunctionsArrowsLessons = [
  {
    title: "What is Functions & Arrow Functions?",
    definition: "Functions are reusable blocks of code that perform a specific task, accept inputs (parameters), and optionally return an output. Arrow functions (=>) are a concise modern syntax introduced in ES6 that also behaves differently with the 'this' keyword, making them ideal for callbacks and functional programming patterns.",
    explanation: `Think of functions as spells in your spellbook. Each spell has a name, requires certain ingredients (parameters), performs a magical action (the function body), and produces a result (return value). Instead of writing the same incantation every time, you just call the spell by name.

JavaScript has two traditional ways to create functions: function declarations and function expressions. A declaration uses the 'function' keyword followed by a name — it's hoisted, meaning you can call it before it appears in your code. A function expression assigns an anonymous function to a variable — it's NOT hoisted, so you must define it before calling it.

Arrow functions (=>) were added in ES6 as a shorter syntax for writing functions. They remove the 'function' keyword, use a fat arrow (=>) between parameters and body, and have an implicit return for single expressions. They're everywhere in modern JavaScript — callbacks, array methods, event handlers, and React components.

The crucial difference between regular functions and arrow functions goes beyond syntax: arrow functions don't have their own 'this' binding. In a regular function, 'this' depends on HOW the function is called. In an arrow function, 'this' is inherited from the surrounding scope (lexical this). This makes arrows perfect for callbacks inside methods but unsuitable for object methods themselves.

Functions are the fundamental building blocks of JavaScript. They enable code reuse (DRY — Don't Repeat Yourself), abstraction (hiding complex logic behind simple names), modularity (breaking large programs into manageable pieces), and composition (building complex behavior from simple functions). Every game mechanic, UI component, and server endpoint is built from functions.`,
    code: `// Function declaration — hoisted, can be called before definition
console.log(calculateDamage(50, 1.5)); // Works! Hoisting in action

function calculateDamage(baseDamage, multiplier) {
  return Math.floor(baseDamage * multiplier);
}

// Function expression — NOT hoisted, must define before use
const healPlayer = function(currentHP, healAmount, maxHP) {
  const newHP = Math.min(currentHP + healAmount, maxHP);
  return newHP;
};
console.log(\`🩹 Healed to: \${healPlayer(45, 30, 100)} HP\`);

// Arrow function — concise ES6 syntax
const getRandomLoot = (minGold, maxGold) => {
  const gold = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold;
  return \`💰 You found \${gold} gold!\`;
};
console.log(getRandomLoot(10, 50));

// Arrow with implicit return (single expression, no braces)
const doubleXP = (xp) => xp * 2;
const isAlive = (hp) => hp > 0;
const getGreeting = (name) => \`Welcome back, \${name}!\`;

console.log(\`⚔️ Double XP: \${doubleXP(150)}\`);
console.log(\`💀 Is alive (0 HP): \${isAlive(0)}\`);
console.log(getGreeting("DragonSlayer"));

// Single parameter — parentheses optional
const shout = message => message.toUpperCase() + "!!!";
console.log(shout("charge"));`,
    breakdown: `Let's examine each function pattern:

• function calculateDamage(baseDamage, multiplier) — A function DECLARATION. The 'function' keyword starts it, followed by the name. It's HOISTED, meaning JavaScript moves the entire function to the top of its scope during compilation. That's why calling it on line 2 works even though it's defined on line 4.

• console.log(calculateDamage(50, 1.5)) — Calling the function with arguments 50 and 1.5. These values are received as baseDamage and multiplier inside the function. Returns Math.floor(75) = 75.

• const healPlayer = function(...) — A function EXPRESSION. The function is anonymous (no name after 'function') and is assigned to a variable. NOT hoisted — calling healPlayer before this line throws a ReferenceError.

• Math.min(currentHP + healAmount, maxHP) — Caps healing at maxHP. 45 + 30 = 75, and min(75, 100) = 75. If healing would exceed max, returns max instead.

• const getRandomLoot = (minGold, maxGold) => { ... } — Arrow function with a body block (curly braces). When you need multiple statements, you must use braces AND an explicit 'return' keyword.

• const doubleXP = (xp) => xp * 2 — Arrow function with IMPLICIT return. No curly braces means the single expression's result is automatically returned. This is the shortest form.

• const shout = message => message.toUpperCase() + "!!!" — When there's exactly ONE parameter, parentheses around it are optional. Zero or multiple parameters always need parentheses: () => ... or (a, b) => ...

• Each function style has its place: declarations for top-level named functions, expressions for conditional or dynamic functions, arrows for callbacks and short transforms.`,
    summary: `Functions are reusable code blocks with parameters and return values. Declarations (function name() {}) are hoisted — callable before definition. Expressions (const fn = function() {}) are not hoisted. Arrow functions ((args) => result) provide concise syntax with implicit return for single expressions. Single-parameter arrows can omit parentheses. Use declarations for top-level functions and arrows for callbacks and transforms.`
  },

  {
    title: "How Functions & Arrow Functions works",
    definition: "Functions in JavaScript are first-class objects — they can be stored in variables, passed as arguments, returned from other functions, and have properties. When called, a new execution context is created with its own scope. Arrow functions inherit 'this' from their enclosing lexical scope rather than creating their own.",
    explanation: `Understanding HOW functions work internally helps you master closures, callbacks, higher-order functions, and the notorious 'this' keyword. JavaScript functions are more powerful than simple code containers — they're full objects.

When JavaScript encounters a function call, it creates an EXECUTION CONTEXT — a behind-the-scenes environment containing the function's local variables, parameters, and a reference to the outer scope. Parameters are like local variables that get initialized with the argument values. If you pass fewer arguments than parameters, extras are 'undefined'. If you pass more, extras are silently ignored (but accessible via the 'arguments' object in regular functions).

HOISTING works differently for declarations vs expressions. Function declarations are fully hoisted — both the name and body are available at the top of the scope. Const/let function expressions are in the "temporal dead zone" until the assignment line executes — calling them early throws a ReferenceError, not undefined.

The 'this' keyword is where regular and arrow functions fundamentally diverge. In a regular function, 'this' is determined by HOW the function is CALLED (dynamic binding): called as a method (obj.fn()), 'this' is the object; called standalone (fn()), 'this' is undefined in strict mode or window in sloppy mode. In an arrow function, 'this' is determined by WHERE the function is DEFINED (lexical binding) — it captures 'this' from the enclosing scope.

CLOSURES occur because inner functions maintain access to their outer function's variables even after the outer function returns. This is possible because the execution context's variable environment persists as long as any function references it. Closures enable data privacy, factory functions, and memoization — powerful patterns in game development for creating character instances, caching expensive calculations, and maintaining state.`,
    code: `// First-class functions — passing functions as arguments
const applyBuff = (hero, buffFn) => {
  return { ...hero, ...buffFn(hero) };
};

const strengthBuff = (hero) => ({ attack: hero.attack + 10 });
const speedBuff = (hero) => ({ speed: hero.speed + 5 });

let warrior = { name: "Grok", attack: 25, speed: 10 };
warrior = applyBuff(warrior, strengthBuff);
warrior = applyBuff(warrior, speedBuff);
console.log("🦸 Buffed warrior:", warrior);

// 'this' difference — regular vs arrow
const guild = {
  name: "Shadow Knights",
  members: ["Aria", "Kael", "Luna"],

  // Regular function — 'this' refers to guild object
  listMembers() {
    console.log(\`\\n⚔️ \${this.name} roster:\`);
    // Arrow inside method — inherits 'this' from listMembers
    this.members.forEach((member, i) => {
      console.log(\`  [\${i + 1}] \${member} of \${this.name}\`);
    });
  }
};
guild.listMembers();

// Closure — function remembering its creation scope
function createCharacter(className) {
  let level = 1;
  let xp = 0;
  const xpNeeded = 100;

  return {
    gainXP(amount) {
      xp += amount;
      if (xp >= xpNeeded) {
        level++;
        xp -= xpNeeded;
        console.log(\`  🎉 \${className} leveled up to \${level}!\`);
      }
    },
    getStatus() {
      return \`\${className} Lv.\${level} (\${xp}/\${xpNeeded} XP)\`;
    }
  };
}

const mage = createCharacter("Mage");
console.log("\\n🧙 " + mage.getStatus());
mage.gainXP(60);
mage.gainXP(50); // Level up!
console.log("🧙 " + mage.getStatus());`,
    breakdown: `Let's trace through the function mechanics:

• const applyBuff = (hero, buffFn) => — A HIGHER-ORDER FUNCTION: it accepts another function (buffFn) as a parameter. This is possible because functions are first-class objects in JavaScript — they can be passed around like any other value.

• { ...hero, ...buffFn(hero) } — Spread operator merges the original hero with the buff result. buffFn(hero) returns an object like { attack: 35 }. Spreading both creates a new object with all hero properties, overriding any that the buff provides.

• listMembers() { ... } — Method shorthand in an object literal. This is a REGULAR function, so 'this' inside it refers to the 'guild' object (the object the method is called on).

• this.members.forEach((member, i) => { ... }) — The arrow function inside forEach INHERITS 'this' from listMembers. Because listMembers is a regular function called as guild.listMembers(), its 'this' is guild. The arrow captures that same 'this'. If this were a regular function instead, 'this' would be undefined inside forEach.

• function createCharacter(className) — A FACTORY FUNCTION that creates character objects. It declares local variables (level, xp) that become private through closure.

• return { gainXP(...), getStatus() } — Returns an object with methods. These methods are closures — they "close over" the variables level, xp, and xpNeeded from createCharacter's scope. Those variables persist even after createCharacter returns.

• mage.gainXP(60) then mage.gainXP(50) — The closure remembers xp between calls. First call: xp goes from 0 to 60. Second call: xp goes from 60 to 110, triggering the level-up condition.

• level, xp are PRIVATE — there's no way to access them directly from outside. Only gainXP and getStatus can read or modify them. This is encapsulation through closures.`,
    summary: `Functions are first-class objects — pass them as arguments to create higher-order functions. Regular functions determine 'this' dynamically based on how they're called; arrow functions capture 'this' lexically from their enclosing scope. Use arrow functions in callbacks inside methods to preserve 'this'. Closures let inner functions access outer variables even after the outer function returns, enabling data privacy and state persistence.`
  },

  {
    title: "Functions & Arrow Functions syntax & usage",
    definition: "JavaScript functions support default parameters (fallback values when arguments are omitted), rest parameters (...args) for variable-length argument lists, destructured parameters for extracting object properties, and IIFE (Immediately Invoked Function Expressions) for creating isolated scopes.",
    explanation: `Modern JavaScript function syntax includes powerful features that make functions more flexible, self-documenting, and expressive. These features eliminate common boilerplate patterns and make your code more readable.

DEFAULT PARAMETERS provide fallback values when an argument is omitted or explicitly passed as undefined. Before ES6, developers had to write "param = param || defaultValue" which had bugs (it treated 0, "", and false as missing). Default parameters handle this correctly and can even reference earlier parameters or call functions.

REST PARAMETERS (...args) collect all remaining arguments into a real Array. Unlike the old 'arguments' object (which was array-like but not an actual Array), rest parameters give you a proper Array with all methods (map, filter, reduce). They must be the last parameter in the list.

DESTRUCTURED PARAMETERS let you extract specific properties from an object argument directly in the parameter list. Instead of receiving a whole config object and accessing config.name, config.level, etc., you destructure it: ({ name, level }) => .... This makes the function signature self-documenting — you can see exactly what properties it needs.

IIFE (Immediately Invoked Function Expression) is a function that runs the moment it's defined. Wrapped in parentheses and called immediately: (function() { ... })() or (() => { ... })(). Used to create private scopes, initialize modules, and avoid polluting the global namespace. Less common with ES6 modules but still useful for one-time setup logic.

Function composition and currying are advanced patterns built on these features. Currying transforms a function that takes multiple arguments into a series of functions that each take one argument. Composition chains multiple functions where each function's output becomes the next function's input. These patterns are powerful in game systems for creating configurable behaviors.`,
    code: `// Default parameters — fallback values for omitted arguments
const createEnemy = (name, level = 1, hp = level * 50, type = "normal") => {
  return { name, level, hp, type };
};
console.log("👹 Defaults:", createEnemy("Slime"));
console.log("👹 Custom:", createEnemy("Dragon", 20, 1000, "boss"));
console.log("👹 Partial:", createEnemy("Wolf", 5)); // hp = 5 * 50 = 250

// Rest parameters — collect unlimited arguments
const sumDamage = (targetName, ...hits) => {
  const total = hits.reduce((sum, hit) => sum + hit, 0);
  const criticals = hits.filter(h => h >= 50);
  console.log(\`  ⚔️ \${targetName}: \${hits.length} hits, \${total} total damage\`);
  if (criticals.length) console.log(\`  💥 \${criticals.length} critical hits!\`);
  return total;
};
console.log("\\n🎯 Combo Attack:");
sumDamage("Dark Lord", 25, 30, 55, 15, 60, 45);

// Destructured parameters — extract object properties
const displayHero = ({ name, class: heroClass, level, stats: { str, agi } }) => {
  console.log(\`  \${name} the \${heroClass} (Lv.\${level})\`);
  console.log(\`  STR: \${str} | AGI: \${agi}\`);
};
console.log("\\n🦸 Hero Card:");
displayHero({
  name: "Aria",
  class: "Ranger",
  level: 12,
  stats: { str: 14, agi: 22, int: 10 }
});

// IIFE — immediately invoked for one-time setup
const gameConfig = (() => {
  const baseSettings = { difficulty: "normal", volume: 80 };
  const userPrefs = { difficulty: "hard" }; // Simulated load
  return { ...baseSettings, ...userPrefs, initialized: true };
})();
console.log("\\n⚙️ Game config:", gameConfig);

// Currying — configurable function factories
const createAttack = (element) => (power) => (target) => {
  return \`🔥 \${element} attack (\${power} power) hits \${target}!\`;
};
const fireAttack = createAttack("Fire");
const strongFire = fireAttack(80);
console.log("\\n" + strongFire("Goblin"));
console.log(strongFire("Orc"));
console.log(createAttack("Ice")(60)("Skeleton"));`,
    breakdown: `Let's trace through each advanced pattern:

• (name, level = 1, hp = level * 50, type = "normal") — Default parameters are used when arguments are omitted OR explicitly undefined. Note: hp's default REFERENCES the level parameter — defaults can use earlier parameters in the same list.

• createEnemy("Wolf", 5) — Only name and level provided. hp defaults to 5 * 50 = 250 (using the provided level value). type defaults to "normal". This is more robust than the old || pattern which treats 0 as missing.

• const sumDamage = (targetName, ...hits) => — The three dots (...) before 'hits' make it a REST parameter. It collects ALL remaining arguments after targetName into an array. sumDamage("X", 25, 30, 55) gives hits = [25, 30, 55].

• hits.reduce((sum, hit) => sum + hit, 0) — Reduce iterates the hits array, accumulating a sum. Starts at 0, adds each hit value. This is the functional approach to summing an array.

• ({ name, class: heroClass, level, stats: { str, agi } }) — NESTED destructuring in the parameter list. 'class' is renamed to 'heroClass' (since class is a reserved keyword). stats: { str, agi } destructures the nested stats object, extracting only str and agi (ignoring int).

• const gameConfig = (() => { ... })() — IIFE with arrow syntax. The outer parentheses wrap the arrow function, then () immediately calls it. The result (the returned object) is assigned to gameConfig. The internal variables (baseSettings, userPrefs) are gone — private and garbage-collected.

• const createAttack = (element) => (power) => (target) => — CURRYING: a chain of arrow functions, each returning the next. createAttack("Fire") returns a function expecting power. That function returns another expecting target. Each level "remembers" its argument via closure.

• const strongFire = fireAttack(80) — Partially applied: strongFire "remembers" both element="Fire" and power=80. Now it only needs a target. This creates reusable, configurable attack functions.`,
    summary: `Default parameters provide fallbacks when arguments are omitted — they can reference earlier parameters. Rest parameters (...args) collect remaining arguments into a real Array. Destructured parameters extract object properties directly in the function signature, even nested ones. IIFEs create immediate private scopes for initialization. Currying chains single-argument functions via closures, creating configurable function factories.`
  },

  {
    title: "Practical examples of Functions & Arrow Functions",
    definition: "In real game development, functions power damage calculators, buff/debuff systems, event handlers, ability cooldown managers, inventory filters, and character creation factories — any logic that needs to be reusable, composable, or triggered by events.",
    explanation: `Let's build real game systems using functions and arrow functions. These patterns appear in actual game codebases — from indie RPGs to multiplayer online games. Each example shows how function features combine to solve practical problems.

A damage calculation system uses default parameters, higher-order functions, and composition to create flexible, configurable attack behaviors. Different weapon types, elemental bonuses, and critical hit modifiers all compose together through function chaining.

A buff/debuff system demonstrates closures and factory functions to create stateful effects that track duration, stack counts, and automatic expiration. Each buff is an independent instance with its own private timer — closures make this possible without classes.

A cooldown manager uses closures to track when abilities were last used, preventing spam while providing feedback to the player. This pattern is used in every action game, MOBA, and MMO for ability timing.

An event system shows how callbacks and arrow functions create a publish-subscribe pattern — the foundation of game event handling. When a player levels up, multiple systems (UI update, sound effect, achievement check) all respond to the same event through registered callbacks.

An inventory filter system chains arrow functions with array methods to create complex queries — finding all weapons above a certain level, all consumables sorted by healing power, or the single best armor piece. This declarative pattern replaces dozens of lines of imperative loop code.`,
    code: `// Damage calculator with composable modifiers
const baseDamage = (weaponPower, strength) => weaponPower + Math.floor(strength * 0.5);
const applyCrit = (damage, critChance = 0.2) =>
  Math.random() < critChance ? damage * 2 : damage;
const applyElement = (element) => (damage) => {
  const bonuses = { fire: 1.3, ice: 1.1, lightning: 1.5, none: 1.0 };
  return Math.floor(damage * (bonuses[element] || 1.0));
};

const fireBonus = applyElement("fire");
const raw = baseDamage(50, 20); // 50 + 10 = 60
const withCrit = applyCrit(raw, 1.0); // Force crit for demo: 120
const final = fireBonus(withCrit); // 120 * 1.3 = 156
console.log(\`🗡️ Attack chain: \${raw} → crit: \${withCrit} → fire: \${final}\`);

// Cooldown manager using closures
function createCooldownManager(abilityName, cooldownMS) {
  let lastUsed = 0;
  return {
    use() {
      const now = Date.now();
      const elapsed = now - lastUsed;
      if (elapsed < cooldownMS) {
        const remaining = ((cooldownMS - elapsed) / 1000).toFixed(1);
        return \`⏳ \${abilityName} on cooldown (\${remaining}s remaining)\`;
      }
      lastUsed = now;
      return \`✨ \${abilityName} activated!\`;
    },
    reset() { lastUsed = 0; },
    isReady() { return Date.now() - lastUsed >= cooldownMS; }
  };
}

const fireball = createCooldownManager("Fireball", 3000);
console.log("\\n" + fireball.use()); // ✨ Activates
console.log(fireball.use()); // ⏳ On cooldown

// Event system — pub/sub with callbacks
const createEventBus = () => {
  const listeners = {};
  return {
    on(event, callback) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
    },
    emit(event, data) {
      (listeners[event] || []).forEach(cb => cb(data));
    }
  };
};

const gameEvents = createEventBus();
gameEvents.on("levelUp", ({ name, level }) =>
  console.log(\`  🎉 \${name} reached level \${level}!\`)
);
gameEvents.on("levelUp", ({ level }) =>
  console.log(\`  🎵 Playing level-up sound (Lv.\${level})\`)
);
gameEvents.on("loot", ({ item }) =>
  console.log(\`  💰 Acquired: \${item}\`)
);

console.log("\\n📡 Event System:");
gameEvents.emit("levelUp", { name: "Hero", level: 10 });
gameEvents.emit("loot", { item: "Diamond Sword" });`,
    breakdown: `Let's trace through these game systems:

• const baseDamage = (weaponPower, strength) => weaponPower + Math.floor(strength * 0.5) — Pure function: given the same inputs, always returns the same output. No side effects, easy to test. 50 + floor(20 * 0.5) = 50 + 10 = 60.

• const applyElement = (element) => (damage) => — CURRIED function: first call configures the element, second call applies the damage modification. fireBonus = applyElement("fire") creates a reusable fire-modifier function.

• const bonuses = { fire: 1.3, ... } — Lookup table pattern. Instead of if/else chains, use an object to map element names to multipliers. bonuses[element] retrieves the modifier. The || 1.0 fallback handles unknown elements safely.

• function createCooldownManager(abilityName, cooldownMS) — Factory function returning an object with methods. 'lastUsed' is a PRIVATE variable via closure — nothing outside can directly set it to cheat the cooldown.

• const elapsed = now - lastUsed — Measures milliseconds since last use. If less than cooldownMS, the ability is still cooling down. This is exactly how game ability timers work internally.

• const createEventBus = () => { const listeners = {}; ... } — Creates a private listeners registry via closure. The on() method registers callbacks, emit() triggers all callbacks for an event with the provided data.

• listeners[event].push(callback) — Multiple callbacks can register for the same event. When "levelUp" fires, BOTH registered callbacks execute. This decouples systems — the leveling code doesn't need to know about UI or sound.

• (listeners[event] || []).forEach(cb => cb(data)) — Safe iteration: if no listeners exist for the event, use an empty array (no errors). Each registered callback receives the same data object.

• gameEvents.on("levelUp", ({ name, level }) => ...) — Arrow function with destructured parameter as a callback. Clean, concise, and maintains lexical 'this' context.`,
    summary: `Real game functions combine currying (configurable modifiers), closures (cooldown timers with private state), and callbacks (event systems). Compose small pure functions for damage pipelines. Use factory functions with closures for stateful managers. Build event buses with pub/sub pattern for decoupled game systems. Arrow functions with destructuring make callbacks clean and self-documenting.`
  },

  {
    title: "Functions & Arrow Functions best practices",
    definition: "Professional JavaScript function code follows principles like single responsibility, pure functions where possible, meaningful names, small function bodies, consistent arrow vs regular function choice, and proper error handling — making code testable, maintainable, and debuggable.",
    explanation: `Writing functions that work is step one. Writing functions that are maintainable, testable, and clear is the professional standard. These best practices will make your game code robust and your team (or future self) grateful.

SINGLE RESPONSIBILITY: Each function should do ONE thing well. A function named calculateDamage should calculate damage — not also update the UI, play sounds, and save to a database. If a function does too many things, split it into smaller focused functions. This makes testing easy (test each piece separately) and debugging clear (the bug is in the one function responsible for that behavior).

PURE FUNCTIONS where possible: A pure function always returns the same output for the same inputs and has no side effects (doesn't modify external state). Pure functions are predictable, testable, and safe to call anywhere. Game state management benefits hugely from pure reducer functions that take current state and an action and return new state.

NAMING CONVENTIONS: Function names should be verbs or verb phrases describing what they DO: calculateDamage, isPlayerAlive, getInventoryWeight, formatLeaderboard. Boolean-returning functions start with is/has/can/should. Factory functions start with create/make. Event handlers start with handle/on.

ARROW vs REGULAR function choice: Use arrow functions for callbacks, array method arguments, short utility functions, and anywhere you need lexical 'this'. Use regular functions for object methods, constructors, functions that need their own 'this', and functions that benefit from hoisting. Be consistent within a project.

ERROR HANDLING: Functions should validate their inputs and fail gracefully. Use default parameters for optional values, early returns for invalid states, and descriptive error messages. In game code, gracefully degrading (applying minimum damage instead of crashing) is often better than throwing errors that freeze the game.`,
    code: `// GOOD: Single responsibility — each function does ONE thing
const calculateRawDamage = (weapon, strength) => weapon.power + strength;
const applyCritMultiplier = (damage, isCrit) => isCrit ? damage * 2.5 : damage;
const applyDefenseReduction = (damage, defense) => Math.max(damage - defense, 1);
const clampDamage = (damage, min = 1, max = 9999) => Math.min(Math.max(damage, min), max);

// Compose them together
const calculateFinalDamage = (weapon, strength, defense, isCrit) => {
  const raw = calculateRawDamage(weapon, strength);
  const afterCrit = applyCritMultiplier(raw, isCrit);
  const afterDefense = applyDefenseReduction(afterCrit, defense);
  return clampDamage(afterDefense);
};
const sword = { name: "Flame Blade", power: 45 };
console.log(\`⚔️ Final damage: \${calculateFinalDamage(sword, 20, 15, true)}\`);

// GOOD: Input validation with early returns
const usePotion = (inventory, potionType, playerHP, maxHP) => {
  if (!inventory || !Array.isArray(inventory)) return { error: "Invalid inventory" };
  if (playerHP >= maxHP) return { error: "Already at full health" };

  const potionIndex = inventory.findIndex(item => item.type === potionType);
  if (potionIndex === -1) return { error: \`No \${potionType} found\` };

  const potion = inventory[potionIndex];
  const newHP = Math.min(playerHP + potion.healAmount, maxHP);
  const newInventory = inventory.filter((_, i) => i !== potionIndex);

  return { newHP, newInventory, healed: newHP - playerHP };
};

const inv = [
  { type: "health_potion", healAmount: 50 },
  { type: "mana_potion", healAmount: 30 }
];
const result = usePotion(inv, "health_potion", 60, 100);
console.log(\`\\n🧪 Potion result:\`, result);

// GOOD: Descriptive naming conventions
const isAlive = (entity) => entity.hp > 0;
const hasEnoughMana = (player, cost) => player.mana >= cost;
const canCastSpell = (player, spell) =>
  isAlive(player) && hasEnoughMana(player, spell.manaCost);

const mage = { hp: 80, mana: 45 };
const fireSpell = { name: "Fireball", manaCost: 30 };
console.log(\`\\n🧙 Can cast \${fireSpell.name}: \${canCastSpell(mage, fireSpell)}\`);

// GOOD: Arrow for callbacks, regular for methods
const gameCharacter = {
  name: "Shadow",
  abilities: ["slash", "dodge", "counter"],
  // Regular function — needs 'this' to reference gameCharacter
  listAbilities() {
    // Arrow function — inherits 'this' from listAbilities
    return this.abilities.map((ability, i) => \`\${i + 1}. \${this.name}: \${ability}\`);
  }
};
console.log("\\n🎮 Abilities:");
gameCharacter.listAbilities().forEach(a => console.log(\`  \${a}\`));`,
    breakdown: `Let's examine each best practice:

• calculateRawDamage, applyCritMultiplier, applyDefenseReduction, clampDamage — Four TINY, PURE functions. Each does exactly one calculation. Easy to test individually: does applyCritMultiplier(100, true) === 250? If the final damage is wrong, you can pinpoint which step has the bug.

• calculateFinalDamage composes them — A pipeline function that orchestrates the small functions. The logic reads like a recipe: raw → crit → defense → clamp. Adding a new modifier means adding one line, not rewriting everything.

• Math.min(Math.max(damage, min), max) — Clamping pattern: ensures the value stays within [min, max]. Max with min prevents going below 1 (no zero damage). Min with max prevents exceeding 9999 (no overflow).

• Early returns in usePotion — Each validation check returns immediately on failure with a descriptive error. This AVOIDS nested if/else pyramids. The "happy path" (success) is the code that runs if nothing fails. This pattern is called "guard clauses."

• inventory.filter((_, i) => i !== potionIndex) — Creates a NEW array without the used potion. Immutable approach: the original inventory array is untouched. The function returns the new inventory for the caller to use.

• isAlive, hasEnoughMana, canCastSpell — Boolean functions with is/has/can prefixes. canCastSpell COMPOSES the other two, creating readable logic: "can cast if alive AND has enough mana." Self-documenting code.

• listAbilities() { ... this.abilities.map(... => ...) } — Regular function for the method (needs 'this'), arrow function for the callback inside map (inherits 'this'). This is the idiomatic pattern for object methods with callbacks.

• Consistent style: all utility/helper functions use arrows (concise, no 'this' needed). Object methods use regular function shorthand. This consistency makes the codebase predictable.`,
    summary: `Function best practices: follow single responsibility (one function, one job). Write pure functions for calculations. Validate inputs with early returns (guard clauses). Name functions with clear verb phrases (is/has/can for booleans, create/make for factories). Use arrow functions for callbacks and utilities, regular functions for methods needing 'this'. Compose small functions into pipelines rather than writing monolithic code. Return new data instead of mutating inputs.`
  }
];
