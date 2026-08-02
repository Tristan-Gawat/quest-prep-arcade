import { Module } from "./curriculum";

export const pythonModules: Module[] = [
  // === EASY TIER ===
  {
    id: "py-hello-world",
    title: "Hello World & Print",
    tier: "EASY",
    lesson: {
      title: "Hello World & Print",
      concept: "print() is Python's built-in function for displaying output.",
      explanation:
        "Every programmer starts with Hello World! The print() function outputs text to the console. You can print strings (text in quotes), numbers, and even multiple values separated by commas. Python executes code line by line from top to bottom.",
      codeExample: `# Your first Python program
print("Hello, World!")

# Printing numbers
print(42)

# Printing multiple values
print("Score:", 100)

# Print with separator
print("A", "B", "C", sep="-")`,
      language: "python",
    },
    quiz: [
      {
        question: "What function displays output in Python?",
        choices: ["echo()", "print()", "console.log()", "write()"],
        correct: 1,
        explanation: "print() is Python's built-in function for displaying output to the console.",
      },
      {
        question: 'What is the output of: print("Hello", "World")',
        choices: ["HelloWorld", "Hello World", "Hello, World", "Error"],
        correct: 1,
        explanation: "print() separates multiple arguments with a space by default.",
      },
      {
        question: "Which is a valid Python print statement?",
        choices: ["print 'hi'", "Print('hi')", "print('hi')", "PRINT('hi')"],
        correct: 2,
        explanation: "Python is case-sensitive and print requires parentheses in Python 3.",
      },
    ],
        subLessons: ["What is Hello World & Print?","How Hello World & Print works","Hello World & Print syntax & usage","Practical examples of Hello World & Print","Hello World & Print best practices"],
challenge: {
      title: "First Output",
      description:
        'Print exactly: "Hello, Python!" on the first line and "I am learning to code!" on the second line.',
      starterCode: `# Print your messages below\n`,
      expectedOutput: "Hello, Python!\nI am learning to code!",
      hints: [
        "Use print() for each line",
        "Strings need quotes around them",
        "Each print() creates a new line",
      ],
      solution: `print("Hello, Python!")\nprint("I am learning to code!")`,
      language: "python",
    },
  },

  {
    id: "py-variables",
    title: "Variables & Data Types",
    tier: "EASY",
    lesson: {
      title: "Variables & Data Types",
      concept: "Variables are named containers that store data values.",
      explanation:
        "In Python, you create a variable by assigning a value with the = operator. Python automatically detects the type: str (text), int (whole numbers), float (decimals), and bool (True/False). Variable names should be descriptive and use snake_case.",
      codeExample: `# Creating variables of different types
name = "Player One"    # str (string)
score = 100            # int (integer)
health = 99.5          # float (decimal)
alive = True           # bool (boolean)

# Checking types
print(type(name))   # <class 'str'>
print(type(score))  # <class 'int'>

# Reassigning variables
score = score + 50
print(score)  # 150`,
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
        explanation: "Text wrapped in quotes creates a string (str) type.",
      },
      {
        question: "Which of these is a valid variable name?",
        choices: ["2fast", "my-var", "player_score", "class"],
        correct: 2,
        explanation: "Variable names can't start with numbers, use hyphens, or be reserved keywords.",
      },
    ],
        subLessons: ["What is Variables & Data Types?","How Variables & Data Types works","Variables & Data Types syntax & usage","Practical examples of Variables & Data Types","Variables & Data Types best practices"],
challenge: {
      title: "Create Your Player Card",
      description:
        'Create variables: player_name set to "Hero", level set to 1, and xp set to 0.0. Print each variable on its own line.',
      starterCode: `# Create your variables below\n\n\n# Print them out\n`,
      expectedOutput: "Hero\n1\n0.0",
      hints: [
        "Strings need quotes around them",
        "Integers don't need quotes",
        "Use print() to display each value",
      ],
      solution: `player_name = "Hero"\nlevel = 1\nxp = 0.0\nprint(player_name)\nprint(level)\nprint(xp)`,
      language: "python",
    },
  },

  {
    id: "py-input-strings",
    title: "Input & String Formatting",
    tier: "EASY",
    lesson: {
      title: "Input & String Formatting",
      concept: "input() reads user input, and f-strings format text dynamically.",
      explanation:
        "input() pauses the program and waits for user input, always returning a string. To use numbers from input, convert with int() or float(). F-strings (f'...') let you embed expressions inside {curly braces}. The older .format() method works similarly.",
      codeExample: `# Getting user input
name = input("Enter your name: ")
age = int(input("Enter your age: "))

# f-string formatting
print(f"Hello, {name}! You are {age} years old.")

# Expressions in f-strings
print(f"Next year you'll be {age + 1}.")

# .format() method
template = "Player: {} | Score: {}"
print(template.format(name, 100))`,
      language: "python",
    },
    quiz: [
      {
        question: "What type does input() always return?",
        choices: ["int", "float", "str", "bool"],
        correct: 2,
        explanation: "input() always returns a string, even if the user types a number.",
      },
      {
        question: 'What is the output of: print(f"Level {2+3}")',
        choices: ["Level {2+3}", "Level 5", "f Level 5", "Error"],
        correct: 1,
        explanation: "f-strings evaluate expressions inside {} curly braces.",
      },
      {
        question: "How do you convert a string \"42\" to an integer?",
        choices: ["integer(\"42\")", "int(\"42\")", "to_int(\"42\")", "Number(\"42\")"],
        correct: 1,
        explanation: "int() converts a string to an integer value.",
      },
    ],
        subLessons: ["What is Input & String Formatting?","How Input & String Formatting works","Input & String Formatting syntax & usage","Practical examples of Input & String Formatting","Input & String Formatting best practices"],
challenge: {
      title: "Greeting Generator",
      description:
        'Create variables name="Arcade" and xp=500. Use an f-string to print: "Welcome to CodeLapse, Arcade! You have 500 XP."',
      starterCode: `name = "Arcade"\nxp = 500\n# Print the welcome message using an f-string\n`,
      expectedOutput: "Welcome to CodeLapse, Arcade! You have 500 XP.",
      hints: [
        "Use f before the opening quote",
        "Put variables inside {curly braces}",
        "The whole thing goes inside print()",
      ],
      solution: `name = "Arcade"\nxp = 500\nprint(f"Welcome to CodeLapse, {name}! You have {xp} XP.")`,
      language: "python",
    },
  },

  {
    id: "py-conditionals",
    title: "Conditionals",
    tier: "EASY",
    lesson: {
      title: "Conditionals",
      concept: "Conditionals let your code make decisions based on conditions.",
      explanation:
        "Use if to check a condition, elif for additional checks, and else as a fallback. Python uses indentation (4 spaces) to define code blocks. Comparison operators: == (equal), != (not equal), <, >, <=, >=. Logical operators: and, or, not.",
      codeExample: `score = 850

if score >= 1000:
    rank = "ELITE"
elif score >= 500:
    rank = "CHAMPION"
elif score >= 100:
    rank = "ROOKIE"
else:
    rank = "BEGINNER"

print(f"Your rank: {rank}")

# Using logical operators
has_key = True
level = 5
if has_key and level >= 5:
    print("Door unlocked!")`,
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
        choices: ["Curly braces {}", "Indentation", "Parentheses ()", "Semicolons"],
        correct: 1,
        explanation: "Python uses indentation (typically 4 spaces) to define code blocks.",
      },
    ],
        subLessons: ["What is Conditionals?","How Conditionals works","Conditionals syntax & usage","Practical examples of Conditionals","Conditionals best practices"],
