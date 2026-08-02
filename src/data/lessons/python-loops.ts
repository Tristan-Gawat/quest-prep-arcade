// Pre-written full lessons for Python Module: Loops
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonLoopsLessons = [
  {
    title: "What is Loops?",
    definition: "Loops are Python's repetition tools — they let you execute the same block of code multiple times without writing it over and over. The two main types are 'for' loops (repeat a fixed number of times or over a collection) and 'while' loops (repeat as long as a condition is True).",
    explanation: `Imagine you need to print "Attack!" 100 times, or check every item in a player's inventory, or keep asking for a password until it's correct. Writing the same code 100 times would be insane — loops solve this by letting you write the code ONCE and repeat it automatically.

The 'for' loop is used when you know HOW MANY times to repeat, or when you want to go through every item in a collection (list, string, dictionary). It uses Python's range() function for counting, or iterates directly over data structures. Think of it as "for each thing in this group, do something."

The 'while' loop is used when you DON'T know how many repetitions you need — you just have a condition that must eventually become False. "While the player is alive, keep the game running." "While there are enemies on screen, keep spawning bullets." It keeps going until the condition fails.

range() is a built-in function that generates a sequence of numbers. range(5) gives you 0, 1, 2, 3, 4 (five numbers starting from 0). range(1, 11) gives 1 through 10. range(0, 20, 2) gives even numbers 0-18. It's memory-efficient because it generates numbers on-demand rather than creating a huge list.

Iterating over collections is one of Python's superpowers. Instead of using an index to access each element (like in C or Java), Python lets you loop directly: "for item in inventory:" gives you each item automatically. This works for lists, strings, dictionaries, sets, and any iterable object.`,
    code: `# For loop with range() — repeat a fixed number of times
print("⚔️ Attacking the boss 5 times:")
for i in range(5):
    print(f"  Strike {i + 1}!")

# For loop over a collection — process each item
inventory = ["sword", "shield", "potion", "map", "gem"]
print("\\n🎒 Inventory contents:")
for item in inventory:
    print(f"  • {item}")

# While loop — repeat until condition is False
attempts = 3
password = "dragon"
while attempts > 0:
    guess = "knight"  # Simulated input
    if guess == password:
        print("✅ Access granted!")
        break
    attempts -= 1
    print(f"❌ Wrong! {attempts} attempts left.")
print("🔒 Locked out!" if attempts == 0 else "")

# range() variations
print("\\nCounting 1-5:", end=" ")
for num in range(1, 6):
    print(num, end=" ")

print("\\nEvens 0-10:", end=" ")
for num in range(0, 11, 2):
    print(num, end=" ")

print("\\nCountdown:", end=" ")
for num in range(5, 0, -1):
    print(num, end=" ")
print("🚀 Launch!")`,
    breakdown: `Let's go through every section:

• for i in range(5): — Creates a loop that runs 5 times. The variable 'i' takes values 0, 1, 2, 3, 4 on each iteration. range(5) means "generate 5 numbers starting from 0."

• print(f"  Strike {i + 1}!"): We add 1 to i because range starts at 0, but humans count from 1. So i=0 becomes "Strike 1!", i=1 becomes "Strike 2!", etc.

• for item in inventory: — Python automatically picks each element from the list, one at a time. First loop: item = "sword". Second loop: item = "shield". And so on until the list is exhausted.

• while attempts > 0: — Checks the condition BEFORE each iteration. If attempts is 3, it's > 0, so the loop body runs. Each wrong guess decreases attempts by 1. When attempts hits 0, the condition is False and the loop stops.

• break: Immediately EXITS the loop, skipping any remaining iterations. Used here to escape when the correct password is entered. Without break, the loop would only stop when attempts reaches 0.

• attempts -= 1: Shorthand for attempts = attempts - 1. CRUCIAL in while loops — without this, attempts stays at 3 forever and the loop never ends (infinite loop!).

• range(1, 6): Start at 1, stop BEFORE 6. Gives 1, 2, 3, 4, 5. The end value is EXCLUSIVE (never included).

• range(0, 11, 2): Start at 0, stop before 11, step by 2. Gives 0, 2, 4, 6, 8, 10. The third argument is the STEP size.

• range(5, 0, -1): Negative step = count BACKWARDS. Gives 5, 4, 3, 2, 1. Useful for countdowns.`,
    summary: `Loops repeat code automatically. 'for' loops iterate over ranges or collections a known number of times. 'while' loops repeat as long as a condition is True — make sure the condition eventually becomes False! range(start, stop, step) generates number sequences where stop is exclusive. Use 'break' to exit a loop early. Always modify your while-loop variable to avoid infinite loops.`
  },
  {
    title: "How Loops works",
    definition: "Python loops work through the iterator protocol — for loops request the next item from an iterable until it's exhausted, while range() is a lazy object that generates values on-demand. Loop variables persist after the loop ends, and break/continue/else provide fine-grained flow control.",
    explanation: `Understanding HOW loops work internally helps you use them effectively and avoid common pitfalls. Python's loop machinery is elegant but has some surprising behaviors.

The ITERATOR PROTOCOL is the engine behind for loops. When Python sees "for x in something:", it calls iter() on that something to get an iterator, then repeatedly calls next() on the iterator to get values one at a time. When there are no more values, the iterator raises StopIteration and the loop ends. This is why you can loop over lists, strings, files, range objects — anything that supports this protocol.

range() is a LAZY object. When you write range(1000000), Python does NOT create a list of one million numbers. Instead, it creates a tiny range object that calculates the next number only when asked. This means range(10) and range(10000000) use the same amount of memory! This is why range() is preferred over creating actual lists of numbers.

LOOP VARIABLE SCOPE in Python is unusual: the variable used in a for loop (like 'i' or 'item') continues to exist AFTER the loop ends, holding the LAST value it was assigned. This surprises people from other languages where loop variables disappear after the loop.

break exits the loop entirely. continue skips the rest of the CURRENT iteration and jumps to the next one. Python also has a unique for/else and while/else pattern: the else block runs only if the loop completed normally (without hitting a break). This is perfect for "search" patterns where you need to know if you found something.`,
    code: `# Iterator protocol in action — what Python does internally
heroes = ["warrior", "mage", "rogue"]
# This for loop:
for hero in heroes:
    print(f"  🦸 {hero}")

# Is equivalent to this (behind the scenes):
print("\\nManual iteration:")
hero_iter = iter(heroes)
while True:
    try:
        hero = next(hero_iter)
        print(f"  🦸 {hero}")
    except StopIteration:
        break

# Loop variable persists after the loop!
for level in range(1, 6):
    pass  # Just counting
print(f"\\nLoop ended. 'level' is still: {level}")  # 5!

# break vs continue
print("\\n🏆 Searching for legendary item:")
loot = ["iron", "bronze", "legendary", "silver"]
for item in loot:
    if item == "iron" or item == "bronze":
        continue  # Skip common items
    if item == "legendary":
        print(f"  Found: {item}! Stop searching.")
        break
    print(f"  Checking: {item}")

# for/else — else runs only if NO break occurred
print("\\n🔍 Looking for 'diamond':")
chest = ["gold", "ruby", "emerald"]
for gem in chest:
    if gem == "diamond":
        print(f"  💎 Found diamond!")
        break
else:
    # This runs because break was never triggered
    print("  😞 No diamond found in chest.")`,
    breakdown: `• iter(heroes): Creates an ITERATOR from the list. An iterator is an object that remembers its position and gives you the next item when asked.

• next(hero_iter): Gets the next value from the iterator. Calls it three times: "warrior", "mage", "rogue". The fourth call would raise StopIteration because the list is exhausted.

• except StopIteration: break: This is exactly what Python's for loop does internally — it catches StopIteration and stops. You never write this yourself; the for loop handles it automatically.

• pass: A placeholder that does nothing. Used when Python requires a code block (after for:) but you don't want to do anything. Without pass, you'd get an IndentationError.

• After the loop, 'level' still equals 5: Unlike many languages, Python doesn't delete loop variables. The variable 'level' was last set to 5 (the final value from range(1,6)), and it persists in the current scope.

• continue: Skips the remaining code in this iteration and jumps directly to the next iteration. "iron" and "bronze" get skipped entirely — their print statements never execute.

• break inside for/else: The else block ONLY runs if the loop finishes naturally (iterates through everything). If break fires, else is SKIPPED. This is perfect for "did we find it?" patterns.

• Common trick: for/else replaces the need for a "found" flag variable. Without else, you'd need: found = False, if item == target: found = True; break, if not found: print("not found").`,
    summary: `For loops use the iterator protocol: iter() creates an iterator, next() gets values until StopIteration. range() is lazy — it generates numbers on-demand without storing them all in memory. Loop variables persist after the loop with their last value. 'break' exits entirely, 'continue' skips to the next iteration. The for/else pattern runs the else block only if no break occurred — ideal for search patterns.`
  },
  {
    title: "Loops syntax & usage",
    definition: "Python provides for/in with range() for counting, for/in with collections for iteration, while for condition-based repetition, and powerful tools like enumerate(), zip(), nested loops, and list comprehensions for advanced iteration patterns.",
    explanation: `Python's loop syntax is minimal but powerful. Once you know the basic patterns, you can combine them to handle any repetition scenario from simple counting to complex multi-dimensional traversal.

The 'for i in range()' pattern is for counting. range(n) counts from 0 to n-1. range(start, stop) counts from start to stop-1. range(start, stop, step) counts with custom increments. This is your go-to for "do something N times" or "count from A to B."

The 'for item in collection' pattern iterates directly over elements. Works with lists, strings (character by character), dictionaries (keys by default), tuples, sets, and files (line by line). This is more Pythonic than using indices.

enumerate() adds a counter to any iteration — instead of just getting items, you get (index, item) pairs. This replaces the anti-pattern of "for i in range(len(list)):" with the much cleaner "for i, item in enumerate(list):".

zip() combines multiple iterables in parallel. zip(names, scores) pairs them up: first name with first score, second name with second score, etc. Perfect for parallel lists that correspond to each other.

Nested loops put one loop inside another. The inner loop completes ALL its iterations for EACH iteration of the outer loop. If the outer loops 3 times and the inner loops 4 times, the total iterations are 3 × 4 = 12. Used for grids, combinations, and multi-dimensional data.`,
    code: `# enumerate() — get index AND value together
party = ["Warrior", "Mage", "Healer", "Rogue"]
print("🎮 Party Members:")
for index, member in enumerate(party):
    print(f"  Slot {index + 1}: {member}")

# zip() — iterate two lists in parallel
heroes = ["Archer", "Knight", "Wizard"]
damage = [45, 72, 95]
for hero, dmg in zip(heroes, damage):
    print(f"  {hero} deals {dmg} damage")

# while loop with user input simulation
energy = 100
print("\\n⚡ Grinding XP (costs 20 energy each):")
xp = 0
while energy >= 20:
    energy -= 20
    xp += 50
    print(f"  +50 XP! (Energy: {energy})")
print(f"Total XP earned: {xp}")

# Nested loops — grid/combination pattern
print("\\n🗺️ Dungeon Map (3x3):")
for row in range(3):
    for col in range(3):
        print(f"[{row},{col}]", end=" ")
    print()  # New line after each row

# enumerate with start parameter
quests = ["Slay Dragon", "Find Gem", "Save Village"]
print("\\n📜 Quest Log:")
for num, quest in enumerate(quests, start=1):
    print(f"  Quest #{num}: {quest}")

# String iteration
spell = "FIREBALL"
print("\\n✨ Casting:", end=" ")
for char in spell:
    print(char, end=".")
print(" 💥")`,
    breakdown: `• enumerate(party): Returns pairs of (index, value). First iteration: index=0, member="Warrior". Second: index=1, member="Mage". Much cleaner than using range(len(party)) and party[i].

• for hero, dmg in zip(heroes, damage): TUPLE UNPACKING — zip creates pairs, and the for-line splits each pair into two variables. First iteration: hero="Archer", dmg=45. Stops when the SHORTEST list runs out.

• while energy >= 20: Checks BEFORE each loop — if energy starts below 20, the loop body never runs. Each iteration subtracts 20 energy and adds 50 XP. Loop naturally stops when energy drops below 20.

• Nested loops: The outer loop (row) runs 3 times. For EACH row, the inner loop (col) runs 3 times. Total: 9 iterations. print() after the inner loop creates a new line, making a grid pattern.

• end=" " in the grid: Keeps grid cells on the same line (no newline between columns). The print() after the inner loop adds the newline to separate rows.

• enumerate(quests, start=1): The start parameter changes the counter's starting value. Instead of 0, 1, 2 you get 1, 2, 3. Perfect for human-readable numbering.

• for char in spell: Strings are ITERABLE in Python. Each iteration gives you one character. "FIREBALL" loops 8 times: "F", "I", "R", "E", "B", "A", "L", "L".`,
    summary: `Key loop patterns: for/range for counting, for/in for collection iteration, while for condition-based repetition. enumerate() adds indices to any loop (use start= for 1-based counting). zip() pairs multiple lists together for parallel iteration. Nested loops multiply iterations (outer × inner). Strings are iterable character-by-character. Always ensure while loops can terminate.`
  },
  {
    title: "Practical examples of Loops",
    definition: "In real programs, loops power XP grinding systems, inventory searches, multiplication tables, password retry mechanisms, leaderboard displays, and any feature requiring repetition or sequential data processing.",
    explanation: `Loops are everywhere in real software. Every game has a main game loop. Every app processes lists of data. Every server handles requests in a loop. Let's build real, practical systems using the loop patterns you've learned.

An XP grinder demonstrates while loops with resource management — the player keeps fighting until they run out of resources or reach a goal. This pattern appears in any system with finite resources: API rate limits, battery consumption, budget allocation.

Inventory search uses for loops with break/else to efficiently find items without checking the entire collection unnecessarily. This is the foundation of search algorithms and database queries.

The multiplication table showcases nested loops creating structured, tabular output — a pattern used in generating reports, game boards, pixel art, and any 2D data visualization.

A password retry system combines while loops with attempt counting, demonstrating real authentication flow with lockout protection. This pattern is used in banking apps, login screens, and security systems.

A leaderboard display combines enumerate(), formatted strings, and conditional formatting to present ranked data beautifully. This pattern appears in dashboards, reports, and any ranked listing.`,
    code: `# XP Grinder — fight monsters until resource depleted
stamina = 100
xp = 0
level = 1
xp_to_level = 200

print("⚔️ XP GRINDER")
print("=" * 30)
while stamina >= 15:
    monster_xp = 45
    stamina -= 15
    xp += monster_xp
    print(f"  🐉 Monster slain! +{monster_xp} XP | Stamina: {stamina}")
    if xp >= xp_to_level:
        level += 1
        xp -= xp_to_level
        print(f"  🎉 LEVEL UP! Now level {level}!")
print(f"\\nSession over! Level: {level} | XP: {xp}/{xp_to_level}")

# Inventory Search — find and use an item
inventory = ["iron_sword", "health_potion", "shield", "mana_potion"]
search_item = "health_potion"

print(f"\\n🔍 Searching for: {search_item}")
for i, item in enumerate(inventory):
    if item == search_item:
        print(f"  ✅ Found at slot {i + 1}! Using it...")
        inventory.remove(item)
        break
else:
    print(f"  ❌ {search_item} not in inventory!")

# Leaderboard Display
players = [
    ("xDragonSlayer", 9850),
    ("ShadowNinja", 8720),
    ("PixelQueen", 7500),
    ("CodeWizard", 6200),
    ("IronFist99", 5100),
]

print("\\n🏆 LEADERBOARD")
print("-" * 35)
for rank, (name, score) in enumerate(players, start=1):
    medal = "🥇" if rank == 1 else "🥈" if rank == 2 else "🥉" if rank == 3 else "  "
    bar = "█" * (score // 1000)
    print(f"  {medal} #{rank} {name:<15} {score:>6,} {bar}")
print("-" * 35)

# Password Retry System
max_attempts = 3
correct_pin = "1234"
locked = False

print("\\n🔐 SECURE LOGIN")
for attempt in range(1, max_attempts + 1):
    pin = "0000" if attempt < 3 else "1234"  # Simulated input
    if pin == correct_pin:
        print(f"  ✅ Access granted on attempt {attempt}!")
        break
    remaining = max_attempts - attempt
    print(f"  ❌ Wrong PIN! {remaining} attempts remaining.")
else:
    locked = True
    print("  🚫 ACCOUNT LOCKED — too many failed attempts!")`,
    breakdown: `• XP Grinder while loop: Each monster costs 15 stamina and gives 45 XP. The loop runs while stamina >= 15 (can afford a fight). Inside, we check if XP exceeds the level threshold — if so, level up and subtract the requirement.

• xp -= xp_to_level: Carries over excess XP. If threshold is 200 and you have 220, you level up and keep 20 XP toward the next level. Realistic RPG mechanic.

• Inventory search with for/else: The for loop checks each item. If found, remove it and break. The else block only runs if break NEVER fired (item not found). Elegant search pattern.

• inventory.remove(item): Removes the first occurrence of item from the list. This modifies the list in-place — the item is gone permanently.

• enumerate(players, start=1) with tuple unpacking: Each player is a tuple (name, score). The for-line unpacks both the enumerate counter (rank) AND the tuple into separate variables.

• {name:<15}: LEFT-ALIGN the name in a field 15 characters wide. Pads with spaces so all scores line up vertically. {score:>6,} RIGHT-ALIGNS the score in 6 characters with comma separators.

• "█" * (score // 1000): Creates a visual bar chart. 9850 // 1000 = 9, so 9 blocks. Integer division (//) drops the decimal.

• for/else in password system: The for loop tries max_attempts times. If correct PIN entered, break exits. If all attempts fail (break never fires), the else block triggers and locks the account.`,
    summary: `Real loop patterns: XP grinders use while loops with resource tracking and level-up checks. Inventory searches use for/else to find items and handle the "not found" case elegantly. Leaderboards combine enumerate(), tuple unpacking, and string formatting. Password systems use for loops with attempt limits and for/else for lockout. These patterns are the building blocks of game systems, security features, and data displays.`
  },
  {
    title: "Loops best practices",
    definition: "Professional loop code prefers 'for' over 'while' when the iteration count is known, avoids infinite loops with clear exit conditions, uses enumerate() instead of range(len()), breaks early when possible, and leverages Python idioms like list comprehensions for cleaner code.",
    explanation: `Writing loops that work is step one. Writing loops that are efficient, readable, and bug-free is the professional standard. These best practices prevent the most common loop-related bugs and make your code Pythonic.

Prefer 'for' over 'while' whenever the number of iterations is known or you're processing a collection. 'for' loops are inherently safer — they can't accidentally become infinite because they always exhaust their iterator. Reserve 'while' for situations where you genuinely don't know when to stop (user input, searching for convergence, event loops).

Avoid infinite loops by ensuring your while condition WILL eventually become False. Every while loop needs a clear EXIT STRATEGY: a variable that changes each iteration, a break statement that triggers, or an external event. A common bug is forgetting to increment a counter or forgetting to update the condition variable.

Use enumerate() not range(len()). The pattern "for i in range(len(my_list)):" is a code smell in Python. It's verbose, error-prone, and un-Pythonic. Use "for i, item in enumerate(my_list):" — it gives you both the index AND the value directly.

Break early when you've found what you need. If you're searching for a specific item in a list of 1000 elements and you find it at position 5, don't continue checking the remaining 995. Use break immediately. This is especially important for expensive operations inside loops.`,
    code: `# BAD: range(len()) anti-pattern
weapons = ["sword", "bow", "staff", "dagger"]
# Don't do this:
# for i in range(len(weapons)):
#     print(f"{i}: {weapons[i]}")

# GOOD: enumerate() — cleaner, more Pythonic
for i, weapon in enumerate(weapons):
    print(f"  Slot {i}: {weapon}")

# BAD: while loop when for is sufficient
# i = 0
# while i < 5:
#     print(f"Round {i}")
#     i += 1   ← Easy to forget this!

# GOOD: for loop — no risk of infinite loop
print("\\n🎯 Training rounds:")
for round_num in range(1, 6):
    print(f"  Round {round_num} complete!")

# GOOD: break early — don't waste time
high_scores = [9500, 8800, 7200, 6100, 5500, 4200, 3800]
target = 7000
print(f"\\n🔎 First score above {target}:")
for score in high_scores:
    if score <= target:
        print("  No more scores above target. Done!")
        break
    print(f"  ✅ {score:,}")

# GOOD: avoid modifying list while iterating
# BAD: for item in inventory: inventory.remove(item)
# GOOD: iterate over a copy, or build a new list
inventory = ["sword", "broken_shield", "potion", "broken_bow"]
# Filter out broken items
inventory = [item for item in inventory if not item.startswith("broken")]
print(f"\\n🎒 Clean inventory: {inventory}")

# GOOD: use else for "not found" instead of flag variable
targets = ["goblin", "skeleton", "ghost", "troll"]
boss = "dragon"
print(f"\\n🐉 Looking for {boss}:")
for enemy in targets:
    if enemy == boss:
        print(f"  Found {boss}!")
        break
else:
    print(f"  {boss} not in this area. Keep exploring!")

# GOOD: limit while loops with a safety counter
max_iterations = 1000
counter = 0
value = 1
print("\\n📈 Doubling until > 1000:")
while value <= 1000 and counter < max_iterations:
    value *= 2
    counter += 1
print(f"  Reached {value} in {counter} iterations")`,
    breakdown: `• enumerate vs range(len): enumerate(weapons) directly gives (index, value) pairs. No manual indexing with weapons[i], no off-by-one errors, no risk of accessing invalid indices. Always prefer this.

• for vs while for counting: A for-range loop CANNOT become infinite — range has a fixed end. A while loop with a manual counter (i += 1) is dangerous because forgetting that line creates an infinite loop. Use while only when needed.

• break early: The high_scores list is SORTED (descending). Once we hit a score <= target, all remaining scores will also be below target. Breaking immediately avoids checking thousands of unnecessary entries in a large dataset.

• Never modify a list while iterating it: Removing items shifts indices, causing skipped elements or errors. Two solutions: iterate over a copy (list(inventory)), or use a LIST COMPREHENSION to create a new filtered list.

• [item for item in inventory if not item.startswith("broken")]: A LIST COMPREHENSION — a one-line loop that builds a new list. Reads as "keep each item where the item doesn't start with 'broken'." More Pythonic than a multi-line loop with .append().

• for/else instead of flag: Without else, you'd need found = False, then if enemy == boss: found = True; break, then if not found: print("not found"). The else keyword eliminates the flag entirely.

• Safety counter (max_iterations): ALWAYS add a safety limit to while loops that depend on calculated values. If your math is wrong and the condition never becomes False, the counter prevents an infinite loop. Production code does this constantly.

• counter < max_iterations: This is a GUARD CONDITION. The 'and' ensures that even if 'value <= 1000' never becomes False (due to a bug), the loop still stops after 1000 iterations. Defensive programming.`,
    summary: `Loop best practices: prefer 'for' over 'while' (safer, clearer). Use enumerate() instead of range(len()). Break early when you've found what you need. Never modify a list while iterating it — use comprehensions or iterate a copy. Use for/else for search patterns. Always add safety counters to while loops. These habits prevent infinite loops, improve performance, and make your code readable and Pythonic.`
  }
];
