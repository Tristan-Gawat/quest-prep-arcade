import { Module } from "./curriculum";

export const javascriptModules: Module[] = [
  // === EASY TIER ===
  {
    id: "js-console-output",
    title: "Console & Output",
    tier: "EASY",
    lesson: {
      title: "Console & Output",
      concept: "console.log is your primary tool for outputting data in JavaScript.",
      explanation:
        "Use console.log() to print values to the console. Template literals (backticks) allow embedding expressions with ${} syntax. You can log strings, numbers, booleans, and even objects. console.warn() and console.error() provide additional output levels.",
      codeExample: `// Basic output
console.log("Hello, World!");

// Multiple values
console.log("Score:", 100);

// Template literals
const name = "Coder";
console.log(\`Welcome, \${name}!\`);

// Expressions inside templates
console.log(\`2 + 2 = \${2 + 2}\`);

// Other console methods
console.warn("Low health!");
console.error("Game over!");`,
      language: "javascript",
    },
    quiz: [
      {
        question: "Which method prints output to the console?",
        choices: ["print()", "console.log()", "echo()", "System.out()"],
        correct: 1,
        explanation: "console.log() is the standard way to output values in JavaScript.",
      },
      {
        question: "What syntax embeds expressions in template literals?",
        choices: ["#{expr}", "${expr}", "%{expr}", "@{expr}"],
        correct: 1,
        explanation: "Template literals use ${expression} inside backtick strings.",
      },
      {
        question: "Which quotes are used for template literals?",
        choices: ["Single quotes ''", "Double quotes \"\"", "Backticks ``", "Parentheses ()"],
        correct: 2,
        explanation: "Template literals require backtick characters (`).",
      },
    ],
    challenge: {
      title: "Welcome Message",
      description:
        "Create a variable `game` set to \"Arcade Quest\". Use console.log with a template literal to output: \"Now playing: Arcade Quest\"",
      starterCode: `// Create your variable\n\n// Log with template literal\n`,
      expectedOutput: "Now playing: Arcade Quest",
      hints: [
        "Use const or let to declare the variable",
        "Use backticks for the template literal",
        "Embed the variable with ${game}",
      ],
      solution: `const game = "Arcade Quest";\nconsole.log(\`Now playing: \${game}\`);`,
      language: "javascript",
    },
  },


  {
    id: "js-variables-types",
    title: "Variables & Types",
    tier: "EASY",
    lesson: {
      title: "Variables & Types",
      concept: "JavaScript has three ways to declare variables: let, const, and var.",
      explanation:
        "Use 'const' for values that won't change, 'let' for values that will change, and avoid 'var' (legacy, has scoping issues). JavaScript is dynamically typed — the type is determined by the value assigned. Use typeof to check types. Type coercion automatically converts types in certain contexts.",
      codeExample: `// const - cannot be reassigned
const MAX_LEVEL = 99;

// let - can be reassigned
let score = 0;
score = 100;

// var - function-scoped (avoid)
var old = "legacy";

// typeof checks
typeof "hello";  // "string"
typeof 42;       // "number"
typeof true;     // "boolean"
typeof undefined; // "undefined"

// Type coercion
"5" + 3;   // "53" (string concat)
"5" - 3;   // 2 (numeric)
Boolean(""); // false`,
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
        question: "What does typeof 42 return?",
        choices: ['"integer"', '"number"', '"int"', '"Number"'],
        correct: 1,
        explanation: "JavaScript has a single 'number' type for all numeric values (integers and floats).",
      },
      {
        question: "What is the result of \"5\" + 3 in JavaScript?",
        choices: ["8", "\"53\"", "\"8\"", "NaN"],
        correct: 1,
        explanation: "The + operator with a string triggers concatenation, so \"5\" + 3 becomes \"53\".",
      },
    ],
    challenge: {
      title: "Player Stats Setup",
      description:
        "Declare a const `GAME_TITLE` set to \"CodeLapse\", a let `playerHP` set to 100, and log them in a template literal: \"CodeLapse - HP: 100\".",
      starterCode: `// Declare your variables\n\n\n// Log with template literal\n`,
      expectedOutput: "CodeLapse - HP: 100",
      hints: [
        "Use const for GAME_TITLE since it won't change",
        "Use let for playerHP since HP can change",
        "Use backticks with ${} for template literals",
      ],
      solution: `const GAME_TITLE = "CodeLapse";\nlet playerHP = 100;\nconsole.log(\`\${GAME_TITLE} - HP: \${playerHP}\`);`,
      language: "javascript",
    },
  },


  {
    id: "js-operators-conditionals",
    title: "Operators & Conditionals",
    tier: "EASY",
    lesson: {
      title: "Operators & Conditionals",
      concept: "Conditionals control program flow based on boolean expressions.",
      explanation:
        "Use if/else for branching, ternary (? :) for inline conditions, and switch for multiple cases. Comparison operators: === (strict equal), !== (strict not equal), >, <, >=, <=. Always prefer === over == to avoid type coercion surprises.",
      codeExample: `const hp = 25;

// if / else if / else
if (hp <= 0) {
  console.log("Game Over");
} else if (hp < 30) {
  console.log("Critical!");
} else {
  console.log("Healthy");
}

// Ternary operator
const status = hp > 50 ? "Strong" : "Weak";

// Switch statement
const rank = "S";
switch (rank) {
  case "S": console.log("Supreme"); break;
  case "A": console.log("Ace"); break;
  default: console.log("Rookie");
}`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What is the difference between == and ===?",
        choices: [
          "No difference",
          "=== checks type and value, == only checks value",
          "== is faster",
          "=== works only with strings",
        ],
        correct: 1,
        explanation: "=== (strict equality) checks both type and value without coercion.",
      },
      {
        question: "What does the ternary operator return?",
        choices: [
          "Always true",
          "One of two values based on a condition",
          "Three values",
          "A boolean only",
        ],
        correct: 1,
        explanation: "The ternary (condition ? valueIfTrue : valueIfFalse) returns one of two values.",
      },
      {
        question: "What happens if you forget 'break' in a switch case?",
        choices: [
          "Error is thrown",
          "Execution falls through to the next case",
          "The switch exits",
          "Nothing, it's optional",
        ],
        correct: 1,
        explanation: "Without break, execution falls through to subsequent cases until a break is hit.",
      },
    ],
    challenge: {
      title: "Rank Calculator",
      description:
        "Given `const score = 85`, use if/else to assign a `rank` variable: 90+ = \"S\", 80+ = \"A\", 70+ = \"B\", else \"C\". Log the rank.",
      starterCode: `const score = 85;\n\n// Determine rank with if/else\n\n\n// Log the rank\n`,
      expectedOutput: "A",
      hints: [
        "Start with the highest threshold first (>= 90)",
        "Use else if for each subsequent tier",
        "Use let for rank since it's assigned inside the if/else",
      ],
      solution: `const score = 85;\nlet rank;\nif (score >= 90) {\n  rank = "S";\n} else if (score >= 80) {\n  rank = "A";\n} else if (score >= 70) {\n  rank = "B";\n} else {\n  rank = "C";\n}\nconsole.log(rank);`,
      language: "javascript",
    },
  },


  {
    id: "js-arrays-methods",
    title: "Arrays & Methods",
    tier: "EASY",
    lesson: {
      title: "Arrays & Methods",
      concept: "Arrays store ordered lists of values and have powerful built-in methods.",
      explanation:
        "Create arrays with []. Key methods: push() adds to end, pop() removes from end, map() transforms each element, filter() keeps elements that pass a test, find() returns the first match. Arrays are zero-indexed.",
      codeExample: `const quests = ["Dragon", "Goblin", "Wizard"];

// Add and remove
quests.push("Phoenix");  // adds to end
quests.pop();            // removes from end

// map - transform each item
const shouts = quests.map(q => q.toUpperCase());
console.log(shouts); // ["DRAGON", "GOBLIN", "WIZARD"]

// filter - keep matching items
const long = quests.filter(q => q.length > 5);
console.log(long); // ["Dragon", "Goblin", "Wizard"]

// find - first match
const found = quests.find(q => q.startsWith("G"));
console.log(found); // "Goblin"`,
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
        choices: ["Nothing (undefined)", "A new array", "A boolean", "The original array mutated"],
        correct: 1,
        explanation: "map() creates and returns a new array with transformed elements.",
      },
      {
        question: "What does .find() return if no element matches?",
        choices: ["null", "undefined", "false", "An empty array"],
        correct: 1,
        explanation: "find() returns undefined if no element passes the test function.",
      },
    ],
    challenge: {
      title: "Quest Log Manager",
      description:
        "Create an array `quests` with [\"Slay Dragon\", \"Find Gem\", \"Save Town\"]. Use .filter() to keep only quests containing \"a\" (case-sensitive). Log the length of the filtered result.",
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


  // === MEDIUM TIER ===
  {
    id: "js-loops-iteration",
    title: "Loops & Iteration",
    tier: "MEDIUM",
    lesson: {
      title: "Loops & Iteration",
      concept: "Loops repeat code blocks. JavaScript offers several loop types for different use cases.",
      explanation:
        "for loops are classic counter-based iteration. while loops run until a condition is false. for...of iterates over iterable values (arrays, strings). for...in iterates over object keys. forEach is an array method that runs a callback for each element.",
      codeExample: `const enemies = ["Slime", "Bat", "Ghost"];

// for loop
for (let i = 0; i < enemies.length; i++) {
  console.log(enemies[i]);
}

// for...of (values)
for (const enemy of enemies) {
  console.log(\`Fight: \${enemy}\`);
}

// for...in (keys/indices)
const stats = { hp: 100, mp: 50, atk: 30 };
for (const key in stats) {
  console.log(\`\${key}: \${stats[key]}\`);
}

// forEach
enemies.forEach((enemy, index) => {
  console.log(\`\${index + 1}. \${enemy}\`);
});

// while
let countdown = 3;
while (countdown > 0) {
  console.log(countdown);
  countdown--;
}`,
      language: "javascript",
    },
    quiz: [
      {
        question: "Which loop is best for iterating over array values?",
        choices: ["for...in", "for...of", "while", "do...while"],
        correct: 1,
        explanation: "for...of iterates directly over iterable values like arrays and strings.",
      },
      {
        question: "What does for...in iterate over?",
        choices: ["Array values", "Object keys/property names", "Numbers only", "Boolean conditions"],
        correct: 1,
        explanation: "for...in iterates over enumerable property names (keys) of an object.",
      },
      {
        question: "What is the difference between forEach and map?",
        choices: [
          "No difference",
          "forEach returns undefined, map returns a new array",
          "forEach is faster",
          "map cannot use callbacks",
        ],
        correct: 1,
        explanation: "forEach executes a function but returns nothing. map returns a new transformed array.",
      },
    ],
    challenge: {
      title: "Power Counter",
      description:
        "Use a for loop to sum all numbers from 1 to 5 (inclusive) into a variable `total`. Then log the total.",
      starterCode: `let total = 0;\n\n// Write a for loop summing 1 to 5\n\n\n// Log the total\n`,
      expectedOutput: "15",
      hints: [
        "Start with let i = 1 and go while i <= 5",
        "Add i to total each iteration: total += i",
        "After the loop, console.log(total)",
      ],
      solution: `let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  total += i;\n}\nconsole.log(total);`,
      language: "javascript",
    },
  },


  {
    id: "js-functions-arrows",
    title: "Functions & Arrow Functions",
    tier: "MEDIUM",
    lesson: {
      title: "Functions & Arrow Functions",
      concept: "Functions encapsulate reusable logic. Arrow functions provide concise syntax.",
      explanation:
        "Traditional functions use the function keyword and are hoisted. Arrow functions (=>) are shorter, don't have their own 'this', and are not hoisted. Default parameters provide fallback values. If the body is a single expression, you can skip {} and return.",
      codeExample: `// Function declaration (hoisted)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function (concise)
const double = (n) => n * 2;

// Arrow with body + default param
const calcXP = (base, multiplier = 1) => {
  return base * multiplier;
};

console.log(greet("Coder"));   // "Hello, Coder!"
console.log(double(50));        // 100
console.log(calcXP(200, 1.5)); // 300`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What is the short form of: (x) => { return x * 2; }?",
        choices: ["(x) => x * 2", "x => return x * 2", "(x) -> x * 2", "x: x * 2"],
        correct: 0,
        explanation: "Single-expression arrow functions can omit {} and the return keyword.",
      },
      {
        question: "What does a function without a return statement return?",
        choices: ["null", "0", "undefined", "false"],
        correct: 2,
        explanation: "Functions without an explicit return statement return undefined.",
      },
      {
        question: "What is a default parameter?",
        choices: [
          "A parameter that is always required",
          "A fallback value used when no argument is passed",
          "The first parameter only",
          "A parameter that cannot change",
        ],
        correct: 1,
        explanation: "Default parameters provide a fallback value when the argument is undefined or not provided.",
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
    id: "js-objects-destructuring",
    title: "Objects & Destructuring",
    tier: "MEDIUM",
    lesson: {
      title: "Objects & Destructuring",
      concept: "Objects store key-value pairs. Destructuring extracts values elegantly.",
      explanation:
        "Objects group related data with named keys. Access with dot notation (obj.key) or bracket notation (obj['key']). Destructuring lets you unpack properties into variables. Spread (...) copies/merges objects. Computed property names use [expression] as keys.",
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

// Computed property names
const key = "score";
const obj = { [key]: 9001 };

// Shorthand properties
const x = 10, y = 20;
const point = { x, y }; // same as { x: x, y: y }

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
        choices: ["Deletes properties", "Creates a shallow copy/merge", "Converts to string", "Deep clones"],
        correct: 1,
        explanation: "Spread (...) creates a shallow copy, and can merge objects together.",
      },
      {
        question: "What is a computed property name?",
        choices: [
          "A property that calculates itself",
          "Using [expression] as an object key",
          "A read-only property",
          "A property with a getter",
        ],
        correct: 1,
        explanation: "Computed property names let you use a variable or expression as the key: { [expr]: value }.",
      },
    ],
    challenge: {
      title: "Character Builder",
      description:
        "Create an object `hero` with properties: name (\"Pixel\"), role (\"Mage\"), hp (120). Use destructuring to extract name and hp, then log: \"Pixel has 120 HP\".",
      starterCode: `// Create hero object\n\n// Destructure name and hp\n\n// Log the message\n`,
      expectedOutput: "Pixel has 120 HP",
      hints: [
        "Use { key1, key2 } = object to destructure",
        "Use template literals for the output",
        "You can destructure just the properties you need",
      ],
      solution: `const hero = { name: "Pixel", role: "Mage", hp: 120 };\nconst { name, hp } = hero;\nconsole.log(\`\${name} has \${hp} HP\`);`,
      language: "javascript",
    },
  },


  {
    id: "js-dom-manipulation",
    title: "DOM Manipulation",
    tier: "MEDIUM",
    lesson: {
      title: "DOM Manipulation",
      concept: "The DOM lets JavaScript interact with and modify HTML elements on a web page.",
      explanation:
        "The Document Object Model represents HTML as a tree of objects. Use querySelector() to find elements, createElement() to make new ones, textContent/innerHTML to change content, classList to toggle styles, and addEventListener() for interactivity.",
      codeExample: `// Select elements
const btn = document.querySelector("#start-btn");
const list = document.querySelector(".quest-list");

// Modify content and style
btn.textContent = "Start Game";
btn.classList.add("active");

// Create new elements
const item = document.createElement("li");
item.textContent = "New Quest";
list.appendChild(item);

// Event listeners
btn.addEventListener("click", (event) => {
  event.target.classList.toggle("pressed");
  console.log("Button clicked!");
});

// Remove elements
item.remove();`,
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
        choices: [
          "No difference",
          "textContent is plain text, innerHTML parses HTML",
          "innerHTML is safer",
          "textContent supports CSS",
        ],
        correct: 1,
        explanation: "textContent sets/gets plain text. innerHTML can include and parse HTML tags.",
      },
      {
        question: "How do you add a CSS class to an element?",
        choices: [
          "element.class = 'name'",
          "element.classList.add('name')",
          "element.addStyle('name')",
          "element.css('name')",
        ],
        correct: 1,
        explanation: "classList.add() adds a class. classList also has remove(), toggle(), and contains().",
      },
    ],
    challenge: {
      title: "Click Counter",
      description:
        "Simulate a click counter: declare `let count = 0`, write a function `handleClick` that increments count and logs \"Count: X\". Call handleClick() once.",
      starterCode: `let count = 0;\n\n// Write the handleClick function\n\n\n// Simulate one click\n`,
      expectedOutput: "Count: 1",
      hints: [
        "Create a function that increments count++",
        "Log using template literal: `Count: ${count}`",
        "Call handleClick() once to simulate a click",
      ],
      solution: `let count = 0;\n\nfunction handleClick() {\n  count++;\n  console.log(\`Count: \${count}\`);\n}\n\nhandleClick();`,
      language: "javascript",
    },
  },


  // === HARD TIER ===
  {
    id: "js-async-promises",
    title: "Async & Promises",
    tier: "HARD",
    lesson: {
      title: "Async & Promises",
      concept: "Async operations let code run without blocking, using Promises and async/await.",
      explanation:
        "Callbacks were the original async pattern but led to 'callback hell'. Promises represent future values (pending → fulfilled/rejected). async functions return Promises. await pauses until a Promise resolves. Use try/catch for error handling. fetch() is the modern API for HTTP requests.",
      codeExample: `// Creating a Promise
const fetchQuest = () => {
  return new Promise((resolve, reject) => {
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
    console.error("Quest failed:", error);
  }
}

// Promise.all for parallel operations
const [quest1, quest2] = await Promise.all([
  fetchQuest(),
  fetchQuest()
]);

// fetch API
const response = await fetch("https://api.example.com/data");
const data = await response.json();`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What does await do?",
        choices: ["Creates a new thread", "Pauses until Promise resolves", "Cancels a Promise", "Returns undefined"],
        correct: 1,
        explanation: "await pauses the async function execution until the Promise settles.",
      },
      {
        question: "Where can you use the await keyword?",
        choices: ["Anywhere", "Only inside async functions", "Only in loops", "Only with fetch()"],
        correct: 1,
        explanation: "await can only be used inside functions marked with the async keyword (or at top-level in modules).",
      },
      {
        question: "What does Promise.all() do?",
        choices: [
          "Runs promises sequentially",
          "Waits for all promises to resolve (or one to reject)",
          "Cancels all promises",
          "Returns the fastest promise only",
        ],
        correct: 1,
        explanation: "Promise.all() takes an array of promises and resolves when all succeed, or rejects on the first failure.",
      },
    ],
    challenge: {
      title: "Quest Loader",
      description:
        "Write an async function `loadQuest` that awaits a Promise resolving to \"Epic Quest Loaded\" after 100ms. Log the result. Use the provided delay helper.",
      starterCode: `const delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));\n\n// Write your async function\n\n\n// Call it\n`,
      expectedOutput: "Epic Quest Loaded",
      hints: [
        "Use async function loadQuest() {}",
        "await delay(100, \"Epic Quest Loaded\")",
        "Log the awaited result with console.log",
      ],
      solution: `const delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));\n\nasync function loadQuest() {\n  const result = await delay(100, "Epic Quest Loaded");\n  console.log(result);\n}\n\nloadQuest();`,
      language: "javascript",
    },
  },


  {
    id: "js-classes-oop",
    title: "Classes & OOP",
    tier: "HARD",
    lesson: {
      title: "Classes & OOP",
      concept: "Classes provide a template for creating objects with shared behavior via inheritance.",
      explanation:
        "ES6 classes are syntactic sugar over prototype-based inheritance. Use constructor() for initialization, extends for inheritance, super() to call parent constructors. Private fields use # prefix. Static methods belong to the class itself, not instances.",
      codeExample: `class Character {
  #hp; // private field
  static count = 0;

  constructor(name, hp) {
    this.name = name;
    this.#hp = hp;
    Character.count++;
  }

  get health() { return this.#hp; }

  takeDamage(amount) {
    this.#hp = Math.max(0, this.#hp - amount);
    return this;
  }

  static getCount() {
    return Character.count;
  }
}

class Warrior extends Character {
  constructor(name) {
    super(name, 150); // call parent constructor
    this.armor = 20;
  }

  takeDamage(amount) {
    const reduced = Math.max(0, amount - this.armor);
    return super.takeDamage(reduced);
  }
}

const w = new Warrior("Tank");
console.log(w.health); // 150`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What does the # prefix indicate in a class field?",
        choices: ["It's a comment", "It's a private field", "It's a static field", "It's a constant"],
        correct: 1,
        explanation: "The # prefix makes a field truly private — only accessible within the class body.",
      },
      {
        question: "What does super() do in a subclass constructor?",
        choices: [
          "Creates a new class",
          "Calls the parent class constructor",
          "Makes the method static",
          "Deletes the parent",
        ],
        correct: 1,
        explanation: "super() calls the parent class constructor to initialize inherited properties.",
      },
      {
        question: "What is a static method?",
        choices: [
          "A method that cannot change",
          "A method that belongs to the class, not instances",
          "A private method",
          "A method with no parameters",
        ],
        correct: 1,
        explanation: "Static methods are called on the class itself (MyClass.method()), not on instances.",
      },
    ],
    challenge: {
      title: "RPG Entity System",
      description:
        "Create a class `Entity` with a constructor taking `name` and `hp`. Add a method `status()` that returns \"[name]: [hp] HP\". Create an instance with (\"Dragon\", 200) and log its status.",
      starterCode: `// Create the Entity class\n\n\n// Create instance and log status\n`,
      expectedOutput: "Dragon: 200 HP",
      hints: [
        "Use class Entity { constructor(name, hp) { ... } }",
        "Store params with this.name and this.hp",
        "status() should return a template literal string",
      ],
      solution: `class Entity {\n  constructor(name, hp) {\n    this.name = name;\n    this.hp = hp;\n  }\n\n  status() {\n    return \`\${this.name}: \${this.hp} HP\`;\n  }\n}\n\nconst dragon = new Entity("Dragon", 200);\nconsole.log(dragon.status());`,
      language: "javascript",
    },
  },


  // === EXPERT TIER ===
  {
    id: "js-modules-tooling",
    title: "Modules & Tooling",
    tier: "EXPERT",
    lesson: {
      title: "Modules & Tooling",
      concept: "ES Modules organize code into reusable files with import/export syntax.",
      explanation:
        "Named exports let you export multiple values from a file. Default exports provide a main export. Dynamic imports with import() load modules on demand (code splitting). npm is the package manager for installing dependencies. Bundlers (Vite, Webpack) transform modules for browsers.",
      codeExample: `// math.js - Named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// player.js - Default export
export default class Player {
  constructor(name) { this.name = name; }
}

// main.js - Importing
import Player from './player.js';
import { PI, add } from './math.js';

// Rename imports
import { add as sum } from './math.js';

// Dynamic import (lazy loading)
const loadLevel = async (id) => {
  const module = await import(\`./levels/level\${id}.js\`);
  return module.default;
};

// Re-exporting
export { add, PI } from './math.js';
export { default as Player } from './player.js';`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What is the difference between named and default exports?",
        choices: [
          "No difference",
          "A module can have many named exports but only one default export",
          "Default exports are faster",
          "Named exports don't need import",
        ],
        correct: 1,
        explanation: "A module can export multiple named values but only one default export.",
      },
      {
        question: "What does dynamic import() return?",
        choices: ["The module directly", "A Promise that resolves to the module", "A string", "undefined"],
        correct: 1,
        explanation: "import() returns a Promise that resolves to the module namespace object.",
      },
      {
        question: "What does a bundler do?",
        choices: [
          "Runs the code faster",
          "Combines modules into optimized files for the browser",
          "Installs npm packages",
          "Minifies HTML only",
        ],
        correct: 1,
        explanation: "Bundlers resolve imports, combine files, tree-shake unused code, and produce optimized output.",
      },
    ],
    challenge: {
      title: "Module Simulator",
      description:
        "Simulate module exports: create an object `MathModule` with properties `PI` (3.14159) and method `circleArea(r)` that returns PI * r * r. Destructure PI and circleArea from it, then log circleArea(10) rounded to 2 decimal places.",
      starterCode: `// Create MathModule object (simulating a module)\n\n// Destructure PI and circleArea\n\n// Log circleArea(10) rounded to 2 decimal places\n`,
      expectedOutput: "314.16",
      hints: [
        "Create an object with PI and a circleArea method",
        "Use destructuring: const { PI, circleArea } = MathModule",
        "Use .toFixed(2) to round to 2 decimal places",
      ],
      solution: `const MathModule = {\n  PI: 3.14159,\n  circleArea(r) { return this.PI * r * r; }\n};\nconst { PI, circleArea } = MathModule;\nconsole.log(circleArea.call(MathModule, 10).toFixed(2));`,
      language: "javascript",
    },
  },


  {
    id: "js-advanced-patterns",
    title: "Advanced Patterns",
    tier: "EXPERT",
    lesson: {
      title: "Advanced Patterns",
      concept: "Closures, proxies, generators, and design patterns enable powerful abstractions.",
      explanation:
        "Closures capture variables from their outer scope, enabling data privacy and factories. Proxy/Reflect intercept object operations. Generators (function*) produce values lazily with yield. WeakRef holds objects without preventing garbage collection. Design patterns like Observer and Singleton solve common problems.",
      codeExample: `// Closure - data privacy
function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    get: () => count
  };
}
const counter = createCounter(10);
counter.increment(); // 11

// Proxy - intercept operations
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : "Unknown";
  },
  set(target, prop, value) {
    if (typeof value !== "number") throw TypeError("Must be number");
    target[prop] = value;
    return true;
  }
};
const stats = new Proxy({}, handler);

// Generator - lazy iteration
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1

// WeakRef
let obj = { data: "important" };
const ref = new WeakRef(obj);
ref.deref(); // { data: "important" }`,
      language: "javascript",
    },
    quiz: [
      {
        question: "What is a closure?",
        choices: [
          "A way to close a program",
          "A function that retains access to its outer scope variables",
          "A type of loop",
          "An error handler",
        ],
        correct: 1,
        explanation: "A closure is a function bundled with its surrounding lexical scope, retaining access to outer variables.",
      },
      {
        question: "What does a Proxy allow you to do?",
        choices: [
          "Speed up code execution",
          "Intercept and customize fundamental object operations",
          "Create private variables",
          "Connect to external APIs",
        ],
        correct: 1,
        explanation: "Proxy lets you define custom behavior for fundamental operations (get, set, delete, etc.).",
      },
      {
        question: "What does yield do in a generator function?",
        choices: [
          "Ends the function permanently",
          "Pauses execution and produces a value",
          "Creates a new thread",
          "Returns undefined",
        ],
        correct: 1,
        explanation: "yield pauses the generator and produces a value. Execution resumes on the next .next() call.",
      },
    ],
    challenge: {
      title: "Closure Factory",
      description:
        "Create a function `createMultiplier(factor)` that returns a new function which multiplies any number by factor. Create a `triple` function using createMultiplier(3), then log triple(7).",
      starterCode: `// Create the closure factory\n\n// Create triple using the factory\n\n// Log triple(7)\n`,
      expectedOutput: "21",
      hints: [
        "createMultiplier returns (n) => n * factor",
        "The inner function 'closes over' the factor variable",
        "const triple = createMultiplier(3)",
      ],
      solution: `function createMultiplier(factor) {\n  return (n) => n * factor;\n}\n\nconst triple = createMultiplier(3);\nconsole.log(triple(7));`,
      language: "javascript",
    },
  },
];
