import { Module } from "./curriculum";

export const phpModules: Module[] = [
  {
    id: "php-variables",
    title: "Variables & Arrays",
    tier: "EASY",
    lesson: {
      title: "Variables & Arrays",
      concept: "PHP variables start with $ and are dynamically typed. Arrays are versatile ordered maps that can be indexed or associative.",
      explanation:
        "PHP variables need no type declaration — just prefix with $. PHP arrays are incredibly flexible: they can be indexed (numeric keys), associative (string keys), or multi-dimensional. Use array functions like array_push, array_merge, count, in_array, and array_map for manipulation. Short array syntax [] is preferred over array().",
      codeExample: `<?php
// Variables are dynamically typed
$playerName = "Arcade Hero";
$health = 100;
$isAlive = true;
$speed = 2.5;

// Indexed array
$weapons = ["Sword", "Bow", "Staff", "Dagger"];
echo $weapons[0]; // Sword
echo count($weapons); // 4

// Associative array
$stats = [
  "strength" => 15,
  "agility" => 12,
  "magic" => 20
];
echo $stats["magic"]; // 20

// Multi-dimensional array
$inventory = [
  ["name" => "Potion", "qty" => 5],
  ["name" => "Elixir", "qty" => 2],
];

// Array functions
array_push($weapons, "Axe");
$sorted = sort($weapons);
$hasStaff = in_array("Staff", $weapons); // true
?>`,
      language: "php",
    },
    quiz: [
      { question: "How do you declare a variable in PHP?", choices: ["var name = value", "$name = value", "let $name = value", "declare name = value"], correct: 1, explanation: "PHP variables always start with $ — no type keyword needed due to dynamic typing." },
      { question: "What type is a PHP associative array?", choices: ["A linked list", "An ordered map with string keys", "A hash table only", "A typed dictionary"], correct: 1, explanation: "PHP associative arrays are ordered maps where keys can be strings, making them extremely versatile." },
      { question: "What does count() return for an array?", choices: ["The memory size", "The number of elements", "The last index", "The max value"], correct: 1, explanation: "count() returns the total number of elements in the array." },
    ],
    challenge: {
      title: "Player Stats Array",
      description: "Create an associative array $player with keys 'name' => 'Hero', 'level' => 10, 'xp' => 2500. Print \"Hero is level 10 with 2500 XP\".",
      starterCode: "<?php\n// Create player array\n\n// Print player info\n?>",
      expectedOutput: "Hero is level 10 with 2500 XP",
      hints: ["Use $player = ['name' => 'Hero', 'level' => 10, 'xp' => 2500]", "Access values with $player['name'], $player['level'], etc.", "Use echo or printf for output"],
      solution: `<?php\n$player = [\n  'name' => 'Hero',\n  'level' => 10,\n  'xp' => 2500\n];\n\necho $player['name'] . " is level " . $player['level'] . " with " . $player['xp'] . " XP\\n";\n?>`,
      language: "php",
    },
  },
  {
    id: "php-functions",
    title: "Functions",
    tier: "EASY",
    lesson: {
      title: "Functions",
      concept: "Functions in PHP encapsulate reusable logic and support default parameters, type hints, and variable-length arguments.",
      explanation:
        "Define functions with the 'function' keyword. PHP supports default parameter values, type declarations (int, string, array, bool, float), return types, nullable types (?int), and variadic arguments (...$args). Anonymous functions (closures) can be assigned to variables. Arrow functions (fn =>) provide concise one-expression closures.",
      codeExample: `<?php
// Basic function with type hints
function calculateDamage(int $base, float $multiplier = 1.0): int {
  return (int)($base * $multiplier);
}

echo calculateDamage(50, 1.5); // 75
echo calculateDamage(30);      // 30 (uses default)

// Variadic function
function sumScores(int ...$scores): int {
  return array_sum($scores);
}
echo sumScores(100, 250, 75); // 425

// Anonymous function (closure)
$greet = function(string $name): string {
  return "Welcome, $name!";
};
echo $greet("Player"); // Welcome, Player!

// Arrow function (PHP 7.4+)
$double = fn(int $x): int => $x * 2;
echo $double(25); // 50

// Closure using outer variable
$bonus = 10;
$addBonus = fn(int $score) => $score + $bonus;
echo $addBonus(100); // 110
?>`,
      language: "php",
    },
    quiz: [
      { question: "What does a default parameter value do?", choices: ["Makes the parameter required", "Provides a fallback if no argument is passed", "Overrides any passed value", "Makes the function static"], correct: 1, explanation: "Default values let you call a function without providing that argument — the default is used instead." },
      { question: "What is the syntax for an arrow function in PHP?", choices: ["(x) => x * 2", "fn($x) => $x * 2", "=> ($x) $x * 2", "arrow($x) { $x * 2 }"], correct: 1, explanation: "Arrow functions use fn keyword: fn($param) => expression — they auto-capture outer scope variables." },
      { question: "What does ...$args do in a function parameter?", choices: ["Spreads an array", "Accepts variable number of arguments", "Makes args optional", "Creates a reference"], correct: 1, explanation: "The splat operator ... collects all remaining arguments into an array (variadic parameters)." },
    ],
    challenge: {
      title: "Power Calculator",
      description: "Create a function `powerUp(string $name, int $level, int $boost = 5): string` that returns \"{name} powered up to level {level + boost}!\". Call it with (\"Hero\", 10) and print the result.",
      starterCode: "<?php\n// Define powerUp function\n\n// Call and print\n?>",
      expectedOutput: "Hero powered up to level 15!",
      hints: ["Use the function keyword with type hints: function powerUp(string $name, int $level, int $boost = 5): string", "Return a string with interpolation or concatenation", "The default boost of 5 is used when not specified"],
      solution: `<?php\nfunction powerUp(string $name, int $level, int $boost = 5): string {\n  return "$name powered up to level " . ($level + $boost) . "!";\n}\n\necho powerUp("Hero", 10) . "\\n";\n?>`,
      language: "php",
    },
  },
  {
    id: "php-oop",
    title: "Object-Oriented PHP",
    tier: "MEDIUM",
    lesson: {
      title: "Object-Oriented PHP",
      concept: "PHP supports full OOP with classes, interfaces, traits, abstract classes, and visibility modifiers.",
      explanation:
        "Classes define properties and methods with visibility (public, protected, private). Constructors use __construct(). PHP supports single inheritance (extends), interfaces (implements), and traits for code reuse. Use 'static' for class-level members, 'abstract' for must-implement methods, and 'final' to prevent overriding.",
      codeExample: `<?php
interface Attackable {
  public function attack(): int;
}

trait Healable {
  public function heal(int $amount): void {
    $this->health = min($this->health + $amount, $this->maxHealth);
    echo "{$this->name} healed for $amount HP!\\n";
  }
}

abstract class Character {
  protected string $name;
  protected int $health;
  protected int $maxHealth;

  public function __construct(string $name, int $health) {
    $this->name = $name;
    $this->health = $health;
    $this->maxHealth = $health;
  }

  abstract public function specialAbility(): string;

  public function getHealth(): int {
    return $this->health;
  }
}

class Warrior extends Character implements Attackable {
  use Healable;

  private int $strength;

  public function __construct(string $name, int $health, int $strength) {
    parent::__construct($name, $health);
    $this->strength = $strength;
  }

  public function attack(): int {
    return $this->strength * 2;
  }

  public function specialAbility(): string {
    return "{$this->name} uses Shield Bash!";
  }
}

$warrior = new Warrior("Knight", 100, 25);
echo $warrior->attack(); // 50
echo $warrior->specialAbility();
$warrior->heal(20);
?>`,
      language: "php",
    },
    quiz: [
      { question: "What is a trait in PHP?", choices: ["A type of interface", "A mechanism for code reuse in single-inheritance languages", "A class property", "A design pattern"], correct: 1, explanation: "Traits let you reuse methods across multiple classes without inheritance — solving the diamond problem." },
      { question: "What does 'abstract' mean for a class?", choices: ["It cannot be instantiated directly", "It has no methods", "It's automatically static", "It cannot have constructors"], correct: 0, explanation: "Abstract classes cannot be instantiated — they serve as blueprints that must be extended." },
      { question: "How do you call a parent constructor in PHP?", choices: ["super()", "parent::__construct()", "this.parent()", "$parent->construct()"], correct: 1, explanation: "Use parent::__construct() to call the parent class constructor from the child." },
    ],
    challenge: {
      title: "RPG Class System",
      description: "Create a class `Mage` with private property $mana (int), constructor setting name and mana, and a method `castSpell(): string` that returns \"{name} casts Fireball! (Mana: {mana})\". Create a mage named \"Wizard\" with 80 mana and print castSpell().",
      starterCode: "<?php\n// Define Mage class\n\n// Create instance and print\n?>",
      expectedOutput: "Wizard casts Fireball! (Mana: 80)",
      hints: ["Use private string $name and private int $mana properties", "Constructor takes $name and $mana parameters", "Use string interpolation: \"{$this->name} casts Fireball! (Mana: {$this->mana})\""],
      solution: `<?php\nclass Mage {\n  private string $name;\n  private int $mana;\n\n  public function __construct(string $name, int $mana) {\n    $this->name = $name;\n    $this->mana = $mana;\n  }\n\n  public function castSpell(): string {\n    return "{$this->name} casts Fireball! (Mana: {$this->mana})";\n  }\n}\n\n$mage = new Mage("Wizard", 80);\necho $mage->castSpell() . "\\n";\n?>`,
      language: "php",
    },
  },
  {
    id: "php-database",
    title: "Database Queries (PDO)",
    tier: "MEDIUM",
    lesson: {
      title: "Database Queries (PDO)",
      concept: "PDO (PHP Data Objects) provides a secure, database-agnostic interface for querying databases with prepared statements.",
      explanation:
        "PDO connects to MySQL, PostgreSQL, SQLite, and more using a DSN string. Prepared statements with placeholders (:name or ?) prevent SQL injection. Use prepare(), execute(), fetch(), and fetchAll(). Set error mode to exceptions for proper error handling. Transactions group operations atomically with beginTransaction/commit/rollback.",
      codeExample: `<?php
// Connection with error handling
try {
  $pdo = new PDO(
    'mysql:host=localhost;dbname=arcade_db;charset=utf8mb4',
    'username',
    'password',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
} catch (PDOException $e) {
  die("Connection failed: " . $e->getMessage());
}

// INSERT with prepared statement (prevents SQL injection)
$stmt = $pdo->prepare("INSERT INTO players (name, score) VALUES (:name, :score)");
$stmt->execute(['name' => 'ArcadeHero', 'score' => 9500]);

// SELECT with fetch
$stmt = $pdo->prepare("SELECT * FROM players WHERE score > :min");
$stmt->execute(['min' => 5000]);
$topPlayers = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($topPlayers as $player) {
  echo "{$player['name']}: {$player['score']}\\n";
}

// Transaction
$pdo->beginTransaction();
try {
  $pdo->exec("UPDATE players SET score = score + 100 WHERE name = 'ArcadeHero'");
  $pdo->exec("INSERT INTO logs (action) VALUES ('bonus_applied')");
  $pdo->commit();
} catch (Exception $e) {
  $pdo->rollBack();
  echo "Transaction failed: " . $e->getMessage();
}
?>`,
      language: "php",
    },
    quiz: [
      { question: "Why use prepared statements instead of direct queries?", choices: ["They're faster", "They prevent SQL injection attacks", "They're required by PHP", "They auto-create tables"], correct: 1, explanation: "Prepared statements separate SQL logic from data, making SQL injection impossible — always use them!" },
      { question: "What does PDO::FETCH_ASSOC return?", choices: ["Numeric array", "Associative array with column names as keys", "Object instance", "Raw SQL string"], correct: 1, explanation: "FETCH_ASSOC returns each row as an associative array indexed by column name." },
      { question: "What happens if you call rollBack() in a transaction?", choices: ["Saves partial changes", "Undoes all operations since beginTransaction()", "Deletes the database", "Restarts the connection"], correct: 1, explanation: "rollBack() undoes ALL changes made since beginTransaction() — it's all-or-nothing!" },
    ],
    challenge: {
      title: "Safe Query Builder",
      description: "Write a prepared statement that selects all players with a score above a variable $minScore (set to 1000). Use a named placeholder :min_score. Show the prepare and execute calls, then fetch all results as associative arrays. Print \"Found: \" followed by the count of results.",
      starterCode: "<?php\n// Assume $pdo is already connected\n$minScore = 1000;\n\n// Prepare and execute query\n\n// Fetch results and print count\n?>",
      expectedOutput: "Found: 3",
      hints: ["Use $stmt = $pdo->prepare(\"SELECT * FROM players WHERE score > :min_score\")", "Execute with $stmt->execute(['min_score' => $minScore])", "Use count($results) or $stmt->rowCount() for the count"],
      solution: `<?php\n$minScore = 1000;\n\n$stmt = $pdo->prepare("SELECT * FROM players WHERE score > :min_score");\n$stmt->execute(['min_score' => $minScore]);\n$results = $stmt->fetchAll(PDO::FETCH_ASSOC);\n\necho "Found: " . count($results) . "\\n";\n?>`,
      language: "php",
    },
  },
  {
    id: "php-sessions",
    title: "Sessions & Cookies",
    tier: "HARD",
    lesson: {
      title: "Sessions & Cookies",
      concept: "Sessions store user data server-side across requests; cookies store small data client-side in the browser.",
      explanation:
        "Sessions use session_start() to begin and $_SESSION superglobal to store/read data. Session IDs are stored as cookies. Cookies use setcookie() and are accessed via $_COOKIE. Sessions are more secure (server-side) while cookies are limited (4KB, client-visible). Use session_destroy() to end sessions. Configure session settings for security: httponly, secure, samesite flags.",
      codeExample: `<?php
// Start session (must be before any output)
session_start();

// Store data in session
$_SESSION['player_name'] = 'ArcadeHero';
$_SESSION['score'] = 5000;
$_SESSION['logged_in'] = true;

// Read session data
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
  echo "Welcome back, {$_SESSION['player_name']}!\\n";
  echo "Your score: {$_SESSION['score']}\\n";
}

// Update session
$_SESSION['score'] += 100;

// Setting cookies (secure)
setcookie('theme', 'dark', [
  'expires' => time() + 86400 * 30, // 30 days
  'path' => '/',
  'secure' => true,
  'httponly' => true,
  'samesite' => 'Strict'
]);

// Reading cookies
$theme = $_COOKIE['theme'] ?? 'light';

// Destroy session (logout)
function logout(): void {
  session_unset();
  session_destroy();
  setcookie(session_name(), '', time() - 3600);
}

// Session security: regenerate ID to prevent fixation
session_regenerate_id(true);
?>`,
      language: "php",
    },
    quiz: [
      { question: "Where is session data stored?", choices: ["In the browser cookie", "On the server", "In the URL", "In the database"], correct: 1, explanation: "Session data is stored server-side (typically in files). Only the session ID is sent to the client as a cookie." },
      { question: "Why call session_regenerate_id()?", choices: ["To improve performance", "To prevent session fixation attacks", "To create a new session", "To delete old sessions"], correct: 1, explanation: "Regenerating the session ID prevents attackers from using a known session ID to hijack sessions." },
      { question: "What does the 'httponly' cookie flag do?", choices: ["Only works on HTTP sites", "Prevents JavaScript from accessing the cookie", "Encrypts the cookie", "Makes it expire on close"], correct: 1, explanation: "httponly prevents client-side JavaScript from reading the cookie — protecting against XSS attacks!" },
    ],
    challenge: {
      title: "Login Session Manager",
      description: "Write code that starts a session, checks if 'login_count' exists in $_SESSION. If it does, increment it. If not, set it to 1. Print \"Login count: X\" where X is the current count. For the expected output, assume this is the 3rd visit.",
      starterCode: "<?php\n// Start session\n\n// Check and update login count\n\n// Print login count\n?>",
      expectedOutput: "Login count: 3",
      hints: ["Use session_start() first", "Check with isset($_SESSION['login_count'])", "Use ++ to increment or = 1 to initialize"],
      solution: `<?php\nsession_start();\n\nif (isset($_SESSION['login_count'])) {\n  $_SESSION['login_count']++;\n} else {\n  $_SESSION['login_count'] = 1;\n}\n\necho "Login count: {$_SESSION['login_count']}\\n";\n?>`,
      language: "php",
    },
  },
  {
    id: "php-modern",
    title: "Modern PHP 8 Features",
    tier: "HARD",
    lesson: {
      title: "Modern PHP 8 Features",
      concept: "PHP 8 introduced powerful features: named arguments, match expressions, union types, constructor promotion, enums, and fibers.",
      explanation:
        "Constructor promotion reduces boilerplate by declaring properties in the constructor signature. Named arguments improve readability for functions with many parameters. Match expressions are strict alternatives to switch. Union types (int|string) allow multiple types. Enums provide type-safe constants. Nullsafe operator (?->) chains null checks elegantly.",
      codeExample: `<?php
// Constructor promotion (PHP 8.0)
class Player {
  public function __construct(
    private readonly string $name,
    private int $health = 100,
    private int $level = 1,
  ) {}

  public function getName(): string { return $this->name; }
  public function getLevel(): int { return $this->level; }
}

// Named arguments
$player = new Player(name: 'Hero', level: 5, health: 200);

// Match expression (strict comparison)
$rank = match(true) {
  $player->getLevel() >= 50 => 'Master',
  $player->getLevel() >= 20 => 'Veteran',
  $player->getLevel() >= 5 => 'Skilled',
  default => 'Novice',
};
echo "$rank\\n"; // Skilled

// Enum (PHP 8.1)
enum Element: string {
  case Fire = 'fire';
  case Water = 'water';
  case Earth = 'earth';

  public function weakness(): self {
    return match($this) {
      self::Fire => self::Water,
      self::Water => self::Earth,
      self::Earth => self::Fire,
    };
  }
}

$elem = Element::Fire;
echo $elem->weakness()->value; // water

// Nullsafe operator
$guild = $player?->getGuild()?->getName() ?? 'No Guild';

// Union types & intersection types
function processId(int|string $id): string {
  return "ID: $id";
}
?>`,
      language: "php",
    },
    quiz: [
      { question: "What does constructor promotion do?", choices: ["Speeds up object creation", "Declares and assigns properties in the constructor signature", "Makes constructors optional", "Auto-generates getters"], correct: 1, explanation: "Constructor promotion lets you declare class properties directly in the constructor parameters — less boilerplate!" },
      { question: "How does match differ from switch?", choices: ["match uses loose comparison", "match uses strict comparison and returns a value", "match doesn't need break", "Both B and C are correct"], correct: 3, explanation: "match uses strict === comparison, returns a value, and doesn't fall through — no break needed!" },
      { question: "What does the nullsafe operator (?->) do?", choices: ["Throws an exception on null", "Returns null if any part of the chain is null", "Creates a null value", "Checks types at runtime"], correct: 1, explanation: "The nullsafe operator short-circuits to null if any intermediate value is null — no more nested if-null checks!" },
    ],
    challenge: {
      title: "Modern Game Entity",
      description: "Create a class `GameItem` using constructor promotion with readonly string $name, int $power, and string $rarity = 'common'. Use a match expression to return an emoji based on rarity: 'legendary' => '⭐', 'rare' => '💎', default => '📦'. Print \"{emoji} {name} (Power: {power})\" for a legendary item named \"Excalibur\" with power 99.",
      starterCode: "<?php\n// Define GameItem with constructor promotion\n\n// Create legendary item and print\n?>",
      expectedOutput: "⭐ Excalibur (Power: 99)",
      hints: ["Use public function __construct(private readonly string $name, private int $power, private string $rarity = 'common') {}", "Create a method that uses match($this->rarity) to return the emoji", "Call new GameItem(name: 'Excalibur', power: 99, rarity: 'legendary')"],
      solution: `<?php\nclass GameItem {\n  public function __construct(\n    private readonly string $name,\n    private int $power,\n    private string $rarity = 'common',\n  ) {}\n\n  public function getEmoji(): string {\n    return match($this->rarity) {\n      'legendary' => '⭐',\n      'rare' => '💎',\n      default => '📦',\n    };\n  }\n\n  public function display(): string {\n    return "{$this->getEmoji()} {$this->name} (Power: {$this->power})";\n  }\n}\n\n$item = new GameItem(name: 'Excalibur', power: 99, rarity: 'legendary');\necho $item->display() . "\\n";\n?>`,
      language: "php",
    },
  },
];
