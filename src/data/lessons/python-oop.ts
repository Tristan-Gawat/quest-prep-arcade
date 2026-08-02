// Pre-written full lessons for Python Module: Object-Oriented Programming
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonOOPLessons = [
  {
    title: "What is Object-Oriented Programming?",
    definition: "Object-Oriented Programming (OOP) is a paradigm where you model real-world entities as 'classes' (blueprints) and create 'objects' (instances) from them, bundling related data (attributes) and behavior (methods) together into cohesive units.",
    explanation: `Imagine you're building an RPG. You need warriors, mages, archers — each with health, mana, inventory, and abilities. Without OOP, you'd have scattered variables like warrior_hp, warrior_mana, mage_hp, mage_mana — chaos. OOP lets you create a 'Character' blueprint and stamp out as many characters as you need, each carrying their own data.

A CLASS is a blueprint — like the character creation screen in a game. It defines WHAT a character has (attributes like hp, name, level) and WHAT it can do (methods like attack, heal, level_up). An OBJECT is an actual character created from that blueprint — "Aria the Warrior" with 150 HP and a steel sword.

ATTRIBUTES are the data stored inside an object — think of them as stats on a character sheet. Name, health, strength, equipped weapon — these are all attributes. METHODS are functions that belong to the object — attack(), defend(), cast_spell(). They define what the object can DO.

Why does OOP exist? Because real-world problems involve ENTITIES that have state and behavior. A game has characters, items, spells, enemies — each with properties and actions. OOP lets you model these naturally. Instead of managing 50 loose variables, you have organized objects that manage their own state.

The four pillars of OOP are: ENCAPSULATION (bundling data and methods together, hiding internals), INHERITANCE (creating specialized classes from general ones), POLYMORPHISM (different objects responding to the same method differently), and ABSTRACTION (hiding complexity behind simple interfaces). These principles make large codebases manageable.`,
    code: `# A CLASS is a blueprint for creating objects
class Character:
    """Blueprint for all game characters."""
    
    def __init__(self, name, hp, strength):
        # ATTRIBUTES — data that belongs to each object
        self.name = name          # Instance attribute
        self.hp = hp              # Each object gets its own copy
        self.strength = strength
        self.inventory = []       # Every character starts with empty bag
    
    # METHODS — behavior that objects can perform
    def attack(self, target):
        """Deal damage to another character."""
        damage = self.strength * 2
        target.hp -= damage
        print(f"{self.name} strikes {target.name} for {damage} damage!")
    
    def is_alive(self):
        """Check if character still has health."""
        return self.hp > 0

# Creating OBJECTS (instances) from the blueprint
hero = Character("Aria", 100, 15)     # Object 1
goblin = Character("Goblin", 30, 5)   # Object 2

# Each object has its OWN data
print(f"{hero.name}: {hero.hp} HP")    # Aria: 100 HP
print(f"{goblin.name}: {goblin.hp} HP")  # Goblin: 30 HP

# Objects use methods to interact
hero.attack(goblin)          # Aria strikes Goblin for 30 damage!
print(f"Goblin HP: {goblin.hp}")  # Goblin HP: 0
print(f"Alive? {goblin.is_alive()}")  # Alive? False`,
    breakdown: `• class Character: — The CLASS keyword creates a blueprint. 'Character' is the class name (PascalCase by convention). Everything indented beneath belongs to this class.

• def __init__(self, name, hp, strength): — The CONSTRUCTOR method. Called automatically when you create a new object. It initializes the object's attributes. Every class needs one.

• self.name = name — 'self' refers to the SPECIFIC object being created. self.name stores the name ON that object. Without self, the variable would be local and lost after __init__ finishes.

• self.inventory = [] — Default attribute. Every new Character starts with an empty inventory list. Each object gets its OWN separate list.

• def attack(self, target): — A METHOD. The first parameter is always 'self' (the object calling the method). 'target' is another Character object passed as an argument.

• target.hp -= damage — Objects can modify OTHER objects' attributes. The hero's attack method reduces the goblin's HP directly.

• hero = Character("Aria", 100, 15) — INSTANTIATION. Creates a new object from the blueprint. Python calls __init__ automatically with these arguments.

• hero.attack(goblin) — Calling a method on an object. Python passes 'hero' as 'self' and 'goblin' as 'target' automatically.

• Each object is independent — hero.hp and goblin.hp are completely separate values stored in separate objects. Changing one never affects the other.`,
    summary: `OOP models entities as classes (blueprints) and objects (instances). Classes define attributes (data like HP, name) and methods (behavior like attack, heal). You create objects from classes using the constructor (__init__), and each object maintains its own independent state. The four pillars — encapsulation, inheritance, polymorphism, and abstraction — make OOP the dominant paradigm for organizing complex software like games.`
  },

  {
    title: "How Object-Oriented Programming works",
    definition: "When you create an object, Python calls the __init__ constructor to set up instance attributes via 'self', builds an inheritance chain linking child classes to parents, and uses Method Resolution Order (MRO) to determine which method to call when multiple classes are involved.",
    explanation: `The __init__ method is Python's constructor — it runs automatically every time you create a new object. Think of it as the character creation process: when you type hero = Warrior("Kael", 150), Python allocates memory for a new object, then calls __init__ to fill in that object's attributes. Without __init__, your objects would be empty shells.

The 'self' parameter is how an object refers to ITSELF. Every method's first parameter is self — it's the object that the method was called on. When you write hero.attack(enemy), Python translates that to Warrior.attack(hero, enemy) behind the scenes. Self is what connects methods to their specific object's data.

INSTANCE ATTRIBUTES belong to a specific object (self.hp = 150 — each character has their own HP). CLASS ATTRIBUTES belong to the class itself and are shared by ALL instances (game_version = "2.0" — same for every character). Instance attributes are defined in __init__ with self; class attributes are defined directly in the class body.

INHERITANCE creates a hierarchy: a Warrior IS-A Character, a FireMage IS-A Mage IS-A Character. The child class inherits ALL attributes and methods from its parent. It can then ADD new ones or OVERRIDE existing ones. super() calls the parent's version of a method — crucial in __init__ to ensure parent attributes are set up.

METHOD RESOLUTION ORDER (MRO) is Python's rule for finding methods in an inheritance chain. When you call warrior.attack(), Python searches: Warrior first → then Character → then object (base of everything). With multiple inheritance (class Paladin(Warrior, Healer)), MRO uses the C3 linearization algorithm to determine a consistent, predictable search order. You can check it with ClassName.__mro__.`,
    code: `class Character:
    """Base class — parent of all character types."""
    game_version = "2.0"  # CLASS attribute — shared by ALL instances
    
    def __init__(self, name, hp, mana=50):
        # INSTANCE attributes — unique to each object
        self.name = name
        self.hp = hp
        self.mana = mana
        self.level = 1
    
    def take_damage(self, amount):
        """Reduce HP by damage amount."""
        self.hp = max(self.hp - amount, 0)
        print(f"{self.name} takes {amount} damage! HP: {self.hp}")

class Warrior(Character):
    """Child class — inherits from Character."""
    
    def __init__(self, name, hp, weapon):
        # super() calls parent's __init__ to set up base attributes
        super().__init__(name, hp, mana=20)
        self.weapon = weapon        # New attribute only Warriors have
        self.rage = 0               # Warrior-specific resource
    
    def attack(self, target):
        """Override or add new behavior."""
        damage = 25 + self.rage
        self.rage += 5  # Rage builds with each attack
        target.take_damage(damage)  # Uses inherited method!
        print(f"{self.name} swings {self.weapon}! Rage: {self.rage}")

class Mage(Character):
    """Another child class with different specialization."""
    
    def __init__(self, name, hp, element):
        super().__init__(name, hp, mana=150)  # Mages get more mana
        self.element = element
    
    def cast_spell(self, target, cost=20):
        """Mage-specific method."""
        if self.mana >= cost:
            self.mana -= cost
            damage = 40
            target.take_damage(damage)
            print(f"{self.name} casts {self.element} bolt! Mana: {self.mana}")

# Creating objects from child classes
kael = Warrior("Kael", 150, "Greatsword")
luna = Mage("Luna", 80, "frost")

# MRO — Method Resolution Order
print(Warrior.__mro__)
# (<class 'Warrior'>, <class 'Character'>, <class 'object'>)

kael.attack(luna)         # Warrior's own method
kael.take_damage(10)      # INHERITED from Character — still works!
print(kael.game_version)  # CLASS attribute — shared: "2.0"

`,
    breakdown: `• game_version = "2.0" — A CLASS ATTRIBUTE defined in the class body (not in __init__). All Character instances share this single value. Access via self.game_version or Character.game_version.

• def __init__(self, name, hp, mana=50): — The CONSTRUCTOR. 'self' is the new object being created. Parameters after self become the initial data. mana=50 is a default — subclasses can override it.

• self.name = name — Stores 'name' as an INSTANCE ATTRIBUTE on this specific object. Each object created from this class gets its own self.name value.

• class Warrior(Character): — INHERITANCE syntax. Warrior inherits everything from Character. The parentheses indicate the parent class.

• super().__init__(name, hp, mana=20) — Calls the PARENT'S __init__. Essential! Without this, Warrior objects wouldn't have name, hp, mana, or level. super() navigates up the inheritance chain.

• self.weapon = weapon — Warrior adds its OWN attributes on top of what it inherits. Warriors have everything Characters have PLUS weapon and rage.

• self.rage += 5 — Instance attribute modified by a method. Each Warrior tracks their own rage independently.

• target.take_damage(damage) — Warrior's attack() calls a method inherited from Character. Child classes can freely use parent methods.

• Warrior.__mro__ — Shows the Method Resolution Order: Python searches Warrior → Character → object. If Warrior doesn't have a method, Python checks Character next.

• kael.take_damage(10) — Kael IS a Warrior, but take_damage is defined in Character. Python follows MRO: checks Warrior (not found) → checks Character (found!) → calls it.`,
    summary: `OOP works through constructors (__init__ initializes objects), self (connects methods to their object's data), inheritance (child classes inherit and extend parent classes), and MRO (Python's search order for finding methods). Instance attributes are unique per object; class attributes are shared. super() calls parent methods — essential in constructors to set up inherited attributes. MRO follows C3 linearization: searches the most specific class first, then parents in order.`
  },

  {
    title: "Object-Oriented Programming syntax & usage",
    definition: "Python's OOP syntax includes the 'class' keyword, __init__ constructor, self reference, inheritance with super(), @property decorators for controlled access, dunder methods (__str__, __repr__) for operator customization, and @classmethod/@staticmethod for alternative method types.",
    explanation: `The CLASS keyword followed by a name and optional parent creates a new type. Inside, you define methods (functions with 'self' as first parameter) and the __init__ constructor. Python uses indentation to show what belongs to the class — everything indented under 'class' is part of it.

INHERITANCE uses parentheses: class Mage(Character) means Mage inherits from Character. For multiple inheritance: class Paladin(Warrior, Healer). The super() function calls the parent's version of a method — most commonly used in __init__ to ensure parent attributes are initialized before adding child-specific ones.

@PROPERTY is a decorator that turns a method into a "fake attribute." Instead of directly accessing object.hp (which anyone could set to -9999), you create a property with a getter and setter. The getter controls how the value is READ, the setter controls how it's WRITTEN — letting you add validation. From outside, it still looks like a normal attribute: player.hp = 50.

DUNDER (double underscore) METHODS are special methods Python calls automatically in certain situations. __str__ is called by print() and str() — it defines how your object looks as a string. __repr__ is the "developer representation" shown in the console. __eq__ defines how == works. __lt__ defines how < works. These let your objects work with Python's built-in operators.

@CLASSMETHOD receives the class (cls) instead of an instance (self) — useful for alternative constructors like Character.from_save_file(). @STATICMETHOD receives neither self nor cls — it's just a regular function namespaced inside the class for organizational purposes. Use staticmethod for utility functions related to the class but not needing instance or class data.`,
    code: `class GameEntity:
    """Demonstrates full OOP syntax toolkit."""
    
    entity_count = 0  # Class attribute — tracks all entities
    
    def __init__(self, name: str, hp: int):
        self.name = name
        self._hp = hp            # Convention: _ means "private"
        self._max_hp = hp
        GameEntity.entity_count += 1
    
    @property
    def hp(self) -> int:
        """Getter — controls how HP is read."""
        return self._hp
    
    @hp.setter
    def hp(self, value: int):
        """Setter — validates before setting HP."""
        self._hp = max(0, min(value, self._max_hp))  # Clamp!
    
    def __str__(self) -> str:
        """Called by print() — user-friendly display."""
        return f"{self.name} [{self.hp}/{self._max_hp} HP]"
    
    def __repr__(self) -> str:
        """Called in console — developer representation."""
        return f"GameEntity('{self.name}', {self._hp})"
    
    def __eq__(self, other) -> bool:
        """Define how == works between entities."""
        return self.name == other.name and self.hp == other.hp
    
    @classmethod
    def from_dict(cls, data: dict):
        """Alternative constructor — create from dictionary."""
        return cls(data["name"], data["hp"])
    
    @staticmethod
    def calculate_xp_needed(level: int) -> int:
        """Utility — doesn't need self or cls."""
        return level * 100 + (level ** 2) * 10

# Using @property — looks like attribute access, has validation
dragon = GameEntity("Dragon", 500)
dragon.hp = 9999          # Setter clamps to max: stays 500
dragon.hp = -100          # Setter clamps to min: becomes 0
print(dragon)             # __str__: "Dragon [0/500 HP]"

# @classmethod as alternative constructor
save_data = {"name": "Phoenix", "hp": 200}
phoenix = GameEntity.from_dict(save_data)  # No instance needed!

# @staticmethod as utility
xp = GameEntity.calculate_xp_needed(5)  # 500 + 250 = 750
print(f"XP for level 5: {xp}")`,
    breakdown: `• self._hp = hp — The underscore prefix is a CONVENTION meaning "treat this as private." Python doesn't enforce privacy, but developers know not to access _hp directly.

• @property / def hp(self) — The @PROPERTY decorator turns the hp() method into a getter. Now you access it like an attribute: dragon.hp instead of dragon.get_hp(). Cleaner syntax!

• @hp.setter / def hp(self, value) — The SETTER runs whenever you assign to .hp. Here it CLAMPS the value between 0 and max_hp. This prevents invalid states like negative HP or HP exceeding maximum.

• max(0, min(value, self._max_hp)) — A clamping pattern: min ensures value doesn't exceed max, max ensures it doesn't go below 0. Elegant one-liner for range validation.

• def __str__(self) -> str: — Python calls this when you print() the object or convert with str(). Returns a human-friendly string like "Dragon [500/500 HP]".

• def __repr__(self) -> str: — Python calls this in the interactive console or debugger. Should return a string that could recreate the object: GameEntity('Dragon', 500).

• def __eq__(self, other) -> bool: — Defines the == operator. Without this, == checks if two variables point to the SAME object (identity). With it, you define equality by VALUE.

• @classmethod / def from_dict(cls, data): — Receives 'cls' (the class itself) instead of 'self'. Acts as an alternative constructor — creates instances from different input formats.

• @staticmethod / def calculate_xp_needed(level): — No self, no cls. Just a function living inside the class for organizational purposes. Called on the class directly.`,
    summary: `Python's OOP syntax includes: class keyword for blueprints, __init__ for construction, self for instance reference, inheritance via parentheses with super() for parent calls, @property for validated attribute access (getter/setter), dunder methods (__str__, __repr__, __eq__) for operator integration, @classmethod for alternative constructors (receives cls), and @staticmethod for utility functions (receives neither). These tools give you complete control over how objects are created, accessed, displayed, and compared.`
  },

  {
    title: "Practical examples of Object-Oriented Programming",
    definition: "OOP excels in game development — an RPG character system uses inheritance to create specialized classes (Warrior, Mage) from a base Character, inventory systems model items as objects, and game entity hierarchies organize complex worlds.",
    explanation: `Let's build a real RPG character system. The base Character class holds universal attributes — every character has a name, HP, and level. Specialized classes like Warrior and Mage INHERIT from Character and add their own abilities. A Warrior has rage and melee attacks; a Mage has mana and spells. This hierarchy avoids duplicating shared code while allowing each class to be unique.

The INVENTORY SYSTEM models items as objects. An Item base class defines name, weight, and value. Subclasses like Weapon, Armor, and Potion add specific attributes — a Weapon has damage and attack speed, Armor has defense rating, a Potion has an effect when consumed. Each item knows how to describe itself via __str__.

A GAME ENTITY HIERARCHY organizes everything in the game world. Entity is the root — anything that exists in the world. From it descend Character (things that act), Prop (things that exist but don't act), and Projectile (things that move). Characters split further into Player and NPC. This tree structure means code that works on any Entity automatically works on Players, NPCs, Props, and Projectiles.

The power of this approach: when you add a new character type (say, Ranger), you inherit from Character, add bow-specific methods, and EVERYTHING ELSE works automatically — the combat system, inventory, save/load, rendering. You write minimal new code and get maximum functionality.

This pattern scales to professional games. Unity uses GameObjects with Components. Unreal uses Actor hierarchies. The same OOP principles apply whether you're making a text RPG or a AAA title — organize entities into hierarchies, share common behavior through inheritance, specialize through overrides.`,
    code: `class Character:
    """Base class for all characters in the RPG."""
    
    def __init__(self, name, hp, strength, defense):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.strength = strength
        self.defense = defense
        self.level = 1
        self.inventory = []
    
    def attack(self, target):
        """Base attack — can be overridden by subclasses."""
        damage = max(self.strength - target.defense, 1)
        target.hp = max(target.hp - damage, 0)
        return damage
    
    def __str__(self):
        return f"[Lv.{self.level}] {self.name} — {self.hp}/{self.max_hp} HP"

class Warrior(Character):
    """Melee specialist with rage mechanic."""
    
    def __init__(self, name):
        super().__init__(name, hp=200, strength=25, defense=15)
        self.rage = 0
    
    def attack(self, target):
        """OVERRIDE — Warriors gain rage and hit harder."""
        self.rage = min(self.rage + 10, 100)
        bonus = self.rage // 10
        damage = max(self.strength + bonus - target.defense, 1)
        target.hp = max(target.hp - damage, 0)
        return damage

class Mage(Character):
    """Ranged caster with mana and spells."""
    
    def __init__(self, name, element="fire"):
        super().__init__(name, hp=100, strength=10, defense=5)
        self.mana = 200
        self.element = element
    
    def cast_spell(self, target, spell_power=40):
        """Mage-specific ability — ignores armor!"""
        if self.mana >= 30:
            self.mana -= 30
            target.hp = max(target.hp - spell_power, 0)
            return spell_power
        return 0  # Not enough mana

# Inventory item classes
class Item:
    """Base item class for all inventory objects."""
    def __init__(self, name, value, weight):
        self.name = name
        self.value = value
        self.weight = weight
    def __str__(self):
        return f"{self.name} (Value: {self.value}g, Weight: {self.weight})"

class Weapon(Item):
    """Equippable weapon with damage stats."""
    def __init__(self, name, value, weight, damage, speed):
        super().__init__(name, value, weight)
        self.damage = damage
        self.speed = speed

class Potion(Item):
    """Consumable with an effect."""
    def __init__(self, name, value, heal_amount):
        super().__init__(name, value, weight=0.5)
        self.heal_amount = heal_amount
    
    def use(self, target):
        """Consume potion to heal target."""
        target.hp = min(target.hp + self.heal_amount, target.max_hp)
        return self.heal_amount

# Building the game world
kael = Warrior("Kael")
luna = Mage("Luna", element="frost")
sword = Weapon("Flame Blade", 500, 3.0, damage=35, speed=1.2)
potion = Potion("Greater Heal", 50, heal_amount=75)

kael.inventory.append(sword)
kael.inventory.append(potion)
print(kael)  # [Lv.1] Kael — 200/200 HP
print(sword) # Flame Blade (Value: 500g, Weight: 3.0)

`,
    breakdown: `• class Character — The BASE class containing everything common to all characters: name, hp, strength, defense, level, inventory. Write shared code once here.

• def attack(self, target) in Character — A DEFAULT implementation. Subclasses can override this with their own version. Base version: simple strength minus defense.

• class Warrior(Character) — Inherits ALL of Character's attributes and methods. Warrior IS-A Character with extra capabilities (rage mechanic).

• super().__init__(name, hp=200, strength=25, defense=15) — Calls Character's __init__ with Warrior-specific stats. Warriors are tanky: 200 HP, 25 strength, 15 defense. Super ensures base attributes are set up.

• def attack(self, target) in Warrior — OVERRIDES the parent's attack method. Same name, different behavior. When kael.attack() is called, Python finds this version first (MRO).

• self.rage = min(self.rage + 10, 100) — Warrior-specific mechanic. Rage builds up to max 100, adding bonus damage. Unique to Warriors — Mages don't have this.

• class Mage(Character) — Different specialization: low HP (100), high mana (200), element-based. Shows how inheritance creates varied character types from one base.

• def cast_spell — A method that ONLY Mages have. Warriors can't cast spells. This is specialization through addition — adding new methods in subclasses.

• class Item / class Weapon(Item) / class Potion(Item) — A SECOND hierarchy for game items. Weapon and Potion inherit from Item, adding their own attributes (damage/speed for Weapon, heal_amount for Potion).

• def use(self, target) in Potion — Polymorphic behavior: different item types do different things when "used." A Potion heals, a Scroll might cast a spell. Same interface, different implementations.`,
    summary: `A real RPG system demonstrates OOP's power: Character as a base class with Warrior and Mage as specialized subclasses sharing common code but adding unique mechanics (rage, spellcasting). Item hierarchies (Item → Weapon/Potion) model inventory objects with shared attributes and specialized behavior. Each class has a single clear purpose, inheritance eliminates code duplication, and method overriding lets subclasses customize behavior while maintaining a consistent interface.`
  },

  {
    title: "Object-Oriented Programming best practices",
    definition: "Professional OOP follows key principles: favor composition over deep inheritance, give each class a single responsibility, use @property for validation, keep inheritance hierarchies shallow (2-3 levels max), and use Abstract Base Classes (ABC) to define interfaces that subclasses must implement.",
    explanation: `COMPOSITION OVER INHERITANCE is the most important OOP principle professionals learn. Instead of making a FlyingFireWarrior by inheriting from Flying, Fire, AND Warrior (multiple inheritance nightmare), you COMPOSE behaviors: give a character a movement_strategy object, an element object, and a combat_style object. Swap them at runtime! A warrior can pick up a fire enchantment without changing their class.

SINGLE RESPONSIBILITY means each class should have ONE reason to change. A Character class handles character state and behavior — it should NOT also handle saving to disk, rendering to screen, or networking. Those are separate responsibilities that belong in SaveManager, Renderer, and NetworkClient classes. When you violate this, changes to save logic break character logic.

@PROPERTY FOR VALIDATION prevents invalid state. Never let external code directly set critical attributes — use @property setters to validate. HP should never be negative or exceed max. Level should never decrease. Gold should never go below zero. Properties are your guardrails against bugs.

KEEP INHERITANCE SHALLOW — 2 to 3 levels maximum. Deep hierarchies (Entity → Character → PlayableCharacter → MeleeCharacter → SwordUser → Warrior → FireWarrior) become impossible to understand and modify. Each level adds complexity. If you find yourself going deeper than 3 levels, switch to composition.

ABSTRACT BASE CLASSES (ABC) define interfaces — they declare WHAT methods a class must have without implementing them. If you create an abstract class Combatant with an abstract attack() method, any subclass that doesn't implement attack() will raise an error. This creates contracts: "if it's a Combatant, it's GUARANTEED to have an attack method."`,
    code: `from abc import ABC, abstractmethod

# ABC — defines an interface (contract)
class Combatant(ABC):
    """Abstract class — cannot be instantiated directly."""
    
    @abstractmethod
    def attack(self, target) -> int:
        """All Combatants MUST implement this."""
        pass
    
    @abstractmethod
    def get_power(self) -> int:
        """All Combatants MUST provide their power level."""
        pass

# COMPOSITION — attach behaviors instead of inheriting them
class MovementStyle:
    """Composable movement behavior."""
    def __init__(self, speed: int, can_fly: bool = False):
        self.speed = speed
        self.can_fly = can_fly

class ElementalAffinity:
    """Composable elemental power."""
    def __init__(self, element: str, bonus_damage: int):
        self.element = element
        self.bonus_damage = bonus_damage

class Fighter(Combatant):
    """Uses COMPOSITION for flexible behavior."""
    
    def __init__(self, name: str, base_power: int):
        self.name = name
        self._base_power = base_power
        self._hp = 100
        self._max_hp = 100
        # COMPOSITION — plug in behaviors as objects!
        self.movement = MovementStyle(speed=5)
        self.element = None  # Can add element later!
    
    @property
    def hp(self) -> int:
        return self._hp
    
    @hp.setter
    def hp(self, value: int):
        """VALIDATION — HP always stays in valid range."""
        self._hp = max(0, min(value, self._max_hp))
    
    def get_power(self) -> int:
        """Implementation of abstract method."""
        bonus = self.element.bonus_damage if self.element else 0
        return self._base_power + bonus
    
    def attack(self, target) -> int:
        """Implementation of abstract method."""
        damage = self.get_power()
        target.hp -= damage
        return damage
    
    def enchant(self, element: ElementalAffinity):
        """COMPOSITION — add fire/ice/etc at runtime!"""
        self.element = element

# Single Responsibility — SaveManager handles ONLY saving
class SaveManager:
    """Separate class for save/load — not Fighter's job."""
    
    @staticmethod
    def save(fighter: Fighter, filepath: str):
        """Save fighter state to file."""
        data = {"name": fighter.name, "hp": fighter.hp}
        print(f"Saving {fighter.name} to {filepath}")

# Usage — composition lets you change behavior at runtime!
knight = Fighter("Kael", base_power=20)
knight.enchant(ElementalAffinity("fire", bonus_damage=15))
print(knight.get_power())  # 35 — base 20 + fire 15

# Swap element without changing the class!
knight.enchant(ElementalAffinity("ice", bonus_damage=10))
print(knight.get_power())  # 30 — base 20 + ice 10

# knight = Combatant()  # ERROR! Can't instantiate abstract class`,
    breakdown: `• class Combatant(ABC) — An ABSTRACT BASE CLASS. You cannot create a Combatant() object directly. It only exists to define what methods subclasses must have.

• @abstractmethod / def attack — Any class inheriting from Combatant MUST implement attack(). Forgetting to implement it raises TypeError at instantiation. This is a CONTRACT.

• class MovementStyle / class ElementalAffinity — COMPOSABLE BEHAVIORS. Instead of inheriting from FlyingMixin or FireMixin, you create behavior OBJECTS and attach them. Much more flexible.

• self.movement = MovementStyle(speed=5) — COMPOSITION in action. The Fighter HAS-A movement style rather than IS-A moving thing. You can swap it: self.movement = MovementStyle(speed=10, can_fly=True).

• self.element = None — Starts without an element. COMPOSITION allows adding capabilities at runtime — inheritance is fixed at class definition time.

• @hp.setter with validation — Clamps HP between 0 and max_hp. External code can write knight.hp = -500 and get 0. This prevents impossible states without ugly error-checking everywhere.

• def enchant(self, element) — Changes the fighter's element by swapping the composed object. With inheritance, you'd need a whole new class (FireKnight, IceKnight). With composition, just swap the object!

• class SaveManager — SINGLE RESPONSIBILITY. Saving is not a Fighter's job. Separating concerns means you can change save format without touching combat code.

• @staticmethod in SaveManager — Save doesn't need a SaveManager instance, just the utility function. Static method keeps it organized under the class namespace.`,
    summary: `Professional OOP best practices: use composition over inheritance (attach behavior objects you can swap at runtime instead of creating deep class hierarchies), give each class a single responsibility (Fighter fights, SaveManager saves), use @property setters for validation (prevent invalid state), keep inheritance to 2-3 levels max, and use Abstract Base Classes to define interfaces that guarantee subclasses implement required methods. These principles create flexible, maintainable code that scales.`
  }
];
