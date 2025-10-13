"use client";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

// Create the context with a default value
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Create a custom hook for easy consumption of the context
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // State to hold the current theme
  const [theme, setTheme] = useState("light");

  // Effect to run on component mount to check for saved theme in localStorage
  // or user's system preference
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  // Effect to apply the theme class to the root HTML element and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Provide the theme and toggle function to children
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
