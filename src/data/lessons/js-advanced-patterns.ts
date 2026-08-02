// Pre-written full lessons for JavaScript: Advanced Patterns
// Each sub-lesson has: title, definition, explanation, code, breakdown, summary

export const jsAdvancedPatternsLessons = [
  {
    title: "What is Advanced Patterns?",
    definition: "Advanced patterns are reusable solutions to common programming challenges, including closures (functions that remember their creation environment), higher-order functions (functions that operate on other functions), and design patterns that make code more flexible and powerful.",
    explanation: `Think of advanced patterns as legendary abilities in an RPG — they're not something you unlock at level 1, but once mastered, they transform how you approach every challenge. A closure is like an enchanted pouch that remembers what was inside it when it was created, no matter where you carry it. A higher-order function is like a crafting station that takes raw materials (functions) and produces enhanced versions.

Closures are perhaps the most important concept in JavaScript. A closure is a function that "remembers" the variables from its surrounding scope even after that scope has finished executing. Every time you use a callback, an event handler, or return a function from another function, you're using closures. They enable data privacy, factory functions, and stateful behavior without classes.

Higher-order functions are functions that either take other functions as arguments, return functions, or both. You've already used them — array methods like .map(), .filter(), and .reduce() are higher-order functions. They accept a callback function that defines the specific behavior, while the higher-order function handles the iteration logic.

These patterns emerged because JavaScript functions are "first-class citizens" — they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures. This makes JavaScript incredibly flexible but also means you need these patterns to harness that flexibility effectively.

Mastering these patterns is what separates junior developers from seniors. They're the foundation of functional programming, React hooks, Express middleware, Redux reducers, and virtually every JavaScript framework's internal architecture. Once you see them, you'll recognize them everywhere.`,
    code: `// ====== Closures — functions that remember their environment ======
function createCharacter(name, startingLevel) {
  // These variables are "enclosed" — private to this scope
  let level = startingLevel;
  let xp = 0;
  const xpToLevel = 100;

  // The returned object's methods form closures over the variables above
  return {
    getName: () => name,
    getLevel: () => level,
    getXP: () => \`\${xp}/\${xpToLevel * level}\`,

    gainXP(amount) {
      xp += amount;
      console.log(\`\${name} gained \${amount} XP! (\${xp}/\${xpToLevel * level})\`);
      // Level up check
      while (xp >= xpToLevel * level) {
        xp -= xpToLevel * level;
        level++;
        console.log(\`\${name} leveled up to \${level}!\`);
      }
    },
  };
}

// Create characters — each has its own enclosed state
const hero = createCharacter("Aria", 1);
const sidekick = createCharacter("Pip", 1);

hero.gainXP(150);      // "Aria gained 150 XP!" → levels up!
sidekick.gainXP(50);   // "Pip gained 50 XP!" — independent state

// Can't access 'level' or 'xp' directly — they're truly private!
console.log(hero.getLevel()); // 2
// console.log(hero.level);   // undefined — not accessible!`,
    breakdown: `Let's trace through how closures work:

• function createCharacter(name, startingLevel) — A factory function that creates character objects. Each call creates a new, independent scope.

• let level = startingLevel; let xp = 0; — Local variables in the factory function's scope. They're NOT on any object — they exist only in this function's memory.

• return { getName: () => name, ... } — We return an object whose methods are arrow functions. These functions "close over" (remember) the variables in their parent scope: name, level, xp, xpToLevel.

• getName: () => name — This arrow function has NO local variable called "name." When called, it looks UP its scope chain and finds "name" from createCharacter's scope — even though createCharacter already finished executing! This is a closure.

• gainXP(amount) { xp += amount; ... } — Modifies the enclosed xp variable. The variable persists between calls because the closure keeps its scope alive.

• while (xp >= xpToLevel * level) — References enclosed variables. Each time gainXP is called, it accesses the SAME xp and level — they persist across calls.

• const hero = createCharacter("Aria", 1) — Creates one closure environment with its own name/level/xp.

• const sidekick = createCharacter("Pip", 1) — Creates a SEPARATE closure environment. Pip's xp is completely independent from Aria's.

• hero.level → undefined — The variable "level" doesn't exist on the returned object. It only exists inside the closure. True privacy without classes or # syntax!`,
    summary: `Closures are functions that remember variables from their creation scope, even after that scope finishes executing. They enable true data privacy (no external access to enclosed variables), independent state per instance, and factory functions that create objects with private internals — all without using classes.`
  },
  {
    title: "How Advanced Patterns works",
    definition: "Higher-order functions accept functions as arguments or return new functions, enabling powerful abstractions like function composition, partial application, and currying — transforming and combining simple functions into complex behaviors.",
    explanation: `Higher-order functions are the backbone of functional programming in JavaScript. Just as a legendary blacksmith takes raw materials and crafts them into weapons, higher-order functions take simple functions and forge them into more powerful ones. The key insight is that functions are just values — they can be stored, passed around, and transformed like any other data.

Currying transforms a function that takes multiple arguments into a sequence of functions that each take a single argument. A curried add function: add(2)(3) instead of add(2, 3). This seems odd at first, but it's incredibly powerful for creating specialized functions from general ones — like having a base "enchant" spell that you partially apply with different elements to create "enchantFire", "enchantIce", etc.

Partial application is related but subtler: you fix some arguments of a function, creating a new function that accepts the remaining ones. It's like pre-configuring a spell: you set the element and power level upfront, and later just specify the target. JavaScript's .bind() method does this natively.

Function composition chains multiple functions together where the output of one becomes the input of the next. If you have functions addBonus(x), multiplyByLevel(x), and applyArmor(x), you can compose them: compose(applyArmor, multiplyByLevel, addBonus)(baseDamage). Data flows right-to-left through the chain. This creates complex transformations from simple, testable building blocks.

These patterns reduce code duplication and increase reusability. Instead of writing similar logic multiple times with slight variations, you write one higher-order function and customize it with different arguments. React hooks, Redux middleware, Express middleware — they all use these patterns extensively.`,
    code: `// ====== Higher-Order Functions — functions that transform functions ======
// A function that RETURNS a function (with configuration baked in)
function createDamageMultiplier(multiplier, element) {
  // Returns a NEW function with multiplier/element "baked in"
  return function (baseDamage) {
    const total = Math.floor(baseDamage * multiplier);
    console.log(\`\${element} damage: \${total}\`);
    return total;
  };
}

// Create specialized functions from the generic one
const fireBlast = createDamageMultiplier(1.5, "Fire");
const iceStrike = createDamageMultiplier(1.2, "Ice");
const criticalHit = createDamageMultiplier(2.0, "Critical");

fireBlast(100);     // "Fire damage: 150"
iceStrike(100);     // "Ice damage: 120"
criticalHit(100);   // "Critical damage: 200"

// ====== Currying — one argument at a time ======
const applyBuff = (buffType) => (amount) => (target) => {
  target[buffType] = (target[buffType] || 0) + amount;
  console.log(\`\${target.name}: \${buffType} +\${amount} (now \${target[buffType]})\`);
  return target;
};

// Partially applied — creates reusable specialized buffers
const buffStrength = applyBuff("strength");
const addTenStrength = buffStrength(10);

const warrior = { name: "Thorin", strength: 20 };
addTenStrength(warrior); // "Thorin: strength +10 (now 30)"

// ====== Function Composition — chaining transformations ======
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const addBonus = (dmg) => dmg + 15;
const doubleDamage = (dmg) => dmg * 2;
const capAt999 = (dmg) => Math.min(dmg, 999);

const calculateFinalDamage = compose(capAt999, doubleDamage, addBonus);
console.log(calculateFinalDamage(100)); // (100+15)*2 = 230, capped = 230`,
    breakdown: `Let's trace through these functional patterns:

• function createDamageMultiplier(multiplier, element) — A higher-order function: it RETURNS a function. The returned function has multiplier and element pre-configured via closure.

• return function(baseDamage) {...} — The returned function only needs baseDamage. The multiplier and element are already "baked in" from the outer function's scope.

• const fireBlast = createDamageMultiplier(1.5, "Fire") — fireBlast IS a function now. It's specialized: always multiplies by 1.5 and labels as "Fire." We created it from a generic template.

• const applyBuff = (buffType) => (amount) => (target) => {...} — Curried function: three levels of arrow functions. Each accepts one argument and returns the next function.

• const buffStrength = applyBuff("strength") — Partially applied: fixes buffType to "strength", returns a function expecting (amount) => (target) => ...

• const addTenStrength = buffStrength(10) — Applies amount=10, returns a function expecting just (target). We've built a specialized tool step by step.

• addTenStrength(warrior) — Final application: provides the target. All three arguments are now supplied across separate calls.

• const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x) — Compose takes any number of functions and returns a new function that chains them right-to-left.

• fns.reduceRight — Processes functions from right to left. First addBonus(100)=115, then doubleDamage(115)=230, then capAt999(230)=230.

• const calculateFinalDamage = compose(capAt999, doubleDamage, addBonus) — A pipeline! Data flows through addBonus → doubleDamage → capAt999. Each function is simple and testable alone.`,
    summary: `Higher-order functions create specialized functions from general templates using closures. Currying breaks multi-argument functions into chains of single-argument functions, enabling powerful partial application. Function composition chains simple transformations into complex pipelines. These patterns maximize reusability and make code declarative rather than imperative.`
  },
  {
    title: "Advanced Patterns syntax & usage",
    definition: "Memoization is a caching technique that stores the results of expensive function calls and returns the cached result when the same inputs recur. The module pattern uses closures to create private state and public interfaces without classes.",
    explanation: `Memoization is like an RPG's bestiary — the first time you encounter a monster, you study it carefully (expensive computation). Every subsequent encounter, you just look it up in your bestiary (cached result). If a function is called repeatedly with the same arguments and always produces the same output (a "pure" function), memoization can dramatically improve performance.

The classic example is the Fibonacci sequence or factorial calculations — recursive functions that re-compute the same sub-problems many times. Without memoization, fib(40) makes over a billion function calls. With memoization, it makes 40. That's the difference between your game freezing for minutes versus running instantly.

A generic memoize function is a higher-order function that wraps any pure function with a cache. It creates a Map (or object) that stores input-to-output mappings. Before computing, it checks: "Have I seen these arguments before?" If yes, return the cached result. If no, compute, store, then return.

The module pattern uses closures to create self-contained units with private state and a public API — similar to classes but using functions and objects. It was the primary way to achieve encapsulation before ES6 classes and modules. The Revealing Module Pattern is a refined version where you define everything privately and then "reveal" only what should be public by returning an object.

These patterns are fundamental to how many libraries work internally. React's useMemo hook is memoization. Redux's state management uses the module pattern. Understanding these patterns means you can build your own frameworks and understand others' source code.`,
    code: `// ====== Memoization — cache expensive computations ======
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(\`Cache hit for: \${key}\`);
      return cache.get(key);
    }

    console.log(\`Computing for: \${key}\`);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive pathfinding calculation (simulated)
const findPath = memoize((startX, startY, endX, endY) => {
  // In reality, this would be A* or Dijkstra's algorithm
  const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  return { distance: distance.toFixed(2), steps: Math.ceil(distance) };
});

findPath(0, 0, 10, 10);  // Computing... (first time)
findPath(0, 0, 10, 10);  // Cache hit! (instant return)
findPath(5, 5, 20, 20);  // Computing... (new arguments)

// ====== Module Pattern — private state + public API ======
const GameAudio = (() => {
  // Private — cannot be accessed from outside
  let volume = 0.7;
  let isMuted = false;
  const tracks = new Map();

  // Private helper
  function clampVolume(v) {
    return Math.max(0, Math.min(1, v));
  }

  // Public API — the revealed interface
  return {
    setVolume(v) { volume = clampVolume(v); },
    getVolume() { return isMuted ? 0 : volume; },
    mute() { isMuted = true; },
    unmute() { isMuted = false; },
    play(trackName) {
      console.log(\`Playing "\${trackName}" at volume \${this.getVolume()}\`);
    },
  };
})(); // IIFE — immediately invoked!

GameAudio.play("battle-theme"); // "Playing "battle-theme" at volume 0.7"
GameAudio.mute();
GameAudio.play("victory");      // "Playing "victory" at volume 0"`,
    breakdown: `Let's dissect both patterns:

• function memoize(fn) — Higher-order function that takes any function and returns a memoized version. The cache persists across calls via closure.

• const cache = new Map() — The cache lives in the closure. It persists as long as the memoized function exists. Maps handle any serializable key type.

• const key = JSON.stringify(args) — Converts arguments array to a string for use as a Map key. [0, 0, 10, 10] becomes "[0,0,10,10]". Note: doesn't work for object arguments (use a custom key function).

• if (cache.has(key)) return cache.get(key) — If we've seen these exact arguments before, skip computation entirely. O(1) lookup.

• fn.apply(this, args) — Calls the original function with proper context and arguments. "apply" spreads the args array as individual parameters.

• const findPath = memoize((startX, startY, endX, endY) => {...}) — Wraps an expensive pathfinding function. First call computes; repeat calls are instant.

• const GameAudio = (() => {...})() — IIFE (Immediately Invoked Function Expression). The outer function runs immediately, its return value becomes GameAudio.

• let volume = 0.7; let isMuted = false; — Private state. These variables exist only inside the IIFE's scope. Nothing external can access or modify them directly.

• function clampVolume(v) — Private helper function. Only the public methods inside can call it.

• return { setVolume, getVolume, mute, play } — The public API. Only these methods are accessible on GameAudio. They form closures over the private variables.

• GameAudio.play("battle-theme") — Using the module's public interface. Internally it reads the private volume variable through the getVolume closure.`,
    summary: `Memoization wraps functions with a cache to skip redundant computations — essential for expensive, frequently-called pure functions. The module pattern uses IIFEs and closures to create singletons with truly private state and controlled public APIs. Both patterns demonstrate how closures enable sophisticated state management and performance optimization.`
  },
  {
    title: "Practical examples of Advanced Patterns",
    definition: "Proxy and Reflect provide metaprogramming capabilities — intercepting and customizing fundamental operations on objects. Generators (function*) create pausable functions that produce sequences of values on demand, enabling lazy evaluation and custom iterators.",
    explanation: `Proxy is like placing an invisible guardian NPC in front of a treasure chest. Every time someone tries to open the chest (access a property), put something in (set a property), or check if something exists (has operator), the guardian intercepts the action and can validate, log, transform, or block it. It's metaprogramming: code that controls how other code behaves.

A Proxy wraps an object and defines "traps" — handler functions that intercept operations. The most common traps are: get (reading a property), set (writing a property), has (the "in" operator), and deleteProperty. Reflect provides methods that mirror each trap, giving you access to the default behavior you're intercepting.

Generators are functions that can pause mid-execution and resume later. Declared with function* (note the asterisk), they use the yield keyword to emit values one at a time. Each time you call .next() on a generator, it runs until the next yield and pauses. This is fundamentally different from normal functions that run start-to-finish.

Generators enable lazy evaluation — computing values only when requested rather than all upfront. Need a sequence of 10 million items? A generator produces them one at a time without allocating memory for all 10 million. They're perfect for infinite sequences (procedural dungeon generation!), pagination, and custom iteration protocols.

WeakMap and WeakSet hold "weak" references to objects — if the object has no other references, it can be garbage collected even though the WeakMap/WeakSet holds it. They're perfect for attaching private metadata to objects without preventing garbage collection (preventing memory leaks in long-running games).`,
    code: `// ====== Proxy — intercept object operations ======
function createReactivePlayer(playerData) {
  const handlers = {
    // Trap: intercepts property reading
    get(target, property) {
      console.log(\`[READ] Accessing \${property}: \${target[property]}\`);
      return Reflect.get(target, property);
    },
    // Trap: intercepts property writing
    set(target, property, value) {
      const oldValue = target[property];
      // Validation: HP can't exceed max
      if (property === "hp") {
        value = Math.min(value, target.maxHp);
        value = Math.max(0, value);
      }
      console.log(\`[WRITE] \${property}: \${oldValue} → \${value}\`);
      Reflect.set(target, property, value);
      // Trigger UI update, save game, etc.
      if (property === "hp" && value === 0) {
        console.log("GAME OVER — Player has fallen!");
      }
      return true;
    },
  };

  return new Proxy(playerData, handlers);
}

const player = createReactivePlayer({ name: "Aria", hp: 100, maxHp: 100 });
player.hp = 75;   // [WRITE] hp: 100 → 75
player.hp = -20;  // [WRITE] hp: 75 → 0, GAME OVER!
player.hp = 9999; // [WRITE] hp: 0 → 100 (clamped to maxHp)

// ====== Generator — produce values lazily on demand ======
function* dungeonGenerator(seed) {
  let floor = 1;
  while (true) {
    // Each yield pauses the function and emits a value
    const enemies = Math.floor(seed * floor * 3.7) % 10 + 1;
    const treasure = floor % 5 === 0 ? "Boss Chest" : "Normal Chest";
    yield { floor, enemies, treasure };
    floor++;
    seed = (seed * 16807) % 2147483647; // Simple RNG
  }
}

const dungeon = dungeonGenerator(42);
console.log(dungeon.next().value); // { floor: 1, enemies: ?, treasure: "Normal Chest" }
console.log(dungeon.next().value); // { floor: 2, ... } — generates on demand!
console.log(dungeon.next().value); // { floor: 3, ... } — infinite, no memory issue`,
    breakdown: `Let's examine Proxy, Reflect, and Generators:

• function createReactivePlayer(playerData) — Factory that wraps a plain object with reactive behavior. The returned Proxy looks and acts like the original object but intercepts all operations.

• const handlers = { get(...), set(...) } — The handler object defines "traps." Each trap corresponds to a fundamental object operation. Only define traps you need; untrapped operations pass through normally.

• get(target, property) — Fires when ANY property is read: player.hp, player.name, etc. "target" is the original object, "property" is the key being accessed.

• Reflect.get(target, property) — Performs the DEFAULT get behavior. Reflect methods mirror each trap and give you the standard implementation to call when needed.

• set(target, property, value) — Fires on assignment: player.hp = 75. We can validate, transform, or reject the new value before it's stored.

• value = Math.min(value, target.maxHp) — Validation in the set trap: HP is automatically clamped. External code doesn't need to remember to validate — the Proxy enforces it.

• return true — Set traps MUST return true to indicate success. Returning false (in strict mode) throws a TypeError.

• function* dungeonGenerator(seed) — The asterisk (*) marks this as a generator function. It doesn't run immediately — calling it returns a generator object.

• while (true) — An INFINITE loop! But it's fine because generators only execute until the next yield. This loop represents infinite procedurally-generated floors.

• yield { floor, enemies, treasure } — Pauses the generator and emits this value. Execution resumes from HERE on the next .next() call.

• dungeon.next().value — .next() resumes the generator until the next yield. The .value property holds the yielded value. .done would be true if the generator returned.`,
    summary: `Proxy intercepts object operations (get, set, delete) for validation, logging, and reactive behavior — the foundation of frameworks like Vue 3. Generators (function*) create pausable functions that yield values on demand, enabling infinite sequences and lazy evaluation without memory issues. Both are powerful metaprogramming tools for building frameworks and game systems.`
  },
  {
    title: "Advanced Patterns best practices",
    definition: "Best practices for advanced patterns include using WeakMap/WeakSet for memory-safe metadata storage, combining patterns for real-world solutions, knowing when patterns add unnecessary complexity, and writing code that's sophisticated yet readable.",
    explanation: `The trap with advanced patterns is over-engineering. Like an RPG player who hoards every legendary weapon but only needs a basic sword for most encounters, developers sometimes reach for Proxy, generators, or complex curried functions when a simple approach would be clearer and more maintainable. The best code is the simplest code that correctly solves the problem.

WeakMap and WeakSet solve a specific problem: attaching metadata to objects without preventing garbage collection. A regular Map holding object keys keeps those objects alive forever (memory leak). A WeakMap lets the garbage collector reclaim objects when no other references exist. This is essential for long-running applications like games that continuously create and destroy entities.

Pattern combination is where real expertise shows. A memoized function with a WeakMap cache, a Proxy that uses generators for lazy property computation, a curried event handler factory with closure-based state — real applications combine patterns naturally based on requirements, not to show off.

When deciding which pattern to use, ask: "Would a junior developer understand this in 6 months?" If not, either add clear comments explaining WHY (not just what), or simplify. Code is read far more often than it's written. Advanced patterns should make code MORE understandable at a high level (hiding complexity behind clean interfaces), not less.

The Rule of Three applies: don't abstract until you've written similar code three times. The first time, just write it. The second time, notice the duplication. The third time, now you have enough examples to create the right abstraction. Premature abstraction with advanced patterns creates rigid, hard-to-change code.`,
    code: `// ====== WeakMap — memory-safe private data storage ======
const entityMetadata = new WeakMap();

class Entity {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    // Store private metadata without polluting the object
    entityMetadata.set(this, {
      createdAt: Date.now(),
      updateCount: 0,
      lastPosition: { x: 0, y: 0 },
    });
  }

  update(x, y) {
    const meta = entityMetadata.get(this);
    meta.updateCount++;
    meta.lastPosition = { x, y };
    // If this entity is deleted, WeakMap lets it be garbage collected
  }

  getStats() {
    const meta = entityMetadata.get(this);
    return \`\${this.name}: updated \${meta.updateCount} times\`;
  }
}

// ====== Combining patterns — middleware pipeline ======
function createMiddlewarePipeline() {
  const middlewares = [];

  return {
    use(fn) {
      middlewares.push(fn);
      return this; // Enable chaining
    },

    async execute(context) {
      let index = 0;

      async function next() {
        if (index >= middlewares.length) return;
        const middleware = middlewares[index++];
        await middleware(context, next);
      }

      await next();
      return context;
    },
  };
}

// Usage: damage calculation pipeline
const combat = createMiddlewarePipeline();
combat
  .use(async (ctx, next) => {
    ctx.damage = ctx.baseDamage + ctx.strength * 2;
    console.log(\`Base calculation: \${ctx.damage}\`);
    await next();
  })
  .use(async (ctx, next) => {
    if (ctx.isCritical) ctx.damage *= 2;
    console.log(\`After crit check: \${ctx.damage}\`);
    await next();
  })
  .use(async (ctx, next) => {
    ctx.damage = Math.max(1, ctx.damage - ctx.targetArmor);
    console.log(\`After armor: \${ctx.damage}\`);
    await next();
  });

const result = combat.execute({
  baseDamage: 50, strength: 10, isCritical: true, targetArmor: 30,
});`,
    breakdown: `Let's analyze these production-ready patterns:

• const entityMetadata = new WeakMap() — WeakMap holds references to entities WEAKLY. When an entity object is deleted/dereferenced elsewhere, the WeakMap entry is automatically garbage collected. No memory leaks!

• entityMetadata.set(this, {...}) — Associates private metadata with the entity. This data isn't on the object itself (won't show up in JSON.stringify, for...in, etc.). True privacy.

• entityMetadata.get(this) — Retrieves the metadata. Only code with access to the WeakMap variable can read it. The entity itself exposes only what getStats() reveals.

• function createMiddlewarePipeline() — Combines closures + higher-order functions + async/await. The middleware pattern from Express/Koa: each function can modify context and call next() to continue.

• const middlewares = [] — Private array (closure). Holds the pipeline's functions in order.

• return this — Enables method chaining: pipeline.use(a).use(b).use(c). Each .use() returns the pipeline object.

• async function next() — Recursive async function that advances through the middleware array. Each middleware receives context and the next() function.

• const middleware = middlewares[index++] — Gets the current middleware and increments the index. Post-increment ensures each call advances to the next one.

• await middleware(context, next) — Each middleware can be async. Calling next() inside it passes control to the next middleware. Not calling next() stops the pipeline (useful for error handling or short-circuiting).

• combat.use(async (ctx, next) => {...}) — Each middleware transforms the context object. The pipeline runs them in order, building up the final damage calculation step by step.

• This pattern is incredibly flexible — add, remove, or reorder middlewares without changing any individual middleware's code.`,
    summary: `WeakMap enables memory-safe metadata storage that doesn't prevent garbage collection — essential for long-running applications. The middleware pipeline pattern combines closures, higher-order functions, and async/await to create flexible, composable processing chains. Use advanced patterns when they genuinely simplify architecture, not just to demonstrate cleverness — readable code always wins.`
  }
];
