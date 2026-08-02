import { Module } from "./curriculum";

export const rubyModules: Module[] = [
  {
    id: "ruby-blocks",
    title: "Blocks & Procs",
    tier: "EASY",
    lesson: {
      title: "Blocks & Procs",
      concept: "Blocks are anonymous chunks of code passed to methods; Procs and Lambdas store them as reusable objects.",
      explanation:
        "Blocks are enclosed in do...end or { }. Every Ruby method can accept an implicit block — call it with 'yield'. Procs are saved blocks (Proc.new or proc {}). Lambdas are strict Procs (check arity, return from lambda only). Use & to convert between blocks and procs. Blocks power iterators like each, map, select, and inject — the heart of Ruby's expressiveness.",
      codeExample: `# Block with do...end
[1, 2, 3].each do |num|
  puts num * 10
end

# Block with braces (single line)
doubled = [5, 10, 15].map { |n| n * 2 }
puts doubled.inspect # [10, 20, 30]

# Yield to implicit block
def power_up(name)
  puts "#{name} is powering up!"
  yield(name) if block_given?
  puts "Power up complete!"
end

power_up("Hero") { |n| puts "#{n} gains +50 ATK!" }

# Proc (stored block)
heal = Proc.new { |amount| puts "Healed #{amount} HP!" }
heal.call(30)

# Lambda (strict proc)
damage = ->(target, amount) { puts "#{target} takes #{amount} damage!" }
damage.call("Dragon", 99)

# & converts proc to block
multiplier = proc { |x| x * 3 }
result = [1, 2, 3].map(&multiplier)
puts result.inspect # [3, 6, 9]`,
      breakdown: "",
      language: "ruby",
    },
    quiz: [
      { question: "What does 'yield' do in a Ruby method?", choices: ["Pauses execution", "Passes control to the block given to the method", "Returns a value", "Creates a new thread"], correct: 1, explanation: "yield executes the block that was passed to the method, optionally sending arguments to it." },
      { question: "What is the difference between a Proc and a Lambda?", choices: ["No difference", "Lambdas check argument count and return from themselves only", "Procs are faster", "Lambdas cannot be stored"], correct: 1, explanation: "Lambdas enforce correct argument count and 'return' only exits the lambda. Procs are more lenient and return from the enclosing method." },
      { question: "What does the & operator do with a proc?", choices: ["Creates a reference", "Converts a Proc to a block (or vice versa)", "Calls the proc", "Makes it a lambda"], correct: 1, explanation: "& converts a Proc object into a block that can be passed to methods like map, select, etc." },
    ],
        subLessons: ["What is Blocks & Procs?","How Blocks & Procs works","Blocks & Procs syntax & usage","Practical examples of Blocks & Procs","Blocks & Procs best practices"],
challenge: {
      title: "Custom Iterator",
      description: "Write a method `repeat_action(times)` that yields the current iteration number (starting at 1) to a block. Call it with 3 and a block that prints \"Hit #X!\" for each iteration. Output three lines.",
      starterCode: "# Define repeat_action method\n\n# Call with block\n",
      expectedOutput: "Hit #1!\nHit #2!\nHit #3!",
      hints: ["Use (1..times).each { |i| yield(i) } inside the method", "The block receives i: repeat_action(3) { |i| puts \"Hit #\#{i}!\" }", "block_given? checks if a block was passed (optional safety)"],
      solution: `def repeat_action(times)\n  (1..times).each { |i| yield(i) }\nend\n\nrepeat_action(3) { |i| puts "Hit #\#{i}!" }`,
      language: "ruby",
    },
  },
  {
    id: "ruby-classes",
    title: "Classes & Modules",
    tier: "EASY",
    lesson: {
      title: "Classes & Modules",
      concept: "Classes define objects with state and behavior; modules provide namespacing and mixins for shared functionality.",
      explanation:
        "Classes use 'initialize' as constructor, @ for instance variables, @@ for class variables. attr_accessor/reader/writer generate getters/setters. Inheritance uses < (single inheritance only). Modules serve two purposes: namespaces (Module::Class) and mixins (include/extend). Include adds instance methods, extend adds class methods. Modules can't be instantiated.",
      codeExample: `# Module as mixin
module Combatant
  def attack(target)
    damage = calculate_damage
    puts "#{name} attacks #{target} for #{damage} damage!"
    damage
  end

  private

  def calculate_damage
    rand(10..30)
  end
end

module Healable
  def heal(amount)
    @health = [@health + amount, @max_health].min
    puts "#{name} healed! HP: #{@health}/#{@max_health}"
  end
end

# Class with mixins
class Player
  include Combatant
  include Healable

  attr_accessor :name, :level
  attr_reader :health

  def initialize(name, health = 100)
    @name = name
    @health = health
    @max_health = health
    @level = 1
  end

  def to_s
    "#{@name} [Lv.#{@level}] HP: #{@health}/#{@max_health}"
  end
end

# Inheritance
class Mage < Player
  attr_reader :mana

  def initialize(name, health = 80, mana = 100)
    super(name, health)
    @mana = mana
  end

  def cast_spell(spell)
    puts "#{name} casts #{spell}! ✨"
    @mana -= 20
  end
end

hero = Mage.new("Wizard", 80, 120)
puts hero
hero.cast_spell("Fireball")
hero.heal(20)`,
      breakdown: "",
      language: "ruby",
    },
    quiz: [
      { question: "What does attr_accessor :name generate?", choices: ["Only a getter", "Both a getter and setter for @name", "A constant", "A class method"], correct: 1, explanation: "attr_accessor creates both a reader method (def name) and writer method (def name=) for the instance variable." },
      { question: "How do modules differ from classes?", choices: ["Modules are faster", "Modules can't be instantiated and support mixins without inheritance", "Modules replace classes", "No difference"], correct: 1, explanation: "Modules provide namespacing and mixin capabilities but cannot be instantiated — they extend classes via include/extend." },
      { question: "What does 'include' do with a module?", choices: ["Imports the file", "Adds the module's methods as instance methods", "Creates a subclass", "Copies the module"], correct: 1, explanation: "include mixes in the module's methods as instance methods, available to all instances of the class." },
    ],
        subLessons: ["What is Classes & Modules?","How Classes & Modules works","Classes & Modules syntax & usage","Practical examples of Classes & Modules","Classes & Modules best practices"],
challenge: {
      title: "RPG Character Class",
      description: "Create a class `Warrior` with attr_accessor :name, attr_reader :power. Initialize with name and power (default 50). Add a method `battle_cry` that returns \"{name} roars with power {power}!\". Create a warrior \"Thor\" with power 99 and print the battle cry.",
      starterCode: "# Define Warrior class\n\n# Create instance and print battle cry\n",
      expectedOutput: "Thor roars with power 99!",
      hints: ["Use def initialize(name, power = 50) with @name and @power", "attr_reader :power gives a getter without setter", "Return a string with interpolation: \"\#{@name} roars with power \#{@power}!\""],
      solution: `class Warrior\n  attr_accessor :name\n  attr_reader :power\n\n  def initialize(name, power = 50)\n    @name = name\n    @power = power\n  end\n\n  def battle_cry\n    "\#{@name} roars with power \#{@power}!"\n  end\nend\n\nwarrior = Warrior.new("Thor", 99)\nputs warrior.battle_cry`,
      language: "ruby",
    },
  },
  {
    id: "ruby-hashes",
    title: "Hashes",
    tier: "MEDIUM",
    lesson: {
      title: "Hashes",
      concept: "Hashes are key-value collections that provide fast lookup — Ruby's equivalent of dictionaries or maps.",
      explanation:
        "Hashes use {} with => (hash rockets) or symbol shorthand (key: value). Access with [] and assign with []=. Methods like each, map, select, merge, fetch, and dig enable powerful manipulation. Default values prevent nil returns. Symbol keys are preferred for performance. Hashes are used everywhere: method options, configs, JSON-like data, and named parameters.",
      codeExample: `# Creating hashes
player = {
  name: "ArcadeKnight",
  level: 42,
  health: 100,
  inventory: ["Sword", "Shield", "Potion"]
}

# Access and modify
puts player[:name]       # ArcadeKnight
player[:score] = 9500    # Add new key
player[:level] += 1      # Modify

# Default values
stats = Hash.new(0)      # Default 0 for missing keys
stats[:strength] += 5
stats[:agility] += 3
puts stats[:magic]       # 0 (default, not nil)

# Iteration
player.each do |key, value|
  puts "#{key}: #{value}"
end

# Select and reject
high_stats = stats.select { |k, v| v > 3 }

# Fetch with fallback
weapon = player.fetch(:weapon, "Bare Fists")
puts weapon # "Bare Fists"

# Dig for nested access
game_data = {
  player: { stats: { hp: 100, mp: 50 } }
}
hp = game_data.dig(:player, :stats, :hp)
puts hp # 100

# Merge hashes
defaults = { difficulty: "normal", sound: true, music: true }
custom = { difficulty: "hard", music: false }
settings = defaults.merge(custom)
puts settings # {difficulty: "hard", sound: true, music: false}`,
      breakdown: "",
      language: "ruby",
    },
    quiz: [
      { question: "What is the difference between hash[:key] and hash.fetch(:key)?", choices: ["No difference", "fetch raises KeyError if missing (or uses a default block)", "fetch is slower", "[] can't use symbols"], correct: 1, explanation: "[] returns nil for missing keys silently. fetch raises an error or lets you provide a fallback — safer for required keys." },
      { question: "What does Hash.new(0) do?", choices: ["Creates a hash with one zero element", "Sets the default value for missing keys to 0", "Limits hash size", "Creates an empty hash"], correct: 1, explanation: "Hash.new(0) sets the default return value to 0 for any key that hasn't been assigned — great for counters!" },
      { question: "What does .dig do?", choices: ["Searches all values", "Safely navigates nested hash/array structures returning nil if any key is missing", "Finds duplicate keys", "Removes nested keys"], correct: 1, explanation: "dig safely traverses nested structures — if any intermediate key is missing, it returns nil instead of raising an error." },
    ],
        subLessons: ["What is Hashes?","How Hashes works","Hashes syntax & usage","Practical examples of Hashes","Hashes best practices"],
challenge: {
      title: "Loot Table Hash",
      description: "Create a hash `loot` with symbol keys: sword (damage: 50), shield (defense: 30), potion (heal: 25). Use .map to create an array of strings describing each item. Print the result for sword: \"sword: {:damage=>50}\" isn't needed — just print the total number of items with \"Loot items: 3\".",
      starterCode: "# Create loot hash\n\n# Print count\n",
      expectedOutput: "Loot items: 3",
      hints: ["Use loot = { sword: {damage: 50}, shield: {defense: 30}, potion: {heal: 25} }", "Use loot.count or loot.size for the count", "String interpolation: puts \"Loot items: \#{loot.size}\""],
      solution: `loot = {\n  sword: { damage: 50 },\n  shield: { defense: 30 },\n  potion: { heal: 25 }\n}\n\nputs "Loot items: \#{loot.size}"`,
      language: "ruby",
    },
  },
  {
    id: "ruby-symbols",
    title: "Symbols",
    tier: "MEDIUM",
    lesson: {
      title: "Symbols",
      concept: "Symbols are immutable, reusable identifiers that are faster and more memory-efficient than strings for labels and keys.",
      explanation:
        "Symbols look like :name — they're immutable and stored once in memory. Two symbols with the same name are the same object (same object_id). Strings with the same content are different objects. Use symbols for hash keys, method names, and identifiers. Convert between them: \"hello\".to_sym and :hello.to_s. Symbols are the preferred hash key type in Ruby for performance.",
      codeExample: `# Symbols are immutable identifiers
status = :active
direction = :north

# Same symbol = same object (efficient!)
puts :hero.object_id == :hero.object_id   # true
puts "hero".object_id == "hero".object_id # false (different objects!)

# Symbols as hash keys (idiomatic Ruby)
player = {
  name: "ArcadeKnight",  # Shorthand for :name =>
  class: :warrior,
  level: 42
}

# Symbol methods
puts :hello.to_s          # "hello"
puts "world".to_sym       # :world
puts :arcade.upcase       # :ARCADE (Ruby 2.7+)
puts :game.length         # 4

# Symbols in case statements
def element_bonus(element)
  case element
  when :fire then "2x damage to ice"
  when :water then "2x damage to fire"
  when :earth then "2x damage to water"
  else "No bonus"
  end
end

puts element_bonus(:fire) # "2x damage to ice"

# Symbol to proc (&:method_name)
words = ["hello", "world", "ruby"]
upper = words.map(&:upcase)
puts upper.inspect # ["HELLO", "WORLD", "RUBY"]

# Symbols for method references
puts player.respond_to?(:name)    # true
puts player.send(:fetch, :level)  # 42`,
      breakdown: "",
      language: "ruby",
    },
    quiz: [
      { question: "Why are symbols more efficient than strings for hash keys?", choices: ["They compress data", "They're stored once in memory — identical symbols share the same object", "They use less syntax", "They auto-sort"], correct: 1, explanation: "Symbols with the same name always reference the same memory location. Strings create new objects each time." },
      { question: "What does &:upcase do?", choices: ["Creates a string", "Converts the symbol to a proc that calls .upcase on each element", "Uppercases a symbol", "Is a reference to String class"], correct: 1, explanation: "&:method_name converts a symbol to a Proc that calls that method — shorthand for { |x| x.upcase }." },
      { question: "Can symbols be modified after creation?", choices: ["Yes, with mutating methods", "No, symbols are immutable", "Only with freeze", "Depends on Ruby version"], correct: 1, explanation: "Symbols are immutable by nature — you cannot change :hello to something else. This immutability makes them safe identifiers." },
    ],
        subLessons: ["What is Symbols?","How Symbols works","Symbols syntax & usage","Practical examples of Symbols","Symbols best practices"],
challenge: {
      title: "Symbol Power",
      description: "Create an array of string names [\"fire\", \"ice\", \"thunder\"]. Convert each to a symbol using map(&:to_sym). Print the resulting array as [:fire, :ice, :thunder].",
      starterCode: "# Create string array\n\n# Convert to symbols\n\n# Print result\n",
      expectedOutput: "[:fire, :ice, :thunder]",
      hints: ["Use [\"fire\", \"ice\", \"thunder\"] for the string array", "The &:to_sym trick converts each string to a symbol", "Use .inspect or p to print the array with symbols visible"],
      solution: `elements = ["fire", "ice", "thunder"]\nsymbols = elements.map(&:to_sym)\np symbols`,
      language: "ruby",
    },
  },
  {
    id: "ruby-gems",
    title: "Gems & Bundler",
    tier: "HARD",
    lesson: {
      title: "Gems & Bundler",
      concept: "Gems are Ruby's package system; Bundler manages project dependencies with version locking for reproducible environments.",
      explanation:
        "Gems are packaged Ruby libraries installed via 'gem install'. RubyGems.org hosts the public registry. Bundler uses a Gemfile to declare dependencies and Gemfile.lock to lock versions. Run 'bundle install' to install, 'bundle exec' to run in context. Semantic versioning (~> 2.0) controls update ranges. Create gems with 'bundle gem name'. Groups (development, test) isolate environment-specific gems.",
      codeExample: `# Gemfile - declares dependencies
source "https://rubygems.org"

ruby "3.2.0"

# Production gems
gem "rails", "~> 7.1"      # >= 7.1.0, < 8.0
gem "pg", ">= 1.5"         # PostgreSQL adapter
gem "redis", "~> 5.0"      # Caching

# Specific version
gem "sidekiq", "7.1.4"

group :development, :test do
  gem "rspec", "~> 3.12"
  gem "rubocop", "~> 1.50"
  gem "debug"
end

group :development do
  gem "solargraph"    # LSP for IDE support
end

group :test do
  gem "factory_bot"
  gem "faker"
end

# Using a gem in code
require "json"
require "httparty"

# HTTParty example
response = HTTParty.get("https://api.example.com/players")
data = JSON.parse(response.body)
puts data["players"].count

# Creating your own gem
# $ bundle gem arcade_utils
# lib/arcade_utils.rb
module ArcadeUtils
  VERSION = "1.0.0"

  def self.format_score(score)
    score.to_s.reverse.gsub(/(\\d{3})(?=\\d)/, '\\\\1,').reverse
  end
end

puts ArcadeUtils.format_score(1234567) # "1,234,567"`,
      breakdown: "",
      language: "ruby",
    },
    quiz: [
      { question: "What does ~> 2.1 mean in a Gemfile?", choices: ["Exactly version 2.1", "Greater than or equal to 2.1, less than 3.0", "Greater than or equal to 2.1, less than 2.2", "Any version 2.x"], correct: 2, explanation: "The pessimistic operator ~> 2.1 means >= 2.1.0 and < 2.2.0 — it locks the last specified digit range." },
      { question: "What is the purpose of Gemfile.lock?", choices: ["Prevents gem installation", "Records exact versions installed for reproducible builds", "Encrypts gems", "Limits gem count"], correct: 1, explanation: "Gemfile.lock records the exact resolved versions so every developer and server uses identical dependencies." },
      { question: "What does 'bundle exec' do?", choices: ["Installs gems", "Runs a command in the context of the bundle's gem versions", "Creates a new bundle", "Executes tests"], correct: 1, explanation: "bundle exec ensures the command uses the exact gem versions from your Gemfile.lock, avoiding version conflicts." },
    ],
        subLessons: ["What is Gems & Bundler?","How Gems & Bundler works","Gems & Bundler syntax & usage","Practical examples of Gems & Bundler","Gems & Bundler best practices"],
challenge: {
      title: "Gem Module Design",
      description: "Create a module `GameUtils` with a VERSION constant set to \"1.0.0\" and a class method `self.format_health(current, max)` that returns a string like \"HP: 75/100\". Call it with (75, 100) and print the result.",
      starterCode: "# Define GameUtils module\n\n# Call and print\n",
      expectedOutput: "HP: 75/100",
      hints: ["Use module GameUtils with VERSION = \"1.0.0\"", "def self.format_health makes it a module-level method", "Return \"HP: \#{current}/\#{max}\" from the method"],
      solution: `module GameUtils\n  VERSION = "1.0.0"\n\n  def self.format_health(current, max)\n    "HP: \#{current}/\#{max}"\n  end\nend\n\nputs GameUtils.format_health(75, 100)`,
      language: "ruby",
    },
  },
  {
    id: "ruby-metaprogramming",
    title: "Metaprogramming",
    tier: "HARD",
    lesson: {
      title: "Metaprogramming",
      concept: "Metaprogramming lets Ruby code write code — defining methods, modifying classes, and creating DSLs at runtime.",
      explanation:
        "Ruby is highly reflective: define_method creates methods dynamically, method_missing intercepts undefined method calls, send calls methods by name, class_eval/instance_eval evaluate code in a context. Open classes let you modify existing classes. These techniques power Rails (has_many, validates), RSpec (describe, it), and other DSLs. Use responsibly — metaprogramming sacrifices readability for flexibility.",
      codeExample: `# define_method - create methods dynamically
class Player
  STATS = [:strength, :agility, :magic, :defense]

  STATS.each do |stat|
    define_method("boost_#{stat}") do |amount|
      instance_variable_set("@#{stat}", 
        (instance_variable_get("@#{stat}") || 0) + amount)
      puts "#{stat.capitalize} boosted to #{instance_variable_get("@#{stat}")}"
    end
  end
end

hero = Player.new
hero.boost_strength(10)   # Strength boosted to 10
hero.boost_magic(25)      # Magic boosted to 25

# method_missing - catch undefined methods
class DynamicConfig
  def initialize
    @settings = {}
  end

  def method_missing(name, *args)
    if name.to_s.end_with?("=")
      @settings[name.to_s.chomp("=")] = args.first
    else
      @settings[name.to_s]
    end
  end

  def respond_to_missing?(name, *)
    true
  end
end

config = DynamicConfig.new
config.difficulty = "hard"
config.volume = 80
puts config.difficulty  # "hard"

# class_eval - modify existing classes
String.class_eval do
  def shout
    upcase + "!!!"
  end
end
puts "game over".shout  # "GAME OVER!!!"

# Simple DSL with instance_eval
class QuestBuilder
  attr_reader :quests

  def initialize
    @quests = []
  end

  def quest(name, &block)
    q = Quest.new(name)
    q.instance_eval(&block)
    @quests << q
  end
end

class Quest
  attr_reader :name, :reward, :difficulty

  def initialize(name)
    @name = name
  end

  def reward(r); @reward = r; end
  def difficulty(d); @difficulty = d; end
end`,
      breakdown: "",
      language: "ruby",
    },
    quiz: [
      { question: "What does define_method do?", choices: ["Calls a method", "Creates a new method at runtime with a given name and block", "Deletes a method", "Renames a method"], correct: 1, explanation: "define_method dynamically creates instance methods — the name is a parameter and the body is a block." },
      { question: "When is method_missing called?", choices: ["When a method has bugs", "When a method is called that doesn't exist on the object", "When a method returns nil", "When a method is private"], correct: 1, explanation: "method_missing is invoked when Ruby can't find the called method anywhere in the lookup chain — it's your last chance to handle it." },
      { question: "Why should you define respond_to_missing? alongside method_missing?", choices: ["It's required by Ruby", "So respond_to? returns true for dynamically handled methods", "For performance", "To prevent recursion"], correct: 1, explanation: "Without respond_to_missing?, respond_to? returns false for your dynamic methods, confusing other code that checks capabilities." },
    ],
        subLessons: ["What is Metaprogramming?","How Metaprogramming works","Metaprogramming syntax & usage","Practical examples of Metaprogramming","Metaprogramming best practices"],
challenge: {
      title: "Attribute Generator",
      description: "Create a class `GameEntity` that uses define_method in a loop to create getter methods for :name, :hp, and :level from an array of symbols. Initialize all three in the constructor. Create an entity with name \"Boss\", hp 500, level 10, and print \"Boss - HP: 500, Level: 10\".",
      starterCode: "# Define GameEntity with dynamic methods\n\n# Create and print\n",
      expectedOutput: "Boss - HP: 500, Level: 10",
      hints: ["Loop over [:name, :hp, :level] with each and define_method", "Use instance_variable_get(\"@\#{attr}\") in the method body", "Constructor sets @name, @hp, @level from params"],
      solution: `class GameEntity\n  [:name, :hp, :level].each do |attr|\n    define_method(attr) do\n      instance_variable_get("@\#{attr}")\n    end\n  end\n\n  def initialize(name, hp, level)\n    @name = name\n    @hp = hp\n    @level = level\n  end\nend\n\nboss = GameEntity.new("Boss", 500, 10)\nputs "\#{boss.name} - HP: \#{boss.hp}, Level: \#{boss.level}"`,
      language: "ruby",
    },
  },
];
