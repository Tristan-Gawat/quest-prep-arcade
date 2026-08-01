import { Module } from "./curriculum";

export const javaModules: Module[] = [
  {
    id: "java-classes",
    title: "Classes & Objects",
    tier: "ROOKIE",
    lesson: {
      title: "Classes & Objects",
      concept: "Classes are blueprints for creating objects — the core building blocks of Java.",
      explanation:
        "In Java, everything lives inside a class. A class defines fields (data) and methods (behavior). You create objects using 'new'. Constructors initialize objects. Access modifiers (public, private, protected) control visibility.",
      codeExample: `public class Player {
  private String name;
  private int health;

  public Player(String name, int health) {
    this.name = name;
    this.health = health;
  }

  public String getName() {
    return name;
  }

  public void takeDamage(int amount) {
    health -= amount;
    System.out.println(name + " takes " + amount + " damage!");
  }
}

Player hero = new Player("Arcade Knight", 100);
hero.takeDamage(25);`,
      language: "java",
    },
    quiz: [
      { question: "What keyword creates a new object in Java?", choices: ["create", "new", "make", "init"], correct: 1, explanation: "'new' allocates memory and calls the constructor to create an object." },
      { question: "What is a constructor?", choices: ["A method that destroys objects", "A special method that initializes objects", "A static utility", "A type of variable"], correct: 1, explanation: "Constructors have the same name as the class and run when an object is created." },
      { question: "What does 'private' mean for a field?", choices: ["Accessible everywhere", "Only accessible within the same class", "Accessible in subclasses", "Accessible in the package"], correct: 1, explanation: "'private' restricts access to the declaring class only — encapsulation!" },
    ],
    challenge: {
      title: "Spawn a Hero",
      description: "Create a class `Hero` with private fields `name` (String) and `level` (int). Add a constructor and a method `introduce()` that prints \"I am [name], level [level]\". Create an instance and call introduce().",
      starterCode: "// Define the Hero class\n\n\n// Create an instance and call introduce()\n",
      expectedOutput: "I am Pixel, level 5",
      hints: ["Use 'private String name;' for fields", "The constructor takes name and level as parameters", "Use System.out.println() in the introduce method"],
      solution: `public class Hero {\n  private String name;\n  private int level;\n\n  public Hero(String name, int level) {\n    this.name = name;\n    this.level = level;\n  }\n\n  public void introduce() {\n    System.out.println("I am " + name + ", level " + level);\n  }\n}\n\nHero hero = new Hero("Pixel", 5);\nhero.introduce();`,
      language: "java",
    },
  },
  {
    id: "java-oop",
    title: "Inheritance & Polymorphism",
    tier: "ROOKIE",
    lesson: {
      title: "Inheritance & Polymorphism",
      concept: "Inheritance lets classes share behavior; polymorphism lets objects take many forms.",
      explanation:
        "Use 'extends' to inherit from a parent class. The child gets all public/protected members. Override methods with @Override to customize behavior. Polymorphism means a parent reference can hold child objects — the correct method runs at runtime.",
      codeExample: `public class Enemy {
  protected String name;
  protected int damage;

  public Enemy(String name, int damage) {
    this.name = name;
    this.damage = damage;
  }

  public String attack() {
    return name + " attacks for " + damage + " damage!";
  }
}

public class Boss extends Enemy {
  public Boss(String name, int damage) {
    super(name, damage * 2);
  }

  @Override
  public String attack() {
    return name + " unleashes fury for " + damage + " damage!";
  }
}

Enemy e = new Boss("Dragon", 50);
System.out.println(e.attack());`,
      language: "java",
    },
    quiz: [
      { question: "What keyword is used for inheritance in Java?", choices: ["inherits", "extends", "implements", "super"], correct: 1, explanation: "'extends' creates an is-a relationship between child and parent class." },
      { question: "What does @Override do?", choices: ["Creates a new method", "Indicates a method replaces a parent method", "Makes a method static", "Hides the parent method"], correct: 1, explanation: "@Override tells the compiler you intend to replace a parent method — it catches typos!" },
      { question: "What is polymorphism?", choices: ["Having multiple constructors", "A parent reference calling child methods", "Multiple inheritance", "Method overloading only"], correct: 1, explanation: "Polymorphism lets a parent-type variable invoke the overridden method of the actual child object." },
    ],
    challenge: {
      title: "Enemy Evolution",
      description: "Create a base class `GameEntity` with a method `describe()` that returns \"Entity\". Create a subclass `Dragon` that overrides describe() to return \"Fire Dragon\". Use polymorphism to call describe().",
      starterCode: "// Define GameEntity base class\n\n\n// Define Dragon subclass\n\n\n// Use polymorphism and print\n",
      expectedOutput: "Fire Dragon",
      hints: ["Dragon extends GameEntity", "Use @Override annotation", "GameEntity entity = new Dragon(); works via polymorphism"],
      solution: `public class GameEntity {\n  public String describe() {\n    return "Entity";\n  }\n}\n\npublic class Dragon extends GameEntity {\n  @Override\n  public String describe() {\n    return "Fire Dragon";\n  }\n}\n\nGameEntity entity = new Dragon();\nSystem.out.println(entity.describe());`,
      language: "java",
    },
  },
  {
    id: "java-collections",
    title: "Collections Framework",
    tier: "CHAMPI0N",
    lesson: {
      title: "Collections Framework",
      concept: "Java Collections provide powerful data structures for storing and manipulating groups of objects.",
      explanation:
        "The Collections Framework includes List (ordered, allows duplicates), Set (no duplicates), Map (key-value pairs), and Queue. ArrayList and HashMap are the most common. Use generics like List<String> for type safety. Collections utility class provides sorting and searching.",
      codeExample: `import java.util.*;

// ArrayList - dynamic array
List<String> inventory = new ArrayList<>();
inventory.add("Sword");
inventory.add("Shield");
inventory.add("Potion");
System.out.println(inventory.get(0)); // Sword

// HashMap - key-value store
Map<String, Integer> scores = new HashMap<>();
scores.put("Player1", 1500);
scores.put("Player2", 2300);
System.out.println(scores.get("Player2")); // 2300

// HashSet - no duplicates
Set<String> visited = new HashSet<>();
visited.add("Dungeon");
visited.add("Dungeon"); // ignored!
System.out.println(visited.size()); // 1`,
      language: "java",
    },
    quiz: [
      { question: "Which collection allows duplicate elements?", choices: ["Set", "List", "Map keys", "HashSet"], correct: 1, explanation: "Lists allow duplicates and maintain insertion order. Sets reject duplicates." },
      { question: "What does HashMap store?", choices: ["Ordered elements", "Key-value pairs", "Unique numbers", "Sorted strings"], correct: 1, explanation: "HashMap maps keys to values — each key is unique, values can repeat." },
      { question: "What happens when you add a duplicate to a HashSet?", choices: ["Exception thrown", "It's silently ignored", "It replaces the old one", "It adds at the end"], correct: 1, explanation: "HashSet ignores duplicates — add() returns false if the element already exists." },
    ],
    challenge: {
      title: "Loot Tracker",
      description: "Create a HashMap<String, Integer> called 'loot' that maps item names to quantities. Add \"Gold\" -> 100, \"Gems\" -> 5, \"Keys\" -> 3. Print the total number of items (sum of all values).",
      starterCode: "import java.util.*;\n\n// Create the loot map\n\n// Add items\n\n// Calculate and print total\n",
      expectedOutput: "108",
      hints: ["Use loot.values() to get all values", "Loop through values or use stream().mapToInt()", "Sum all the integer values together"],
      solution: `import java.util.*;\n\nMap<String, Integer> loot = new HashMap<>();\nloot.put("Gold", 100);\nloot.put("Gems", 5);\nloot.put("Keys", 3);\n\nint total = 0;\nfor (int v : loot.values()) {\n  total += v;\n}\nSystem.out.println(total);`,
      language: "java",
    },
  },
  {
    id: "java-streams",
    title: "Streams & Lambdas",
    tier: "CHAMPI0N",
    lesson: {
      title: "Streams & Lambdas",
      concept: "Streams provide a functional way to process collections; lambdas enable concise anonymous functions.",
      explanation:
        "Lambdas are short anonymous functions: (params) -> expression. Streams let you chain operations like filter, map, reduce on collections. They're lazy (only compute when needed) and support parallel processing. Common terminal operations: collect, forEach, count, reduce.",
      codeExample: `import java.util.*;
import java.util.stream.*;

List<Integer> scores = Arrays.asList(85, 42, 97, 63, 55, 78);

// Filter and transform with streams
List<Integer> highScores = scores.stream()
  .filter(s -> s >= 70)
  .sorted()
  .collect(Collectors.toList());
// [78, 85, 97]

// Map: transform elements
List<String> ranks = scores.stream()
  .map(s -> s >= 70 ? "PASS" : "FAIL")
  .collect(Collectors.toList());

// Reduce: aggregate to single value
int total = scores.stream()
  .reduce(0, Integer::sum);`,
      language: "java",
    },
    quiz: [
      { question: "What is a lambda expression?", choices: ["A named function", "An anonymous function using -> syntax", "A class method", "A loop construct"], correct: 1, explanation: "Lambdas are concise anonymous functions: (parameters) -> expression." },
      { question: "What does filter() do in a stream?", choices: ["Transforms elements", "Keeps elements matching a condition", "Sorts elements", "Counts elements"], correct: 1, explanation: "filter() takes a predicate and keeps only elements where it returns true." },
      { question: "Are streams eager or lazy?", choices: ["Eager - process immediately", "Lazy - process only when terminal op is called", "Depends on the operation", "Always parallel"], correct: 1, explanation: "Streams are lazy — intermediate operations only execute when a terminal operation is invoked." },
    ],
    challenge: {
      title: "Score Filter",
      description: "Given a list of player scores [120, 45, 89, 200, 67, 150], use streams to filter scores above 100, sort them, and collect to a list. Print the result.",
      starterCode: "import java.util.*;\nimport java.util.stream.*;\n\n// Create scores list\n\n// Use stream to filter, sort, collect\n\n// Print the result\n",
      expectedOutput: "[120, 150, 200]",
      hints: ["Use Arrays.asList() to create the list", "Chain .filter(s -> s > 100).sorted()", "Use .collect(Collectors.toList()) to get back a list"],
      solution: `import java.util.*;\nimport java.util.stream.*;\n\nList<Integer> scores = Arrays.asList(120, 45, 89, 200, 67, 150);\n\nList<Integer> highScores = scores.stream()\n  .filter(s -> s > 100)\n  .sorted()\n  .collect(Collectors.toList());\n\nSystem.out.println(highScores);`,
      language: "java",
    },
  },
  {
    id: "java-generics",
    title: "Generics",
    tier: "ELITE",
    lesson: {
      title: "Generics",
      concept: "Generics enable type-safe reusable code that works with any type.",
      explanation:
        "Generics use type parameters like <T> to write classes and methods that work with multiple types while maintaining compile-time safety. Bounded types (<T extends Comparable>) restrict allowed types. Wildcards (?) handle unknown types: <? extends T> for reading, <? super T> for writing.",
      codeExample: `// Generic class
public class Chest<T> {
  private List<T> contents = new ArrayList<>();

  public void store(T item) {
    contents.add(item);
  }

  public T retrieve() {
    return contents.remove(0);
  }
}

Chest<String> weaponChest = new Chest<>();
weaponChest.store("Excalibur");
String weapon = weaponChest.retrieve(); // No cast needed!

// Bounded generic
public static <T extends Comparable<T>> T max(T a, T b) {
  return a.compareTo(b) > 0 ? a : b;
}

// Wildcard
public static double sum(List<? extends Number> list) {
  return list.stream().mapToDouble(Number::doubleValue).sum();
}`,
      language: "java",
    },
    quiz: [
      { question: "What does <T extends Comparable<T>> mean?", choices: ["T can be anything", "T must implement Comparable", "T is a subclass of T", "T is optional"], correct: 1, explanation: "Bounded type parameters restrict T to types that implement the specified interface." },
      { question: "What is the purpose of wildcards (?)?", choices: ["To match any single character", "To represent an unknown type in generics", "To create null types", "To define varargs"], correct: 1, explanation: "Wildcards represent unknown types, useful when the exact type doesn't matter." },
      { question: "Why use generics instead of Object?", choices: ["Better performance", "Compile-time type safety without casting", "Smaller bytecode", "Required by Java"], correct: 1, explanation: "Generics catch type errors at compile time and eliminate unsafe casts." },
    ],
    challenge: {
      title: "Generic Power-Up Stack",
      description: "Create a generic class `PowerUpStack<T>` with methods push(T item), pop() returning T, and isEmpty() returning boolean. Use an internal ArrayList. Create a stack of Strings, push \"Speed\" and \"Shield\", pop one, and print it.",
      starterCode: "import java.util.*;\n\n// Define generic PowerUpStack<T>\n\n\n// Use it with Strings\n",
      expectedOutput: "Shield",
      hints: ["Use ArrayList<T> internally to store items", "pop() removes and returns the last element", "Use stack.size() - 1 as the index for pop"],
      solution: `import java.util.*;\n\npublic class PowerUpStack<T> {\n  private List<T> items = new ArrayList<>();\n\n  public void push(T item) {\n    items.add(item);\n  }\n\n  public T pop() {\n    return items.remove(items.size() - 1);\n  }\n\n  public boolean isEmpty() {\n    return items.isEmpty();\n  }\n}\n\nPowerUpStack<String> stack = new PowerUpStack<>();\nstack.push("Speed");\nstack.push("Shield");\nSystem.out.println(stack.pop());`,
      language: "java",
    },
  },
  {
    id: "java-exceptions",
    title: "Exception Handling",
    tier: "ELITE",
    lesson: {
      title: "Exception Handling",
      concept: "Exceptions handle errors gracefully without crashing your program.",
      explanation:
        "Java uses try-catch-finally blocks to handle exceptions. Checked exceptions (IOException, SQLException) must be caught or declared. Unchecked exceptions (NullPointerException, ArrayIndexOutOfBoundsException) extend RuntimeException. Create custom exceptions by extending Exception. Use 'throws' in method signatures for checked exceptions.",
      codeExample: `// Basic try-catch
try {
  int[] scores = {100, 200};
  System.out.println(scores[5]); // ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("Invalid index: " + e.getMessage());
} finally {
  System.out.println("Always runs!");
}

// Custom exception
public class GameOverException extends Exception {
  private int finalScore;

  public GameOverException(String message, int score) {
    super(message);
    this.finalScore = score;
  }

  public int getFinalScore() { return finalScore; }
}

// Throwing custom exception
public void takeDamage(int hp, int damage) throws GameOverException {
  if (damage >= hp) {
    throw new GameOverException("Player defeated!", hp);
  }
}`,
      language: "java",
    },
    quiz: [
      { question: "What's the difference between checked and unchecked exceptions?", choices: ["Checked are faster", "Checked must be caught or declared, unchecked don't", "Unchecked are more severe", "No difference"], correct: 1, explanation: "Checked exceptions force handling at compile time; unchecked exceptions (RuntimeException) don't require explicit handling." },
      { question: "When does the 'finally' block execute?", choices: ["Only on success", "Only on exception", "Always, regardless of exception", "Only if catch is present"], correct: 2, explanation: "finally always executes — whether or not an exception was thrown — great for cleanup!" },
      { question: "How do you create a custom exception?", choices: ["Implement Exception interface", "Extend Exception or RuntimeException", "Use @Exception annotation", "Declare it with throws"], correct: 1, explanation: "Custom exceptions extend Exception (checked) or RuntimeException (unchecked)." },
    ],
    challenge: {
      title: "Boss Fight Error Handler",
      description: "Create a custom exception `InsufficientManaException` that extends Exception and stores the required mana (int). Write a method `castSpell(int current, int required)` that throws it if current < required. Catch it and print the message.",
      starterCode: "// Define InsufficientManaException\n\n\n// Write castSpell method\n\n\n// Try to cast with insufficient mana, catch and print\n",
      expectedOutput: "Not enough mana! Need 50",
      hints: ["Extend Exception and add a constructor with message and int", "Use 'throw new InsufficientManaException(...)' when mana is low", "Catch the exception and print getMessage()"],
      solution: `public class InsufficientManaException extends Exception {\n  private int required;\n\n  public InsufficientManaException(String message, int required) {\n    super(message);\n    this.required = required;\n  }\n\n  public int getRequired() { return required; }\n}\n\npublic static void castSpell(int current, int required) throws InsufficientManaException {\n  if (current < required) {\n    throw new InsufficientManaException("Not enough mana! Need " + required, required);\n  }\n}\n\ntry {\n  castSpell(30, 50);\n} catch (InsufficientManaException e) {\n  System.out.println(e.getMessage());\n}`,
      language: "java",
    },
  },
];
