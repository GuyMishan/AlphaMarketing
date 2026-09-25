"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("alpha-theme");
    const useDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
    requestAnimationFrame(() => setDark(useDark));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("alpha-theme", next ? "dark" : "light");
  }

  return <button className="btn btn-ghost icon-btn" onClick={toggle} aria-label={dark ? "מעבר למצב בהיר" : "מעבר למצב כהה"}>{dark ? <Sun size={22} strokeWidth={2.25}/> : <Moon size={22} strokeWidth={2.25}/>}</button>;
}
