"use client"
import "quill/dist/quill.snow.css"
import { useQuillEditor } from "../../hooks/editor-init.hooks"
import { useCallback, useEffect } from "react"
import Rules from "../../utils/regex.utils"

export default function Editor() {
  const { editorRef, words, text } = useQuillEditor()
  const getNames = useCallback(async () => {
    const res = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: text,
    })
    const names = await res.json()
    Rules.setCharacters(names)
  }, [text])
  useEffect(() => {
    if (!text) return
    getNames()
  }, [text])
  return (
    <div>
      <div
        ref={editorRef}
        role="textbox"
        aria-label="Dialogue text editor"
        aria-multiline="true"
        tabIndex={0}
      />
      <small>
        Words: {words} / 30k{" "}
        {words > 30_000 && (
          <span>
            Warning, text over 30k words might make the app slow. Consider
            editing fewer words at the time.
          </span>
        )}
      </small>
    </div>
  )
}
