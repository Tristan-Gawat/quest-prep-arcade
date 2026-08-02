export const jsVariablesTypesLessons = [
  {
    title: "What is Variables & Types?",
    definition: "Variables are named containers that store data values in your program, while types define what kind of data a variable holds — such as numbers, strings, booleans, or objects.",
    explanation: `In the realm of programming, variables are like enchanted chests that hold your treasures. Each chest has a name inscribed on it so you can find it again, and inside it stores a single piece of data — a number, a word, a true/false flag, or even a complex map of an entire dungeon.

JavaScript gives you three keywords to create these magical containers: \`let\`, \`const\`, and \`var\`. Each has different rules about how and when you can change the treasure inside. Choosing the right one is like choosing the right type of chest — some lock permanently, some can be reopened and refilled.

\`const\` creates a constant binding — once you put a value in, you cannot reassign it. Think of it as a sealed vault. \`let\` creates a variable that can be reassigned — like an unlocked chest you can swap contents in and out of. \`var\` is the ancient, legacy keyword from old JavaScript — it still works but has quirky scoping behavior that can cause bugs.

Types in JavaScript are dynamic, meaning you don't have to declare what type of data a variable will hold. The language figures it out at runtime. This is both a superpower and a potential trap — flexibility comes at the cost of potential type-related bugs.

Understanding variables and types is like understanding the inventory system of your game. Without knowing what slots exist and what items they can hold, you'll constantly run into errors when trying to equip the wrong gear.`,
    code: `// Variables & Types - Your coding inventory system

// const - permanent binding, cannot be reassigned
const GAME_TITLE = "Shadow Quest";
const MAX_LEVEL = 99;
const PI = 3.14159;

// let - can be reassigned as needed
let playerHealth = 100;
let currentLevel = 1;
let questStatus = "in_progress";

// Reassigning let variables (this is allowed)
playerHealth = 85; // took damage!
currentLevel = 2; // leveled up!

// var - legacy keyword (avoid in modern code)
// var has function scope, not block scope
var oldStyleVariable = "I'm from the old days";

// JavaScript primitive types
const heroName = "Kai";           // string
const heroLevel = 25;             // number
const isAlive = true;             // boolean
const ultimateAbility = null;     // null (intentionally empty)
let nextQuest;                    // undefined (not yet assigned)
const oddsRatio = BigInt(9007199254740991); // bigint
const uniqueId = Symbol("hero");  // symbol

// Type checking with typeof
console.log(typeof heroName);     // "string"
console.log(typeof heroLevel);    // "number"
console.log(typeof isAlive);      // "boolean"
console.log(typeof ultimateAbility); // "object" (known quirk!)
console.log(typeof nextQuest);    // "undefined"`,
    breakdown: `• \`const GAME_TITLE = "Shadow Quest"\` — declares a constant that cannot be reassigned; uppercase naming signals it's a true constant
• \`const MAX_LEVEL = 99\` — another constant; attempting \`MAX_LEVEL = 100\` would throw a TypeError
• \`let playerHealth = 100\` — declares a reassignable variable using let, appropriate for values that change over time
• \`playerHealth = 85\` — demonstrates reassignment of a let variable, which is perfectly valid
• \`var oldStyleVariable = ...\` — shows the legacy var keyword; it's function-scoped rather than block-scoped
• \`const heroName = "Kai"\` — a string primitive, text enclosed in quotes
• \`const heroLevel = 25\` — a number primitive, JavaScript uses one type for integers and floats
• \`const isAlive = true\` — a boolean primitive, can only be true or false
• \`const ultimateAbility = null\` — null represents an intentionally empty or absent value
• \`let nextQuest\` — a variable declared without assignment defaults to undefined
• \`typeof heroName\` — the typeof operator returns a string indicating the variable's type
• \`typeof ultimateAbility\` returns "object" — this is a known JavaScript bug/quirk that persists for backward compatibility`,
    summary: `Variables in JavaScript are declared with const (permanent binding), let (reassignable), or var (legacy). JavaScript has seven primitive types: string, number, boolean, null, undefined, bigint, and symbol. The typeof operator lets you check a value's type at runtime.`
  },
  {
    title: "How Variables & Types works",
    definition: "JavaScript uses dynamic typing where variables can hold any type without declaration, and the engine determines types at runtime through a process of type inference and internal tagging.",
    explanation: `JavaScript's type system is like a shape-shifting familiar — your variable can transform into different types throughout its lifetime. Unlike statically-typed languages where you must declare "this chest only holds swords," JavaScript lets any chest hold any item at any time.

Dynamic typing means the JavaScript engine tracks types internally using hidden tags. When you write \`let x = 42\`, the engine stores both the value (42) and a tag saying "this is a number." If you later write \`x = "hello"\`, the engine updates both the value and the tag. This flexibility is powerful but requires careful handling.

Type coercion is JavaScript's attempt to be helpful when you mix types in operations. If you try to add a number and a string, JavaScript will convert (coerce) one to match the other. This is like a merchant who automatically converts your gold to the local currency — convenient, but sometimes the exchange rate isn't what you expected.

There are two kinds of coercion: implicit (automatic, done by the engine) and explicit (manual, done by you using functions like \`Number()\`, \`String()\`, or \`Boolean()\`). Implicit coercion is where bugs hide. The expression \`"5" + 3\` gives you "53" (string concatenation), while \`"5" - 3\` gives you 2 (numeric subtraction). This inconsistency trips up many adventurers.

Understanding how JavaScript handles types under the hood helps you predict its behavior and avoid the traps that catch beginners. It's the difference between a warrior who knows their weapon's reach and one who swings blindly.`,
    code: `// Dynamic Typing - The Shape-Shifting System

// Variables can change type (with let)
let questReward = 100;          // starts as number
console.log(typeof questReward); // "number"

questReward = "Gold Coins";     // now it's a string!
console.log(typeof questReward); // "string"

questReward = true;             // now a boolean!
console.log(typeof questReward); // "boolean"

// TYPE COERCION - JavaScript's auto-conversion magic
// Implicit coercion (automatic - can be surprising!)
console.log("5" + 3);           // "53" (number coerced to string)
console.log("5" - 3);           // 2 (string coerced to number)
console.log("5" * 2);           // 10 (string coerced to number)
console.log(true + 1);          // 2 (true becomes 1)
console.log(false + 1);         // 1 (false becomes 0)
console.log("" == false);       // true (both coerce to 0)

// Explicit coercion (intentional - you're in control)
const inputDamage = "42";
const actualDamage = Number(inputDamage); // explicitly convert
console.log(actualDamage + 8);  // 50 (proper math!)

const score = 9001;
const scoreText = String(score); // explicitly to string
console.log(typeof scoreText);   // "string"

// Boolean coercion - truthy and falsy values
console.log(Boolean(0));         // false (falsy)
console.log(Boolean(""));        // false (falsy)
console.log(Boolean(null));      // false (falsy)
console.log(Boolean("hero"));    // true (truthy)
console.log(Boolean(42));        // true (truthy)
console.log(Boolean([]));        // true (even empty arrays!)`,
    breakdown: `• \`let questReward = 100\` then reassigning to string and boolean — demonstrates dynamic typing where one variable can hold different types
• \`"5" + 3\` gives "53" — the + operator prefers string concatenation when one operand is a string
• \`"5" - 3\` gives 2 — the - operator only works with numbers, so the string is coerced to a number
• \`true + 1\` gives 2 — booleans coerce to numbers (true=1, false=0) in arithmetic contexts
• \`"" == false\` is true — both empty string and false coerce to 0 when compared with loose equality
• \`Number(inputDamage)\` — explicit conversion using the Number() constructor, safer than relying on implicit coercion
• \`String(score)\` — explicit conversion to string, clearer than \`score + ""\`
• \`Boolean(0)\` is false — zero is falsy in JavaScript along with "", null, undefined, NaN, and false itself
• \`Boolean([])\` is true — even empty arrays and objects are truthy, a common gotcha for developers`,
    summary: `JavaScript's dynamic typing allows variables to hold any type and change types during execution. Type coercion automatically converts between types in operations, which can cause unexpected results. Use explicit conversion functions (Number, String, Boolean) for predictable type handling.`
  },
  {
    title: "Variables & Types syntax & usage",
    definition: "The typeof operator inspects values at runtime, while understanding primitive versus reference types determines how data is stored, compared, and passed between functions in JavaScript.",
    explanation: `In JavaScript's type kingdom, there are two major factions: primitives and reference types. Understanding which faction your data belongs to is crucial because it determines how copies work, how comparisons behave, and how function arguments are handled.

Primitive types (string, number, boolean, null, undefined, bigint, symbol) are stored directly in the variable. When you copy a primitive, you get a completely independent copy — like making a duplicate key. Changing the copy doesn't affect the original.

Reference types (objects, arrays, functions) are stored in memory, and the variable holds a reference (pointer) to that location. When you copy a reference type, you're copying the pointer, not the data itself. Both variables now point to the same treasure chest — opening it through either name shows the same contents.

The \`typeof\` operator is your identification spell. Cast it on any value and it returns a string telling you what type it is. However, it has some quirks: \`typeof null\` returns "object" (a famous JavaScript bug), and \`typeof []\` also returns "object" (because arrays are technically objects).

This primitive vs. reference distinction is one of the most important concepts in JavaScript. It explains why modifying an array inside a function affects the original array, and why you need special techniques (like spread operator or structuredClone) to create true independent copies of objects.`,
    code: `// Primitive vs Reference Types - Know your data

// PRIMITIVES - stored by value (independent copies)
let playerOneScore = 500;
let playerTwoScore = playerOneScore; // copies the VALUE

playerTwoScore = 999; // only changes playerTwo's copy
console.log(playerOneScore); // 500 (unchanged!)
console.log(playerTwoScore); // 999

// REFERENCE TYPES - stored by reference (shared pointer)
const partyA = { warrior: "Rex", mage: "Luna" };
const partyB = partyA; // copies the REFERENCE, not the object

partyB.warrior = "Brutus"; // modifies the shared object!
console.log(partyA.warrior); // "Brutus" (changed too!)
console.log(partyB.warrior); // "Brutus"

// Both variables point to the SAME object in memory

// Creating true copies of objects (breaking the reference)
const originalStats = { hp: 100, mp: 50, str: 12 };
const clonedStats = { ...originalStats }; // spread creates new object

clonedStats.hp = 999;
console.log(originalStats.hp); // 100 (safe! independent copy)
console.log(clonedStats.hp);   // 999

// typeof for type checking
console.log(typeof "spell");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (bug!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (arrays are objects)
console.log(Array.isArray([]));  // true (proper array check)`,
    breakdown: `• \`let playerTwoScore = playerOneScore\` — copies the primitive value 500 into a new independent variable
• \`playerTwoScore = 999\` — changing the copy has zero effect on the original because primitives copy by value
• \`const partyB = partyA\` — copies only the reference (memory address), both variables now point to the same object
• \`partyB.warrior = "Brutus"\` — modifying through partyB affects partyA because they share the same underlying object
• \`{ ...originalStats }\` — the spread operator creates a new object with copies of all properties (shallow clone)
• \`clonedStats.hp = 999\` — safe to modify because spread created an independent copy
• \`typeof null\` returns "object" — this is a historical JavaScript bug that cannot be fixed without breaking existing code
• \`typeof []\` returns "object" — use Array.isArray() for reliable array detection
• \`Array.isArray([])\` — the proper way to check if a value is an array`,
    summary: `Primitives are stored by value (copies are independent), while reference types (objects, arrays) are stored by reference (copies share the same data). Use the spread operator for shallow cloning. Use typeof for type checking, but prefer Array.isArray() for arrays and explicit null checks.`
  },
  {
    title: "Practical examples of Variables & Types",
    definition: "Hoisting and the temporal dead zone are JavaScript engine behaviors that affect when and how variables become accessible during code execution, with var being hoisted with undefined and let/const entering a temporal dead zone.",
    explanation: `Hoisting is one of JavaScript's most confusing mechanics — it's like a dungeon where the treasure appears at the entrance before you've even found it. When the JavaScript engine processes your code, it makes two passes: first it registers all declarations, then it executes the code line by line.

With \`var\`, the declaration is hoisted to the top of its function scope and initialized to \`undefined\`. This means you can reference a var variable before its declaration line without getting an error — you'll just get \`undefined\`. It's like a ghost item appearing in your inventory before you've actually picked it up.

\`let\` and \`const\` are also hoisted (the engine knows they exist) but they are NOT initialized. The space between the top of the scope and the actual declaration is called the Temporal Dead Zone (TDZ). Accessing a let/const variable in the TDZ throws a ReferenceError — the game says "this item doesn't exist yet" rather than giving you a phantom.

The TDZ is actually a safety feature. It catches bugs where you accidentally use a variable before setting it up properly. It's like a guardrail on a cliff — var lets you walk right off the edge (silently giving you undefined), while let/const puts up a barrier and warns you.

Understanding these mechanics helps you write more predictable code and debug confusing errors. It's also why modern JavaScript strongly favors \`const\` and \`let\` over \`var\` — their behavior is more intuitive and catches mistakes earlier.`,
    code: `// Hoisting & Temporal Dead Zone - Hidden mechanics revealed

// VAR HOISTING - declaration moves to top, value stays
console.log(questName); // undefined (hoisted but not assigned)
var questName = "Dragon Slayer";
console.log(questName); // "Dragon Slayer"

// What the engine actually sees:
// var questName;              <-- declaration hoisted
// console.log(questName);    <-- undefined
// questName = "Dragon Slayer"; <-- assignment stays here

// LET/CONST - Temporal Dead Zone (TDZ)
// console.log(heroClass); // ReferenceError! TDZ!
let heroClass = "Paladin";
console.log(heroClass);   // "Paladin" (safe after declaration)

// PRACTICAL EXAMPLE: Why const/let are safer
const buildCharacter = (name) => {
  // var version - prone to bugs
  console.log(greeting); // undefined (no error, but wrong!)
  var greeting = \`Welcome, \${name}!\`;

  // let version - catches the bug immediately
  // console.log(farewell); // Would throw ReferenceError
  let farewell = \`Goodbye, \${name}!\`;

  return { greeting, farewell };
};
buildCharacter("Storm Knight");

// BLOCK SCOPING: let/const respect blocks, var doesn't
if (true) {
  var leakedVar = "I escape blocks!";
  let containedLet = "I stay inside!";
  const containedConst = "Me too!";
}
console.log(leakedVar);      // "I escape blocks!" (var leaks!)
// console.log(containedLet); // ReferenceError (properly scoped)

// Best practice: default to const, use let only when needed
const DIFFICULTY = "hard";    // never changes
let score = 0;                // will change during gameplay
// var anything = "avoid";    // don't use var in modern JS`,
    breakdown: `• \`console.log(questName)\` before var declaration — prints undefined because var is hoisted with initialization to undefined
• After assignment, \`questName\` has its actual value — showing the two-phase behavior of var hoisting
• The "what the engine sees" comment — visualizes how hoisting splits declaration from assignment
• \`let heroClass = "Paladin"\` — accessing before this line would throw ReferenceError due to the Temporal Dead Zone
• \`buildCharacter\` function — practical demonstration comparing var's silent undefined vs let's protective error
• \`var leakedVar\` inside if block — var ignores block scope and leaks into the surrounding function/global scope
• \`let containedLet\` inside if block — let respects the block boundary and is not accessible outside
• The best practice section — shows the modern convention: const by default, let when reassignment is needed, never var`,
    summary: `Var declarations are hoisted with undefined initialization, while let/const enter a Temporal Dead Zone where access throws ReferenceError. Var has function scope (leaks out of blocks), while let/const have block scope. Modern best practice is to default to const and use let only when reassignment is necessary.`
  },
  {
    title: "Variables & Types best practices",
    definition: "Variable best practices involve defaulting to const for immutability, using descriptive names, leveraging block scope, avoiding var entirely, and applying consistent naming conventions throughout your codebase.",
    explanation: `A master coder's variable discipline is like a grandmaster's inventory management — every item has its place, every name is meaningful, and nothing is wasted. Following best practices with variables and types prevents entire categories of bugs and makes your code readable to your future self (and your party members).

The golden rule is: use \`const\` by default. Only reach for \`let\` when you know the value needs to change. Never use \`var\`. This isn't just style preference — it's a defensive strategy. Constants can't be accidentally reassigned, and their intent is immediately clear to anyone reading the code.

Naming variables is an art form. A variable called \`x\` tells you nothing; a variable called \`playerHealthPercentage\` tells you everything. Use camelCase for variables and functions, UPPER_SNAKE_CASE for true constants (values that would be the same in any run of the program), and PascalCase for classes and constructors.

Minimize scope — declare variables as close to their usage as possible, in the narrowest block scope available. This reduces the "surface area" where bugs can hide. If a variable only matters inside a loop, declare it inside the loop. If it only matters inside a function, keep it there.

Type awareness means always knowing what type your variables hold and being deliberate about conversions. Use strict equality (===) to avoid accidental type coercion. Validate inputs at function boundaries. Document expected types in your variable names when it helps clarity.`,
    code: `// Variables & Types Best Practices - The Master's Guide

// PRACTICE 1: const by default, let only when necessary
const GAME_VERSION = "2.1.0";     // true constant (never changes)
const playerConfig = {             // object reference is const
  difficulty: "hard",              // but properties can change
  volume: 80
};
playerConfig.volume = 60;          // allowed! const = reference lock

let roundsPlayed = 0;             // will increment, so use let
let currentWeapon = "Iron Sword"; // will be swapped, so use let

// PRACTICE 2: Descriptive naming with proper conventions
const MAX_INVENTORY_SLOTS = 20;   // UPPER_SNAKE for constants
const isPlayerAlive = true;       // boolean prefix: is/has/can
const hasCompletedTutorial = false;
const canDoubleJump = true;

const calculateDamage = (base, multiplier) => { // verb for functions
  const criticalBonus = multiplier > 2 ? 15 : 0;
  return base * multiplier + criticalBonus;
};

// PRACTICE 3: Minimize scope - declare close to usage
const processLoot = (enemies) => {
  const results = [];

  for (const enemy of enemies) {
    // 'reward' only exists inside this loop iteration
    const reward = enemy.level * 10;
    const item = enemy.drops[0] ?? "nothing";
    results.push({ enemy: enemy.name, reward, item });
  }

  return results; // 'reward' and 'item' can't leak out
};

// PRACTICE 4: Use strict equality and validate types
const applyDamage = (target, amount) => {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    console.error("Invalid damage amount:", amount);
    return target;
  }
  return { ...target, hp: Math.max(0, target.hp - amount) };
};`,
    breakdown: `• \`const GAME_VERSION = "2.1.0"\` — true constant in UPPER_SNAKE_CASE, signals this value is universal and unchanging
• \`const playerConfig = {...}\` — const prevents reassigning the variable but object properties can still be modified
• \`let roundsPlayed = 0\` — using let signals to readers that this value WILL change during execution
• Boolean prefixes \`is/has/can\` — makes the variable's purpose instantly clear without reading surrounding code
• \`calculateDamage\` — verb naming for functions tells you it performs an action and returns a result
• \`for (const enemy of enemies)\` — const in for...of is safe because each iteration creates a new binding
• \`const reward\` inside loop — scoped to the loop body, cannot accidentally leak or be misused elsewhere
• \`enemy.drops[0] ?? "nothing"\` — nullish coalescing provides a safe default for potentially undefined values
• \`typeof amount !== "number"\` — type validation at function boundaries catches bugs at the earliest possible moment
• \`{ ...target, hp: Math.max(0, ...) }\` — returns a new object instead of mutating, supporting immutable data patterns`,
    summary: `Best practices for variables include defaulting to const, using let only for values that change, and never using var. Follow naming conventions (camelCase, UPPER_SNAKE_CASE, boolean prefixes), minimize variable scope, validate types at boundaries, and prefer immutable patterns to prevent unexpected mutations.`
  }
];
