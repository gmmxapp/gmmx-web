"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gmmx-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextIsDark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
    setMounted(true);
  }, []);

  const onToggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("gmmx-theme", next ? "dark" : "light");
  };

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full border border-slate-300/60 bg-white/60 dark:border-slate-700" />;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className="h-10 w-10 rounded-full border border-slate-300/60 bg-white/70 text-lg transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
