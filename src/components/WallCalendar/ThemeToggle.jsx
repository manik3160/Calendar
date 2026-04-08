import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    try {
      const pref = localStorage.getItem("wc-theme-pref");
      if (pref === "light") {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
      } else {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      console.warn("Could not read theme preference");
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDark;
    setIsDark(nextMode);
    
    if (nextMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    try {
      localStorage.setItem("wc-theme-pref", nextMode ? "dark" : "light");
    } catch (e) {
      console.warn("Could not write theme preference");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="absolute top-4 left-6 md:top-6 md:left-10 z-50 w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/20 hover:border-primary/50 transition-all hover:bg-surface-container-highest active:scale-95 shadow-lg group"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
      )}
    </button>
  );
}
