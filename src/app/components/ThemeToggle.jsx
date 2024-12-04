"use client";
import { useEffect, useState } from "react";


const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else if (theme === "light") {
      setDarkMode(false);
    }
  }, []);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-800 bg-white cursor-pointer rounded-full p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
   
      <div
        className={`absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
          darkMode ? "translate-x-8" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ThemeToggle;
