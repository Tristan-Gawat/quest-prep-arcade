// Pre-written full lessons for Python Module: Decorators & Generators
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonDecoratorsLessons = [
  {
    title: "What is Decorators & Generators?",
    definition: "Decorators are functions that wrap other functions to add behavior without modifying the original code (using @syntax), while generators are special functions that use 'yield' to lazily produce values one at a time instead of computing everything upfront — both leverage Python's treatment of functions as first-class objects.",
    explanation: `Imagine you have 20 functions in your game engine and you want to log every time ANY of them is called. Without decorators, you'd add print statements to all 20 functions. With decorators, you write the logging logic ONCE and apply it with a single @log line above each function. Decorators wrap functions to add superpowers — timing, caching, access control, retry logic — without touching the original code.

A DECORATOR is a function that takes another function as input, wraps it with additional behavior, and returns the enhanced version. The @syntax is just shorthand: writing @timer above def attack() is the same as attack = timer(attack). The original function still works normally, but now it has extra capabilities bolted on.

GENERATORS solve a different problem: what if you need a sequence of values but can't afford to generate them all at once? Imagine spawning enemies in a game — you don't need 10,000 enemies in memory simultaneously. A generator YIELDS one enemy at a time, pausing between each. It's like a vending machine: it holds all the items but gives you one only when you press the button.

CLOSURES are the secret sauce behind both. A closure is a function that "remembers" variables from its enclosing scope even after that scope has finished executing. Decorators use closures to capture the original function and wrap it. Generators use closures internally to remember their state between yields.

Together, decorators and generators represent Python's "advanced function" toolkit. Decorators modify behavior; generators control flow. Both rely on functions being first-class objects (you can pass them around, store them in variables, return them from other functions). These concepts separate intermediate Python from beginner Python.`,
    code: `# DECORATORS — functions that wrap other functions
import time

def timer(func):
    """A decorator that measures execution time."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)  # Call the ORIGINAL function
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.3f}s")
        return result
    return wrapper

@timer  # Apply the decorator — same as: battle = timer(battle)
def battle(hero, enemy):
    """Simulate a battle sequence."""
    print(f"{hero} attacks {enemy}!")
    time.sleep(0.1)  # Simulate combat delay
    return f"{hero} wins!"

result = battle("Kael", "Dragon")  # Prints timing automatically!

# GENERATORS — functions that yield values lazily
def enemy_spawner(wave_number):
    """Yields enemies one at a time — doesn't create all at once."""
    enemies = ["Goblin", "Skeleton", "Orc", "Demon", "Dragon"]
    for i in range(wave_number * 3):
        enemy = enemies[i % len(enemies)]
        hp = 50 + (wave_number * 10)
        yield {"name": f"{enemy}_{i}", "hp": hp}  # Pause here!
        # Resumes on next iteration

# Using the generator — one enemy at a time
spawner = enemy_spawner(wave_number=2)
enemy1 = next(spawner)  # Gets first enemy, pauses
enemy2 = next(spawner)  # Gets second enemy, pauses
print(enemy1)  # {'name': 'Goblin_0', 'hp': 70}
print(enemy2)  # {'name': 'Skeleton_1', 'hp': 70}

# CLOSURE — a function that remembers its enclosing scope
def create_power_multiplier(multiplier):
    """Returns a function that 'remembers' the multiplier."""
    def multiply(base_damage):
        return base_damage * multiplier  # Uses outer variable!
    return multiply

double_damage = create_power_multiplier(2)
triple_damage = create_power_multiplier(3)
print(double_damage(50))   # 100
print(triple_damage(50))   # 150

`,
    breakdown: `• def timer(func): — A DECORATOR function. It takes 'func' (the function being decorated) as its argument. The decorator will wrap this function with timing logic.

• def wrapper(*args, **kwargs): — The INNER function that replaces the original. *args and **kwargs accept ANY arguments, so the decorator works on functions with any signature.

• result = func(*args, **kwargs) — Calls the ORIGINAL function inside the wrapper. The decorator adds behavior AROUND this call (before/after) without changing the function itself.

• return wrapper — The decorator returns the wrapper function. Now when you call battle(), you're actually calling wrapper(), which calls the real battle() inside.

• @timer — DECORATOR SYNTAX. Applies the timer decorator to battle. Equivalent to: battle = timer(battle). Clean and readable.

• def enemy_spawner(wave_number): — A GENERATOR function. The presence of 'yield' inside makes it a generator, not a regular function.

• yield {"name": ..., "hp": ...} — YIELD pauses the function and sends a value out. The function's state (local variables, position) is FROZEN until next() is called again.

• spawner = enemy_spawner(2) — Calling a generator function returns a GENERATOR OBJECT, not the result. No code inside runs yet!

• next(spawner) — Runs the generator until the next yield, returns that value, then pauses. Each next() call resumes from where it left off.

• def create_power_multiplier(multiplier): — A CLOSURE factory. The inner function 'multiply' remembers 'multiplier' even after create_power_multiplier finishes.

• double_damage = create_power_multiplier(2) — Creates a closure where multiplier=2 is "baked in." double_damage is now a function that always doubles its input.`,
    summary: `Decorators are wrapper functions applied with @syntax that add behavior (timing, logging, validation) to existing functions without modifying them. Generators use 'yield' to produce values lazily one at a time, pausing between each — perfect for large sequences. Closures are functions that remember their enclosing scope's variables. All three build on Python's first-class functions concept: functions can be passed as arguments, returned from other functions, and stored in variables.`
  },

  {
    title: "How Decorators & Generators works",
    definition: "Decorators work because Python treats functions as first-class objects that can be passed as arguments and returned from other functions; generators work as state machines that freeze execution at each 'yield', remembering their position and local variables until resumed with next().",
    explanation: `FUNCTIONS AS FIRST-CLASS OBJECTS is the foundation. In Python, a function is just an object like any other — you can assign it to a variable, put it in a list, pass it as an argument, or return it from another function. When you write @timer above def battle(), you're passing the battle function AS AN ARGUMENT to timer(). This is impossible in many other languages.

CLOSURE SCOPE RETENTION explains how decorators remember things. When timer(func) runs, it creates wrapper() which references 'func' from its enclosing scope. Even after timer() finishes and its local scope would normally be destroyed, wrapper keeps a reference to func alive. This is a closure — the inner function "closes over" variables from the outer function's scope.

GENERATORS AS STATE MACHINES: when you call a generator function, Python doesn't execute it — it creates a generator object with a suspended state. Each next() call advances the state machine: it runs code until hitting yield, saves ALL local variables and the current instruction position, then returns the yielded value. The next next() call restores everything and continues from exactly where it left off.

YIELD VS RETURN: 'return' terminates a function permanently — its local state is destroyed. 'yield' PAUSES the function — its state is preserved. A function can yield many times, producing a sequence of values across multiple calls. When the function finally returns (or runs out of code), it raises StopIteration to signal the sequence is done.

THE ITERATOR PROTOCOL ties generators into Python's ecosystem. Any object with __iter__() and __next__() methods is an iterator. Generators automatically implement both. This means generators work everywhere iterators do: for loops, list(), sum(), zip(), and more. When you write "for enemy in enemy_spawner(3):", Python calls next() internally until StopIteration.`,
    code: `# Functions as first-class objects — the foundation
def shout(text):
    return text.upper() + "!"

def whisper(text):
    return text.lower() + "..."

# Functions stored in a variable and passed around
announce = shout  # 'announce' now points to the same function
print(announce("victory"))  # VICTORY!

# Passing functions as arguments
def apply_effect(text, effect_func):
    """Takes a function as a parameter!"""
    return effect_func(text)

print(apply_effect("Game Over", shout))    # GAME OVER!
print(apply_effect("Game Over", whisper))  # game over...

# How a decorator ACTUALLY works (step by step)
def power_boost(func):
    """Decorator that doubles the return value."""
    def wrapper(*args, **kwargs):
        original_result = func(*args, **kwargs)
        boosted = original_result * 2  # Closure uses 'func'!
        return boosted
    return wrapper  # Returns the wrapper FUNCTION (not a call!)

# These two are IDENTICAL:
@power_boost
def get_damage():
    return 25

# Same as: get_damage = power_boost(get_damage)
print(get_damage())  # 50 (25 * 2)

# Generator state machine — visualizing the freeze/resume
def quest_stages(quest_name):
    """Each yield is a checkpoint — execution freezes here."""
    print(f"Starting quest: {quest_name}")
    yield "Stage 1: Find the dungeon"     # FREEZE here
    print("Dungeon found! Moving on...")
    yield "Stage 2: Defeat the boss"      # FREEZE here
    print("Boss defeated! Almost done...")
    yield "Stage 3: Claim the treasure"   # FREEZE here
    print("Quest complete!")
    # Function ends — StopIteration raised on next next()

# Step through the state machine
quest = quest_stages("Dragon's Lair")  # Nothing executes yet!
stage1 = next(quest)  # Runs until first yield, freezes
print(stage1)         # "Stage 1: Find the dungeon"
stage2 = next(quest)  # Resumes, runs until second yield
print(stage2)         # "Stage 2: Defeat the boss"
stage3 = next(quest)  # Resumes, runs until third yield
print(stage3)         # "Stage 3: Claim the treasure"
# next(quest) would raise StopIteration — no more yields!

# For loop handles StopIteration automatically
for stage in quest_stages("Secret Quest"):
    print(f"Completed: {stage}")`,
    breakdown: `• announce = shout — Functions are objects! You can assign them to variables. 'announce' now references the same function object as 'shout'. No parentheses = no call, just reference.

• def apply_effect(text, effect_func): — A HIGHER-ORDER FUNCTION: it takes a function as a parameter. This is the pattern decorators build on.

• def power_boost(func): — The decorator receives the original function as 'func'. This is what @power_boost passes to the decorator.

• def wrapper(*args, **kwargs): — The CLOSURE. It captures 'func' from the enclosing scope. Even after power_boost() finishes, wrapper still has access to func.

• return wrapper — Returns the wrapper FUNCTION OBJECT (not wrapper() — no parentheses!). This function object replaces the original in the variable.

• @power_boost / def get_damage(): — After decoration, 'get_damage' variable now points to 'wrapper'. Calling get_damage() actually calls wrapper(), which calls the original get_damage() internally.

• quest = quest_stages("Dragon's Lair") — Creates a GENERATOR OBJECT. The print statement inside hasn't run yet! Execution is suspended at the very beginning.

• next(quest) — Advances the state machine. First call: runs from start until first yield, prints "Starting quest...", then freezes and returns "Stage 1...".

• Second next(quest) — RESUMES from exactly where it froze. Prints "Dungeon found!", continues until second yield, freezes again.

• for stage in quest_stages(...): — The for loop calls next() automatically and catches StopIteration to end the loop. Generators integrate seamlessly with for loops.`,
    summary: `Decorators work because functions are first-class objects (passable, storable, returnable) and closures retain access to enclosing scope variables. The @decorator syntax is shorthand for func = decorator(func). Generators are state machines: calling the function creates a suspended object, next() runs until yield and freezes, subsequent next() calls resume from the freeze point. StopIteration signals completion. For loops handle generators automatically via the iterator protocol.`
  },

  {
    title: "Decorators & Generators syntax & usage",
    definition: "Decorator syntax uses @decorator_name above a function definition, functools.wraps preserves metadata, decorators can accept arguments via nested functions; generator syntax uses the 'yield' keyword, generator expressions use parentheses comprehension syntax, and next()/send() control generator execution.",
    explanation: `The @DECORATOR syntax is clean shorthand. Writing @my_decorator above def my_function(): is equivalent to my_function = my_decorator(my_function). You can stack multiple decorators: they apply bottom-up, so the bottommost decorator wraps first, then the next one wraps that result.

FUNCTOOLS.WRAPS is essential for proper decorators. Without it, the wrapped function loses its original name, docstring, and other metadata — debugging becomes a nightmare because everything shows up as "wrapper." Adding @functools.wraps(func) inside your decorator copies the original function's metadata onto the wrapper.

DECORATORS WITH ARGUMENTS require an extra layer of nesting. A plain decorator takes a function. A decorator WITH arguments (like @retry(attempts=3)) first takes the arguments, then returns a decorator that takes the function. It's three levels: argument handler → decorator → wrapper. This pattern is confusing at first but incredibly powerful.

YIELD creates a generator function. Generator EXPRESSIONS are one-liners using parentheses: (x*2 for x in range(10)) — like list comprehensions but lazy. They produce values on demand without storing everything in memory. Use them for transforming large sequences without memory overhead.

NEXT() advances a generator manually. SEND(value) does the same but also passes a value INTO the generator — the yield expression becomes that value. This enables two-way communication: the generator yields values OUT and receives values IN. StopIteration is raised when the generator is exhausted. These tools give you fine-grained control over lazy evaluation.`,
    code: `import functools
import time

# Proper decorator with @functools.wraps
def log_action(func):
    """Logs when a game action is performed."""
    @functools.wraps(func)  # Preserves original name & docstring!
    def wrapper(*args, **kwargs):
        print(f"[LOG] Executing: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"[LOG] Completed: {func.__name__} → {result}")
        return result
    return wrapper

# DECORATOR WITH ARGUMENTS — extra nesting layer
def retry(attempts=3, delay=0.1):
    """Decorator factory — takes arguments, returns decorator."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt < attempts - 1:
                        print(f"Retry {attempt + 1}/{attempts}...")
                        time.sleep(delay)
                    else:
                        raise e
        return wrapper
    return decorator

@log_action
@retry(attempts=3, delay=0.5)
def connect_to_server(server_name):
    """Attempt to connect to game server."""
    print(f"Connecting to {server_name}...")
    return f"Connected to {server_name}"

# Stacked decorators: retry wraps first, then log wraps that
connect_to_server("Realm-7")

# Generator with yield and next()
def loot_table(rarity_level):
    """Yields loot items based on rarity level."""
    common = ["Potion", "Arrow x10", "Bread"]
    rare = ["Magic Scroll", "Silver Ring", "Enchanted Cape"]
    items = common if rarity_level < 3 else rare
    for item in items:
        yield item  # Yields one item, pauses

# Manual control with next()
drops = loot_table(1)
print(next(drops))  # "Potion"
print(next(drops))  # "Arrow x10"

# Generator EXPRESSION — lazy one-liner
damage_values = (hit * 1.5 for hit in [10, 20, 30, 40, 50])
print(next(damage_values))  # 15.0
print(next(damage_values))  # 30.0

# send() — two-way communication with generator
def adaptive_difficulty():
    """Generator that adjusts based on player performance."""
    difficulty = 1.0
    while True:
        performance = yield difficulty  # Yields OUT, receives IN
        if performance == "too_easy":
            difficulty += 0.5
        elif performance == "too_hard":
            difficulty -= 0.3

game = adaptive_difficulty()
next(game)  # Prime the generator (advance to first yield)
print(game.send("too_easy"))   # 1.5 — difficulty increased
print(game.send("too_easy"))   # 2.0 — increased again
print(game.send("too_hard"))   # 1.7 — decreased`,
    breakdown: `• @functools.wraps(func) — CRITICAL for production decorators. Without it, wrapper.__name__ would be "wrapper" and wrapper.__doc__ would be None. With it, the original function's identity is preserved.

• def retry(attempts=3, delay=0.1): → def decorator(func): → def wrapper — THREE levels for decorator with arguments. retry() returns decorator, decorator(func) returns wrapper. The @retry(attempts=3) syntax calls retry(3) first, then applies the returned decorator.

• @log_action / @retry(attempts=3) — STACKED decorators. Applied bottom-up: retry wraps connect_to_server first, then log_action wraps that result. Execution goes top-down: log runs first, then retry.

• for attempt in range(attempts): / try/except — The retry wrapper catches exceptions and retries the function. If all attempts fail, it re-raises the last exception.

• yield item — Produces one value and PAUSES. The generator remembers which index of 'items' it was on. Next next() call continues the for loop.

• (hit * 1.5 for hit in [...]) — GENERATOR EXPRESSION. Like a list comprehension but with parentheses. Lazy: computes values only when requested with next().

• performance = yield difficulty — TWO-WAY communication. The yield sends 'difficulty' OUT to the caller. The send() value comes IN as 'performance'. This is advanced generator usage.

• next(game) — PRIMES the generator. Advances to the first yield without sending a value. Required before using send(). Always prime generators first.

• game.send("too_easy") — Sends a value INTO the generator. The yield expression evaluates to "too_easy", which is assigned to 'performance'. Then runs until next yield.`,
    summary: `Decorator syntax: @decorator above function definition, functools.wraps preserves metadata, decorators with arguments need three nested levels (factory → decorator → wrapper), stacked decorators apply bottom-up. Generator syntax: yield produces values lazily, generator expressions (x for x in ...) are one-line lazy sequences, next() advances manually, send(value) enables two-way communication. Always use @functools.wraps and always prime generators with next() before send().`
  },

  {
    title: "Practical examples of Decorators & Generators",
    definition: "Real-world decorators include timer profilers, retry mechanisms for unstable connections, and permission checkers for access control; practical generators include infinite enemy spawners for endless waves, lazy file readers for large save files, and paginated data streams.",
    explanation: `A TIMER DECORATOR measures how long functions take — essential for game development where performance matters. Wrap any function with @timer to instantly see if it's taking too long. During development, you add it to suspect functions; in production, you remove it with a single line delete. No modification to the actual function needed.

A RETRY DECORATOR handles transient failures — network hiccups, file lock conflicts, database timeouts. In multiplayer games, server connections can drop momentarily. Instead of writing try/except retry loops everywhere, a @retry(attempts=3) decorator handles it universally. Apply it to any function that might fail temporarily.

A PERMISSION CHECKER decorator enforces access control. In a game with admin commands, you don't want to check "is_admin" inside every admin function. A @requires_role("admin") decorator wraps the function and blocks unauthorized access before the function even runs. Clean separation of concerns: the function does its job, the decorator handles security.

An INFINITE ENEMY SPAWNER generator produces enemies forever without filling memory. Each call to next() creates exactly one enemy. The game loop pulls enemies as needed — during intense waves it pulls faster, during calm periods slower. The generator doesn't care; it just yields the next enemy whenever asked.

A LAZY FILE READER generator processes massive save files line by line without loading the entire file into memory. A 500MB log file? No problem — the generator yields one line at a time, processes it, then moves on. Memory usage stays constant regardless of file size. This pattern is critical for production game servers handling massive datasets.`,
    code: `import functools
import time
import random

# 1. TIMER DECORATOR — profile any function instantly
def timer(func):
    """Measures execution time of any function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"⏱ {func.__name__}: {elapsed:.4f}s")
        return result
    return wrapper

@timer
def generate_world(size):
    """Simulate world generation."""
    grid = [[random.randint(0, 9) for _ in range(size)] 
            for _ in range(size)]
    return grid

# 2. RETRY DECORATOR — handle transient failures
def retry(attempts=3, exceptions=(Exception,)):
    """Retry on failure with configurable attempts."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for i in range(attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_error = e
                    print(f"  Attempt {i+1} failed: {e}")
            raise last_error
        return wrapper
    return decorator

@retry(attempts=3, exceptions=(ConnectionError,))
def fetch_leaderboard(server):
    """Simulates an unstable connection."""
    if random.random() < 0.6:
        raise ConnectionError("Server timeout")
    return [{"player": "Kael", "score": 9500}]

# 3. PERMISSION CHECKER — access control decorator
def requires_role(role):
    """Blocks function if player lacks the required role."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(player, *args, **kwargs):
            if role not in player.get("roles", []):
                print(f"Access denied: {role} role required!")
                return None
            return func(player, *args, **kwargs)
        return wrapper
    return decorator

@requires_role("admin")
def ban_player(admin, target_name):
    """Only admins can ban players."""
    return f"{target_name} has been banned by {admin['name']}"

admin_user = {"name": "Kira", "roles": ["admin", "player"]}
normal_user = {"name": "Bob", "roles": ["player"]}
print(ban_player(admin_user, "Cheater42"))  # Works!
print(ban_player(normal_user, "Someone"))   # Access denied!

# 4. INFINITE ENEMY SPAWNER — yields forever
def infinite_spawner(base_level=1):
    """Generates enemies infinitely — one at a time."""
    wave = 1
    enemy_types = ["Skeleton", "Zombie", "Wraith", "Demon"]
    while True:  # Infinite loop — but only runs on next()!
        for enemy_type in enemy_types:
            level = base_level + wave
            hp = level * 30 + random.randint(-10, 10)
            yield {"type": enemy_type, "level": level, "hp": hp}
        wave += 1  # Each full cycle increases wave

spawner = infinite_spawner(base_level=3)
for _ in range(3):  # Pull exactly 3 enemies
    print(next(spawner))

# 5. LAZY FILE READER — constant memory usage
def read_save_chunks(filepath, chunk_size=1024):
    """Reads a file in chunks without loading it all."""
    try:
        with open(filepath, 'r') as f:
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                yield chunk
    except FileNotFoundError:
        yield "ERROR: Save file not found"`,
    breakdown: `• time.perf_counter() — More precise than time.time() for measuring short durations. Called before and after the function to get elapsed time.

• @timer / def generate_world — Adding @timer instantly profiles this function. Remove the one line to stop profiling. Zero changes to generate_world itself.

• def retry(attempts=3, exceptions=(Exception,)): — Decorator WITH ARGUMENTS. The tuple 'exceptions' specifies which errors trigger retries. Only ConnectionError in our example — other errors propagate immediately.

• for i in range(attempts): / try/except — The retry loop. Each attempt calls the original function. On success, returns immediately. On specified exception, logs and continues. After all attempts exhausted, re-raises the last error.

• def requires_role(role): — Parameterized decorator for access control. The 'role' parameter is captured by closure and checked against the player's roles list every call.

• if role not in player.get("roles", []): — Check happens BEFORE the actual function runs. Unauthorized calls are blocked at the decorator level — the function never executes.

• while True: yield {...} — INFINITE GENERATOR. The while True loop runs forever, but only advances on next() calls. Memory stays constant — only one enemy exists at a time.

• wave += 1 — State persists between yields! The generator remembers which wave it's on, even across thousands of next() calls. This is the state machine nature of generators.

• def read_save_chunks(filepath, chunk_size=1024): — Reads fixed-size chunks. A 1GB file uses only 1KB of memory at any time. The generator yields chunks until the file is exhausted.

• if not chunk: break — Empty string means end of file. The generator function returns (no more yields), which raises StopIteration for the caller.`,
    summary: `Practical decorators solve cross-cutting concerns: @timer profiles performance, @retry handles transient failures with configurable attempts, @requires_role enforces access control — all without modifying the original functions. Practical generators handle sequences efficiently: infinite spawners produce endless enemies with constant memory, lazy file readers process huge files chunk by chunk. The key insight: decorators add behavior AROUND functions, generators produce values ON DEMAND.`
  },

  {
    title: "Decorators & Generators best practices",
    definition: "Professional decorator usage requires always applying @functools.wraps, keeping decorator logic simple and focused, avoiding deep nesting; generator best practices include using them for large datasets and streams, not overusing decorators when plain functions suffice, and choosing generators over lists when you only need to iterate once.",
    explanation: `ALWAYS USE @FUNCTOOLS.WRAPS in every decorator you write. Without it, the decorated function loses its __name__, __doc__, and other attributes. Debugging becomes impossible when every function in your stack trace is called "wrapper." This one-line addition is non-negotiable in professional code — it preserves the original function's identity through the decoration.

KEEP DECORATORS SIMPLE AND FOCUSED. A decorator should do ONE thing: time it, log it, retry it, cache it, or check permissions. If your decorator is 50 lines long with complex branching logic, it's too complex. Break it into smaller decorators or move logic into helper functions. Remember: decorators add invisible complexity — developers reading the decorated function might not realize what extra behavior is happening.

USE GENERATORS FOR LARGE DATASETS. If you're processing a million-row database result, reading a massive log file, or generating an infinite sequence — generators are the tool. They keep memory constant regardless of dataset size. The rule: if you only need to iterate ONCE through the data, use a generator. If you need random access or multiple passes, use a list.

DON'T OVERUSE DECORATORS. Not everything needs a decorator. If you only apply some logic to one function, just put it in the function. Decorators shine when the same cross-cutting concern applies to MANY functions. Using a decorator for one function adds complexity without benefit. Ask: "Will I apply this to 3+ functions?" If not, skip the decorator.

GENERATORS ARE NOT REUSABLE — once exhausted, they're done. You can't "reset" a generator or iterate it twice. If you need multiple passes, either create a new generator each time or convert to a list. Also, generators can't be indexed (no generator[5]) — they're sequential access only. Choose the right tool: generators for single-pass streaming, lists for random access and reuse.`,
    code: `import functools
import time

# BEST PRACTICE 1: Always use @functools.wraps
# BAD — loses function identity
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

# GOOD — preserves function identity
def good_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@bad_decorator
def heal():
    """Restore player HP."""
    pass

@good_decorator
def attack():
    """Deal damage to enemy."""
    pass

print(heal.__name__)    # "wrapper" — BROKEN identity!
print(attack.__name__)  # "attack" — preserved correctly!

# BEST PRACTICE 2: Keep decorators focused (one job)
def cache_result(func):
    """Simple memoization — one job: caching."""
    @functools.wraps(func)
    def wrapper(*args):
        if args not in wrapper._cache:
            wrapper._cache[args] = func(*args)
        return wrapper._cache[args]
    wrapper._cache = {}
    return wrapper

@cache_result
def expensive_pathfinding(start, end):
    """Simulate expensive computation — cached after first call."""
    time.sleep(0.01)  # Simulates heavy computation
    return f"Path: {start} → {end}"

# BEST PRACTICE 3: Generators for large data, lists for reuse
# GOOD — generator for single-pass processing
def parse_combat_log(log_lines):
    """Yields parsed entries — memory efficient for huge logs."""
    for line in log_lines:
        if "DAMAGE" in line:
            parts = line.split("|")
            yield {"source": parts[0], "amount": int(parts[1])}

# BAD — don't use generator when you need multiple passes
def get_top_scores(scores_gen):
    """This needs the data TWICE — generator won't work!"""
    scores_list = list(scores_gen)  # Convert first!
    average = sum(scores_list) / len(scores_list)
    return [s for s in scores_list if s > average]

# BEST PRACTICE 4: Don't overuse decorators
# BAD — decorator for one-time logic (overkill)
def add_exclamation(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) + "!"
    return wrapper

# GOOD — just put it in the function if used once
def get_victory_message(player_name):
    """Simple function — no decorator needed."""
    return f"{player_name} wins!"

# BEST PRACTICE 5: Generators exhaust — plan for it
spawner = (f"Enemy_{i}" for i in range(3))
first_pass = list(spawner)   # ['Enemy_0', 'Enemy_1', 'Enemy_2']
second_pass = list(spawner)  # [] — EMPTY! Generator exhausted!

# Solution: create a new generator each time, or use a function
def make_spawner():
    """Factory function — creates fresh generator each time."""
    return (f"Enemy_{i}" for i in range(3))

pass_a = list(make_spawner())  # Works!
pass_b = list(make_spawner())  # Also works! Fresh generator.`,
    breakdown: `• print(heal.__name__) → "wrapper" — Without @functools.wraps, the decorated function LOSES its identity. Debugging tools, documentation generators, and inspect module all see "wrapper" instead of "heal".

• print(attack.__name__) → "attack" — With @functools.wraps(func), the wrapper inherits __name__, __doc__, __module__ from the original. Always do this.

• wrapper._cache = {} — Stores cached results ON the wrapper function itself. Functions are objects — you can attach attributes to them! Each decorated function gets its own cache.

• if args not in wrapper._cache — Check cache before computing. If we've seen these arguments before, return the stored result instantly. Simple but effective memoization.

• def parse_combat_log(log_lines): yield — Generator for STREAMING data. Processes one line at a time. A 10GB log file? Still uses minimal memory because only one line is in memory at once.

• scores_list = list(scores_gen) — When you need multiple passes, CONVERT to list first. Generators are one-shot — you can't iterate them twice. This is a common gotcha.

• The add_exclamation decorator — OVERKILL for simple one-off logic. Adding "!" could just be in the function itself. Decorators add cognitive overhead — use them only when the pattern repeats across many functions.

• second_pass = list(spawner) → [] — EXHAUSTED generator returns nothing on second iteration. This surprises beginners. Once a generator yields all values, it's done forever.

• def make_spawner(): return (...) — A FACTORY FUNCTION that creates fresh generators. Call it each time you need a new iteration. This solves the exhaustion problem elegantly.`,
    summary: `Best practices: always use @functools.wraps (preserves function identity), keep decorators focused on one concern, use decorators only when applying the same logic to multiple functions (3+ rule). For generators: use them for large datasets and single-pass streaming, remember they exhaust after one iteration (use factory functions for reuse), and convert to list when you need random access or multiple passes. The balance: decorators for cross-cutting concerns across many functions, generators for memory-efficient sequential processing.`
  }
];
