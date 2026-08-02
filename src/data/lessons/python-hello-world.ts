// Pre-written full lessons for Python Module 1: Hello World & Print
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonHelloWorldLessons = [
  {
    title: "What is Hello World & Print?",
    definition: "print() is Python's built-in function that outputs (displays) text, numbers, or any data to the screen. It's the very first tool every programmer learns because seeing output is how you know your code is working.",
    explanation: `Every programming language has a way to show output. In Python, that's the print() function. A function is like a command — you write its name followed by parentheses (), and put what you want to display inside those parentheses.

The classic \"Hello, World!\" program exists because it proves three things: your Python is installed correctly, you can write code, and you can run it. It's been the traditional first program since the 1970s.

print() is more powerful than just showing text. You can print numbers, do math inside it, print multiple things, and even control how the output looks. You'll use print() constantly for debugging (checking what your code is doing) and displaying results.`,
    code: `# The simplest Python program — one line!
print("Hello, World!")

# Printing different types of data
print("Text like this is called a string")
print(42)           # Numbers work without quotes
print(3.14)         # Decimal numbers too
print(True)         # Boolean values (True/False)

# Printing multiple values — separated by spaces automatically
print("Player:", "Alex", "Score:", 100)

# Using sep= to change what goes between values
print("Game", "Over", sep="---")    # Output: Game---Over

# Using end= to change what goes at the end (default is newline)
print("Loading", end="...")
print("Done!")                       # Output: Loading...Done!

# Math inside print
print("2 + 2 =", 2 + 2)            # Output: 2 + 2 = 4
print("Lives:", 3 * 2)              # Output: Lives: 6`,
    breakdown: `Let's go through every line:

• print("Hello, World!") — Calls the print function. The text inside quotes is called a STRING. Quotes tell Python "this is text, not code." You can use single quotes 'like this' or double quotes "like this" — both work the same.

• print(42) — No quotes! This is a NUMBER (integer). Python knows it's a number because there are no quotes. If you wrote print("42") that would be the TEXT "42", not the number.

• print(3.14) — A decimal number (called a FLOAT in programming). Still no quotes needed.

• print(True) — A BOOLEAN value. Can only be True or False (must be capitalized). Used for yes/no logic.

• print("Player:", "Alex", "Score:", 100) — Multiple values separated by commas. Python automatically puts a SPACE between each one. Mix of strings and numbers is fine!

• sep="---" — The sep PARAMETER changes what character goes between multiple values. Default is a space " ". Here we changed it to "---".

• end="..." — The end PARAMETER changes what goes at the END of the line. Default is a newline (\\n) which moves to the next line. Here we changed it to "..." so the next print continues on the same line.

• 2 + 2 inside print — Python calculates the math FIRST, then prints the result. Any expression works: +, -, *, /, etc.`,
    summary: `print() is your #1 debugging and output tool. It takes whatever you put inside the parentheses and displays it on screen. Strings need quotes, numbers don't. You can print multiple values with commas (auto-separated by spaces), change the separator with sep=, and change the line ending with end=. Every program you write will use print() — it's how your code talks to you.`
  },
  {
    title: "How Hello World & Print works",
    definition: "When Python executes print(), it converts whatever you give it into text and sends it to the 'standard output' (your terminal/console screen). This happens line by line, top to bottom.",
    explanation: `Python reads your code from top to bottom, one line at a time. When it hits a print() line, it:
1. Evaluates everything inside the parentheses (does any math, looks up any variables)
2. Converts the result to text
3. Sends that text to your screen
4. Moves to the next line of code

This is called "sequential execution" — lines run in order. If you have 3 print statements, they'll output 3 lines, in order.

The screen where output appears is called the CONSOLE, TERMINAL, or COMMAND LINE. In an IDE like VS Code, it's the panel at the bottom. Online (like Replit), it's the right panel.

Important: print() only DISPLAYS — it doesn't save anything. Once it's on screen, it's gone from the program's memory. To save values, you need variables (next lesson!).`,
    code: `# Python runs top to bottom — order matters!
print("Line 1: This prints first")
print("Line 2: This prints second")
print("Line 3: This prints third")

# What happens INSIDE print() is evaluated first
print(10 + 5)       # Python calculates 15, THEN prints "15"
print(100 / 4)      # Python calculates 25.0, THEN prints "25.0"
print(2 ** 10)      # ** means power: 2^10 = 1024

# Strings can be combined with +
print("Hello" + " " + "World")    # Output: Hello World

# But you can't mix types with +
# print("Score: " + 100)  ← This would ERROR!
print("Score: " + str(100))       # str() converts number to text

# Repeating strings with *
print("Ha" * 3)     # Output: HaHaHa
print("-" * 20)     # Output: --------------------

# Empty print() just makes a blank line
print("Before")
print()
print("After")`,
    breakdown: `• Lines 2-4: Three prints in sequence. They ALWAYS run top-to-bottom. You'll never see Line 3 before Line 1.

• print(10 + 5): The EXPRESSION 10+5 is calculated first (=15), then 15 is printed. Python always evaluates before printing.

• print(100 / 4): Division in Python always gives a FLOAT (decimal), even if the result is whole. That's why it prints 25.0 not 25.

• print(2 ** 10): The ** operator means "to the power of". 2**10 = 2×2×2×2×2×2×2×2×2×2 = 1024.

• "Hello" + " " + "World": The + operator CONCATENATES (joins) strings together. No spaces are added — you have to include them yourself.

• "Score: " + 100 would ERROR because Python can't add a string to a number. Use str(100) to convert the number to a string first, OR use f-strings (covered later).

• "Ha" * 3: Multiplying a string repeats it. "Ha" × 3 = "HaHaHa". Useful for creating separators like "-" * 40.

• print() with nothing inside: Outputs an empty line. Useful for visual spacing in output.`,
    summary: `Python executes code top-to-bottom. print() evaluates expressions first, then displays the result. Strings can be joined with + (but all pieces must be strings — use str() to convert numbers). Strings can be repeated with *. Division always gives a float. print() with no arguments creates a blank line. Remember: print only DISPLAYS — it doesn't save values.`
  },
  {
    title: "Hello World & Print syntax & usage",
    definition: "The syntax (grammar rules) of print() is: print(value1, value2, ..., sep=' ', end='\\n'). You can pass any number of values separated by commas, and optionally customize the separator and line ending.",
    explanation: `Every function in Python has a SYNTAX — the exact way you must write it for Python to understand. For print(), the rules are:

1. The word "print" must be lowercase (Python is case-sensitive!)
2. Parentheses () are required (this is Python 3 — Python 2 didn't need them)
3. Values go inside the parentheses
4. Multiple values are separated by commas
5. Optional parameters (sep, end, file, flush) can customize behavior

Common mistakes beginners make:
- Print("hello") — capital P won't work
- print "hello" — missing parentheses (this was Python 2 style)
- print(hello) — missing quotes means Python looks for a variable named hello

The function signature (full definition) is:
print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)

For now, you only need to know about objects (what to print), sep (separator), and end (line ending).`,
    code: `# Correct syntax examples
print("Hello")                    # Most basic usage
print('Hello')                    # Single quotes work too
print("Hello", "World")           # Multiple values
print("Score:", 100, "Lives:", 3) # Mix types freely

# The sep parameter (separator between values)
print("A", "B", "C")             # Output: A B C (default space)
print("A", "B", "C", sep="")     # Output: ABC (no separator)
print("A", "B", "C", sep=", ")   # Output: A, B, C
print("A", "B", "C", sep="\\n")   # Each on new line

# The end parameter (what goes at the end)
print("Hello", end=" ")
print("World")                    # Output: Hello World (same line!)

print("Loading", end="")
print(".", end="")
print(".", end="")
print(".")                        # Output: Loading...

# Special characters in strings
print("Line 1\\nLine 2")           # \\n = new line
print("Tab:\\there")                # \\t = tab space
print("She said \\"hi\\"")           # \\" = quote inside quotes

# Common ERRORS (don't do these):
# print("hello)       ← missing closing quote
# Print("hello")      ← capital P
# print(hello)        ← no quotes = looks for variable`,
    breakdown: `• Single vs double quotes: Both 'hello' and "hello" create the same string. Use double when your text has an apostrophe: "it's". Use single when your text has quotes: 'She said "hi"'.

• sep="" (empty string): Removes ALL separation between values. Useful for building output character by character.

• sep="\\n": The \\n is a NEWLINE CHARACTER. It means "start a new line here." So each value prints on its own line.

• end=" ": Changes the line ending from newline to a space. The next print() continues on the SAME line. Without this, every print() starts a new line.

• \\n, \\t, \\": These are ESCAPE CHARACTERS. The backslash \\ tells Python "the next character is special, not literal." \\n=newline, \\t=tab, \\"=literal quote, \\\\=literal backslash.

• print(hello) without quotes: Python thinks 'hello' is a VARIABLE NAME and tries to find it. If it doesn't exist, you get: NameError: name 'hello' is not defined.`,
    summary: `print() syntax: lowercase 'print', parentheses required, values separated by commas. sep= controls what goes between values (default: space). end= controls what goes after everything (default: newline). Use escape characters for special formatting: \\n (new line), \\t (tab), \\" (quote). Python is case-sensitive — Print, PRINT, pRiNt will all fail. Quotes are required around text strings.`
  },
  {
    title: "Practical examples of Hello World & Print",
    definition: "In real programs, print() is used for: displaying menus, showing game status, formatting tables, creating progress indicators, debugging code, and presenting results to users.",
    explanation: `Beyond \"Hello World\", print() is used everywhere in real programs. Here are the most common real-world uses:

1. USER INTERFACES — Showing menus, prompts, and information
2. DEBUGGING — Adding print() temporarily to see what your variables contain
3. FORMATTING — Creating aligned tables, reports, and structured output
4. STATUS UPDATES — Showing progress, loading indicators, scores
5. LOGGING — Recording what your program does (though real apps use logging modules)

Professional developers still use print() constantly during development to check if their code is working correctly. It's your fastest debugging tool — quicker than any fancy debugger for simple checks.`,
    code: `# Real-world example 1: Game status display
player = "Alex"
hp = 85
max_hp = 100
level = 7
gold = 1250

print("=" * 30)
print(f"  PLAYER: {player}")
print(f"  HP: {hp}/{max_hp}")
print(f"  Level: {level}")
print(f"  Gold: {gold:,}")
print("=" * 30)

# Real-world example 2: Simple menu
print("\\n🎮 MAIN MENU")
print("-" * 20)
print("1. New Game")
print("2. Load Game")
print("3. Settings")
print("4. Quit")
print("-" * 20)

# Real-world example 3: Debugging
x = 10
y = 20
result = x * y + 5
print(f"DEBUG: x={x}, y={y}, result={result}")  # Quick check!

# Real-world example 4: Progress bar simulation
import time
print("Downloading: ", end="")
for i in range(10):
    print("█", end="", flush=True)
print(" Done!")`,
    breakdown: `• "=" * 30: Creates a line of 30 equal signs. Used as a visual separator/border. Makes output look clean and organized.

• f"  PLAYER: {player}": An F-STRING (formatted string literal). The f before the quote enables {variable} embedding. Whatever's inside {} gets replaced with the variable's value. This is the MODERN way to format strings in Python.

• {gold:,}: The :, inside an f-string adds thousand separators. So 1250 becomes "1,250". Format specifiers go after the colon.

• The menu example shows how real CLI (command line interface) programs present choices to users. Each option on its own line, numbered for easy selection.

• f"DEBUG: x={x}": Developers add temporary print statements to check variable values. When the bug is fixed, they remove these lines. This is called "print debugging."

• flush=True: Normally Python waits to print until it has a full line. flush=True forces it to print IMMEDIATELY — essential for progress bars where you want to see each character appear one at a time.

• The for loop with end="": Prints each block character on the SAME line (no newline between them), creating a growing progress bar effect.`,
    summary: `print() in practice: use f-strings for formatted output (f"text {variable}"), string multiplication for borders ("=" * 30), format specifiers for numbers ({value:,} for commas). Real uses include menus, status displays, debugging, and progress indicators. flush=True forces immediate output. Professional developers use print() daily for quick debugging — it's not just for beginners.`
  },
  {
    title: "Hello World & Print best practices",
    definition: "Best practices are the 'right way' to use print() — habits that make your code clearer, more maintainable, and more professional.",
    explanation: `As you write more Python, how you use print() matters. Here are the rules professional developers follow:

1. USE F-STRINGS over concatenation (+) or .format() — they're faster and more readable
2. DON'T LEAVE DEBUG PRINTS in final code — remove or comment them out
3. USE MEANINGFUL OUTPUT — "Score: 100" is better than just "100"
4. FORMAT NUMBERS — use :, for thousands, :.2f for decimals
5. USE PRINT FOR DEBUGGING, LOGGING FOR PRODUCTION — the logging module is better for real apps

Common mistakes to avoid:
- Printing inside loops without realizing you'll get thousands of lines
- Forgetting that print() returns None (it displays but doesn't store)
- Using print() when you should use return in a function`,
    code: `# GOOD: f-strings (modern, readable)
name = "Alex"
score = 1500
print(f"Player {name} scored {score} points")

# BAD: concatenation (hard to read, error-prone)
# print("Player " + name + " scored " + str(score) + " points")

# GOOD: format numbers properly
price = 29.99
total = 1234567
print(f"Price: \${price:.2f}")       # Price: $29.99
print(f"Users: {total:,}")          # Users: 1,234,567
print(f"Percent: {0.856:.1%}")      # Percent: 85.6%

# GOOD: use descriptive labels
width = 1920
height = 1080
print(f"Resolution: {width}x{height}")  # Clear!
# BAD: print(width, height)              # What do these numbers mean?

# GOOD: debug prints that are easy to find and remove
DEBUG = True
if DEBUG:
    print(f"[DEBUG] Processing item: {name}")

# GOOD: separate concerns — print is for display, not logic
def calculate_score(base, multiplier):
    return base * multiplier  # Returns value, doesn't print!

result = calculate_score(100, 1.5)
print(f"Final score: {result}")  # Printing is separate from logic

# GOOD: multiline output with triple quotes
print(\"\"\"
╔══════════════════╗
║   GAME OVER!     ║
║   Score: {score:<8}║
╚══════════════════╝
\"\"\")`,
    breakdown: `• f-strings vs concatenation: f"Hello {name}" is ALWAYS better than "Hello " + name. It's faster (Python optimizes it), easier to read, and you can't accidentally forget str() conversions.

• :.2f format: The f means FLOAT with 2 decimal places. So 29.9 becomes "29.90" and 29.999 becomes "30.00". Essential for money/prices.

• :, format: Adds comma thousand separators. 1234567 becomes "1,234,567". Makes large numbers readable.

• :.1% format: Converts a decimal to a percentage with 1 decimal place. 0.856 becomes "85.6%". The % is added automatically!

• DEBUG flag: A boolean variable that controls whether debug prints show. Set DEBUG = False to silence all debug output at once, without deleting the print statements.

• Separating print from logic: Functions should RETURN values, not print them. This makes them reusable. Print the result OUTSIDE the function. This is called "separation of concerns."

• Triple quotes (\"\"\"): Let you write multi-line strings. Everything between \"\"\" and \"\"\" is one string, including line breaks. Great for ASCII art, menus, and formatted blocks.

• {score:<8}: Left-aligns the value in a field 8 characters wide. < means left, > means right, ^ means center. Useful for tables.`,
    summary: `Best practices: Always use f-strings for formatting. Label your output (don't just print raw numbers). Format numbers with :, for commas, :.2f for decimals, :.1% for percentages. Keep print() separate from logic — functions should return, not print. Use a DEBUG flag for temporary prints. Triple quotes for multi-line output. These habits separate beginners from professionals.`
  }
];
