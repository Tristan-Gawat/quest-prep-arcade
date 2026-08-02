import { Module } from "./curriculum";

export const rustModules: Module[] = [
  {
    id: "rust-ownership",
    title: "Ownership",
    tier: "EASY",
    lesson: {
      title: "Ownership",
      concept: "Every value in Rust has exactly one owner — when the owner goes out of scope, the value is dropped.",
      explanation:
        "Ownership is Rust's core memory safety mechanism. Each value has one owner variable. When ownership moves (assignment or function call), the original variable is invalidated. This prevents double-free bugs and use-after-free at compile time. Clone() creates a deep copy if you need multiple owners.",
      codeExample: `fn main() {
    let player_name = String::from("Arcade Hero");

    // Ownership moves to new_name
    let new_name = player_name;
    // player_name is now invalid!
    // println!("{}", player_name); // ERROR!

    println!("{}", new_name); // Works!

    // Clone creates a copy
    let original = String::from("Sword");
    let copy = original.clone();
    println!("{} and {}", original, copy); // Both valid!

    // Integers are Copy (stack-only, cheap)
    let score = 100;
    let score2 = score;
    println!("{} {}", score, score2); // Both valid!
}`,
      language: "rust",
    },
    quiz: [
      { question: "What happens when you assign a String to another variable?", choices: ["It copies", "Ownership moves, original is invalid", "Both share it", "Nothing"], correct: 1, explanation: "Assignment moves ownership for heap types — the original is no longer valid." },
      { question: "How do you keep the original valid after assignment?", choices: ["Use &", "Use .clone()", "Use mut", "Use Box"], correct: 1, explanation: ".clone() creates a deep copy, so both variables own their own data." },
      { question: "Why don't integers move?", choices: ["They're special", "They implement Copy trait (stack-only, cheap to copy)", "They're references", "They're static"], correct: 1, explanation: "Types that implement Copy (integers, booleans, chars) are trivially copied on the stack." },
    ],
        subLessons: ["What is Ownership?","How Ownership works","Ownership syntax & usage","Practical examples of Ownership","Ownership best practices"],
challenge: {
      title: "Ownership Transfer",
      description: "Create a String \"Power Gem\". Write a function `take_item` that takes ownership of a String and prints it. Call it, then demonstrate that the original variable is no longer usable by creating a new one.",
      starterCode: "// Define take_item function\n\nfn main() {\n    // Create string and transfer ownership\n\n    // Create a new item since old one was moved\n\n}",
      expectedOutput: "Power Gem\nNew item: Fire Orb",
      hints: ["fn take_item(item: String) takes ownership", "After calling take_item(item), item is moved", "Create a new String for the second print"],
      solution: `fn take_item(item: String) {\n    println!("{}", item);\n}\n\nfn main() {\n    let item = String::from("Power Gem");\n    take_item(item);\n    // item is now moved, create a new one\n    let new_item = String::from("Fire Orb");\n    println!("New item: {}", new_item);\n}`,
      language: "rust",
    },
  },
  {
    id: "rust-borrowing",
    title: "Borrowing & References",
    tier: "EASY",
    lesson: {
      title: "Borrowing & References",
      concept: "References let you use values without taking ownership — borrowing instead of moving.",
      explanation:
        "Use & for immutable references and &mut for mutable references. Rules: you can have many immutable references OR one mutable reference (not both). This prevents data races at compile time. Borrowing lets functions read data without taking ownership.",
      codeExample: `fn main() {
    let mut health = 100;

    // Immutable borrow — can read, can't modify
    let r1 = &health;
    let r2 = &health; // Multiple immutable refs OK!
    println!("HP: {} and {}", r1, r2);

    // Mutable borrow — can modify, exclusive access
    let r3 = &mut health;
    *r3 -= 25;
    println!("HP after hit: {}", r3); // 75

    // Function borrowing
    fn print_score(s: &i32) {
        println!("Score: {}", s);
    }

    let score = 42;
    print_score(&score);
    println!("Still have score: {}", score); // Not moved!
}`,
      language: "rust",
    },
    quiz: [
      { question: "How many mutable references can exist at once?", choices: ["Unlimited", "Exactly one", "Two", "Depends on type"], correct: 1, explanation: "Rust allows only one mutable reference at a time — this prevents data races." },
      { question: "Can you have mutable and immutable references simultaneously?", choices: ["Yes always", "No — they're mutually exclusive", "Only in functions", "Only with Clone"], correct: 1, explanation: "You can't mix &mut and & to the same data in overlapping scopes — prevents reading stale data." },
      { question: "What does & do before a variable?", choices: ["Takes ownership", "Creates an immutable reference (borrow)", "Clones it", "Makes it mutable"], correct: 1, explanation: "& creates an immutable reference — borrowing the value without taking ownership." },
    ],
        subLessons: ["What is Borrowing & References?","How Borrowing & References works","Borrowing & References syntax & usage","Practical examples of Borrowing & References","Borrowing & References best practices"],
challenge: {
      title: "Borrow the Loot",
      description: "Create a Vec<String> with items. Write a function `count_items` that borrows the vector (&Vec<String>) and returns the length. Call it and print the count, then print the vec to show it wasn't moved.",
      starterCode: "// Define count_items function\n\nfn main() {\n    // Create vector and borrow it\n\n}",
      expectedOutput: "Items: 3\n[\"Sword\", \"Shield\", \"Potion\"]",
      hints: ["fn count_items(items: &Vec<String>) -> usize", "Pass with &inventory to borrow", "inventory is still valid after the function call"],
      solution: `fn count_items(items: &Vec<String>) -> usize {\n    items.len()\n}\n\nfn main() {\n    let inventory = vec![\n        String::from("Sword"),\n        String::from("Shield"),\n        String::from("Potion"),\n    ];\n    println!("Items: {}", count_items(&inventory));\n    println!("{:?}", inventory);\n}`,
      language: "rust",
    },
  },
  {
    id: "rust-structs",
    title: "Structs & Methods",
    tier: "MEDIUM",
    lesson: {
      title: "Structs & Methods",
      concept: "Structs group related data; impl blocks add methods and associated functions.",
      explanation:
        "Structs define custom types with named fields. Use 'impl' blocks to add methods (take &self or &mut self) and associated functions (no self — like constructors). Tuple structs have unnamed fields. Derive macros like #[derive(Debug)] auto-implement traits.",
      codeExample: `#[derive(Debug)]
struct Player {
    name: String,
    hp: i32,
    level: u32,
}

impl Player {
    // Associated function (constructor)
    fn new(name: &str, hp: i32) -> Self {
        Player {
            name: String::from(name),
            hp,
            level: 1,
        }
    }

    // Method (borrows self)
    fn is_alive(&self) -> bool {
        self.hp > 0
    }

    // Mutable method
    fn take_damage(&mut self, amount: i32) {
        self.hp -= amount;
        println!("{} takes {} damage! HP: {}", self.name, amount, self.hp);
    }
}

fn main() {
    let mut hero = Player::new("Shadow", 100);
    hero.take_damage(30);
    println!("Alive: {}", hero.is_alive());
}`,
      language: "rust",
    },
    quiz: [
      { question: "What does &self mean in a method?", choices: ["Takes ownership", "Borrows the struct immutably", "Copies the struct", "Creates a reference"], correct: 1, explanation: "&self borrows the struct immutably — you can read fields but not modify them." },
      { question: "What is an associated function?", choices: ["A method with self", "A function in impl without self (like a constructor)", "A free function", "A closure"], correct: 1, explanation: "Associated functions don't take self — called with :: syntax, often used as constructors (e.g., Player::new())." },
      { question: "What does #[derive(Debug)] do?", choices: ["Makes struct faster", "Auto-implements Debug trait for printing with {:?}", "Enables cloning", "Adds methods"], correct: 1, explanation: "#[derive(Debug)] auto-generates the Debug trait so you can print structs with {:?} or {:#?}." },
    ],
        subLessons: ["What is Structs & Methods?","How Structs & Methods works","Structs & Methods syntax & usage","Practical examples of Structs & Methods","Structs & Methods best practices"],
challenge: {
      title: "Build a Weapon",
      description: "Create a struct `Weapon` with fields name (String) and damage (i32). Add an impl block with a `new` associated function and a `describe` method that returns a formatted string. Create a sword and print its description.",
      starterCode: "// Define Weapon struct\n\n// Add impl block\n\nfn main() {\n    // Create and describe\n\n}",
      expectedOutput: "Excalibur deals 50 damage",
      hints: ["struct Weapon { name: String, damage: i32 }", "fn new(name: &str, damage: i32) -> Self creates instances", "describe(&self) -> String returns the formatted text"],
      solution: `struct Weapon {\n    name: String,\n    damage: i32,\n}\n\nimpl Weapon {\n    fn new(name: &str, damage: i32) -> Self {\n        Weapon {\n            name: String::from(name),\n            damage,\n        }\n    }\n\n    fn describe(&self) -> String {\n        format!("{} deals {} damage", self.name, self.damage)\n    }\n}\n\nfn main() {\n    let sword = Weapon::new("Excalibur", 50);\n    println!("{}", sword.describe());\n}`,
      language: "rust",
    },
  },
  {
    id: "rust-enums",
    title: "Enums & Pattern Matching",
    tier: "MEDIUM",
    lesson: {
      title: "Enums & Pattern Matching",
      concept: "Rust enums can hold data in each variant; match expressions handle every case exhaustively.",
      explanation:
        "Unlike C enums, Rust enums can carry different data per variant — they're algebraic data types. The match expression requires handling every variant (exhaustive). Option<T> (Some/None) replaces null. Result<T, E> (Ok/Err) handles errors. if let is a shortcut for single-pattern matching.",
      codeExample: `enum PowerUp {
    Health(i32),
    Speed(f64),
    Shield { duration: u32, strength: i32 },
    Invincible,
}

fn apply_powerup(p: &PowerUp) {
    match p {
        PowerUp::Health(amount) => println!("Heal {} HP!", amount),
        PowerUp::Speed(mult) => println!("Speed x{}!", mult),
        PowerUp::Shield { duration, strength } =>
            println!("Shield: {} str for {}s", strength, duration),
        PowerUp::Invincible => println!("INVINCIBLE!"),
    }
}

fn main() {
    let item = PowerUp::Health(50);
    apply_powerup(&item);

    // Option<T> — no null!
    let treasure: Option<&str> = Some("Gold Crown");
    if let Some(t) = treasure {
        println!("Found: {}", t);
    }
}`,
      language: "rust",
    },
    quiz: [
      { question: "Can Rust enum variants hold data?", choices: ["No, just labels", "Yes, each variant can hold different data", "Only integers", "Only with structs"], correct: 1, explanation: "Rust enums are algebraic types — each variant can hold tuples, structs, or nothing." },
      { question: "What happens if you miss a variant in match?", choices: ["Runtime error", "Compile error — match must be exhaustive", "Default case runs", "It's ignored"], correct: 1, explanation: "The compiler enforces exhaustiveness — you must handle every possible variant or use a _ wildcard." },
      { question: "What replaces null in Rust?", choices: ["nullptr", "Option<T> with Some(value) or None", "Empty string", "Default trait"], correct: 1, explanation: "Option<T> explicitly represents presence (Some) or absence (None) — no null pointer exceptions!" },
    ],
        subLessons: ["What is Enums & Pattern Matching?","How Enums & Pattern Matching works","Enums & Pattern Matching syntax & usage","Practical examples of Enums & Pattern Matching","Enums & Pattern Matching best practices"],
challenge: {
      title: "Game Event Matcher",
      description: "Create an enum `GameEvent` with variants: Score(i32), LevelUp(u32), GameOver. Write a function that matches on it and prints an appropriate message for each. Trigger the LevelUp variant.",
      starterCode: "// Define GameEvent enum\n\n// Write handle_event function\n\nfn main() {\n    // Create and handle a LevelUp event\n\n}",
      expectedOutput: "Leveled up to 5!",
      hints: ["enum GameEvent { Score(i32), LevelUp(u32), GameOver }", "Use match event { ... } with each variant", "GameEvent::LevelUp(5) creates the variant with data"],
      solution: `enum GameEvent {\n    Score(i32),\n    LevelUp(u32),\n    GameOver,\n}\n\nfn handle_event(event: &GameEvent) {\n    match event {\n        GameEvent::Score(points) => println!("Scored {} points!", points),\n        GameEvent::LevelUp(level) => println!("Leveled up to {}!", level),\n        GameEvent::GameOver => println!("Game Over!"),\n    }\n}\n\nfn main() {\n    let event = GameEvent::LevelUp(5);\n    handle_event(&event);\n}`,
      language: "rust",
    },
  },
  {
    id: "rust-traits",
    title: "Traits",
    tier: "HARD",
    lesson: {
      title: "Traits",
      concept: "Traits define shared behavior — like interfaces with optional default implementations.",
      explanation:
        "Traits declare method signatures that types can implement. They enable polymorphism via trait objects (dyn Trait) or static dispatch (generics with trait bounds). Default implementations provide fallback behavior. Traits can require other traits (supertraits). Common traits: Display, Clone, Iterator.",
      codeExample: `use std::fmt;

trait Combatant {
    fn attack_power(&self) -> i32;
    fn name(&self) -> &str;

    // Default implementation
    fn battle_cry(&self) -> String {
        format!("{} attacks with power {}!", self.name(), self.attack_power())
    }
}

struct Warrior { name: String, strength: i32 }
struct Mage { name: String, intelligence: i32 }

impl Combatant for Warrior {
    fn attack_power(&self) -> i32 { self.strength * 2 }
    fn name(&self) -> &str { &self.name }
}

impl Combatant for Mage {
    fn attack_power(&self) -> i32 { self.intelligence * 3 }
    fn name(&self) -> &str { &self.name }
}

// Trait bound — works with any Combatant
fn announce(fighter: &dyn Combatant) {
    println!("{}", fighter.battle_cry());
}

fn main() {
    let w = Warrior { name: String::from("Grok"), strength: 15 };
    let m = Mage { name: String::from("Zara"), intelligence: 20 };
    announce(&w);
    announce(&m);
}`,
      language: "rust",
    },
    quiz: [
      { question: "What's the difference between a trait and an interface?", choices: ["No difference", "Traits can have default method implementations", "Interfaces are faster", "Traits can't be generic"], correct: 1, explanation: "Rust traits can include default implementations — types only need to override what they customize." },
      { question: "What is a trait object (dyn Trait)?", choices: ["A copied trait", "A runtime-polymorphic reference to any type implementing the trait", "A generic", "A macro"], correct: 1, explanation: "dyn Trait enables dynamic dispatch — a reference that can point to any type implementing the trait." },
      { question: "What does 'impl Trait' in a return type mean?", choices: ["Returns a trait object", "Returns some concrete type implementing the trait (static dispatch)", "Returns a reference", "Returns an enum"], correct: 1, explanation: "impl Trait as a return type means 'I return some specific type that implements this trait' — the caller doesn't know which." },
    ],
        subLessons: ["What is Traits?","How Traits works","Traits syntax & usage","Practical examples of Traits","Traits best practices"],
challenge: {
      title: "Trait Combatants",
      description: "Define a trait `Describable` with a method `describe(&self) -> String`. Implement it for a struct `Item` with name and rarity fields. Create an item and print its description.",
      starterCode: "// Define Describable trait\n\n// Define Item struct and implement trait\n\nfn main() {\n    // Create item and print description\n\n}",
      expectedOutput: "Legendary Sword (Legendary)",
      hints: ["trait Describable { fn describe(&self) -> String; }", "impl Describable for Item { ... }", "Use format!() to build the string"],
      solution: `trait Describable {\n    fn describe(&self) -> String;\n}\n\nstruct Item {\n    name: String,\n    rarity: String,\n}\n\nimpl Describable for Item {\n    fn describe(&self) -> String {\n        format!("{} ({})", self.name, self.rarity)\n    }\n}\n\nfn main() {\n    let item = Item {\n        name: String::from("Legendary Sword"),\n        rarity: String::from("Legendary"),\n    };\n    println!("{}", item.describe());\n}`,
      language: "rust",
    },
  },
  {
    id: "rust-lifetimes",
    title: "Lifetimes",
    tier: "HARD",
    lesson: {
      title: "Lifetimes",
      concept: "Lifetimes tell the compiler how long references are valid — preventing dangling references.",
      explanation:
        "Lifetime annotations ('a) describe how long references live relative to each other. The compiler's borrow checker uses them to ensure no reference outlives its data. Most lifetimes are inferred (elision rules). Explicit annotations are needed when a function returns a reference derived from multiple inputs. 'static means lives for the program duration.",
      codeExample: `// Lifetime annotation: returned ref lives as long as both inputs
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1
    } else {
        s2
    }
}

// Struct holding a reference needs lifetime
struct GameSession<'a> {
    player_name: &'a str,
    level: u32,
}

impl<'a> GameSession<'a> {
    fn info(&self) -> String {
        format!("{} at level {}", self.player_name, self.level)
    }
}

fn main() {
    let name = String::from("Hero");
    let session = GameSession {
        player_name: &name,
        level: 10,
    };
    println!("{}", session.info());

    let result;
    let s1 = String::from("long string");
    {
        let s2 = String::from("hi");
        result = longest(&s1, &s2);
        println!("Longest: {}", result);
    }
}`,
      language: "rust",
    },
    quiz: [
      { question: "What do lifetime annotations describe?", choices: ["How long an object exists", "The relationship between reference lifetimes", "Memory allocation time", "Thread lifetime"], correct: 1, explanation: "Lifetime annotations describe how multiple references' lifetimes relate — the compiler uses this to prevent dangling refs." },
      { question: "What does 'static lifetime mean?", choices: ["Can't change", "The reference is valid for the entire program duration", "Stack allocated", "No garbage collection"], correct: 1, explanation: "'static means the data lives for the entire program — like string literals or leaked allocations." },
      { question: "When must you write explicit lifetime annotations?", choices: ["Always", "When returning references derived from multiple inputs", "Never, they're optional", "Only in structs"], correct: 1, explanation: "Explicit annotations are needed when the compiler can't determine which input a returned reference comes from." },
    ],
        subLessons: ["What is Lifetimes?","How Lifetimes works","Lifetimes syntax & usage","Practical examples of Lifetimes","Lifetimes best practices"],
challenge: {
      title: "Lifetime Arena",
      description: "Write a function `first_word<'a>(s: &'a str) -> &'a str` that returns the first word (up to first space or whole string). Test with \"Arcade Champion\" and print the result.",
      starterCode: "// Define first_word with lifetime annotation\n\nfn main() {\n    // Call and print\n\n}",
      expectedOutput: "Arcade",
      hints: ["fn first_word<'a>(s: &'a str) -> &'a str", "Use s.find(' ') to locate the space", "Return &s[0..index] or the whole string if no space"],
      solution: `fn first_word<'a>(s: &'a str) -> &'a str {\n    match s.find(' ') {\n        Some(index) => &s[0..index],\n        None => s,\n    }\n}\n\nfn main() {\n    let text = "Arcade Champion";\n    println!("{}", first_word(text));\n}`,
      language: "rust",
    },
  },
];
