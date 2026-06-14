"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="flex items-center gap-1 rounded-xl border border-ist-border p-1"
        style={{ backgroundColor: "var(--ist-bg)", width: 68, height: 34 }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1 rounded-xl border border-ist-border p-1 transition-all hover:border-brand-blue"
      style={{ backgroundColor: "var(--ist-bg)" }}
      aria-label="Toggle theme"
    >
      {/* Sun icon */}
      <span
        className="flex-center size-6 rounded-lg transition-all"
        style={{
          backgroundColor: !isDark ? "#FFCC00" : "transparent",
          color: !isDark ? "#fff" : "var(--ist-muted)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Moon icon */}
      <span
        className="flex-center size-6 rounded-lg transition-all"
        style={{
          backgroundColor: isDark ? "#377DFF" : "transparent",
          color: isDark ? "#fff" : "var(--ist-muted)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
