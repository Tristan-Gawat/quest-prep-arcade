import { Module } from "./curriculum";

export const perlModules: Module[] = [
  {
    id: "perl-scalars",
    title: "Scalars & Variables",
    tier: "EASY",
    lesson: {
      title: "Scalars & Variables",
      concept: "Scalars are single-value variables — the basic building blocks of Perl.",
      explanation:
        "In Perl, scalars start with $ and hold a single value: a number, string, or reference. Perl is dynamically typed, so a scalar can switch between types. Use 'my' to declare lexical variables. Perl auto-converts between strings and numbers based on context.",
      codeExample: `my $player_name = "Pixel Knight";
my $health = 100;
my $pi = 3.14159;

# String interpolation
print "Hero: $player_name\\n";
print "HP: $health\\n";

# Perl auto-converts types
my $level = "5";
my $next_level = $level + 1;  # 6 (numeric context)
print "Next level: $next_level\\n";`,
      language: "perl",
    },
    quiz: [
      {
        question: "What sigil (prefix) denotes a scalar in Perl?",
        choices: ["@", "$", "%", "&"],
        correct: 1,
        explanation: "$ marks scalar variables — single values like numbers or strings.",
      },
      {
        question: "What keyword declares a lexical variable in Perl?",
        choices: ["var", "let", "my", "dim"],
        correct: 2,
        explanation: "'my' creates a lexically-scoped variable, limiting it to the enclosing block.",
      },
      {
        question: "What happens when you add 1 to the string '5' in Perl?",
        choices: ["Error", "51", "6", "undefined"],
        correct: 2,
        explanation: "Perl auto-converts '5' to numeric 5 in numeric context, so the result is 6.",
      },
    ],
    challenge: {
      title: "Hero Stats Setup",
      description:
        "Declare three scalars: $name set to 'ArcadeHero', $hp set to 100, and $score set to 0. Add 50 to $score, then print all stats in format: 'Name: ArcadeHero HP: 100 Score: 50'.",
      starterCode: "# Declare your hero's stats\n\n\n# Add 50 to score\n\n\n# Print the stats\n",
      expectedOutput: "Name: ArcadeHero HP: 100 Score: 50",
      hints: [
        "Use my $name = 'ArcadeHero';",
        "Use += to add to score",
        "Use print with double quotes for interpolation",
      ],
      solution: `my $name = "ArcadeHero";\nmy $hp = 100;\nmy $score = 0;\n\n$score += 50;\n\nprint "Name: $name HP: $hp Score: $score\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-arrays-hashes",
    title: "Arrays & Hashes",
    tier: "EASY",
    lesson: {
      title: "Arrays & Hashes",
      concept: "Arrays store ordered lists; hashes store key-value pairs — your inventory systems!",
      explanation:
        "Arrays use @ and hold ordered lists of scalars. Hashes use % and map keys to values. Access array elements with $array[index] and hash values with $hash{key}. Use push/pop for arrays. Keys() and values() extract hash components.",
      codeExample: `# Arrays
my @inventory = ("Sword", "Shield", "Potion");
push @inventory, "Bow";
print "$inventory[0]\\n";  # Sword
print scalar @inventory;   # 4 (count)

# Hashes
my %stats = (
  strength => 15,
  agility  => 12,
  magic    => 8,
);
print "STR: $stats{strength}\\n";
$stats{magic} = 10;  # Update

# Iterate hash
for my $key (keys %stats) {
  print "$key => $stats{$key}\\n";
}`,
      language: "perl",
    },
    quiz: [
      {
        question: "What sigil denotes an array in Perl?",
        choices: ["$", "@", "%", "*"],
        correct: 1,
        explanation: "@ is for arrays. Remember: @ looks like 'a' for array!",
      },
      {
        question: "How do you access the value for key 'hp' in hash %player?",
        choices: ["$player[hp]", "$player{hp}", "%player{hp}", "@player{hp}"],
        correct: 1,
        explanation: "Use $ (scalar) with {key} braces to fetch a single hash value.",
      },
      {
        question: "What does 'scalar @array' return?",
        choices: ["The first element", "The last element", "The number of elements", "A reference"],
        correct: 2,
        explanation: "In scalar context, an array returns its count — useful for checking inventory size!",
      },
    ],
    challenge: {
      title: "Inventory Manager",
      description:
        "Create an array @loot with ('Gold', 'Gem', 'Key'). Create a hash %prices mapping Gold=>100, Gem=>50, Key=>10. Print the price of 'Gem'.",
      starterCode: "# Create the loot array\n\n\n# Create the prices hash\n\n\n# Print the price of Gem\n",
      expectedOutput: "50",
      hints: [
        "Use my @loot = ('Gold', 'Gem', 'Key');",
        "Use => (fat comma) for hash key-value pairs",
        "Access with $prices{Gem}",
      ],
      solution: `my @loot = ("Gold", "Gem", "Key");\n\nmy %prices = (\n  Gold => 100,\n  Gem  => 50,\n  Key  => 10,\n);\n\nprint "$prices{Gem}\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-regex",
    title: "Regular Expressions",
    tier: "EASY",
    lesson: {
      title: "Regular Expressions",
      concept: "Perl's regex engine is legendary — pattern matching is built into the language's DNA.",
      explanation:
        "Use =~ to bind a regex to a string. m// matches patterns, s/// substitutes, and tr/// transliterates characters. Modifiers: /i (case-insensitive), /g (global), /x (extended). Capture groups with () store matches in $1, $2, etc. Perl regex is so powerful it inspired most other languages.",
      codeExample: `my $quest = "Defeat the Dragon of Level 42";

# Match and capture
if ($quest =~ /Level (\\d+)/) {
  print "Level found: $1\\n";  # 42
}

# Substitution
my $msg = "Game Over";
$msg =~ s/Over/On/;
print "$msg\\n";  # Game On

# Global match
my $loot = "gold gold silver gold";
my $count = () = $loot =~ /gold/g;
print "Gold count: $count\\n";  # 3`,
      language: "perl",
    },
    quiz: [
      {
        question: "What operator binds a regex to a variable?",
        choices: ["==", "=~", "~~", "->"],
        correct: 1,
        explanation: "=~ (binding operator) applies a regex pattern to the variable on the left.",
      },
      {
        question: "What does s/foo/bar/g do?",
        choices: [
          "Finds 'foo' once",
          "Replaces all 'foo' with 'bar'",
          "Deletes 'foo' and 'bar'",
          "Counts 'foo'",
        ],
        correct: 1,
        explanation: "s/// substitutes matches; /g makes it replace ALL occurrences, not just the first.",
      },
      {
        question: "Where is the first capture group stored?",
        choices: ["$0", "$1", "$capture", "@matches"],
        correct: 1,
        explanation: "$1 holds the first parenthesized capture group match. $2 holds the second, etc.",
      },
    ],
    challenge: {
      title: "Pattern Quest",
      description:
        "Given $text = 'Player scored 999 points', extract the number using a regex capture group and print it.",
      starterCode: "my $text = 'Player scored 999 points';\n\n# Extract the number with regex\n\n\n# Print the captured number\n",
      expectedOutput: "999",
      hints: [
        "Use \\d+ to match one or more digits",
        "Wrap in parentheses to capture: (\\d+)",
        "The captured value is in $1",
      ],
      solution: `my $text = "Player scored 999 points";\n\nif ($text =~ /(\\d+)/) {\n  print "$1\\n";\n}`,
      language: "perl",
    },
  },

  {
    id: "perl-file-handling",
    title: "File Handling",
    tier: "EASY",
    lesson: {
      title: "File Handling",
      concept: "Reading and writing files — loading save games and logging quest progress.",
      explanation:
        "Use open() with filehandles to read/write files. Modes: '<' (read), '>' (write/overwrite), '>>' (append). Always check if open succeeds with 'or die'. Use while(<FH>) to read line by line. chomp() removes trailing newlines. The three-argument form of open is preferred for safety.",
      codeExample: `# Writing to a file
open(my $fh, '>', 'save_game.txt') or die "Cannot write: $!";
print $fh "Player: ArcadeKnight\\n";
print $fh "Level: 42\\n";
close($fh);

# Reading from a file
open(my $in, '<', 'save_game.txt') or die "Cannot read: $!";
while (my $line = <$in>) {
  chomp $line;
  print "Loaded: $line\\n";
}
close($in);

# Appending
open(my $log, '>>', 'quest_log.txt') or die "Cannot append: $!";
print $log "Quest completed at " . localtime() . "\\n";
close($log);`,
      language: "perl",
    },
    quiz: [
      {
        question: "What mode string opens a file for reading?",
        choices: ["'>'", "'>>'", "'<'", "'rw'"],
        correct: 2,
        explanation: "'<' opens for reading. '>' overwrites, '>>' appends.",
      },
      {
        question: "What does 'or die' do after open()?",
        choices: [
          "Closes the file",
          "Terminates the program with an error if open fails",
          "Retries the operation",
          "Ignores errors",
        ],
        correct: 1,
        explanation: "'or die' stops execution with an error message if the open fails — essential error handling!",
      },
      {
        question: "What does chomp() do?",
        choices: [
          "Adds a newline",
          "Removes trailing newline from a string",
          "Splits a string",
          "Trims all whitespace",
        ],
        correct: 1,
        explanation: "chomp() removes the trailing newline character — critical when reading files line by line.",
      },
    ],
    challenge: {
      title: "Save File Writer",
      description:
        "Open a file 'hero.txt' for writing, write 'HP:100' to it, close it. Then open it for reading, read the line, chomp it, and print it.",
      starterCode: "# Write to hero.txt\n\n\n# Read from hero.txt and print\n",
      expectedOutput: "HP:100",
      hints: [
        "Use open(my $fh, '>', 'hero.txt')",
        "Use print $fh to write to the filehandle",
        "Read with <$in> and chomp the result",
      ],
      solution: `open(my $fh, '>', 'hero.txt') or die "Cannot write: $!";\nprint $fh "HP:100\\n";\nclose($fh);\n\nopen(my $in, '<', 'hero.txt') or die "Cannot read: $!";\nmy $line = <$in>;\nchomp $line;\nprint "$line\\n";\nclose($in);`,
      language: "perl",
    },
  },

  {
    id: "perl-subroutines",
    title: "Subroutines",
    tier: "MEDIUM",
    lesson: {
      title: "Subroutines",
      concept: "Subroutines are reusable spells — define once, cast anywhere in your code.",
      explanation:
        "Define subroutines with 'sub name { }'. Arguments arrive in the special @_ array. Use shift or list assignment to unpack them. Subroutines return the last evaluated expression or use explicit 'return'. Perl supports prototypes but modern style prefers signatures (5.20+).",
      codeExample: `# Basic subroutine
sub greet_hero {
  my ($name, $level) = @_;
  return "Hail, $name (Lvl $level)!";
}
print greet_hero("Pixel", 10) . "\\n";

# Default values
sub attack {
  my ($damage, $multiplier) = @_;
  $multiplier //= 1;  # default to 1
  return $damage * $multiplier;
}
print attack(25) . "\\n";     # 25
print attack(25, 3) . "\\n";  # 75

# Returning multiple values
sub get_position {
  return (42, 17);  # x, y
}
my ($x, $y) = get_position();`,
      language: "perl",
    },
    quiz: [
      {
        question: "Where do subroutine arguments arrive in Perl?",
        choices: ["$args", "@ARGV", "@_", "%params"],
        correct: 2,
        explanation: "@_ is the special array containing all arguments passed to a subroutine.",
      },
      {
        question: "What does //= do?",
        choices: [
          "Division assignment",
          "Assigns only if the variable is undefined",
          "Comment",
          "Regex assignment",
        ],
        correct: 1,
        explanation: "//= (defined-or assignment) sets a value only when the variable is undef — great for defaults!",
      },
      {
        question: "What does a subroutine return if there's no explicit return?",
        choices: ["undef always", "The last evaluated expression", "0", "An empty list"],
        correct: 1,
        explanation: "Perl subroutines implicitly return the value of the last expression evaluated.",
      },
    ],
    challenge: {
      title: "Damage Calculator",
      description:
        "Write a subroutine 'calc_damage' that takes $base and $crit_multiplier. If $crit_multiplier is undefined, default it to 1. Return $base * $crit_multiplier. Call it with (50, 3) and print the result.",
      starterCode: "# Define calc_damage subroutine\n\n\n# Call with (50, 3) and print\n",
      expectedOutput: "150",
      hints: [
        "Use my ($base, $crit) = @_; to unpack arguments",
        "Use $crit //= 1; for the default",
        "return $base * $crit;",
      ],
      solution: `sub calc_damage {\n  my ($base, $crit) = @_;\n  $crit //= 1;\n  return $base * $crit;\n}\n\nprint calc_damage(50, 3) . "\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-oop",
    title: "OOP with Moose/Moo",
    tier: "MEDIUM",
    lesson: {
      title: "OOP with Moose/Moo",
      concept: "Modern Perl OOP — building character classes with real class systems.",
      explanation:
        "Classic Perl OOP uses bless() but modern Perl uses Moose or Moo. Moo is lightweight; Moose is full-featured. Declare attributes with 'has', specify 'is' (ro/rw), 'isa' for types, 'default' for values. Inheritance uses 'extends'. Roles (like interfaces) use 'with'.",
      codeExample: `package Hero;
use Moo;

has name   => (is => 'ro', required => 1);
has hp     => (is => 'rw', default => sub { 100 });
has level  => (is => 'rw', default => sub { 1 });

sub take_damage {
  my ($self, $amount) = @_;
  $self->hp($self->hp - $amount);
  return $self->hp;
}

sub describe {
  my ($self) = @_;
  return $self->name . " [Lvl " . $self->level . "] HP:" . $self->hp;
}

# Usage
my $hero = Hero->new(name => "PixelBlade");
$hero->take_damage(20);
print $hero->describe() . "\\n";`,
      language: "perl",
    },
    quiz: [
      {
        question: "What does 'has' do in Moose/Moo?",
        choices: ["Checks existence", "Declares a class attribute", "Creates a hash", "Imports a module"],
        correct: 1,
        explanation: "'has' declares an attribute with options like type, default, and read/write access.",
      },
      {
        question: "What does 'is => \"ro\"' mean?",
        choices: ["Read-only attribute", "Read-write attribute", "Required attribute", "Optional attribute"],
        correct: 0,
        explanation: "'ro' means read-only — once set, the attribute cannot be changed.",
      },
      {
        question: "How do you create an object in Moose/Moo?",
        choices: ["new Hero()", "Hero->new()", "bless {}, Hero", "Hero::create()"],
        correct: 1,
        explanation: "ClassName->new(args) is the standard constructor call in Perl OOP.",
      },
    ],
    challenge: {
      title: "Build a Character Class",
      description:
        "Create a package 'Warrior' using Moo with attributes: name (ro, required), strength (rw, default 10). Add a method 'power_attack' that returns strength * 2. Create a warrior named 'Thorin' and print the power_attack result.",
      starterCode: "package Warrior;\nuse Moo;\n\n# Add attributes and method\n\n\npackage main;\n# Create warrior and print power_attack\n",
      expectedOutput: "20",
      hints: [
        "Use has name => (is => 'ro', required => 1);",
        "Default for strength: default => sub { 10 }",
        "power_attack returns $self->strength * 2",
      ],
      solution: `package Warrior;\nuse Moo;\n\nhas name     => (is => 'ro', required => 1);\nhas strength => (is => 'rw', default => sub { 10 });\n\nsub power_attack {\n  my ($self) = @_;\n  return $self->strength * 2;\n}\n\npackage main;\nmy $w = Warrior->new(name => "Thorin");\nprint $w->power_attack() . "\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-references",
    title: "References & Data Structures",
    tier: "MEDIUM",
    lesson: {
      title: "References & Data Structures",
      concept: "References unlock complex nested structures — multi-level dungeon maps in data form.",
      explanation:
        "A reference is a scalar that points to another value. Create with \\@array, \\%hash, or anonymous constructors: [] for arrayrefs, {} for hashrefs. Dereference with @{$ref}, ${$ref}[0], or arrow syntax $ref->[0], $ref->{key}. Nest them to build complex structures.",
      codeExample: `# Array reference
my $weapons = ["Sword", "Bow", "Staff"];
print $weapons->[0] . "\\n";  # Sword

# Hash reference
my $player = {
  name  => "ArcadeMage",
  stats => { hp => 80, mp => 120 },
  items => ["Wand", "Robe"],
};

# Nested access with arrows
print $player->{name} . "\\n";           # ArcadeMage
print $player->{stats}{hp} . "\\n";     # 80
print $player->{items}[0] . "\\n";      # Wand

# Array of hashes (common pattern)
my @party = (
  { name => "Tank", role => "defense" },
  { name => "Healer", role => "support" },
);
print $party[1]{role} . "\\n";  # support`,
      language: "perl",
    },
    quiz: [
      {
        question: "What does \\ do before a variable?",
        choices: ["Escapes it", "Creates a reference to it", "Copies it", "Deletes it"],
        correct: 1,
        explanation: "\\ creates a reference (pointer) to the variable — like getting its memory address.",
      },
      {
        question: "What does -> do between a reference and an index?",
        choices: ["Concatenation", "Dereferences and accesses the element", "Assignment", "Comparison"],
        correct: 1,
        explanation: "The arrow operator dereferences a reference and accesses an element: $ref->[0] or $ref->{key}.",
      },
      {
        question: "How do you create an anonymous hash reference?",
        choices: ["()", "{}", "[]", "\\%()"],
        correct: 1,
        explanation: "{} creates an anonymous hashref. [] creates an anonymous arrayref.",
      },
    ],
    challenge: {
      title: "Nested Dungeon Map",
      description:
        "Create a hashref $dungeon with keys 'name' => 'Shadow Cave' and 'levels' => an arrayref of [1, 2, 3]. Print the dungeon name and the second level number.",
      starterCode: "# Create the dungeon hashref\n\n\n# Print name and second level\n",
      expectedOutput: "Shadow Cave\n2",
      hints: [
        "Use { } for hashref and [ ] for arrayref",
        "Access with $dungeon->{name}",
        "Second level: $dungeon->{levels}[1]",
      ],
      solution: `my $dungeon = {\n  name   => "Shadow Cave",\n  levels => [1, 2, 3],\n};\n\nprint $dungeon->{name} . "\\n";\nprint $dungeon->{levels}[1] . "\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-one-liners",
    title: "One-Liners & CLI Magic",
    tier: "MEDIUM",
    lesson: {
      title: "One-Liners & CLI Magic",
      concept: "Perl one-liners are command-line power-ups — solve problems in a single incantation.",
      explanation:
        "Run Perl from the command line with 'perl -e'. Flags: -n (loop over input lines), -p (same + auto-print), -i (in-place edit), -a (auto-split into @F). $_ is the default variable. One-liners excel at text processing, log analysis, and quick transformations.",
      codeExample: `# Print lines matching a pattern
# perl -ne 'print if /error/i' logfile.txt

# Replace text in-place
# perl -pi -e 's/old/new/g' config.txt

# Sum numbers from input
# cat scores.txt | perl -ne '$sum += $_; END { print "$sum\\n" }'

# In-script one-liner style:
my @lines = ("Player1: 100", "Player2: 200", "Player3: 150");

# Grep-like filter
my @winners = grep { /[2-9]\\d{2}/ } @lines;
print "$_\\n" for @winners;

# Map transform
my @scores = map { /: (\\d+)/; $1 } @lines;
my $total = 0;
$total += $_ for @scores;
print "Total: $total\\n";`,
      language: "perl",
    },
    quiz: [
      {
        question: "What does 'perl -ne' do?",
        choices: [
          "Runs with no errors",
          "Wraps code in a while(<>) loop over input",
          "Enables networking",
          "Disables warnings",
        ],
        correct: 1,
        explanation: "-n wraps your code in 'while(<>){...}' — processing each line of input automatically.",
      },
      {
        question: "What is $_ in Perl?",
        choices: ["The error variable", "The default/topic variable", "The line number", "The file name"],
        correct: 1,
        explanation: "$_ is the default variable — many functions use it implicitly when no argument is given.",
      },
      {
        question: "What does grep { } @array do?",
        choices: [
          "Searches files on disk",
          "Filters array elements matching a condition",
          "Sorts the array",
          "Counts elements",
        ],
        correct: 1,
        explanation: "grep filters a list, returning elements where the block evaluates to true.",
      },
    ],
    challenge: {
      title: "Log Filter",
      description:
        "Given @logs = ('INFO: start', 'ERROR: crash', 'INFO: running', 'ERROR: timeout'), use grep to filter only ERROR lines and print each one.",
      starterCode: "my @logs = ('INFO: start', 'ERROR: crash', 'INFO: running', 'ERROR: timeout');\n\n# Filter errors with grep\n\n\n# Print each error\n",
      expectedOutput: "ERROR: crash\nERROR: timeout",
      hints: [
        "Use grep { /^ERROR/ } @logs",
        "Store result in a new array",
        "Use 'print ... for @errors'",
      ],
      solution: `my @logs = ('INFO: start', 'ERROR: crash', 'INFO: running', 'ERROR: timeout');\n\nmy @errors = grep { /^ERROR/ } @logs;\nprint "$_\\n" for @errors;`,
      language: "perl",
    },
  },

  {
    id: "perl-cpan",
    title: "CPAN Modules",
    tier: "HARD",
    lesson: {
      title: "CPAN Modules",
      concept: "CPAN is Perl's legendary treasure vault — thousands of battle-tested modules at your disposal.",
      explanation:
        "CPAN (Comprehensive Perl Archive Network) has 200,000+ modules. Install with 'cpanm Module::Name'. Use modules with 'use'. Popular ones: JSON, DBI (databases), LWP/HTTP::Tiny (web), DateTime, Try::Tiny (exceptions). Always check documentation with 'perldoc Module::Name'.",
      codeExample: `# JSON handling
use JSON;
my $data = { player => "Hero", score => 9001 };
my $json_str = encode_json($data);
print "$json_str\\n";
# {"player":"Hero","score":9001}

my $decoded = decode_json($json_str);
print "Player: $decoded->{player}\\n";

# HTTP requests with HTTP::Tiny
use HTTP::Tiny;
my $response = HTTP::Tiny->new->get('https://api.example.com/scores');
if ($response->{success}) {
  print $response->{content};
}

# Try::Tiny for exception handling
use Try::Tiny;
try {
  die "Boss defeated you!";
} catch {
  print "Caught: $_\\n";
};`,
      language: "perl",
    },
    quiz: [
      {
        question: "What is CPAN?",
        choices: [
          "A Perl compiler",
          "Comprehensive Perl Archive Network — a module repository",
          "A testing framework",
          "A Perl IDE",
        ],
        correct: 1,
        explanation: "CPAN is the world's largest repository of Perl modules — open source and community-driven.",
      },
      {
        question: "What command installs CPAN modules easily?",
        choices: ["perl install", "cpanm", "pip install", "npm install"],
        correct: 1,
        explanation: "cpanm (App::cpanminus) is the modern, simple way to install CPAN modules.",
      },
      {
        question: "Which module handles JSON in Perl?",
        choices: ["JSON::Parse", "JSON", "Data::JSON", "Perl::JSON"],
        correct: 1,
        explanation: "The JSON module (or JSON::XS for speed) provides encode_json and decode_json.",
      },
    ],
    challenge: {
      title: "JSON Power-Up",
      description:
        "Use the JSON module to encode a hashref {weapon => 'Sword', damage => 50} to a JSON string, then decode it back and print the damage value.",
      starterCode: "use JSON;\n\n# Create data, encode to JSON, decode back\n\n\n# Print the damage value\n",
      expectedOutput: "50",
      hints: [
        "Create a hashref: my $data = {weapon => 'Sword', damage => 50}",
        "Use encode_json($data) to get a JSON string",
        "decode_json returns a hashref, access with ->{damage}",
      ],
      solution: `use JSON;\n\nmy $data = {weapon => "Sword", damage => 50};\nmy $json_str = encode_json($data);\nmy $decoded = decode_json($json_str);\nprint $decoded->{damage} . "\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-error-handling",
    title: "Error Handling & Exceptions",
    tier: "HARD",
    lesson: {
      title: "Error Handling & Exceptions",
      concept: "Robust error handling keeps your program alive when the dungeon throws surprises.",
      explanation:
        "Perl uses die/warn for errors, eval{} to catch them ($@ holds the error). Modern Perl uses Try::Tiny for clean try/catch syntax. Use Carp for better stack traces in modules. 'die' can throw strings or objects. Always handle errors in file ops, network calls, and database queries.",
      codeExample: `# Basic eval/die
eval {
  my $hp = 0;
  die "Game Over! HP reached zero\\n" if $hp <= 0;
};
if ($@) {
  print "Caught: $@";
}

# Try::Tiny (modern approach)
use Try::Tiny;

sub risky_quest {
  my ($difficulty) = @_;
  die { type => "TooHard", level => $difficulty }
    if $difficulty > 10;
  return "Quest complete!";
}

try {
  risky_quest(15);
} catch {
  if (ref $_ && $_->{type} eq "TooHard") {
    print "Quest too hard! Level: $_->{level}\\n";
  } else {
    print "Unknown error: $_\\n";
  }
};

# warn for non-fatal issues
warn "Low mana warning!" if $mana < 10;`,
      language: "perl",
    },
    quiz: [
      {
        question: "What variable holds the error after eval{} catches a die?",
        choices: ["$!", "$_", "$@", "$?"],
        correct: 2,
        explanation: "$@ contains the error message from the most recent eval{} block's die.",
      },
      {
        question: "What is the difference between die and warn?",
        choices: [
          "No difference",
          "die terminates execution; warn just prints a message",
          "warn is louder than die",
          "die is for compile errors only",
        ],
        correct: 1,
        explanation: "die throws an exception (fatal unless caught); warn prints to STDERR but continues.",
      },
      {
        question: "Why use Try::Tiny instead of bare eval?",
        choices: [
          "It's faster",
          "Cleaner syntax and avoids $@ clobbering issues",
          "It's required in Perl 5.30+",
          "eval is deprecated",
        ],
        correct: 1,
        explanation: "Try::Tiny provides clean syntax and fixes subtle bugs where $@ can be reset unexpectedly.",
      },
    ],
    challenge: {
      title: "Boss Battle Error Guard",
      description:
        "Write code that uses eval{} to catch a die('Boss HP is zero'). Capture the error in $@ and print 'Victory: Boss HP is zero'.",
      starterCode: "# Use eval to catch a die\n\n\n# Check $@ and print victory message\n",
      expectedOutput: "Victory: Boss HP is zero",
      hints: [
        "eval { die 'Boss HP is zero'; };",
        "Check if ($@) after the eval block",
        "chomp $@ to remove the trailing newline before printing",
      ],
      solution: `eval {\n  die "Boss HP is zero\\n";\n};\nif ($@) {\n  chomp $@;\n  print "Victory: $@\\n";\n}`,
      language: "perl",
    },
  },

  {
    id: "perl-string-processing",
    title: "Advanced String Processing",
    tier: "EXPERT",
    lesson: {
      title: "Advanced String Processing",
      concept: "Perl is the ultimate string-slicing weapon — master text manipulation like a code ninja.",
      explanation:
        "Beyond regex, Perl offers: substr() for slicing, index()/rindex() for finding positions, sprintf() for formatting, pack()/unpack() for binary data. Heredocs for multi-line strings. join()/split() for conversions. Transliteration (tr///) for character-level transforms.",
      codeExample: `# sprintf formatting
my $stats = sprintf("%-10s %04d HP", "Dragon", 50);
print "$stats\\n";  # Dragon     0050 HP

# split and join
my $csv = "Sword,Shield,Potion,Bow";
my @items = split /,/, $csv;
my $display = join(" | ", @items);
print "$display\\n";  # Sword | Shield | Potion | Bow

# Heredoc
my $art = <<'END_ART';
  /\\_/\\
 ( o.o )
  > ^ <  QUEST COMPLETE
END_ART
print $art;

# tr (transliteration) - ROT13 cipher
my $secret = "Frperg Yriry";
$secret =~ tr/A-Za-z/N-ZA-Mn-za-m/;
print "$secret\\n";  # Secret Level

# pack/unpack for binary
my $packed = pack("A5 n", "HERO!", 42);
my ($name, $val) = unpack("A5 n", $packed);`,
      language: "perl",
    },
    quiz: [
      {
        question: "What does split /,/, $str do?",
        choices: [
          "Joins strings with commas",
          "Splits $str into an array at each comma",
          "Removes commas",
          "Counts commas",
        ],
        correct: 1,
        explanation: "split divides a string into a list based on a delimiter pattern.",
      },
      {
        question: "What does tr/a-z/A-Z/ do?",
        choices: [
          "Regex substitution",
          "Transliterates lowercase to uppercase character by character",
          "Deletes letters",
          "Sorts characters",
        ],
        correct: 1,
        explanation: "tr/// (transliteration) replaces characters one-to-one — faster than s/// for character swaps.",
      },
      {
        question: "What is pack() used for?",
        choices: [
          "Compressing files",
          "Converting data to/from binary format",
          "Packaging modules",
          "Encrypting strings",
        ],
        correct: 1,
        explanation: "pack() converts Perl values to binary strings using a template — essential for file formats and protocols.",
      },
    ],
    challenge: {
      title: "Cipher Master",
      description:
        "Take the string 'Uryyb Jbeyq' and apply ROT13 decoding using tr///. ROT13 maps A-M to N-Z and vice versa. Print the decoded result.",
      starterCode: "my $encoded = 'Uryyb Jbeyq';\n\n# Apply ROT13 with tr\n\n\n# Print decoded\n",
      expectedOutput: "Hello World",
      hints: [
        "ROT13: tr/A-Za-z/N-ZA-Mn-za-m/",
        "Apply it directly to the $encoded variable",
        "tr modifies the variable in-place",
      ],
      solution: `my $encoded = "Uryyb Jbeyq";\n$encoded =~ tr/A-Za-z/N-ZA-Mn-za-m/;\nprint "$encoded\\n";`,
      language: "perl",
    },
  },

  {
    id: "perl-context",
    title: "Context: Scalar vs List",
    tier: "EXPERT",
    lesson: {
      title: "Context: Scalar vs List",
      concept: "Context is Perl's hidden game mechanic — the same expression behaves differently based on what's expected.",
      explanation:
        "Perl evaluates expressions in scalar or list context. An array in scalar context gives its count. A regex in list context returns captures. wantarray() detects context inside subs. The 'scalar' keyword forces scalar context. Mastering context is what separates Perl apprentices from masters.",
      codeExample: `my @enemies = ("Goblin", "Orc", "Dragon");

# List context — gets all elements
my @copy = @enemies;
print "@copy\\n";  # Goblin Orc Dragon

# Scalar context — gets count
my $count = @enemies;
print "Count: $count\\n";  # Count: 3

# Regex in list context captures all matches
my $text = "Scores: 10, 20, 30";
my @nums = ($text =~ /(\\d+)/g);
print "@nums\\n";  # 10 20 30

# wantarray() checks calling context
sub flexible {
  if (wantarray()) {
    return ("list", "mode");
  } else {
    return "scalar mode";
  }
}
my @result = flexible();  # ("list", "mode")
my $result = flexible();  # "scalar mode"

# Forcing context
my @data = (5, 3, 8, 1);
print "Items: " . scalar(@data) . "\\n";`,
      language: "perl",
    },
    quiz: [
      {
        question: "What does @array return in scalar context?",
        choices: ["The first element", "The last element", "The number of elements", "undef"],
        correct: 2,
        explanation: "An array in scalar context evaluates to its element count — a key Perl idiom!",
      },
      {
        question: "What does wantarray() do inside a subroutine?",
        choices: [
          "Checks if arguments are arrays",
          "Returns true if called in list context",
          "Converts to array",
          "Validates parameters",
        ],
        correct: 1,
        explanation: "wantarray() lets a sub detect whether the caller expects a list or scalar return value.",
      },
      {
        question: "How do you force scalar context?",
        choices: [
          "Use (scalar) cast",
          "Use the scalar keyword before the expression",
          "Assign to $variable",
          "Both B and C work",
        ],
        correct: 3,
        explanation: "Both 'scalar @array' and assigning to a scalar variable force scalar context.",
      },
    ],
    challenge: {
      title: "Context Shapeshifter",
      description:
        "Create an array @spells with ('Fire', 'Ice', 'Thunder', 'Heal'). Print the count using scalar context (not a loop). Then use a regex in list context to extract all numbers from 'Damage: 25 50 75' and print them space-separated.",
      starterCode: "my @spells = ('Fire', 'Ice', 'Thunder', 'Heal');\n\n# Print count using scalar context\n\n\n# Extract numbers with regex in list context\nmy $text = 'Damage: 25 50 75';\n\n",
      expectedOutput: "4\n25 50 75",
      hints: [
        "Use scalar(@spells) or assign to a scalar",
        "Use ($text =~ /(\\d+)/g) in list context to get all matches",
        "join with space to print array elements on one line",
      ],
      solution: `my @spells = ('Fire', 'Ice', 'Thunder', 'Heal');\nprint scalar(@spells) . "\\n";\n\nmy $text = "Damage: 25 50 75";\nmy @nums = ($text =~ /(\\d+)/g);\nprint join(" ", @nums) . "\\n";`,
      language: "perl",
    },
  },
];
