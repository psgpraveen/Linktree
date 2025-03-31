import React, { useState, useEffect } from "react";

const themes = {
  light: "bg-white text-black",
  dark: "bg-gray-900 text-white",
  neon: "bg-purple-700 text-white",
  minimalist: "bg-gray-400 text-black",
};

const themeKeys = Object.keys(themes);

const Header = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const currentIndex = themeKeys.indexOf(theme);
    const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    setTheme(nextTheme);
  };

  return (
    <div className={`flex flex-col items-center w-full min-h-screen ${themes[theme]} transition-all duration-300`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-500 transition"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? "🌞" : theme === "light" ? "🌙" : "✨"}
      </button>

      {/* Theme Selection Dropdown */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="p-2 rounded bg-gray-400 border mt-4"
      >
        {themeKeys.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
