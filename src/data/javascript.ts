import { Module } from "./curriculum";

export const javascriptModules: Module[] = [
  // === ROOKIE TIER ===
  {
    id: "js-variables",
    title: "Variables (let, const, var)",
    tier: "EASY",
    lesson: {
      title: "Variables in JavaScript",
      concept: "JavaScript has three ways to declare variables: let, const, and var.",
      explanation:
        "Use 'const' for values that won't change, 'let' for values that will change, and avoid 'var' (old way, has scoping issues). JavaScript is dynamically typed — the type is determined by the value assigned.",
      codeExample: `// const - cannot be reassigned
const playerName = "Arcade Hero";

// let - can be reassigned
let score = 0;
score = 100;  // OK!

// Template literals (backticks)
console.log(\`\${playerName}: \${score} pts\`);

// Types
typeof playerName; // "string"
typeof score;      // "number"
typeof true;       // "boolean"`,
      language: "javascript",
    },
    quiz: [
      {
        question: "Which keyword declares a variable that cannot be reassigned?",
        choices: ["let", "var", "const", "static"],
        correct: 2,
        explanation: "const declares a constant — it cannot be reassigned after initialization.",
      },
      {
        question: "What are backtick strings called?",
        choices: ["Regular strings", "Template literals", "Raw strings", "Format strings"],
        correct: 1,
        explanation: "Template literals use backticks `` and allow ${expression} interpolation.",
      },
      {
        question: "What does typeof 42 return?",
        choices: ['"integer"', '"number"', '"int"', '"Number"'],
        correct: 1,
        explanation: "JavaScript has a single 'number' type for all numeric values.",
      },
    ],
    challenge: {
      title: "Player Stats Setup",
      description:
        'Declare a const `GAME_TITLE` set to "Quest Prep", a let `playerHP` set to 100, and log them in a template literal: "[GAME_TITLE] - HP: [playerHP]".',
      starterCode: `// Declare your variables\n\n\n// Log with template literal\n`,
      expectedOutput: "Quest Prep - HP: 100",
      hints: [
        "Use const for GAME_TITLE since it won't change",
        "Use let for playerHP since HP can change",
        "Use backticks with ${} for template literals",
      ],
      solution: `const GAME_TITLE = "Quest Prep";\nlet playerHP = 100;\nconsole.log(\`\${GAME_TITLE} - HP: \${playerHP}\`);`,
      language: "javascript",
    },
  },

  {
    id: "js-arrays",
    title: "Arrays & Methods",
    tier: "EASY",
    lesson: {
      title: "Arrays in JavaScript",
      concept: "Arrays store ordered lists of values and have powerful built-in methods.",
      explanation:
        "Create arrays with []. Key methods: push() adds to end, pop() removes from end, map() transforms each element, filter() keeps elements that pass a test. Arrays are zero-indexed.",
      codeExample: `const quests = ["Dragon", "Goblin", "Wizard"];

// Add and remove
quests.push("Phoenix");
quests.pop(); // removes "Phoenix"

// map - transform each item
const shouts = quests.map(q => q.toUpperCase());
console.log(shouts);

// filter - keep matching items
const long = quests.filter(q => q.length > 5);
console.log(long); // ["Dragon", "Goblin", "Wizard"]`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What does .push() do?",
        choices: ["Removes first item", "Adds to end", "Sorts array", "Reverses array"],
        correct: 1,
        explanation: "push() adds one or more elements to the end of an array.",
      },
      {
        question: "What does .map() return?",
        choices: ["Nothing", "A new array", "A boolean", "The original array"],
        correct: 1,
        explanation: "map() creates and returns a new array with transformed elements.",
      },
      {
        question: "What is the index of 'b' in ['a', 'b', 'c']?",
        choices: ["0", "1", "2", "3"],
        correct: 1,
        explanation: "Arrays are zero-indexed. 'a' is 0, 'b' is 1, 'c' is 2.",
      },
    ],
    challenge: {
      title: "Quest Log Manager",
      description:
        'Create an array `quests` with ["Slay Dragon", "Find Gem", "Save Town"]. Use .filter() to keep only quests containing "a" (case-sensitive). Log the length of the filtered result.',
      starterCode: `// Create quests array\n\n// Filter quests containing "a"\n\n// Log the count\n`,
      expectedOutput: "2",
      hints: [
        "Use .filter(q => q.includes('a'))",
        "includes() checks if a string contains a substring",
        "Log the .length of the filtered array",
      ],
      solution: `const quests = ["Slay Dragon", "Find Gem", "Save Town"];\nconst filtered = quests.filter(q => q.includes("a"));\nconsole.log(filtered.length);`,
      language: "javascript",
    },
  },
  // === CHAMPI0N TIER ===
  {
    id: "js-functions",
    title: "Functions & Arrow Functions",
    tier: "MEDIUM",
    lesson: {
      title: "Functions & Arrow Syntax",
      concept: "Functions encapsulate reusable logic. Arrow functions provide concise syntax.",
      explanation:
        "Traditional functions use the function keyword. Arrow functions (=>) are shorter and don't have their own 'this'. Use them for callbacks and short expressions. If the body is a single expression, you can skip {} and return.",
      codeExample: `// Traditional function
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const double = (n) => n * 2;

// Arrow with body
const calculateXP = (base, bonus) => {
  const total = base + bonus;
  return total;
};

console.log(greet("Coder"));
console.log(double(50));`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What is the short form of: (x) => { return x * 2; }",
        choices: ["(x) => x * 2", "x => return x * 2", "(x) -> x * 2", "x: x * 2"],
        correct: 0,
        explanation: "Single-expression arrow functions can omit {} and return keyword.",
      },
      {
        question: "Can arrow functions be named?",
        choices: ["Yes, always", "No, they must be assigned to a variable", "Only in strict mode", "Only with const"],
        correct: 1,
        explanation: "Arrow functions are anonymous — you assign them to a variable to name them.",
      },
      {
        question: "What does a function without a return statement return?",
        choices: ["null", "0", "undefined", "false"],
        correct: 2,
        explanation: "Functions without an explicit return statement return undefined.",
      },
    ],
    challenge: {
      title: "Damage Calculator",
      description:
        "Write an arrow function `calcDamage` that takes `weapon` (number) and `critical` (boolean, default false). If critical is true, return weapon * 2.5, else return weapon. Call with (80, true) and log result.",
      starterCode: `// Write your arrow function\n\n\n// Call it and log\n`,
      expectedOutput: "200",
      hints: [
        "Use default param: (weapon, critical = false) =>",
        "Use a ternary: critical ? weapon * 2.5 : weapon",
        "Call: calcDamage(80, true)",
      ],
      solution: `const calcDamage = (weapon, critical = false) => {\n  return critical ? weapon * 2.5 : weapon;\n};\nconsole.log(calcDamage(80, true));`,
      language: "javascript",
    },
  },

  {
    id: "js-objects",
    title: "Objects & Destructuring",
    tier: "MEDIUM",
    lesson: {
      title: "Objects & Destructuring",
      concept: "Objects store key-value pairs. Destructuring extracts values elegantly.",
      explanation:
        "Objects group related data with named keys. Access with dot notation (obj.key) or bracket notation (obj['key']). Destructuring lets you unpack properties into variables. Spread (...) copies/merges objects.",
      codeExample: `const player = {
  name: "Shadow",
  level: 42,
  stats: { hp: 100, mp: 50 }
};

// Destructuring
const { name, level } = player;
const { hp } = player.stats;

// Spread to copy/merge
const upgraded = { ...player, level: 43 };
console.log(\`\${name} leveled up to \${upgraded.level}!\`);`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What does destructuring do?",
        choices: ["Deletes an object", "Extracts properties into variables", "Sorts an object", "Converts to array"],
        correct: 1,
        explanation: "Destructuring unpacks object properties into standalone variables.",
      },
      {
        question: "What does the spread operator (...) do with objects?",
        choices: ["Deletes properties", "Creates a shallow copy/merge", "Converts to string", "Adds methods"],
        correct: 1,
        explanation: "Spread (...) creates a shallow copy, and can merge objects together.",
      },
      {
        question: "How do you access a property with a space in its name?",
        choices: ["obj.my key", 'obj["my key"]', "obj->my key", "obj.get('my key')"],
        correct: 1,
        explanation: "Bracket notation allows access with any string key, including spaces.",
      },
    ],
    challenge: {
      title: "Character Builder",
      description:
        'Create an object `hero` with properties: name ("Pixel"), class ("Mage"), hp (120). Use destructuring to extract name and hp, then log: "Pixel has 120 HP".',
      starterCode: `// Create hero object\n\n// Destructure name and hp\n\n// Log the message\n`,
      expectedOutput: "Pixel has 120 HP",
      hints: [
        "Use { key1, key2 } = object to destructure",
        "Use template literals for the output",
        'Note: "class" is a reserved word — still works as object key!',
      ],
      solution: `const hero = { name: "Pixel", class: "Mage", hp: 120 };\nconst { name, hp } = hero;\nconsole.log(\`\${name} has \${hp} HP\`);`,
      language: "javascript",
    },
  },
  // === ELITE TIER ===
  {
    id: "js-async",
    title: "Async/Await & Promises",
    tier: "HARD",
    lesson: {
      title: "Async/Await",
      concept: "Async operations let code run without blocking, using Promises.",
      explanation:
        "Promises represent future values (pending → fulfilled/rejected). async functions return Promises. await pauses until a Promise resolves. Use try/catch for error handling. This is how you handle API calls, file reads, and timers.",
      codeExample: `// Simulating an API call
const fetchQuest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Dragon Quest", xp: 500 });
    }, 1000);
  });
};

// Using async/await
async function startQuest() {
  try {
    const quest = await fetchQuest();
    console.log(\`Started: \${quest.name}\`);
  } catch (error) {
    console.log("Quest failed!");
  }
}`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What does await do?",
        choices: ["Creates a new thread", "Pauses until Promise resolves", "Cancels a Promise", "Returns undefined"],
        correct: 1,
        explanation: "await pauses the async function until the Promise settles.",
      },
      {
        question: "Where can you use await?",
        choices: ["Anywhere", "Only inside async functions", "Only in loops", "Only with fetch()"],
        correct: 1,
        explanation: "await can only be used inside functions marked with async.",
      },
      {
        question: "How do you handle errors with async/await?",
        choices: [".catch()", "try/catch", "if/else", "onerror"],
        correct: 1,
        explanation: "Wrap await calls in try/catch blocks to handle rejections.",
      },
    ],
    challenge: {
      title: "Quest Loader",
      description:
        'Write an async function `loadQuest` that awaits a Promise resolving to "Epic Quest Loaded" after 100ms. Log the result. (Hint: create a helper that returns a new Promise with setTimeout).',
      starterCode: `// Helper function that returns a promise\nconst delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));\n\n// Write your async function\n\n\n// Call it\n`,
      expectedOutput: "Epic Quest Loaded",
      hints: [
        "Use async function loadQuest() {}",
        'await delay(100, "Epic Quest Loaded")',
        "Log the awaited result",
      ],
      solution: `const delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));\n\nasync function loadQuest() {\n  const result = await delay(100, "Epic Quest Loaded");\n  console.log(result);\n}\n\nloadQuest();`,
      language: "javascript",
    },
  },
  {
    id: "js-dom",
    title: "DOM Manipulation",
    tier: "HARD",
    lesson: {
      title: "DOM Manipulation",
      concept: "The DOM lets JavaScript interact with and modify HTML elements.",
      explanation:
        "The Document Object Model represents HTML as a tree of objects. Use querySelector() to find elements, textContent/innerHTML to change content, classList to toggle styles, and addEventListener() for interactivity.",
      codeExample: `// Select elements
const btn = document.querySelector("#start-btn");
const display = document.querySelector(".score");

// Modify content and style
display.textContent = "Score: 100";
display.classList.add("highlight");

// Listen for events
btn.addEventListener("click", () => {
  display.textContent = "Game Started!";
  btn.disabled = true;
});`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What does querySelector() return?",
        choices: ["All matching elements", "First matching element", "A boolean", "An array"],
        correct: 1,
        explanation: "querySelector returns the FIRST element matching the CSS selector.",
      },
      {
        question: "What's the difference between textContent and innerHTML?",
        choices: ["No difference", "textContent is text only, innerHTML parses HTML", "innerHTML is faster", "textContent supports CSS"],
        correct: 1,
        explanation: "textContent sets/gets plain text. innerHTML can include HTML tags.",
      },
      {
        question: "What does addEventListener do?",
        choices: ["Creates HTML", "Attaches a function to run on an event", "Removes elements", "Loads a page"],
        correct: 1,
        explanation: "addEventListener attaches a callback function that fires when the event occurs.",
      },
    ],
    challenge: {
      title: "Click Counter",
      description:
        'Imagine a button with id="clicker" and a span with id="count". Write code that increments the count each click. For this challenge, just write the logic assuming elements exist. Log "Count: 1" as if clicked once.',
      starterCode: `// Simulate DOM elements\nlet count = 0;\n\n// Write a function that increments and logs\n\n\n// Simulate one click\n`,
      expectedOutput: "Count: 1",
      hints: [
        "Create a function handleClick that increments count",
        "Log `Count: ${count}` inside it",
        "Call handleClick() once to simulate a click",
      ],
      solution: `let count = 0;\n\nfunction handleClick() {\n  count++;\n  console.log(\`Count: \${count}\`);\n}\n\nhandleClick();`,
      language: "javascript",
    },
  },
];
