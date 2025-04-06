"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

export const themes = {
  light: "bg-white text-black", // ✅ High contrast
  dark: "bg-gray-900 text-white", // ✅ Good for dark theme
  neon: "bg-fuchsia-600 text-yellow-200", // 🎉 Better neon vibe, more contrast
  minimalist: "bg-gray-300 text-gray-900", // More defined background, still minimalist
};


type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.className = themes[theme]; // Apply theme globally
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen transition-all duration-500 ${themes[theme]}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
