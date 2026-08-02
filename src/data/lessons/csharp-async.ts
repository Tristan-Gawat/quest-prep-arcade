// Pre-written lessons for C# Module: Async/Await

export const csharpAsyncLessons = [
  {
    title: "What is Async/Await?",
    definition: "Async/Await is C#'s pattern for writing asynchronous code that doesn't block threads while waiting for I/O operations like network requests, file reads, or database queries.",
    explanation: `Asynchronous programming allows your application to start a long-running operation and continue doing other work while waiting for it to complete. Instead of blocking a thread (making it sit idle), async code frees the thread to handle other tasks.

The async keyword marks a method as asynchronous. The await keyword pauses execution at that point until the awaited Task completes — but crucially, it doesn't block the thread. The thread is released back to the thread pool to do other work.

Think of it like ordering food at a restaurant. Synchronous: you stand at the counter doing nothing until your food is ready. Asynchronous: you get a buzzer, sit down, do other things, and the buzzer alerts you when it's ready.

This matters for scalability. A web server with synchronous code ties up a thread per request during I/O waits. With async, those threads are freed to handle other requests, dramatically increasing throughput without adding threads.`,
    code: `// Synchronous — blocks the thread
// string data = File.ReadAllText("save.json"); // thread waits!

// Asynchronous — frees the thread during I/O
async Task<string> LoadSaveAsync(string path)
{
    string data = await File.ReadAllTextAsync(path);
    return data;  // returns after file is read
}

// Calling async methods
async Task Main()
{
    Console.WriteLine("Loading...");
    string save = await LoadSaveAsync("save.json");
    Console.WriteLine(\Loaded!\);

    // Multiple concurrent operations
    Task<string> task1 = LoadSaveAsync("profile.json");
    Task<string> task2 = LoadSaveAsync("settings.json");

    // Wait for both simultaneously
    await Task.WhenAll(task1, task2);
    Console.WriteLine("Both files loaded!");
}

// Async with return value
async Task<int> CalculateScoreAsync(int playerId)
{
    var stats = await GetStatsFromDbAsync(playerId);
    return stats.Wins * 10 + stats.Draws * 3;
}

// Fire and forget (careful!)
_ = SendAnalyticsAsync(eventData); // don't await`,
    breakdown: `• async Task<string> LoadSaveAsync — The async modifier enables await inside. Task<string> means it eventually returns a string. Naming convention: suffix with Async.

• await File.ReadAllTextAsync(path) — Suspends this method until the file is read. The thread is released to do other work. When done, execution resumes after this line.

• Task<string> task1 = LoadSaveAsync(...) — Starting without await returns a Task object immediately. The operation begins but we don't wait for it yet.

• await Task.WhenAll(task1, task2) — Waits for BOTH tasks to complete concurrently. Much faster than awaiting each sequentially when they're independent.

• async Task<int> — Returns Task<int>, meaning the caller can await to get an int. The compiler handles wrapping the return value in a Task.

• _ = SendAnalyticsAsync(eventData) — Fire-and-forget. Starts the task but doesn't await it. Use sparingly — exceptions are silently swallowed.`,
    summary: "Async/Await enables non-blocking I/O operations. async marks methods as asynchronous, await suspends until completion without blocking threads. Task.WhenAll runs multiple operations concurrently. Methods return Task (void) or Task<T> (with value). This pattern dramatically improves scalability for I/O-bound applications."
  },
  {
    title: "How Async/Await works",
    definition: "The C# compiler transforms async methods into state machines. Each await point becomes a state transition. When awaiting, the method's state is captured, the thread is released, and a continuation is registered to resume when the operation completes.",
    explanation: `When you write an async method, the C# compiler rewrites it into a state machine class. Each await divides your method into segments. The state machine tracks which segment to run next and preserves local variables across suspensions.

When execution hits an await on an incomplete Task, the state machine saves its current state (local variables, position), registers a continuation callback on the Task, and returns control to the caller. The thread is now free for other work.

When the awaited operation completes, the continuation fires. By default, it captures and restores the original SynchronizationContext (UI thread in desktop apps, null in ASP.NET Core). The state machine resumes from where it left off with all locals intact.

This is fundamentally different from creating new threads. Async doesn't create threads — it efficiently uses existing thread pool threads. For I/O operations (network, disk), no thread is used AT ALL during the wait. The OS signals completion through I/O completion ports.`,
    code: `// What the compiler generates (simplified):
// Your code:
async Task<int> GetScoreAsync()
{
    int base_ = 100;
    int bonus = await GetBonusAsync();
    return base_ + bonus;
}

// Compiler generates something like:
// class GetScoreAsyncStateMachine : IAsyncStateMachine
// {
//     int state = 0;
//     int base_, bonus;
//     TaskAwaiter<int> awaiter;
//
//     void MoveNext()
//     {
//         if (state == 0) {
//             base_ = 100;
//             awaiter = GetBonusAsync().GetAwaiter();
//             if (!awaiter.IsCompleted) {
//                 state = 1;
//                 // schedule continuation, return
//             }
//         }
//         if (state == 1) {
//             bonus = awaiter.GetResult();
//             SetResult(base_ + bonus);
//         }
//     }
// }

// ConfigureAwait for library code
async Task<byte[]> DownloadAsync(string url)
{
    using var client = new HttpClient();
    // ConfigureAwait(false) = don't capture context
    var response = await client.GetAsync(url)
        .ConfigureAwait(false);
    return await response.Content.ReadAsByteArrayAsync()
        .ConfigureAwait(false);
}

// ValueTask for hot-path optimization
ValueTask<int> GetCachedScoreAsync(int id)
{
    if (_cache.TryGetValue(id, out int score))
        return ValueTask.FromResult(score); // no allocation!
    return new ValueTask<int>(LoadScoreAsync(id));
}`,
    breakdown: `• State machine transformation — The compiler breaks the method at each await into numbered states. Local variables become fields on the state machine class.

• awaiter.IsCompleted — Synchronous fast-path. If the task is already complete (cached result, small file), no suspension happens. Execution continues immediately.

• ConfigureAwait(false) — Tells the awaiter not to capture the synchronization context. Use in library code where you don't need to return to the original thread (e.g., UI thread).

• ValueTask<int> — Lightweight alternative to Task<int>. Avoids heap allocation when the result is often available synchronously (cache hits). Only await once!

• ValueTask.FromResult(score) — Returns a completed ValueTask without allocating a Task object on the heap. Critical for hot-path performance.`,
    summary: "The compiler transforms async methods into state machines that save/restore state at each await point. ConfigureAwait(false) avoids unnecessary context switching in library code. ValueTask avoids allocations when results are often immediately available. No threads are blocked during truly asynchronous I/O operations."
  },
  {
    title: "Async/Await syntax & usage",
    definition: "Async syntax includes async/await keywords, Task and Task<T> return types, Task.WhenAll/WhenAny for concurrency, CancellationToken for cancellation, and IAsyncEnumerable for async streams.",
    explanation: `C# async methods can return Task (no result), Task<T> (with result), ValueTask<T> (optimized), or void (event handlers only). The return type signals to callers whether they can await the method and what they'll get back.

Cancellation is a first-class concern in async code. CancellationToken allows callers to signal that they want to cancel an operation. The async method checks the token periodically and throws OperationCanceledException if cancellation is requested.

Async streams (IAsyncEnumerable<T>) combine async with iteration. They let you produce and consume data asynchronously one item at a time using 'await foreach'. This is perfect for paginated APIs, real-time data feeds, and streaming database queries.

Error handling in async code uses standard try/catch. When an awaited task throws, the exception is re-thrown at the await point as if it were synchronous code. Task.WhenAll collects exceptions from multiple tasks into an AggregateException.`,
    code: `// Cancellation support
async Task<List<Enemy>> LoadEnemiesAsync(CancellationToken ct = default)
{
    var enemies = new List<Enemy>();
    for (int i = 0; i < 100; i++)
    {
        ct.ThrowIfCancellationRequested(); // check for cancel
        var enemy = await FetchEnemyAsync(i, ct);
        enemies.Add(enemy);
    }
    return enemies;
}

// Using cancellation
var cts = new CancellationTokenSource();
cts.CancelAfter(TimeSpan.FromSeconds(5)); // auto-cancel after 5s
try
{
    var enemies = await LoadEnemiesAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Loading cancelled!");
}

// Async streams (IAsyncEnumerable)
async IAsyncEnumerable<int> GenerateScoresAsync()
{
    for (int i = 0; i < 10; i++)
    {
        await Task.Delay(500); // simulate async work
        yield return Random.Shared.Next(100);
    }
}

// Consuming async stream
await foreach (int score in GenerateScoresAsync())
{
    Console.WriteLine(\"Score: {score}\");
}

// Task.WhenAny — first to complete wins
var fastest = await Task.WhenAny(
    FetchFromServer1Async(),
    FetchFromServer2Async(),
    FetchFromServer3Async()
);
var result = await fastest; // get the winner's result`,
    breakdown: `• CancellationToken ct = default — Optional cancellation parameter. default means no cancellation. Callers pass a token to enable cancellation.

• ct.ThrowIfCancellationRequested() — Checks if cancellation was requested and throws OperationCanceledException. Place in loops and before long operations.

• CancelAfter(TimeSpan.FromSeconds(5)) — Automatically triggers cancellation after a timeout. Prevents infinite waits.

• async IAsyncEnumerable<int> — Async iterator. Produces values asynchronously one at a time. Combines yield return with async/await.

• await foreach — Consumes an async stream. Awaits each element as it becomes available. Natural syntax for real-time data processing.

• Task.WhenAny — Returns as soon as ANY task completes. Useful for racing multiple sources or implementing timeouts.`,
    summary: "CancellationToken enables cooperative cancellation of async operations with automatic timeout support. Async streams (IAsyncEnumerable + await foreach) enable asynchronous iteration. Task.WhenAll waits for all tasks; Task.WhenAny waits for the first. Always pass CancellationToken through async call chains."
  },
  {
    title: "Practical examples of Async/Await",
    definition: "Async patterns in real applications handle API calls, database queries, file operations, and concurrent data loading. Common patterns include parallel loading, retry with delay, and progress reporting.",
    explanation: `Real-world async code commonly fetches data from multiple sources concurrently, implements retry logic for transient failures, reports progress to the UI, and processes large datasets in streaming fashion.

The parallel loading pattern starts multiple independent operations at once and awaits them together. Loading a game's assets (textures, sounds, configs) concurrently is much faster than loading them one by one.

Retry patterns wrap async operations in loops with exponential backoff. Network calls often fail transiently (timeouts, server overload), and retrying after a delay usually succeeds. The combination of async and delay makes this efficient — no threads are blocked during the wait.

Progress reporting uses IProgress<T> to send updates back to the UI thread safely. The async method periodically reports how far it's gotten, and the UI updates a progress bar without blocking.`,
    code: `// === EXAMPLE 1: Parallel Game Asset Loading ===
async Task<GameAssets> LoadAllAssetsAsync(IProgress<int> progress)
{
    var tasks = new[]
    {
        LoadTexturesAsync(),
        LoadSoundsAsync(),
        LoadConfigAsync(),
        LoadSaveDataAsync()
    };

    int completed = 0;
    var results = new object[tasks.Length];
    foreach (var task in tasks)
    {
        results[completed] = await task;
        completed++;
        progress?.Report(completed * 25);
    }
    return BuildAssets(results);
}

// === EXAMPLE 2: Retry with Exponential Backoff ===
async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxRetries = 3)
{
    for (int attempt = 0; attempt <= maxRetries; attempt++)
    {
        try
        {
            return await operation();
        }
        catch (Exception ex) when (attempt < maxRetries)
        {
            int delay = (int)Math.Pow(2, attempt) * 1000;
            Console.WriteLine(\"Retry {attempt + 1} in {delay}ms: {ex.Message}\");
            await Task.Delay(delay);
        }
    }
    throw new Exception("All retries exhausted");
}

// Usage
var data = await RetryAsync(() => httpClient.GetStringAsync(url));

// === EXAMPLE 3: Concurrent API Calls ===
async Task<PlayerProfile> GetFullProfileAsync(int playerId)
{
    // Start all requests concurrently
    var statsTask = GetStatsAsync(playerId);
    var inventoryTask = GetInventoryAsync(playerId);
    var achievementsTask = GetAchievementsAsync(playerId);

    // Await all results
    await Task.WhenAll(statsTask, inventoryTask, achievementsTask);

    return new PlayerProfile
    {
        Stats = statsTask.Result,
        Inventory = inventoryTask.Result,
        Achievements = achievementsTask.Result
    };
}`,
    breakdown: `• IProgress<int> progress — Thread-safe progress reporting interface. Report() marshals to the UI thread automatically. The int represents percentage.

• Starting tasks before awaiting — Each LoadXxxAsync() starts immediately when called. Storing in an array lets us process completions in order while all run concurrently.

• catch (Exception ex) when (attempt < maxRetries) — Exception filter. Only catches if retries remain. The last attempt's exception propagates to the caller.

• await Task.Delay(delay) — Non-blocking wait. Unlike Thread.Sleep, this doesn't block a thread. The thread is freed during the delay.

• Task.WhenAll(statsTask, inventoryTask, achievementsTask) — All three API calls run in parallel. Total time = slowest call, not sum of all calls.

• statsTask.Result — Safe to access .Result AFTER awaiting (the Task is complete). Don't access .Result on incomplete tasks — it blocks!`,
    summary: "Start independent async operations concurrently by calling without await, then use Task.WhenAll to wait for all results. Retry patterns use exponential backoff with Task.Delay for non-blocking waits. IProgress<T> enables safe UI progress reporting. These patterns make applications responsive and resilient to transient failures."
  },
  {
    title: "Async/Await best practices",
    definition: "Best practices include async all the way (don't mix sync/async), always passing CancellationToken, avoiding async void, not blocking on async code (.Result/.Wait()), and proper exception handling.",
    explanation: `The most dangerous async anti-pattern is blocking on async code — calling .Result or .Wait() on a Task from synchronous code. In UI apps and ASP.NET (non-Core), this causes deadlocks because the awaited code needs the synchronization context that's blocked waiting for it.

'Async all the way' means if you call an async method, your method should also be async. Don't mix synchronous and asynchronous code. Let async propagate up the call stack until it reaches an entry point (Main, event handler, controller action).

Avoid async void methods except for event handlers. Async void methods can't be awaited, their exceptions crash the process (unobserved), and callers have no way to know when they complete. Always use async Task instead.

Proper resource management in async code means using 'await using' for IAsyncDisposable resources. This ensures cleanup happens after the async operation completes, not when the method initially returns.`,
    code: `// DO: Async all the way
async Task<GameState> LoadGameAsync()
{
    var save = await ReadSaveFileAsync();
    var state = await ParseStateAsync(save);
    return state;
}

// DON'T: Block on async (causes deadlocks!)
// GameState LoadGame()
// {
//     return LoadGameAsync().Result; // DEADLOCK in UI apps!
// }

// DO: Use async Task, not async void
async Task HandleButtonClickAsync() // good
{
    await SaveProgressAsync();
}

// DON'T: async void (except event handlers)
// async void DoStuff() { await x(); } // exceptions vanish!

// DO: Always propagate CancellationToken
async Task<List<Item>> SearchAsync(string query, CancellationToken ct)
{
    var results = await _db.QueryAsync(query, ct);
    return await FilterAsync(results, ct); // pass it through!
}

// DO: Use await using for async disposables
async Task ProcessFileAsync(string path)
{
    await using var stream = new FileStream(path,
        FileMode.Open, FileAccess.Read, FileShare.Read,
        4096, useAsync: true);
    await using var reader = new StreamReader(stream);
    string content = await reader.ReadToEndAsync();
}

// DO: Handle exceptions properly
async Task SafeOperationAsync()
{
    try
    {
        await RiskyOperationAsync();
    }
    catch (HttpRequestException ex)
    {
        _logger.LogWarning(ex, "Network error");
        // graceful degradation
    }
    catch (OperationCanceledException)
    {
        // Normal cancellation — don't log as error
    }
}`,
    breakdown: `• .Result causing deadlocks — The await inside LoadGameAsync needs the sync context to resume. But .Result is blocking that context. Neither can proceed = deadlock.

• async Task vs async void — async Task lets callers await, catch exceptions, and know when it's done. async void is fire-and-forget with no error handling. Only for event handlers.

• Passing CancellationToken through — Every async method in the chain should accept and forward the token. This ensures cancellation propagates from top-level code to the deepest async operation.

• await using — For IAsyncDisposable resources. Ensures DisposeAsync() is called after all async work completes. Regular 'using' only calls synchronous Dispose.

• catch (OperationCanceledException) — Cancellation is expected behavior, not an error. Don't log it as a warning/error. Handle it separately from actual failures.`,
    summary: "Never block on async (.Result/.Wait()) — it causes deadlocks. Use async Task instead of async void. Propagate CancellationToken through all async methods. Use 'await using' for async disposables. Treat OperationCanceledException as normal flow, not an error. Let async propagate all the way up the call stack."
  }
];
