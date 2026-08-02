// Pre-written lessons for Rust Module: Structs

export const rustStructsLessons = [
  {
    title: "What is Structs?",
    definition: "Structs in Rust are custom data types that group named fields together. Combined with impl blocks for methods, they form the basis of Rust’s type system (no classes or inheritance).",
    explanation: `Structs is a core concept in Rust that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

Rust's approach to structs is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering structs, you unlock powerful patterns and idioms that are standard in professional Rust development.`,
    code: `// Structs in Rust - Basics
fn main() {
    println!("Structs in Rust");

    // Ownership basics
    let s1 = String::from("hello");
    let s2 = s1; // s1 is MOVED to s2
    // println!("{}", s1); // ERROR: s1 no longer valid!
    println!("{}", s2); // OK

    // Clone for explicit copy
    let s3 = s2.clone();
    println!("s2={}, s3={}", s2, s3); // both valid

    // References (borrowing)
    let s = String::from("world");
    let len = calculate_length(&s); // borrow, don't move
    println!("'{}' has length {}", s, len); // s still valid!

    // Mutable reference
    let mut name = String::from("Hero");
    change_name(&mut name);
    println!("Name: {}", name);
}

fn calculate_length(s: &String) -> usize {
    s.len() // can read but not modify
}

fn change_name(s: &mut String) {
    s.push_str(" (Legendary)");
}`,
    breakdown: `\u2022 The basic declaration shows how to define and use structs in Rust.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Structs in Rust provides are custom data types that group named fields together. Combined with impl blocks for methods, they form the basis of Rust’s type system (no classes or inheritance).. It's fundamental to writing correct, efficient Rust code."
  },
  {
    title: "How Structs works",
    definition: "Structs works by allocating memory for fields contiguously. Methods are defined in separate impl blocks. Traits provide polymorphism. Structs can be stack or heap allocated.",
    explanation: `Under the hood, structs in Rust involves specific compile-time and runtime mechanisms. The borrow checker enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how structs works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `// Structs - How it works
// The borrow checker enforces these rules at COMPILE TIME:
// 1. Each value has exactly one owner
// 2. When owner goes out of scope, value is dropped
// 3. You can have EITHER one &mut OR many & (not both)

fn main() {
    // Scope-based ownership
    {
        let s = String::from("scoped"); // s owns the String
        println!("{}", s);
    } // s goes out of scope, String is freed (drop called)

    // Move semantics
    let v = vec![1, 2, 3];
    let v2 = v; // ownership MOVES to v2
    // v is now invalid - use v2 instead

    // Copy trait (stack-only types)
    let x = 42;
    let y = x; // x is COPIED (i32 implements Copy)
    println!("x={}, y={}", x, y); // both valid!

    // Reference rules
    let mut data = vec![1, 2, 3];
    let r1 = &data;    // immutable borrow
    let r2 = &data;    // another immutable borrow - OK!
    println!("{:?} {:?}", r1, r2);
    // r1, r2 no longer used after here (NLL)

    let r3 = &mut data; // mutable borrow - OK (r1,r2 done)
    r3.push(4);
    println!("{:?}", r3);
}`,
    breakdown: `\u2022 Internal mechanics show how the ownership system handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Structs works through allocating memory for fields contiguously. Methods are defined in separate impl blocks. Traits provide polymorphism. Structs can be stack or heap allocated.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Structs syntax & usage",
    definition: "Rust structs syntax includes struct Name { fields }, impl blocks for methods, #[derive] for auto-implementing traits, tuple structs, unit structs, and struct update syntax.",
    explanation: `Rust provides clear syntax for structs with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other Rust developers.

Modern Rust continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `// Structs - Syntax patterns
use std::fmt;

// Struct definition
#[derive(Debug, Clone)]
struct Player {
    name: String,
    hp: i32,
    level: u32,
}

impl Player {
    fn new(name: &str, hp: i32) -> Self {
        Player { name: name.to_string(), hp, level: 1 }
    }

    fn take_damage(&mut self, amount: i32) {
        self.hp = (self.hp - amount).max(0);
    }

    fn is_alive(&self) -> bool {
        self.hp > 0
    }
}

impl fmt::Display for Player {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[Lv.{}] {} (HP: {})", self.level, self.name, self.hp)
    }
}

// Enum with data
enum GameEvent {
    Damage { target: String, amount: i32 },
    Heal { target: String, amount: i32 },
    LevelUp(String),
}

fn handle_event(event: &GameEvent) {
    match event {
        GameEvent::Damage { target, amount } =>
            println!("{} takes {} damage!", target, amount),
        GameEvent::Heal { target, amount } =>
            println!("{} heals {} HP!", target, amount),
        GameEvent::LevelUp(name) =>
            println!("{} leveled up!", name),
    }
}`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow Rust community standards.\n\n\u2022 Modern Rust features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "Rust syntax for structs is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Structs",
    definition: "In real applications, structs models game entities, configuration, API types, and domain objects. Combined with enums and traits, structs provide the full OOP toolkit without inheritance.",
    explanation: `Real-world Rust applications use structs for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source Rust projects provide excellent examples of structs in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `// Structs - Practical example: Game inventory
use std::collections::HashMap;

#[derive(Debug, Clone)]
enum Rarity { Common, Rare, Epic, Legendary }

#[derive(Debug, Clone)]
struct Item {
    name: String,
    damage: i32,
    rarity: Rarity,
}

struct Inventory {
    items: Vec<Item>,
    capacity: usize,
}

impl Inventory {
    fn new(capacity: usize) -> Self {
        Inventory { items: Vec::with_capacity(capacity), capacity }
    }

    fn add(&mut self, item: Item) -> Result<(), &'static str> {
        if self.items.len() >= self.capacity {
            return Err("Inventory full!");
        }
        self.items.push(item);
        Ok(())
    }

    fn strongest(&self) -> Option<&Item> {
        self.items.iter().max_by_key(|i| i.damage)
    }

    fn by_rarity(&self) -> HashMap<String, Vec<&Item>> {
        let mut map: HashMap<String, Vec<&Item>> = HashMap::new();
        for item in &self.items {
            map.entry(format!("{:?}", item.rarity))
               .or_default()
               .push(item);
        }
        map
    }
}

fn main() {
    let mut inv = Inventory::new(5);
    inv.add(Item { name: "Sword".into(), damage: 50, rarity: Rarity::Rare }).unwrap();
    inv.add(Item { name: "Axe".into(), damage: 75, rarity: Rarity::Epic }).unwrap();

    if let Some(best) = inv.strongest() {
        println!("Best weapon: {} ({} dmg)", best.name, best.damage);
    }
}`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate structs in game systems, data processing, and service design. The patterns are universal across Rust projects."
  },
  {
    title: "Structs best practices",
    definition: "Best practices for structs include using #[derive(Debug, Clone, PartialEq)] for common functionality, preferring composition over trait inheritance, keeping structs focused, using builders for complex initialization.",
    explanation: `Professional Rust code follows established conventions for structs that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when structs is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `// Structs - Best practices
use std::error::Error;
use std::fmt;

// DO: Use Result for fallible operations
fn parse_score(input: &str) -> Result<i32, Box<dyn Error>> {
    let score = input.trim().parse::<i32>()?; // ? propagates errors
    if score < 0 {
        return Err("Score cannot be negative".into());
    }
    Ok(score)
}

// DO: Use Option for optional values
fn find_player(players: &[Player], name: &str) -> Option<&Player> {
    players.iter().find(|p| p.name == name)
}

// DO: Implement Display for user-facing output
impl fmt::Display for Rarity {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Rarity::Common => write!(f, "Common"),
            Rarity::Legendary => write!(f, "\u2605 Legendary \u2605"),
            _ => write!(f, "{:?}", self),
        }
    }
}

// DO: Use iterators over manual indexing
fn total_damage(items: &[Item]) -> i32 {
    items.iter().map(|i| i.damage).sum()
}

// DO: Prefer owned types in structs for simplicity
struct Config {
    name: String,     // owned, not &str
    max_hp: i32,
    difficulty: f64,
}

// DO: Use #[derive] for common trait implementations
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Position { x: i32, y: i32 }`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: using #[derive(Debug, Clone, PartialEq)] for common functionality, preferring composition over trait inheritance, keeping structs focused, using builders for complex initialization.. Following conventions makes code maintainable and professional."
  }
];
