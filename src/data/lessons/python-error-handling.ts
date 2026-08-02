// Pre-written full lessons for Python Module: Error Handling
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonErrorHandlingLessons = [
  {
    title: "What is Error Handling?",
    definition: "Error handling is the practice of anticipating and gracefully recovering from runtime errors (exceptions) using try/except blocks, preventing your program from crashing unexpectedly.",
    explanation: `Imagine your RPG character walks into a dungeon and steps on a trap. Without armor or shields, one hit and it's game over. Error handling is like equipping your code with armor — when something unexpected happens, your program doesn't just die; it catches the blow and keeps running.

In Python, when something goes wrong at runtime — dividing by zero, opening a file that doesn't exist, converting "hello" to an integer — Python raises an "exception." Without error handling, this exception causes your entire program to crash with a red traceback message. The program stops dead, any unsaved progress is lost, and the user sees an ugly error.

The try/except block is Python's primary tool for catching exceptions. You wrap risky code in a try block, and if an exception occurs, Python jumps to the except block instead of crashing. It's like a safety net under a tightrope walker — if they fall, the net catches them.

Error handling isn't about preventing bugs (that's what testing is for). It's about handling situations you CAN'T prevent: network timeouts, missing files, invalid user input, full disks. These are external factors your code must deal with gracefully.

Think of it this way: a well-built game doesn't crash when you unplug the controller — it pauses and shows "Controller disconnected." That's error handling in action: detecting the problem, preventing a crash, and giving the user a clear path forward.`,
    code: `# Without error handling — program CRASHES
# result = 10 / 0  # ZeroDivisionError! Game over!

# With error handling — program SURVIVES
try:
    player_input = "abc"
    damage = int(player_input)  # Can't convert "abc" to int!
except ValueError:
    print("Invalid input! Using default damage of 10.")
    damage = 10

print(f"Damage dealt: {damage}")  # Output: Damage dealt: 10

# Another example: safe division
def safe_divide(hp, divisor):
    try:
        result = hp / divisor
        return result
    except ZeroDivisionError:
        print("Cannot divide by zero! Returning full HP.")
        return hp

# Normal case
print(safe_divide(100, 4))   # Output: 25.0

# Error case — no crash!
print(safe_divide(100, 0))   # Output: Cannot divide by zero!...
                              # Returns: 100

# Real-world: loading a save file
try:
    save_file = open("savegame.dat", "r")
    data = save_file.read()
    save_file.close()
except FileNotFoundError:
    print("No save file found. Starting new game!")
    data = None`,
    breakdown: `• try: — Marks the beginning of "risky" code. Python will ATTEMPT to run everything inside this block. If any line raises an exception, execution immediately jumps to the except block.

• except ValueError: — This catches ONLY ValueError exceptions. If a different exception type occurs (like TypeError), it WON'T be caught here and the program will still crash. Being specific about what you catch is important.

• damage = 10 — The fallback value. When the conversion fails, we assign a sensible default instead of letting the program crash. The program continues normally from here.

• except ZeroDivisionError: — Catches division by zero specifically. Python has dozens of built-in exception types, each for different error situations. Using the right one makes your intent clear.

• return hp — In the error case, we return the original HP unchanged. The function still returns a valid value — the caller never knows an error occurred internally.

• except FileNotFoundError: — Catches the specific error when a file doesn't exist. This is extremely common in game development when loading saves, configs, or assets.

• data = None — When the file doesn't exist, we set data to None as a signal that no save was found. The rest of the program can check "if data is None: start new game."`,
    summary: `Error handling uses try/except blocks to catch runtime exceptions and prevent program crashes. Without it, any unexpected error — bad input, missing files, division by zero — kills your program instantly. With it, your code detects the problem, recovers gracefully, and keeps running. Always catch specific exception types rather than catching everything blindly.`
  },
  {
    title: "How Error Handling works",
    definition: "When an exception is raised, Python searches up the call stack for a matching except block. Exceptions form a hierarchy (all inherit from BaseException), carry traceback information showing where they occurred, and are objects with attributes like args and custom data.",
    explanation: `When Python hits an error, it creates an exception OBJECT — a data structure containing information about what went wrong, where it happened, and why. This object then "propagates" up through your code looking for someone to handle it.

Think of it like a chain of command in a guild. A scout encounters a dragon (the error). They report to their squad leader (the calling function). If the squad leader can't handle it, they escalate to the guild master (the next function up). If nobody can handle it, the kingdom falls (the program crashes). Each level gets a chance to catch and handle the exception.

This "bubbling up" is called stack unwinding. Python maintains a call stack — a record of which function called which. When an exception occurs in function C (called by B, called by A), Python first checks if C has a try/except. If not, it unwinds to B and checks there. Then A. If nothing catches it, Python prints the traceback and terminates.

The traceback is your debugging treasure map. It shows the exact sequence of function calls that led to the error, with file names, line numbers, and the offending code. Reading tracebacks from BOTTOM to TOP gives you: the actual error (bottom line), where it happened (second from bottom), and the chain of calls that got there (everything above).

Python's exceptions form a class hierarchy. All exceptions inherit from BaseException. Most errors you'll encounter inherit from Exception (a subclass of BaseException). This hierarchy matters because catching a parent class also catches all its children. For example, catching Exception catches ValueError, TypeError, FileNotFoundError, and hundreds of others.`,
    code: `# Exception propagation up the call stack
def attack_enemy(weapon_power, defense):
    """Calculate damage — may raise ZeroDivisionError."""
    return weapon_power / defense  # Raises if defense = 0

def battle_round(player, enemy):
    """Run one round — doesn't handle exceptions itself."""
    damage = attack_enemy(player["power"], enemy["defense"])
    enemy["hp"] -= damage
    return enemy["hp"]

def run_game():
    """Top-level function catches propagated exceptions."""
    player = {"power": 50}
    enemy = {"hp": 100, "defense": 0}  # Bug: zero defense!
    
    try:
        remaining_hp = battle_round(player, enemy)
        print(f"Enemy HP: {remaining_hp}")
    except ZeroDivisionError:
        print("Battle error: enemy has invalid stats!")
        print("Skipping battle...")

run_game()  # Output: Battle error: enemy has invalid stats!

# Exception objects carry information
try:
    scores = [100, 95, 87]
    print(scores[10])  # Index doesn't exist!
except IndexError as e:
    print(f"Error type: {type(e).__name__}")  # IndexError
    print(f"Error message: {e}")   # list index out of range
    print(f"Error args: {e.args}") # ('list index out of range',)

# Exception hierarchy demonstration
# ArithmeticError is parent of ZeroDivisionError
try:
    result = 1 / 0
except ArithmeticError:  # Catches ZeroDivision too!
    print("Caught via parent class!")`,
    breakdown: `• attack_enemy has NO try/except — It doesn't handle the error itself. The exception propagates UP to whoever called it. This is intentional — low-level functions often let errors bubble up to higher-level code that knows how to respond.

• battle_round also has NO try/except — The exception passes through it too, continuing upward. The ZeroDivisionError from attack_enemy flies right through battle_round to run_game.

• run_game catches it with try/except — This is where the exception finally gets handled. Three function calls deep, and the top-level code catches it cleanly. The program doesn't crash.

• except IndexError as e — The 'as' keyword captures the exception OBJECT into variable e. This gives you access to the error's details: its message, arguments, and type.

• type(e).__name__ — Gets the class name of the exception as a string. Useful for logging or displaying error types to users.

• e.args — A tuple containing the arguments passed to the exception. Usually contains the error message string, but can have multiple items for some exception types.

• except ArithmeticError — ArithmeticError is the PARENT class of ZeroDivisionError, OverflowError, and FloatingPointError. Catching the parent catches ALL its children. This is Python's exception hierarchy in action.`,
    summary: `Exceptions propagate up the call stack until a matching except block catches them. Each function in the chain gets a chance to handle the error; if none do, the program crashes with a traceback. Exception objects (captured with 'as') carry error details like the message and type. Python's exception hierarchy means catching a parent class also catches all child exceptions — ArithmeticError catches ZeroDivisionError, Exception catches nearly everything.`
  },
  {
    title: "Error Handling syntax & usage",
    definition: "Python's full error handling syntax includes try/except/else/finally blocks, catching multiple exception types, the 'as' keyword for exception binding, raising exceptions with 'raise', and defining custom exception classes.",
    explanation: `The try/except block has two optional companions: else and finally. The else block runs ONLY if no exception occurred — it's for code that should execute on success. The finally block runs NO MATTER WHAT — whether an exception occurred or not, whether it was caught or not. It's guaranteed cleanup code.

The order matters: try first, then except (one or more), then else (optional), then finally (optional). You can have multiple except blocks to handle different exception types differently. Python checks them top-to-bottom and uses the first matching one.

You can catch multiple exceptions in a single except block by putting them in a tuple: except (ValueError, TypeError): handles both. This is useful when you want the same recovery logic for different error types.

The raise statement lets YOU create exceptions intentionally. It's like pulling a fire alarm — you're signaling that something has gone wrong that the current code can't fix. You can raise built-in exceptions (raise ValueError("Invalid input")) or re-raise a caught exception (just raise with no argument inside an except block).

Custom exception classes let you create domain-specific errors. If you're building a game engine, you might create GameOverError, InvalidMoveError, or InsufficientGoldError. Custom exceptions inherit from Exception and can carry extra data relevant to your specific error condition.`,
    code: `# Full syntax: try / except / else / finally
def load_player_data(filename):
    try:
        file = open(filename, "r")
        data = file.read()
    except FileNotFoundError:
        print(f"File '{filename}' not found!")
        data = None
    except PermissionError:
        print("Access denied! Check file permissions.")
        data = None
    else:
        # Runs ONLY if no exception occurred
        print(f"Successfully loaded {len(data)} bytes!")
    finally:
        # Runs ALWAYS — perfect for cleanup
        print("Load attempt complete.")
    return data

# Multiple exceptions in one handler
def parse_stat(value):
    try:
        return int(value)
    except (ValueError, TypeError) as e:
        print(f"Could not parse '{value}': {e}")
        return 0

# Raising your own exceptions
def set_player_level(level):
    if not isinstance(level, int):
        raise TypeError("Level must be an integer!")
    if level < 1 or level > 99:
        raise ValueError(f"Level must be 1-99, got {level}")
    print(f"Level set to {level}")

# Custom exception classes
class InsufficientGoldError(Exception):
    def __init__(self, cost, balance):
        self.cost = cost
        self.balance = balance
        super().__init__(
            f"Need {cost} gold but only have {balance}!"
        )

def buy_item(item_name, cost, player_gold):
    if cost > player_gold:
        raise InsufficientGoldError(cost, player_gold)
    return player_gold - cost

# Using custom exception
try:
    gold = buy_item("Epic Sword", 500, 200)
except InsufficientGoldError as e:
    print(f"Purchase failed: {e}")
    print(f"You need {e.cost - e.balance} more gold!")`,
    breakdown: `• except FileNotFoundError / except PermissionError — Multiple except blocks handle different errors differently. The file might not exist OR you might not have permission — these require different messages.

• else: block — Runs ONLY on success (no exception). Put success-only logic here instead of at the end of the try block. This makes it clear what runs on success vs what might raise exceptions.

• finally: block — Runs ALWAYS, even if an exception wasn't caught, even if there's a return statement in try or except. Use it for cleanup: closing files, releasing connections, logging completion.

• except (ValueError, TypeError) as e — Catches EITHER exception type with the same handler. The tuple groups them together. The 'as e' captures whichever one actually occurred.

• raise TypeError("Level must be an integer!") — Creates and raises an exception. The string argument becomes the error message. Use raise when YOUR code detects an invalid state that it shouldn't handle itself.

• class InsufficientGoldError(Exception) — Custom exception. Inherits from Exception (required). The __init__ stores extra context (cost and balance) that the catcher can use for recovery logic.

• super().__init__(...) — Calls Exception's constructor with the error message string. This ensures the exception works with standard error printing and logging.

• e.cost - e.balance — Custom exceptions carry domain-specific data. The catcher accesses these attributes to provide helpful recovery information ("you need 300 more gold").`,
    summary: `The full try/except/else/finally syntax handles errors comprehensively: except catches specific errors, else runs on success only, finally runs always for cleanup. You can catch multiple exceptions in one handler with a tuple. Use raise to create exceptions when your code detects invalid states. Custom exception classes (inheriting from Exception) let you define domain-specific errors with extra data that catchers can use for intelligent recovery.`
  },
  {
    title: "Practical examples of Error Handling",
    definition: "Real-world error handling involves protecting user input processing, file operations with fallbacks, API request retries, and game state save/load systems that recover gracefully from corruption or missing data.",
    explanation: `In real applications, errors aren't theoretical — they happen constantly. Users type letters where numbers are expected, files get deleted while your program runs, networks drop mid-request, and save files get corrupted. Professional code handles ALL of these gracefully.

User input is the most common source of errors in interactive programs. Players will type anything: empty strings, symbols, numbers that are too large, or completely irrelevant text. A robust input function keeps asking until it gets valid data, never crashing no matter what the user types.

File operations are inherently risky. The file might not exist, might be in use by another program, might be corrupted, or the disk might be full when writing. A well-designed save system tries multiple fallback strategies: save to primary location, fall back to a backup, and if all else fails, alert the user without losing their data.

Game state management combines all these challenges. Loading a save file requires reading from disk (might fail), parsing JSON or binary data (might be corrupted), and validating the data makes sense (HP shouldn't be negative, level shouldn't be 999 if max is 99). Each step can fail differently and needs its own recovery strategy.

API and network calls add timeout and connectivity issues. A robust system retries failed requests with increasing delays (exponential backoff), provides cached data when the network is down, and clearly communicates status to the user.`,
    code: `# === EXAMPLE 1: Bulletproof User Input ===
def get_player_choice(prompt, valid_range):
    """Keep asking until we get valid input."""
    while True:
        try:
            raw = input(prompt)
            choice = int(raw)
            if choice not in valid_range:
                raise ValueError(f"Must be {min(valid_range)}-{max(valid_range)}")
            return choice
        except ValueError as e:
            print(f"Invalid choice: {e}. Try again!")

# === EXAMPLE 2: Save System with Fallback ===
import json

def save_game(player_data, primary_path, backup_path):
    """Try primary save, fall back to backup."""
    for path in [primary_path, backup_path]:
        try:
            with open(path, "w") as f:
                json.dump(player_data, f, indent=2)
            print(f"Game saved to {path}!")
            return True
        except (IOError, OSError) as e:
            print(f"Save failed at {path}: {e}")
    print("CRITICAL: All save locations failed!")
    return False

# === EXAMPLE 3: Safe Game State Loader ===
def load_game_state(filepath):
    """Load and validate save data with recovery."""
    default_state = {"hp": 100, "level": 1, "gold": 0}
    try:
        with open(filepath, "r") as f:
            data = json.load(f)
        # Validate loaded data
        if not isinstance(data.get("hp"), (int, float)):
            raise ValueError("Corrupted HP value")
        if data.get("level", 0) < 1:
            raise ValueError("Invalid level")
        print("Save loaded successfully!")
        return data
    except FileNotFoundError:
        print("No save found — starting fresh!")
        return default_state
    except json.JSONDecodeError:
        print("Save file corrupted — starting fresh!")
        return default_state
    except ValueError as e:
        print(f"Invalid save data ({e}) — using defaults!")
        return default_state`,
    breakdown: `• while True with try/except — Classic "retry loop" pattern. Keeps asking for input until valid data arrives. The loop only breaks via the return statement when input is valid.

• raise ValueError inside try — You CAN raise exceptions inside a try block! Here, we validate the range manually and raise if it's wrong. The except block catches both conversion failures AND our manual raise.

• for path in [primary_path, backup_path] — Try multiple save locations. If the primary fails (disk full, permissions), automatically try the backup. Only report total failure if ALL locations fail.

• with open(path, "w") as f — The 'with' statement ensures the file is properly closed even if json.dump raises an exception mid-write. Essential for safe file operations.

• json.dump(player_data, f, indent=2) — Writes the dictionary as formatted JSON. If the disk is full or the path is invalid, this raises IOError/OSError.

• return True / return False — Boolean return signals success/failure to the caller, who can decide what to do next (retry, warn user, etc.).

• json.load(f) — Parses JSON from file. Raises json.JSONDecodeError if the file contains invalid JSON (corrupted save).

• data.get("hp") — Using .get() instead of data["hp"] avoids KeyError if the key is missing. Returns None by default, which our isinstance check catches.

• Three separate except blocks — Each error type gets different handling and a different message. FileNotFoundError is normal (first play), JSONDecodeError means corruption, ValueError means partial corruption.`,
    summary: `Real-world error handling uses retry loops for user input (keep asking until valid), fallback chains for file saves (try primary then backup), and multi-layer validation for data loading (file exists → valid JSON → valid values). Each failure mode gets specific handling with clear user messages. The key pattern is: attempt the operation, catch specific failures, provide graceful fallbacks, and never crash.`
  },
  {
    title: "Error Handling best practices",
    definition: "Professional error handling follows key principles: catch specific exceptions (never bare except), use else for success logic, finally for guaranteed cleanup, prefer EAFP over LBYL, and never silently swallow errors without logging them.",
    explanation: `The cardinal sin of error handling is the "bare except" — writing except: with no exception type. This catches EVERYTHING, including keyboard interrupts (Ctrl+C) and system exit signals. It makes debugging impossible because you never know WHAT went wrong. Always catch specific exception types.

Python has two error handling philosophies: LBYL (Look Before You Leap) and EAFP (Easier to Ask Forgiveness than Permission). LBYL checks conditions before acting: "if file exists, open it." EAFP just tries and catches failures: "try to open the file, handle FileNotFoundError." Python strongly favors EAFP — it's cleaner, avoids race conditions, and is more Pythonic.

The else clause is underused but valuable. Code in else ONLY runs if try succeeded without exceptions. This is better than putting success code at the end of try, because the else code won't accidentally catch exceptions it shouldn't. If your success processing might raise its own exception, putting it in else keeps it separate from the try block's error handling.

Never silently swallow errors. Writing except: pass is almost always a bug — it hides problems that will surface later in confusing ways. At minimum, LOG the error. Better: handle it properly. Best: let it propagate if you can't handle it meaningfully at this level.

Finally blocks are for CLEANUP, not for handling. Close files, release locks, disconnect sockets, restore state. The finally block runs even if you return from inside try or except, making it the only truly guaranteed cleanup mechanism.`,
    code: `# BAD: Bare except catches EVERYTHING (never do this!)
# try:
#     do_something()
# except:          # Catches KeyboardInterrupt, SystemExit, etc!
#     pass         # Silently swallows ALL errors. Terrible!

# GOOD: Catch specific exceptions
try:
    score = int(user_input)
except ValueError:
    print("Please enter a number!")

# EAFP vs LBYL approaches
inventory = {"sword": 1, "potion": 3}

# LBYL — Look Before You Leap (less Pythonic)
if "shield" in inventory:
    count = inventory["shield"]
else:
    count = 0

# EAFP — Easier to Ask Forgiveness (more Pythonic!)
try:
    count = inventory["shield"]
except KeyError:
    count = 0

# Using else for success-only code
def process_quest_reward(reward_str):
    try:
        gold = int(reward_str)
    except ValueError:
        print("Invalid reward amount!")
        return 0
    else:
        # Only runs if int() succeeded
        # If this raises, it WON'T be caught above
        print(f"Quest complete! +{gold} gold!")
        return gold
    finally:
        # ALWAYS runs — cleanup/logging
        print("Quest reward processing finished.")

# Don't silence errors — at minimum, log them!
import logging

def load_config(path):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        logging.warning(f"Config not found: {path}")
        return {}  # Return empty defaults
    except json.JSONDecodeError as e:
        logging.error(f"Corrupt config {path}: {e}")
        return {}  # Return empty, but we LOGGED it!
    # DON'T add bare except here — let unexpected
    # errors propagate so you discover them!`,
    breakdown: `• except: pass — The WORST pattern in Python. Catches everything (including Ctrl+C), does nothing. Bugs become invisible. Never write this in production code.

• except ValueError: — Specific catching. Only handles the ONE error type you expect. Unexpected errors still propagate and crash loudly — which is GOOD because you'll find and fix them.

• LBYL: if "shield" in inventory — Checks BEFORE acting. Works, but has a race condition: the key could be deleted between the check and the access. Also verbose.

• EAFP: try/except KeyError — Just DOES it and catches failure. No race condition, more concise, more Pythonic. Python's dict, file, and network operations are all designed for this style.

• else: block after except — Code here runs ONLY on success. Critical distinction: if print() inside else raises an exception, it WON'T be caught by the except ValueError above. This prevents accidentally catching unrelated errors.

• finally: print("...finished.") — Runs whether try succeeded, except caught an error, or even if a return statement was hit. Guaranteed execution. Use for cleanup, logging, or state restoration.

• logging.warning / logging.error — Instead of silently swallowing errors, LOG them. This way errors are recorded for debugging but don't crash the program. The logging module can write to files, send alerts, etc.

• No bare except at the end — Let unexpected errors propagate! If a PermissionError occurs and you didn't anticipate it, you WANT to know. Catching it silently just hides the bug.`,
    summary: `Never use bare except: or except: pass — always catch specific exception types. Prefer EAFP (try/except) over LBYL (if/else checking) as it's more Pythonic and avoids race conditions. Use else for success-only code that shouldn't be caught by the except block, and finally for guaranteed cleanup. Always log errors rather than silencing them, and let unexpected exceptions propagate so bugs surface early rather than hiding in production.`
  }
];
