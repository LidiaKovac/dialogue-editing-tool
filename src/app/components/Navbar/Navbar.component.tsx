"use client"
import { Toggle } from "@/app/editor/components/Toggle/Toggle.component"
import { useDarkMode } from "@/app/editor/hooks/darkmode.hook"
import Link from "next/link"

export const Navbar = () => {
  const { theme, toggleTheme } = useDarkMode()
  return (
    <nav className="flex gap-5">
      <div className="nav__item">
        <Link href="/">Home</Link>
      </div>
      <div className="nav__item">
        <Link href="/editor">Editor</Link>
      </div>
      <div className="nav__item">
        <Link href="/blog">Blog</Link>
      </div>
      <div className="nav__item">
        <Toggle
          checked={theme === "dark"}
          label="Dark mode"
          onChange={() => toggleTheme()}
        />
      </div>
    </nav>
  )
}
