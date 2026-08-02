// Pre-written lessons for Ruby Module: Symbols

export const rubySymbolsLessons = [
  {
    title: "What is Symbols?",
    definition: "Symbols in Ruby are immutable, interned string-like identifiers prefixed with colon (:name). They’re used for hash keys, method names, and any place where identity matters more than content.",
    explanation: `Symbols is a core concept in Ruby that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

Ruby's approach to symbols is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering symbols, you unlock powerful patterns and idioms that are standard in professional Ruby development.`,
    code: `# Symbols in Ruby - Basics

# Block with iteration
[1, 2, 3, 4, 5].each do |num|
  puts "Number: #{num}"
end

# Single-line block
[1, 2, 3].map { |n| n * 2 } # => [2, 4, 6]

# Class definition
class Player
  attr_accessor :name, :level
  attr_reader :hp

  def initialize(name, max_hp = 100)
    @name = name
    @hp = max_hp
    @max_hp = max_hp
    @level = 1
  end

  def take_damage(amount)
    @hp = [@hp - amount, 0].max
    puts "#{@name} takes #{amount} damage! HP: #{@hp}"
  end

  def alive?
    @hp > 0
  end

  def to_s
    "[Lv.#{@level}] #{@name} HP:#{@hp}/#{@max_hp}"
  end
end

hero = Player.new("Kai", 150)
hero.take_damage(40)
puts hero`,
    breakdown: `\u2022 The basic declaration shows how to define and use symbols in Ruby.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Symbols in Ruby provides are immutable, interned string-like identifiers prefixed with colon (:name). They’re used for hash keys, method names, and any place where identity matters more than content.. It's fundamental to writing correct, efficient Ruby code."
  },
  {
    title: "How Symbols works",
    definition: "Symbols works by being stored once in the symbol table. :hello.object_id is always the same, while \"hello\".object_id creates a new object each time. This makes symbols fast for comparison and memory-efficient.",
    explanation: `Under the hood, symbols in Ruby involves specific compile-time and runtime mechanisms. The interpreter enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how symbols works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `# Symbols - How it works

# Method lookup chain
# Object -> Modules -> Superclass -> ... -> BasicObject

module Attackable
  def attack
    puts "#{name} attacks for #{damage} damage!"
  end
end

class Character
  include Attackable
  attr_reader :name, :damage

  def initialize(name, damage)
    @name = name
    @damage = damage
  end
end

# Procs vs Lambdas
square = Proc.new { |x| x * x }
square_lambda = ->(x) { x * x }

puts square.call(5)        # 25
puts square_lambda.call(5) # 25

# Lambda checks argument count, Proc doesn't
# square_lambda.call(1, 2) # ArgumentError!
square.call(1, 2)          # OK (ignores extra)

# Symbol to proc
names = ["alice", "bob", "charlie"]
puts names.map(&:capitalize) # ["Alice", "Bob", "Charlie"]`,
    breakdown: `\u2022 Internal mechanics show how the runtime handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Symbols works through being stored once in the symbol table. :hello.object_id is always the same, while \"hello\".object_id creates a new object each time. This makes symbols fast for comparison and memory-efficient.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Symbols syntax & usage",
    definition: "Ruby symbols syntax includes colon prefix (:name), to_sym/to_s conversion, symbol arrays with %i[a b c], and symbol procs (&:method_name) for concise iteration.",
    explanation: `Ruby provides clear syntax for symbols with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other Ruby developers.

Modern Ruby continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `# Symbols - Syntax patterns

# Hash with symbol keys
config = {
  name: "Dark Knight",
  hp: 500,
  class: :warrior,
  skills: [:slash, :block, :charge]
}

# Keyword arguments
def create_enemy(name:, hp: 100, level: 1)
  { name: name, hp: hp, level: level }
end

goblin = create_enemy(name: "Goblin", hp: 30)

# Enumerable methods
scores = [85, 92, 78, 95, 88]
puts scores.select { |s| s >= 90 }  # [92, 95]
puts scores.sum                     # 438
puts scores.max                     # 95
puts scores.sort.reverse.first(3)   # [95, 92, 88]

# Blocks for resource management
File.open("data.txt", "w") do |file|
  file.puts "Game save data"
end # file automatically closed!

# Method missing (metaprogramming)
class DynamicFinder
  def method_missing(method, *args)
    if method.to_s.start_with?("find_by_")
      field = method.to_s.sub("find_by_", "")
      puts "Finding by #{field}: #{args.first}"
    else
      super
    end
  end
end`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow Ruby community standards.\n\n\u2022 Modern Ruby features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "Ruby syntax for symbols is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Symbols",
    definition: "In real applications, symbols used as hash keys, method parameters, enum-like values, metaprogramming identifiers, and with the & operator for method references in iteration.",
    explanation: `Real-world Ruby applications use symbols for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source Ruby projects provide excellent examples of symbols in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `# Symbols - Practical game example

class Inventory
  include Enumerable

  def initialize(capacity = 10)
    @items = []
    @capacity = capacity
  end

  def add(item)
    return false if @items.size >= @capacity
    @items << item
    true
  end

  def each(&block)
    @items.each(&block)
  end

  def find_by_type(type)
    select { |item| item[:type] == type }
  end

  def total_value
    sum { |item| item[:value] }
  end

  def to_s
    @items.map { |i| "  - #{i[:name]} (#{i[:type]})" }.join("\n")
  end
end

inv = Inventory.new(5)
inv.add({ name: "Iron Sword", type: :weapon, value: 100 })
inv.add({ name: "Health Potion", type: :consumable, value: 25 })
inv.add({ name: "Dragon Shield", type: :armor, value: 250 })

puts "Weapons: #{inv.find_by_type(:weapon).map { |i| i[:name] }}"
puts "Total value: #{inv.total_value} gold"
puts "Most valuable: #{inv.max_by { |i| i[:value] }[:name]}"`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate symbols in game systems, data processing, and service design. The patterns are universal across Ruby projects."
  },
  {
    title: "Symbols best practices",
    definition: "Best practices for symbols include using symbols for identifiers and enums, strings for user-facing text, not creating symbols from user input (memory leak), and using frozen string literals in Ruby 3+.",
    explanation: `Professional Ruby code follows established conventions for symbols that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when symbols is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `# Symbols - Best practices

# DO: Use blocks for resource management
File.open("save.dat", "w") { |f| f.write(data) }

# DO: Prefer symbols for hash keys
player = { name: "Hero", hp: 100, class: :warrior }

# DO: Use freeze for constants
DEFAULT_CONFIG = {
  max_players: 4,
  difficulty: :normal
}.freeze

# DO: Use Enumerable methods over manual loops
items.select(&:rare?).map(&:name).sort

# DO: Use keyword arguments for clarity
def attack(target:, damage:, critical: false)
  actual = critical ? damage * 2 : damage
  target.take_damage(actual)
end

# DON'T: Create symbols from user input (memory leak)
# user_input.to_sym  # BAD!

# DO: Use guard clauses
def process(item)
  return unless item
  return if item[:value] <= 0
  # main logic here
end

# DO: Use meaningful method names with conventions
# ? for boolean: alive? empty? valid?
# ! for dangerous: save! delete! sort!
# = for setters: name= hp=`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: using symbols for identifiers and enums, strings for user-facing text, not creating symbols from user input (memory leak), and using frozen string literals in Ruby 3+.. Following conventions makes code maintainable and professional."
  }
];
