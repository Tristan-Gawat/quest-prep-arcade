// Pre-written full lessons for Python Module: Lists & Tuples
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonListsTuplesLessons = [
  {
    title: "What is Lists & Tuples?",
    definition: "Lists and tuples are ordered collections that store multiple values in a single variable. Lists use square brackets [] and are mutable (changeable), while tuples use parentheses () and are immutable (unchangeable).",
    explanation: `Imagine you're managing your RPG party — you need to keep track of multiple heroes, their stats, and their equipment. Instead of creating a separate variable for each item, Python gives you lists and tuples: containers that hold multiple values in a specific order.

A list is like your adventurer's backpack — you can add items, remove items, and rearrange things whenever you want. You create one with square brackets: inventory = ["sword", "shield", "potion"]. Lists are MUTABLE, meaning you can change their contents after creation. This makes them perfect for data that grows, shrinks, or changes over time.

A tuple is like an engraved stone tablet — once created, it can never be modified. You create one with parentheses: position = (10, 25). Tuples are IMMUTABLE, meaning no adding, removing, or changing elements. This sounds limiting, but it's powerful for data that should NEVER change, like coordinates, RGB colors, or database records.

Both lists and tuples are ORDERED — items maintain the position you put them in. The first item is always at index [0], the second at [1], and so on. You can access any item instantly by its index. Negative indices count from the end: [-1] is the last item, [-2] is second-to-last.

The choice between list and tuple communicates INTENT. When you use a list, you're saying "this collection might change." When you use a tuple, you're saying "this data is fixed and should not be modified." This distinction helps other developers (and future-you) understand your code's design.`,
    code: `# Creating a list — mutable, uses square brackets []
party = ["Warrior", "Mage", "Healer", "Rogue"]
print(party)              # ['Warrior', 'Mage', 'Healer', 'Rogue']

# Creating a tuple — immutable, uses parentheses ()
spawn_point = (100, 250)
print(spawn_point)        # (100, 250)

# Accessing by index (0-based)
print(party[0])           # Warrior (first item)
print(party[2])           # Healer (third item)
print(party[-1])          # Rogue (last item)

# Lists are mutable — you can change them
party[1] = "Necromancer"  # Replace Mage with Necromancer
print(party)              # ['Warrior', 'Necromancer', 'Healer', 'Rogue']

# Tuples are immutable — this would cause an error:
# spawn_point[0] = 200    # TypeError: 'tuple' does not support item assignment

# Length works on both
print(len(party))         # 4
print(len(spawn_point))   # 2

# Checking if item exists
print("Warrior" in party)       # True
print("Archer" in party)        # False
print(100 in spawn_point)       # True

# Mixed types are allowed
player_data = ["ShadowBlade", 45, 98.5, True]
boss_stats = ("Dragon Lord", 5000, 150.0)`,
    breakdown: `Let's break down each concept:

• party = ["Warrior", "Mage", "Healer", "Rogue"] — Creates a LIST with four string elements. Square brackets [] are the defining feature of lists. Items are separated by commas.

• spawn_point = (100, 250) — Creates a TUPLE with two integer elements. Parentheses () define tuples. Once created, these values are locked in permanently.

• party[0] returns "Warrior" — Indexing starts at ZERO, not one. The first element is always index 0. This is universal in Python (and most programming languages).

• party[-1] returns "Rogue" — Negative indices count BACKWARDS from the end. -1 is the last item, -2 is second-to-last. Very useful when you don't know the length.

• party[1] = "Necromancer" — Lists allow item REASSIGNMENT. You can change any element by its index. This is what "mutable" means — the contents can be modified in place.

• spawn_point[0] = 200 would raise TypeError — Tuples REFUSE modification. Any attempt to change, add, or remove elements raises an error. This is "immutable" in action.

• len(party) returns 4 — The built-in len() function works on all collections. Returns the number of elements.

• "Warrior" in party returns True — The 'in' keyword checks MEMBERSHIP. Returns a boolean indicating whether the value exists anywhere in the collection.

• player_data = ["ShadowBlade", 45, 98.5, True] — Lists (and tuples) can hold MIXED TYPES. A single collection can contain strings, ints, floats, bools, and even other lists.`,
    summary: `Lists (square brackets, mutable) and tuples (parentheses, immutable) are ordered collections for storing multiple values. Both use zero-based indexing with [0] for the first item and [-1] for the last. Lists let you change contents after creation; tuples lock data permanently. Use 'in' to check membership and len() to get the count.`
  },
  {
    title: "How Lists & Tuples works",
    definition: "Lists are implemented as dynamic arrays that resize automatically when they grow, storing references to objects. Tuples are fixed-size sequences stored more compactly in memory, making them faster for read-only access and safe to use as dictionary keys.",
    explanation: `Under the hood, a Python list is a dynamic array — a contiguous block of memory holding POINTERS to objects (not the objects themselves). When you create inventory = ["sword", "shield"], Python allocates an array of references, each pointing to the string objects in memory. This is why lists can hold mixed types — each slot just holds a pointer.

When a list grows beyond its current capacity, Python allocates a NEW, larger array (typically 1.125x the current size), copies all existing references over, and frees the old array. This over-allocation means append() is usually O(1) — fast because there's extra room. But occasionally it triggers a resize, which is O(n). On average, it balances out.

Because lists store references (not values), assignment creates a SHARED reference, not a copy. If you write party_b = party_a, both variables point to the SAME list object. Changing one changes both! This is called "aliasing" and is a common source of bugs. To make an independent copy, use party_b = party_a.copy() (shallow copy) or import copy; party_b = copy.deepcopy(party_a) (deep copy for nested structures).

Tuples, being immutable, get special optimizations. Python can allocate a tuple's memory once and never resize it. Small tuples (length 1-20) are cached and reused by the interpreter. Because they can't change, Python can hash them — this means tuples can be dictionary keys or set members, while lists cannot.

The immutability of tuples also benefits multithreaded programs. Since no thread can modify a tuple, there's no risk of race conditions when multiple threads read the same tuple. This safety guarantee comes "for free" just by choosing tuple over list.`,
    code: `# Lists store REFERENCES to objects
weapons = ["Excalibur", "Mjolnir", "Masamune"]
# Each slot in the list holds a pointer to a string object

# Aliasing — two names, ONE list!
loadout_a = ["sword", "bow", "staff"]
loadout_b = loadout_a          # NOT a copy — same list!
loadout_b.append("dagger")
print(loadout_a)               # ['sword', 'bow', 'staff', 'dagger']
# Both variables see the change!

# Shallow copy — independent list, shared objects
loadout_c = loadout_a.copy()
loadout_c.append("wand")
print(loadout_a)               # Still ['sword', 'bow', 'staff', 'dagger']
print(loadout_c)               # ['sword', 'bow', 'staff', 'dagger', 'wand']

# Deep copy for nested lists
import copy
party = [["Warrior", 100], ["Mage", 80]]
party_backup = copy.deepcopy(party)
party[0][1] = 50               # Modify original
print(party_backup[0][1])      # Still 100 — independent!

# Tuples are hashable — can be dict keys
locations = {}
locations[(0, 0)] = "Spawn"
locations[(10, 5)] = "Boss Room"
print(locations[(10, 5)])      # Boss Room

# Lists CANNOT be dict keys (unhashable)
# locations[[0, 0]] = "Spawn"  # TypeError!

# Tuple memory advantage
import sys
my_list = [1, 2, 3, 4, 5]
my_tuple = (1, 2, 3, 4, 5)
print(f"List size: {sys.getsizeof(my_list)} bytes")   # ~104 bytes
print(f"Tuple size: {sys.getsizeof(my_tuple)} bytes") # ~80 bytes`,
    breakdown: `• loadout_b = loadout_a — This is ALIASING, not copying. Both variables reference the same list object in memory. Any modification through either variable affects both because there's only ONE actual list.

• loadout_b.append("dagger") affects loadout_a — Proof of aliasing. Since both names point to the same underlying list, appending via one name is visible through the other.

• loadout_a.copy() — Creates a SHALLOW copy: a new list object with the same references. The list itself is independent, but if it contains mutable objects (like nested lists), those inner objects are still shared.

• copy.deepcopy(party) — Creates a fully independent copy, recursively copying all nested objects. Use this when your list contains other lists, dicts, or mutable objects that also need to be independent.

• party[0][1] = 50 doesn't affect party_backup — Deep copy made every nested list independent. The backup's inner list [\"Warrior\", 100] is a completely separate object from the original's.

• locations[(0, 0)] = "Spawn" — Tuples CAN be dictionary keys because they're immutable and hashable. Python can compute a fixed hash value for them. This is one of tuples' biggest practical advantages.

• locations[[0, 0]] would raise TypeError — Lists CANNOT be dictionary keys because they're mutable. If a list changed after being used as a key, the hash would be invalid, corrupting the dictionary.

• sys.getsizeof comparison — Tuples use less memory than equivalent lists because they don't need to store extra capacity for potential growth or track a resize mechanism.`,
    summary: `Lists are dynamic arrays of references that resize automatically but create aliasing when assigned directly — use .copy() or deepcopy() for independent copies. Tuples are fixed-size, use less memory, and are hashable (usable as dict keys), while lists are not. Understanding reference semantics and the shallow vs deep copy distinction is critical for avoiding subtle bugs in Python programs.`
  },
  {
    title: "Lists & Tuples syntax & usage",
    definition: "Lists provide rich modification methods (append, insert, remove, pop, sort) and support slicing with [start:stop:step] syntax. Tuples support unpacking into variables and are commonly used with list comprehensions for efficient creation of new lists.",
    explanation: `Python lists come with a powerful toolkit of methods for manipulation. The most common are: append(item) adds to the end, insert(index, item) adds at a specific position, remove(item) deletes the first occurrence of a value, pop(index) removes and returns an item by position, and sort() arranges elements in order.

Slicing lets you extract portions of a list or tuple using [start:stop:step] syntax. The start index is INCLUSIVE (included in result), the stop index is EXCLUSIVE (not included). So party[1:3] gives you items at index 1 and 2, but NOT index 3. If you omit start, it defaults to the beginning. If you omit stop, it goes to the end. The step controls how many items to skip.

List comprehensions are Python's elegant shortcut for creating new lists from existing ones. Instead of writing a for loop that appends to an empty list, you can write it as a single expression: [expression for item in iterable if condition]. They're more readable, more Pythonic, and slightly faster than equivalent loops.

Tuple unpacking (also called destructuring) lets you assign multiple variables from a tuple in one line: x, y = (10, 20). This works with any iterable and is used everywhere in Python — for swapping variables, returning multiple values from functions, and iterating over paired data.

The enumerate() function is essential when you need both the index AND value while iterating. Instead of manually tracking a counter, enumerate(list) gives you (index, value) tuples on each iteration. Similarly, zip() pairs up elements from multiple lists into tuples.`,
    code: `# List methods — modifying your collection
inventory = ["sword", "shield", "potion"]

# Adding items
inventory.append("bow")           # Add to end
inventory.insert(1, "helmet")     # Insert at index 1
print(inventory)  # ['sword', 'helmet', 'shield', 'potion', 'bow']

# Removing items
inventory.remove("shield")        # Remove by value (first occurrence)
dropped = inventory.pop(2)        # Remove by index, returns the item
print(f"Dropped: {dropped}")      # Dropped: potion
print(inventory)  # ['sword', 'helmet', 'bow']

# Sorting
scores = [85, 42, 97, 63, 28]
scores.sort()                     # In-place sort (ascending)
print(scores)                     # [28, 42, 63, 85, 97]
scores.sort(reverse=True)         # Descending
print(scores)                     # [97, 85, 63, 42, 28]

# Slicing [start:stop:step]
heroes = ["Warrior", "Mage", "Rogue", "Cleric", "Ranger"]
print(heroes[1:3])                # ['Mage', 'Rogue'] (index 1 and 2)
print(heroes[:2])                 # ['Warrior', 'Mage'] (first two)
print(heroes[2:])                 # ['Rogue', 'Cleric', 'Ranger'] (from index 2)
print(heroes[::2])                # ['Warrior', 'Rogue', 'Ranger'] (every other)
print(heroes[::-1])               # Reversed list!

# List comprehension — elegant list creation
levels = [1, 5, 12, 8, 20, 3]
high_levels = [lvl for lvl in levels if lvl >= 10]
print(high_levels)                # [12, 20]

doubled = [x * 2 for x in levels]
print(doubled)                    # [2, 10, 24, 16, 40, 6]

# Tuple unpacking
position = (32, 64)
x, y = position                   # Unpack into separate variables
print(f"Player at ({x}, {y})")    # Player at (32, 64)

# Swap variables using tuple unpacking
a, b = 10, 20
a, b = b, a                       # Elegant swap!
print(a, b)                       # 20 10

# enumerate() for index + value
party = ["Tank", "DPS", "Support"]
for i, role in enumerate(party):
    print(f"Slot {i}: {role}")`,
    breakdown: `• inventory.append("bow") — Adds to the END of the list. O(1) operation — very fast. This is the most common way to grow a list.

• inventory.insert(1, "helmet") — Inserts at a specific INDEX, shifting everything after it to the right. O(n) operation — slower for large lists because items must shift.

• inventory.remove("shield") — Finds and removes the FIRST occurrence of the value. Raises ValueError if not found. O(n) because Python must search through the list.

• inventory.pop(2) — Removes the item at index 2 AND returns it. Without an argument, pop() removes the last item. Useful when you need the removed value.

• scores.sort() — Sorts the list IN-PLACE (modifies the original). Returns None. Use sorted(scores) if you want a new sorted list without changing the original.

• heroes[1:3] returns ['Mage', 'Rogue'] — Slice from index 1 UP TO (but not including) index 3. The stop index is always EXCLUSIVE — think of it as "stop before reaching index 3."

• heroes[::-1] — Step of -1 reverses the collection. The empty start and stop with negative step means "go through everything backwards."

• [lvl for lvl in levels if lvl >= 10] — List COMPREHENSION: creates a new list containing only items that pass the condition. Equivalent to a loop with if and append, but more concise.

• x, y = position — Tuple UNPACKING: assigns each element to a separate variable. The number of variables must match the number of elements or Python raises ValueError.

• a, b = b, a — Python evaluates the right side FIRST (creating a temporary tuple), then unpacks it to the left. This swaps values without needing a temporary variable.

• for i, role in enumerate(party) — enumerate() yields (index, value) pairs. Unpacking in the for loop gives you both the position and the item simultaneously.`,
    summary: `Lists offer append(), insert(), remove(), pop(), and sort() for in-place modification. Slicing with [start:stop:step] extracts portions — remember stop is exclusive. List comprehensions [expr for x in iterable if cond] create new lists concisely. Tuple unpacking assigns multiple variables at once, enables elegant swaps, and pairs naturally with enumerate() for indexed iteration.`
  },
  {
    title: "Practical examples of Lists & Tuples",
    definition: "Lists and tuples power real-world systems like game inventories, leaderboards, card shuffling mechanics, and coordinate-based maps. Choosing the right collection type depends on whether data needs to change after creation.",
    explanation: `Let's build real systems using lists and tuples. Each example demonstrates practical patterns you'll encounter in game development, data management, and everyday programming.

An inventory system needs a mutable collection because players constantly add and remove items. Lists are the natural choice — you can append loot drops, remove consumed potions, and check if the player has a required item. The order might represent inventory slots.

A leaderboard tracks the top scores in order. You need to add new scores, sort them, and keep only the top N entries. This is a classic list use case with sorting and slicing combined. The pattern of "add, sort, trim" appears in many real applications.

A card deck shuffler demonstrates list operations like building a collection from nested loops, random shuffling, and drawing cards from a deck (pop). This shows how lists model physical objects that move between locations.

A coordinate system uses tuples for positions because map coordinates shouldn't accidentally change. You might store a player's checkpoint, spawn points, or waypath nodes as tuples. They can also serve as dictionary keys to map coordinates to tile types.`,
    code: `# === EXAMPLE 1: Inventory System ===
import random

inventory = []
max_slots = 5

def add_item(item):
    if len(inventory) < max_slots:
        inventory.append(item)
        print(f"+ Added {item} ({len(inventory)}/{max_slots} slots)")
    else:
        print(f"✗ Inventory full! Can't add {item}")

add_item("Iron Sword")
add_item("Health Potion")
add_item("Shield")
print(f"Inventory: {inventory}")

# Use item (remove it)
if "Health Potion" in inventory:
    inventory.remove("Health Potion")
    print("Used Health Potion! HP restored.")

# === EXAMPLE 2: High Score Leaderboard ===
leaderboard = [("DragonSlayer", 9500), ("PixelKnight", 8200), ("RuneMage", 7800)]

# Add new score
new_entry = ("ShadowArcher", 8900)
leaderboard.append(new_entry)
leaderboard.sort(key=lambda entry: entry[1], reverse=True)
leaderboard = leaderboard[:5]   # Keep top 5 only
print("=== LEADERBOARD ===")
for rank, (name, score) in enumerate(leaderboard, 1):
    print(f"  #{rank} {name}: {score:,} pts")

# === EXAMPLE 3: Card Deck Shuffler ===
suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
deck = [(rank, suit) for suit in suits for rank in ranks]
print(f"Deck has {len(deck)} cards")

random.shuffle(deck)
hand = [deck.pop() for _ in range(5)]
print("Your hand:")
for rank, suit in hand:
    print(f"  {rank} of {suit}")

# === EXAMPLE 4: Coordinate Map with Tuples ===
world_map = {}
world_map[(0, 0)] = "Village"
world_map[(3, 2)] = "Forest"
world_map[(5, 5)] = "Dragon Lair"
world_map[(-1, 4)] = "Hidden Cave"

player_pos = (0, 0)
print(f"Location: {world_map.get(player_pos, 'Wilderness')}")

# Calculate distance between two points
def distance(pos_a, pos_b):
    x1, y1 = pos_a       # Tuple unpacking
    x2, y2 = pos_b
    return ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5

dist = distance(player_pos, (5, 5))
print(f"Distance to Dragon Lair: {dist:.1f} units")`,
    breakdown: `• inventory = [] with max_slots = 5 — Start with empty list and a capacity limit. The function checks length before adding, mimicking a real game's limited inventory slots.

• "Health Potion" in inventory — Membership check before removal. Always verify an item exists before calling remove() to avoid ValueError crashes.

• leaderboard.sort(key=lambda entry: entry[1], reverse=True) — Sorts tuples by their SECOND element (the score) in descending order. The lambda function tells sort() what to compare.

• leaderboard[:5] — Slicing after sort keeps only the top 5 entries. This "sort and trim" pattern is standard for leaderboards, recent items, and top-N queries.

• enumerate(leaderboard, 1) — The second argument starts counting from 1 instead of 0. Perfect for display ranks where "#1" is more natural than "#0."

• [(rank, suit) for suit in suits for rank in ranks] — Nested list comprehension building all 52 card combinations. The outer loop (suits) runs first, inner loop (ranks) runs for each suit.

• deck.pop() — Removes and returns the last card from the deck, simulating "drawing" a card. The deck gets smaller, just like a real card deck.

• world_map[(0, 0)] = "Village" — Tuples as dictionary KEYS. Since positions shouldn't change, tuples are the correct choice. You can't accidentally modify a coordinate.

• x1, y1 = pos_a — Tuple unpacking inside the function extracts x and y for the distance calculation. Clean, readable, and avoids pos_a[0] / pos_a[1] indexing.`,
    summary: `Lists excel as inventories (add/remove items), leaderboards (sort and slice), and card decks (build, shuffle, draw). Tuples shine as coordinates and map keys because their immutability prevents accidental modification. Key patterns include membership checks before removal, sort-and-trim for top-N, nested comprehensions for combinations, and tuple unpacking for clean coordinate math.`
  },
  {
    title: "Lists & Tuples best practices",
    definition: "Best practices include using tuples for fixed data, preferring list comprehensions over loops, guarding against index errors, leveraging enumerate() for indexed iteration, and choosing sorted() over .sort() when you need the original preserved.",
    explanation: `Choosing between lists and tuples communicates intent clearly to anyone reading your code. Use tuples when data is conceptually fixed — coordinates, RGB colors, database rows, function return values with multiple items. Use lists when the collection will grow, shrink, or be reordered during program execution.

List comprehensions are the Pythonic way to create new lists. They're not just shorter — they're actually faster than equivalent for loops because Python optimizes them internally. However, readability comes first: if a comprehension gets too complex (nested conditions, multiple transformations), break it into a regular loop. A comprehension should fit on one line mentally.

Index out of range errors are one of the most common Python bugs. Protect yourself by checking length before indexing, using try/except, or using safe alternatives like slicing (which never raises on out-of-bounds). For dictionaries of lists, use .get() with defaults.

The enumerate() function eliminates the old pattern of manually managing an index counter. Instead of writing i = 0 and i += 1 inside a loop, just use for i, item in enumerate(collection). It's cleaner, less error-prone, and universally understood by Python developers.

When sorting, understand the difference between .sort() (modifies original, returns None) and sorted() (returns new sorted list, original unchanged). If you need the original order preserved — say for an undo feature or displaying both sorted and unsorted views — always use sorted().`,
    code: `# 1. Use tuples for fixed data, lists for changing data
# GOOD — these won't change, so tuple communicates that
SPAWN_POINT = (0, 0)
RGB_RED = (255, 0, 0)
DIRECTIONS = ("north", "south", "east", "west")

# GOOD — this will change during gameplay, so list
active_quests = ["Slay Dragon", "Find Gem", "Escort NPC"]

# 2. List comprehensions over manual loops
levels = [3, 7, 12, 1, 15, 8, 22]

# BAD — verbose loop pattern
high_levels = []
for lvl in levels:
    if lvl >= 10:
        high_levels.append(lvl)

# GOOD — comprehension (same result, cleaner)
high_levels = [lvl for lvl in levels if lvl >= 10]
print(high_levels)                # [12, 15, 22]

# 3. Avoid index out of range
party = ["Warrior", "Mage"]

# BAD — crashes if party has fewer than 3 members
# print(party[2])                 # IndexError!

# GOOD — check length first
if len(party) > 2:
    print(party[2])
else:
    print("Party slot 3 is empty")

# GOOD — use slicing (never raises IndexError)
first_three = party[:3]           # Returns what's available
print(first_three)                # ['Warrior', 'Mage']

# 4. Use enumerate() instead of manual indexing
heroes = ["Paladin", "Ranger", "Bard", "Monk"]

# BAD — manual counter
# i = 0
# for hero in heroes:
#     print(f"{i}: {hero}")
#     i += 1

# GOOD — enumerate handles it
for i, hero in enumerate(heroes):
    print(f"Slot {i}: {hero}")

# 5. sorted() vs .sort() — preserving originals
raw_scores = [88, 42, 95, 67, 23, 91]

# GOOD — sorted() creates NEW list, original unchanged
ranked = sorted(raw_scores, reverse=True)
print(f"Ranked: {ranked}")        # [95, 91, 88, 67, 42, 23]
print(f"Original: {raw_scores}")  # [88, 42, 95, 67, 23, 91] (unchanged!)

# BAD if you need original — .sort() modifies in place
# raw_scores.sort()               # Original is now gone!

# BONUS: Named tuples for readable tuple access
from collections import namedtuple
Player = namedtuple("Player", ["name", "hp", "attack"])
hero = Player("Vanguard", 150, 45)
print(f"{hero.name} — HP:{hero.hp} ATK:{hero.attack}")
# Much clearer than hero[0], hero[1], hero[2]!`,
    breakdown: `• SPAWN_POINT = (0, 0) — Tuple + ALL_CAPS = clearly a constant. Anyone reading this knows the spawn point is fixed and should never be modified. Two signals reinforcing the same message.

• active_quests = [...] as a list — Quests get added and completed during gameplay. Using a list communicates "this collection will change" — the opposite signal from a tuple.

• List comprehension vs loop — The comprehension is one line versus four. It's also slightly faster because Python can optimize the internal bytecode. But if you need complex logic, a loop is fine.

• if len(party) > 2 — ALWAYS validate before indexing. IndexError is one of the most common crashes in Python. Defensive checks prevent runtime errors.

• party[:3] never raises IndexError — Slicing is SAFE: if you ask for more elements than exist, Python just returns what's available. This makes it excellent for "get up to N items" patterns.

• enumerate(heroes) — Replaces manual i = 0; i += 1 pattern. Less code, no risk of forgetting to increment, and universally readable by Python developers.

• sorted() vs .sort() — sorted() is NON-DESTRUCTIVE (creates a new list). .sort() is IN-PLACE (modifies and returns None). If you write x = my_list.sort(), x will be None — a common beginner trap.

• namedtuple("Player", [...]) — Creates a tuple subclass where elements have NAMES. hero.name is far more readable than hero[0]. Use for tuples with more than 2-3 elements.`,
    summary: `Use tuples for data that shouldn't change and lists for mutable collections. Prefer list comprehensions over manual loops for creating new lists. Guard against IndexError by checking length or using safe slicing. Use enumerate() instead of manual index counters. Choose sorted() over .sort() when you need the original list preserved, and consider namedtuple for tuples with many fields.`
  }
];
