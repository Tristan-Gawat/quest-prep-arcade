// Pre-written full lessons for Python Module: File I/O
// Each sub-lesson has: definition, explanation, code, breakdown, summary

export const pythonFileIOLessons = [
  {
    title: "What is File I/O?",
    definition: "File I/O (Input/Output) is the process of reading data from and writing data to files on disk, allowing your program to persist information beyond its execution and load external data.",
    explanation: `Every time you save a game, your progress is written to a file. Every time you load that save, the data is read back from the file. Without File I/O, everything your program creates would vanish the moment it stops running — like a dream you can't remember.

File I/O stands for File Input/Output. "Input" means reading data FROM a file into your program (loading). "Output" means writing data FROM your program into a file (saving). Together, they give your program PERSISTENCE — the ability to remember things between runs.

Python opens files in different modes that control what you can do. The mode "r" (read) lets you read but not modify. The mode "w" (write) creates a new file or ERASES an existing one and writes fresh. The mode "a" (append) adds to the END of an existing file without erasing. The mode "x" (exclusive create) creates a new file but FAILS if it already exists — useful for preventing accidental overwrites.

Think of file modes like interacting with a spell book. Read mode (r) lets you study the spells but not change them. Write mode (w) gives you a blank book to fill — if the old book existed, it's destroyed. Append mode (a) lets you add new spells to the end of an existing book. Exclusive mode (x) only works if no book with that name exists yet.

Files store data as either text (human-readable characters like "Hello World") or binary (raw bytes like images, compiled programs, or encrypted data). Most of your work will be with text files: configuration files, save data in JSON format, log files, and CSV spreadsheets.`,
    code: `# Opening a file for reading
file = open("quest_log.txt", "r")  # "r" = read mode
content = file.read()               # Read entire file
file.close()                        # Always close when done!

# File modes explained
# "r"  — Read only (file must exist)
# "w"  — Write (creates new / erases existing!)
# "a"  — Append (adds to end, creates if needed)
# "x"  — Exclusive create (fails if file exists)
# "rb" — Read binary (for images, etc.)
# "wb" — Write binary

# Writing to a file
file = open("scores.txt", "w")  # Creates or overwrites!
file.write("Player: Shadow Knight\\n")
file.write("Score: 9500\\n")
file.write("Level: 42\\n")
file.close()

# Appending to a file (doesn't erase!)
file = open("battle_log.txt", "a")
file.write("Round 1: Dealt 25 damage\\n")
file.write("Round 2: Dealt 40 damage\\n")
file.close()

# Reading what we wrote
file = open("scores.txt", "r")
print(file.read())
# Output:
# Player: Shadow Knight
# Score: 9500
# Level: 42
file.close()

# Checking if a file exists before reading
import os
if os.path.exists("savegame.json"):
    print("Save file found!")
else:
    print("No save file — new game!")`,
    breakdown: `• open("quest_log.txt", "r") — The open() function is Python's gateway to files. First argument is the filename (or full path), second is the mode. Returns a "file handle" — an object that represents the open file.

• file.read() — Reads the ENTIRE file content as one big string. For small files this is convenient, but for huge files it could use a lot of memory.

• file.close() — Releases the file handle back to the operating system. If you don't close files, you might hit system limits on open files, or data might not be fully written to disk.

• "w" mode WARNING — Write mode DESTROYS the existing file content! If scores.txt had data, it's gone now. This is the most common beginner mistake with file I/O.

• file.write("...\\n") — Writes a string to the file. The \\n adds a newline character — without it, all text would be on one line. write() doesn't add newlines automatically.

• "a" mode — Append mode is SAFE for existing data. It opens the file, moves to the end, and writes there. If the file doesn't exist, it creates a new one (same as "w").

• os.path.exists() — Checks if a file exists before trying to open it. Useful for deciding between "load save" and "new game" logic. However, the Pythonic approach often prefers try/except FileNotFoundError.`,
    summary: `File I/O lets programs persist data between executions through reading and writing files. Python's open() function takes a filename and mode: "r" for reading, "w" for writing (overwrites!), "a" for appending, "x" for exclusive creation. Always close files after use with file.close(), and remember that "w" mode erases existing content — use "a" if you want to add to a file.`
  },
  {
    title: "How File I/O works",
    definition: "File I/O operates through file handles (objects representing open files), internal buffers that batch read/write operations for efficiency, text encoding (UTF-8 by default) that maps characters to bytes, and a file pointer that tracks the current position.",
    explanation: `When you call open(), Python doesn't just give you direct access to the file on disk. It creates a FILE HANDLE — an intermediary object that manages communication between your program and the operating system's file system. Think of it like a librarian who fetches books for you — you don't go into the vault yourself.

Between your program and the physical disk sits a BUFFER — a chunk of memory that temporarily holds data. When you write, data goes to the buffer first, not directly to disk. When the buffer fills up (or you close the file), Python "flushes" it — sending everything to disk at once. This batching is much faster than writing byte-by-byte.

Text files need ENCODING — a system for converting human characters into bytes that computers can store. UTF-8 is the standard encoding that supports virtually all characters (English, Japanese, emojis, everything). When you read a file, Python decodes bytes into characters. When you write, it encodes characters into bytes. If you use the wrong encoding, you get garbled text or errors.

The FILE POINTER is like a cursor tracking your current position in the file. When you open a file in read mode, the pointer starts at position 0 (the beginning). As you read, it advances. If you read 10 characters, the pointer moves to position 10. If you call read() again, it continues from where it left off — it doesn't restart from the beginning.

You can move the file pointer manually with seek(). seek(0) rewinds to the beginning. tell() tells you the current position. This is how programs implement features like "skip to line 500" or "re-read the header." Binary files especially rely on seeking to specific positions to read structured data.`,
    code: `# File handle — the intermediary object
file = open("demo.txt", "w")
print(type(file))  # <class '_io.TextIOWrapper'>
print(file.name)   # demo.txt
print(file.mode)   # w
file.write("Line 1: The quest begins!\\n")
file.write("Line 2: A wild dragon appears!\\n")
file.write("Line 3: Victory is ours!\\n")
file.close()

# File pointer position with tell() and seek()
file = open("demo.txt", "r")
print(f"Position: {file.tell()}")  # Position: 0
first_line = file.readline()
print(f"Read: {first_line.strip()}")
print(f"Position: {file.tell()}")  # Moved forward!

# Seek back to beginning
file.seek(0)
print(f"After seek(0): {file.tell()}")  # Position: 0
all_text = file.read()  # Reads from beginning again
file.close()

# Buffering in action
file = open("buffered.txt", "w")
file.write("This is in the buffer...")
# Data hasn't hit disk yet!
file.flush()  # Force buffer to disk NOW
file.write("More data in buffer...")
file.close()  # close() also flushes automatically

# Encoding matters for international text
file = open("guild_names.txt", "w", encoding="utf-8")
file.write("Warriors Guild ⚔️\\n")
file.write("魔法使いギルド\\n")  # Japanese characters
file.write("Гильдия магов\\n")   # Russian characters
file.close()

# Reading with explicit encoding
file = open("guild_names.txt", "r", encoding="utf-8")
for line in file:
    print(line.strip())
file.close()`,
    breakdown: `• type(file) returns TextIOWrapper — This is the actual class of file handles in Python. It "wraps" the raw I/O with text encoding/decoding. For binary files, you'd get BufferedReader or BufferedWriter instead.

• file.name and file.mode — File handles carry metadata about themselves. Useful for debugging ("what file is this handle connected to?" and "can I write to it?").

• file.tell() — Returns the current byte position of the file pointer. At the start it's 0. After reading a line, it's moved forward by the number of bytes in that line.

• file.readline() — Reads ONE line (up to and including the \\n character). The file pointer advances past that line. Next readline() call gets the NEXT line.

• file.seek(0) — Moves the file pointer back to position 0 (the beginning). This lets you re-read the file without closing and reopening it. seek() works with byte offsets.

• file.flush() — Forces the internal buffer to write its contents to disk immediately. Normally Python decides when to flush (when the buffer is full, or when you close the file). Manual flushing is useful for log files where you want immediate persistence.

• encoding="utf-8" — Explicitly specifies the character encoding. UTF-8 handles virtually all characters from all languages. Without this, Python uses the system default encoding, which might not support special characters.

• for line in file: — Files are ITERABLE! You can loop over them line by line. This is memory-efficient because it only loads one line at a time, unlike read() which loads everything.`,
    summary: `File I/O works through file handles (TextIOWrapper objects) that manage buffered communication with the OS. Data is buffered in memory before being flushed to disk for efficiency. The file pointer tracks your current read/write position — use tell() to check it and seek() to move it. Always specify encoding="utf-8" for text files to ensure proper handling of international characters and symbols.`
  },
  {
    title: "File I/O syntax & usage",
    definition: "Python provides multiple approaches to file I/O: the 'with' statement for automatic cleanup, read()/readline()/readlines() for input, write()/writelines() for output, and specialized modules like csv, json, and pathlib for structured data and path handling.",
    explanation: `The 'with' statement (context manager) is the CORRECT way to work with files in Python. It automatically closes the file when you're done — even if an exception occurs inside the block. Writing 'with open(...) as f:' is equivalent to try/finally with a close(), but much cleaner.

For reading, you have three main methods. read() loads the entire file as a single string. readline() reads one line at a time (including the newline character). readlines() loads ALL lines as a list of strings. Each is useful in different situations: read() for small files you need entirely, readline() for processing line-by-line with custom logic, readlines() when you want list operations on lines.

For writing, write() outputs a single string (no automatic newline), and writelines() outputs a list of strings (also no automatic newlines — you must include \\n yourself). The difference is just convenience: writelines(["a\\n", "b\\n"]) equals write("a\\n") then write("b\\n").

The json module is essential for structured data. json.dump() writes Python dictionaries and lists directly to files as JSON format. json.load() reads JSON files back into Python objects. This is the standard way to save game state, configuration, and any structured data.

The pathlib module (Python 3.4+) provides an object-oriented way to handle file paths. Path objects work across Windows, Mac, and Linux without worrying about slashes. They also have convenient methods like .read_text(), .write_text(), .exists(), and .mkdir() that simplify common operations.`,
    code: `# The 'with' statement — ALWAYS use this!
with open("inventory.txt", "w") as f:
    f.write("Iron Sword\\n")
    f.write("Health Potion x3\\n")
    f.write("Dragon Scale\\n")
# File is auto-closed here — even if an error occurred!

# Reading methods comparison
with open("inventory.txt", "r") as f:
    # read() — entire file as one string
    content = f.read()
    print(content)

with open("inventory.txt", "r") as f:
    # readline() — one line at a time
    first = f.readline().strip()   # "Iron Sword"
    second = f.readline().strip()  # "Health Potion x3"

with open("inventory.txt", "r") as f:
    # readlines() — all lines as a list
    lines = f.readlines()  # ["Iron Sword\\n", ...]
    print(f"Items: {len(lines)}")

# JSON module for structured data
import json

player_data = {
    "name": "Shadow Knight",
    "level": 42,
    "hp": 850,
    "inventory": ["Excalibur", "Shield of Ages"],
    "quests_complete": True
}

# Save to JSON file
with open("save.json", "w") as f:
    json.dump(player_data, f, indent=2)

# Load from JSON file
with open("save.json", "r") as f:
    loaded = json.load(f)
print(f"Welcome back, {loaded['name']}!")

# Pathlib — modern path handling
from pathlib import Path

save_dir = Path("saves")
save_dir.mkdir(exist_ok=True)  # Create dir if needed
save_path = save_dir / "slot1.json"  # Path joining with /

save_path.write_text(json.dumps(player_data, indent=2))
data = json.loads(save_path.read_text())`,
    breakdown: `• with open(...) as f: — The 'with' statement guarantees the file is closed when the block ends. No need for try/finally or manual close(). This is the #1 best practice for file I/O in Python.

• f.read() — Returns the ENTIRE file as one string, including all newline characters. Best for small files where you need the whole content at once.

• f.readline().strip() — Reads one line. strip() removes the trailing \\n character (and any whitespace). Without strip(), you'd have "Iron Sword\\n" instead of "Iron Sword".

• f.readlines() — Returns a LIST where each element is one line (including \\n). Useful when you want to index specific lines or get the line count with len().

• json.dump(player_data, f, indent=2) — Writes the dictionary to the file as formatted JSON. The indent=2 makes it human-readable with 2-space indentation. Without indent, it's all on one line.

• json.load(f) — Reads JSON from file and converts it back to Python objects. Dictionaries become dicts, arrays become lists, strings stay strings, numbers become int/float.

• Path("saves") — Creates a Path object. Works on all operating systems — no need to worry about / vs \\\\ for directory separators.

• save_dir / "slot1.json" — The / operator joins paths! This creates Path("saves/slot1.json"). Much cleaner than os.path.join("saves", "slot1.json").

• save_path.write_text(...) — Pathlib's convenient method to write a string to a file in one call. Equivalent to open/write/close but more concise.`,
    summary: `Always use 'with open(...) as f:' for automatic file closing. Choose read() for entire files, readline() for line-by-line processing, readlines() for a list of lines. Use the json module for structured data: dump() to save Python objects as JSON, load() to read them back. The pathlib module provides modern, cross-platform path handling with the / operator for joining and convenient .read_text()/.write_text() methods.`
  },
  {
    title: "Practical examples of File I/O",
    definition: "Real-world file I/O applications include JSON-based save game systems, persistent high score tables, configuration file loaders, and timestamped log file writers that record game events and player actions.",
    explanation: `File I/O is the backbone of any game or application that needs to remember things. Without it, every program starts from scratch each time it runs. Let's look at four real patterns you'll use constantly in game development and beyond.

A JSON save game system is the most common pattern. You represent the entire game state as a Python dictionary — player stats, inventory, quest progress, world state — and serialize it to a JSON file. Loading reverses the process: read JSON, parse it back to a dictionary, and restore the game state.

High score tables need to persist across game sessions and handle multiple entries sorted by score. The file serves as a simple database: read all scores, add the new one, sort them, keep only the top N, and write them back. This read-modify-write pattern is fundamental to file I/O.

Configuration files separate settings from code. Instead of hardcoding difficulty, volume, key bindings, or screen resolution, you load them from a file. This lets users customize without modifying source code, and lets you ship different configs for different platforms.

Log files record events chronologically using append mode. Each entry gets a timestamp, making it easy to trace what happened and when. Logs are invaluable for debugging — when a player reports a bug, the log tells you exactly what sequence of events led to the problem.`,
    code: `# === EXAMPLE 1: JSON Save Game System ===
import json
from datetime import datetime

def save_game(player, slot=1):
    """Save full game state to a JSON file."""
    save_data = {
        "player_name": player["name"],
        "level": player["level"],
        "hp": player["hp"],
        "max_hp": player["max_hp"],
        "gold": player["gold"],
        "inventory": player["inventory"],
        "timestamp": datetime.now().isoformat()
    }
    filename = f"save_slot_{slot}.json"
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(save_data, f, indent=2)
    print(f"Game saved to {filename}!")

def load_game(slot=1):
    """Load game state from JSON file."""
    filename = f"save_slot_{slot}.json"
    try:
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"Welcome back, {data['player_name']}!")
        return data
    except FileNotFoundError:
        print("No save file found!")
        return None

# === EXAMPLE 2: High Score File ===
def add_high_score(name, score, max_entries=10):
    """Add score to leaderboard, keep top N."""
    filepath = "high_scores.json"
    # Load existing scores
    try:
        with open(filepath, "r") as f:
            scores = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        scores = []
    # Add new score and sort
    scores.append({"name": name, "score": score})
    scores.sort(key=lambda x: x["score"], reverse=True)
    scores = scores[:max_entries]  # Keep top N only
    # Save back
    with open(filepath, "w") as f:
        json.dump(scores, f, indent=2)
    return scores

# === EXAMPLE 3: Config Loader ===
def load_config(path="game_config.json"):
    """Load config with defaults for missing keys."""
    defaults = {
        "difficulty": "normal",
        "volume": 0.8,
        "fullscreen": False,
        "keybinds": {"attack": "space", "jump": "w"}
    }
    try:
        with open(path, "r") as f:
            user_config = json.load(f)
        # Merge: user settings override defaults
        defaults.update(user_config)
    except FileNotFoundError:
        # First run — create default config file
        with open(path, "w") as f:
            json.dump(defaults, f, indent=2)
    return defaults

# === EXAMPLE 4: Log File Writer ===
def log_event(event_type, message):
    """Append timestamped event to log file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] [{event_type}] {message}\\n"
    with open("game_log.txt", "a", encoding="utf-8") as f:
        f.write(entry)`,
    breakdown: `• datetime.now().isoformat() — Creates a timestamp string like "2024-03-15T14:30:00" that's both human-readable and machine-parseable. Stored in the save file so players know when they saved.

• json.dump(save_data, f, indent=2) — Writes the entire player dictionary as formatted JSON. The indent makes the file human-readable if someone opens it in a text editor.

• except (FileNotFoundError, json.JSONDecodeError) — Handles both "file doesn't exist" (first play) and "file is corrupted" (invalid JSON). Both cases start with an empty scores list.

• scores.sort(key=lambda x: x["score"], reverse=True) — Sorts the score list by the "score" field in descending order. Lambda provides the sort key — which field to sort by.

• scores[:max_entries] — Slice to keep only the top N scores. This prevents the file from growing forever. After sorting, the highest scores are first, so slicing from the front keeps the best.

• defaults.update(user_config) — Dictionary merge: user settings OVERRIDE matching defaults, but missing keys keep their default values. This pattern ensures the game always has valid config.

• open("game_log.txt", "a") — Append mode! Each log_event call ADDS to the file without erasing previous entries. This is critical for logs — you never want to lose earlier entries.

• strftime("%Y-%m-%d %H:%M:%S") — Formats the datetime as a clean, sortable string. The format makes logs easy to search by date and time.`,
    summary: `Real-world file I/O patterns include: JSON save systems (dump/load full game state), high score tables (read-modify-write with sorting), config loaders (merge user settings with defaults), and log writers (append mode with timestamps). These patterns combine error handling for missing/corrupt files, JSON for structured data, and appropriate file modes (w for saves, a for logs) to build robust persistent systems.`
  },
  {
    title: "File I/O best practices",
    definition: "Professional file I/O follows key principles: always use the 'with' statement for automatic cleanup, handle FileNotFoundError gracefully, use pathlib for cross-platform path handling, and always specify encoding='utf-8' for text files.",
    explanation: `The 'with' statement isn't just a convenience — it's a SAFETY mechanism. If an exception occurs while writing, a regular open/close pattern might never reach the close() call, leaving the file corrupted or locked. The 'with' statement guarantees closure even when exceptions occur, making it the non-negotiable standard for file operations.

Always handle FileNotFoundError explicitly. Files can be missing for many valid reasons: first run (no save yet), user deleted it, different installation path, or wrong working directory. Your program should handle this gracefully — offer defaults, create the file, or inform the user — never crash with an ugly traceback.

The pathlib module should be your default for all path operations. String concatenation for paths ("folder/" + "file.txt") breaks on Windows (which uses backslashes). os.path.join works but is verbose. Pathlib's / operator (Path("folder") / "file.txt") is clean, readable, and handles platform differences automatically.

Always specify encoding='utf-8' when opening text files. Without it, Python uses your system's default encoding, which varies between operating systems. Code that works on your machine might produce garbled text on someone else's. UTF-8 is the universal standard that handles all characters and should always be used explicitly.

Atomic writes prevent data corruption during saves. Instead of writing directly to "save.json" (which could be corrupted if the program crashes mid-write), write to a temporary file first, then rename it to the final name. The rename operation is atomic on most systems — it either fully completes or doesn't happen at all, so you never get a half-written save file.`,
    code: `# ALWAYS use 'with' — never manual open/close!
# BAD — file stays open if error occurs:
# f = open("data.txt", "w")
# f.write(data)  # If this crashes, file never closes!
# f.close()

# GOOD — guaranteed close even on errors:
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Safe and sound!\\n")

# Handle missing files gracefully
from pathlib import Path
import json

def safe_load(filepath):
    """Load JSON with graceful missing-file handling."""
    path = Path(filepath)
    if not path.exists():
        print(f"Creating new file: {filepath}")
        path.write_text("{}", encoding="utf-8")
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        print(f"Warning: {filepath} corrupted, resetting.")
        return {}

# Use pathlib for ALL path operations
from pathlib import Path

game_dir = Path.home() / "MyGame"       # ~/MyGame
game_dir.mkdir(parents=True, exist_ok=True)
save_dir = game_dir / "saves"
save_dir.mkdir(exist_ok=True)
config_path = game_dir / "config.json"

# Cross-platform path operations
print(save_dir.exists())      # True/False
print(save_dir.is_dir())      # True
print(config_path.suffix)     # .json
print(config_path.stem)       # config

# List all save files
for save_file in save_dir.glob("*.json"):
    print(f"Found save: {save_file.name}")

# Atomic write — prevent corruption
import tempfile
import os

def atomic_save(filepath, data):
    """Write to temp file, then rename (atomic)."""
    filepath = Path(filepath)
    # Write to temporary file in same directory
    temp_fd, temp_path = tempfile.mkstemp(
        dir=filepath.parent, suffix=".tmp"
    )
    try:
        with os.fdopen(temp_fd, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        # Atomic rename — can't be half-done
        Path(temp_path).replace(filepath)
    except Exception:
        Path(temp_path).unlink(missing_ok=True)  # Clean up
        raise  # Re-raise the exception`,
    breakdown: `• with open(...) as f: — ALWAYS use this pattern. The file is closed when the block ends — even if an exception is raised inside. This prevents file handle leaks and data corruption.

• encoding="utf-8" — Explicitly declare UTF-8 encoding every time you open a text file. This ensures consistent behavior across Windows, Mac, and Linux. Without it, Windows defaults to cp1252 which can't handle many characters.

• Path(filepath) — Convert string paths to Path objects immediately. From there, use Path methods for everything. Path objects are more readable and handle platform differences automatically.

• path.write_text("{}", encoding="utf-8") — Pathlib's convenience method: opens, writes, and closes in one call. Perfect for simple operations. The encoding parameter works just like in open().

• mkdir(parents=True, exist_ok=True) — Creates the directory AND all parent directories if needed. exist_ok=True means "don't error if it already exists." Without these flags, missing parents or existing dirs cause exceptions.

• save_dir.glob("*.json") — Finds all files matching the pattern in that directory. Returns an iterator of Path objects. Great for finding all save files, config files, or assets.

• tempfile.mkstemp() — Creates a temporary file in the specified directory. Returns a file descriptor and path. Writing to a temp file first means the original save is never in a half-written state.

• Path(temp_path).replace(filepath) — Atomic rename: the file is either fully the old version or fully the new version, never a corrupted mix. This is the professional standard for save systems.

• unlink(missing_ok=True) — Deletes the temp file if something went wrong. missing_ok=True prevents an error if the file was already cleaned up.`,
    summary: `Always use 'with' statements for guaranteed file cleanup, and specify encoding='utf-8' on every text file operation. Use pathlib for all path handling — it's cross-platform, readable, and provides convenient methods like .read_text(), .glob(), and .mkdir(). For critical data like save files, use atomic writes (write to temp file, then rename) to prevent corruption from mid-write crashes. Handle FileNotFoundError gracefully with defaults or file creation rather than letting the program crash.`
  }
];
