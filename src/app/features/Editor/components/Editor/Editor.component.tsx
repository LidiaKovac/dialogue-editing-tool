"use client"

import React, { useEffect, useRef, useState } from "react"
import type QuillType from "quill"
import type { Delta, Range, EmitterSource, QuillOptions } from "quill"
import "quill/dist/quill.snow.css"
import Rules from "../../utils/regex.utils"
import { applyHighlights } from "../../utils"
import { useQuillSingleton } from "../../hooks/editor.hooks"
import { registerBlot } from "../../utils/HighlightBlot.class"

interface EditorProps {
  readonly readOnly?: boolean
  readonly defaultValue?: Delta | string
  readonly highlightPatterns?: { id: string; regex: RegExp }[]
  readonly onTextChange?: (
    delta: Delta,
    oldContents: Delta,
    source: EmitterSource
  ) => void
  readonly onSelectionChange?: (
    range: Range | null,
    oldRange: Range | null,
    source: EmitterSource
  ) => void
}

export default function Editor({
  readOnly = false,
  defaultValue,
  highlightPatterns = Rules.getRules(),
  onTextChange,
  onSelectionChange,
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<QuillType | null>(null)
  const highlightTimer = useRef<NodeJS.Timeout | null>(null)
  const { quill, setQuill } = useQuillSingleton()
  const isQuillCreated = useRef(false) // Prevent double creation
  // Initialize Quill
  useEffect(() => {
    if (!editorRef.current) return
    let isMounted = true
    isQuillCreated.current = true
    import("quill")
      .then(({ default: Quill }) => {
        if (!isMounted || !editorRef.current) return

        // Register the format
        registerBlot(Quill)

        const quillOptions: QuillOptions = {
          theme: "snow",
          modules: {
            toolbar: [["bold", "italic", "underline", "strike"]],
          },
          readOnly,
          formats: ["bold", "italic", "underline", "strike", "highlight"],
        }

        const quill = new Quill(editorRef.current, quillOptions)
        // 🔑 Register the quill instance with the singleton
        setQuill(quill)
        quillRef.current = quill

        // Set initial content
        if (defaultValue) {
          if (typeof defaultValue === "string") {
            quill.clipboard.dangerouslyPasteHTML(defaultValue)
          } else {
            quill.setContents(defaultValue)
          }
        }

        // Apply initial highlights after a short delay
        setTimeout(() => {
          applyHighlights(quill, highlightPatterns)
        }, 100)

        // Event: text-change
        quill.on("text-change", (delta, oldDelta, source) => {
          onTextChange?.(delta, oldDelta, source)

          // Only debounce for user edits
          if (source === "user") {
            if (highlightTimer.current) clearTimeout(highlightTimer.current)
            highlightTimer.current = setTimeout(() => {
              applyHighlights(quill, highlightPatterns)
            }, 300)
          }
        })

        // Event: selection-change
        quill.on("selection-change", (...args) => {
          onSelectionChange?.(...args)
        })
      })
      .catch(console.error)

    return () => {
      isMounted = false
      // 🔑 Unregister the quill instance from singleton
      setQuill(null)
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current)
        highlightTimer.current = null
      }
      if (editorRef.current) editorRef.current.innerHTML = ""
      quillRef.current = null
    }
  }, [setQuill])
  const [words, setWords] = useState<number>(0)
  useEffect(() => {
    if (!quill) return

    const updateWordCount = () => {
      const text = quill.getText()
      const count = text.trim().split(/\s+/).filter(Boolean).length
      setWords(count)
    }

    updateWordCount()

    quill.on("text-change", updateWordCount)

    return () => {
      quill.off("text-change", updateWordCount)
    }
  }, [quill])

  useEffect(() => {
    if (quillRef.current) {
      applyHighlights(quillRef.current, highlightPatterns)
    }
  }, [highlightPatterns])

  useEffect(() => {
    quillRef.current?.enable(!readOnly)
  }, [readOnly])

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
