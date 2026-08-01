"use client";

import { useRef, useMemo } from "react";
import { highlightCode } from "@/lib/highlighter";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  language,
  placeholder,
  disabled,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const highlighted = useMemo(
    () => highlightCode(value || "", language),
    [value, language]
  );

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
