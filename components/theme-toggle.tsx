"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const current = theme === "system" ? systemTheme : theme
  const isDark = current === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center rounded-full border border-input bg-card/70 px-1.5 py-1 text-xs shadow-sm backdrop-blur-sm transition-colors hover:bg-card/90 dark:bg-card/40"
    >
      <div className="relative h-6 w-11 overflow-hidden rounded-full bg-input/70 dark:bg-input/60">
        <div
          className="pointer-events-none absolute top-[3px] left-[3px] flex h-4 w-4 items-center justify-center rounded-full bg-background text-[10px] text-foreground shadow-sm transition-transform duration-300 ease-out"
          style={{ transform: isDark ? "translateX(14px)" : "translateX(0px)" }}
        >
          {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
        </div>
      </div>
    </button>
  )
}
