// Pre-written full lessons for Python Module 3: Input & String Formatting
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonInputStringsLessons = [
  {
    title: "What is Input & String Formatting?",
    definition: "input() is Python's built-in function that pauses the program and reads text typed by the user. F-strings (formatted string literals) let you embed variables and expressions directly inside strings using curly braces {}.",
    explanation: `Every interactive program needs a way to communicate with the user — asking questions and displaying personalized responses. In Python, input() handles the asking, and f-strings handle the personalized display.

The input() function does three things: it displays a prompt message (optional), pauses the program and waits for the user to type something, then returns whatever they typed as a STRING. This is crucial — even if the user types "42", input() gives you the text "42", not the number 42. You must convert it yourself if you need a number.

F-strings (introduced in Python 3.6) are the modern way to create strings that include variable values. You write an f before the opening quote, then put any variable or expression inside {curly braces}. Python evaluates what's inside the braces and inserts the result into the string. For example, f"Hello, {name}!" replaces {name} with the actual value of the name variable.

Before f-strings, Python used the .format() method and % formatting. You'll still see these in older code, but f-strings are preferred today because they're more readable, more concise, and faster. They let you see exactly what the output will look like just by reading the string.

Together, input() and f-strings form the foundation of interactive programs. You can build quizzes, text adventures, calculators, and registration forms — anything that needs to collect and display information dynamically.`,
    code: `# Basic input — always returns a string!
name = input("What is your character name? ")
print(type(name))                # <class 'str'> ALWAYS

# F-string basics — embed variables with {}
print(f"Welcome, {name}!")       # Inserts the value of name

# input() for numbers requires conversion
level_str = input("Enter your level: ")
level = int(level_str)           # Convert string to integer
print(f"You are level {level}")

# Shorthand: convert in one line
age = int(input("Enter your age: "))
gold = float(input("Enter gold amount: "))

# F-string with expressions (math inside {})
print(f"Next level: {level + 1}")
print(f"Gold doubled: {gold * 2}")

# The older .format() method (still works)
template = "Player: {} | Level: {}"
print(template.format(name, level))

# Named placeholders with .format()
msg = "Welcome {player}, you have {hp} HP"
print(msg.format(player=name, hp=100))

# String concatenation (the old way — avoid this)
# print("Hello, " + name + "! Level: " + str(level))  # Messy!
# f-strings are MUCH cleaner:
print(f"Hello, {name}! Level: {level}")`,
    breakdown: `Let's go through each line:

• input("What is your character name? ") — Displays the prompt text, then waits. Whatever the user types (until they press Enter) is returned as a STRING and stored in the name variable. The space after "?" is intentional — it separates the prompt from the user's typing.

• type(name) returns <class 'str'> — No matter what the user types (numbers, symbols, anything), input() ALWAYS returns a string. This is the #1 source of beginner bugs.

• f"Welcome, {name}!" — The f prefix activates f-string mode. Python replaces {name} with the current value of the name variable. If name is "Warrior", the output is "Welcome, Warrior!".

• int(level_str) — Converts the string "5" to the integer 5. Without this, you can't do math. int("hello") would crash with a ValueError.

• int(input("Enter your level: ")) — A common shorthand that combines input and conversion in one line. The inner function (input) runs first, its result is passed to int().

• f"Next level: {level + 1}" — You can put ANY expression inside {}. Python evaluates it first, then inserts the result. Math, function calls, method calls — all valid.

• template.format(name, level) — The older formatting method. {} placeholders get filled in order with the arguments to .format(). Works fine but f-strings are preferred.

• msg.format(player=name, hp=100) — Named placeholders make it clear what goes where. Useful when you have many values or the template is defined far from where it's used.`,
    summary: `input() pauses the program, displays a prompt, and returns what the user types as a string (always). To get numbers, wrap with int() or float(). F-strings (f"text {variable}") are the modern way to embed values in strings — just put an f before the quotes and use {curly braces}. The older .format() method still works but f-strings are cleaner and more readable.`
  },
  {
    title: "How Input & String Formatting works",
    definition: "input() reads from standard input (stdin) and always returns a str object. F-strings are evaluated at runtime — Python processes each {expression} from left to right, calls str() on the result, and inserts it into the final string.",
    explanation: `When Python encounters input(), execution completely STOPS. The program halts and waits for the user to type something and press Enter. What they type is read from "standard input" (stdin) — the keyboard in most cases. The Enter key itself is NOT included in the returned string; Python strips the trailing newline automatically.

The returned value is ALWAYS a string, regardless of what the user types. If they type 42, you get the string "42" (two characters: '4' and '2'), not the integer 42. If they type 3.14, you get the string "3.14". This is because input() has no way to know what type YOU want — it just captures raw text.

This is why conversion is essential. When you write int(input("Age: ")), here's the execution order: (1) Python evaluates the innermost expression first — input("Age: ") runs, the user types "25", and input returns the string "25"; (2) That string "25" is passed to int(), which parses it and creates the integer 25; (3) The integer 25 is assigned to your variable.

F-strings work through a process called "string interpolation." When Python encounters f"text {expr} more text", it: (1) Identifies everything between { and } as an expression; (2) Evaluates that expression (looks up variables, does math, calls functions); (3) Calls str() on the result to convert it to text; (4) Inserts that text into the string at that position. All {} expressions are evaluated left to right.

An important detail: f-strings are evaluated at RUNTIME (when the line executes), not at definition time. This means the values inserted are always current. If a variable changes after the f-string is created but before it's printed, you get the OLD value that was captured when the f-string line ran.`,
    code: `# How input() processes data internally
user_input = input("Type a number: ")   # User types: 42

# What we actually received:
print(repr(user_input))      # '42' — it's a string!
print(len(user_input))       # 2 — two characters: '4' and '2'

# Why math fails with raw input:
# user_input + 10            # TypeError! Can't add str + int
# The string "42" is NOT the number 42

# Conversion chain:
number = int(user_input)     # Parse string → integer
print(number + 10)           # 52 — NOW math works!

# What happens with invalid conversion:
# int("hello")              # ValueError: invalid literal
# int("3.14")              # ValueError! int() can't parse decimals
# Use float() first, then int() if needed:
# int(float("3.14"))       # Works! → 3

# F-string evaluation order (left to right)
a = 10
b = 20
print(f"{a} + {b} = {a + b}")    # "10 + 20 = 30"
# Python evaluates: a→10, b→20, a+b→30, assembles string

# F-strings call str() internally
class Player:
    def __str__(self):
        return "Hero (Lv.5)"

p = Player()
print(f"Character: {p}")     # Calls p.__str__() → "Hero (Lv.5)"

# F-string vs string at creation time
score = 100
message = f"Score: {score}"  # Captures score NOW (100)
score = 200                  # This change doesn't affect message
print(message)               # Still "Score: 100"

# To get live values, create the f-string when you need it
score = 200
print(f"Score: {score}")     # "Score: 200" — evaluated NOW`,
    breakdown: `• repr(user_input) shows '42' — The repr() function shows the "raw" representation of a value, with quotes visible. This proves it's a string, not a number. A great debugging tool.

• len(user_input) is 2 — The string "42" has two characters. The integer 42 doesn't have a "length." This further proves it's text, not a number.

• int("3.14") raises ValueError — int() can only parse strings that look like WHOLE numbers. For decimals, you must use float() first: int(float("3.14")) → 3.

• f"{a} + {b} = {a + b}" — Python processes left to right: first {a} becomes "10", then {b} becomes "20", then {a + b} evaluates to 30 and becomes "30". The + signs OUTSIDE the braces are literal text characters.

• __str__ method — When you put an object in an f-string, Python calls its __str__ method to get a string representation. Every object in Python has one (the default just shows the class name and memory address).

• message = f"Score: {score}" captures score at creation — The f-string is fully evaluated when that line runs. It becomes the fixed string "Score: 100". Changing score later doesn't retroactively update the string. Strings are immutable.

• print(f"Score: {score}") after score = 200 — Creating the f-string at print time means it uses the CURRENT value. This is why you usually put f-strings directly in print() rather than pre-building them.`,
    summary: `input() always returns a string — you must explicitly convert with int() or float() for numbers. int() can't parse decimals (use float() first). F-strings are evaluated at the moment the line executes, capturing current variable values. Each {expression} is evaluated left to right, converted to str, and inserted. F-strings are "snapshots" — once created, changing the variable doesn't update the string.`
  },
  {
    title: "Input & String Formatting syntax & usage",
    definition: "F-string syntax uses f\"text {expression:format_spec}\" where format_spec controls width, alignment, decimal places, and number formatting. Format specifiers include :.2f (2 decimals), :, (thousand separators), :<10 (left-align in 10 chars), and :>10 (right-align).",
    explanation: `F-strings become truly powerful when you learn format specifiers — the mini-language that controls HOW values are displayed. The syntax is {value:format_spec} where everything after the colon controls formatting.

For numbers, the most common format specifiers are: :.2f (show 2 decimal places as a float), :, (add thousand separators), :.1% (convert to percentage with 1 decimal), :05d (pad with zeros to 5 digits). These can be combined: {:,.2f} gives thousand separators AND 2 decimal places.

For alignment and width, you can control how text is positioned within a fixed-width field: :<10 means left-aligned in 10 characters, :>10 means right-aligned, :^10 means centered. You can change the fill character too: {:*^20} centers the text with * padding to width 20.

Raw strings (r"...") are a related concept — they treat backslashes as literal characters instead of escape sequences. r"\\n" is literally backslash-n, not a newline. Useful for file paths on Windows and regex patterns.

The .format() method uses the same format specifiers but with a different syntax: "{:.2f}".format(3.14159). And the very old % formatting (printf-style) uses %d for integers, %f for floats, %s for strings: "Score: %d" % 100. You'll see all three styles in existing code, but always WRITE f-strings in new code.`,
    code: `# === NUMBER FORMATTING ===
price = 49.99
big_number = 1234567
ratio = 0.8675

# Decimal places
print(f"Price: \${price:.2f}")        # $49.99 (2 decimal places)
print(f"Pi: {3.14159:.4f}")          # Pi: 3.1416 (4 places, rounded!)

# Thousand separators
print(f"Score: {big_number:,}")      # Score: 1,234,567
print(f"Gold: {big_number:,.2f}")    # Gold: 1,234,567.00

# Percentage
print(f"Accuracy: {ratio:.1%}")      # Accuracy: 86.8% (auto x100!)
print(f"Progress: {0.5:.0%}")        # Progress: 50%

# Zero-padding
level = 7
print(f"Level: {level:03d}")         # Level: 007

# === ALIGNMENT & WIDTH ===
# Left-align (<), right-align (>), center (^)
name = "Warrior"
print(f"|{name:<15}|")              # |Warrior        | (left)
print(f"|{name:>15}|")              # |        Warrior| (right)
print(f"|{name:^15}|")              # |    Warrior    | (center)

# Custom fill character
print(f"{name:*^20}")               # ******Warrior*******
print(f"{'GAME OVER':=^30}")        # ==========GAME OVER===========

# === TABLE FORMATTING ===
items = [("Sword", 150), ("Shield", 80), ("Potion", 25)]
print(f"{'Item':<12}{'Price':>8}")
print("-" * 20)
for item, cost in items:
    print(f"{item:<12}\${cost:>7,.2f}")

# === RAW STRINGS ===
# Normal string: \\n = newline
print("Line1\\nLine2")               # Two lines!

# Raw string: \\n is literal backslash-n
print(r"Line1\\nLine2")              # Line1\\nLine2 (one line)

# Useful for Windows paths and regex
path = r"C:\\Users\\player\\saves"
print(path)                          # C:\\Users\\player\\saves`,
    breakdown: `• \${price:.2f} — The : starts the format spec. .2 means "2 decimal places." f means "fixed-point float." So 49.9 becomes "49.90" and 49.999 becomes "50.00" (it rounds!).

• {big_number:,} — Just a comma after the colon adds thousand separators. 1234567 becomes "1,234,567". Works with integers and floats.

• {big_number:,.2f} — COMBINING format specs: comma for thousands AND .2f for 2 decimals. Order matters: comma before the dot.

• {ratio:.1%} — The % format specifier automatically multiplies by 100 and adds a % sign. 0.8675 becomes "86.8%". The .1 means one decimal place in the percentage.

• {level:03d} — Zero-padding: 0 = fill with zeros, 3 = minimum width of 3, d = decimal integer. So 7 becomes "007". Great for file numbering or time display.

• {name:<15} — Left-align the value in a field 15 characters wide. Extra space is filled with spaces (default). The | characters in the example show where the field starts and ends.

• {name:*^20} — Custom fill: * fills the empty space. ^ centers the text. 20 is the total field width. Creates decorative headers.

• The table example — Combining alignment and width creates aligned columns. :<12 for left-aligned item names, :>7 for right-aligned prices. This is how you build formatted text tables.

• r"C:\\Users\\player\\saves" — The r prefix makes it a RAW string. Backslashes are treated literally instead of as escape sequences. Without r, \\U would try to be a Unicode escape and might error.`,
    summary: `F-string format specifiers go after a colon: {value:spec}. Key specs: :.2f (2 decimals), :, (thousands separator), :.1% (percentage), :03d (zero-pad). Alignment uses < (left), > (right), ^ (center) with a width number. Combine them for tables: {item:<12} and {price:>8,.2f}. Raw strings (r"...") treat backslashes literally — essential for file paths and regex patterns.`
  },
  {
    title: "Practical examples of Input & String Formatting",
    definition: "In real applications, input() and f-strings combine to create interactive experiences: quizzes, form processors, receipt generators, and text-based games that collect user data and display formatted responses.",
    explanation: `Let's build real interactive programs that combine input() with f-string formatting. These examples demonstrate patterns you'll use in actual applications — collecting data, processing it, and displaying results professionally.

Interactive programs follow a common pattern: prompt the user, validate their input, process the data, and display formatted results. The "validate" step is crucial in real applications because users will type unexpected things — letters when you expect numbers, empty strings, or values outside the expected range.

Receipt and report formatting is one of the most common real-world uses of f-string format specifiers. When you need columns to line up, numbers to show proper decimal places, and totals to be formatted with commas, format specifiers are essential.

Text-based games demonstrate the full power of combining input and formatting: collecting player choices, tracking state with variables, and displaying dynamic narratives that change based on what the user does. Every text RPG, quiz, or interactive fiction uses these exact patterns.

Here are four practical examples that show progressively more complex uses of input and string formatting in real scenarios you might actually build.`,
    code: `# === EXAMPLE 1: Interactive Quiz Game ===
print("=== PYTHON QUIZ ===")
print()
score = 0
total = 2

# Question 1
answer = input("What keyword defines a function? ")
if answer.lower().strip() == "def":
    print(f"Correct! +1 point")
    score += 1
else:
    print(f"Wrong! The answer was 'def'")

# Question 2
answer = input("What does len() return? A number or text? ")
if "number" in answer.lower():
    print("Correct! +1 point")
    score += 1
else:
    print("Wrong! len() returns a number (integer)")

# Results
percentage = (score / total) * 100
print(f"\nFinal Score: {score}/{total} ({percentage:.0f}%)")

# === EXAMPLE 2: RPG Character Creator ===
print("\n{'CHARACTER CREATION':=^40}")
char_name = input("Enter character name: ")
char_class = input("Choose class (warrior/mage/rogue): ")

# Assign stats based on class
if char_class.lower() == "warrior":
    hp, mp, attack = 150, 30, 25
elif char_class.lower() == "mage":
    hp, mp, attack = 80, 150, 10
else:
    hp, mp, attack = 100, 50, 20

print(f"\n{'CHARACTER SHEET':=^35}")
print(f"  Name:   {char_name:<20}")
print(f"  Class:  {char_class.title():<20}")
print(f"  HP:     {hp:<5} {'*' * (hp // 15)}")
print(f"  MP:     {mp:<5} {'*' * (mp // 15)}")
print(f"  ATK:    {attack:<5} {'*' * attack}")
print(f"{'=' * 35}")

# === EXAMPLE 3: Receipt Formatter ===
print("\n--- QUEST SHOP RECEIPT ---")
items = [
    ("Health Potion x3", 3, 25.00),
    ("Iron Sword", 1, 149.99),
    ("Shield of Ages", 1, 299.50),
]

print(f"{'Item':<20}{'Qty':>4}{'Price':>10}")
print("-" * 34)
subtotal = 0.0
for name, qty, price in items:
    line_total = qty * price
    subtotal += line_total
    print(f"{name:<20}{qty:>4}  \${line_total:>7,.2f}")

tax = subtotal * 0.08
total = subtotal + tax
print("-" * 34)
print(f"{'Subtotal:':<24}  \${subtotal:>7,.2f}")
print(f"{'Tax (8%):':<24}  \${tax:>7,.2f}")
print(f"{'TOTAL:':<24}  \${total:>7,.2f}")`,
    breakdown: `• answer.lower().strip() — DEFENSIVE INPUT HANDLING. .lower() converts to lowercase (so "DEF", "Def", "def" all match). .strip() removes leading/trailing whitespace. Always clean user input before comparing.

• "number" in answer.lower() — The 'in' keyword checks if a substring exists anywhere in the string. More forgiving than exact matching — "a number" and "number" both work.

• {percentage:.0f}% — Shows the percentage as a whole number. The % symbol after the brace is literal text, not a format specifier (that would be :.0% which auto-multiplies by 100).

• {'CHARACTER CREATION':=^40} — Centers a string literal inside an f-string expression with = as fill characters. Creates decorative headers dynamically.

• char_class.title() — The .title() method capitalizes the first letter of each word. "warrior" becomes "Warrior". Makes display look polished regardless of how user typed it.

• {'*' * (hp // 15)} — Creates a visual bar by repeating * characters proportional to the stat value. 150 HP → 10 stars, 80 HP → 5 stars. A simple text-based visualization.

• The receipt table — Uses consistent column widths: :<20 for item names (left-aligned), :>4 for quantities (right-aligned), :>7,.2f for prices (right-aligned, thousands separator, 2 decimals). This ensures everything lines up perfectly.

• Subtotal accumulation — The subtotal += line_total pattern inside the loop is a running total. After the loop, it holds the sum of all line items. Classic accumulator pattern.`,
    summary: `Real interactive programs combine input() with defensive processing (.lower(), .strip(), type conversion) and formatted output. Key patterns: clean user input before comparing, use accumulator variables for running totals, format tables with consistent column widths (:<20, :>8), and always format currency with ,.2f. These patterns apply to quizzes, games, reports, and any interactive application.`
  },
  {
    title: "Input & String Formatting best practices",
    definition: "Best practices include always validating user input with try/except, preferring f-strings over concatenation, using format specifiers for numbers, and handling edge cases like empty input or invalid conversions gracefully.",
    explanation: `The difference between amateur and professional input handling is ERROR RECOVERY. Users will type unexpected things — always. A robust program anticipates bad input and handles it gracefully instead of crashing.

The #1 rule: ALWAYS wrap int() and float() conversions in try/except. If a user types "abc" when you expect a number, int("abc") raises a ValueError that crashes your program. With try/except, you can catch the error and ask again politely.

For string formatting, always prefer f-strings over concatenation. "Hello, " + name + "!" is harder to read, easier to mess up (forgetting str() conversions), and slightly slower than f"Hello, {name}!". The only time concatenation makes sense is when building a string in a loop where an f-string would be evaluated too early.

Format numbers appropriately for context: currency gets :.2f (always show cents), percentages get :.1% or :.0%, large numbers get :, (comma separators). Never display raw floats to users — 3.14159265358979 is ugly. Show what's relevant: 3.14 or 3.1 or 3.

Input validation should check for: empty strings (user just pressed Enter), wrong types (letters instead of numbers), out-of-range values (age = -5 or age = 999), and unexpected formats. A good program uses a while loop to keep asking until valid input is received.`,
    code: `# === BEST PRACTICE 1: Always validate numeric input ===
# BAD — crashes on invalid input:
# age = int(input("Age: "))     # ValueError if user types "abc"!

# GOOD — handle errors gracefully:
def get_integer(prompt, min_val=None, max_val=None):
    """Safely get an integer from the user with validation."""
    while True:
        try:
            value = int(input(prompt))
            if min_val is not None and value < min_val:
                print(f"Must be at least {min_val}!")
                continue
            if max_val is not None and value > max_val:
                print(f"Must be at most {max_val}!")
                continue
            return value
        except ValueError:
            print("Please enter a valid number!")

# Usage: keeps asking until valid
# level = get_integer("Enter level (1-99): ", 1, 99)

# === BEST PRACTICE 2: Prefer f-strings over concatenation ===
name = "Archer"
score = 1500

# BAD — hard to read, needs str() conversion
# result = "Player " + name + " scored " + str(score) + " points"

# GOOD — clear, concise, no str() needed
result = f"Player {name} scored {score:,} points"
print(result)

# === BEST PRACTICE 3: Format numbers appropriately ===
price = 9.9
big_score = 1500000
accuracy = 0.934

# BAD — raw numbers are ugly
# print(price)           # 9.9 (missing trailing zero for money)
# print(big_score)       # 1500000 (hard to read)
# print(accuracy)        # 0.934 (not a clear percentage)

# GOOD — context-appropriate formatting
print(f"Price: \${price:.2f}")           # Price: $9.90
print(f"Score: {big_score:,}")          # Score: 1,500,000
print(f"Accuracy: {accuracy:.1%}")      # Accuracy: 93.4%

# === BEST PRACTICE 4: Handle empty input ===
def get_name(prompt, default="Player"):
    """Get a non-empty string, with a default fallback."""
    name = input(prompt).strip()
    if not name:  # Empty string is falsy
        return default
    return name.title()  # Capitalize first letters

# === BEST PRACTICE 5: Use multiline f-strings for complex output ===
player = "Knight"
hp = 85
max_hp = 100
gold = 25000

# BAD — multiple print calls for one logical block
# print(f"Player: {player}")
# print(f"HP: {hp}/{max_hp}")
# print(f"Gold: {gold:,}")

# GOOD — one coherent output block
status = f"""
+{'=' * 28}+
| {'PLAYER STATUS':^26} |
+{'-' * 28}+
| Name:  {player:<20}|
| HP:    {hp:>3}/{max_hp:<3} {('*' * (hp * 10 // max_hp)):.<10}|
| Gold:  {gold:<20,}|
+{'=' * 28}+"""
print(status)`,
    breakdown: `• while True with try/except — The "input loop" pattern. Keeps asking until the user provides valid input. try attempts the conversion; if it fails, except catches the error and the loop continues. return exits the loop on success.

• min_val/max_val checks — RANGE VALIDATION. Even if the input is a valid integer, it might not make sense in context (level -5 or level 9999). Always check bounds.

• continue — Skips the rest of the loop body and goes back to the top (asks again). Used when the value is the right type but wrong range.

• f"Player {name} scored {score:,} points" — One clean line replaces the mess of concatenation. No str() needed, format specifiers built in, reads like the actual output.

• \${price:.2f} — ALWAYS show 2 decimal places for money. $9.9 looks unprofessional; $9.90 looks correct. The .2f ensures trailing zeros.

• .strip() on input — Removes accidental leading/trailing spaces. Users often hit space before or after typing. Without strip(), "  Alex  " != "Alex".

• if not name — Empty strings are FALSY in Python. This elegantly checks for both empty string "" and whitespace-only strings (after .strip()). Provides a default value if the user just pressed Enter.

• Triple-quoted f-string — Multiline strings work with f-string formatting. You can build complex formatted blocks as a single string. Much cleaner than many separate print() calls for one logical unit of output.

• ('*' * (hp * 10 // max_hp)):.<10 — A mini health bar: calculates how many stars to show proportional to HP, then pads with dots to exactly 10 characters. Combines math, string multiplication, and format spec.`,
    summary: `Always validate input: use try/except for type conversion, while loops for re-prompting, and range checks for sensible values. Prefer f-strings over concatenation — they're cleaner and don't need str() conversion. Format numbers for context: :.2f for money, :, for large numbers, :.1% for percentages. Handle empty input with defaults. Use multiline f-strings for complex formatted output. These practices make your programs robust, professional, and user-friendly.`
  }
];
