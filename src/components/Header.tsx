"use client";

import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { themes } from "../context/ThemeProvider"; // 👈 Reuse the exported theme map

const Header = () => {
  const { theme, setTheme } = useTheme();

  // 👇 Explicitly cast to ThemeName[] for type safety
  const themeKeys = Object.keys(themes) as (keyof typeof themes)[];

  const toggleTheme = () => {
    const currentIndex = themeKeys.indexOf(theme);
    const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    setTheme(nextTheme); // ✅ No more type error
  };

  return (
    <header className="bg-blue-600 text-white w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold">🌟 My Linktree Clone</h1>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-500 transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? "🌞" : theme === "light" ? "🌙" : "✨"}
          </button>

          {/* Theme Selection Dropdown */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as keyof typeof themes)} // 👈 cast to ThemeName
            className="p-2 rounded-lg border bg-gray-300 text-black dark:bg-gray-700 dark:text-white cursor-pointer"
          >
            {themeKeys.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;

