"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full bg-[#3A3A4A] hover:bg-[#4A4A5A] transition-colors duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-[#FFA800]" />
      ) : (
        <Moon size={20} className="text-[#FFA800]" />
      )}
    </button>
  );
}