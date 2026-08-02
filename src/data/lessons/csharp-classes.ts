// Pre-written lessons for C# Module: Classes & Objects

export const csharpClassesLessons = [
  {
    title: "What is Classes & Objects?",
    definition: "A class is a blueprint that defines properties (data) and methods (behavior) for objects. An object is a specific instance of a class created with the 'new' keyword.",
    explanation: `Classes are the foundation of object-oriented programming in C#. Think of a class as a blueprint for a house — it defines the layout, rooms, and features. An object is an actual house built from that blueprint. You can build many houses (objects) from one blueprint (class).

A class bundles related data (fields/properties) and behavior (methods) into a single unit. A Player class might have properties like Name, Health, and Level, plus methods like Attack(), Heal(), and LevelUp(). This bundling is called encapsulation.

Properties in C# use getters and setters to control access to data. Instead of exposing raw fields, properties let you add validation, computed values, and change notifications. Auto-properties (public int Health { get; set; }) are the common shorthand.

Constructors are special methods that initialize new objects. They run automatically when you use 'new'. You can have multiple constructors (constructor overloading) to support different ways of creating an object.`,
    code: `// Class definition
class Player
{
    // Properties (data)
    public string Name { get; set; }
    public int Health { get; private set; } // read-only outside
    public int MaxHealth { get; init; }     // set only during init
    public int Level { get; private set; } = 1;

    // Constructor
    public Player(string name, int maxHealth = 100)
    {
        Name = name;
        MaxHealth = maxHealth;
        Health = maxHealth; // start at full HP
    }

    // Methods (behavior)
    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
        Console.WriteLine($"{Name} takes {amount} damage! HP: {Health}");
    }

    public void Heal(int amount)
    {
        Health = Math.Min(MaxHealth, Health + amount);
        Console.WriteLine($"{Name} heals {amount}! HP: {Health}");
    }

    public bool IsAlive => Health > 0; // computed property

    public override string ToString()
        => $"[Lv.{Level}] {Name} - HP: {Health}/{MaxHealth}";
}

// Creating and using objects
var hero = new Player("Aragorn", 150);
Console.WriteLine(hero);          // [Lv.1] Aragorn - HP: 150/150
hero.TakeDamage(40);
hero.Heal(20);
Console.WriteLine($"Alive: {hero.IsAlive}");`,
    breakdown: `• class Player { } — Defines the blueprint. Everything inside describes what a Player has and can do.

• public string Name { get; set; } — Auto-property with public getter and setter. Anyone can read or write Name.

• public int Health { get; private set; } — Public getter, private setter. Outsiders can READ Health but only the class's own methods can CHANGE it. Encapsulation in action.

• public int MaxHealth { get; init; } — init accessor means it can only be set during object initialization (constructor or object initializer), never after.

• public Player(string name, int maxHealth = 100) — Constructor. Same name as the class, no return type. Called automatically with 'new Player(...)'.

• public bool IsAlive => Health > 0 — Expression-bodied computed property. Calculated fresh every time it's accessed. No backing field stored.

• override string ToString() — Overrides the default object.ToString() to provide meaningful text representation. Used by Console.WriteLine automatically.

• var hero = new Player("Aragorn", 150) — Creates an instance (object). The constructor runs, initializing all properties.`,
    summary: `Classes define blueprints with properties (data) and methods (behavior). Objects are instances created with 'new'. Properties use get/set for controlled access — private set restricts modification to the class itself. Constructors initialize objects. Computed properties (=>) calculate values on demand without storing them.`
  },
  {
    title: "How Classes & Objects works",
    definition: "Objects are reference types allocated on the managed heap. The variable holds a reference (pointer) to the heap memory. The garbage collector automatically frees memory when no references remain.",
    explanation: `When you write var hero = new Player("Aragorn"), two things happen in memory. First, memory is allocated on the heap for the Player object's data (Name, Health, MaxHealth, Level). Second, the local variable 'hero' on the stack receives a reference (memory address) pointing to that heap allocation.

Because objects are reference types, assigning one variable to another copies the reference, not the object. If you write var hero2 = hero, both variables point to the same Player object. Modifying through hero2 affects what hero sees — they're the same object.

The garbage collector (GC) tracks how many references point to each heap object. When an object has zero references (nothing points to it), the GC can reclaim its memory during collection. You never manually free memory in C# — the GC handles it automatically.

Object lifecycle in C#: construction (new), usage (calling methods/properties), and collection (GC reclaims memory). Finalizers (~ClassName) run just before collection, but they're rarely needed. For unmanaged resources (files, connections), implement IDisposable with a Dispose method instead.`,
    code: `// Reference semantics demonstration
var player1 = new Player("Alice", 100);
var player2 = player1; // same object, two references!

player2.TakeDamage(30); // affects the shared object
Console.WriteLine(player1.Health); // 70! Both see the change

// Proving same object with ReferenceEquals
Console.WriteLine(ReferenceEquals(player1, player2)); // True

// Creating a separate copy requires explicit cloning
var player3 = new Player(player1.Name, player1.MaxHealth);
// player3 is independent — different object

// Static members — belong to the class, not instances
class GameStats
{
    public static int TotalPlayers { get; private set; } = 0;
    public static int TotalDamageDealt { get; private set; } = 0;

    public string Name { get; }

    public GameStats(string name)
    {
        Name = name;
        TotalPlayers++; // shared counter
    }

    public void DealDamage(int amount)
    {
        TotalDamageDealt += amount; // shared accumulator
        Console.WriteLine($"{Name} dealt {amount}!");
    }
}

var a = new GameStats("Warrior");
var b = new GameStats("Mage");
a.DealDamage(50);
b.DealDamage(75);
Console.WriteLine($"Players: {GameStats.TotalPlayers}");     // 2
Console.WriteLine($"Total Dmg: {GameStats.TotalDamageDealt}"); // 125`,
    breakdown: `• var player2 = player1 — Copies the REFERENCE, not the object. Both variables point to the same Player in heap memory.

• player2.TakeDamage(30) affecting player1 — Since they're the same object, any modification through either reference is visible through both.

• ReferenceEquals(player1, player2) — Tests if two variables point to the exact same object in memory. Returns true here because both reference the same heap location.

• new Player(player1.Name, ...) — Creates a genuinely new object. This is manual copying — the new Player has its own memory.

• static int TotalPlayers — Static members exist once for the entire class, shared across all instances. Accessed via ClassName.Member, not instance.Member.

• TotalPlayers++ in constructor — Every time any GameStats object is created, this shared counter increments. Tracks the total across all instances.

• GameStats.TotalPlayers — Accessed on the class itself (GameStats), not on an instance (a or b). Static members have no 'this' reference.`,
    summary: `Objects are heap-allocated reference types. Assigning to another variable copies the reference, creating shared access to one object. Static members belong to the class itself, shared across all instances. To create independent copies, construct new objects explicitly. The garbage collector automatically manages heap memory.`
  },
  {
    title: "Classes & Objects syntax & usage",
    definition: "C# class syntax includes access modifiers, constructors, properties with getters/setters, methods, static members, records, and object initializers. Modern C# adds primary constructors and required members.",
    explanation: `C# class declarations support rich syntax for controlling access, initialization, and behavior. Access modifiers (public, private, protected, internal) determine who can see each member. The principle of least privilege says: make everything as restricted as possible.

Properties are the standard way to expose data in C#. Auto-properties ({ get; set; }) handle the common case. Backing fields are used when you need validation or computation. Property syntax supports init-only setters, required members, and expression-bodied accessors.

Records (C# 9+) are classes optimized for data. They provide value-based equality, immutability by default, deconstruction, and concise syntax. Use records when a type's primary purpose is holding data rather than performing actions.

Object initializers let you set properties during construction without needing constructor parameters for everything. Combined with init-only setters, they provide flexible yet safe initialization patterns.`,
    code: `// Full class with all common features
public class Weapon
{
    // Private backing field
    private int _durability;

    // Property with validation
    public int Durability
    {
        get => _durability;
        set => _durability = Math.Clamp(value, 0, MaxDurability);
    }

    // Auto-properties
    public string Name { get; init; }      // set once
    public int Damage { get; set; }
    public int MaxDurability { get; init; } = 100;

    // Required member (C# 11)
    // public required string Name { get; init; }

    // Constructor
    public Weapon(string name, int damage)
    {
        Name = name;
        Damage = damage;
        _durability = MaxDurability;
    }

    // Method
    public int Use()
    {
        if (Durability <= 0) return 0;
        Durability -= 10;
        return Damage;
    }
}

// Object initializer syntax
var sword = new Weapon("Excalibur", 75)
{
    MaxDurability = 200,
    Durability = 200
};

// Record (immutable data class)
public record Item(string Name, int Value, string Rarity);
var loot = new Item("Ruby", 500, "Rare");
Console.WriteLine(loot); // Item { Name = Ruby, Value = 500, Rarity = Rare }

// Record with-expression (create modified copy)
var betterLoot = loot with { Value = 1000, Rarity = "Epic" };
Console.WriteLine(betterLoot);`,
    breakdown: `• private int _durability — Private backing field. Only accessible inside this class. The property provides controlled access.

• set => _durability = Math.Clamp(value, 0, MaxDurability) — Property setter with validation. 'value' is the incoming value. Clamp ensures it stays within valid range.

• public string Name { get; init; } — Init-only property. Can be set in constructor or object initializer, but not after. Provides immutability.

• new Weapon("Excalibur", 75) { MaxDurability = 200 } — Object initializer syntax. Constructor runs first with required args, then properties in { } are set. Flexible initialization.

• public record Item(string Name, int Value, string Rarity) — Positional record. Generates constructor, properties, equality, ToString, and Deconstruct automatically. One line for a complete data class.

• loot with { Value = 1000 } — 'with' expression creates a copy of the record with some properties changed. The original is unchanged (immutability).`,
    summary: `Properties use backing fields for validation, auto-properties for simple cases, and init for write-once. Object initializers set properties after construction. Records provide concise immutable data types with value equality and 'with' expressions for creating modified copies. Use access modifiers to restrict access to the minimum needed.`
  },
  {
    title: "Practical examples of Classes & Objects",
    definition: "Classes model real-world entities and game objects with state and behavior. Well-designed classes encapsulate their data, expose clear interfaces, and interact with other classes through method calls.",
    explanation: `Real applications are built from interacting objects. A game might have Player, Enemy, Weapon, Inventory, and Quest classes that collaborate to produce gameplay. Each class manages its own state and exposes actions that other classes can trigger.

Good class design means each class has a single responsibility. A Player class shouldn't know how to render itself, save to a database, AND handle physics. It should focus on player state and behavior, delegating other concerns to specialized classes.

Composition (objects containing other objects) is a powerful design technique. A Player HAS an Inventory, a Weapon, and a set of Stats. This is more flexible than deep inheritance hierarchies and easier to modify.

Encapsulation protects invariants — rules about the object's state that must always be true. For example, "health is never negative" or "inventory size never exceeds capacity." By making setters private and providing controlled methods, you guarantee these rules can't be violated.`,
    code: `// === EXAMPLE: Complete Game Character System ===
class Inventory
{
    private readonly List<string> _items = new();
    public int Capacity { get; init; } = 10;
    public int Count => _items.Count;
    public bool IsFull => Count >= Capacity;

    public bool Add(string item)
    {
        if (IsFull) return false;
        _items.Add(item);
        return true;
    }

    public bool Remove(string item) => _items.Remove(item);
    public bool Has(string item) => _items.Contains(item);
    public void List() => _items.ForEach(i => Console.WriteLine($"  • {i}"));
}

class GameCharacter
{
    public string Name { get; }
    public int HP { get; private set; }
    public int MaxHP { get; }
    public int Gold { get; private set; }
    public Inventory Bag { get; } = new() { Capacity = 5 };

    public GameCharacter(string name, int maxHP, int gold = 0)
    {
        Name = name;
        MaxHP = maxHP;
        HP = maxHP;
        Gold = gold;
    }

    public void TakeDamage(int dmg)
    {
        HP = Math.Max(0, HP - dmg);
        if (HP == 0) Console.WriteLine($"{Name} has fallen!");
    }

    public bool BuyItem(string item, int cost)
    {
        if (Gold < cost) { Console.WriteLine("Not enough gold!"); return false; }
        if (Bag.IsFull) { Console.WriteLine("Inventory full!"); return false; }
        Gold -= cost;
        Bag.Add(item);
        Console.WriteLine($"{Name} bought {item} for {cost}g");
        return true;
    }

    public override string ToString()
        => $"{Name} | HP:{HP}/{MaxHP} | Gold:{Gold} | Items:{Bag.Count}";
}

// Using the system
var hero = new GameCharacter("Kai", 120, 500);
hero.BuyItem("Health Potion", 50);
hero.BuyItem("Iron Sword", 200);
hero.TakeDamage(35);
Console.WriteLine(hero);
hero.Bag.List();`,
    breakdown: `• private readonly List<string> _items = new() — Private field initialized inline. 'readonly' means the reference can't be reassigned after construction. The list contents can still be modified.

• public bool IsFull => Count >= Capacity — Computed property. Always reflects current state. No need to manually keep it in sync.

• public bool Add(string item) — Returns bool to indicate success/failure. The caller knows if the add worked without exceptions.

• public Inventory Bag { get; } = new() { Capacity = 5 } — Composition: GameCharacter HAS an Inventory. Initialized inline with a custom capacity.

• BuyItem method — Checks two preconditions (gold, space), performs the action, or reports why it failed. Encapsulates the business logic of purchasing.

• Math.Max(0, HP - dmg) — Ensures HP never goes negative. This invariant is maintained internally — external code can't set HP to -50.`,
    summary: `Composition (objects containing objects) models real relationships. Classes protect their state with private setters and validation in methods. Methods return bool to indicate success/failure. Computed properties (=>) always reflect current state. Encapsulation ensures invariants (like non-negative HP) are always maintained.`
  },
  {
    title: "Classes & Objects best practices",
    definition: "Best practices include preferring composition over inheritance, keeping classes focused (SRP), making objects immutable when possible, using records for data, and designing clear public interfaces.",
    explanation: `Good class design follows established principles that produce maintainable, flexible code. The most important principles are: Single Responsibility (each class does one thing), encapsulation (hide internals, expose interfaces), and composition (build complex objects from simple ones).

Immutability makes code safer and easier to reason about. When objects can't be changed after creation, you eliminate entire categories of bugs related to unexpected mutation. In C#, records with init properties provide easy immutability.

Design your classes' public interfaces carefully. Public members are promises — once other code depends on them, changing them breaks things. Start with everything private, then make things public only as needed. It's easy to add access, hard to remove it.

Favor small, focused classes over large ones. A 500-line class is doing too much. Break it into collaborating smaller classes, each handling one concern. This makes code testable, understandable, and modifiable.`,
    code: `// DO: Small, focused classes with clear purpose
public class DamageCalculator
{
    public int Calculate(int baseDmg, int armor, double crit)
        => (int)(Math.Max(1, baseDmg - armor) * crit);
}

// DO: Use records for data transfer
public record QuestReward(int XP, int Gold, string? Item = null);
public record PlayerStats(int STR, int DEX, int INT, int VIT);

// DO: Composition over inheritance
public class Character
{
    public PlayerStats Stats { get; init; }
    public Inventory Bag { get; init; }
    private readonly DamageCalculator _calc = new();

    public int Attack(int targetArmor)
        => _calc.Calculate(Stats.STR * 2, targetArmor, 1.0);
}

// DO: Immutable with factory methods
public class QuestLog
{
    private readonly List<string> _completed = new();
    public IReadOnlyList<string> Completed => _completed;

    public void Complete(string quest)
    {
        if (!_completed.Contains(quest))
            _completed.Add(quest);
    }
}

// DO: Use sealed for classes not designed for inheritance
public sealed class GameConfig
{
    public int MaxPlayers { get; init; } = 4;
    public string ServerName { get; init; } = "Default";
    public double TickRate { get; init; } = 60.0;
}

// DO: Override Equals/GetHashCode for value semantics
// (or just use records which do this automatically)
public record Coordinate(int X, int Y)
{
    public double DistanceTo(Coordinate other)
        => Math.Sqrt(Math.Pow(X - other.X, 2) + Math.Pow(Y - other.Y, 2));
}`,
    breakdown: `• class DamageCalculator — Single responsibility: it only calculates damage. Easy to test, replace, or modify without affecting other code.

• record QuestReward(...) — Records for data. Automatically gets equality, ToString, deconstruction. No boilerplate needed for simple data holders.

• Composition: Character HAS Stats, Bag, and Calculator — Instead of inheriting from multiple base classes, the character is composed of focused components.

• IReadOnlyList<string> Completed — Exposes the list as read-only. External code can read completed quests but can't modify the list directly. Internal code uses _completed.

• sealed class GameConfig — 'sealed' prevents inheritance. Use for classes not designed to be extended. Enables compiler optimizations and communicates intent.

• record Coordinate(int X, int Y) — Records provide value equality by default. Two Coordinate objects with the same X and Y ARE equal, unlike regular classes which compare by reference.`,
    summary: `Follow Single Responsibility — each class does one thing. Use records for data types that need value equality. Compose objects from focused components rather than building inheritance hierarchies. Expose IReadOnly collections to prevent external modification. Seal classes not designed for inheritance. Start with private access and widen only as needed.`
  }
];
