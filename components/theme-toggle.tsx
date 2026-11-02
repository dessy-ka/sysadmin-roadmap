"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Avoid rendering theme-dependent UI before hydration has completed.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <button className="icon-button" aria-label="Colour theme" disabled><Sun size={17} /></button>;
  const dark = theme === "dark";
  return <button className="icon-button" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setTheme(dark ? "light" : "dark")}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>;
}
