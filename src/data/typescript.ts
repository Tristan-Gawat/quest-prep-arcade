import { Module } from "./curriculum";

export const typescriptModules: Module[] = [
  {
    id: "ts-basics",
    title: "Type Annotations",
    tier: "ROOKIE",
    lesson: {
      title: "Type Annotations",
      concept: "TypeScript adds static types to JavaScript for safer code.",
      explanation:
        "TypeScript lets you annotate variables, parameters, and return values with types. The compiler catches errors before runtime. Basic types: string, number, boolean, any, void, null, undefined.",
      codeExample: `let playerName: string = "Arcade Hero";
let score: number = 0;
let isAlive: boolean = true;

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Error! Type 'number' is not assignable to 'string'
// let bad: string = 42;`,
      language: "typescript",
    },
    quiz: [
      { question: "What does TypeScript add to JavaScript?", choices: ["Speed", "Static types", "New syntax only", "A runtime"], correct: 1, explanation: "TypeScript's main feature is adding static type checking to JavaScript." },
      { question: "What type annotation means 'any value'?", choices: ["unknown", "any", "void", "object"], correct: 1, explanation: "'any' disables type checking — use sparingly!" },
      { question: "What happens if you assign a string to a number variable?", choices: ["It converts automatically", "Compile error", "Runtime error", "Nothing"], correct: 1, explanation: "TypeScript catches type mismatches at compile time." },
    ],
    challenge: {
      title: "Typed Player Card",
      description: "Declare a variable `playerName` typed as string (value \"Hero\"), `level` typed as number (value 1), and a function `getInfo` that takes both and returns a string. Log getInfo(playerName, level).",
      starterCode: "// Add type annotations\n\n\n// Create getInfo function with typed params and return\n\n\n// Log the result\n",
      expectedOutput: "Hero - Level 1",
      hints: ["Use : string, : number after variable names", "Function return type goes after the parentheses: ): string", "Use template literals for the output"],
      solution: `let playerName: string = "Hero";\nlet level: number = 1;\n\nfunction getInfo(name: string, lvl: number): string {\n  return \`\${name} - Level \${lvl}\`;\n}\n\nconsole.log(getInfo(playerName, level));`,
      language: "typescript",
    },
  },
  {
    id: "ts-interfaces",
    title: "Interfaces & Types",
    tier: "ROOKIE",
    lesson: {
      title: "Interfaces & Types",
      concept: "Interfaces define the shape of objects — what properties and types they must have.",
      explanation:
        "Use 'interface' to define object shapes. Properties can be optional (?) or readonly. Type aliases ('type') work similarly but can also define unions, intersections, and primitives. Interfaces can be extended.",
      codeExample: `interface Player {
  name: string;
  level: number;
  guild?: string;  // optional
  readonly id: number;
}

const hero: Player = {
  name: "Shadow",
  level: 42,
  id: 1001
};

// Type alias with union
type Rank = "ROOKIE" | "CHAMPION" | "ELITE";
let myRank: Rank = "CHAMPION";`,
      language: "typescript",
    },
    quiz: [
      { question: "What does ? after a property name mean?", choices: ["Nullable", "Optional", "Any type", "Required"], correct: 1, explanation: "The ? makes a property optional — it doesn't have to be provided." },
      { question: "What's the difference between interface and type?", choices: ["No difference", "Interfaces are for objects, types are more flexible", "Types are faster", "Interfaces can't extend"], correct: 1, explanation: "Interfaces define object shapes; type aliases can also define unions, intersections, and primitives." },
      { question: "What does readonly do?", choices: ["Makes it optional", "Prevents reassignment after creation", "Makes it private", "Adds validation"], correct: 1, explanation: "readonly prevents a property from being changed after the object is created." },
    ],
    challenge: {
      title: "Quest Interface",
      description: "Define an interface `Quest` with: name (string), xpReward (number), isComplete (boolean), and optional description (string). Create a quest object and log its name.",
      starterCode: "// Define the Quest interface\n\n\n// Create a quest object\n\n\n// Log the quest name\n",
      expectedOutput: "Dragon Slayer",
      hints: ["interface Quest { ... }", "Use ? for optional properties", "Create an object that satisfies the interface"],
      solution: `interface Quest {\n  name: string;\n  xpReward: number;\n  isComplete: boolean;\n  description?: string;\n}\n\nconst quest: Quest = {\n  name: "Dragon Slayer",\n  xpReward: 500,\n  isComplete: false\n};\n\nconsole.log(quest.name);`,
      language: "typescript",
    },
  },
  {
    id: "ts-generics",
    title: "Generics",
    tier: "CHAMPI0N",
    lesson: {
      title: "Generics",
      concept: "Generics let you write reusable code that works with multiple types.",
      explanation:
        "Generics use <T> as a type placeholder. When you call the function or create an instance, you specify the actual type. This gives you type safety without writing duplicate code for each type.",
      codeExample: `// Generic function
function getFirst<T>(items: T[]): T {
  return items[0];
}

const num = getFirst<number>([1, 2, 3]);    // number
const str = getFirst<string>(["a", "b"]);   // string

// Generic interface
interface Inventory<T> {
  items: T[];
  add(item: T): void;
}`,
      language: "typescript",
    },
    quiz: [
      { question: "What does <T> represent in a generic?", choices: ["A specific type", "A type placeholder", "The 'this' type", "A template"], correct: 1, explanation: "<T> is a type variable — a placeholder that gets replaced with an actual type." },
      { question: "What's the benefit of generics over 'any'?", choices: ["Performance", "Type safety is preserved", "Shorter code", "Browser support"], correct: 1, explanation: "Generics maintain type information; 'any' loses all type safety." },
      { question: "Can you have multiple generic parameters?", choices: ["No, only one", "Yes, like <T, U>", "Only with classes", "Only 2 max"], correct: 1, explanation: "You can use multiple: <T, U, V> etc. for different type slots." },
    ],
    challenge: {
      title: "Generic Loot Box",
      description: "Write a generic function `openBox<T>` that takes an array of T and returns a random item. Call it with [\"sword\", \"shield\", \"potion\"] and log the result.",
      starterCode: "// Write generic function openBox<T>\n\n\n// Call it with string array and log\n",
      expectedOutput: "random item from array",
      hints: ["function openBox<T>(items: T[]): T", "Use Math.floor(Math.random() * items.length)", "The return type should be T"],
      solution: `function openBox<T>(items: T[]): T {\n  return items[Math.floor(Math.random() * items.length)];\n}\n\nconst loot = openBox<string>(["sword", "shield", "potion"]);\nconsole.log(loot);`,
      language: "typescript",
    },
  },
  {
    id: "ts-utility-types",
    title: "Utility Types",
    tier: "CHAMPI0N",
    lesson: {
      title: "Utility Types",
      concept: "TypeScript provides built-in utility types to transform existing types.",
      explanation:
        "Utility types modify existing types: Partial<T> makes all properties optional, Required<T> makes all required, Pick<T, K> selects specific properties, Omit<T, K> removes properties, Record<K, V> creates key-value maps.",
      codeExample: `interface Player {
  name: string;
  level: number;
  guild: string;
}

// All optional
type PlayerDraft = Partial<Player>;

// Only name and level
type PlayerCard = Pick<Player, "name" | "level">;

// Remove guild
type Solo = Omit<Player, "guild">;

// Record: map of scores
type Leaderboard = Record<string, number>;
const scores: Leaderboard = { "Hero": 100 };`,
      language: "typescript",
    },
    quiz: [
      { question: "What does Partial<T> do?", choices: ["Removes properties", "Makes all properties optional", "Makes all required", "Picks some properties"], correct: 1, explanation: "Partial<T> makes every property in T optional (?)" },
      { question: "How do you create a type with only 'name' and 'level' from Player?", choices: ["Omit<Player, 'guild'>", "Pick<Player, 'name' | 'level'>", "Partial<Player>", "Required<Player>"], correct: 1, explanation: "Pick<T, K> creates a type with only the specified keys." },
      { question: "What does Record<string, number> create?", choices: ["An array", "An object with string keys and number values", "A tuple", "A map class"], correct: 1, explanation: "Record<K, V> creates an object type with keys of type K and values of type V." },
    ],
    challenge: {
      title: "Config Builder",
      description: "Given interface Config { theme: string; fontSize: number; darkMode: boolean; }, create a type PartialConfig using Partial<Config>. Create a variable with only theme set and log it.",
      starterCode: "// Define Config interface\n\n// Create PartialConfig type\n\n// Create partial config object\n\n// Log it\n",
      expectedOutput: "arcade",
      hints: ["type PartialConfig = Partial<Config>", "You only need to provide some properties", "The object only needs theme"],
      solution: `interface Config {\n  theme: string;\n  fontSize: number;\n  darkMode: boolean;\n}\n\ntype PartialConfig = Partial<Config>;\n\nconst myConfig: PartialConfig = { theme: "arcade" };\nconsole.log(myConfig.theme);`,
      language: "typescript",
    },
  },
  {
    id: "ts-advanced",
    title: "Conditional & Mapped Types",
    tier: "ELITE",
    lesson: {
      title: "Advanced Types",
      concept: "Conditional and mapped types enable powerful type-level programming.",
      explanation:
        "Conditional types: T extends U ? X : Y — like ternary for types. Mapped types iterate over keys to create new types. keyof gets all keys as a union. infer extracts types from patterns. These enable complex type transformations.",
      codeExample: `// Conditional type
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hello">;  // "yes"
type B = IsString<42>;       // "no"

// Mapped type - make all values strings
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Stats { hp: number; mp: number; }
type StringStats = Stringify<Stats>;
// { hp: string; mp: string; }`,
      language: "typescript",
    },
    quiz: [
      { question: "What does keyof T return?", choices: ["All values", "A union of all property names", "The type of T", "An array of keys"], correct: 1, explanation: "keyof T produces a union type of all property names (keys) of T." },
      { question: "What is a conditional type?", choices: ["An if statement", "T extends U ? X : Y pattern", "A runtime check", "An assertion"], correct: 1, explanation: "Conditional types use the extends ? : pattern to choose types based on conditions." },
      { question: "What does [K in keyof T] do in a mapped type?", choices: ["Loops over values", "Iterates over each key of T", "Creates an array", "Filters keys"], correct: 1, explanation: "It maps over each key K in T to create a new type for each property." },
    ],
    challenge: {
      title: "Type Transformer",
      description: "Create a mapped type `Nullable<T>` that makes every property of T allow null (type becomes T[K] | null). Apply it to interface Stats { hp: number; mp: number } and create a variable with hp set to null.",
      starterCode: "// Define Nullable<T> mapped type\n\n// Define Stats interface\n\n// Create variable with nullable stats\n\n// Log hp\n",
      expectedOutput: "null",
      hints: ["type Nullable<T> = { [K in keyof T]: T[K] | null }", "Use [K in keyof T] to iterate", "Set hp: null in the object"],
      solution: `type Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ninterface Stats { hp: number; mp: number; }\n\nconst stats: Nullable<Stats> = { hp: null, mp: 50 };\nconsole.log(stats.hp);`,
      language: "typescript",
    },
  },
  {
    id: "ts-decorators",
    title: "Enums & Type Guards",
    tier: "ELITE",
    lesson: {
      title: "Enums & Type Guards",
      concept: "Enums define named constants; type guards narrow types at runtime.",
      explanation:
        "Enums create a set of named constants (numeric or string). Type guards use typeof, instanceof, or custom functions to narrow union types. The 'in' operator checks property existence. Discriminated unions use a shared literal property.",
      codeExample: `// String enum
enum Rank {
  Rookie = "ROOKIE",
  Champion = "CHAMPION",
  Elite = "ELITE"
}

let myRank: Rank = Rank.Champion;

// Type guard with discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side ** 2;
  }
}`,
      language: "typescript",
    },
    quiz: [
      { question: "What's the default value type for enum members?", choices: ["String", "Number (auto-incrementing)", "Boolean", "Symbol"], correct: 1, explanation: "By default, enum members are auto-incrementing numbers starting from 0." },
      { question: "What is a discriminated union?", choices: ["Any union type", "A union where each member has a shared literal property", "An enum", "A class hierarchy"], correct: 1, explanation: "Discriminated unions use a common literal property (like 'kind') to distinguish members." },
      { question: "What does a type guard do?", choices: ["Prevents runtime errors", "Narrows a type within a code block", "Validates input", "Encrypts data"], correct: 1, explanation: "Type guards narrow a broader type to a more specific one within a conditional block." },
    ],
    challenge: {
      title: "Game Entity System",
      description: "Create an enum Direction with Up, Down, Left, Right (string values). Write a function move(dir: Direction) that logs 'Moving [direction]'. Call it with Direction.Up.",
      starterCode: "// Define Direction enum\n\n// Write move function\n\n// Call it\n",
      expectedOutput: "Moving UP",
      hints: ["enum Direction { Up = 'UP', ... }", "Use the enum value in the template literal", "Direction.Up accesses the 'UP' value"],
      solution: `enum Direction {\n  Up = "UP",\n  Down = "DOWN",\n  Left = "LEFT",\n  Right = "RIGHT"\n}\n\nfunction move(dir: Direction): void {\n  console.log(\`Moving \${dir}\`);\n}\n\nmove(Direction.Up);`,
      language: "typescript",
    },
  },
];
