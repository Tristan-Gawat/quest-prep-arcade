import { Module } from "./curriculum";

export const pythonModules: Module[] = [
  // === ROOKIE TIER ===
  {
    id: "py-variables",
    title: "Variables & Data Types",
    tier: "EASY",
    lesson: {
      title: "Variables & Data Types",
      concept: "Variables are containers that store data values.",
      explanation:
        "In Python, you create a variable by assigning a value with the = operator. Python automatically detects the type (string, int, float, bool). No need to declare types explicitly!",
      codeExample: `# Creating variables
name = "Player One"    # string
score = 100            # integer
health = 99.5          # float
alive = True           # boolean

print(name)
print(type(score))`,
      language: "python",
    },
    quiz: [
      {
        question: "What symbol is used to assign a value to a variable in Python?",
        choices: ["==", "=", ":=", "->"],
        correct: 1,
        explanation: "The single = is the assignment operator. == is for comparison.",
      },
      {
        question: 'What is the type of: x = "hello"',
        choices: ["int", "float", "str", "bool"],
        correct: 2,
        explanation: 'Text wrapped in quotes creates a string (str) type.',
      },
      {
        question: "Which of these is a valid variable name?",
        choices: ["2fast", "my-var", "player_score", "class"],
        correct: 2,
        explanation: "Variable names can't start with numbers, use hyphens, or be reserved keywords.",
      },
    ],
    challenge: {
      title: "Create Your Player Card",
      description:
        "Create three variables: `player_name` (your name as a string), `level` (set to 1), and `xp` (set to 0). Then print all three.",
      starterCode: `# Create your variables below\n\n\n# Print them out\n`,
      expectedOutput: "player_name,level,xp",
      hints: [
        "Strings need quotes around them",
        "Integers don't need quotes",
        "Use print() to display values",
      ],
      solution: `player_name = "Hero"\nlevel = 1\nxp = 0\nprint(player_name)\nprint(level)\nprint(xp)`,
      language: "python",
    },
  },
  {
    id: "py-print",
    title: "Print & Input",
    tier: "EASY",
    lesson: {
      title: "Print & Input",
      concept: "print() displays output, input() reads user input.",
      explanation:
        "print() is your main way to show information. You can print strings, numbers, and combine them with f-strings. input() pauses the program and waits for the user to type something.",
      codeExample: `# Basic print
print("Hello, World!")

# f-string formatting
name = "Coder"
level = 5
print(f"{name} is level {level}")

# Multiple values
print("Score:", 100, "Lives:", 3)`,
      language: "python",
    },
    quiz: [
      {
        question: "What does print() do?",
        choices: ["Reads input", "Displays output", "Creates a variable", "Loops code"],
        correct: 1,
        explanation: "print() displays/outputs text and values to the console.",
      },
      {
        question: 'What is the output of: print(f"Level {2+3}")',
        choices: ["Level {2+3}", "Level 5", "f Level 5", "Error"],
        correct: 1,
        explanation: "f-strings evaluate expressions inside {} curly braces.",
      },
      {
        question: "What type does input() always return?",
        choices: ["int", "float", "str", "bool"],
        correct: 2,
        explanation: "input() always returns a string, even if the user types a number.",
      },
    ],
    challenge: {
      title: "Greeting Generator",
      description:
        'Use an f-string to print: "Welcome to Quest Prep, [name]! You have [xp] XP." where name="Arcade" and xp=500.',
      starterCode: `name = "Arcade"\nxp = 500\n# Print the welcome message using an f-string\n`,
      expectedOutput: "Welcome to Quest Prep, Arcade! You have 500 XP.",
      hints: [
        "Use f before the opening quote",
        "Put variables inside {curly braces}",
        "The whole thing goes inside print()",
      ],
      solution: `name = "Arcade"\nxp = 500\nprint(f"Welcome to Quest Prep, {name}! You have {xp} XP.")`,
      language: "python",
    },
  },

  // === CHAMPI0N TIER ===
  {
    id: "py-conditionals",
    title: "Conditionals (if/elif/else)",
    tier: "MEDIUM",
    lesson: {
      title: "Conditionals",
      concept: "Conditionals let your code make decisions based on conditions.",
      explanation:
        "Use if to check a condition, elif for additional checks, and else as a fallback. Python uses indentation (4 spaces) to define code blocks. Comparison operators: ==, !=, <, >, <=, >=.",
      codeExample: `score = 850

if score >= 1000:
    rank = "ELITE"
elif score >= 500:
    rank = "CHAMPI0N"
else:
    rank = "ROOKIE"

print(f"Your rank: {rank}")`,
      language: "python",
    },
    quiz: [
      {
        question: "What keyword checks an additional condition after if?",
        choices: ["else if", "elif", "elseif", "elsif"],
        correct: 1,
        explanation: "Python uses 'elif' (short for else if) for additional conditions.",
      },
      {
        question: "What operator checks if two values are equal?",
        choices: ["=", "==", "===", "equals()"],
        correct: 1,
        explanation: "== compares values for equality. = is for assignment.",
      },
      {
        question: "What defines a code block in Python?",
        choices: ["Curly braces {}", "Indentation", "Parentheses ()", "Keywords"],
        correct: 1,
        explanation: "Python uses indentation (typically 4 spaces) to define code blocks.",
      },
    ],
    challenge: {
      title: "Rank Calculator",
      description:
        "Write a program that assigns a rank based on XP: 1000+ = 'ELITE', 500-999 = 'CHAMPI0N', below 500 = 'ROOKIE'. Set xp=750 and print the rank.",
      starterCode: `xp = 750\n\n# Write your if/elif/else here\n\n# Print the rank\n`,
      expectedOutput: "CHAMPI0N",
      hints: [
        "Start with if xp >= 1000",
        "Use elif for the middle range",
        "else catches everything below 500",
      ],
      solution: `xp = 750\n\nif xp >= 1000:\n    rank = "ELITE"\nelif xp >= 500:\n    rank = "CHAMPI0N"\nelse:\n    rank = "ROOKIE"\n\nprint(rank)`,
      language: "python",
    },
  },
  {
    id: "py-loops",
    title: "Loops (for & while)",
    tier: "MEDIUM",
    lesson: {
      title: "Loops",
      concept: "Loops repeat code multiple times automatically.",
      explanation:
        "for loops iterate over sequences (lists, ranges, strings). while loops repeat as long as a condition is True. Use range(n) to loop n times. break exits a loop, continue skips to next iteration.",
      codeExample: `# for loop with range
for i in range(5):
    print(f"Level {i+1}")

# while loop
lives = 3
while lives > 0:
    print(f"Lives remaining: {lives}")
    lives -= 1

print("Game Over!")`,
      language: "python",
    },
    quiz: [
      {
        question: "What does range(5) generate?",
        choices: ["1,2,3,4,5", "0,1,2,3,4", "0,1,2,3,4,5", "1,2,3,4"],
        correct: 1,
        explanation: "range(5) generates numbers from 0 up to (but not including) 5.",
      },
      {
        question: "What keyword exits a loop immediately?",
        choices: ["stop", "exit", "break", "return"],
        correct: 2,
        explanation: "break immediately exits the current loop.",
      },
      {
        question: "When does a while loop stop?",
        choices: ["After 10 iterations", "When condition is False", "When it hits return", "Never"],
        correct: 1,
        explanation: "A while loop stops when its condition evaluates to False.",
      },
    ],
    challenge: {
      title: "XP Counter",
      description:
        "Use a for loop to calculate total XP from a list of quest rewards: [100, 250, 75, 300, 150]. Print the total.",
      starterCode: `rewards = [100, 250, 75, 300, 150]\ntotal_xp = 0\n\n# Loop through rewards and add to total_xp\n\n# Print total\n`,
      expectedOutput: "875",
      hints: [
        "Use: for reward in rewards:",
        "Add each reward to total_xp",
        "total_xp += reward adds to the running total",
      ],
      solution: `rewards = [100, 250, 75, 300, 150]\ntotal_xp = 0\n\nfor reward in rewards:\n    total_xp += reward\n\nprint(total_xp)`,
      language: "python",
    },
  },

  // === ELITE TIER ===
  {
    id: "py-functions",
    title: "Functions & Returns",
    tier: "HARD",
    lesson: {
      title: "Functions",
      concept: "Functions are reusable blocks of code that perform specific tasks.",
      explanation:
        "Define functions with def keyword. They can accept parameters and return values. Functions help organize code, avoid repetition, and make programs modular. Default parameters provide fallback values.",
      codeExample: `def calculate_damage(base, multiplier=1.0):
    """Calculate total damage dealt."""
    damage = base * multiplier
    return round(damage)

# Using the function
hit = calculate_damage(50, 1.5)
print(f"Damage dealt: {hit}")

# With default parameter
normal_hit = calculate_damage(50)
print(f"Normal hit: {normal_hit}")`,
      language: "python",
    },
    quiz: [
      {
        question: "What keyword defines a function in Python?",
        choices: ["function", "func", "def", "fn"],
        correct: 2,
        explanation: "Python uses 'def' (short for define) to create functions.",
      },
      {
        question: "What does return do in a function?",
        choices: ["Prints a value", "Sends a value back to the caller", "Loops the function", "Ends the program"],
        correct: 1,
        explanation: "return sends a value back to wherever the function was called from.",
      },
      {
        question: "What is a default parameter?",
        choices: ["A required input", "A value used when no argument is passed", "The first parameter", "A global variable"],
        correct: 1,
        explanation: "Default parameters have a preset value used when the caller doesn't provide one.",
      },
    ],
    challenge: {
      title: "Power-Up Function",
      description:
        "Write a function called `power_up` that takes `base_stat` and `boost` (default=10). It should return base_stat + boost. Call it with (50, 25) and print the result.",
      starterCode: `# Define your function here\n\n\n# Call it and print the result\n`,
      expectedOutput: "75",
      hints: [
        "Use def power_up(base_stat, boost=10):",
        "return base_stat + boost",
        "Call with power_up(50, 25)",
      ],
      solution: `def power_up(base_stat, boost=10):\n    return base_stat + boost\n\nresult = power_up(50, 25)\nprint(result)`,
      language: "python",
    },
  },
  {
    id: "py-lists",
    title: "Lists & List Methods",
    tier: "HARD",
    lesson: {
      title: "Lists & Methods",
      concept: "Lists store ordered collections of items that can be modified.",
      explanation:
        "Lists are created with square brackets []. They're mutable (changeable) and can hold mixed types. Key methods: append(), pop(), sort(), len(). Use indexing [0] to access items and slicing [1:3] for sublists.",
      codeExample: `# Creating and modifying lists
inventory = ["sword", "shield", "potion"]

# Add item
inventory.append("bow")

# Remove last item
removed = inventory.pop()

# Access by index
first_item = inventory[0]

# List comprehension
levels = [i * 10 for i in range(1, 6)]
print(levels)  # [10, 20, 30, 40, 50]`,
      language: "python",
    },
    quiz: [
      {
        question: "What method adds an item to the end of a list?",
        choices: ["add()", "push()", "append()", "insert()"],
        correct: 2,
        explanation: "append() adds an element to the end of a list.",
      },
      {
        question: "What is the index of the first element in a list?",
        choices: ["1", "0", "-1", "first"],
        correct: 1,
        explanation: "Python lists are zero-indexed: the first element is at index 0.",
      },
      {
        question: "What does [1:3] do on a list?",
        choices: ["Gets items at index 1 and 3", "Gets items from index 1 up to (not including) 3", "Gets first 3 items", "Removes items"],
        correct: 1,
        explanation: "Slicing [1:3] returns elements at index 1 and 2 (end index excluded).",
      },
    ],
    challenge: {
      title: "Inventory Manager",
      description:
        'Create a list called `inventory` with ["health_potion", "mana_potion", "sword"]. Append "shield", remove "mana_potion", and print the final list length.',
      starterCode: `# Create your inventory list\n\n# Append "shield"\n\n# Remove "mana_potion"\n\n# Print the length\n`,
      expectedOutput: "3",
      hints: [
        "Use .append() to add items",
        "Use .remove() to remove by value",
        "Use len() to get the length",
      ],
      solution: `inventory = ["health_potion", "mana_potion", "sword"]\ninventory.append("shield")\ninventory.remove("mana_potion")\nprint(len(inventory))`,
      language: "python",
    },
  },
];
