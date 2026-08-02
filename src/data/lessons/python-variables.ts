// Pre-written full lessons for Python Module 2: Variables & Data Types
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonVariablesLessons = [
  {
    title: "What is Variables & Data Types?",
    definition: "Variables are named containers that store data values in your program's memory. Python has four basic data types: str (text), int (whole numbers), float (decimals), and bool (True/False).",
    explanation: `Imagine you're playing an RPG and need to keep track of your character's name, health points, experience, and whether you're alive. In Python, variables are how you store all that information — they're like labeled boxes where each box holds one piece of data.

You create a variable by writing a name, then an equals sign =, then the value you want to store. For example: player_name = "Warrior" creates a box labeled "player_name" and puts the text "Warrior" inside it. From that point on, whenever you write player_name in your code, Python goes and looks in that box.

Python has four fundamental data types. Strings (str) are text — always wrapped in quotes like "hello" or 'hello'. Integers (int) are whole numbers without decimals like 42, -7, or 1000. Floats are decimal numbers like 3.14, 99.5, or -0.001. Booleans (bool) are either True or False — used for yes/no logic.

Unlike some languages, Python doesn't require you to declare what TYPE a variable will hold. You just assign a value and Python figures out the type automatically. This is called "dynamic typing" — the type is determined by the value, not by a declaration.

Variables can be reassigned at any time. If you write score = 100 and then later score = 200, the old value (100) is gone and replaced by 200. The variable now points to the new value.`,
    code: `# Creating variables of each data type
player_name = "Shadow Knight"    # str - text in quotes
health_points = 100              # int - whole number
critical_chance = 0.25           # float - decimal number
is_alive = True                  # bool - True or False

# Printing variables and their types
print(player_name)               # Output: Shadow Knight
print(type(player_name))         # Output: <class 'str'>
print(type(health_points))       # Output: <class 'int'>
print(type(critical_chance))     # Output: <class 'float'>
print(type(is_alive))            # Output: <class 'bool'>

# Variables can store any value
level = 1
print(f"Level: {level}")         # Output: Level: 1

# Reassigning a variable
level = 2
print(f"Level: {level}")         # Output: Level: 2

# Multiple assignment in one line
x, y, z = 10, 20, 30
print(x, y, z)                   # Output: 10 20 30

# Same value to multiple variables
a = b = c = 0
print(a, b, c)                   # Output: 0 0 0`,
    breakdown: `Let's break down each line:

• player_name = "Shadow Knight" — Creates a STRING variable. The quotes tell Python this is text. You can use single or double quotes — both work identically.

• health_points = 100 — Creates an INTEGER variable. No quotes, no decimal point = whole number. Python sees this and knows it's an int.

• critical_chance = 0.25 — Creates a FLOAT variable. The decimal point tells Python this is a floating-point number, even if you wrote 1.0 (still a float, not an int).

• is_alive = True — Creates a BOOLEAN variable. Must be exactly True or False (capitalized!). true or FALSE would cause errors.

• type(player_name) — The built-in type() function returns what data type a variable holds. Useful for debugging when you're not sure what type something is.

• level = 1 then level = 2 — Variables can be REASSIGNED. The old value is discarded and replaced. The variable name now points to the new value.

• x, y, z = 10, 20, 30 — MULTIPLE ASSIGNMENT. Assigns three values to three variables in one line. The order must match: first value to first variable, second to second, etc.

• a = b = c = 0 — CHAINED ASSIGNMENT. All three variables get the same value (0). Useful for initializing multiple counters at once.`,
    summary: `Variables are named containers for data, created with the = operator. Python has four basic types: str (text in quotes), int (whole numbers), float (decimals), and bool (True/False). Python automatically detects the type from the value — you never need to declare it. Variables can be reassigned at any time, and you can use type() to check what type a variable holds.`
  },
  {
    title: "How Variables & Data Types works",
    definition: "When you create a variable, Python allocates a space in memory to store the value, and the variable name becomes a reference (pointer) to that memory location. Python uses dynamic typing, meaning types are tracked at runtime, not declared in advance.",
    explanation: `Under the hood, Python's variables work differently than a simple "box with a label." When you write score = 100, Python does two things: first, it creates an integer object 100 somewhere in memory; second, it creates a name "score" that POINTS to that object. The variable name is like a sticky note attached to the object, not a box containing it.

This matters because of how reassignment works. When you write score = 200, Python doesn't modify the original 100 — it creates a NEW object (200) and moves the sticky note to point to it. The old 100 object, if nothing else points to it, gets cleaned up by Python's garbage collector.

Dynamic typing means Python determines the type of a variable at the moment you assign it. You can even change a variable's type by assigning a different kind of value: x = 10 (int) then x = "hello" (now str). Python doesn't care — it just updates the reference. This is different from languages like Java or C++ where you must declare the type upfront and can never change it.

Python tracks types internally using a system of type objects. Every value in Python is an OBJECT with three things: a type (what kind of data), a value (the actual data), and a reference count (how many variables point to it). When you call type(x), Python looks at what object x points to and tells you its type.

For small integers (-5 to 256) and short strings, Python actually reuses the same object in memory. So if you write a = 100 and b = 100, both variables point to the SAME object in memory. This optimization (called "interning") saves memory but doesn't affect how your code works.`,
    code: `# Dynamic typing — Python detects type from value
score = 100          # Python creates int object, score points to it
print(type(score))   # <class 'int'>

score = "one hundred"  # Now score points to a str object!
print(type(score))     # <class 'str'>

# Understanding references with id()
# id() shows the memory address of an object
a = 42
b = 42
print(id(a))         # Same address! (integer interning)
print(id(b))         # Same address as a

# Reassignment creates new objects
x = 10
print(f"x = {x}, id = {id(x)}")
x = 20
print(f"x = {x}, id = {id(x)}")  # Different id!

# Type inference in action
result = 10 + 5      # int + int = int
print(type(result))  # <class 'int'>

result = 10 + 5.0    # int + float = float (automatic promotion)
print(type(result))  # <class 'float'>

result = 10 / 3      # Division ALWAYS returns float
print(result)        # 3.3333...
print(type(result))  # <class 'float'>

# Even "clean" division returns float
result = 10 / 2
print(result)        # 2.0 (not 2!)
print(type(result))  # <class 'float'>

# Use // for integer division
result = 10 // 3
print(result)        # 3 (truncated, not rounded)
print(type(result))  # <class 'int'>`,
    breakdown: `• score = 100 then score = "one hundred" — Demonstrates dynamic typing. The SAME variable can hold completely different types. Python just moves the reference to a new object.

• id(a) — The id() function shows the memory address where an object lives. If two variables have the same id, they point to the SAME object in memory.

• a = 42 and b = 42 having the same id — Python "interns" (reuses) small integers for efficiency. Both variables point to one shared 42 object. This is an optimization detail — it doesn't change behavior.

• x = 10 then x = 20 — Different ids prove Python created a NEW object for 20 rather than modifying the old 10. Integers are IMMUTABLE (unchangeable). Reassignment always creates a new object.

• 10 + 5.0 = 15.0 (float) — When you mix int and float in math, Python automatically "promotes" the result to float. This prevents data loss (an int can't hold 3.14, but a float can hold 3).

• 10 / 3 returns 3.3333... — Regular division (/) ALWAYS returns a float in Python 3, even if the result is whole. This catches many beginners off guard.

• 10 // 3 returns 3 — Floor division (//) truncates the decimal and returns an integer. It rounds DOWN (toward negative infinity), not toward zero.`,
    summary: `Python variables are references (pointers) to objects in memory, not containers. Dynamic typing means the type is determined by the value at runtime — you can reassign any type to any variable. When you mix int and float in operations, Python promotes to float. Regular division (/) always returns float; use // for integer division. Python interns small integers and short strings for memory efficiency.`
  },
  {
    title: "Variables & Data Types syntax & usage",
    definition: "Python variable names must follow specific rules: they can contain letters, numbers, and underscores, cannot start with a digit or be a reserved keyword, and conventionally use snake_case. Assignment operators (=, +=, -=, *=) set or modify values, and type conversion functions (int(), str(), float()) change between types.",
    explanation: `Python has strict rules about what makes a valid variable name. You can use letters (a-z, A-Z), digits (0-9), and underscores (_). However, the name CANNOT start with a digit — score1 is valid, but 1score is not. Names are case-sensitive: Score, score, and SCORE are three different variables.

The Python convention for variable names is snake_case: all lowercase letters with underscores separating words. For example: player_health, total_score, max_damage. This is different from camelCase (used in JavaScript) or PascalCase (used for class names in Python).

There are 35 reserved keywords you cannot use as variable names: False, True, None, and, or, not, if, elif, else, for, while, break, continue, def, return, class, import, from, as, pass, try, except, finally, raise, with, yield, lambda, global, nonlocal, del, in, is, assert, async, await. Using any of these as a variable name causes a SyntaxError.

Assignment operators modify variables in place. The basic = assigns a value. Compound operators combine an operation with assignment: += adds to the current value, -= subtracts, *= multiplies, /= divides, //= floor divides, **= exponentiates, %= gives remainder.

Type conversion (also called "casting") lets you change between types. int("42") converts the string "42" to the integer 42. str(100) converts the number to the string "100". float("3.14") converts to a float. bool(0) gives False; bool(1) gives True. Invalid conversions like int("hello") raise a ValueError.`,
    code: `# Valid variable names
player_score = 100       # snake_case (preferred!)
_private = "hidden"      # leading underscore (convention for "private")
MAX_HP = 999             # ALL_CAPS (convention for constants)
playerName = "Alex"      # camelCase (works but not Pythonic)
x2 = 42                  # numbers OK, just not at start

# INVALID names (these would cause errors):
# 2fast = "error"        # Can't start with digit
# my-var = "error"       # Hyphens not allowed
# class = "error"        # Reserved keyword
# my var = "error"       # Spaces not allowed

# Assignment operators
gold = 100
gold += 50               # Same as: gold = gold + 50 → 150
gold -= 20               # Same as: gold = gold - 20 → 130
gold *= 2                # Same as: gold = gold * 2 → 260
gold //= 3              # Same as: gold = gold // 3 → 86
print(f"Gold: {gold}")   # Output: Gold: 86

# Type conversion (casting)
age_str = "25"
age_int = int(age_str)   # String → Integer
print(age_int + 5)       # 30 (math works now!)

price = 19.99
price_str = str(price)   # Float → String
print("$" + price_str)   # $19.99

whole = int(3.7)         # Float → Integer (truncates!)
print(whole)             # 3 (NOT rounded — just cuts decimal)

# Boolean conversion rules
print(bool(0))           # False (zero is falsy)
print(bool(42))          # True (any non-zero is truthy)
print(bool(""))          # False (empty string is falsy)
print(bool("hello"))     # True (non-empty string is truthy)
print(bool([]))          # False (empty list is falsy)
print(bool([1, 2]))      # True (non-empty list is truthy)`,
    breakdown: `• snake_case naming — Python's PEP 8 style guide says variables should be lowercase_with_underscores. This is the community standard that all Python developers follow.

• _private — A single leading underscore is a CONVENTION (not enforced) meaning "this is internal, don't use it from outside." Python won't stop you, but it signals intent.

• MAX_HP = 999 — ALL_CAPS with underscores is the convention for CONSTANTS — values that should never change. Python doesn't enforce this (you CAN reassign), but developers know not to.

• gold += 50 — The += operator is shorthand for "take the current value, add to it, and store the result back." It's cleaner than writing gold = gold + 50 and avoids repeating the variable name.

• int(age_str) — Converts the STRING "25" to the INTEGER 25. Essential when reading user input (which is always a string) and needing to do math with it.

• int(3.7) gives 3 — Converting float to int TRUNCATES (chops off the decimal). It does NOT round. 3.9 becomes 3, not 4. Use round(3.7) if you want rounding.

• bool(0) is False — Python's "truthiness" rules: zero, empty strings, empty collections, and None are all False. Everything else is True. This is used constantly in if statements.`,
    summary: `Variable names use snake_case, can't start with digits or be keywords, and are case-sensitive. Constants use ALL_CAPS by convention. Compound assignment operators (+=, -=, *=) modify variables in place. Type conversion with int(), str(), float(), bool() changes between types. int() truncates floats (doesn't round). Python's truthiness: zero, empty, and None are False; everything else is True.`
  },
  {
    title: "Practical examples of Variables & Data Types",
    definition: "In real programs, variables track game state, user data, calculations, and configuration. Understanding how to choose the right data type and manage variable state is essential for building functional applications.",
    explanation: `Let's see how variables and data types work in real-world scenarios. Games, web apps, and scripts all rely on properly typed variables to function correctly.

In a game, you might track a player's inventory count (int), their name (str), health percentage (float), and whether they've completed a quest (bool). Each type serves a specific purpose — using the wrong type leads to bugs.

A common real-world pattern is accumulating values: starting a counter at 0 and adding to it in a loop. Another is tracking state changes: a boolean that starts as False and flips to True when a condition is met. These patterns appear in virtually every program.

Type conversion becomes crucial when data comes from external sources. User input is always a string. Data from files is usually strings. API responses often contain strings that represent numbers. You constantly need to convert between types to process data correctly.

Here are three practical examples that demonstrate these concepts in action: a game inventory system, a player stats tracker, and a score calculator. Each shows different variable management patterns you'll use in real code.`,
    code: `# === EXAMPLE 1: Game Inventory System ===
# Track items using different data types
weapon_name = "Dragon Slayer"     # str
weapon_damage = 85                # int
weapon_speed = 1.4                # float (attacks per second)
is_equipped = True                # bool

# Calculate DPS (damage per second)
dps = weapon_damage * weapon_speed
print(f"Weapon: {weapon_name}")
print(f"DPS: {dps:.1f}")          # Output: DPS: 119.0

# === EXAMPLE 2: Player Stats Tracker ===
# Starting stats
base_hp = 100
bonus_hp = 25
current_hp = base_hp + bonus_hp   # 125
max_hp = current_hp

# Take damage
damage_taken = 40
current_hp -= damage_taken        # 125 - 40 = 85

# Calculate health percentage
hp_percent = (current_hp / max_hp) * 100
print(f"HP: {current_hp}/{max_hp} ({hp_percent:.0f}%)")
# Output: HP: 85/125 (68%)

# === EXAMPLE 3: Score Calculator ===
# Quest rewards as different types
quest_name = "Dragon's Lair"
base_xp = 500
time_bonus = 1.5                  # Multiplier for fast completion
first_clear = True                # Double XP for first clear

# Calculate total XP
total_xp = base_xp * time_bonus
if first_clear:
    total_xp *= 2                 # Double it!

# Convert to int (XP should be whole number)
total_xp = int(total_xp)
print(f"Quest: {quest_name}")
print(f"XP Earned: {total_xp:,}")  # Output: XP Earned: 1,500`,
    breakdown: `• weapon_speed = 1.4 — Using a float for attack speed makes sense because attacks per second can be fractional (1.4 attacks/sec). Using int would lose precision.

• dps = weapon_damage * weapon_speed — Mixing int * float automatically gives a float result (119.0). Python handles the type promotion for you.

• {dps:.1f} — Format specifier: show 1 decimal place. Without this, you might get 119.00000000001 due to floating-point math.

• current_hp -= damage_taken — The -= operator in action. Reads as "reduce current HP by damage taken." Much cleaner than current_hp = current_hp - damage_taken.

• (current_hp / max_hp) * 100 — Classic percentage formula. Division gives a float, multiply by 100 for percentage. The parentheses ensure division happens first.

• {hp_percent:.0f} — Format with 0 decimal places. Shows "68%" instead of "68.0%" — cleaner for display.

• total_xp *= 2 — Multiply-assign. Only runs if first_clear is True (because it's inside the if block). Demonstrates conditional modification.

• int(total_xp) — Converts 1500.0 (float from multiplication) back to integer 1500. XP in games is typically whole numbers, so this makes sense.

• {total_xp:,} — The comma format specifier adds thousand separators. 1500 becomes "1,500". Essential for readable large numbers.`,
    summary: `Real programs combine multiple data types to model complex state. Games use int for HP/XP, float for multipliers/percentages, str for names, and bool for flags. Key patterns include: accumulating with +=, calculating percentages with division, converting types when needed (float to int for clean display), and using format specifiers (:,.0f) for professional output.`
  },
  {
    title: "Variables & Data Types best practices",
    definition: "Best practices for variables include using descriptive names, following Python naming conventions (snake_case for variables, ALL_CAPS for constants), preferring isinstance() over type() for type checks, and using type hints for documentation.",
    explanation: `Writing good variable code isn't just about making it work — it's about making it READABLE, MAINTAINABLE, and BUG-FREE. Professional Python developers follow specific conventions that make code easier to understand at a glance.

The single most important rule: use descriptive names. A variable named x tells you nothing. A variable named player_health tells you exactly what it holds. You read code far more often than you write it, so optimizing for readability pays off enormously.

Python's naming conventions (from PEP 8) are: snake_case for regular variables and functions (player_score, calculate_damage), ALL_CAPS for constants (MAX_HEALTH, GRAVITY), PascalCase for classes (PlayerCharacter, GameEngine), and _leading_underscore for internal/private values.

For type checking, prefer isinstance() over type(). The difference: type(x) == int only matches exactly int, but isinstance(x, int) also matches subclasses. For example, a boolean IS an integer in Python (True == 1, False == 0), so isinstance(True, int) returns True, which is usually what you want.

Type hints (added in Python 3.5+) let you annotate what type a variable SHOULD hold. They don't enforce anything at runtime — Python still lets you assign whatever you want — but they serve as documentation and enable IDE autocompletion and static analysis tools like mypy.`,
    code: `# GOOD: Descriptive variable names
player_health = 100
max_inventory_slots = 20
is_quest_complete = False
damage_multiplier = 1.5

# BAD: Vague names (don't do this!)
# x = 100
# n = 20
# flag = False
# m = 1.5

# Constants in ALL_CAPS
MAX_LEVEL = 99
GRAVITY = 9.81
BASE_DAMAGE = 10
CRITICAL_MULTIPLIER = 2.5

# Type checking — prefer isinstance()
value = 42

# BAD: using type() for checks
if type(value) == int:
    print("It's an int (exact match only)")

# GOOD: using isinstance() — handles inheritance
if isinstance(value, int):
    print("It's an int (or subclass of int)")

# Check multiple types at once
if isinstance(value, (int, float)):
    print("It's a number!")

# Type hints for documentation (Python 3.5+)
player_name: str = "Archer"
health: int = 100
speed: float = 1.5
alive: bool = True

# Type hints in functions
def calculate_damage(base: int, multiplier: float = 1.0) -> int:
    """Calculate total damage with type hints."""
    return int(base * multiplier)

# Using the function
result: int = calculate_damage(50, 2.0)
print(f"Damage: {result}")        # Output: Damage: 100

# Avoid unnecessary type conversion
score = 100                       # Already an int!
# BAD: score = int(100)          # Redundant conversion
# BAD: name = str("hello")      # Already a string!`,
    breakdown: `• player_health vs x — Descriptive names are self-documenting. Six months from now, you (or a teammate) will instantly understand what player_health means. x is a mystery.

• MAX_LEVEL = 99 — ALL_CAPS signals "this is a constant, don't change it." Python won't enforce this, but every developer knows the convention. Changing a constant is a code smell.

• type(value) == int — Only returns True for EXACTLY int. Fails for subclasses. Since bool is a subclass of int, type(True) == int is False, which is usually not what you want.

• isinstance(value, int) — Returns True for int AND all its subclasses. isinstance(True, int) is True. This is almost always the correct choice for type checking.

• isinstance(value, (int, float)) — Pass a TUPLE of types to check against multiple types at once. Returns True if value is any of the listed types.

• player_name: str = "Archer" — Type HINT (annotation). The : str doesn't do anything at runtime — Python ignores it. But IDEs use it for autocomplete, and tools like mypy can catch type errors before you run the code.

• def calculate_damage(base: int, multiplier: float = 1.0) -> int — Function type hints: parameters show expected types, -> int shows the return type. Makes the function's contract crystal clear.

• int(100) is redundant — Don't convert values that are already the right type. It adds confusion and a tiny performance cost for zero benefit.`,
    summary: `Use descriptive snake_case names for variables and ALL_CAPS for constants. Prefer isinstance() over type() for type checking because it handles inheritance correctly. Use type hints (variable: type) to document expected types — they help IDEs and static analysis tools catch bugs. Avoid redundant type conversions. These conventions make your code professional, readable, and maintainable.`
  }
];
