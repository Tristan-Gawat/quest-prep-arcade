// Pre-written full lessons for Python Module: Conditionals
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonConditionalsLessons = [
  {
    title: "What is Conditionals?",
    definition: "Conditionals are Python's decision-making tools — they let your code choose different paths based on whether something is True or False. The if/elif/else keywords combined with comparison operators (==, !=, <, >, <=, >=) form the backbone of all program logic.",
    explanation: `Every interesting program needs to make decisions. Should the player take damage? Did the user enter the correct password? Is the inventory full? Conditionals answer these questions by evaluating a condition and running different code depending on the result.

In Python, the primary conditional keywords are if, elif (short for "else if"), and else. An if statement checks a condition — if it's True, the indented code below runs. If it's False, Python skips that block and checks the next elif or falls through to else.

Comparison operators are the building blocks of conditions. == checks equality (is this EQUAL to that?), != checks inequality (is this NOT equal?), < and > check less/greater than, and <= and >= check less/greater than or equal. These operators always produce a boolean result: True or False.

Think of conditionals like a quest checkpoint in a game. The NPC asks "Do you have 10 gold?" If yes, you pass. If no, you get a different response. Your code works the same way — it checks a condition, then branches into different paths.

Without conditionals, programs would be completely linear — every user would see the exact same thing. Conditionals give your code the power to adapt, respond, and make intelligent choices.`,
    code: `# Basic if statement — single decision
player_hp = 30

if player_hp <= 0:
    print("💀 Game Over! You have been defeated.")

# if/else — two possible paths
level = 15
if level >= 10:
    print("🗡️ You can enter the Dark Dungeon!")
else:
    print("⚠️ You need level 10+ to enter.")

# if/elif/else — multiple branches
score = 87
if score >= 90:
    rank = "S"
elif score >= 80:
    rank = "A"
elif score >= 70:
    rank = "B"
elif score >= 60:
    rank = "C"
else:
    rank = "F"
print(f"Your rank: {rank}")

# Comparison operators in action
gold = 50
item_cost = 75
if gold >= item_cost:
    print("✅ Purchase successful!")
    gold -= item_cost
else:
    print(f"❌ Not enough gold! Need {item_cost - gold} more.")
print(f"Gold remaining: {gold}")`,
    breakdown: `Let's go through every section:

• if player_hp <= 0: — The <= operator checks if player_hp is less than or equal to 0. If True, the indented print runs. If False, Python skips it entirely and moves on.

• The colon (:) at the end of if/elif/else lines is REQUIRED. It tells Python "the condition is done, the code block starts next." Forgetting it causes a SyntaxError.

• Indentation (4 spaces) defines what's INSIDE the if block. Everything indented under the if only runs when the condition is True. Unindented code always runs.

• if level >= 10 / else: — Two branches. Exactly ONE will run — never both, never neither. If the condition is True, the if-block runs. If False, the else-block runs.

• The elif chain (score example): Python checks conditions TOP TO BOTTOM. The FIRST one that's True wins — its block runs and all remaining elif/else are skipped. Score 87 is >= 80, so rank = "A". It never checks >= 70 even though that's also true.

• gold >= item_cost: A practical purchase check. If the player can afford it, subtract the cost (gold -= item_cost). Otherwise, calculate how much more they need using item_cost - gold.

• The final print(f"Gold remaining: {gold}") is NOT indented under if or else — it runs regardless of which branch was taken.`,
    summary: `Conditionals let your code make decisions using if/elif/else. Comparison operators (==, !=, <, >, <=, >=) create True/False conditions. Python checks conditions top-to-bottom — the first True condition wins and its indented block runs. The else block catches everything that didn't match. Every line after the conditional (unindented) runs no matter what.`
  },
  {
    title: "How Conditionals works",
    definition: "Python evaluates conditional expressions to boolean values (True/False), processes truthy/falsy conversions for non-boolean types, and uses short-circuit evaluation to optimize logical expressions — all checked in strict top-to-bottom order.",
    explanation: `When Python hits an if statement, it doesn't just check True/False — it goes through a precise evaluation process. Understanding this process helps you write smarter conditions and avoid subtle bugs.

First, Python evaluates the EXPRESSION after "if". This can be simple (x > 5) or complex (x > 5 and level >= 10). The result is converted to a boolean. For comparison operators, the result is already True or False. But Python can evaluate ANY value as a boolean — this is called "truthiness."

TRUTHY values (treated as True): any non-zero number, non-empty strings, non-empty lists/dicts, and most objects. FALSY values (treated as False): 0, 0.0, "" (empty string), [] (empty list), {} (empty dict), None, and False itself. This means you can write "if inventory:" instead of "if len(inventory) > 0:".

Short-circuit evaluation is Python's optimization for 'and' and 'or' operators. With 'and', if the first condition is False, Python doesn't even check the second one (because False AND anything = False). With 'or', if the first condition is True, Python skips the second (because True OR anything = True). This isn't just faster — it lets you write safe code like "if x != 0 and 100/x > 5" without causing a division-by-zero error.

Python evaluates elif chains strictly top-to-bottom and stops at the FIRST match. This means the ORDER of your conditions matters enormously. If you put a general condition before a specific one, the specific one will never trigger.`,
    code: `# Truthy and Falsy values in action
inventory = ["sword", "shield", "potion"]
player_name = ""
gold = 0

# Truthy check — non-empty list is True
if inventory:
    print(f"🎒 Inventory has {len(inventory)} items")
else:
    print("🎒 Inventory is empty")

# Falsy check — empty string is False
if player_name:
    print(f"Welcome, {player_name}!")
else:
    print("⚠️ No name set — using 'Adventurer'")
    player_name = "Adventurer"

# Short-circuit evaluation with 'and'
quest_complete = True
has_key = False
if quest_complete and has_key:
    print("🚪 Door opens!")      # Both must be True
else:
    print("🔒 Door remains locked")

# Short-circuit prevents errors!
enemy_count = 0
if enemy_count != 0 and total_damage / enemy_count > 50:
    print("High damage per enemy!")
# Without short-circuit, dividing by 0 would crash!

# Top-to-bottom evaluation — order matters!
damage = 150
if damage >= 100:
    print("💥 CRITICAL HIT!")    # This matches first!
elif damage >= 50:
    print("⚔️ Strong hit!")      # Never reached for 150
elif damage >= 1:
    print("🗡️ Light hit!")       # Never reached for 150`,
    breakdown: `• if inventory: — Python checks if the list is TRUTHY. A non-empty list is truthy (evaluates to True). This is more Pythonic than writing if len(inventory) > 0. Same result, cleaner code.

• if player_name: — Empty string "" is FALSY. So if the player hasn't set a name, this condition is False and we fall to else. Any non-empty string like "Alex" would be truthy.

• if gold: — 0 is FALSY. So "if gold:" means "if the player has any gold at all." The number 0 evaluates to False; any other number (even negative!) is True.

• quest_complete and has_key: The 'and' operator requires BOTH sides to be True. Python checks left-to-right. If quest_complete were False, Python wouldn't even look at has_key (short-circuit).

• enemy_count != 0 and total_damage / enemy_count > 50: This is SHORT-CIRCUIT SAFETY. If enemy_count is 0, the first condition is False, so Python NEVER evaluates the division. Without short-circuiting, total_damage / 0 would crash with ZeroDivisionError.

• The damage example: 150 >= 100 is True, so "CRITICAL HIT!" prints. Python stops checking — it never evaluates >= 50 or >= 1. If we reversed the order (checking >= 1 first), EVERYTHING would be a "Light hit!" because every positive number is >= 1.`,
    summary: `Python evaluates conditions by converting expressions to booleans. Non-boolean values have truthiness: empty/zero values are falsy (False), everything else is truthy (True). Short-circuit evaluation means 'and' stops at the first False, 'or' stops at the first True — this prevents errors and improves performance. Condition order matters: Python stops at the first True elif, so put specific conditions before general ones.`
  },
  {
    title: "Conditionals syntax & usage",
    definition: "Python conditionals use if/elif/else with colons and indentation, support logical operators (and/or/not), ternary expressions for inline conditions, nested conditionals for complex logic, and chained comparisons like 1 < x < 10.",
    explanation: `The syntax of conditionals in Python is designed to be readable — almost like English. But there are specific rules you must follow and powerful features you should know about.

The basic structure requires a colon after every if/elif/else line, and the code block must be indented (standard is 4 spaces). Logical operators let you combine multiple conditions: 'and' requires both to be True, 'or' requires at least one, and 'not' flips True to False. These can be combined freely: if (x > 0 and x < 100) or is_admin:.

Ternary expressions (conditional expressions) let you write simple if/else on ONE line: value = "high" if score > 90 else "low". This is great for simple assignments but should NOT be used for complex logic — readability matters more than saving lines.

Nested conditionals put an if inside another if. This handles complex multi-step logic like "if the player is alive AND if they have enough mana AND if the spell is off cooldown." However, deep nesting (3+ levels) makes code hard to read.

Python has a unique feature: chained comparisons. Instead of writing "if x >= 1 and x <= 10:", you can write "if 1 <= x <= 10:". Python evaluates this left-to-right, and it works exactly like the mathematical notation. This works with any comparison operator and any number of chains.`,
    code: `# Logical operators: and, or, not
player_level = 25
has_guild = True
is_banned = False

if player_level >= 20 and has_guild and not is_banned:
    print("✅ Eligible for ranked matches!")

# Ternary expression — one-line if/else
hp = 30
status = "Critical" if hp < 25 else "Healthy"
print(f"Status: {status}")

# Ternary with assignment
is_member = True
discount = 0.20 if is_member else 0.0
price = 100 * (1 - discount)
print(f"Final price: \${price:.2f}")

# Chained comparisons — Pythonic ranges
player_score = 75
if 70 <= player_score <= 89:
    print("📊 Rank: B tier")

# Nested conditionals
has_weapon = True
weapon_type = "bow"
ammo = 5

if has_weapon:
    if weapon_type == "bow":
        if ammo > 0:
            print("🏹 Fire arrow! Ammo left:", ammo - 1)
        else:
            print("🏹 Out of arrows!")
    else:
        print(f"⚔️ Attack with {weapon_type}!")
else:
    print("👊 Punch attack!")

# Multiple conditions with 'or'
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("🎮 Weekend bonus XP active!")`,
    breakdown: `• player_level >= 20 and has_guild and not is_banned: Three conditions combined. ALL must be True (because of 'and'). 'not is_banned' flips False to True. Reads almost like English: "level 20+, has guild, and not banned."

• status = "Critical" if hp < 25 else "Healthy": TERNARY EXPRESSION. Format: value_if_true if condition else value_if_false. Assigns "Critical" if hp < 25, otherwise "Healthy". Keep these simple — one condition, two values.

• discount = 0.20 if is_member else 0.0: Practical ternary — members get 20% off, non-members get no discount. Clean alternative to a 4-line if/else block.

• 70 <= player_score <= 89: CHAINED COMPARISON. Python checks both: is player_score >= 70 AND is it <= 89? Equivalent to writing (player_score >= 70 and player_score <= 89) but much cleaner.

• Nested if (weapon example): Three levels of decisions. First: has weapon? Second: what type? Third: has ammo? Each level indents further. This works but gets hard to read beyond 3 levels.

• day == "Saturday" or day == "Sunday": The 'or' operator — only ONE side needs to be True. If day is Saturday, Python doesn't even check Sunday (short-circuit).

• Note: You can also write: if day in ("Saturday", "Sunday"): — the 'in' operator checks membership in a collection. Even cleaner!`,
    summary: `Conditional syntax: colon + indentation required. Logical operators (and/or/not) combine conditions. Ternary expressions provide one-line if/else for simple assignments. Chained comparisons (1 <= x <= 10) are a Pythonic shortcut for range checks. Nested conditionals handle multi-step decisions but should be kept shallow. Use 'in' for membership checks against multiple values.`
  },
  {
    title: "Practical examples of Conditionals",
    definition: "In real programs, conditionals power game rank systems, login validation, shop purchase logic, quest eligibility checkers, and any feature where different inputs require different responses.",
    explanation: `Conditionals are the most-used control structure in programming. Every interactive system — games, websites, apps — relies on them constantly. Let's look at real patterns you'll use in actual projects.

Game rank systems use elif chains to classify scores into tiers. The key insight is ordering conditions from highest to lowest so the first match is the correct rank. This pattern appears everywhere: grade calculators, tax brackets, difficulty scaling.

Login validation combines multiple checks with logical operators. A real login might verify: is the username non-empty? Does the password meet length requirements? Does it match the stored hash? Each check can short-circuit — if the username is empty, don't even check the password.

Shop purchase logic demonstrates compound conditions: does the player have enough gold AND enough inventory space AND meet the level requirement? Each failed condition needs a specific error message so the player knows exactly what to fix.

Quest eligibility checkers combine all these patterns: checking stats against requirements, verifying prerequisites are met, and providing detailed feedback about what's missing. These systems make games feel responsive and fair.`,
    code: `# Game Rank System — classify performance into tiers
kills = 22
deaths = 5
assists = 10
kda = (kills + assists) / max(deaths, 1)  # Avoid /0

print(f"K/D/A: {kills}/{deaths}/{assists} — Ratio: {kda:.1f}")
if kda >= 5.0:
    rank = "🏆 Legendary"
elif kda >= 3.0:
    rank = "💎 Diamond"
elif kda >= 2.0:
    rank = "🥇 Gold"
elif kda >= 1.0:
    rank = "🥈 Silver"
else:
    rank = "🥉 Bronze"
print(f"Rank: {rank}")

# Login Validator — multiple security checks
username = "player_one"
password = "DragonSlayer99"

if not username:
    print("❌ Username cannot be empty")
elif len(username) < 3:
    print("❌ Username must be 3+ characters")
elif not password:
    print("❌ Password cannot be empty")
elif len(password) < 8:
    print("❌ Password must be 8+ characters")
elif password.lower() == username.lower():
    print("❌ Password cannot match username")
else:
    print("✅ Login credentials accepted!")

# Quest Eligibility Checker
player_level = 18
has_map = True
boss_defeated = False
required_level = 20

print("\\n📜 Quest: The Dragon's Lair")
eligible = True
if player_level < required_level:
    print(f"  ❌ Need level {required_level} (you: {player_level})")
    eligible = False
if not has_map:
    print("  ❌ Need: Ancient Map")
    eligible = False
if not boss_defeated:
    print("  ❌ Need: Defeat Shadow Boss first")
    eligible = False

if eligible:
    print("  ✅ All requirements met! Quest available.")`,
    breakdown: `• max(deaths, 1): SAFETY TRICK — if deaths is 0, use 1 instead. Prevents ZeroDivisionError. max() returns the larger of two values, so it's always at least 1.

• The rank elif chain: Ordered from HIGHEST to LOWEST. kda of 5.5 matches >= 5.0 first and gets "Legendary." It's also >= 3.0, but Python already stopped checking. Reversing order would break everything.

• Login validator uses elif (not separate ifs): This means it stops at the FIRST error. The user sees one clear message, not a flood of errors. Each check builds on the previous — if username is empty, don't waste time checking password.

• password.lower() == username.lower(): Case-insensitive comparison. Converts both to lowercase before comparing. "DragonSlayer" and "dragonslayer" would match.

• Quest eligibility uses separate if statements (not elif): This is intentional! We want to show ALL failed requirements, not just the first one. Using elif would stop after the first failure and the player wouldn't know about the other missing requirements.

• The eligible flag: Starts True and gets flipped to False if ANY requirement fails. After all checks, if it's still True, all requirements are met. This is the "flag pattern" — very common in validation logic.`,
    summary: `Real conditional patterns: rank systems use ordered elif chains (highest to lowest). Login validators use elif to show one error at a time. Quest checkers use separate if statements with a flag to show ALL failures. Use max(value, 1) to prevent division by zero. Choose elif vs separate ifs based on whether you want to stop at the first match or check everything.`
  },
  {
    title: "Conditionals best practices",
    definition: "Professional conditional code avoids deep nesting, uses early returns and guard clauses, prefers positive conditions, keeps blocks short, and uses Python-specific idioms like 'in' checks and ternary expressions for clarity.",
    explanation: `Writing conditions that WORK is easy. Writing conditions that are READABLE, MAINTAINABLE, and BUG-FREE — that's the professional skill. These best practices come from decades of software engineering experience.

Avoid deep nesting (the "pyramid of doom"). Every level of nesting makes code harder to follow. Instead of nesting 4 levels deep, use GUARD CLAUSES — check for invalid/edge cases first and return/continue early. This keeps the "happy path" (normal flow) at the shallowest level.

Prefer positive conditions over negative ones. The human brain processes "if is_alive:" faster than "if not is_dead:". Double negatives like "if not is_invalid:" are especially confusing — rewrite as "if is_valid:".

Use early returns in functions. Instead of wrapping your entire function body in an if statement, check the failure conditions at the top and return immediately. The main logic stays unindented and readable.

Keep conditional blocks short. If your if-block is 20 lines, extract it into a function with a descriptive name. "if can_purchase(player, item):" is clearer than a 5-line inline condition checking gold, level, and inventory space separately.`,
    code: `# BAD: Deep nesting (pyramid of doom)
def process_attack_bad(player, enemy):
    if player is not None:
        if enemy is not None:
            if player["hp"] > 0:
                if player["weapon"] is not None:
                    damage = player["weapon"]["power"]
                    enemy["hp"] -= damage
                    print(f"Hit for {damage}!")

# GOOD: Guard clauses + early returns
def process_attack_good(player, enemy):
    if player is None or enemy is None:
        return  # Guard: invalid input
    if player["hp"] <= 0:
        return  # Guard: player is dead
    if player["weapon"] is None:
        print("No weapon equipped!")
        return  # Guard: no weapon

    # Happy path — clean and unindented
    damage = player["weapon"]["power"]
    enemy["hp"] -= damage
    print(f"⚔️ Hit for {damage} damage!")

# GOOD: Use 'in' for multiple value checks
element = "fire"
# Instead of: if element == "fire" or element == "ice" or...
if element in ("fire", "ice", "lightning"):
    print("✨ Elemental damage bonus!")

# GOOD: Extract complex conditions into variables
player_level = 25
has_key = True
boss_dead = True
can_enter_final_zone = (
    player_level >= 20
    and has_key
    and boss_dead
)
if can_enter_final_zone:
    print("🚪 The final gate opens before you!")

# GOOD: Ternary for simple assignments only
health_bar = "🟢" if hp > 50 else "🟡" if hp > 25 else "🔴"

# GOOD: Use dictionaries instead of long elif chains
rank_thresholds = {90: "S", 80: "A", 70: "B", 60: "C"}
score = 85
player_rank = "F"  # default
for threshold, rank in rank_thresholds.items():
    if score >= threshold:
        player_rank = rank
        break
print(f"Rank: {player_rank}")`,
    breakdown: `• process_attack_bad: 5 levels of nesting. Hard to track which else belongs to which if. The actual logic (damage calculation) is buried deep inside. This is the "pyramid of doom."

• process_attack_good: GUARD CLAUSES check for problems first and return early. The main logic sits at the top level with no nesting. Reads linearly: "if anything's wrong, bail out. Otherwise, do the thing."

• if element in ("fire", "ice", "lightning"): The 'in' operator checks membership. Cleaner than chaining multiple == with 'or'. Also faster for large collections (especially sets).

• can_enter_final_zone variable: EXTRACTED CONDITION. Instead of cramming a complex boolean into the if-line, give it a descriptive name. Now the if-statement reads like English. Parentheses allow multi-line formatting.

• Chained ternary (health_bar): Works but use sparingly — more than 2 levels gets hard to read. For this specific pattern (color-coding), it's acceptable because the pattern is visually clear.

• Dictionary instead of elif: For simple value mappings, a dict lookup is cleaner than 10 elif branches. The for-loop pattern handles threshold-based lookups where you need the first match. For exact matches, just use rank_map[score] or rank_map.get(score, "F").

• General rule: If you can't understand your condition in 3 seconds, refactor it. Name it, simplify it, or extract it.`,
    summary: `Professional conditionals: use guard clauses to avoid nesting, prefer early returns over deep if/else trees, use 'in' for multiple value checks, extract complex conditions into named variables, and consider dictionaries for long elif chains. Keep it readable — if a condition takes more than 3 seconds to understand, refactor it. The goal is code that reads like a story, not a puzzle.`
  }
];
