// Pre-written lessons for C# Module: Inheritance & Interfaces

export const csharpInheritanceLessons = [
  {
    title: "What is Inheritance & Interfaces?",
    definition: "Inheritance allows a class to inherit properties and methods from a parent class. Interfaces define contracts that classes must implement, specifying what methods they must have without providing implementation.",
    explanation: `Inheritance is a core OOP concept where a child (derived) class inherits all public and protected members from a parent (base) class. This enables code reuse — common behavior lives in the base class, and derived classes add or override specific behavior.

In C#, a class can inherit from only ONE base class (single inheritance) but can implement MULTIPLE interfaces. This prevents the "diamond problem" that plagues languages with multiple inheritance while still allowing flexible type composition.

Interfaces are contracts. They declare method signatures, properties, and events without implementation. When a class implements an interface, it promises to provide all the members declared in that interface. This enables polymorphism — different classes can be treated uniformly through a shared interface.

The 'virtual' keyword marks methods that CAN be overridden. The 'override' keyword in the derived class provides a new implementation. The 'abstract' keyword requires derived classes to provide implementation. 'sealed' prevents further overriding.`,
    code: `// Base class
abstract class Character
{
    public string Name { get; }
    public int HP { get; protected set; }

    protected Character(string name, int hp)
    {
        Name = name;
        HP = hp;
    }

    // Virtual — can be overridden
    public virtual string GetStatus()
        => \$"{Name}: HP={HP}";

    // Abstract — must be overridden
    public abstract int Attack();
}

// Derived class
class Warrior : Character
{
    public int Armor { get; }

    public Warrior(string name, int hp, int armor)
        : base(name, hp) // call parent constructor
    {
        Armor = armor;
    }

    public override int Attack() => 20 + Armor / 2;

    public override string GetStatus()
        => base.GetStatus() + \$" | Armor={Armor}";
}

// Interface
interface IDamageable
{
    void TakeDamage(int amount);
    bool IsAlive { get; }
}

// Class implementing interface
class Enemy : Character, IDamageable
{
    public Enemy(string name, int hp) : base(name, hp) { }
    public override int Attack() => 15;
    public void TakeDamage(int amount) => HP = Math.Max(0, HP - amount);
    public bool IsAlive => HP > 0;
}`,
    breakdown: `• abstract class Character — Cannot be instantiated directly. Must be inherited. Can contain both implemented and abstract members.

• public int HP { get; protected set; } — 'protected' means only this class and derived classes can set HP. External code can only read it.

• protected Character(string name, int hp) — Protected constructor. Can only be called from derived classes via 'base(...)'.

• public virtual string GetStatus() — 'virtual' marks this method as overridable. Derived classes CAN override it but aren't required to.

• public abstract int Attack() — No body! Derived classes MUST provide implementation. Forces every character type to define its own attack.

• class Warrior : Character — Warrior inherits from Character. Gets Name, HP, GetStatus for free. Must implement Attack().

• : base(name, hp) — Calls the parent constructor. Required when the parent doesn't have a parameterless constructor.

• class Enemy : Character, IDamageable — Inherits Character AND implements IDamageable interface. Must satisfy both contracts.`,
    summary: `Inheritance enables code reuse — base classes define common behavior, derived classes specialize. Abstract methods must be overridden; virtual methods can be. Interfaces define contracts without implementation. C# allows single class inheritance but multiple interface implementation. Use 'base' to call parent constructors and methods.`
  },
  {
    title: "How Inheritance & Interfaces works",
    definition: "Inheritance works through the virtual method table (vtable) — a lookup table that maps method calls to the correct implementation at runtime. Interfaces use a similar mechanism to dispatch calls to the implementing class's methods.",
    explanation: `When you call a virtual method through a base class reference, C# uses runtime polymorphism (late binding) to call the correct derived class implementation. This is powered by the vtable — each object carries a pointer to its class's method table.

For example, if you have Character c = new Warrior("Kai", 100, 50) and call c.Attack(), the runtime looks up the Warrior's vtable and calls Warrior.Attack(), not some default. This happens even though the variable type is Character.

Interface dispatch works similarly. When you have IDamageable target = new Enemy(...) and call target.TakeDamage(10), the runtime resolves to Enemy.TakeDamage() through the interface method table. This enables treating completely unrelated classes the same way if they implement the same interface.

The 'sealed' keyword tells the compiler and runtime that a method won't be overridden further, enabling de-virtualization optimizations. The JIT compiler can inline sealed method calls, providing significant performance benefits in hot paths.`,
    code: `// Polymorphism — different behaviors through same type
Character[] party = {
    new Warrior("Tank", 200, 80),
    new Mage("Caster", 80, 150),
    new Rogue("Shadow", 100, 0)
};

// Each calls its OWN Attack() implementation
foreach (Character c in party)
    Console.WriteLine(\$"{c.Name} attacks for {c.Attack()} damage");

// Interface polymorphism
IDamageable[] targets = {
    new Enemy("Goblin", 50),
    new Enemy("Dragon", 500),
    new Destructible("Barrel", 10) // different class, same interface!
};

foreach (IDamageable t in targets)
    t.TakeDamage(25);

// Checking types at runtime
foreach (Character c in party)
{
    if (c is Warrior w)
        Console.WriteLine(\$"{w.Name} has {w.Armor} armor");
    else if (c is Mage m)
        Console.WriteLine(\$"{m.Name} has {m.Mana} mana");
}

// Default interface methods (C# 8+)
interface ILoggable
{
    string Name { get; }
    // Default implementation — classes don't NEED to override
    void Log(string message)
        => Console.WriteLine(\$"[{Name}] {message}");
}

class Mage : Character, ILoggable
{
    public int Mana { get; }
    public Mage(string n, int hp, int mana) : base(n, hp) { Mana = mana; }
    public override int Attack() => Mana / 3;
}`,
    breakdown: `• Character[] party — Array of base type holding different derived types. Each element is a different class but treated uniformly.

• c.Attack() in loop — Polymorphic dispatch. Even though 'c' is typed as Character, the actual method called depends on the runtime type (Warrior/Mage/Rogue).

• IDamageable[] targets — Interface array holding any class that implements IDamageable. Classes don't need to be related by inheritance.

• c is Warrior w — Pattern matching type check. Tests if c is a Warrior and extracts it into variable w in one step. Safer than casting.

• Default interface method — C# 8+ allows interfaces to have method bodies. Implementing classes inherit the default but can override it. Enables interface evolution without breaking existing implementors.

• class Mage : Character, ILoggable — Mage inherits Character AND implements ILoggable. Gets the default Log() method without writing anything.`,
    summary: `Polymorphism lets different classes respond differently to the same method call through virtual dispatch. Base type arrays/lists hold mixed derived types. Interface arrays hold unrelated classes that share a contract. Pattern matching (is) safely checks and casts types. Default interface methods provide fallback implementations.`
  },
  {
    title: "Inheritance & Interfaces syntax & usage",
    definition: "C# inheritance uses ':' for both class inheritance and interface implementation. Key modifiers include virtual, override, abstract, sealed, new (hiding), and base (parent access). Interfaces use 'interface' keyword and can include default methods, static members, and generic constraints.",
    explanation: `C# has precise syntax for controlling inheritance hierarchies. The colon (:) after a class name indicates inheritance (one class) and/or interface implementation (multiple interfaces, separated by commas).

Method overriding requires an explicit contract: the base class marks methods as 'virtual' or 'abstract', and the derived class uses 'override'. This prevents accidental overriding and makes the inheritance design explicit and intentional.

The 'new' keyword (in method context) hides a base method without overriding it. This is different from override — hidden methods don't participate in polymorphism. It's generally a code smell but occasionally useful when you can't modify the base class.

Generic constraints with interfaces enable powerful patterns. 'where T : IComparable<T>' means T must implement IComparable, allowing the generic code to call CompareTo on any T. This combines the flexibility of generics with the safety of interfaces.`,
    code: `// Full inheritance syntax
abstract class GameEntity
{
    public int Id { get; } = Guid.NewGuid().GetHashCode();
    public abstract void Update(float deltaTime);
    public virtual void Render() => Console.WriteLine(\$"Rendering {Id}");
}

class NPC : GameEntity
{
    public override void Update(float dt) { /* AI logic */ }
    public sealed override void Render() // prevent further override
    {
        base.Render(); // call parent version
        Console.WriteLine("+ NPC overlay");
    }
}

// Multiple interfaces
interface IMoveable { void Move(int x, int y); }
interface IAttackable { int Attack(GameEntity target); }
interface IInteractable { void Interact(GameEntity actor); }

class PlayerEntity : GameEntity, IMoveable, IAttackable, IInteractable
{
    public int X { get; private set; }
    public int Y { get; private set; }

    public override void Update(float dt) { /* player logic */ }
    public void Move(int x, int y) { X = x; Y = y; }
    public int Attack(GameEntity target) => 50;
    public void Interact(GameEntity actor)
        => Console.WriteLine("Player interacted");
}

// Interface with generics and constraints
interface IRepository<T> where T : GameEntity
{
    T GetById(int id);
    void Save(T entity);
    IEnumerable<T> GetAll();
}

// Explicit interface implementation (resolve conflicts)
interface IFriendly { string Greet(); }
interface IHostile { string Greet(); }

class Merchant : IFriendly, IHostile
{
    string IFriendly.Greet() => "Welcome, traveler!";
    string IHostile.Greet() => "Leave my shop!";
}`,
    breakdown: `• abstract void Update(float deltaTime) — No body, must be overridden. Derived classes define their own update logic.

• sealed override void Render() — Overrides parent AND prevents further overriding by classes inheriting from NPC. The chain stops here.

• base.Render() — Calls the GameEntity.Render() implementation. Useful when you want to extend behavior rather than completely replace it.

• class PlayerEntity : GameEntity, IMoveable, IAttackable, IInteractable — Single base class, multiple interfaces. Comma-separated after the colon.

• interface IRepository<T> where T : GameEntity — Generic interface with constraint. T must be or inherit from GameEntity. Provides type safety.

• string IFriendly.Greet() / string IHostile.Greet() — Explicit interface implementation resolves naming conflicts. Must be called through the interface type: ((IFriendly)merchant).Greet().`,
    summary: `Use abstract for required overrides, virtual for optional, sealed override to stop further overriding. base.Method() calls the parent implementation. Multiple interfaces are comma-separated after the base class. Generic constraints (where T : Interface) ensure type safety. Explicit interface implementation resolves member name conflicts.`
  },
  {
    title: "Practical examples of Inheritance & Interfaces",
    definition: "Real applications use inheritance for class hierarchies (UI elements, game entities) and interfaces for cross-cutting capabilities (serializable, disposable, comparable). The combination enables flexible, extensible architectures.",
    explanation: `Professional C# code uses inheritance sparingly but interfaces extensively. The .NET ecosystem itself demonstrates this — IEnumerable, IDisposable, IComparable are used everywhere, while deep inheritance hierarchies are rare.

A common pattern is the "strategy pattern" with interfaces: define an interface for an algorithm (like IDamageCalculator), then create multiple implementations. This lets you swap algorithms without changing the code that uses them — just inject a different implementation.

Game engines use inheritance hierarchies for entities (GameObject → Character → Player/Enemy) but interfaces for capabilities (IMoveable, IAttackable, IInteractable). This hybrid approach gives you shared state through inheritance and flexible behavior through interfaces.

The dependency injection pattern relies heavily on interfaces. Services are coded against interfaces (IPlayerService, IInventoryService), and the concrete implementations are provided at runtime. This makes testing easy — inject mock implementations for unit tests.`,
    code: `// === Strategy Pattern with Interfaces ===
interface IAttackStrategy
{
    int CalculateDamage(int basePower);
    string Name { get; }
}

class MeleeStrategy : IAttackStrategy
{
    public string Name => "Melee";
    public int CalculateDamage(int basePower) => basePower + 10;
}

class MagicStrategy : IAttackStrategy
{
    public string Name => "Magic";
    public int CalculateDamage(int basePower) => (int)(basePower * 1.5);
}

class RangedStrategy : IAttackStrategy
{
    public string Name => "Ranged";
    public int CalculateDamage(int basePower) => basePower + 5;
}

class Fighter
{
    public string Name { get; }
    public int Power { get; }
    public IAttackStrategy Strategy { get; set; }

    public Fighter(string name, int power, IAttackStrategy strategy)
    {
        Name = name;
        Power = power;
        Strategy = strategy;
    }

    public void Attack(string target)
    {
        int dmg = Strategy.CalculateDamage(Power);
        Console.WriteLine(\$"{Name} uses {Strategy.Name}: {dmg} dmg to {target}");
    }
}

// Usage — swap strategies at runtime
var hero = new Fighter("Kai", 40, new MeleeStrategy());
hero.Attack("Goblin");       // Melee: 50 dmg
hero.Strategy = new MagicStrategy();
hero.Attack("Dragon");       // Magic: 60 dmg

// === Item Hierarchy with Interfaces ===
interface IUsable { void Use(Character user); }
interface IEquippable { void Equip(Character user); void Unequip(); }

abstract class Item
{
    public string Name { get; init; }
    public int Value { get; init; }
}

class HealthPotion : Item, IUsable
{
    public int HealAmount { get; init; } = 50;
    public void Use(Character user)
        => Console.WriteLine(\$"Healed {HealAmount} HP!");
}

class Sword : Item, IEquippable
{
    public int Damage { get; init; }
    public void Equip(Character user)
        => Console.WriteLine(\$"Equipped {Name} (+{Damage} ATK)");
    public void Unequip() => Console.WriteLine(\$"Unequipped {Name}");
}`,
    breakdown: `• IAttackStrategy interface — Defines the contract for damage calculation. Any strategy must provide Name and CalculateDamage.

• Three strategy classes — Each implements the interface differently. Melee adds flat bonus, Magic multiplies, Ranged adds smaller bonus.

• Strategy property on Fighter — Can be swapped at runtime. The Fighter doesn't know which strategy it's using — just that it has one.

• hero.Strategy = new MagicStrategy() — Runtime strategy swap. No Fighter code changes. This is the Open/Closed Principle in action.

• class HealthPotion : Item, IUsable — Inherits from Item (gets Name, Value) and implements IUsable (adds Use behavior). Not all Items are Usable.

• class Sword : Item, IEquippable — Same base class, different interface. Swords can be equipped but not "used" like potions.`,
    summary: `The Strategy pattern uses interfaces to define swappable algorithms — classes implement the interface differently and can be exchanged at runtime. Combine inheritance (for shared state) with interfaces (for capabilities). Not every item needs every interface — only implement what applies. This creates flexible systems where new behaviors are added without modifying existing code.`
  },
  {
    title: "Inheritance & Interfaces best practices",
    definition: "Best practices include favoring composition and interfaces over deep inheritance, keeping hierarchies shallow (max 2-3 levels), using abstract classes for shared state, interfaces for contracts, and following the Liskov Substitution Principle.",
    explanation: `The most important principle for inheritance is the Liskov Substitution Principle (LSP): if class B inherits from class A, then B should be usable anywhere A is expected without breaking behavior. If a derived class needs to disable or fundamentally change inherited behavior, the hierarchy is wrong.

Prefer interfaces over abstract classes when you only need a contract. Interfaces allow multiple implementation, work with structs (value types), and don't force a single inheritance slot. Use abstract classes only when you need to share implementation code (fields, method bodies) among related classes.

Keep inheritance hierarchies shallow — ideally 1-2 levels deep, maximum 3. Deep hierarchies are fragile (changing the base class breaks everything below it), hard to understand (you must read 5 files to understand one method), and inflexible (you're locked into one hierarchy).

The "composition over inheritance" principle means building behavior by combining objects rather than extending base classes. A Character that HAS a MovementComponent, CombatComponent, and InventoryComponent is more flexible than a MovableAttackingInventoryCharacter class.`,
    code: `// DO: Interfaces for contracts
interface ISaveable
{
    string Serialize();
    void Deserialize(string data);
}

// DO: Abstract class for shared implementation
abstract class BaseEntity : ISaveable
{
    public Guid Id { get; } = Guid.NewGuid();
    public DateTime Created { get; } = DateTime.UtcNow;

    // Shared implementation
    public virtual string Serialize()
        => \$"{Id}|{Created:O}";

    public abstract void Deserialize(string data);
}

// DO: Shallow hierarchy (max 2-3 levels)
class Player : BaseEntity
{
    public string Name { get; set; } = "";
    public override void Deserialize(string data) { /* ... */ }
}

// DO: Composition over deep inheritance
interface IMovement { void Move(float dx, float dy); }
interface ICombat { int Attack(); }
interface IInventory { void AddItem(string item); }

class GameCharacter
{
    public IMovement Movement { get; init; }
    public ICombat Combat { get; init; }
    public IInventory Inventory { get; init; }
}

// DON'T: Deep inheritance
// class Entity { }
// class LivingEntity : Entity { }
// class Character : LivingEntity { }
// class PlayableCharacter : Character { }
// class Warrior : PlayableCharacter { }  // 5 levels deep!

// DO: Follow Liskov Substitution
// If base says "Attack returns > 0", derived must too
class Healer : Character
{
    public override int Attack() => 5; // still positive!
    // DON'T: return -1 or throw — violates LSP
}

// DO: Use interfaces for testability
interface ILogger { void Log(string msg); }

class GameService
{
    private readonly ILogger _logger;
    public GameService(ILogger logger) => _logger = logger;
    public void DoWork() => _logger.Log("Working!");
}`,
    breakdown: `• interface ISaveable — Pure contract. Any class can implement it regardless of its inheritance hierarchy.

• abstract class BaseEntity : ISaveable — Abstract class implementing an interface. Provides shared Id/Created fields and a default Serialize. Derived classes get these for free.

• Composition: IMovement, ICombat, IInventory — GameCharacter is composed of interface implementations. Swap any component without changing the character.

• 5-level hierarchy comment — Anti-pattern. Every level adds complexity. Changing Entity affects everything below it. Prefer flat composition.

• Healer returns 5 — Follows LSP. Code expecting Character.Attack() > 0 still works. If Healer returned -1 or threw, code using Character references would break.

• ILogger dependency injection — GameService depends on an interface, not a concrete class. In tests, inject a MockLogger. In production, inject a FileLogger.`,
    summary: `Favor interfaces for contracts and composition for behavior assembly. Keep hierarchies to 2-3 levels maximum. Follow LSP — derived classes must fulfill base class promises. Use abstract classes only when sharing implementation between related types. Inject dependencies through interfaces for testability and flexibility.`
  }
];
