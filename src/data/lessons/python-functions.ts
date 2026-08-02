// Pre-written full lessons for Python Module: Functions
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonFunctionsLessons = [
  {
    title: "What is Functions?",
    definition: "A function is a reusable block of code that performs a specific task. You define it once with a name, and then 'call' it whenever you need that task done — avoiding repetition and keeping your code organized.",
    explanation: `Imagine you're building a game and you need to calculate damage in 50 different places. Without functions, you'd copy-paste the same formula 50 times. If you later find a bug in that formula, you'd have to fix it 50 times. Functions solve this by letting you write the logic ONCE and reuse it everywhere.

A function has three key parts: a NAME (what you call it), PARAMETERS (the inputs it accepts), and a RETURN VALUE (what it gives back). When you use a function, you pass ARGUMENTS (actual values) to its parameters.

The difference between parameters and arguments confuses beginners: PARAMETERS are the variable names in the function definition (like placeholders). ARGUMENTS are the actual values you pass when calling the function. Think of parameters as empty boxes and arguments as what you put inside them.

Functions exist because of the DRY principle — Don't Repeat Yourself. Every time you copy-paste code, you're creating a maintenance nightmare. Functions let you change logic in ONE place and have it take effect everywhere that function is called.

Beyond DRY, functions make code READABLE. A line like calculate_damage(player, enemy) tells you exactly what's happening without seeing the implementation. Functions are the building blocks of all software — from tiny scripts to massive game engines.`,
    code: `# Defining a simple function
def greet_player(player_name):
    """Greets a player by name."""
    return f"Welcome to the dungeon, {player_name}!"

# Calling the function — passing an ARGUMENT
message = greet_player("Aria")   # "Aria" is the argument
print(message)                    # Output: Welcome to the dungeon, Aria!

# Function with multiple parameters
def calculate_damage(base_attack, enemy_defense, critical_hit=False):
    """Calculate damage dealt to an enemy."""
    damage = base_attack - enemy_defense
    if critical_hit:
        damage *= 2
    return max(damage, 0)  # Never return negative damage

# Calling with different arguments each time — REUSABLE!
hit1 = calculate_damage(25, 10)           # Normal hit: 15
hit2 = calculate_damage(25, 10, True)     # Critical hit: 30
hit3 = calculate_damage(8, 20)            # Blocked: 0

print(f"Normal hit: {hit1} damage")
print(f"Critical hit: {hit2} damage")
print(f"Blocked: {hit3} damage")

# Without functions, you'd repeat this logic every time!
# DRY principle: write once, call many times`,
    breakdown: `• def greet_player(player_name): — The DEF keyword starts a function definition. 'greet_player' is the function NAME. 'player_name' inside parentheses is a PARAMETER — a placeholder for whatever value gets passed in.

• """Greets a player by name.""" — A DOCSTRING. It describes what the function does. Appears when someone hovers over or calls help() on your function.

• return f"Welcome to the dungeon, {player_name}!" — The RETURN statement sends a value back to whoever called the function. Without return, the function gives back None.

• message = greet_player("Aria") — CALLING the function. "Aria" is the ARGUMENT — the actual value that fills the 'player_name' parameter. The returned string gets stored in 'message'.

• def calculate_damage(base_attack, enemy_defense, critical_hit=False): — Three parameters. 'critical_hit=False' is a DEFAULT PARAMETER — if you don't pass a value for it, it defaults to False.

• damage = base_attack - enemy_defense — The function's internal logic. These variables only exist INSIDE the function.

• if critical_hit: damage *= 2 — Conditional logic inside the function. Doubles damage on critical hits.

• return max(damage, 0) — Uses the built-in max() function to ensure damage is never negative. Returns 0 if defense exceeds attack.

• calculate_damage(25, 10) — Called with 2 arguments. The third parameter uses its default (False). This is the power of default parameters!

• calculate_damage(25, 10, True) — Called with 3 arguments. Overrides the default to enable critical hit.`,
    summary: `Functions are reusable blocks of code defined with 'def', given a name, and called whenever needed. They take parameters (inputs) and return values (outputs). The DRY principle — Don't Repeat Yourself — is the core reason functions exist. Parameters are placeholders in the definition; arguments are actual values you pass when calling. Default parameters let you make some arguments optional.`
  },
  {
    title: "How Functions works",
    definition: "When you call a function, Python pauses the current code, jumps into the function body, creates a local scope for its variables, executes the code, and returns a value back to where it was called — this process is managed by the call stack.",
    explanation: `The CALL STACK is Python's way of keeping track of where it is in your code. Think of it like a stack of books — each function call adds a book on top, and when that function finishes, the book is removed. Python always works on the top book.

When you call a function like calculate_damage(25, 10), Python: 1) Pushes a new "frame" onto the call stack, 2) Creates local variables for parameters (base_attack=25, enemy_defense=10), 3) Executes the function body, 4) Hits a return statement (or reaches the end), 5) Pops the frame off the stack, and 6) Gives the return value back to the caller.

SCOPE determines where variables can be seen. LOCAL scope means a variable exists only inside its function — it's created when the function is called and destroyed when it returns. GLOBAL scope means a variable exists at the top level and can be read (but not easily modified) from anywhere.

Python uses the LEGB rule to find variables: Local (inside current function) → Enclosing (inside outer functions, for nested functions) → Global (top-level module) → Built-in (Python's built-in names like print, len). It searches in this order and uses the first match.

Python passes arguments by "object reference" — not purely by value or by reference like other languages. When you pass a variable to a function, the function gets a reference to the same object. For IMMUTABLE types (numbers, strings, tuples), it LOOKS like pass-by-value because you can't change the original. For MUTABLE types (lists, dicts), changes inside the function DO affect the original object outside.`,
    code: `# Demonstrating the call stack
def attack_enemy(attacker, defender):
    """Top-level function that calls other functions."""
    damage = calculate_hit(attacker["power"], defender["armor"])
    defender["hp"] -= damage
    log_combat(attacker["name"], defender["name"], damage)
    return damage

def calculate_hit(power, armor):
    """Called BY attack_enemy — added to stack on top."""
    raw_damage = power * 1.5
    reduced = apply_armor(raw_damage, armor)  # Another call!
    return int(reduced)

def apply_armor(damage, armor_value):
    """Deepest in the stack — called by calculate_hit."""
    reduction = armor_value * 0.4
    return max(damage - reduction, 1)  # Minimum 1 damage

def log_combat(atk_name, def_name, dmg):
    """Logs the combat result."""
    print(f"{atk_name} hits {def_name} for {dmg} damage!")

# Demonstrating scope (local vs global)
player_name = "Shadow Knight"  # GLOBAL variable

def show_scope_example():
    local_var = "I only exist here"  # LOCAL variable
    print(player_name)    # Can READ global variables
    print(local_var)      # Can access local variables

show_scope_example()
# print(local_var)  # ERROR! local_var doesn't exist here

# Demonstrating pass by object reference
def add_item(inventory, item):
    """Lists are mutable — changes affect the original!"""
    inventory.append(item)  # Modifies the ORIGINAL list

player_inv = ["sword", "shield"]
add_item(player_inv, "potion")
print(player_inv)  # ['sword', 'shield', 'potion'] — changed!`,
    breakdown: `• attack_enemy calls calculate_hit calls apply_armor — This creates a call stack 3 levels deep. Python pauses attack_enemy to run calculate_hit, then pauses calculate_hit to run apply_armor. When apply_armor returns, calculate_hit resumes, then attack_enemy resumes.

• def calculate_hit(power, armor): — 'power' and 'armor' are LOCAL variables. They only exist while calculate_hit is running. They're destroyed when the function returns.

• return int(reduced) — Sends the value back to the line that called calculate_hit. The call stack frame for calculate_hit is then removed.

• player_name = "Shadow Knight" — Defined at the top level, this is a GLOBAL variable. Functions can READ it but shouldn't modify it directly.

• local_var = "I only exist here" — Created inside show_scope_example(), this variable is LOCAL. Once the function ends, it's gone. Trying to access it outside causes a NameError.

• print(player_name) inside the function — Works because Python's LEGB rule: it checks Local first (not found), then Enclosing (none), then Global (found!).

• def add_item(inventory, item): — 'inventory' receives a REFERENCE to the same list object as player_inv. It's not a copy!

• inventory.append(item) — Because lists are MUTABLE, this modifies the original object. player_inv outside the function sees the change.

• This is "pass by object reference" — the function can mutate mutable objects but cannot reassign the caller's variable to a different object.`,
    summary: `Functions work through the call stack — each call creates a new frame with its own local variables, executes, then returns a value and removes the frame. Python finds variables using the LEGB rule: Local → Enclosing → Global → Built-in. Arguments are passed by object reference: mutable objects (lists, dicts) can be modified inside functions, but immutable objects (numbers, strings) cannot be changed from the caller's perspective.`
  },
  {
    title: "Functions syntax & usage",
    definition: "Python functions are defined with the 'def' keyword, can accept positional parameters, default parameters, *args (variable positional), and **kwargs (variable keyword), and use 'return' to send values back to the caller.",
    explanation: `The basic syntax is: def function_name(parameters): followed by an indented body. The function name should be lowercase with underscores (snake_case). Parameters are comma-separated inside parentheses.

DEFAULT PARAMETERS let you make arguments optional. They're defined with = in the parameter list: def attack(weapon, multiplier=1.0). If the caller doesn't provide a multiplier, it defaults to 1.0. Important rule: default parameters must come AFTER required parameters.

*args and **kwargs are special syntax for variable-length arguments. *args collects extra positional arguments into a TUPLE. **kwargs collects extra keyword arguments into a DICTIONARY. These let you write flexible functions that accept any number of inputs — like print() does!

The RETURN statement exits the function immediately and sends a value back. You can return multiple values using tuples: return x, y, z. If a function has no return statement (or just 'return' with no value), it returns None.

DOCSTRINGS are triple-quoted strings right after the def line that document what the function does. TYPE HINTS annotate parameter types and return type: def heal(target: str, amount: int) -> int:. Type hints don't enforce types at runtime but help IDEs and developers understand your code.`,
    code: `# Basic function with type hints and docstring
def heal_player(current_hp: int, heal_amount: int, max_hp: int = 100) -> int:
    """Heal a player without exceeding max HP.
    
    Args:
        current_hp: Player's current health points.
        heal_amount: Amount of HP to restore.
        max_hp: Maximum allowed HP (default 100).
    
    Returns:
        New HP value after healing.
    """
    new_hp = min(current_hp + heal_amount, max_hp)
    return new_hp

# Using *args — variable number of positional arguments
def sum_damage(*hits: int) -> int:
    """Sum up all damage from multiple hits."""
    total = 0
    for hit in hits:  # hits is a tuple
        total += hit
    return total

result = sum_damage(10, 25, 8, 42)  # Pass any number of args
print(f"Total damage: {result}")     # Output: Total damage: 85

# Using **kwargs — variable keyword arguments
def create_character(name: str, **stats) -> dict:
    """Create a character with custom stats."""
    character = {"name": name, "level": 1}
    character.update(stats)  # Merge all keyword args
    return character

hero = create_character("Kira", strength=15, agility=12, magic=8)
print(hero)  # {'name': 'Kira', 'level': 1, 'strength': 15, ...}

# Returning multiple values (tuple unpacking)
def get_player_position() -> tuple[int, int, str]:
    """Return x, y coordinates and current zone."""
    x, y = 150, 320
    zone = "Dark Forest"
    return x, y, zone  # Returns a tuple

px, py, pzone = get_player_position()  # Unpack into variables
print(f"Player at ({px}, {py}) in {pzone}")`,
    breakdown: `• def heal_player(current_hp: int, heal_amount: int, max_hp: int = 100) -> int: — Type hints (: int) document expected types. -> int shows return type. max_hp = 100 is a default parameter.

• Triple-quoted docstring with Args/Returns sections — This is Google-style docstring format. Professional code always documents parameters and return values.

• return min(current_hp + heal_amount, max_hp) — Uses min() to cap healing at max HP. Elegant one-liner that replaces an if/else block.

• def sum_damage(*hits: int) -> int: — The asterisk * before 'hits' means "collect all extra positional arguments into a tuple called hits." You can pass 1, 5, or 100 arguments.

• for hit in hits: — Iterates over the tuple of all passed values. *args makes the function flexible — it works with any number of inputs.

• sum_damage(10, 25, 8, 42) — Four arguments, all collected into hits = (10, 25, 8, 42).

• def create_character(name: str, **stats) -> dict: — Double asterisk ** collects all extra KEYWORD arguments into a dictionary. So strength=15 becomes stats["strength"] = 15.

• character.update(stats) — Merges the kwargs dictionary into the character dictionary. Whatever keyword arguments you pass become key-value pairs.

• return x, y, zone — Returns multiple values as a tuple. Python lets you do this without explicitly writing tuple().

• px, py, pzone = get_player_position() — TUPLE UNPACKING. The three returned values are assigned to three variables in order. Count must match!`,
    summary: `Functions use 'def' keyword with snake_case names. Parameters can be required, have defaults (=value), collect extras (*args for positional, **kwargs for keyword). Return sends values back — you can return multiple values as tuples and unpack them. Docstrings document the function, type hints annotate types (both are optional but recommended). These tools let you write flexible, self-documenting functions.`
  },
  {
    title: "Practical examples of Functions",
    definition: "Functions shine in real applications like game development — from calculating combat damage to managing inventory, handling level-up mechanics, generating random loot, and saving game state.",
    explanation: `Let's build practical game functions that demonstrate how functions solve real problems. Each example shows a different aspect of function design: single-purpose logic, working with data structures, randomization, and file I/O.

A DAMAGE CALCULATOR function encapsulates complex combat math — base damage, weapon modifiers, elemental weaknesses, and random variation. Without a function, this logic would be scattered across your codebase and impossible to balance.

An INVENTORY MANAGER uses functions to add, remove, and search items. Each operation is its own function with clear inputs and outputs. This separation makes it easy to add new features (like item stacking or weight limits) without breaking existing code.

An XP LEVEL-UP SYSTEM demonstrates functions that reference game data (XP tables) and modify player state. The function calculates whether enough XP has been earned, what level the player reaches, and what rewards they get.

A LOOT GENERATOR shows functions with randomness — using Python's random module to create varied gameplay. The function takes parameters like enemy level and rarity weights to produce different drops each time.

A SAVE GAME function demonstrates functions that interact with external systems (file I/O). It takes the entire game state as input and persists it to disk, showing how functions can wrap complex operations behind a simple interface.`,
    code: `import random
import json

# 1. Damage Calculator — complex math in one clean function
def calculate_combat_damage(attacker: dict, defender: dict, 
                            is_critical: bool = False) -> dict:
    """Calculate full combat damage with modifiers."""
    base = attacker["strength"] * attacker["weapon_power"]
    defense_reduction = defender["armor"] * 0.5
    # Random variance: 85% to 115% of base damage
    variance = random.uniform(0.85, 1.15)
    raw_damage = (base - defense_reduction) * variance
    if is_critical:
        raw_damage *= 2.5
    final_damage = max(int(raw_damage), 1)
    return {"damage": final_damage, "critical": is_critical,
            "overkill": max(final_damage - defender["hp"], 0)}

# 2. Inventory Manager — clean item operations
def add_to_inventory(inventory: list, item: dict, 
                     max_slots: int = 20) -> bool:
    """Add item to inventory if space available."""
    if len(inventory) >= max_slots:
        print("Inventory full! Cannot add item.")
        return False
    inventory.append(item)
    print(f"Added {item['name']} to inventory.")
    return True

# 3. XP Level-Up System
def check_level_up(player: dict) -> dict:
    """Check if player has enough XP to level up."""
    xp_thresholds = [0, 100, 300, 600, 1000, 1500, 2200, 3000]
    current_level = player["level"]
    levels_gained = 0
    while (current_level + levels_gained < len(xp_thresholds) - 1 and
           player["xp"] >= xp_thresholds[current_level + levels_gained]):
        levels_gained += 1
    if levels_gained > 0:
        player["level"] += levels_gained
        player["hp"] += levels_gained * 10
        return {"leveled_up": True, "new_level": player["level"],
                "hp_gained": levels_gained * 10}
    return {"leveled_up": False, "new_level": current_level,
            "hp_gained": 0}

# 4. Loot Generator — randomized rewards
def generate_loot(enemy_level: int, luck_bonus: float = 0.0) -> dict:
    """Generate random loot based on enemy level."""
    rarities = ["common", "uncommon", "rare", "epic", "legendary"]
    weights = [60, 25, 10, 4, 1]
    # Luck shifts weights toward rarer items
    adjusted = [max(w - luck_bonus * 5, 1) if i < 2 
                else w + luck_bonus * 3 for i, w in enumerate(weights)]
    rarity = random.choices(rarities, weights=adjusted, k=1)[0]
    gold_drop = random.randint(enemy_level * 5, enemy_level * 15)
    return {"rarity": rarity, "gold": gold_drop, 
            "power": enemy_level * (rarities.index(rarity) + 1)}

# 5. Save Game Function — file I/O wrapped cleanly
def save_game(player: dict, filepath: str = "savegame.json") -> bool:
    """Save the complete game state to a JSON file."""
    try:
        save_data = {"player": player, "version": "1.0",
                     "timestamp": "2024-01-15"}
        with open(filepath, "w") as f:
            json.dump(save_data, f, indent=2)
        print(f"Game saved to {filepath}")
        return True
    except IOError as e:
        print(f"Save failed: {e}")
        return False`,
    breakdown: `• calculate_combat_damage — Takes attacker/defender dicts and returns a result dict. Encapsulates ALL damage logic: base calculation, defense reduction, random variance, critical multiplier, and minimum damage. One function, one responsibility.

• random.uniform(0.85, 1.15) — Produces a random float between 0.85 and 1.15. This creates damage variance so combat feels dynamic rather than predictable.

• return {"damage": ..., "critical": ..., "overkill": ...} — Returns a DICTIONARY with multiple named results. Cleaner than returning a tuple when you have 3+ values.

• add_to_inventory — Checks capacity before adding. Returns a BOOLEAN indicating success/failure, so calling code can react (show error message, etc.).

• check_level_up — Uses a while loop to handle multi-level jumps (if you gain massive XP). Modifies the player dict directly (mutable!) and returns info about what changed.

• xp_thresholds = [0, 100, 300, ...] — A lookup table inside the function. In a real game, this might come from a config file or database.

• generate_loot with random.choices — Uses WEIGHTED random selection. Common items have weight 60 (very likely), legendary has weight 1 (very rare). luck_bonus shifts these weights.

• save_game with try/except — Wraps file I/O in error handling. If writing fails (disk full, permissions), it catches the IOError and returns False instead of crashing.

• json.dump(save_data, f, indent=2) — Serializes the Python dict to a JSON file with pretty formatting. Functions hide this complexity behind a simple save_game(player) call.`,
    summary: `Real game functions demonstrate key principles: encapsulate complex logic (damage calculator), manage data structures (inventory), handle game mechanics (level-up), use randomization (loot generator), and wrap I/O safely (save game). Each function has clear inputs, does one job, handles edge cases, and returns useful results. This is how professional game code is organized — small, focused functions that compose into complex systems.`
  },
  {
    title: "Functions best practices",
    definition: "Writing good functions means following proven principles: each function should do one thing (single responsibility), have a clear descriptive name, avoid unexpected side effects, use type hints, include docstrings, and stay short enough to understand at a glance.",
    explanation: `The SINGLE RESPONSIBILITY PRINCIPLE means each function should do ONE thing and do it well. If you find yourself writing a function called "calculate_damage_and_update_inventory_and_save_game," that's three functions pretending to be one. Split them up.

DESCRIPTIVE NAMES are crucial. A function named 'do_stuff()' tells you nothing. A function named 'calculate_critical_hit_damage()' tells you everything. The name should describe WHAT the function does, not HOW. Good names eliminate the need for most comments.

SIDE EFFECTS are changes a function makes to things outside itself — modifying global variables, printing output, writing files, or changing mutable arguments. PURE FUNCTIONS have no side effects: same inputs always produce same outputs, and nothing else changes. Pure functions are easier to test, debug, and reuse. Minimize side effects wherever possible.

TYPE HINTS and DOCSTRINGS are your function's documentation. Type hints tell developers what types to pass and what to expect back. Docstrings explain WHY the function exists, what it does, and any important behavior. Together, they make your code self-documenting.

KEEP FUNCTIONS SHORT — ideally under 20 lines. If a function is getting long, it's probably doing too much and should be split. Short functions are easier to name, easier to test, and easier to understand. A function that fits on one screen can be understood at a glance.`,
    code: `# BAD: Function doing too many things
def process_combat_bad(player, enemy):
    # Calculates damage AND updates HP AND prints AND drops loot
    damage = player["atk"] - enemy["def"]
    enemy["hp"] -= damage
    print(f"Dealt {damage} damage!")
    if enemy["hp"] <= 0:
        player["xp"] += 50
        player["gold"] += 100
        print("Enemy defeated!")
    return damage

# GOOD: Single responsibility — each function does ONE thing
def calculate_raw_damage(attack: int, defense: int) -> int:
    """Calculate damage from attack and defense values."""
    return max(attack - defense, 0)

def apply_damage(target: dict, damage: int) -> bool:
    """Apply damage to target. Returns True if target is defeated."""
    target["hp"] -= damage
    return target["hp"] <= 0

def award_combat_rewards(player: dict, enemy_level: int) -> dict:
    """Award XP and gold for defeating an enemy."""
    xp_gain = enemy_level * 10
    gold_gain = enemy_level * 20
    player["xp"] += xp_gain
    player["gold"] += gold_gain
    return {"xp": xp_gain, "gold": gold_gain}

# GOOD: Pure function — no side effects, predictable
def calculate_spell_cost(base_cost: int, level: int, 
                         discount: float = 0.0) -> int:
    """Calculate mana cost of a spell. Pure function."""
    cost = base_cost + (level * 2)
    cost = int(cost * (1.0 - discount))
    return max(cost, 1)

# GOOD: Descriptive names that read like English
def is_player_alive(player: dict) -> bool:
    """Check if player still has health remaining."""
    return player["hp"] > 0

def has_enough_mana(player: dict, cost: int) -> bool:
    """Check if player can afford the mana cost."""
    return player["mana"] >= cost

def get_strongest_weapon(inventory: list) -> dict | None:
    """Find the weapon with highest power in inventory."""
    weapons = [item for item in inventory if item["type"] == "weapon"]
    if not weapons:
        return None
    return max(weapons, key=lambda w: w["power"])

# GOOD: Function with comprehensive docstring
def cast_spell(caster: dict, target: dict, spell: dict) -> dict:
    """Cast a spell from caster to target.
    
    Checks mana availability, calculates damage/healing based on
    spell type, and returns the result without modifying inputs.
    
    Args:
        caster: Dict with 'mana', 'magic_power' keys.
        target: Dict with 'hp', 'max_hp' keys.
        spell: Dict with 'cost', 'base_power', 'type' keys.
    
    Returns:
        Dict with 'success', 'effect_value', and 'message' keys.
    """
    if caster["mana"] < spell["cost"]:
        return {"success": False, "effect_value": 0,
                "message": "Not enough mana!"}
    power = spell["base_power"] + caster["magic_power"]
    if spell["type"] == "damage":
        return {"success": True, "effect_value": power,
                "message": f"Deals {power} magic damage!"}
    elif spell["type"] == "heal":
        heal = min(power, target["max_hp"] - target["hp"])
        return {"success": True, "effect_value": heal,
                "message": f"Restores {heal} HP!"}
    return {"success": False, "effect_value": 0,
            "message": "Unknown spell type."}`,
    breakdown: `• process_combat_bad — Does 4 things: calculates damage, updates HP, prints output, and awards rewards. Hard to test, hard to reuse. What if you want damage calculation WITHOUT printing?

• calculate_raw_damage — Does exactly ONE thing. Easy to test: assert calculate_raw_damage(25, 10) == 15. Pure function — no side effects, completely predictable.

• apply_damage — Clearly named, returns a useful boolean. The caller decides what to do when the target dies — this function doesn't assume.

• award_combat_rewards — Separated from damage calculation. You might want to award rewards from quests or events too — now you can reuse this function.

• calculate_spell_cost — A PURE FUNCTION. No matter how many times you call it with the same inputs, you get the same output. Nothing external changes. This is the gold standard.

• is_player_alive, has_enough_mana — These read like English. Code using them becomes: if is_player_alive(player) and has_enough_mana(player, cost). Self-documenting!

• get_strongest_weapon — Uses a list comprehension to filter, handles the empty case with None, and uses max() with a key function. Concise but readable.

• cast_spell docstring — Full Google-style documentation. Explains purpose, Args with descriptions, and Returns format. Any developer can use this function without reading the implementation.

• cast_spell returns dicts instead of modifying inputs — This avoids side effects. The CALLER decides whether to apply the result. This makes the function reusable for damage previews, AI planning, etc.`,
    summary: `Best practices make your functions professional: Single Responsibility (one job per function), descriptive names (read like English), minimize side effects (prefer pure functions that don't modify external state), use type hints (: int, -> bool), document with docstrings (explain what, why, and Args/Returns), and keep functions short (under 20 lines). Following these principles makes code that's easy to read, test, debug, and maintain — skills that separate hobbyists from professionals.`
  }
];