challenge: {
      title: "Rank Calculator",
      description:
        "Write a program that assigns a rank based on XP: 1000+ = 'ELITE', 500-999 = 'CHAMPION', 100-499 = 'ROOKIE', below 100 = 'BEGINNER'. Set xp=750 and print the rank.",
      starterCode: `xp = 750\n\n# Write your if/elif/else here\n\n# Print the rank\n`,
      expectedOutput: "CHAMPION",
      hints: [
        "Start with if xp >= 1000",
        "Use elif for middle ranges",
        "else catches everything remaining",
      ],
      solution: `xp = 750\n\nif xp >= 1000:\n    rank = "ELITE"\nelif xp >= 500:\n    rank = "CHAMPION"\nelif xp >= 100:\n    rank = "ROOKIE"\nelse:\n    rank = "BEGINNER"\n\nprint(rank)`,
      language: "python",
    },
  },

  // === MEDIUM TIER ===
  {
    id: "py-loops",
    title: "Loops",
    tier: "MEDIUM",
    lesson: {
      title: "Loops",
      concept: "Loops repeat code multiple times automatically.",
      explanation:
        "for loops iterate over sequences (lists, ranges, strings). while loops repeat as long as a condition is True. Use range(n) to loop n times, range(start, stop, step) for more control. break exits a loop early, continue skips to the next iteration.",
      codeExample: `# for loop with range
for i in range(5):
    print(f"Level {i + 1}")

# while loop with break
lives = 3
while True:
    print(f"Lives: {lives}")
    lives -= 1
    if lives == 0:
        break

# continue skips even numbers
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")  # 1 3 5 7 9`,
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
        question: "What does continue do in a loop?",
        choices: ["Exits the loop", "Restarts the loop", "Skips to the next iteration", "Pauses the loop"],
        correct: 2,
        explanation: "continue skips the rest of the current iteration and moves to the next one.",
      },
    ],
        subLessons: ["What is Loops?","How Loops works","Loops syntax & usage","Practical examples of Loops","Loops best practices"],
