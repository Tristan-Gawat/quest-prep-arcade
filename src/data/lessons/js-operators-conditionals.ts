export const jsOperatorsConditionalsLessons = [
  {
    title: "What is Operators & Conditionals?",
    definition: "Operators are symbols that perform operations on values (comparison, arithmetic, logical), while conditionals are structures that execute different code paths based on whether conditions evaluate to true or false.",
    explanation: `Operators and conditionals are the decision-making system of your code — they're like the branching paths in a dungeon where your choices determine your fate. Without them, your program would be a straight hallway with no turns, no choices, and no strategy.

Operators come in several families. Comparison operators (\`==\`, \`===\`, \`!=\`, \`!==\`, \`>\`, \`<\`) compare two values and return true or false. They're the scouts that report back on battlefield conditions: "Is the enemy's health lower than 50?" "Does the player have the key?"

Logical operators (\`&&\`, \`||\`, \`!\`) combine or modify boolean values. They let you ask compound questions: "Is the player alive AND has enough mana?" "Is the door unlocked OR does the player have a lockpick?" They're the strategist combining multiple intelligence reports into a single decision.

Conditionals (if/else, switch, ternary) take the results of these operators and route your program down different paths. They're the actual crossroads in the dungeon — based on what the scouts and strategists report, you go left, right, or straight ahead.

Together, operators and conditionals form the brain of your program. Every game mechanic, every UI interaction, every business rule ultimately comes down to: check a condition, then act accordingly. Master these, and you control the flow of your entire application.`,
    code: `// Operators & Conditionals - The Decision Engine

// COMPARISON OPERATORS - checking conditions
const playerLevel = 15;
const requiredLevel = 10;
const bossLevel = 15;

// Equality checks
console.log(playerLevel == "15");   // true (loose equality, coerces type)
console.log(playerLevel === "15");  // false (strict equality, no coercion)
console.log(playerLevel === 15);    // true (same type and value)
console.log(playerLevel !== 10);    // true (strict not-equal)

// Relational comparisons
console.log(playerLevel > requiredLevel);  // true
console.log(playerLevel >= bossLevel);     // true (greater OR equal)
console.log(playerLevel < 20);             // true

// LOGICAL OPERATORS - combining conditions
const hasKey = true;
const hasLockpick = false;
const doorIsUnlocked = false;

// AND (&&) - ALL conditions must be true
const canEnterVault = hasKey && playerLevel >= 10;
console.log("Can enter vault:", canEnterVault); // true

// OR (||) - AT LEAST ONE condition must be true
const canOpenDoor = doorIsUnlocked || hasKey || hasLockpick;
console.log("Can open door:", canOpenDoor); // true

// NOT (!) - inverts a boolean value
const isLocked = !doorIsUnlocked;
console.log("Door is locked:", isLocked); // true (flipped from false)

// Combining operators for complex decisions
const canFightBoss = playerLevel >= bossLevel && (hasKey || hasLockpick);
console.log("Ready for boss:", canFightBoss); // true`,
    breakdown: `• \`playerLevel == "15"\` — loose equality (==) coerces types before comparing, so number 15 equals string "15"
• \`playerLevel === "15"\` — strict equality (===) requires same type AND value, no coercion occurs
• \`playerLevel !== 10\` — strict not-equal checks both type and value differ
• \`playerLevel >= bossLevel\` — greater-than-or-equal returns true because 15 equals 15
• \`hasKey && playerLevel >= 10\` — AND operator returns true only if both operands are true
• \`doorIsUnlocked || hasKey || hasLockpick\` — OR operator returns true if any operand is true (short-circuits on first true)
• \`!doorIsUnlocked\` — NOT operator flips false to true and true to false
• \`playerLevel >= bossLevel && (hasKey || hasLockpick)\` — parentheses group the OR condition, which is evaluated before AND`,
    summary: `Comparison operators (==, ===, !=, !==, >, <, >=, <=) produce boolean results by comparing values. Logical operators (&&, ||, !) combine or invert booleans. Always prefer strict equality (===) over loose equality (==) to avoid unexpected type coercion surprises.`
  },
  {
    title: "How Operators & Conditionals works",
    definition: "Conditional statements evaluate expressions to boolean values and direct program flow through branching paths using if/else chains, switch statements, and the ternary operator for inline decisions.",
    explanation: `Conditional statements are the gatekeepers of your code's flow. They stand at crossroads and ask questions: "What's the password?" "How much health do you have?" "Which faction do you belong to?" Based on the answer, they direct execution down completely different code paths.

The \`if\` statement is the most fundamental gatekeeper. It evaluates an expression, and if that expression is truthy, it executes its code block. The optional \`else if\` branches add additional checks, creating a cascade of conditions tested in order. The \`else\` clause is the catch-all — it runs when nothing else matched.

Important: JavaScript evaluates conditions in order and stops at the first match. Once an \`if\` or \`else if\` block executes, all remaining branches are skipped. This is like a series of locked doors — once you find one that opens, you go through it and ignore the rest.

The \`switch\` statement is designed for situations where you're comparing one value against many possible matches. It's like a quest board where you check which quest ID matches yours. Each \`case\` is a potential match, and \`break\` prevents falling through to the next case.

The ternary operator (\`condition ? valueIfTrue : valueIfFalse\`) is a compact inline conditional. It's perfect for simple either/or decisions that produce a value. Think of it as a quick decision point — "am I alive? Show green health bar : show death screen."`,
    code: `// Conditional Statements - Branching quest paths

// IF / ELSE IF / ELSE - the classic decision chain
const playerHP = 35;
const maxHP = 100;
const hpPercent = (playerHP / maxHP) * 100;

if (hpPercent > 75) {
  console.log("Status: Healthy - Full strength!");
} else if (hpPercent > 50) {
  console.log("Status: Wounded - Be careful.");
} else if (hpPercent > 25) {
  console.log("Status: Critical - Find healing!");
} else {
  console.log("Status: Near Death - DANGER!");
}

// SWITCH statement - matching against known values
const weaponType = "staff";

switch (weaponType) {
  case "sword":
    console.log("Melee weapon: +10 Strength");
    break;
  case "bow":
    console.log("Ranged weapon: +10 Dexterity");
    break;
  case "staff":
    console.log("Magic weapon: +10 Intelligence");
    break;
  default:
    console.log("Unknown weapon type");
    break;
}

// TERNARY OPERATOR - inline conditional expression
const level = 25;
const rank = level >= 20 ? "Veteran" : "Novice";
console.log(\`Player rank: \${rank}\`); // "Veteran"

// Nested ternary (use sparingly - can reduce readability)
const tier = level >= 30 ? "Master"
           : level >= 20 ? "Veteran"
           : level >= 10 ? "Apprentice"
           : "Beginner";
console.log(\`Tier: \${tier}\`); // "Veteran"`,
    breakdown: `• \`const hpPercent = (playerHP / maxHP) * 100\` — calculates a percentage to use in conditional comparisons
• \`if (hpPercent > 75)\` — first condition checked; if true, inner block runs and all else-if/else are skipped
• \`else if (hpPercent > 50)\` — only checked if the previous condition was false; creates ordered priority
• \`else\` — the fallback that runs only when all previous conditions are false
• \`switch (weaponType)\` — evaluates the expression once and compares against each case using strict equality
• \`case "staff":\` — matches when weaponType === "staff", then executes the following statements
• \`break;\` — exits the switch block; without it, execution "falls through" to the next case
• \`default:\` — like else in if/else; runs when no case matches
• \`level >= 20 ? "Veteran" : "Novice"\` — ternary returns "Veteran" if condition is true, "Novice" if false
• Nested ternary — chains multiple conditions inline but should be used carefully for readability`,
    summary: `If/else chains test conditions in order and execute the first matching branch. Switch statements compare a single value against multiple cases using strict equality. The ternary operator provides a compact inline conditional that returns a value based on a boolean expression.`
  },
  {
    title: "Operators & Conditionals syntax & usage",
    definition: "Nullish coalescing (??) provides defaults only for null/undefined values, while optional chaining (?.) safely accesses nested properties without throwing errors when intermediate values are nullish.",
    explanation: `Modern JavaScript introduced two powerful operators that feel like protective enchantments for your code: nullish coalescing (??) and optional chaining (?.). They're designed to handle one of the most common pain points in programming — dealing with data that might not exist.

The nullish coalescing operator (\`??\`) provides a default value when the left side is \`null\` or \`undefined\`. It's different from the OR operator (\`||\`) which triggers on any falsy value. This distinction matters: with \`||\`, a value of 0 or empty string would be replaced by the default. With \`??\`, only null/undefined trigger the fallback.

Think of \`??\` as a "missing item" check for your inventory. If a slot is completely empty (null/undefined), it provides a default item. But if the slot contains a valid value — even if that value is 0 or false — it keeps what's there. The OR operator would accidentally replace a legitimate zero with the default.

Optional chaining (\`?.\`) lets you safely drill into nested objects without checking each level manually. Without it, accessing \`player.equipment.weapon.damage\` would crash if any part of that chain is null. With optional chaining, \`player?.equipment?.weapon?.damage\` gracefully returns \`undefined\` instead of throwing an error.

These operators are essential for working with real-world data — API responses, user input, configuration objects — where you can never be 100% sure that every expected property exists. They're your shield against the dreaded "Cannot read property of undefined" error.`,
    code: `// Modern Operators - Nullish Coalescing & Optional Chaining

// NULLISH COALESCING (??) - defaults for null/undefined only
const playerSettings = {
  volume: 0,          // intentionally zero (muted)
  brightness: null,   // not set yet
  difficulty: undefined // not configured
};

// ?? only triggers on null/undefined
const volume = playerSettings.volume ?? 50;
console.log(volume); // 0 (keeps the zero! It's a valid value)

const brightness = playerSettings.brightness ?? 75;
console.log(brightness); // 75 (null triggers the default)

// Compare with || which triggers on ANY falsy value
const volumeWithOr = playerSettings.volume || 50;
console.log(volumeWithOr); // 50 (WRONG! || treats 0 as falsy)

// OPTIONAL CHAINING (?.) - safe property access
const player = {
  name: "Frost Archer",
  equipment: {
    weapon: { name: "Ice Bow", damage: 45 },
    armor: null // no armor equipped
  }
};

// Safe nested access - returns undefined instead of crashing
console.log(player?.equipment?.weapon?.name); // "Ice Bow"
console.log(player?.equipment?.armor?.defense); // undefined (no error!)
// Without ?.: player.equipment.armor.defense -> TypeError!

// Optional chaining with methods
const guild = {
  members: ["Kai", "Luna", "Rex"],
  getLeader: () => "Kai"
};

console.log(guild.getLeader?.());  // "Kai"
console.log(guild.disband?.());    // undefined (method doesn't exist)

// Combining ?? and ?. for robust defaults
const armorDefense = player?.equipment?.armor?.defense ?? 0;
console.log(\`Armor defense: \${armorDefense}\`); // "Armor defense: 0"`,
    breakdown: `• \`playerSettings.volume ?? 50\` — returns 0 because ?? only triggers on null/undefined, not on falsy values like 0
• \`playerSettings.brightness ?? 75\` — returns 75 because brightness is null, which triggers the default
• \`playerSettings.volume || 50\` — returns 50 incorrectly because || treats 0 as falsy and uses the default
• \`player?.equipment?.weapon?.name\` — safely traverses the chain; each ?. checks if the preceding value is null/undefined
• \`player?.equipment?.armor?.defense\` — armor is null, so ?. short-circuits and returns undefined instead of throwing
• \`guild.getLeader?.()\` — optional chaining on method calls; only invokes if the method exists
• \`guild.disband?.()\` — disband doesn't exist, so ?. returns undefined instead of throwing "not a function"
• \`player?.equipment?.armor?.defense ?? 0\` — combines both operators: safely access nested value, default to 0 if missing`,
    summary: `Nullish coalescing (??) provides defaults specifically for null/undefined without affecting valid falsy values like 0 or "". Optional chaining (?.) safely accesses nested properties by returning undefined instead of throwing errors. Combined, they create robust data access patterns for unpredictable data structures.`
  },
  {
    title: "Practical examples of Operators & Conditionals",
    definition: "Practical conditional patterns include guard clauses for early returns, compound boolean logic for complex game rules, and nested conditionals with strategic refactoring for maintainable decision trees.",
    explanation: `Real-world conditional logic is rarely as simple as a single if/else. In actual game development or application programming, you'll face complex decision trees with multiple factors, edge cases, and cascading effects. The key is organizing these decisions clearly.

Guard clauses are a powerful pattern where you check for invalid or edge cases first and return early, rather than wrapping all your main logic in deeply nested if blocks. It's like posting guards at the dungeon entrance — they turn away anyone who doesn't meet basic requirements before the real adventure begins.

Compound boolean expressions combine multiple conditions into sophisticated rules. A damage calculation might depend on weapon type AND element affinity AND critical hit chance AND buff status — all combined with && and ||. Parentheses become essential for controlling evaluation order.

Short-circuit evaluation is a hidden feature of && and ||. The \`&&\` operator stops evaluating as soon as it hits a false value (because the whole expression can't be true anymore). The \`||\` operator stops at the first true value. This behavior can be exploited for conditional execution: \`isAlive && attack()\` only calls attack() if isAlive is true.

Combining these patterns creates sophisticated decision-making systems that remain readable. The goal is always the same: make your code's logic as easy to follow as a well-written quest dialogue tree.`,
    code: `// Practical Conditional Patterns - Real combat logic

// GUARD CLAUSES - validate early, reduce nesting
const attemptAttack = (attacker, target) => {
  // Guard: check preconditions and return early
  if (!attacker) return { success: false, reason: "No attacker" };
  if (!target) return { success: false, reason: "No target" };
  if (attacker.hp <= 0) return { success: false, reason: "Attacker is dead" };
  if (target.hp <= 0) return { success: false, reason: "Target already dead" };

  // Main logic runs only after all guards pass
  const damage = attacker.strength * 2;
  target.hp -= damage;
  return { success: true, damage, targetHp: target.hp };
};

// SHORT-CIRCUIT EVALUATION - conditional execution
const player = { name: "Vex", level: 12, guild: "Shadow Walkers" };
const isVeteran = player.level >= 10;

// && as a guard: right side only executes if left is true
isVeteran && console.log(\`\${player.name} unlocked veteran rewards!\`);

// || for fallback values (older pattern, prefer ?? for null)
const displayName = player.nickname || player.name || "Anonymous";
console.log(displayName); // "Vex" (nickname is undefined, falls to name)

// COMPLEX COMPOUND CONDITIONS
const canUseAbility = (hero, ability) => {
  const meetsLevelReq = hero.level >= ability.requiredLevel;
  const hasEnoughMana = hero.mana >= ability.manaCost;
  const isNotOnCooldown = ability.cooldownRemaining === 0;
  const isCorrectClass = ability.allowedClasses.includes(hero.class);

  // Clear boolean variable names make complex logic readable
  return meetsLevelReq && hasEnoughMana && isNotOnCooldown && isCorrectClass;
};

const hero = { level: 15, mana: 50, class: "mage" };
const fireball = {
  requiredLevel: 10, manaCost: 30,
  cooldownRemaining: 0, allowedClasses: ["mage", "warlock"]
};
console.log("Can cast:", canUseAbility(hero, fireball)); // true`,
    breakdown: `• Guard clauses at the top of \`attemptAttack\` — each returns early for an invalid state, keeping main logic un-nested
• \`if (!attacker)\` — checks for null/undefined input before trying to access properties on it
• \`if (attacker.hp <= 0)\` — business logic validation that prevents dead characters from attacking
• \`isVeteran && console.log(...)\` — short-circuit pattern; log only executes if isVeteran is true
• \`player.nickname || player.name || "Anonymous"\` — OR chain returns the first truthy value found
• \`const meetsLevelReq = hero.level >= ability.requiredLevel\` — extracts conditions into named booleans for clarity
• Each named boolean reads like English — \`hasEnoughMana\`, \`isNotOnCooldown\` make the final return statement self-documenting
• \`ability.allowedClasses.includes(hero.class)\` — uses array method inside a conditional check
• \`return meetsLevelReq && hasEnoughMana && ...\` — combines all named booleans; reads like a checklist`,
    summary: `Guard clauses simplify complex functions by handling edge cases early with returns. Short-circuit evaluation enables conditional execution without if statements. Extracting conditions into descriptively-named boolean variables transforms complex compound logic into readable, self-documenting code.`
  },
  {
    title: "Operators & Conditionals best practices",
    definition: "Best practices for operators and conditionals include using strict equality, avoiding deep nesting, leveraging lookup objects over long switch chains, and writing conditions that read like natural language.",
    explanation: `Writing clean conditional code is like designing a well-organized dungeon — adventurers (including future-you) should be able to navigate it without getting lost. The goal is code that a reader can understand the intent of within seconds, not minutes.

Always use strict equality (===) unless you have a specific, documented reason for loose equality (==). Loose equality's type coercion rules are notoriously complex and inconsistent. Even experienced developers get tripped up by cases like \`[] == false\` being true. Strict equality is predictable: same type, same value, no tricks.

Avoid deep nesting (the "pyramid of doom"). If your code has more than 2-3 levels of indentation from conditionals, it's time to refactor. Use guard clauses, extract helper functions, or restructure your logic. Deeply nested code is hard to read, hard to test, and easy to introduce bugs into.

When you have many cases to handle, consider using a lookup object instead of a switch statement or long if/else chain. Objects can map keys to values or functions, often replacing 20 lines of switch with 5 lines of object literal. It's like having an enchanted map that instantly teleports you to the right destination.

Write conditions that read like sentences. Instead of \`if (x > 0 && x < 100 && y !== null)\`, extract into \`const isValidCoordinate = x > 0 && x < 100 && y !== null\`. The named variable becomes documentation — you're telling the next reader exactly what this condition means in your domain.`,
    code: `// Operators & Conditionals Best Practices

// PRACTICE 1: Always use strict equality (===)
const input = "0";
// Bad: uses loose equality with surprising coercion
if (input == false) console.log("This runs! '0' == false is true");
// Good: strict equality - no surprises
if (input === "0") console.log("Explicit string comparison");

// PRACTICE 2: Replace switch/if-else chains with lookup objects
// Instead of a long switch for element damage bonuses:
const elementBonuses = {
  fire: { bonus: 1.5, message: "Burns the target!" },
  ice: { bonus: 1.3, message: "Slows the target!" },
  lightning: { bonus: 1.7, message: "Stuns the target!" },
  earth: { bonus: 1.2, message: "Grounds the target!" }
};

const attackElement = "lightning";
const result = elementBonuses[attackElement] ?? { bonus: 1.0, message: "Normal hit" };
console.log(\`\${result.message} (x\${result.bonus})\`);

// PRACTICE 3: Named conditions for readability
const player = { level: 22, role: "tank", hp: 150, maxHp: 200 };

const isHighLevel = player.level >= 20;
const isTank = player.role === "tank";
const isHealthy = player.hp / player.maxHp > 0.5;
const canTankBoss = isHighLevel && isTank && isHealthy;

if (canTankBoss) {
  console.log("Ready to tank the raid boss!");
}

// PRACTICE 4: Early returns over nested conditionals
// Bad: deeply nested pyramid
// if (a) { if (b) { if (c) { doThing(); } } }

// Good: flat guard clause structure
const processQuest = (quest, player) => {
  if (!quest.isActive) return "Quest not available";
  if (player.level < quest.minLevel) return "Level too low";
  if (!player.inventory.includes(quest.requiredItem)) return "Missing item";

  // Happy path logic - clean and un-nested
  return \`\${player.name} begins: \${quest.name}\`;
};

// PRACTICE 5: Avoid unnecessary else after return
const getStatus = (hp, maxHp) => {
  const ratio = hp / maxHp;
  if (ratio > 0.75) return "healthy";
  if (ratio > 0.5) return "wounded";
  if (ratio > 0.25) return "critical";
  return "near_death"; // no else needed after returns
};`,
    breakdown: `• \`input == false\` — demonstrates the danger of loose equality: string "0" coerces to false, creating unintuitive behavior
• \`elementBonuses\` object — replaces a multi-case switch with a clean lookup structure that's easy to extend
• \`elementBonuses[attackElement] ?? { bonus: 1.0, ... }\` — dynamic property access with nullish coalescing fallback
• \`const isHighLevel = player.level >= 20\` — naming the condition makes the final if-statement read like plain English
• \`const canTankBoss = isHighLevel && isTank && isHealthy\` — combining named booleans creates self-documenting compound logic
• Guard clauses in \`processQuest\` — each invalid state returns early, keeping the happy path at the bottom un-nested
• \`getStatus\` function — no else needed because return exits the function; each condition is independent
• The flat structure — each condition is at the same indentation level, making it scannable at a glance`,
    summary: `Best practices include using strict equality (===) exclusively, replacing long switch chains with lookup objects, extracting conditions into named boolean variables, using guard clauses to avoid nesting, and removing unnecessary else clauses after returns. These patterns produce code that reads like documentation.`
  }
];
