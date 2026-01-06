"use client"
import "quill/dist/quill.snow.css"
import { useQuillEditor } from "../../hooks/quill/editor-init.hooks"
import { useCallback, useEffect, useState } from "react"
import Rules from "../../utils/regex/regex.utils"

export default function Editor() {
  const { editorRef, words, loading: loadingEditor } = useQuillEditor()


  return (
    <div>
      {(loadingEditor) && <div className="disable-foreground"></div>}
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
