// Pre-written full lessons for Python Module: Dictionaries & Sets
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonDictsSetsLessons = [
  {
    title: "What is Dictionaries & Sets?",
    definition: "Dictionaries are collections of key-value pairs that let you look up values by a unique key, while sets are unordered collections of unique values with no duplicates allowed.",
    explanation: `Imagine you're building an RPG character screen. You need to look up stats by name — "health" maps to 100, "attack" maps to 45, "defense" maps to 30. You don't want item #0, #1, #2 — you want to ask for data BY NAME. That's exactly what dictionaries do.


A dictionary (dict) stores data as KEY: VALUE pairs inside curly braces {}. Each key must be unique — no two entries can have the same key. You access values by their key, not by position. This makes dictionaries perfect for any "lookup table" scenario: player stats, game settings, inventory counts, or mapping IDs to names.

Sets are the simpler cousin of dictionaries — they store only KEYS with no values. A set automatically removes duplicates: if you add "fire" twice, it only keeps one copy. Sets excel at membership testing ("is this item in my collection?"), removing duplicates from lists, and mathematical operations like finding common elements between collections.

Since Python 3.7, dictionaries maintain INSERTION ORDER — items come out in the same order you put them in. However, the primary purpose of dicts is fast KEY-BASED lookup, not ordered storage. Sets are truly unordered — you cannot rely on any particular arrangement.

Both dicts and sets use hash tables internally, which gives them O(1) average-time lookup. Whether you have 10 items or 10 million, checking if a key exists takes roughly the same amount of time. This makes them dramatically faster than lists for membership testing.`,
    code: `# Creating a dictionary — key: value pairs
player_stats = {
    "name": "Shadow Knight",
    "health": 100,
    "attack": 45,
    "defense": 30,
    "level": 12
}

# Access values by key
print(player_stats["name"])       # Shadow Knight
print(player_stats["health"])     # 100

# Creating a set — unique values only
unlocked_skills = {"fireball", "shield bash", "heal", "fireball"}
print(unlocked_skills)            # {'fireball', 'shield bash', 'heal'}
# Notice: duplicate "fireball" was automatically removed!

# Sets from a list (removes duplicates)
loot_drops = ["gold", "potion", "gold", "gem", "potion", "gold"]
unique_loot = set(loot_drops)
print(unique_loot)                # {'gold', 'potion', 'gem'}

# Checking membership (both are O(1) — instant!)
print("health" in player_stats)   # True (checks KEYS)
print("fireball" in unlocked_skills)  # True

# Dict length and set length
print(len(player_stats))          # 5 (number of key-value pairs)
print(len(unlocked_skills))       # 3 (unique elements only)

# Empty dict vs empty set (careful!)
empty_dict = {}                   # This is an empty DICT
empty_set = set()                 # This is an empty SET
# {} always means dict, never set!`,
    breakdown: `Let's break down each concept:

• player_stats = {"name": "Shadow Knight", ...} — Creates a dictionary with string keys and mixed-type values. Each entry has a KEY (before the colon) and a VALUE (after the colon), separated by commas.

• player_stats["name"] returns "Shadow Knight" — Square bracket access with the KEY (not an index number). This is the fundamental dict operation: give a key, get the value.

• unlocked_skills = {"fireball", "shield bash", "heal", "fireball"} — Creates a SET. Looks like a dict but has no colons (no key:value, just values). The duplicate "fireball" is silently discarded.

• set(loot_drops) — Converts a list to a set, automatically removing all duplicates. This is the easiest way to deduplicate a list in Python.

• "health" in player_stats — The 'in' operator on dicts checks KEYS, not values. Checking if a key exists is O(1) — instant regardless of dict size.

• "fireball" in unlocked_skills — Set membership test, also O(1). Much faster than checking "fireball" in some_list which is O(n).

• len(player_stats) returns 5 — Counts the number of key-value pairs. For sets, len() counts unique elements.

• empty_dict = {} vs empty_set = set() — Important gotcha! Curly braces {} without key:value pairs create an empty DICT, not a set. You must use set() for an empty set.`,
    summary: `Dictionaries store key-value pairs in curly braces for instant lookup by key name. Sets store unique values with automatic duplicate removal. Both use hash tables for O(1) membership testing, making them far faster than lists for "is this in my collection?" checks. Remember: {} creates an empty dict, not a set — use set() for empty sets.`
  },


  {
    title: "How Dictionaries & Sets works",
    definition: "Dictionaries and sets are built on hash tables — a data structure that converts keys into memory addresses using a hash function, enabling O(1) average-time lookups regardless of collection size.",
    explanation: `Under the hood, both dicts and sets use a HASH TABLE. When you store a key (like "health"), Python runs it through a hash function that converts it into a number — this number determines WHERE in memory the value gets stored. Later, when you look up "health", Python hashes it again, gets the same number, and jumps directly to that memory slot.

This is why dict/set lookups are O(1) — constant time. Unlike lists where finding an item requires scanning through every element (O(n)), a hash table computes the location mathematically. Whether you have 5 entries or 5 million, the lookup takes the same time.

For a key to be hashable, it must be IMMUTABLE. Strings, numbers, tuples, and booleans are hashable. Lists, dicts, and sets are NOT hashable because they can change — if a key changed after being stored, its hash would point to the wrong location, corrupting the table. This is why dict keys must be immutable types.

When two different keys produce the same hash (called a "collision"), Python uses a probing strategy to find the next available slot. Modern Python uses a compact dict implementation that stores keys and values in separate arrays, reducing memory usage by 20-25% compared to older versions.

Set operations leverage hash tables for mathematical set theory. Union finds all unique elements across both sets. Intersection finds elements present in BOTH sets. Difference finds elements in one set but not the other. These operations are highly optimized internally and can process millions of elements efficiently.`,
    code: `# Hash tables enable O(1) lookup
inventory = {"sword": 1, "potion": 5, "arrow": 50}

# This is O(1) — instant, regardless of dict size
has_sword = "sword" in inventory    # True
has_axe = "axe" in inventory        # False

# Compare with list lookup — O(n), must scan all items
item_list = ["sword", "potion", "arrow"]
# "arrow" in item_list  # O(n) — must check each element!

# Only IMMUTABLE types can be keys
valid_keys = {
    "string_key": "works",      # str — hashable
    42: "works",                 # int — hashable
    (1, 2): "works",            # tuple — hashable
    True: "works",              # bool — hashable
}
# INVALID: {[1,2]: "fails"}    # list — NOT hashable!
# INVALID: {{}: "fails"}       # dict — NOT hashable!

# hash() shows the hash value of an object
print(hash("sword"))             # Some large integer
print(hash(42))                  # 42 (small ints hash to themselves)
print(hash((10, 20)))            # Some integer

# Set operations — mathematical set theory
fire_skills = {"fireball", "flame strike", "ignite", "inferno"}
water_skills = {"tidal wave", "heal", "ice shard", "flame strike"}

# Union — all unique elements from both sets
all_skills = fire_skills | water_skills
print(f"All skills: {len(all_skills)}")   # 7 unique skills

# Intersection — elements in BOTH sets
shared = fire_skills & water_skills
print(f"Shared: {shared}")                # {'flame strike'}

# Difference — in fire but NOT in water
fire_only = fire_skills - water_skills
print(f"Fire only: {fire_only}")          # {'fireball', 'ignite', 'inferno'}

# Symmetric difference — in one OR the other, not both
exclusive = fire_skills ^ water_skills
print(f"Exclusive: {len(exclusive)}")     # 6 elements`,
    breakdown: `• "sword" in inventory is O(1) — Python hashes "sword", computes a memory slot, and checks if something is there. No scanning, no iteration — direct jump to the answer.

• "arrow" in item_list is O(n) — Python must check index 0, then 1, then 2... until it finds "arrow" or reaches the end. For large collections, this is dramatically slower.

• (1, 2) as a dict key — Tuples are immutable, so they're hashable and valid as keys. This is one major reason tuples exist alongside lists.

• [1, 2] cannot be a key — Lists are mutable. If you could use a list as a key, then modifying the list would break the hash table's ability to find the entry again.

• hash("sword") returns a large integer — The hash function deterministically converts any hashable value to an integer. Same input always gives same output. Python uses this number to compute the storage slot.

• fire_skills | water_skills — Set UNION operator. Combines both sets, keeping only unique elements. The | operator is syntactic sugar for fire_skills.union(water_skills).

• fire_skills & water_skills — Set INTERSECTION. Returns only elements found in BOTH sets. Think of it as "what do these have in common?"

• fire_skills - water_skills — Set DIFFERENCE. Elements in the left set that are NOT in the right set. Order matters: A - B ≠ B - A.

• fire_skills ^ water_skills — SYMMETRIC DIFFERENCE. Elements in one set OR the other, but NOT both. It's like union minus intersection.`,
    summary: `Dictionaries and sets use hash tables for O(1) lookups by converting keys to memory addresses via hash functions. Only immutable (hashable) types can be dict keys or set members — strings, numbers, tuples, and booleans work; lists and dicts do not. Set operations (union |, intersection &, difference -, symmetric difference ^) enable powerful mathematical comparisons between collections.`
  },


  {
    title: "Dictionaries & Sets syntax & usage",
    definition: "Dictionaries provide access methods like [] notation, .get() with defaults, and iteration via .keys(), .values(), and .items(). Dict comprehensions create dictionaries inline, and set operations use operators (&, |, -) for combining collections.",
    explanation: `Python dicts have two ways to access values: bracket notation dict["key"] and the .get() method. Bracket access raises a KeyError if the key doesn't exist — your program crashes. The .get() method returns None (or a default you specify) when the key is missing. In production code, .get() is almost always safer.

Three methods expose a dictionary's contents for iteration: .keys() returns all keys, .values() returns all values, and .items() returns (key, value) tuples. The most common pattern is iterating with .items() to get both pieces simultaneously in a for loop.

Dict comprehensions work like list comprehensions but produce dictionaries. The syntax is {key_expr: value_expr for item in iterable if condition}. They're perfect for transforming data, filtering entries, or building lookup tables from lists.

Sets support both operator syntax and method syntax for operations. Operators (|, &, -, ^) are concise and readable. Methods (.union(), .intersection(), .difference(), .symmetric_difference()) accept any iterable, not just sets. For modifying a set in place, use .add() to add one element, .discard() to safely remove (no error if missing), and .update() to add multiple elements.

You can also check set relationships: A.issubset(B) checks if all elements of A are in B, A.issuperset(B) checks the reverse, and A.isdisjoint(B) checks if they share NO elements. These are invaluable for permission systems, tag filtering, and requirement checking.`,
    code: `# Accessing dict values safely
player = {"name": "RuneMage", "hp": 85, "mp": 120, "level": 7}

# Bracket access — raises KeyError if missing
print(player["name"])             # RuneMage
# print(player["armor"])          # KeyError: 'armor'

# .get() — returns default if missing (safe!)
armor = player.get("armor", "None equipped")
print(armor)                      # None equipped

mp = player.get("mp", 0)         # Key exists, returns actual value
print(mp)                         # 120

# Iterating with .keys(), .values(), .items()
for key in player.keys():
    print(f"  Key: {key}")

for value in player.values():
    print(f"  Value: {value}")

for key, value in player.items():
    print(f"  {key}: {value}")

# Modifying dictionaries
player["armor"] = "Dragon Scale"  # Add new key
player["hp"] = 90                 # Update existing key
del player["mp"]                  # Delete a key
print(player)

# Dict comprehension
enemies = ["Goblin", "Troll", "Dragon", "Slime"]
enemy_hp = {name: len(name) * 20 for name in enemies}
print(enemy_hp)
# {'Goblin': 120, 'Troll': 100, 'Dragon': 120, 'Slime': 100}

# Set methods
unlocked = {"fire", "ice", "heal"}
unlocked.add("lightning")         # Add one element
unlocked.discard("thunder")       # Safe remove (no error if missing)
unlocked.update(["barrier", "haste"])  # Add multiple
print(unlocked)

# Set relationship checks
required_skills = {"fire", "heal"}
print(required_skills.issubset(unlocked))   # True — player has both
print(unlocked.issuperset(required_skills)) # True — same check, reversed

# Filtering with set operations
owned_items = {"sword", "shield", "bow", "staff", "helm"}
warrior_gear = {"sword", "shield", "helm", "armor"}
equipped = owned_items & warrior_gear       # Items you own AND can use
missing = warrior_gear - owned_items        # Items you need but don't have
print(f"Can equip: {equipped}")     # {'sword', 'shield', 'helm'}
print(f"Still need: {missing}")     # {'armor'}`,
    breakdown: `• player["name"] vs player.get("armor", "None equipped") — Bracket access is direct but crashes on missing keys. .get() is safe — it returns the default value (second argument) if the key doesn't exist. Always use .get() when a key MIGHT be missing.

• for key, value in player.items() — The most common dict iteration pattern. .items() returns (key, value) tuples that unpack naturally in a for loop. You get both pieces without extra lookups.

• player["armor"] = "Dragon Scale" — Adding a NEW key-value pair is the same syntax as updating an existing one. If the key exists, the value is overwritten. If it doesn't exist, a new entry is created.

• del player["mp"] — Removes a key-value pair entirely. Raises KeyError if the key doesn't exist. Use player.pop("mp", None) for safe deletion with a default.

• {name: len(name) * 20 for name in enemies} — Dict COMPREHENSION. Creates a dictionary where each enemy name maps to a calculated HP value. The pattern is {key_expr: value_expr for item in iterable}.

• unlocked.add("lightning") — Adds a single element to a set. If it already exists, nothing happens (no error, no duplicate). Sets guarantee uniqueness automatically.

• unlocked.discard("thunder") — Removes an element if present, does NOTHING if absent. Safer than .remove() which raises KeyError on missing elements.

• required_skills.issubset(unlocked) — Checks if ALL elements of required_skills exist in unlocked. Perfect for "does the player meet the requirements?" checks.

• owned_items & warrior_gear — Intersection finds items you own that are ALSO warrior-usable. The - operator then finds what's in warrior_gear but NOT in owned_items.`,
    summary: `Use .get(key, default) instead of brackets for safe access that won't crash on missing keys. Iterate with .items() for simultaneous key-value access. Dict comprehensions {k: v for item in iterable} create dictionaries inline. Sets use .add(), .discard(), and .update() for modification, plus subset/superset checks for requirement validation. Combine set operators (& | -) for powerful filtering logic.`
  },


  {
    title: "Practical examples of Dictionaries & Sets",
    definition: "Dictionaries and sets power real systems like player stat trackers, inventory management with quantities, tag-based filtering, and word frequency counters. Their O(1) lookup makes them ideal for any scenario requiring fast data retrieval.",
    explanation: `Let's build real systems that showcase dictionaries and sets in action. These patterns appear in game development, data processing, web applications, and virtually every professional Python project.

A player stats system uses a dictionary to map stat names to values. This lets you access any stat by name, update values after leveling up, and easily display all stats in a loop. Nested dicts can model complex character sheets with categories like "combat," "magic," and "social."

An inventory with quantities goes beyond a simple list — it tracks HOW MANY of each item you have. A dict mapping item names to counts handles this perfectly. When you pick up a potion, increment the count. When you use one, decrement it. If the count hits zero, remove the key.

Tag filtering with sets solves the common problem of "show me items that match certain criteria." If each item has a set of tags, you can use intersection to find items matching ALL required tags, or union to find items matching ANY tag. This is how game shops, recipe systems, and search filters work.

A word frequency counter demonstrates dict accumulation — the pattern of building up counts by iterating through data. This same pattern powers analytics dashboards, log analysis, and any "how often does X appear?" question.`,
    code: `# === EXAMPLE 1: Player Stats System ===
player = {
    "name": "Vanguard",
    "class": "Paladin",
    "stats": {"strength": 18, "wisdom": 14, "dexterity": 10},
    "level": 5,
    "xp": 2400
}

# Level up — modify nested stats
def level_up(char):
    char["level"] += 1
    char["xp"] = 0
    for stat in char["stats"]:
        char["stats"][stat] += 2  # +2 to all stats
    print(f"{char['name']} reached level {char['level']}!")
    print(f"Stats: {char['stats']}")

level_up(player)
# Vanguard reached level 6!
# Stats: {'strength': 20, 'wisdom': 16, 'dexterity': 12}

# === EXAMPLE 2: Inventory with Quantities ===
inventory = {"health potion": 3, "mana potion": 1, "gold coin": 47}

def pickup_item(inv, item, qty=1):
    inv[item] = inv.get(item, 0) + qty
    print(f"+ Picked up {qty}x {item} (total: {inv[item]})")

def use_item(inv, item):
    if inv.get(item, 0) > 0:
        inv[item] -= 1
        if inv[item] == 0:
            del inv[item]
        print(f"Used {item}!")
        return True
    print(f"No {item} available!")
    return False

pickup_item(inventory, "health potion", 2)  # total: 5
use_item(inventory, "mana potion")           # Used! (now 0, removed)
use_item(inventory, "mana potion")           # No mana potion available!

# === EXAMPLE 3: Tag-Based Filtering ===
weapons = {
    "Excalibur": {"melee", "holy", "legendary", "sword"},
    "Fireball Staff": {"magic", "fire", "ranged", "staff"},
    "Shadow Dagger": {"melee", "dark", "stealth", "dagger"},
    "Holy Bow": {"ranged", "holy", "bow"},
}

# Find weapons matching ALL required tags
required = {"melee", "holy"}
matches = {name for name, tags in weapons.items() if required.issubset(tags)}
print(f"Melee + Holy weapons: {matches}")   # {'Excalibur'}

# Find weapons matching ANY of the desired tags
desired = {"fire", "dark"}
any_match = {name for name, tags in weapons.items() if tags & desired}
print(f"Fire or Dark weapons: {any_match}")  # {'Fireball Staff', 'Shadow Dagger'}

# === EXAMPLE 4: Word Frequency Counter ===
battle_log = "hit miss hit hit critical miss hit critical critical"
words = battle_log.split()

frequency = {}
for word in words:
    frequency[word] = frequency.get(word, 0) + 1

# Sort by frequency (descending)
sorted_freq = sorted(frequency.items(), key=lambda x: x[1], reverse=True)
print("Battle results:")
for action, count in sorted_freq:
    bar = "█" * count
    print(f"  {action:10} {bar} ({count})")`,
    breakdown: `• char["stats"][stat] += 2 — Nested dict access. First accesses the "stats" sub-dictionary, then iterates through its keys to increment each value. Demonstrates that dict values can be other dicts.

• inv.get(item, 0) + qty — The .get(item, 0) pattern is essential for counters. If the item doesn't exist yet, it returns 0 (the default), so adding qty starts the count correctly without a KeyError.

• del inv[item] when count reaches 0 — Cleanup: removes the key entirely when quantity drops to zero. This keeps the inventory clean rather than having "health potion": 0 entries cluttering it.

• {"melee", "holy", "legendary", "sword"} — Each weapon has a SET of tags. Sets are perfect for tags because tags are unique (no duplicates) and you need fast membership testing.

• required.issubset(tags) — Checks if ALL required tags exist in the weapon's tag set. This is a "match ALL criteria" filter — the weapon must have every required tag.

• tags & desired — Set INTERSECTION. If the result is non-empty (truthy), the weapon has at least one desired tag. This is a "match ANY criteria" filter.

• {name for name, tags in weapons.items() if ...} — Set COMPREHENSION (like list comprehension but with curly braces). Builds a set of weapon names that pass the filter condition.

• frequency.get(word, 0) + 1 — The classic counting pattern: get current count (or 0 if first occurrence), add 1, store back. This builds a complete frequency distribution in a single pass.

• sorted(frequency.items(), key=lambda x: x[1], reverse=True) — Sorts dict items by VALUE (x[1]) in descending order. The lambda tells sorted() to compare by the second element of each (key, value) tuple.`,
    summary: `Player stats use nested dicts for hierarchical data with easy updates via loops. Inventories use .get(key, 0) for safe counting and del for cleanup. Tag filtering leverages set operations: issubset() for "match all" and intersection (&) for "match any." Word counting demonstrates the .get(key, 0) + 1 accumulation pattern that forms the basis of frequency analysis.`
  },


  {
    title: "Dictionaries & Sets best practices",
    definition: "Best practices include using .get() with defaults instead of raw bracket access, leveraging dict comprehensions for transformations, choosing sets for fast membership testing, and avoiding mutable default arguments in function signatures.",
    explanation: `The most impactful dict best practice is using .get(key, default) instead of bracket access. In production code, missing keys are inevitable — API responses might lack fields, user data might be incomplete, config files might have optional values. Every bare dict["key"] is a potential KeyError crash waiting to happen.

Dict comprehensions are the Pythonic way to transform, filter, or build dictionaries. They replace multi-line loop-and-assign patterns with a single readable expression. Use them for mapping transformations, conditional filtering, and building lookup tables. But like list comprehensions, keep them simple — if the logic gets complex, use a regular loop.

Sets should be your go-to for membership testing. If you're checking "is this value in my collection?" more than once, convert your list to a set first. The lookup goes from O(n) to O(1). For large collections (1000+ items), this difference is enormous — potentially thousands of times faster.

A subtle but dangerous Python trap: never use a mutable object (like a dict or list) as a function's DEFAULT argument. Python evaluates defaults once at function definition time, not each call. So every call shares the SAME dict/list object — modifications in one call persist to the next. Always use None as the default and create a new dict/list inside the function.

Finally, consider defaultdict from the collections module for counting and grouping patterns. It eliminates the need for "check if key exists, if not initialize" logic by automatically creating default values for missing keys.`,
    code: `# 1. Always use .get() with sensible defaults
config = {"difficulty": "hard", "volume": 80}

# BAD — crashes if key is missing
# music_vol = config["music_volume"]    # KeyError!

# GOOD — provides default for missing keys
music_vol = config.get("music_volume", 50)
print(f"Music: {music_vol}")              # Music: 50

# 2. Dict comprehensions for transformations
raw_scores = {"Alice": "95", "Bob": "87", "Carol": "92"}

# BAD — verbose loop
# parsed = {}
# for name, score in raw_scores.items():
#     parsed[name] = int(score)

# GOOD — dict comprehension
parsed = {name: int(score) for name, score in raw_scores.items()}
print(parsed)    # {'Alice': 95, 'Bob': 87, 'Carol': 92}

# Filter with comprehension
high_scores = {k: v for k, v in parsed.items() if v >= 90}
print(high_scores)   # {'Alice': 95, 'Carol': 92}

# 3. Sets for membership testing (not lists!)
banned_words = {"cheat", "hack", "exploit", "glitch"}  # O(1) lookup

# BAD — list requires scanning every element
# banned_list = ["cheat", "hack", "exploit", "glitch"]  # O(n) lookup

message = "How do I hack the game?"
words = message.lower().split()
flagged = [w for w in words if w in banned_words]  # O(1) per check!
print(f"Flagged: {flagged}")     # Flagged: ['hack']

# 4. NEVER use mutable default arguments!
# BAD — the dict is shared between ALL calls!
# def add_score(name, score, board={}):
#     board[name] = score
#     return board

# GOOD — use None and create inside function
def add_score(name, score, board=None):
    if board is None:
        board = {}
    board[name] = score
    return board

result1 = add_score("Alice", 100)
result2 = add_score("Bob", 90)
print(result1)    # {'Alice': 100} — independent!
print(result2)    # {'Bob': 90} — independent!

# 5. defaultdict for cleaner counting/grouping
from collections import defaultdict

# Without defaultdict (verbose)
# word_count = {}
# for word in words:
#     if word not in word_count:
#         word_count[word] = 0
#     word_count[word] += 1

# With defaultdict (clean)
inventory = defaultdict(int)    # Missing keys default to 0
loot = ["gold", "potion", "gold", "gem", "gold", "potion"]
for item in loot:
    inventory[item] += 1        # No KeyError, auto-creates with 0
print(dict(inventory))          # {'gold': 3, 'potion': 2, 'gem': 1}`,
    breakdown: `• config.get("music_volume", 50) — Safe access with a fallback. If the key doesn't exist, returns 50 instead of crashing. The default should be a sensible value your program can work with.

• {name: int(score) for name, score in raw_scores.items()} — Dict comprehension TRANSFORMING values. Takes string scores and converts them to integers in one clean expression. Key stays the same, value gets modified.

• {k: v for k, v in parsed.items() if v >= 90} — Dict comprehension with FILTER. Only includes entries where the value meets the condition. Creates a new dict — the original is untouched.

• banned_words as a SET, not a list — When you only need to check "is X in this collection?", a set is ALWAYS better than a list. O(1) vs O(n) lookup. For a list of 10,000 banned words, that's 10,000x faster.

• The mutable default argument trap — def f(x={}): is dangerous! Python creates ONE dict object when the function is defined and reuses it every call. Mutations accumulate across calls. Always use None and create a fresh object inside.

• board=None pattern — The standard fix for mutable defaults. Check if None, then create a new empty dict. This guarantees each call gets its own independent dict.

• defaultdict(int) — Creates a dict where accessing a missing key auto-creates it with int() (which returns 0). Eliminates the "if key not in dict: dict[key] = 0" boilerplate entirely.

• inventory[item] += 1 with defaultdict — No need to check if the item exists first. If it's new, defaultdict creates it with value 0, then += 1 makes it 1. Clean, concise, Pythonic.`,
    summary: `Use .get(key, default) for safe dict access that never crashes. Prefer dict comprehensions for transforming or filtering dictionaries. Choose sets over lists for any membership testing scenario — the O(1) lookup is dramatically faster. Never use mutable objects (dicts, lists) as default function arguments — use None and create fresh objects inside. Consider defaultdict for counting and grouping to eliminate key-existence checks.`
  }
];