challenge: {
      title: "XP Counter",
      description:
        "Use a for loop to calculate total XP from quest rewards: [100, 250, 75, 300, 150]. Print the total.",
      starterCode: `rewards = [100, 250, 75, 300, 150]\ntotal_xp = 0\n\n# Loop through rewards and add to total_xp\n\n# Print total\n`,
      expectedOutput: "875",
      hints: [
        "Use: for reward in rewards:",
        "Add each reward to total_xp with +=",
        "Print total_xp after the loop ends",
      ],
      solution: `rewards = [100, 250, 75, 300, 150]\ntotal_xp = 0\n\nfor reward in rewards:\n    total_xp += reward\n\nprint(total_xp)`,
      language: "python",
    },
  },

  {
    id: "py-functions",
    title: "Functions",
    tier: "MEDIUM",
    lesson: {
      title: "Functions",
      concept: "Functions are reusable blocks of code that perform specific tasks.",
      explanation:
        "Define functions with the def keyword. They can accept parameters (inputs) and return values (outputs). Default parameters provide fallback values when no argument is passed. Functions help organize code, avoid repetition, and make programs modular.",
      codeExample: `# Function with default parameter
def calculate_damage(base, multiplier=1.0):
    """Calculate total damage dealt."""
    damage = base * multiplier
    return round(damage)

# Using the function
hit = calculate_damage(50, 1.5)
print(f"Critical hit: {hit}")

# With default parameter
normal_hit = calculate_damage(50)
print(f"Normal hit: {normal_hit}")

# Multiple return values
def get_stats():
    return 100, 50, 25

hp, mp, stamina = get_stats()`,
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
        subLessons: ["What is Functions?","How Functions works","Functions syntax & usage","Practical examples of Functions","Functions best practices"],
challenge: {
      title: "Power-Up Function",
      description:
        "Write a function called power_up that takes base_stat and boost (default=10). It should return base_stat + boost. Call it with (50, 25) and print the result.",
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
    id: "py-lists-tuples",
    title: "Lists & Tuples",
    tier: "MEDIUM",
    lesson: {
      title: "Lists & Tuples",
      concept: "Lists and tuples store ordered collections of items.",
      explanation:
        "Lists (mutable) use square brackets [] and can be changed after creation. Tuples (immutable) use parentheses () and cannot be modified. Both support indexing [0], slicing [1:3], and iteration. List comprehensions provide a concise way to create lists.",
      codeExample: `# Lists are mutable
inventory = ["sword", "shield", "potion"]
inventory.append("bow")
inventory[0] = "mega sword"
print(inventory)

# Tuples are immutable
coordinates = (10, 20)
x, y = coordinates  # unpacking

# Slicing
top_three = inventory[0:3]

# List comprehension
levels = [i * 10 for i in range(1, 6)]
print(levels)  # [10, 20, 30, 40, 50]

# Filtering with comprehension
high = [x for x in levels if x > 20]
print(high)  # [30, 40, 50]`,
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
        question: "What is the difference between a list and a tuple?",
        choices: ["Lists use () and tuples use []", "Lists are mutable, tuples are immutable", "Tuples are faster to create", "There is no difference"],
        correct: 1,
        explanation: "Lists can be changed (mutable) while tuples cannot (immutable).",
      },
      {
        question: "What does [1:3] do on a list?",
        choices: ["Gets items at index 1 and 3", "Gets items from index 1 up to (not including) 3", "Gets first 3 items", "Removes items"],
        correct: 1,
        explanation: "Slicing [1:3] returns elements at index 1 and 2 (end index excluded).",
      },
    ],
        subLessons: ["What is Lists & Tuples?","How Lists & Tuples works","Lists & Tuples syntax & usage","Practical examples of Lists & Tuples","Lists & Tuples best practices"],
challenge: {
      title: "Inventory Manager",
      description:
        'Create a list called inventory with ["health_potion", "mana_potion", "sword"]. Append "shield", remove "mana_potion", then use a list comprehension to create upper_inv containing each item in uppercase. Print the length of upper_inv.',
      starterCode: `# Create your inventory list\n\n# Append "shield"\n\n# Remove "mana_potion"\n\n# Create upper_inv with list comprehension\n\n# Print the length\n`,
      expectedOutput: "3",
      hints: [
        "Use .append() to add and .remove() to delete",
        "List comprehension: [item.upper() for item in inventory]",
        "Use len() to get the length",
      ],
      solution: `inventory = ["health_potion", "mana_potion", "sword"]\ninventory.append("shield")\ninventory.remove("mana_potion")\nupper_inv = [item.upper() for item in inventory]\nprint(len(upper_inv))`,
      language: "python",
    },
  },

  {
    id: "py-dicts-sets",
    title: "Dictionaries & Sets",
    tier: "MEDIUM",
    lesson: {
      title: "Dictionaries & Sets",
      concept: "Dictionaries store key-value pairs; sets store unique unordered items.",
      explanation:
        "Dictionaries (dict) use curly braces with key: value pairs. Access values by key, add new pairs, and use methods like .keys(), .values(), .items(). Sets also use curly braces but store only unique values and support mathematical set operations (union, intersection, difference).",
      codeExample: `# Dictionary
player = {
    "name": "Archer",
    "hp": 100,
    "level": 5
}

# Accessing and modifying
print(player["name"])
player["hp"] -= 20
player["weapon"] = "bow"  # add new key

# Iterating
for key, value in player.items():
    print(f"{key}: {value}")

# Sets - unique values only
skills = {"fire", "ice", "fire", "thunder"}
print(skills)  # {'fire', 'ice', 'thunder'}

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)  # intersection: {2, 3}
print(a | b)  # union: {1, 2, 3, 4}`,
      language: "python",
    },
    quiz: [
      {
        question: "How do you access a value in a dictionary?",
        choices: ["dict.value", "dict[key]", "dict(key)", "dict->key"],
        correct: 1,
        explanation: "Use square bracket notation with the key: dict[key].",
      },
      {
        question: "What happens when you add a duplicate to a set?",
        choices: ["Error is raised", "Duplicate is ignored", "Set grows", "Original is replaced"],
        correct: 1,
        explanation: "Sets only store unique values; duplicates are silently ignored.",
      },
      {
        question: "Which method returns all key-value pairs of a dictionary?",
        choices: [".keys()", ".values()", ".items()", ".pairs()"],
        correct: 2,
        explanation: ".items() returns all key-value pairs as tuples.",
      },
    ],
        subLessons: ["What is Dictionaries & Sets?","How Dictionaries & Sets works","Dictionaries & Sets syntax & usage","Practical examples of Dictionaries & Sets","Dictionaries & Sets best practices"],
challenge: {
      title: "Character Stats",
      description:
        'Create a dictionary called stats with keys "hp" (100), "mp" (50), "attack" (25). Add a new key "defense" with value 15. Print the total of all values in the dictionary.',
      starterCode: `# Create your stats dictionary\n\n# Add "defense" key\n\n# Print the sum of all values\n`,
      expectedOutput: "190",
      hints: [
        "Use {key: value} syntax to create the dict",
        "Add new keys with stats[\"defense\"] = 15",
        "Use sum(stats.values()) to total all values",
      ],
      solution: `stats = {"hp": 100, "mp": 50, "attack": 25}\nstats["defense"] = 15\nprint(sum(stats.values()))`,
      language: "python",
    },
  },

  // === HARD TIER ===
  {
    id: "py-error-handling",
    title: "Error Handling",
    tier: "HARD",
    lesson: {
      title: "Error Handling",
      concept: "Try/except blocks catch and handle errors gracefully.",
      explanation:
        "Errors (exceptions) crash your program if unhandled. Use try/except to catch errors, else for code that runs when no error occurs, and finally for cleanup code that always runs. You can raise your own exceptions and create custom exception classes.",
      codeExample: `# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")

# Multiple except blocks
try:
    number = int("abc")
except ValueError:
    print("Not a valid number!")
except TypeError:
    print("Wrong type!")
else:
    print("Conversion successful!")
finally:
    print("This always runs.")

# Raising exceptions
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

# Custom exception
class InsufficientMana(Exception):
    pass`,
      language: "python",
    },
    quiz: [
      {
        question: "What block catches an exception?",
        choices: ["catch", "except", "handle", "rescue"],
        correct: 1,
        explanation: "Python uses 'except' to catch and handle exceptions.",
      },
      {
        question: "When does the 'finally' block execute?",
        choices: ["Only on error", "Only on success", "Always, regardless of errors", "Never automatically"],
        correct: 2,
        explanation: "The finally block always executes, whether or not an exception occurred.",
      },
      {
        question: "What keyword is used to throw an exception manually?",
        choices: ["throw", "raise", "error", "except"],
        correct: 1,
        explanation: "Python uses 'raise' to throw/raise an exception manually.",
      },
    ],
        subLessons: ["What is Error Handling?","How Error Handling works","Error Handling syntax & usage","Practical examples of Error Handling","Error Handling best practices"],
challenge: {
      title: "Safe Division",
      description:
        "Write a function safe_divide(a, b) that returns a/b. If b is zero, catch the ZeroDivisionError and return \"Cannot divide by zero\". Call it with (10, 0) and print the result.",
      starterCode: `# Define safe_divide function\n\n\n# Call it and print\n`,
      expectedOutput: "Cannot divide by zero",
      hints: [
        "Use try/except inside the function",
        "Catch ZeroDivisionError specifically",
        "Return the error message string in the except block",
      ],
      solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n\nresult = safe_divide(10, 0)\nprint(result)`,
      language: "python",
    },
  },

  {
    id: "py-file-io",
    title: "File I/O",
    tier: "HARD",
    lesson: {
      title: "File I/O",
      concept: "Python can read from and write to files on disk.",
      explanation:
        "Use open() to access files with modes: 'r' (read), 'w' (write), 'a' (append). The 'with' statement automatically closes files when done. You can read entire files, read line by line, or write data. The csv module handles CSV files easily.",
      codeExample: `# Writing to a file
with open("scores.txt", "w") as f:
    f.write("Player1: 100\\n")
    f.write("Player2: 250\\n")

# Reading entire file
with open("scores.txt", "r") as f:
    content = f.read()
    print(content)

# Reading line by line
with open("scores.txt", "r") as f:
    for line in f:
        print(line.strip())

# Appending to a file
with open("scores.txt", "a") as f:
    f.write("Player3: 175\\n")

# Working with CSV
import csv
with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Score"])
    writer.writerow(["Alice", 95])`,
      language: "python",
    },
    quiz: [
      {
        question: "What mode opens a file for writing (overwriting existing content)?",
        choices: ["'r'", "'w'", "'a'", "'x'"],
        correct: 1,
        explanation: "'w' mode opens a file for writing, creating it if needed or overwriting existing content.",
      },
      {
        question: "Why is the 'with' statement preferred for file operations?",
        choices: ["It's faster", "It automatically closes the file", "It prevents errors", "It's the only way"],
        correct: 1,
        explanation: "The 'with' statement automatically closes the file when the block exits, even if an error occurs.",
      },
      {
        question: "What does 'a' mode do when opening a file?",
        choices: ["Reads all content", "Overwrites the file", "Appends to the end", "Creates a backup"],
        correct: 2,
        explanation: "'a' (append) mode adds new content to the end without erasing existing data.",
      },
    ],
        subLessons: ["What is File I/O?","How File I/O works","File I/O syntax & usage","Practical examples of File I/O","File I/O best practices"],
challenge: {
      title: "Save Game Data",
      description:
        "Write a function save_scores(filename, scores) that takes a filename and a list of score integers. Write each score on its own line. Then read the file back and print the total of all scores. Use scores=[85, 92, 78].",
      starterCode: `# Define save_scores function\n\n\n# Save and read back\nscores = [85, 92, 78]\n`,
      expectedOutput: "255",
      hints: [
        "Use 'w' mode to write each score with a newline",
        "Use 'r' mode to read lines back",
        "Convert strings back to int when summing",
      ],
      solution: `def save_scores(filename, scores):\n    with open(filename, "w") as f:\n        for score in scores:\n            f.write(f"{score}\\n")\n\nscores = [85, 92, 78]\nsave_scores("scores.txt", scores)\n\nwith open("scores.txt", "r") as f:\n    total = sum(int(line.strip()) for line in f)\n    print(total)`,
      language: "python",
    },
  },

  // === EXPERT TIER ===
  {
    id: "py-oop",
    title: "Object-Oriented Programming",
    tier: "EXPERT",
    lesson: {
      title: "Object-Oriented Programming",
      concept: "Classes bundle data and behavior into reusable blueprints.",
      explanation:
        "Classes define objects with attributes (data) and methods (functions). Use __init__ to initialize, self to reference the instance. Inheritance lets classes extend others. Properties control attribute access. Dunder methods (__str__, __len__, etc.) customize behavior.",
      codeExample: `class Character:
    def __init__(self, name, hp=100):
        self.name = name
        self._hp = hp  # "private" attribute

    @property
    def hp(self):
        return self._hp

    @hp.setter
    def hp(self, value):
        self._hp = max(0, value)  # prevent negative

    def __str__(self):
        return f"{self.name} (HP: {self._hp})"

    def attack(self, target, damage):
        target.hp -= damage

# Inheritance
class Mage(Character):
    def __init__(self, name, hp=80, mana=100):
        super().__init__(name, hp)
        self.mana = mana

    def cast_spell(self, target, cost=20):
        if self.mana >= cost:
            self.mana -= cost
            target.hp -= 30

wizard = Mage("Gandalf")
print(wizard)  # Gandalf (HP: 80)`,
      language: "python",
    },
    quiz: [
      {
        question: "What method initializes a new object instance?",
        choices: ["__new__", "__init__", "__create__", "constructor()"],
        correct: 1,
        explanation: "__init__ is the initializer method called when creating a new instance.",
      },
      {
        question: "What does 'self' refer to inside a class method?",
        choices: ["The class itself", "The current instance", "The parent class", "A global variable"],
        correct: 1,
        explanation: "'self' refers to the specific instance of the class the method is called on.",
      },
      {
        question: "What keyword is used to inherit from a parent class?",
        choices: ["extends", "inherits", "The parent in parentheses", "using"],
        correct: 2,
        explanation: "In Python, you inherit by putting the parent class in parentheses: class Child(Parent).",
      },
    ],
        subLessons: ["What is Object-Oriented Programming?","How Object-Oriented Programming works","Object-Oriented Programming syntax & usage","Practical examples of Object-Oriented Programming","Object-Oriented Programming best practices"],
challenge: {
      title: "RPG Character Class",
      description:
        "Create a class called Warrior with __init__ taking name and strength (default=10). Add a method power_attack() that returns strength * 2. Add a __str__ method returning \"{name} (STR: {strength})\". Create a warrior named \"Thor\" with strength 15, print the warrior and their power_attack().",
      starterCode: `# Define the Warrior class\n\n\n# Create a warrior and test\n`,
      expectedOutput: "Thor (STR: 15)\n30",
      hints: [
        "Use def __init__(self, name, strength=10):",
        "__str__ should return a formatted string",
        "power_attack returns self.strength * 2",
      ],
      solution: `class Warrior:\n    def __init__(self, name, strength=10):\n        self.name = name\n        self.strength = strength\n\n    def power_attack(self):\n        return self.strength * 2\n\n    def __str__(self):\n        return f"{self.name} (STR: {self.strength})"\n\nwarrior = Warrior("Thor", 15)\nprint(warrior)\nprint(warrior.power_attack())`,
      language: "python",
    },
  },

  {
    id: "py-decorators-generators",
    title: "Decorators & Generators",
    tier: "EXPERT",
    lesson: {
      title: "Decorators & Generators",
      concept: "Decorators modify functions; generators produce values lazily.",
      explanation:
        "Decorators (@decorator) wrap functions to add behavior without modifying them. They're functions that take a function and return an enhanced version. Generators use yield to produce values one at a time, saving memory. Generator expressions are like list comprehensions but lazy. Closures are functions that remember their enclosing scope.",
      codeExample: `# Decorator
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"Done! Result: {result}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

add(3, 4)

# Generator function
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num, end=" ")  # 5 4 3 2 1

# Generator expression
squares = (x**2 for x in range(10))
print(next(squares))  # 0
print(next(squares))  # 1

# Closure
def multiplier(factor):
    def multiply(n):
        return n * factor
    return multiply

double = multiplier(2)
print(double(5))  # 10`,
      language: "python",
    },
    quiz: [
      {
        question: "What does a decorator do?",
        choices: ["Deletes a function", "Wraps a function to extend its behavior", "Creates a class", "Imports a module"],
        correct: 1,
        explanation: "A decorator wraps a function to add or modify behavior without changing the original function.",
      },
      {
        question: "What keyword makes a function a generator?",
        choices: ["generate", "yield", "return", "next"],
        correct: 1,
        explanation: "The yield keyword pauses the function and produces a value, making it a generator.",
      },
      {
        question: "What is a closure?",
        choices: ["A locked file", "A function that remembers its enclosing scope", "A type of loop", "A class method"],
        correct: 1,
        explanation: "A closure is a nested function that captures and remembers variables from its enclosing scope.",
      },
    ],
        subLessons: ["What is Decorators & Generators?","How Decorators & Generators works","Decorators & Generators syntax & usage","Practical examples of Decorators & Generators","Decorators & Generators best practices"],
challenge: {
      title: "Timer Decorator",
      description:
        "Write a decorator called repeat(n) that makes a function run n times. Apply @repeat(3) to a function called say_hello() that prints \"Hello!\". The output should be \"Hello!\" printed 3 times.",
      starterCode: `# Define the repeat decorator\n\n\n# Apply it to say_hello\n\n\n# Call say_hello\n`,
      expectedOutput: "Hello!\nHello!\nHello!",
      hints: [
        "repeat(n) is a decorator factory - it returns a decorator",
        "You need three nested functions: repeat -> decorator -> wrapper",
        "The wrapper calls the original function n times in a loop",
      ],
      solution: `def repeat(n):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(n):\n                func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef say_hello():\n    print("Hello!")\n\nsay_hello()`,
      language: "python",
    },
  },
];
