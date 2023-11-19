"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
interface themeContextType {
  mode: string; /// dark or light;
  setMode: (mode: string) => void; // has no value just a function to change mode state ;
}
const themeContext = createContext<themeContextType | undefined>(undefined);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");
  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleThemeChange();
  }, [mode]);
  console.log(mode)

  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme must be within a themeProvider");
  }
  return context;
}