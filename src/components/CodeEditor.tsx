"use client";

import { useRef, useMemo } from "react";
import { highlightCode } from "@/lib/highlighter";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  placeholder?: string;
  disabled?: boolean;
  showLineNumbers?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  language,
  placeholder,
  disabled,
  showLineNumbers = false,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const highlighted = useMemo(
    () => highlightCode(value || "", language),
    [value, language]
  );

  const lines = useMemo(() => (value || "").split("\n"), [value]);
  const lineCount = lines.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key inserts 2 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.slice(0, start) + "  " + value.slice(end);
      onChange(newValue);
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Build highlighted HTML with alternating line backgrounds
  const highlightedWithLines = useMemo(() => {
    if (!showLineNumbers) return highlighted;

    // Split the highlighted content by newlines to wrap each line
    const htmlLines = (value || "").split("\n");
    const highlightedLines = htmlLines.map((line) => highlightCode(line, language));

    return highlightedLines
      .map((lineHtml, i) => {
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "code-line-even" : "code-line-odd";
        return `<div class="code-line ${bgClass}">${lineHtml || " "}</div>`;
      })
      .join("");
  }, [value, language, showLineNumbers, highlighted]);

  if (showLineNumbers) {
    return (
      <div className="code-editor-container min-h-[180px] md:min-h-[280px] relative flex">
        {/* Line numbers gutter */}
        <div className="code-line-gutter select-none shrink-0">
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className={`code-line-number ${i % 2 === 0 ? "code-line-even" : "code-line-odd"}`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Syntax highlighted layer with alternating backgrounds */}
          <div className="code-editor-highlight code-editor-highlight-lined">
            <div
              dangerouslySetInnerHTML={{
                __html: highlightedWithLines || `<div class="code-line code-line-even"><span class="syn-comment">${placeholder || "// Write your code here..."}</span></div>`,
              }}
            />
          </div>

          {/* Transparent textarea for input */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="code-editor-textarea code-editor-textarea-lined"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }

  // Original layout without line numbers
  return (
    <div className="code-editor-container min-h-[180px] md:min-h-[220px] relative">
      {/* Syntax highlighted layer */}
      <div className="code-editor-highlight">
        <pre className="m-0">
          <code
            dangerouslySetInnerHTML={{
              __html: highlighted || `<span class="syn-comment">${placeholder || "// Write your code here..."}</span>`,
            }}
          />
        </pre>
      </div>

      {/* Transparent textarea for input */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="code-editor-textarea"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}
