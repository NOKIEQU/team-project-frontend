"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the theme context
const ThemeContext = createContext();

// File: theme-context.jsx

// Theme provider component
export function ThemeProvider({ children }) {
  // Initialize theme state, defaulting to dark since your current theme is dark
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Effect to load saved theme from localStorage on component mount
  useEffect(() => {
    // Get saved theme or use default
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    setMounted(true);
    
    // Apply the theme to the document
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    
    // Apply the theme to the document
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Avoid hydration mismatch by rendering only after mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}