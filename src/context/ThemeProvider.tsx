"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Theme map with Tailwind utility classes
export const themes = {
  light: "bg-white text-black", // High contrast
  dark: "bg-gray-900 text-white", // Good for dark theme
  neon: "bg-fuchsia-600 text-yellow-200", // Neon style
  minimalist: "bg-gray-300 text-gray-900", // Minimalist style
} as const;

type ThemeName = keyof typeof themes;

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    document.documentElement.className = themes[theme]; 
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
