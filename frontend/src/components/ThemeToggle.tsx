"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by rendering a stable placeholder until mounted
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4] dark:bg-[#151817] ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-[#f3f5f4] hover:bg-neutral-200 dark:bg-[#151817] dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-emerald-400" />
      ) : (
        <Moon className="w-4 h-4 text-emerald-600" />
      )}
    </button>
  );
}
