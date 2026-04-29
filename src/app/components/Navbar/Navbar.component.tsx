"use client"
import { Toggle } from "@/app/editor/components/Toggle/Toggle.component"
import { useDarkMode } from "@/app/editor/hooks/darkmode.hook"
import Link from "next/link"

export const Navbar = () => {
  const { theme, toggleTheme, mounted } = useDarkMode()
  return (
    <nav className="z-5 backdrop-filter backdrop-blur-lg bg-opacity-20 flex justify-between items-center fixed w-full top-0">
        
      <div className="flex gap-5">
        <Link href="/">
        <h1 className="nav__item">The Dialogue Thing</h1>
      </Link>
        <div className="nav__item">
          <Link href="/editor">Editor</Link>
        </div>
        <div className="nav__item">
          <Link href="/character-sheet-builder">Character Sheet Builder</Link>
        </div>
        <div className="nav__item">
          <Link href="/blog">Blog</Link>
        </div>
      </div>
      <div className="nav__item">
        {mounted && (
          <Toggle
            checked={theme === "dark"}
            label="Dark mode"
            onChange={() => toggleTheme()}
          />
        )}
      </div>
    </nav>
  )
}
