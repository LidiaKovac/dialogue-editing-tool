"use client"
import Editor from "./features/Editor/components/Editor/Editor.component"
import { useRef, useState } from "react"
import Rules from "./features/Editor/utils/regex.utils"
import { RulesCollapsable } from "./components/Rules/Rules.component"

export default function Home() {
  return (
    <main className="flex gap-4">
      <div className="editor">
        <header>
          <h1>The Dialogue Thing</h1>
          <p>
            Paste your chapter in the area below ⬇️ and see everything that
            doesn&apos;t match the default dialogue rules.
          </p>
          <small>
            💡 Tip: when pasting back to google docs, use CTRL+SHIFT+V, or
            &quot;Paste without formatting&quot;
          </small>
          <RulesCollapsable />
        </header>
        <div className="editor__wrap">
          <Editor />
        </div>
      </div>
      <div className="editor__options">
        <h3 className="text-xl"> Options </h3>
        <h4>Character names</h4>
        <textarea
          rows={5}
          defaultValue={Rules.CHARACTERS}
          onChange={(e) => {
            Rules.setCharacters(e.target.value.split(","))
          }}
        ></textarea>
        <h4>Dialogue tags</h4>
        <textarea
          rows={5}
          defaultValue={Rules.DIALOGUE_TAGS.join(", ")}
        ></textarea>
      </div>
    </main>
  )
}
