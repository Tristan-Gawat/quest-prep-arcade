// Pre-written full lessons for JavaScript: Classes & OOP
// Each sub-lesson has: title, definition, explanation, code, breakdown, summary

export const jsClassesOOPLessons = [
  {
    title: "What is Classes & OOP?",
    definition: "Object-Oriented Programming (OOP) is a paradigm where you organize code into 'objects' — bundles of related data (properties) and behavior (methods). Classes are blueprints for creating these objects with consistent structure.",
    explanation: `Think of a class like a character creation template in an RPG. The template defines what properties every character has (name, health, level, class) and what actions they can perform (attack, defend, heal). Each actual character you create from that template is an "instance" — a real object with specific values.

OOP has been a dominant programming paradigm for decades because it mirrors how we naturally think about the world. A "Sword" has properties (damage, weight, rarity) and behaviors (swing, enchant). A "Player" has properties (name, HP, inventory) and behaviors (move, attack, useItem). By modeling your code this way, it becomes intuitive and organized.

JavaScript's class syntax (introduced in ES6) is syntactic sugar over its prototype-based inheritance system. Under the hood, JavaScript uses prototypes — objects that other objects can delegate to for shared behavior. Classes give us a cleaner, more familiar syntax for defining these relationships without manually wiring up prototypes.

The four pillars of OOP are Encapsulation (bundling data and methods, hiding internals), Abstraction (exposing simple interfaces, hiding complexity), Inheritance (creating new classes based on existing ones), and Polymorphism (different objects responding to the same method call in different ways).

In game development, OOP shines: you might have a base Entity class, with Character, Enemy, and NPC inheriting from it. Each adds specialized behavior while sharing common properties like position, health, and render methods. This eliminates code duplication and makes your codebase scalable.`,
    code: `// A class is a blueprint — like a character creation screen
class GameCharacter {
  // Constructor runs when you create a new instance
  constructor(name, role, level = 1) {
    this.name = name;       // Instance property
    this.role = role;
    this.level = level;
    this.hp = level * 100;  // Calculated property
    this.maxHp = this.hp;
    this.isAlive = true;
  }

  // Method — an action the character can perform
  attack(target) {
    const damage = this.level * 10 + Math.floor(Math.random() * 20);
    console.log(\`\${this.name} attacks \${target.name} for \${damage} damage!\`);
    target.takeDamage(damage);
    return damage;
  }

  // Another method
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    console.log(\`\${this.name} has \${this.hp}/\${this.maxHp} HP remaining\`);
    if (this.hp === 0) {
      this.isAlive = false;
      console.log(\`\${this.name} has been defeated!\`);
    }
  }
}

// Creating instances — actual characters from the blueprint
const hero = new GameCharacter("Aria", "Mage", 5);
const enemy = new GameCharacter("Goblin", "Monster", 2);
hero.attack(enemy); // "Aria attacks Goblin for XX damage!"`,
    breakdown: `Let's dissect the class structure:

• class GameCharacter { ... } — Declares a class. The name is conventionally PascalCase (every word capitalized). The curly braces contain all the class's members.

• constructor(name, role, level = 1) — Special method called automatically when you use "new GameCharacter(...)". Parameters become the initial data. "level = 1" is a default parameter.

• this.name = name — "this" refers to the specific instance being created. Each character gets its own name, role, etc. "this" is like saying "MY name" from the character's perspective.

• this.hp = level * 100 — You can calculate properties from other values. A level 5 character gets 500 HP.

• attack(target) { ... } — A method definition. No "function" keyword needed inside classes. Methods can accept parameters (here, another character object).

• const damage = this.level * 10 + Math.floor(Math.random() * 20) — Uses the instance's own level to calculate damage, plus a random bonus (0-19).

• target.takeDamage(damage) — Calling a method on another object. "target" is another GameCharacter instance, so it has takeDamage too.

• Math.max(0, this.hp - amount) — Prevents HP from going below 0. Math.max returns the larger of the two values.

• const hero = new GameCharacter("Aria", "Mage", 5) — The "new" keyword creates an instance, calls the constructor with these arguments, and returns the new object.`,
    summary: `Classes are blueprints for creating objects with consistent structure. The constructor initializes properties when an instance is created with "new". Methods define actions that instances can perform. Each instance has its own copy of properties but shares method definitions — making code organized, reusable, and intuitive.`
  },
  {
    title: "How Classes & OOP works",
    definition: "Inheritance lets you create new classes based on existing ones using 'extends'. The child class inherits all properties and methods from the parent, and can add new ones or override existing behavior with its own implementation.",
    explanation: `Inheritance is like a skill tree in an RPG. You start with a base class (Adventurer) that has basic abilities everyone shares. When you specialize into a subclass (Warrior, Mage, Rogue), you keep all the base abilities but gain new specialized ones. A Warrior inherits the base "move" and "speak" methods but adds "shieldBash" and overrides "attack" to use strength instead of magic.

The "extends" keyword creates this parent-child relationship. The child class (also called subclass or derived class) automatically gets everything from the parent (superclass/base class). You can then add new methods, add new properties, or override parent methods with specialized behavior.

The "super" keyword is your connection to the parent class. In the constructor, super() calls the parent's constructor to set up inherited properties. In methods, super.methodName() calls the parent's version of an overridden method — useful when you want to extend behavior rather than completely replace it.

JavaScript uses "prototypal inheritance" under the hood. When you access a property or method on an object, JavaScript first looks on the object itself. If not found, it looks at the object's prototype, then the prototype's prototype, and so on up the "prototype chain" until it finds it or reaches null. Classes provide clean syntax for building these chains.

Method overriding is a form of polymorphism — a Warrior and Mage both have an "attack" method, but each implements it differently. Code that works with the base Character class can call .attack() on any character and get the appropriate specialized behavior. This makes your code flexible and extensible.`,
    code: `// Base class — shared functionality for all characters
class Character {
  constructor(name, hp, mana) {
    this.name = name;
    this.hp = hp;
    this.mana = mana;
    this.buffs = [];
  }

  // Base attack — can be overridden by subclasses
  attack(target) {
    const damage = 10;
    console.log(\`\${this.name} attacks \${target.name} for \${damage} damage\`);
    return damage;
  }

  heal(amount) {
    this.hp += amount;
    console.log(\`\${this.name} heals for \${amount}. HP: \${this.hp}\`);
  }
}

// Warrior extends Character — inherits everything, adds more
class Warrior extends Character {
  constructor(name) {
    super(name, 200, 50); // Call parent constructor
    this.armor = 15;       // New property specific to Warriors
    this.rage = 0;
  }

  // Override parent's attack with specialized version
  attack(target) {
    this.rage += 10;
    const damage = 25 + this.rage;
    console.log(\`\${this.name} swings sword for \${damage} damage! Rage: \${this.rage}\`);
    return damage;
  }

  // New method only Warriors have
  shieldBlock() {
    console.log(\`\${this.name} raises shield! Armor +10 for 3 turns\`);
    this.armor += 10;
  }
}

const tank = new Warrior("Thorin");
tank.attack({ name: "Dragon" });  // Uses Warrior's override
tank.heal(50);                     // Inherited from Character
tank.shieldBlock();                // Warrior-specific`,
    breakdown: `Let's trace through inheritance:

• class Character { ... } — The base/parent class. Contains properties and methods shared by ALL character types.

• class Warrior extends Character — "extends" creates inheritance. Warrior IS-A Character, meaning it inherits ALL of Character's properties and methods.

• super(name, 200, 50) — MUST be called first in a child constructor. This calls Character's constructor with (name, 200, 50), setting up this.name, this.hp, and this.mana on the Warrior instance.

• this.armor = 15 — Added AFTER super(). Warriors get properties that regular Characters don't have. You must call super() before using "this" in a child constructor.

• this.rage = 0 — Another Warrior-specific property. Mages won't have this; they might have "spellPower" instead.

• attack(target) in Warrior — This OVERRIDES the parent's attack method. When a Warrior attacks, this version runs instead of Character's. The method signature matches the parent's.

• this.rage += 10 — The Warrior's attack builds rage over time, making subsequent attacks stronger. This is specialized behavior.

• shieldBlock() — A brand new method that ONLY exists on Warriors. Calling it on a base Character would throw an error.

• tank.heal(50) — Warrior didn't define heal(), so JavaScript looks up the prototype chain and finds it on Character. Inheritance in action!

• tank.attack({ name: "Dragon" }) — Calls Warrior's overridden version, not Character's. The closest method in the chain wins.`,
    summary: `Inheritance with "extends" creates parent-child class relationships where children inherit all parent functionality. The "super" keyword connects to the parent — super() in constructors, super.method() in overrides. Children can add new properties/methods and override existing ones for specialized behavior, while still having access to inherited methods.`
  },
  {
    title: "Classes & OOP syntax & usage",
    definition: "Getters and setters provide controlled access to object properties, static methods belong to the class itself rather than instances, and private fields (#) enforce true encapsulation by preventing external access to internal data.",
    explanation: `Getters and setters are like shop NPCs in a game — they control how you access and modify inventory. Instead of reaching directly into a chest and potentially breaking things, you interact through a controlled interface. A getter runs when you READ a property, and a setter runs when you WRITE to it. This lets you add validation, computation, or side effects.

Static methods belong to the class itself, not to any instance. Think of them as guild-wide announcements versus personal messages. You call them on the class (GameCharacter.create()) not on an instance (hero.create()). They're perfect for utility functions, factory methods, and operations that don't need specific instance data.

Private fields (prefixed with #) are truly private — they can only be accessed from within the class body. Before this feature, JavaScript developers used conventions like underscore prefixes (_health) to signal "don't touch this," but nothing actually prevented access. The # prefix makes it a hard language-level restriction: accessing #health from outside throws an error.

These three features together enable proper encapsulation — the first pillar of OOP. You expose a clean public interface (getters/setters, public methods) while hiding implementation details (private fields). If you later change how health is stored internally, external code doesn't break because it only interacts through your controlled interface.

Using instanceof, you can check whether an object was created from a particular class or its parent classes. This is useful for type-checking in functions that accept different character types and need to behave differently based on what they receive.`,
    code: `class Player {
  // Private fields — cannot be accessed outside the class
  #health;
  #maxHealth;
  #gold;

  static playerCount = 0; // Shared across ALL instances

  constructor(name, maxHealth, startingGold) {
    this.name = name;
    this.#health = maxHealth;
    this.#maxHealth = maxHealth;
    this.#gold = startingGold;
    Player.playerCount++; // Access static via class name
  }

  // Getter — runs when you READ player.health
  get health() {
    return \`\${this.#health}/\${this.#maxHealth}\`;
  }

  // Setter — runs when you WRITE player.health = value
  set health(value) {
    if (value < 0) this.#health = 0;
    else if (value > this.#maxHealth) this.#health = this.#maxHealth;
    else this.#health = value;
  }

  get gold() { return this.#gold; }

  // Static method — called on the class, not instances
  static createRandomHero() {
    const names = ["Aria", "Kael", "Luna", "Zeph"];
    const name = names[Math.floor(Math.random() * names.length)];
    return new Player(name, 100, 50);
  }
}

const p1 = Player.createRandomHero();  // Static method call
console.log(p1.health);       // Getter: "100/100"
p1.health = -50;              // Setter: clamps to 0
console.log(p1.health);       // "0/100"
console.log(Player.playerCount); // 1 — static property
// console.log(p1.#health);   // SyntaxError! Private field`,
    breakdown: `Let's examine each OOP feature:

• #health; #maxHealth; #gold; — Private field declarations. The # prefix makes these truly inaccessible from outside the class. They MUST be declared at the top of the class body.

• static playerCount = 0 — A static property belongs to the CLASS, not any instance. All players share this single counter. Accessed via Player.playerCount, never via this.playerCount in instance methods.

• Player.playerCount++ — In the constructor, we increment the class-level counter. Every new Player bumps this shared value.

• get health() { return ... } — A getter looks like a method but is accessed like a property: p1.health (no parentheses). It computes and returns a value on-the-fly.

• \`\${this.#health}/\${this.#maxHealth}\` — The getter formats the private values into a readable string. External code sees "100/100" without knowing the internal storage details.

• set health(value) { ... } — A setter intercepts assignment: p1.health = -50 triggers this. We validate/clamp the value before storing it in the private field.

• if (value < 0) this.#health = 0 — Validation logic. The setter prevents invalid states (negative health). External code can't bypass this by accessing #health directly.

• static createRandomHero() — A factory method. Called as Player.createRandomHero(), it encapsulates the logic for creating a Player with random attributes.

• return new Player(name, 100, 50) — Static methods can create instances. This is the "Factory Pattern" — hiding construction complexity behind a simple interface.

• p1.#health — Would throw SyntaxError. Private fields are enforced at the language level, not just convention.`,
    summary: `Getters and setters provide controlled property access with validation. Static methods/properties belong to the class itself for shared utilities and factory patterns. Private fields (#) enforce true encapsulation, preventing external code from accessing or corrupting internal state. Together, these features create robust, well-encapsulated classes.`
  },
  {
    title: "Practical examples of Classes & OOP",
    definition: "Real-world OOP combines inheritance hierarchies, composition, and polymorphism to build complex systems from simple, reusable parts — like assembling a game engine from individual components that interact through well-defined interfaces.",
    explanation: `Let's build a practical mini-system that demonstrates OOP in action. Imagine an inventory system for an RPG — you have different item types (weapons, potions, armor), each with shared base behavior but unique properties and effects. This is where OOP shines: one base Item class, multiple specialized subclasses, and a container (Inventory) that can hold any of them.

Polymorphism means "many forms" — the same method name behaves differently based on the actual object type. Your inventory's "useItem" method doesn't need to know whether it's using a potion or equipping armor; it just calls item.use(player) and each item type handles it appropriately. This makes your code extensible: add new item types without modifying existing code.

The instanceof operator checks an object's type at runtime. You can use it to apply type-specific logic: "if this item instanceof Weapon, show damage stats; if instanceof Potion, show healing amount." This is useful for UI rendering and conditional behavior.

Composition (having objects contain other objects) is often preferred over deep inheritance chains. Instead of Warrior extends Character extends Entity extends GameObject, you might have a Character with separate Inventory, Stats, and Equipment objects. This is the principle "favor composition over inheritance."

This approach models real game architectures. Unity uses a Component system, and many modern frameworks prefer this flat, composable structure over deep class hierarchies. However, moderate inheritance (2-3 levels) combined with composition gives you the best of both worlds.`,
    code: `// Base class for all game items
class Item {
  constructor(name, rarity, value) {
    this.name = name;
    this.rarity = rarity; // "common", "rare", "legendary"
    this.value = value;
  }

  // Base use method — overridden by subclasses
  use(player) {
    console.log(\`\${player.name} examines \${this.name}...\`);
  }

  describe() {
    return \`[\${this.rarity.toUpperCase()}] \${this.name} — Worth \${this.value} gold\`;
  }
}

class Weapon extends Item {
  constructor(name, rarity, value, damage, element) {
    super(name, rarity, value);
    this.damage = damage;
    this.element = element;
  }

  use(player) {
    player.equippedWeapon = this;
    console.log(\`\${player.name} equips \${this.name} (\${this.damage} \${this.element} dmg)\`);
  }
}

class Potion extends Item {
  constructor(name, healAmount) {
    super(name, "common", 25);
    this.healAmount = healAmount;
  }

  use(player) {
    player.hp = Math.min(player.hp + this.healAmount, player.maxHp);
    console.log(\`\${player.name} drinks \${this.name}! +\${this.healAmount} HP\`);
  }
}

// Polymorphism in action — same method, different behavior
const inventory = [
  new Weapon("Frostbite Blade", "legendary", 500, 45, "ice"),
  new Potion("Greater Healing Potion", 75),
  new Weapon("Iron Dagger", "common", 30, 12, "physical"),
];

const hero = { name: "Aria", hp: 50, maxHp: 100, equippedWeapon: null };
inventory.forEach((item) => item.use(hero)); // Each behaves differently!`,
    breakdown: `Let's trace through the polymorphic system:

• class Item { ... } — Abstract-like base class. Defines the shared interface (use, describe) and common properties (name, rarity, value) for all items.

• use(player) in Item — Base implementation. Subclasses override this with specific behavior. This is the polymorphic method.

• class Weapon extends Item — Specialized item with damage and element properties. Adds weapon-specific behavior to the base Item structure.

• super(name, rarity, value) — Calls Item's constructor to set up the shared properties. Then adds Weapon-specific ones (damage, element).

• use(player) in Weapon — Overrides Item's use(). Equipping a weapon assigns it to the player. Same method name, completely different behavior.

• class Potion extends Item — Another specialization. Potions have healAmount and restore HP when used.

• super(name, "common", 25) — Potions hardcode rarity and value. Not all constructor parameters need to come from the caller.

• player.hp = Math.min(player.hp + this.healAmount, player.maxHp) — Caps healing at max HP. Potion's use() heals instead of equipping.

• const inventory = [...] — An array holding different item TYPES together. They share the Item interface, so we can treat them uniformly.

• inventory.forEach((item) => item.use(hero)) — POLYMORPHISM: same method call, different behavior based on actual type. The forEach doesn't know or care whether each item is a Weapon or Potion.

• instanceof checks — You could do: if (item instanceof Weapon) to apply type-specific logic when needed.`,
    summary: `Polymorphism lets different object types respond to the same method call with their own behavior. A base class defines the interface, subclasses provide specialized implementations. This enables collections of mixed types that can be processed uniformly, making code extensible — add new item types without changing existing code.`
  },
  {
    title: "Classes & OOP best practices",
    definition: "OOP best practices include keeping classes focused (Single Responsibility), favoring composition over deep inheritance, using meaningful naming conventions, and leveraging design patterns to solve common architectural challenges.",
    explanation: `The SOLID principles are the gold standard for OOP design. The first and most important is the Single Responsibility Principle (SRP): each class should have one reason to change. A Character class should handle character state and behavior, NOT save game files, render sprites, AND manage network connections. If you find a class doing too many things, split it up.

Keep inheritance hierarchies shallow — ideally no more than 2-3 levels deep. Deep inheritance chains become brittle: changing the base class can break descendants in unexpected ways. If you find yourself making a class just to inherit from it (with no other use), that's a code smell. Use composition instead: give a Character an Inventory object rather than having Inventory extend Character.

The "favor composition over inheritance" principle says: instead of "is-a" relationships (Warrior IS-A Character IS-A Entity), prefer "has-a" relationships (Character HAS-A weapon, HAS-A inventory, HAS-A set of abilities). This is more flexible because you can mix and match components at runtime.

Always use instanceof checks sparingly. If you find yourself constantly checking types to determine behavior, you probably need better polymorphism — let each subclass define its own behavior through method overrides rather than external type-checking.

Finally, use meaningful names and consistent patterns. A class called "Manager" or "Handler" often violates SRP. Methods should be verbs (attack, heal, equip), properties should be nouns (health, damage, name). Constructor parameters should match the mental model of "creating" the thing.`,
    code: `// GOOD: Composition over inheritance — flexible and modular
class AbilitySystem {
  constructor() {
    this.abilities = new Map();
    this.cooldowns = new Map();
  }

  learn(ability) {
    this.abilities.set(ability.name, ability);
    this.cooldowns.set(ability.name, 0);
    console.log(\`Learned: \${ability.name}\`);
  }

  cast(abilityName, caster, target) {
    const ability = this.abilities.get(abilityName);
    if (!ability) throw new Error(\`Unknown ability: \${abilityName}\`);
    if (this.cooldowns.get(abilityName) > 0) {
      console.log(\`\${abilityName} is on cooldown!\`);
      return false;
    }
    ability.execute(caster, target);
    this.cooldowns.set(abilityName, ability.cooldown);
    return true;
  }
}

// Abilities as composable objects — not subclasses
const fireball = {
  name: "Fireball",
  manaCost: 30,
  cooldown: 3,
  execute(caster, target) {
    const damage = 50 + caster.intelligence * 2;
    console.log(\`\${caster.name} hurls a Fireball at \${target.name}!\`);
    console.log(\`\${target.name} takes \${damage} fire damage!\`);
  },
};

const heal = {
  name: "Divine Heal",
  manaCost: 20,
  cooldown: 2,
  execute(caster, target) {
    const amount = 40 + caster.wisdom * 3;
    console.log(\`\${caster.name} heals \${target.name} for \${amount} HP\`);
  },
};

// Usage: Character HAS-A AbilitySystem (composition)
const mage = { name: "Elara", intelligence: 15, wisdom: 10 };
const abilities = new AbilitySystem();
abilities.learn(fireball);
abilities.cast("Fireball", mage, { name: "Orc Warlord" });`,
    breakdown: `Let's analyze the composition-based design:

• class AbilitySystem — A FOCUSED class with one job: managing abilities and cooldowns. It doesn't know or care about HP, inventory, or movement. Single Responsibility Principle.

• this.abilities = new Map() — Maps are better than plain objects for dynamic key-value storage. They maintain insertion order and have O(1) lookups.

• learn(ability) — Simple interface: pass in an ability object. The system doesn't need to know the ability's internals — just that it has a name, cooldown, and execute method.

• if (!ability) throw new Error(...) — Defensive programming. Fail loudly with clear messages rather than silently doing nothing.

• ability.execute(caster, target) — Duck typing/polymorphism without inheritance. Any object with an execute(caster, target) method works here. No base class needed!

• const fireball = { ... } — Abilities as plain objects with an execute method. No class hierarchy needed. Easy to create, modify, and serialize.

• execute(caster, target) — Each ability defines its own behavior. Fireball does damage; heal restores HP. Same interface, different implementations — polymorphism through composition.

• const mage = { name: "Elara", intelligence: 15, wisdom: 10 } — The character is just data. The AbilitySystem COMPONENT adds ability functionality. Character HAS-A ability system.

• abilities.learn(fireball) / abilities.cast(...) — Clean API. The character doesn't need to inherit from anything to gain abilities. Swap the ability system for a different one and nothing else breaks.`,
    summary: `Best practices favor composition over deep inheritance: build systems from focused, single-responsibility components that interact through clear interfaces. Use Maps for dynamic collections, throw descriptive errors for invalid states, and leverage duck typing (same method signature) for polymorphism without rigid class hierarchies. This creates flexible, testable, and maintainable code.`
  }
];
