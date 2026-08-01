// Syntax highlighting engine
// Colors: keywords (pink), built-in functions like print/int/input (cyan),
// strings with proper open/close detection (green when complete, normal when incomplete),
// numbers (yellow), comments (gray), functions (purple), types (blue)

interface Token {
  text: string;
  type: "keyword" | "builtin" | "string" | "string-incomplete" | "number" | "comment" | "function" | "operator" | "type" | "property" | "tag" | "attr" | "punctuation" | "plain";
}

// Language-specific keyword/builtin definitions
const languageDefs: Record<string, { keywords: string[]; builtins: string[]; types: string[]; commentSingle: string; commentMultiStart?: string; commentMultiEnd?: string }> = {
  python: {
    keywords: ["def", "class", "if", "elif", "else", "for", "while", "return", "import", "from", "as", "try", "except", "finally", "raise", "with", "yield", "lambda", "pass", "break", "continue", "and", "or", "not", "is", "in", "True", "False", "None", "async", "await", "global", "nonlocal", "del", "assert"],
    builtins: ["print", "input", "int", "float", "str", "bool", "list", "dict", "set", "tuple", "len", "range", "enumerate", "zip", "map", "filter", "sorted", "reversed", "type", "isinstance", "hasattr", "getattr", "setattr", "open", "super", "property", "staticmethod", "classmethod", "abs", "max", "min", "sum", "round", "format"],
    types: ["int", "float", "str", "bool", "list", "dict", "set", "tuple", "bytes", "object", "type"],
    commentSingle: "#",
  },
  javascript: {
    keywords: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "class", "extends", "new", "this", "super", "import", "export", "from", "default", "try", "catch", "finally", "throw", "async", "await", "yield", "of", "in", "typeof", "instanceof", "delete", "void", "true", "false", "null", "undefined"],
    builtins: ["console", "log", "Math", "JSON", "parseInt", "parseFloat", "setTimeout", "setInterval", "clearTimeout", "clearInterval", "fetch", "Promise", "Array", "Object", "String", "Number", "Boolean", "Symbol", "Map", "Set", "WeakMap", "WeakSet", "Date", "RegExp", "Error", "isNaN", "isFinite", "alert", "document", "window"],
    types: ["string", "number", "boolean", "object", "symbol", "bigint", "any", "void", "never", "unknown"],
    commentSingle: "//",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  typescript: {
    keywords: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "class", "extends", "implements", "new", "this", "super", "import", "export", "from", "default", "try", "catch", "finally", "throw", "async", "await", "yield", "of", "in", "typeof", "instanceof", "delete", "void", "true", "false", "null", "undefined", "interface", "type", "enum", "namespace", "module", "declare", "abstract", "readonly", "keyof", "infer", "extends", "as", "is", "satisfies"],
    builtins: ["console", "log", "Math", "JSON", "parseInt", "parseFloat", "setTimeout", "setInterval", "fetch", "Promise", "Array", "Object", "String", "Number", "Boolean", "Symbol", "Map", "Set", "Record", "Partial", "Required", "Pick", "Omit", "Readonly", "ReturnType", "Parameters", "Exclude", "Extract"],
    types: ["string", "number", "boolean", "object", "symbol", "bigint", "any", "void", "never", "unknown", "undefined", "null"],
    commentSingle: "//",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  java: {
    keywords: ["public", "private", "protected", "static", "final", "abstract", "class", "interface", "extends", "implements", "new", "this", "super", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "try", "catch", "finally", "throw", "throws", "import", "package", "void", "true", "false", "null", "instanceof", "synchronized", "volatile", "transient", "native", "enum", "default", "assert", "record", "sealed", "permits", "var", "yield"],
    builtins: ["System", "out", "println", "printf", "String", "Integer", "Double", "Boolean", "Arrays", "Collections", "List", "ArrayList", "HashMap", "HashSet", "Map", "Set", "Optional", "Stream", "Collectors", "Math", "Object", "Override"],
    types: ["int", "long", "short", "byte", "float", "double", "char", "boolean", "void", "String", "Integer", "Long", "Double", "Float", "Boolean", "Character", "Object"],
    commentSingle: "//",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  cpp: {
    keywords: ["include", "using", "namespace", "class", "struct", "public", "private", "protected", "virtual", "override", "const", "static", "template", "typename", "auto", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "new", "delete", "throw", "try", "catch", "nullptr", "true", "false", "this", "friend", "operator", "typedef", "enum", "union", "volatile", "extern", "inline", "constexpr", "noexcept", "explicit", "mutable", "sizeof", "decltype", "concept", "requires", "co_await", "co_yield", "co_return"],
    builtins: ["cout", "cin", "endl", "cerr", "printf", "scanf", "malloc", "free", "sizeof", "std", "string", "vector", "map", "set", "unordered_map", "unordered_set", "array", "deque", "queue", "stack", "pair", "tuple", "sort", "find", "begin", "end", "push_back", "emplace_back", "size", "empty", "make_unique", "make_shared", "unique_ptr", "shared_ptr", "move"],
    types: ["int", "long", "short", "char", "float", "double", "bool", "void", "size_t", "string", "wstring", "auto"],
    commentSingle: "//",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  rust: {
    keywords: ["fn", "let", "mut", "const", "static", "struct", "enum", "impl", "trait", "type", "use", "mod", "pub", "crate", "self", "super", "where", "as", "if", "else", "match", "for", "while", "loop", "break", "continue", "return", "async", "await", "move", "ref", "unsafe", "extern", "dyn", "true", "false"],
    builtins: ["println", "print", "eprintln", "format", "vec", "String", "Vec", "Box", "Rc", "Arc", "Option", "Result", "Some", "None", "Ok", "Err", "From", "Into", "Clone", "Copy", "Debug", "Display", "Default", "Iterator", "IntoIterator", "Send", "Sync", "Sized", "Drop", "Fn", "FnMut", "FnOnce"],
    types: ["i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64", "bool", "char", "str", "Self"],
    commentSingle: "//",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  go: {
    keywords: ["package", "import", "func", "return", "if", "else", "for", "range", "switch", "case", "default", "break", "continue", "go", "defer", "select", "chan", "map", "struct", "interface", "type", "const", "var", "true", "false", "nil", "fallthrough", "goto"],
    builtins: ["fmt", "Println", "Printf", "Sprintf", "Fprintf", "make", "append", "len", "cap", "close", "delete", "copy", "new", "panic", "recover", "print", "println", "error", "errors", "log", "sync", "context", "time", "math", "strings", "strconv", "io", "os", "net", "http"],
    types: ["int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16", "uint32", "uint64", "float32", "float64", "complex64", "complex128", "string", "bool", "byte", "rune", "error", "any"],
    commentSingle: "//",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  sql: {
    keywords: ["SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "INDEX", "DROP", "ALTER", "ADD", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "ON", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS", "NULL", "AS", "ORDER", "BY", "ASC", "DESC", "GROUP", "HAVING", "LIMIT", "OFFSET", "UNION", "ALL", "DISTINCT", "EXISTS", "CASE", "WHEN", "THEN", "ELSE", "END", "WITH", "RECURSIVE", "UNIQUE", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT", "DEFAULT", "CHECK", "CASCADE",
      "select", "from", "where", "insert", "into", "values", "update", "set", "delete", "create", "table", "index", "drop", "alter", "add", "join", "inner", "left", "right", "full", "outer", "on", "and", "or", "not", "in", "between", "like", "is", "null", "as", "order", "by", "asc", "desc", "group", "having", "limit", "offset", "union", "all", "distinct", "exists", "case", "when", "then", "else", "end", "with", "recursive", "unique", "primary", "key", "foreign", "references"],
    builtins: ["COUNT", "SUM", "AVG", "MIN", "MAX", "COALESCE", "NULLIF", "CAST", "CONVERT", "UPPER", "LOWER", "LENGTH", "TRIM", "SUBSTRING", "CONCAT", "NOW", "DATE", "YEAR", "MONTH", "DAY", "ROUND", "FLOOR", "CEIL", "ABS", "EXPLAIN", "ANALYZE",
      "count", "sum", "avg", "min", "max", "coalesce", "nullif", "cast", "convert", "upper", "lower", "length", "trim", "substring", "concat"],
    types: ["INT", "INTEGER", "BIGINT", "SMALLINT", "VARCHAR", "TEXT", "BOOLEAN", "FLOAT", "DOUBLE", "DECIMAL", "DATE", "TIMESTAMP", "SERIAL", "UUID",
      "int", "integer", "bigint", "smallint", "varchar", "text", "boolean", "float", "double", "decimal", "date", "timestamp"],
    commentSingle: "--",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
  html: {
    keywords: ["DOCTYPE", "html", "head", "body", "div", "span", "p", "a", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "table", "tr", "td", "th", "form", "input", "button", "select", "option", "textarea", "label", "img", "link", "meta", "script", "style", "section", "article", "nav", "header", "footer", "main", "aside"],
    builtins: ["class", "id", "src", "href", "type", "name", "value", "placeholder", "required", "disabled", "readonly", "checked", "selected", "for", "action", "method", "target", "rel", "alt", "title", "width", "height", "min", "max", "step", "pattern", "style"],
    types: [],
    commentSingle: "",
    commentMultiStart: "<!--",
    commentMultiEnd: "-->",
  },
  css: {
    keywords: ["display", "position", "flex", "grid", "block", "inline", "none", "relative", "absolute", "fixed", "sticky", "float", "clear", "overflow", "z-index", "opacity", "visibility", "transition", "animation", "transform", "import", "media", "keyframes", "from", "to"],
    builtins: ["color", "background", "background-color", "border", "border-radius", "margin", "padding", "width", "height", "min-width", "max-width", "min-height", "max-height", "font-size", "font-weight", "font-family", "line-height", "text-align", "text-decoration", "letter-spacing", "gap", "justify-content", "align-items", "flex-direction", "grid-template-columns", "grid-template-rows", "box-shadow", "cursor", "pointer-events"],
    types: ["px", "em", "rem", "%", "vh", "vw", "fr", "auto", "inherit", "initial", "unset", "none", "solid", "dashed", "dotted", "center", "flex-start", "flex-end", "space-between", "space-around", "column", "row", "wrap", "nowrap", "bold", "normal", "italic"],
    commentSingle: "",
    commentMultiStart: "/*",
    commentMultiEnd: "*/",
  },
};

function getLanguageDef(lang: string) {
  const normalized = lang.toLowerCase().replace(/[^a-z]/g, "");
  if (normalized === "js") return languageDefs.javascript;
  if (normalized === "ts") return languageDefs.typescript;
  if (normalized === "py") return languageDefs.python;
  return languageDefs[normalized] || languageDefs.javascript;
}

export function tokenize(code: string, language: string): Token[] {
  const def = getLanguageDef(language);
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Multi-line comments
    if (def.commentMultiStart && code.startsWith(def.commentMultiStart, i)) {
      const endIdx = code.indexOf(def.commentMultiEnd!, i + def.commentMultiStart.length);
      if (endIdx !== -1) {
        tokens.push({ text: code.slice(i, endIdx + def.commentMultiEnd!.length), type: "comment" });
        i = endIdx + def.commentMultiEnd!.length;
      } else {
        tokens.push({ text: code.slice(i), type: "comment" });
        i = code.length;
      }
      continue;
    }

    // Single-line comments
    if (def.commentSingle && code.startsWith(def.commentSingle, i)) {
      const lineEnd = code.indexOf("\n", i);
      if (lineEnd !== -1) {
        tokens.push({ text: code.slice(i, lineEnd), type: "comment" });
        i = lineEnd;
      } else {
        tokens.push({ text: code.slice(i), type: "comment" });
        i = code.length;
      }
      continue;
    }

    // Strings with proper open/close detection
    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i];
      let j = i + 1;
      let closed = false;
      while (j < code.length) {
        if (code[j] === '\\') {
          j += 2; // skip escaped char
          continue;
        }
        if (code[j] === '\n' && quote !== '`') {
          break; // unclosed string on newline (except template literals)
        }
        if (code[j] === quote) {
          closed = true;
          j++;
          break;
        }
        j++;
      }
      tokens.push({
        text: code.slice(i, j),
        type: closed ? "string" : "string-incomplete",
      });
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i]) && (i === 0 || /[\s\(\[\{,;:=<>+\-*/%!&|^~]/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[0-9.xXeE_a-fA-F]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), type: "number" });
      i = j;
      continue;
    }

    // Words (identifiers, keywords, etc.)
    if (/[a-zA-Z_$@#]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      let type: Token["type"] = "plain";
      if (def.keywords.includes(word)) {
        type = "keyword";
      } else if (def.builtins.includes(word)) {
        type = "builtin";
      } else if (def.types.includes(word)) {
        type = "type";
      } else if (j < code.length && code[j] === "(") {
        type = "function";
      }

      tokens.push({ text: word, type });
      i = j;
      continue;
    }

    // Operators
    if (/[+\-*/%=<>!&|^~?:]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[+\-*/%=<>!&|^~?:]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), type: "operator" });
      i = j;
      continue;
    }

    // Punctuation
    if (/[{}()\[\];,.]/.test(code[i])) {
      tokens.push({ text: code[i], type: "punctuation" });
      i++;
      continue;
    }

    // Whitespace and other
    tokens.push({ text: code[i], type: "plain" });
    i++;
  }

  return tokens;
}

export function highlightCode(code: string, language: string): string {
  const tokens = tokenize(code, language);
  return tokens
    .map((token) => {
      const escaped = token.text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      if (token.type === "plain") return escaped;
      return `<span class="syn-${token.type}">${escaped}</span>`;
    })
    .join("");
}
