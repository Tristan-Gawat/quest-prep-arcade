// Pre-written lessons for HTML/CSS Module: Flexbox

export const cssFlexboxLessons = [
  {
    title: "What is Flexbox?",
    definition: "Flexbox in HTML/CSS is a one-dimensional layout system for arranging items in rows or columns with powerful alignment, distribution, and ordering capabilities.",
    explanation: `Flexbox is a core concept in HTML/CSS that every developer needs to master. It provides the foundation for writing efficient, safe, and maintainable code.

Understanding this concept deeply enables you to leverage the language's strengths and avoid common pitfalls that plague beginners.

HTML/CSS's approach to flexbox is unique among programming languages, offering specific guarantees and trade-offs that shape how you design your programs.

By mastering flexbox, you unlock powerful patterns and idioms that are standard in professional HTML/CSS development.`,
    code: `/* Flexbox - Basic usage */
/* Selectors and properties */
.game-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #1a1a2e;
    color: #eee;
    font-family: 'Segoe UI', sans-serif;
}

.stat-card {
    background: #16213e;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
}

.stat-card h2 {
    color: #64ffda;
    font-size: 0.875rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}

.stat-card .value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
}`,
    breakdown: `\u2022 The basic declaration shows how to define and use flexbox in HTML/CSS.\n\n\u2022 Type safety ensures the compiler catches errors before runtime.\n\n\u2022 Standard library integration makes common operations concise.\n\n\u2022 Comments explain each line's purpose for learners.\n\n\u2022 The example demonstrates the most common usage pattern.`,
    summary: "Flexbox in HTML/CSS provides is a one-dimensional layout system for arranging items in rows or columns with powerful alignment, distribution, and ordering capabilities.. It's fundamental to writing correct, efficient HTML/CSS code."
  },
  {
    title: "How Flexbox works",
    definition: "Flexbox works by creating a flex formatting context on the container. Items become flex items that can grow, shrink, and align along the main and cross axes.",
    explanation: `Under the hood, flexbox in HTML/CSS involves specific compile-time and runtime mechanisms. The interpreter enforces rules that ensure correctness.

The implementation details affect performance characteristics and memory usage patterns that matter in production systems.

Understanding how flexbox works internally helps you predict behavior, debug issues, and write more efficient code.

This knowledge separates intermediate developers from advanced ones and is the difference between using a feature and truly understanding it.`,
    code: `/* Flexbox - How it works */
/* Specificity determines which styles apply */

/* Specificity: 0-0-1 (element) */
p { color: black; }

/* Specificity: 0-1-0 (class) - wins over element */
.highlight { color: yellow; }

/* Specificity: 1-0-0 (id) - wins over class */
#special { color: red; }

/* The cascade: later rules override earlier (same specificity) */
.text { color: blue; }
.text { color: green; } /* This wins! */

/* Inheritance: children inherit from parents */
body {
    font-family: sans-serif; /* All children inherit this */
    color: #333;             /* All text inherits this */
}

/* But not all properties inherit */
.container {
    border: 1px solid black; /* NOT inherited by children */
    padding: 1rem;           /* NOT inherited */
}

/* Custom properties (CSS variables) */
:root {
    --primary: #64ffda;
    --bg-dark: #1a1a2e;
    --radius: 8px;
}
.card {
    background: var(--bg-dark);
    border-radius: var(--radius);
    color: var(--primary);
}`,
    breakdown: `\u2022 Internal mechanics show how the runtime handles this concept.\n\n\u2022 Performance characteristics depend on implementation choices.\n\n\u2022 The compiler/runtime enforces safety rules automatically.\n\n\u2022 Understanding internals helps predict behavior and debug issues.`,
    summary: "Flexbox works through creating a flex formatting context on the container. Items become flex items that can grow, shrink, and align along the main and cross axes.. Understanding internals helps you write better code and debug effectively."
  },
  {
    title: "Flexbox syntax & usage",
    definition: "HTML/CSS flexbox syntax includes display:flex on container, flex-direction, justify-content, align-items, flex-wrap on container; flex-grow, flex-shrink, flex-basis, align-self on items.",
    explanation: `HTML/CSS provides clear syntax for flexbox with several variations depending on your needs. The standard library builds extensively on these foundations.

Basic syntax is straightforward. Advanced usage involves combining multiple features for powerful abstractions.

Naming conventions and code style matter. Following the community established patterns makes your code readable to other HTML/CSS developers.

Modern HTML/CSS continues to evolve, adding syntactic improvements while maintaining backwards compatibility with existing code.`,
    code: `/* Flexbox - Syntax reference */

/* Flexbox container */
.flex-container {
    display: flex;
    flex-direction: row;          /* row | column */
    justify-content: space-between; /* main axis */
    align-items: center;          /* cross axis */
    flex-wrap: wrap;              /* allow wrapping */
    gap: 1rem;                    /* space between items */
}

/* Flexbox items */
.flex-item {
    flex: 1;                /* grow:1 shrink:1 basis:0 */
    flex-grow: 2;           /* take 2x space */
    flex-shrink: 0;         /* don't shrink */
    flex-basis: 200px;      /* starting size */
    align-self: flex-end;   /* override container alignment */
    order: -1;              /* move to front */
}

/* Grid container */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

/* Grid items */
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }`,
    breakdown: `\u2022 Multiple syntax forms serve different use cases \u2014 choose based on context.\n\n\u2022 The standard library provides ready-made implementations for common patterns.\n\n\u2022 Naming conventions follow HTML/CSS community standards.\n\n\u2022 Modern HTML/CSS features reduce boilerplate while maintaining clarity.\n\n\u2022 Each syntax variant has specific trade-offs in readability vs power.`,
    summary: "HTML/CSS syntax for flexbox is expressive and type-safe. Multiple forms serve different needs from simple to complex use cases."
  },
  {
    title: "Practical examples of Flexbox",
    definition: "In real applications, flexbox creates navigation bars, card layouts, centering content, holy grail layouts, and responsive grids without media queries.",
    explanation: `Real-world HTML/CSS applications use flexbox for data processing, system design, and performance-critical code paths. These patterns appear in production codebases everywhere.

Game development, web services, and system programming all leverage these concepts extensively.

Open-source HTML/CSS projects provide excellent examples of flexbox in action. Studying them accelerates your learning.

The patterns you learn here transfer to related problems. Once you understand the principles, applying them to new situations becomes natural.`,
    code: `/* Flexbox - Practical animations */
/* Loading spinner */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
.spinner {
    width: 40px; height: 40px;
    border: 4px solid rgba(255,255,255,0.1);
    border-top-color: #64ffda;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

/* Pulse effect for notifications */
@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
}
.notification {
    animation: pulse 2s ease-in-out infinite;
}

/* Slide-in from side */
@keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
.panel {
    animation: slideIn 0.3s ease-out forwards;
}

/* Hover transitions */
.game-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.game-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0,0,0,0.4);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
}`,
    breakdown: `\u2022 Real applications combine multiple features for practical solutions.\n\n\u2022 Game and system examples show performance-conscious usage.\n\n\u2022 The pipeline/composition approach keeps code modular and testable.\n\n\u2022 Error handling is integrated throughout \u2014 not an afterthought.\n\n\u2022 These patterns scale from small scripts to large applications.`,
    summary: "Real applications demonstrate flexbox in game systems, data processing, and service design. The patterns are universal across HTML/CSS projects."
  },
  {
    title: "Flexbox best practices",
    definition: "Best practices for flexbox include using flex shorthand, avoiding fixed widths on flex items, combining with min/max-width, understanding the difference between align-items and align-content.",
    explanation: `Professional HTML/CSS code follows established conventions for flexbox that emerge from years of community experience and real-world usage.

Code review standards emphasize proper usage of these patterns. Following best practices signals professional competence.

Testing is easier when flexbox is used correctly as well-structured code is inherently more testable.

Performance and safety are balanced through careful application of these principles. Knowing when to optimize and when readability matters more is a key skill.`,
    code: `/* Flexbox - Best practices */

/* DO: Use CSS custom properties for theming */
:root {
    --color-primary: #64ffda;
    --color-bg: #1a1a2e;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --radius: 8px;
    --transition: 0.2s ease;
}

/* DO: Mobile-first responsive design */
.grid {
    display: grid;
    grid-template-columns: 1fr; /* mobile: single column */
    gap: var(--space-md);
}
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* DO: Use relative units */
.text { font-size: 1rem; }      /* relative to root */
.heading { font-size: 2.5rem; } /* scales with settings */
.container { max-width: 75ch; } /* readable line length */

/* DO: Smooth transitions on interactive elements */
.btn {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius);
    transition: background var(--transition),
                transform var(--transition);
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }

/* DON'T: Use !important (specificity issue) */
/* DON'T: Hard-code colors everywhere */
/* DON'T: Use px for font sizes */`,
    breakdown: `\u2022 Following community conventions makes code readable to other developers.\n\n\u2022 Proper error handling prevents crashes and data corruption.\n\n\u2022 Performance considerations guide implementation choices.\n\n\u2022 Testing is easier with well-structured code.\n\n\u2022 Avoid common anti-patterns that lead to bugs or performance issues.`,
    summary: "Best practices ensure code quality: using flex shorthand, avoiding fixed widths on flex items, combining with min/max-width, understanding the difference between align-items and align-content.. Following conventions makes code maintainable and professional."
  }
];
