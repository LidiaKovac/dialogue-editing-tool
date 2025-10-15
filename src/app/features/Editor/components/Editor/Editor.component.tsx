"use client";
import "quill/dist/quill.snow.css";
import { useQuillEditor } from "../../hooks/editor-init.hooks";
import { useEffect, useState } from "react";
import { Lexicon } from "natural"

export default function Editor() {
  const { editorRef, words, text } = useQuillEditor()
  const [_, setNames] = useState<Map<string, number>>(new Map())
  // useEffect(() => {
  //   if (!text) return

  // }, [text])
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
