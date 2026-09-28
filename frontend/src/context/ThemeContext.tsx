"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ActiveTheme = "light" | "dark";

interface ThemeContextType {
  theme: ActiveTheme;
  preference: ThemePreference;
  setTheme: (pref: ThemePreference) => void;
  toggleTheme: () => void;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [theme, setActiveTheme] = useState<ActiveTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check initial preference from localStorage
    let saved: ThemePreference = "system";
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        saved = stored;
      }
    } catch {
      // localStorage may fail in private browsing
    }
    setPreference(saved);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveTheme = (pref: ThemePreference): ActiveTheme => {
      if (pref === "dark") return "dark";
      if (pref === "light") return "light";
      return mediaQuery.matches ? "dark" : "light";
    };

    const initialTheme = resolveTheme(saved);
    setActiveTheme(initialTheme);
    applyClass(initialTheme);
    setMounted(true);

    const handleSystemChange = (e: MediaQueryListEvent) => {
      // If user hasn't explicitly chosen light or dark, follow system
      let currentStored: string | null = null;
      try {
        currentStored = localStorage.getItem("theme");
      } catch {}

      if (!currentStored || currentStored === "system") {
        const nextTheme = e.matches ? "dark" : "light";
        setActiveTheme(nextTheme);
        applyClass(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const applyClass = (targetTheme: ActiveTheme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (targetTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (newPref: ThemePreference) => {
    setPreference(newPref);
    if (newPref === "system") {
      try {
        localStorage.removeItem("theme");
      } catch {}
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const res: ActiveTheme = systemDark ? "dark" : "light";
      setActiveTheme(res);
      applyClass(res);
    } else {
      try {
        localStorage.setItem("theme", newPref);
      } catch {}
      setActiveTheme(newPref);
      applyClass(newPref);
    }
  };

  const toggleTheme = () => {
    // Toggle directly between light and dark
    const next: ActiveTheme = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        preference,
        setTheme,
        toggleTheme,
        isSystem: preference === "system",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
