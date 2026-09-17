"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reads the class the inline theme script already applied before hydration;
    // gated behind `mounted` so server and first client render stay identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 px-0"
    >
      {mounted ? (
        <Icon name={isDark ? "Sun" : "Moon"} className="size-4" />
      ) : (
        <span className="size-4" />
      )}
    </Button>
  );
}
