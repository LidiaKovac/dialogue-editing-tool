"use client"
import "quill/dist/quill.snow.css"
import { useQuillEditor } from "../../hooks/quill/editor-init.hooks"
import { useCallback, useEffect, useState } from "react"
import Rules from "../../utils/regex/regex.utils"

export default function Editor() {
  const { editorRef, words, text, loading: loadingEditor } = useQuillEditor()
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchNames = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(process.env.NEXT_PUBLIC_URL + "api/names", {
        method: "POST",
        body: text,
      })
      const result = await res.json()
      setNames(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [text])

  useEffect(() => {
    if (!text) return // guard clause if text is empty

    fetchNames()
  }, [text])
  useEffect(() => {
    if (!names) return
    Rules.setCharacters(names)
  }, [names])
  return (
    <div>
      {(loading || loadingEditor) && <div className="disable-foreground"></div>}
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
