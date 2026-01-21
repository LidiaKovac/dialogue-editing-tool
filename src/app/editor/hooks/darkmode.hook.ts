import { useEffect, useState } from "react"
type Theme = "light" | "dark"

const STORAGE_KEY = "theme"
function getInitialTheme(): Theme {
  // This runs during render, so NO window/localStorage here.
  // Just return a neutral default; real value is applied in useEffect.
  return "light"
}
export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())
  const [mounted, setMounted] = useState(false)

  // Hydrate with real value on client
  useEffect(() => {
    setMounted(true)

    // Safe: now window/localStorage exist
    const stored = globalThis.localStorage.getItem(STORAGE_KEY) as Theme | null
    const prefersDark = globalThis.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches

    const next: Theme = stored ?? (prefersDark ? "dark" : "light")
    setTheme(next)
    applyTheme(next)
  }, [])

  const applyTheme = (value: Theme) => {
    const root = document.documentElement
    root.dataset.theme = value
    globalThis.localStorage.setItem(STORAGE_KEY, value)
  }

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark"
      if (typeof globalThis !== "undefined") {
        applyTheme(next)
      }
      return next
    })
  }

  return { theme, toggleTheme, mounted }
}
