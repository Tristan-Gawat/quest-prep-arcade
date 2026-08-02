// Pre-written full lessons for JavaScript: Async & Promises
// Each sub-lesson has: title, definition, explanation, code, breakdown, summary

export const jsAsyncPromisesLessons = [
  {
    title: "What is Async & Promises?",
    definition: "Asynchronous programming allows JavaScript to perform long-running tasks (like fetching data from a server) without freezing the rest of your code. Promises are objects that represent the eventual completion or failure of an async operation.",
    explanation: `Imagine you're in an RPG and you send a party member on a fetch quest. You don't stand frozen waiting for them to return — you keep exploring, fighting monsters, and collecting loot. When they come back, you handle whatever they brought. That's async programming in a nutshell.

JavaScript is single-threaded, meaning it can only do one thing at a time on its main thread. Without async patterns, your entire game would freeze every time you needed to load a save file, fetch player stats from a server, or wait for user input. The event loop is the game engine behind the scenes — it manages a queue of tasks, executing them one by one but cleverly scheduling long-running operations so they don't block everything else.

Before Promises, we used callbacks — functions passed into other functions to run "later." But callbacks led to deeply nested code called "callback hell" or the "pyramid of doom," making code nearly impossible to read or debug. Promises were introduced in ES6 (2015) to solve this. A Promise is like a quest contract: it's either pending (quest in progress), fulfilled/resolved (quest completed successfully), or rejected (quest failed).

Promises chain with .then() for success and .catch() for errors, creating flat, readable chains instead of nested pyramids. Later, ES2017 introduced async/await — syntactic sugar that makes async code look and behave like synchronous code, while still being non-blocking under the hood.

Understanding async is critical for any real-world JavaScript: API calls, database queries, file operations, timers, and animations all rely on these patterns. Master this, and you unlock the ability to build responsive, performant applications that never leave your users staring at a frozen screen.`,
    code: `// Callback pattern — the old way (callback hell begins here)
function fetchQuestReward(questId, callback) {
  setTimeout(() => {
    const reward = { gold: 500, xp: 200, item: "Dragon Sword" };
    callback(null, reward); // null = no error
  }, 1000); // Simulates 1 second network delay
}

// Using the callback
fetchQuestReward("quest_42", (error, reward) => {
  if (error) {
    console.log("Quest failed:", error);
    return;
  }
  console.log("Quest complete! Received:", reward.item);
  // Nested callback for another async task...
  fetchQuestReward("quest_43", (error2, reward2) => {
    // This nesting gets worse and worse — "callback hell"
    console.log("Next reward:", reward2.item);
  });
});

// The Promise-based approach (much cleaner!)
function fetchQuestRewardPromise(questId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (questId) {
        resolve({ gold: 500, xp: 200, item: "Dragon Sword" });
      } else {
        reject(new Error("Invalid quest ID!"));
      }
    }, 1000);
  });
}

console.log("Quest accepted! Adventuring while we wait...");`,
    breakdown: `Let's analyze each section:

• function fetchQuestReward(questId, callback) — The old callback pattern: you pass a function as the second argument that will be called LATER when the async work is done.

• setTimeout(() => {...}, 1000) — Simulates an async operation (like a network request). The arrow function inside runs after 1000ms (1 second). This is non-blocking — code below it keeps running.

• callback(null, reward) — Node.js convention: first argument is error (null means success), second is the data. This is how you "return" values from async operations in callback world.

• fetchQuestReward("quest_42", (error, reward) => {...}) — Calling the function and providing a callback. Notice how nesting another call inside creates indentation hell.

• return new Promise((resolve, reject) => {...}) — Creating a Promise! The constructor takes an "executor" function with two parameters: resolve (call when successful) and reject (call when something goes wrong).

• resolve({ gold: 500, xp: 200, item: "Dragon Sword" }) — Fulfills the Promise with this value. Anyone waiting with .then() will receive this object.

• reject(new Error("Invalid quest ID!")) — Rejects the Promise. Anyone waiting with .catch() will receive this error.

• console.log("Quest accepted!...") — This runs IMMEDIATELY, before the setTimeout finishes. That's async in action — the code doesn't wait.`,
    summary: `Async programming lets JavaScript handle time-consuming tasks without freezing your application. Callbacks were the original approach but led to deeply nested, hard-to-read code. Promises provide a cleaner contract-based pattern with three states (pending, fulfilled, rejected) and chainable .then()/.catch() methods.`
  },
  {
    title: "How Async & Promises works",
    definition: "The event loop is JavaScript's mechanism for executing code, collecting and processing events, and executing queued sub-tasks. Promises use microtask queues to schedule their callbacks with higher priority than regular tasks like setTimeout.",
    explanation: `Think of the event loop as the game's main loop — it continuously checks: "Is there anything in my queue to process?" JavaScript's runtime has a call stack (where functions execute), a task queue (macrotasks like setTimeout, setInterval, I/O), and a microtask queue (Promise callbacks, queueMicrotask).

Here's the key insight: when you call an async function or create a Promise, the heavy lifting happens outside the main thread (handled by the browser or Node.js runtime). When it's done, the result is placed in a queue. The event loop picks it up when the call stack is empty.

Microtasks (Promise .then/.catch/.finally callbacks) have PRIORITY over macrotasks (setTimeout, setInterval, DOM events). After each macrotask completes, ALL pending microtasks are drained before the next macrotask runs. This means Promise resolutions are processed faster than setTimeout callbacks, even if setTimeout is set to 0ms.

A Promise transitions through states exactly once: from pending to either fulfilled or rejected. Once settled, it stays that way forever — you can attach .then() handlers later and they'll still fire with the stored value. This is called "immutability of settlement."

The .then() method returns a NEW Promise, which is what enables chaining. Each .then() in a chain receives the return value of the previous .then(). If you return a Promise from inside .then(), the chain waits for it to resolve before continuing. This flat chaining is what eliminated callback hell.`,
    code: `// Demonstrating the event loop order
console.log("1: Synchronous - runs first (call stack)");

setTimeout(() => {
  console.log("4: Macrotask - runs last (task queue)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Microtask - runs before setTimeout!");
});

console.log("2: Synchronous - still on the call stack");

// Output order: 1, 2, 3, 4 — NOT 1, 2, 4, 3!

// Promise chaining — each .then() returns a new Promise
function startDungeonRun(dungeonName) {
  return new Promise((resolve) => {
    console.log(\`Entering \${dungeonName}...\`);
    setTimeout(() => resolve({ floor: 1, enemies: 5 }), 500);
  });
}

startDungeonRun("Shadow Cavern")
  .then((result) => {
    console.log(\`Floor \${result.floor}: Defeated \${result.enemies} enemies!\`);
    return { floor: 2, enemies: 8 }; // Pass data to next .then()
  })
  .then((result) => {
    console.log(\`Floor \${result.floor}: Defeated \${result.enemies} enemies!\`);
    return { floor: 3, boss: "Dragon Lord" };
  })
  .then((result) => {
    console.log(\`Floor \${result.floor}: Boss fight — \${result.boss}!\`);
  })
  .catch((error) => {
    console.log("Dungeon run failed:", error.message);
  });`,
    breakdown: `Let's trace through the execution order:

• console.log("1: Synchronous...") — Runs immediately. Synchronous code always executes first because it's directly on the call stack.

• setTimeout(() => {...}, 0) — Even with 0ms delay, this callback goes to the MACROTASK queue. It won't run until the call stack is empty AND all microtasks are processed.

• Promise.resolve().then(() => {...}) — Promise.resolve() creates an immediately-resolved Promise. The .then() callback goes to the MICROTASK queue — higher priority than the macrotask queue.

• console.log("2: Synchronous...") — Still synchronous, runs before any queued tasks. The call stack must be completely empty before queues are checked.

• Output: 1, 2, 3, 4 — Synchronous first (1, 2), then microtasks (3), then macrotasks (4). This ordering is crucial to understand.

• startDungeonRun("Shadow Cavern") — Returns a Promise that resolves after 500ms with floor/enemy data.

• .then((result) => {...}) — Each .then() receives the resolved value from the previous step. Returning a value wraps it in a resolved Promise automatically.

• return { floor: 2, enemies: 8 } — This plain object gets wrapped in Promise.resolve(), so the next .then() receives it.

• .catch((error) => {...}) — Catches ANY error in the entire chain. If any .then() throws or returns a rejected Promise, execution jumps here.`,
    summary: `The event loop manages JavaScript's async execution with a priority system: synchronous code first, then microtasks (Promises), then macrotasks (setTimeout/setInterval). Promise chains use .then() to pass data through sequential async steps, with .catch() at the end to handle any errors in the chain.`
  },
  {
    title: "Async & Promises syntax & usage",
    definition: "The async/await syntax, introduced in ES2017, lets you write asynchronous code that looks synchronous. An async function always returns a Promise, and await pauses execution within that function until a Promise resolves.",
    explanation: `If Promises with .then() chains are like reading a quest log entry by entry, async/await is like having the quest narrative flow naturally as a story. You write code that reads top-to-bottom, and JavaScript handles the waiting behind the scenes.

The async keyword before a function declaration marks it as asynchronous. This does two things: (1) the function automatically wraps its return value in a Promise, and (2) it allows you to use the await keyword inside it. Without async, using await is a syntax error.

The await keyword pauses execution of the async function (not the entire program!) until the Promise it's waiting on settles. If the Promise resolves, await returns the resolved value. If it rejects, await throws the rejection reason as an error — which you can catch with try/catch.

Error handling with async/await uses familiar try/catch blocks instead of .catch() chains. This makes complex error handling much more intuitive — you can wrap multiple await calls in one try block and handle all potential failures in the catch block, or use individual try/catch blocks for granular control.

You can use await with any "thenable" (object with a .then() method), not just native Promises. This means it works with most async libraries out of the box. The combination of async/await with destructuring, template literals, and other modern JS features creates incredibly expressive async code.`,
    code: `// Basic async/await — replacing .then() chains
async function completeQuest(questId) {
  console.log("Starting quest:", questId);

  // await pauses HERE until the Promise resolves
  const questData = await fetch(\`/api/quests/\${questId}\`);
  const quest = await questData.json();

  console.log(\`Quest: \${quest.name} | Reward: \${quest.gold} gold\`);
  return quest; // Automatically wrapped in a Promise
}

// Error handling with try/catch
async function attemptBossFight(bossName) {
  try {
    console.log(\`Engaging \${bossName}...\`);
    const result = await simulateFight(bossName);
    console.log(\`Victory! Earned \${result.xp} XP\`);
    return result;
  } catch (error) {
    console.log(\`Defeated by \${bossName}: \${error.message}\`);
    throw error; // Re-throw to let caller handle it too
  } finally {
    // Always runs — win or lose
    console.log("Returning to town to rest...");
  }
}

// Simulated async fight function
function simulateFight(boss) {
  return new Promise((resolve, reject) => {
    const playerPower = Math.random() * 100;
    setTimeout(() => {
      if (playerPower > 30) {
        resolve({ xp: 1000, loot: "Legendary Armor" });
      } else {
        reject(new Error("Not strong enough!"));
      }
    }, 1500);
  });
}`,
    breakdown: `Let's break down the async/await syntax:

• async function completeQuest(questId) — The async keyword makes this function return a Promise automatically. Even if you return a plain value, it's wrapped in Promise.resolve().

• const questData = await fetch(...) — await pauses THIS function until fetch() resolves. Other code outside this function keeps running. The resolved value is stored in questData.

• const quest = await questData.json() — .json() also returns a Promise, so we await it too. Each await is sequential — the second won't start until the first finishes.

• return quest — Since the function is async, this is equivalent to return Promise.resolve(quest). Callers can await this function.

• try { ... } catch (error) { ... } — Wrapping await calls in try/catch handles Promise rejections. If any awaited Promise rejects, execution jumps to catch immediately.

• const result = await simulateFight(bossName) — If simulateFight rejects, this line THROWS, and catch handles it. Much cleaner than .catch() chains.

• throw error — Re-throwing in catch lets parent callers also handle the error. Without this, the error is "swallowed" here.

• finally { ... } — Runs whether the try succeeded or catch fired. Perfect for cleanup operations like closing connections or resetting UI state.

• Math.random() * 100 — Generates a random number 0-100, simulating variable fight outcomes. Over 30 = win, under 30 = loss.`,
    summary: `Async/await makes asynchronous code read like synchronous code. The async keyword marks a function as Promise-returning, while await pauses execution until a Promise resolves. Use try/catch/finally for error handling — it's cleaner than .then()/.catch() chains and supports the same control flow patterns you already know.`
  },
  {
    title: "Practical examples of Async & Promises",
    definition: "Promise.all, Promise.race, Promise.allSettled, and Promise.any are utility methods for handling multiple concurrent Promises — running multiple async operations in parallel rather than sequentially.",
    explanation: `In an RPG, sometimes you want to send multiple party members on different quests simultaneously rather than waiting for each one to finish before starting the next. Promise concurrency methods let you do exactly this — run multiple async operations at the same time and coordinate their results.

Promise.all() takes an array of Promises and returns a new Promise that resolves when ALL of them resolve. Think of it as a raid requirement: everyone must be ready before the boss fight begins. If ANY single Promise rejects, the whole thing rejects immediately (fail-fast). This is perfect for loading multiple resources that are all required.

Promise.race() resolves or rejects as soon as the FIRST Promise settles (either way). Imagine a race between party members — first one to the finish line wins, regardless of whether they succeeded or failed. This is useful for timeouts: race your actual request against a timer.

Promise.allSettled() waits for ALL Promises to settle (resolve or reject) and returns an array of result objects with status "fulfilled" or "rejected." Unlike Promise.all, it never short-circuits on failure. This is ideal when you want results from all operations regardless of individual failures.

Promise.any() resolves as soon as the FIRST Promise fulfills (ignores rejections until all reject). It's like trying multiple attack strategies — you only need one to land. It only rejects if ALL Promises reject, with an AggregateError containing all rejection reasons.`,
    code: `// Promise.all — Load all game assets before starting
async function loadGameAssets() {
  const [sprites, sounds, mapData] = await Promise.all([
    fetchAsset("/sprites/hero.png"),
    fetchAsset("/audio/battle-theme.mp3"),
    fetchAsset("/maps/dungeon-01.json"),
  ]);
  console.log("All assets loaded! Starting game...");
  return { sprites, sounds, mapData };
}

// Promise.race — Timeout pattern for slow servers
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const fetchPromise = fetch(url).then((r) => r.json());
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out!")), timeoutMs);
  });
  // Whichever finishes first wins the race
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Promise.allSettled — Check all guild members' status
async function checkGuildStatus(memberIds) {
  const results = await Promise.allSettled(
    memberIds.map((id) => fetchPlayerStatus(id))
  );
  const online = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
  const offline = results
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason.message);
  console.log(\`Online: \${online.length}, Offline: \${offline.length}\`);
  return { online, offline };
}

// Helper function to simulate asset loading
function fetchAsset(path) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(\`Loaded: \${path}\`), Math.random() * 2000);
  });
}`,
    breakdown: `Let's examine each concurrency pattern:

• const [sprites, sounds, mapData] = await Promise.all([...]) — Destructures the resolved array directly. All three fetches run IN PARALLEL (simultaneously), not sequentially. Total time = slowest request, not sum of all requests.

• Promise.all([...]) — If any single Promise rejects, the entire Promise.all rejects immediately. The other Promises still run but their results are discarded.

• const timeoutPromise = new Promise((_, reject) => {...}) — The underscore _ ignores the resolve parameter since this Promise only ever rejects. It's a timer bomb.

• Promise.race([fetchPromise, timeoutPromise]) — First one to settle wins. If fetch is faster than 5 seconds, you get data. If the timer fires first, you get a timeout error.

• Promise.allSettled(memberIds.map(id => fetchPlayerStatus(id))) — Maps each ID to a Promise, then waits for ALL to complete regardless of success/failure. No short-circuiting.

• results.filter(r => r.status === "fulfilled") — Each result has { status: "fulfilled", value: ... } or { status: "rejected", reason: ... }. Filter to separate successes from failures.

• Math.random() * 2000 — Simulates variable load times (0-2 seconds). In parallel execution, total time is the max of all individual times, not the sum.`,
    summary: `Promise.all runs multiple async operations in parallel and waits for all to succeed (fails fast on any rejection). Promise.race resolves with whichever Promise settles first — perfect for timeouts. Promise.allSettled waits for all results regardless of success/failure, giving you complete visibility into each operation's outcome.`
  },
  {
    title: "Async & Promises best practices",
    definition: "Best practices for async JavaScript include proper error handling, avoiding common pitfalls like unhandled rejections and unnecessary sequential awaits, and using AbortController for cancellation — ensuring your code is robust, performant, and maintainable.",
    explanation: `Writing async code that works is one thing; writing async code that's production-ready is another. Like a seasoned adventurer who prepares for every trap and ambush, you need to anticipate failures, optimize performance, and write code that future developers (including future you) can understand.

The most common async anti-pattern is the "sequential await trap" — using await inside a loop or writing multiple awaits that don't depend on each other sequentially. Each await pauses execution, so independent operations become needlessly slow. If operations don't depend on each other's results, use Promise.all to run them concurrently.

Unhandled Promise rejections are like ignoring a ticking time bomb. In modern Node.js, unhandled rejections crash your process. Always attach .catch() handlers or wrap awaits in try/catch. For top-level async code in modules, wrap in an immediately-invoked async function or use top-level await (ES2022+).

AbortController is the standard way to cancel async operations — crucial for scenarios like navigating away from a page mid-request, or canceling outdated search results. Create a controller, pass its signal to fetch, and call controller.abort() to cancel.

Finally, keep your async functions focused and composable. Each async function should do one thing well, making them easy to test, retry, and combine. Use descriptive names that indicate the async nature and expected behavior.`,
    code: `// BAD: Sequential awaits for independent operations
async function loadPlayerDataSlow(playerId) {
  const stats = await fetchStats(playerId);      // 1 sec
  const inventory = await fetchInventory(playerId); // 1 sec
  const quests = await fetchQuests(playerId);    // 1 sec
  // Total: ~3 seconds — each waits for the previous!
  return { stats, inventory, quests };
}

// GOOD: Parallel execution for independent operations
async function loadPlayerDataFast(playerId) {
  const [stats, inventory, quests] = await Promise.all([
    fetchStats(playerId),
    fetchInventory(playerId),
    fetchQuests(playerId),
  ]);
  // Total: ~1 second — all run at the same time!
  return { stats, inventory, quests };
}

// AbortController — Cancel requests when player navigates away
async function searchPlayers(query, signal) {
  try {
    const response = await fetch(\`/api/search?q=\${query}\`, { signal });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Search cancelled — player moved on");
      return null;
    }
    throw error; // Re-throw non-cancellation errors
  }
}

// Usage with AbortController
const controller = new AbortController();
searchPlayers("dragon", controller.signal);
// Player clicks away — cancel the pending request
controller.abort();`,
    breakdown: `Let's review the best practices:

• loadPlayerDataSlow — Each await BLOCKS the next line. Since these calls don't depend on each other's results, this wastes time. 3 sequential 1-second calls = 3 seconds total.

• loadPlayerDataFast — All three fetches START at the same time. Promise.all waits for the slowest one. 3 parallel 1-second calls = ~1 second total. 3x faster!

• const [stats, inventory, quests] = await Promise.all([...]) — Destructuring the results array gives clean variable names. Order matches the input array order.

• async function searchPlayers(query, signal) — Accepting an AbortSignal as a parameter makes the function cancellable from outside. This is the standard cancellation pattern.

• fetch(\`/api/search?q=\${query}\`, { signal }) — Passing the signal to fetch connects it to the AbortController. When controller.abort() is called, the fetch rejects with an AbortError.

• if (error.name === "AbortError") — Distinguishing cancellation from real errors. Cancellation is intentional and shouldn't be treated as a failure.

• throw error — Re-throwing unexpected errors ensures they propagate to calling code. Only swallow errors you explicitly know how to handle.

• controller.abort() — Triggers cancellation. Any fetch using this controller's signal will immediately reject with AbortError.`,
    summary: `Key async best practices: use Promise.all for independent parallel operations instead of sequential awaits, always handle errors with try/catch or .catch(), use AbortController for cancellable requests, and keep async functions focused on single responsibilities. These patterns ensure your code is fast, robust, and maintainable.`
  }
];
