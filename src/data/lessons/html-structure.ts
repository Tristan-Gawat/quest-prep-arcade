// Pre-written lessons for HTML/CSS Module: HTML Structure

export const htmlStructureLessons = [
  {
    title: "What is HTML Structure?",
    definition: "HTML Structure in HTML/CSS provides the semantic skeleton of web pages using elements like header, nav, main, section, article, and footer to organize content meaningfully.",
    explanation: `HTML Structure is a core concept in HTML/CSS that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

HTML/CSS's approach to html structure is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering html structure, you unlock powerful patterns and idioms that are standard in professional HTML/CSS development.`,
    code: `<!-- HTML Structure - Basic structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/quests">Quests</a>
            <a href="/inventory">Inventory</a>
        </nav>
    </header>
    <main>
        <section class="hero-panel">
            <h1>Welcome, Adventurer!</h1>
            <p>Your journey begins here.</p>
        </section>
        <section class="stats">
            <article class="stat-card">
                <h2>Level</h2>
                <p class="value">42</p>
            </article>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Quest Arcade</p>
    </footer>
</body>
</html>`,
    breakdown: `\u2022 The basic declaration shows how to define and use html structure in HTML/CSS.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "HTML Structure in HTML/CSS provides provides the semantic skeleton of web pages using elements like header, nav, main, section, article, and footer to organize content meaningfully.. It's fundamental to writing correct, efficient HTML/CSS code."
  },
  {
    title: "How HTML Structure works",
    definition: "HTML Structure works by browsers parsing HTML into a DOM (Document Object Model) tree. Each element becomes a node with parent-child relationships, attributes, and text content.",
    explanation: `Under the hood, html structure in HTML/CSS involves specific compile-time and runtime mechanisms. The interpreter enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how html structure works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `<!-- HTML Structure - How the DOM works -->
<!-- Browser parses HTML into a tree structure -->
<div id="app">           <!-- Root node -->
  <header>               <!-- Child of app -->
    <h1>Game Title</h1>  <!-- Child of header -->
  </header>
  <main>                 <!-- Sibling of header -->
    <section id="player-info">
      <h2>Player Stats</h2>
      <ul class="stats-list">
        <li data-stat="hp">HP: 100</li>
        <li data-stat="mp">MP: 50</li>
        <li data-stat="xp">XP: 2500</li>
      </ul>
    </section>
  </main>
</div>

<!-- Semantic elements carry meaning -->
<article>  <!-- Self-contained, reusable content -->
<aside>    <!-- Related but tangential content -->
<details>  <!-- Expandable disclosure widget -->
<figure>   <!-- Image with caption -->
<time>     <!-- Machine-readable date/time -->
<mark>     <!-- Highlighted/relevant text -->
<output>   <!-- Result of calculation -->`,
    breakdown: `\u2022 Internal mechanics show how the runtime handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "HTML Structure works through browsers parsing HTML into a DOM (Document Object Model) tree. Each element becomes a node with parent-child relationships, attributes, and text content.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "HTML Structure syntax & usage",
    definition: "HTML/CSS html structure syntax includes includes doctype declaration, head/body sections, semantic elements, attributes (id, class, data-*), and proper nesting rules.",
    explanation: `HTML/CSS provides clear syntax for html structure with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other HTML/CSS developers.

Modern HTML/CSS continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `<!-- HTML Structure - Syntax reference -->
<!-- Void elements (self-closing) -->
<img src="hero.png" alt="Hero avatar" width="64" height="64">
<input type="text" placeholder="Enter name">
<br>
<hr>
<meta name="description" content="Game app">
<link rel="icon" href="favicon.ico">

<!-- Global attributes -->
<div
    id="unique-name"
    class="card primary"
    data-player-id="123"
    title="Hover tooltip"
    hidden
    tabindex="0"
    role="button"
    aria-label="Close dialog"
>
    Content here
</div>

<!-- Semantic sectioning -->
<header>Site-wide or section header</header>
<nav>Navigation links</nav>
<main>Primary page content (one per page)</main>
<section>Thematic grouping with heading</section>
<article>Self-contained composition</article>
<aside>Tangential content (sidebars)</aside>
<footer>Footer information</footer>

<!-- Text semantics -->
<strong>Important (bold)</strong>
<em>Emphasis (italic)</em>
<code>Inline code</code>
<pre><code>Code block</code></pre>`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow HTML/CSS community standards.\n\n\u2022 Modern HTML/CSS features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "HTML/CSS syntax for html structure is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of HTML Structure",
    definition: "In real applications, html structure structures web apps, game UIs, dashboards, and landing pages. Semantic HTML improves accessibility, SEO, and maintainability.",
    explanation: `Real-world HTML/CSS applications use html structure for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source HTML/CSS projects provide excellent examples of html structure in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `<!-- HTML Structure - Practical game UI -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Character Sheet</title>
</head>
<body>
    <main class="character-sheet">
        <header class="char-header">
            <img src="avatar.png" alt="Character" class="avatar">
            <div class="char-info">
                <h1>Shadow Knight</h1>
                <p class="class-badge">Dark Warrior - Level 42</p>
            </div>
        </header>

        <section class="stats-grid" aria-label="Character Stats">
            <div class="stat" data-stat="hp">
                <span class="stat-label">HP</span>
                <progress value="340" max="500">340/500</progress>
                <span class="stat-value">340/500</span>
            </div>
            <div class="stat" data-stat="mp">
                <span class="stat-label">MP</span>
                <progress value="80" max="120">80/120</progress>
                <span class="stat-value">80/120</span>
            </div>
        </section>

        <section class="inventory" aria-label="Inventory">
            <h2>Equipment</h2>
            <ul class="item-grid" role="list">
                <li class="item legendary" draggable="true">
                    <img src="sword.png" alt="">
                    <span>Excalibur</span>
                </li>
            </ul>
        </section>
    </main>
</body>
</html>`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate html structure in game systems, data processing, and service design. The patterns are universal across HTML/CSS projects."
  },
  {
    title: "HTML Structure best practices",
    definition: "Best practices for html structure include using semantic elements over divs, keeping structure separate from style, ensuring accessibility (ARIA), validating markup, and following heading hierarchy.",
    explanation: `Professional HTML/CSS code follows established conventions for html structure that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when html structure is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `<!-- HTML Structure - Best practices -->
<!-- DO: Use semantic elements -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/play">Play</a></li>
    </ul>
</nav>

<!-- DO: Accessible images -->
<img src="hero.png" alt="Level 42 warrior with fire sword">
<img src="decoration.svg" alt="" role="presentation">

<!-- DO: Proper heading hierarchy -->
<h1>Game Dashboard</h1>    <!-- One per page -->
  <h2>Player Stats</h2>    <!-- Subsection -->
    <h3>Combat</h3>         <!-- Sub-subsection -->
  <h2>Inventory</h2>       <!-- Another section -->

<!-- DO: Form accessibility -->
<form>
    <label for="username">Username</label>
    <input id="username" type="text" required
           aria-describedby="username-help">
    <small id="username-help">3-20 characters</small>
</form>

<!-- DON'T: Div soup -->
<!-- <div class="nav"><div class="item">Home</div></div> -->
<!-- Use <nav><a>Home</a></nav> instead! -->`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: using semantic elements over divs, keeping structure separate from style, ensuring accessibility (ARIA), validating markup, and following heading hierarchy.. Following conventions makes code maintainable and professional."
  }
];
