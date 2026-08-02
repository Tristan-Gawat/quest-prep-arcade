import { Module } from "./curriculum";

export const sqlModules: Module[] = [
  {
    id: "sql-select",
    title: "SELECT Basics",
    tier: "EASY",
    lesson: {
      title: "SELECT Basics",
      concept: "SELECT retrieves data from tables — the most fundamental SQL operation.",
      explanation:
        "SELECT specifies which columns to retrieve. FROM identifies the table. Use * for all columns (avoid in production). DISTINCT removes duplicates. AS creates column aliases. LIMIT restricts row count. ORDER BY sorts results (ASC/DESC). Always end statements with a semicolon.",
      codeExample: `-- Select specific columns
SELECT name, level, score
FROM players
ORDER BY score DESC
LIMIT 10;

-- All columns (use sparingly!)
SELECT * FROM items;

-- Aliases and DISTINCT
SELECT DISTINCT
  class AS player_class,
  COUNT(*) AS total
FROM players
GROUP BY class;

-- Expressions in SELECT
SELECT
  name,
  hp * 2 AS double_hp,
  UPPER(guild) AS guild_name
FROM heroes;`,
      language: "sql",
    },
    quiz: [
      { question: "What does SELECT * do?", choices: ["Selects one column", "Retrieves all columns from a table", "Creates a table", "Deletes rows"], correct: 1, explanation: "SELECT * returns every column — convenient for exploring but inefficient in production." },
      { question: "What does ORDER BY score DESC do?", choices: ["Sorts ascending", "Sorts by score from highest to lowest", "Filters by score", "Groups by score"], correct: 1, explanation: "DESC sorts in descending order (highest first). ASC (default) sorts lowest first." },
      { question: "What does LIMIT 5 do?", choices: ["Limits column count", "Returns at most 5 rows", "Sets max value to 5", "Creates 5 copies"], correct: 1, explanation: "LIMIT restricts the number of rows returned — essential for pagination and performance." },
    ],
        subLessons: ["What is SELECT Basics?","How SELECT Basics works","SELECT Basics syntax & usage","Practical examples of SELECT Basics","SELECT Basics best practices"],
challenge: {
      title: "Top Players Query",
      description: "Write a query to select the name and score columns from the 'players' table, ordered by score descending, limited to the top 3 results.",
      starterCode: "-- Select top 3 players by score\n",
      expectedOutput: "name | score\nDragon | 9500\nShadow | 8200\nBlaze | 7800",
      hints: ["Start with SELECT name, score", "Use FROM players", "Add ORDER BY score DESC LIMIT 3"],
      solution: `SELECT name, score\nFROM players\nORDER BY score DESC\nLIMIT 3;`,
      language: "sql",
    },
  },
  {
    id: "sql-where",
    title: "WHERE & Filtering",
    tier: "EASY",
    lesson: {
      title: "WHERE & Filtering",
      concept: "WHERE filters rows based on conditions — only matching rows are returned.",
      explanation:
        "WHERE comes after FROM and uses comparison operators (=, !=, <, >, <=, >=). Combine conditions with AND, OR, NOT. Use BETWEEN for ranges, IN for sets, LIKE for patterns (% = any chars, _ = one char). IS NULL checks for missing values. WHERE filters before GROUP BY.",
      codeExample: `-- Basic comparisons
SELECT name, level FROM players
WHERE level >= 10;

-- Multiple conditions
SELECT * FROM items
WHERE rarity = 'legendary'
  AND level_req <= 50
  AND price BETWEEN 100 AND 500;

-- IN for sets
SELECT * FROM monsters
WHERE zone IN ('Forest', 'Cave', 'Mountain');

-- LIKE for patterns
SELECT name FROM guilds
WHERE name LIKE 'Dragon%';  -- starts with Dragon

-- NULL handling
SELECT * FROM quests
WHERE completed_at IS NULL;  -- incomplete quests`,
      language: "sql",
    },
    quiz: [
      { question: "How do you check for NULL values?", choices: ["= NULL", "IS NULL", "== NULL", "EQUALS NULL"], correct: 1, explanation: "NULL isn't a value — you must use IS NULL or IS NOT NULL. Comparison operators don't work with NULL." },
      { question: "What does LIKE 'A%' match?", choices: ["Exactly 'A'", "Any string starting with 'A'", "Strings containing 'A'", "Single character 'A'"], correct: 1, explanation: "% matches zero or more characters. 'A%' matches 'A', 'Arcade', 'Adventure', etc." },
      { question: "What's the difference between AND and OR?", choices: ["No difference", "AND requires all conditions true, OR requires at least one", "AND is faster", "OR is for numbers only"], correct: 1, explanation: "AND narrows results (all must pass); OR broadens results (any can pass)." },
    ],
        subLessons: ["What is WHERE & Filtering?","How WHERE & Filtering works","WHERE & Filtering syntax & usage","Practical examples of WHERE & Filtering","WHERE & Filtering best practices"],
challenge: {
      title: "Elite Monster Filter",
      description: "Write a query to find all monsters from the 'monsters' table where level is greater than 20 AND zone is either 'Dungeon' or 'Boss Room'. Select name and level.",
      starterCode: "-- Find high-level dungeon monsters\n",
      expectedOutput: "name | level\nDemon Lord | 45\nDark Knight | 30\nDragon | 50",
      hints: ["Use WHERE level > 20", "Combine with AND for the zone condition", "Use IN ('Dungeon', 'Boss Room') for multiple values"],
      solution: `SELECT name, level\nFROM monsters\nWHERE level > 20\n  AND zone IN ('Dungeon', 'Boss Room');`,
      language: "sql",
    },
  },
  {
    id: "sql-joins",
    title: "JOINs",
    tier: "MEDIUM",
    lesson: {
      title: "JOINs",
      concept: "JOINs combine rows from multiple tables based on related columns.",
      explanation:
        "INNER JOIN returns matching rows in both tables. LEFT JOIN returns all rows from the left table plus matches (NULL if no match). RIGHT JOIN is the opposite. FULL OUTER JOIN returns all rows from both. Join on foreign key relationships. Use table aliases for readability. Self-joins relate a table to itself.",
      codeExample: `-- INNER JOIN: players with their guild info
SELECT p.name, p.level, g.guild_name, g.rank
FROM players p
INNER JOIN guild_members g ON p.id = g.player_id;

-- LEFT JOIN: all players, even without a guild
SELECT p.name, COALESCE(g.guild_name, 'No Guild') AS guild
FROM players p
LEFT JOIN guild_members g ON p.id = g.player_id;

-- Multiple joins: player inventory with item details
SELECT p.name, i.item_name, i.rarity, inv.quantity
FROM players p
JOIN inventory inv ON p.id = inv.player_id
JOIN items i ON inv.item_id = i.id
WHERE i.rarity = 'epic';

-- Self-join: find players in same zone
SELECT a.name AS player1, b.name AS player2, a.zone
FROM players a
JOIN players b ON a.zone = b.zone AND a.id < b.id;`,
      language: "sql",
    },
    quiz: [
      { question: "What does INNER JOIN return?", choices: ["All rows from both tables", "Only rows that match in both tables", "All from left table", "All from right table"], correct: 1, explanation: "INNER JOIN returns only rows where the join condition matches in both tables." },
      { question: "What appears in a LEFT JOIN when there's no match?", choices: ["Error", "NULL values for the right table columns", "Empty string", "Zero"], correct: 1, explanation: "LEFT JOIN keeps all left table rows — unmatched right columns are filled with NULL." },
      { question: "What is a self-join?", choices: ["A join without ON", "Joining a table to itself", "An automatic join", "A cross join"], correct: 1, explanation: "Self-joins relate rows within the same table — use aliases to treat it as two different tables." },
    ],
        subLessons: ["What is JOINs?","How JOINs works","JOINs syntax & usage","Practical examples of JOINs","JOINs best practices"],
challenge: {
      title: "Party Roster Join",
      description: "Write a query joining 'players' and 'classes' tables on players.class_id = classes.id. Select player name and class_name. Use INNER JOIN.",
      starterCode: "-- Join players with their class names\n",
      expectedOutput: "name | class_name\nArthur | Warrior\nMerlin | Mage\nRobin | Ranger",
      hints: ["Use INNER JOIN classes ON players.class_id = classes.id", "Select players.name and classes.class_name", "Table aliases make it shorter: FROM players p JOIN classes c"],
      solution: `SELECT p.name, c.class_name\nFROM players p\nINNER JOIN classes c ON p.class_id = c.id;`,
      language: "sql",
    },
  },
  {
    id: "sql-groupby",
    title: "GROUP BY & Aggregates",
    tier: "MEDIUM",
    lesson: {
      title: "GROUP BY & Aggregates",
      concept: "GROUP BY collapses rows into groups; aggregate functions compute values across each group.",
      explanation:
        "Aggregate functions: COUNT, SUM, AVG, MIN, MAX work on sets of rows. GROUP BY creates groups — each unique combination gets one output row. HAVING filters groups (like WHERE but for groups). Every selected column must be either aggregated or in the GROUP BY. Execution order: WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.",
      codeExample: `-- Count players per guild
SELECT guild, COUNT(*) AS member_count
FROM players
GROUP BY guild
ORDER BY member_count DESC;

-- Average level by class
SELECT class, AVG(level) AS avg_level, MAX(level) AS max_level
FROM players
GROUP BY class
HAVING AVG(level) > 10;

-- Sum of damage by weapon type
SELECT weapon_type,
  SUM(damage) AS total_damage,
  COUNT(*) AS weapon_count
FROM weapons
GROUP BY weapon_type
HAVING COUNT(*) >= 3;

-- Multiple grouping
SELECT zone, class, COUNT(*) AS count
FROM players
GROUP BY zone, class
ORDER BY zone, count DESC;`,
      language: "sql",
    },
    quiz: [
      { question: "What's the difference between WHERE and HAVING?", choices: ["No difference", "WHERE filters rows before grouping, HAVING filters groups after", "HAVING is faster", "WHERE works with aggregates"], correct: 1, explanation: "WHERE filters individual rows before GROUP BY; HAVING filters aggregated groups after." },
      { question: "Can you use a column in SELECT that's not in GROUP BY?", choices: ["Yes always", "No — it must be aggregated or in GROUP BY", "Only with DISTINCT", "Only with ORDER BY"], correct: 1, explanation: "Non-aggregated columns must be in GROUP BY — otherwise which row's value would the DB pick?" },
      { question: "What does COUNT(*) count?", choices: ["Only non-null values", "All rows including nulls", "Distinct values", "Columns"], correct: 1, explanation: "COUNT(*) counts all rows. COUNT(column) counts non-null values. COUNT(DISTINCT col) counts unique values." },
    ],
        subLessons: ["What is GROUP BY & Aggregates?","How GROUP BY & Aggregates works","GROUP BY & Aggregates syntax & usage","Practical examples of GROUP BY & Aggregates","GROUP BY & Aggregates best practices"],
challenge: {
      title: "Guild Leaderboard",
      description: "Write a query that counts players per guild from the 'players' table, only showing guilds with more than 2 members, ordered by count descending.",
      starterCode: "-- Count players per guild, filter small guilds\n",
      expectedOutput: "guild | member_count\nDragon Slayers | 8\nShadow Guild | 5\nIron Legion | 3",
      hints: ["GROUP BY guild to create groups", "Use HAVING COUNT(*) > 2 to filter small guilds", "ORDER BY member_count DESC for ranking"],
      solution: `SELECT guild, COUNT(*) AS member_count\nFROM players\nGROUP BY guild\nHAVING COUNT(*) > 2\nORDER BY member_count DESC;`,
      language: "sql",
    },
  },
  {
    id: "sql-subqueries",
    title: "Subqueries & CTEs",
    tier: "HARD",
    lesson: {
      title: "Subqueries & CTEs",
      concept: "Subqueries nest queries inside queries; CTEs create named temporary result sets for clarity.",
      explanation:
        "Subqueries can appear in SELECT (scalar), FROM (derived table), or WHERE (filtering). Correlated subqueries reference the outer query — run once per row. CTEs (WITH clause) name temporary results for readability. EXISTS checks if a subquery returns rows. CTEs can be recursive for hierarchical data.",
      codeExample: `-- Subquery in WHERE: players above average level
SELECT name, level
FROM players
WHERE level > (SELECT AVG(level) FROM players);

-- Subquery in FROM (derived table)
SELECT avg_stats.class, avg_stats.avg_level
FROM (
  SELECT class, AVG(level) AS avg_level
  FROM players
  GROUP BY class
) AS avg_stats
WHERE avg_stats.avg_level > 20;

-- CTE: readable alternative
WITH guild_stats AS (
  SELECT guild,
    COUNT(*) AS members,
    AVG(level) AS avg_level
  FROM players
  GROUP BY guild
)
SELECT guild, members, avg_level
FROM guild_stats
WHERE members >= 5
ORDER BY avg_level DESC;

-- EXISTS: players who completed any quest
SELECT p.name FROM players p
WHERE EXISTS (
  SELECT 1 FROM quests q
  WHERE q.player_id = p.id AND q.status = 'completed'
);`,
      language: "sql",
    },
    quiz: [
      { question: "What is a correlated subquery?", choices: ["A cached subquery", "A subquery that references columns from the outer query", "A subquery in SELECT", "A recursive query"], correct: 1, explanation: "Correlated subqueries reference the outer query — they re-execute for each outer row." },
      { question: "What does a CTE (WITH clause) provide?", choices: ["Permanent table", "A named temporary result set for readability", "Performance boost always", "Index creation"], correct: 1, explanation: "CTEs name a query result, making complex queries more readable — like a temporary view." },
      { question: "What does EXISTS check?", choices: ["If table exists", "If the subquery returns at least one row", "If column is not null", "If value equals true"], correct: 1, explanation: "EXISTS returns true if the subquery produces any rows — efficient for existence checks." },
    ],
        subLessons: ["What is Subqueries & CTEs?","How Subqueries & CTEs works","Subqueries & CTEs syntax & usage","Practical examples of Subqueries & CTEs","Subqueries & CTEs best practices"],
challenge: {
      title: "Above Average Heroes",
      description: "Write a query using a subquery to find all players whose score is above the average score. Select name and score, ordered by score descending.",
      starterCode: "-- Find players above average score\n",
      expectedOutput: "name | score\nDragon | 9500\nShadow | 8200\nBlaze | 7800",
      hints: ["Use a subquery: WHERE score > (SELECT AVG(score) FROM players)", "The subquery calculates the average for comparison", "ORDER BY score DESC for ranking"],
      solution: `SELECT name, score\nFROM players\nWHERE score > (SELECT AVG(score) FROM players)\nORDER BY score DESC;`,
      language: "sql",
    },
  },
  {
    id: "sql-indexes",
    title: "Indexes & Performance",
    tier: "HARD",
    lesson: {
      title: "Indexes & Performance",
      concept: "Indexes speed up queries dramatically — but choose wisely as they slow down writes.",
      explanation:
        "Indexes create sorted data structures (B-trees) for fast lookups. Create on columns used in WHERE, JOIN, ORDER BY. Composite indexes cover multiple columns (leftmost prefix rule). UNIQUE indexes enforce constraints. EXPLAIN shows query execution plans. Too many indexes slow INSERT/UPDATE. Covering indexes include all queried columns.",
      codeExample: `-- Create an index on frequently filtered column
CREATE INDEX idx_players_level ON players(level);

-- Composite index (order matters!)
CREATE INDEX idx_players_guild_level
ON players(guild, level);
-- Works for: WHERE guild = 'X'
-- Works for: WHERE guild = 'X' AND level > 10
-- Does NOT help: WHERE level > 10 (skips leftmost)

-- Unique index (also a constraint)
CREATE UNIQUE INDEX idx_players_email
ON players(email);

-- Check execution plan
EXPLAIN SELECT name FROM players WHERE level > 50;

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_players
ON players(name) WHERE is_active = true;

-- Drop index when no longer needed
DROP INDEX idx_players_level;`,
      language: "sql",
    },
    quiz: [
      { question: "What's the tradeoff of adding indexes?", choices: ["No tradeoff", "Faster reads but slower writes (INSERT/UPDATE/DELETE)", "Faster writes", "More disk only"], correct: 1, explanation: "Indexes speed up SELECT but slow down modifications — the index must be updated on every write." },
      { question: "What is the leftmost prefix rule for composite indexes?", choices: ["Index on last column", "The index can serve queries that use columns from the left", "Always use all columns", "Right columns are faster"], correct: 1, explanation: "A composite index on (A, B, C) helps queries filtering on A, (A,B), or (A,B,C) — not B alone." },
      { question: "What does EXPLAIN show?", choices: ["Table structure", "The query execution plan — how the DB will run the query", "Index definitions", "Row count"], correct: 1, explanation: "EXPLAIN reveals whether indexes are used, join order, and estimated costs — essential for optimization." },
    ],
        subLessons: ["What is Indexes & Performance?","How Indexes & Performance works","Indexes & Performance syntax & usage","Practical examples of Indexes & Performance","Indexes & Performance best practices"],
challenge: {
      title: "Optimize the Quest Log",
      description: "Write SQL to: 1) Create an index on the 'quests' table for the 'player_id' column (often used in JOINs). 2) Create a composite index on 'quests' for (status, created_at) for filtering active quests by date.",
      starterCode: "-- Create index for player_id JOINs\n\n-- Create composite index for status + date filtering\n",
      expectedOutput: "Index idx_quests_player_id created\nIndex idx_quests_status_date created",
      hints: ["CREATE INDEX idx_name ON table(column);", "Composite: ON quests(status, created_at)", "Name indexes descriptively: idx_table_columns"],
      solution: `CREATE INDEX idx_quests_player_id ON quests(player_id);\n\nCREATE INDEX idx_quests_status_date ON quests(status, created_at);`,
      language: "sql",
    },
  },
];
