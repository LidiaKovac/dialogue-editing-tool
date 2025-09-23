"use client"

import React, { useEffect, useRef, useState } from "react"
import type QuillType from "quill"
import type { Delta, RangeStatic, Sources, QuillOptionsStatic } from "quill"
import "quill/dist/quill.snow.css"
import Rules from "../../utils/regex.utils"
import { applyHighlights } from "../../utils"
import { useQuillSingleton } from "../../hooks/editor.hooks"

interface EditorProps {
  readOnly?: boolean
  defaultValue?: Delta | string
  highlightPatterns?: { id: string; regex: RegExp }[]
  onTextChange?: (delta: Delta, oldContents: Delta, source: Sources) => void
  onSelectionChange?: (
    range: RangeStatic | null,
    oldRange: RangeStatic | null,
    source: Sources
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

        // Register HighlightBlot properly
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Inline: any = Quill.import("blots/inline")

        class HighlightBlot extends Inline {
          static blotName = "highlight"
          static tagName = "SPAN"
          static className = "ql-highlight"

          static create(value: boolean | string) {
            const node = super.create()
            if (value) {
              node.setAttribute("data-highlight", "true")
            }
            return node
          }

          static formats(domNode: HTMLElement) {
            return domNode.getAttribute("data-highlight") || true
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          format(name: string, value: any) {
            if (name === this.constructor.blotName && value) {
              this.domNode.setAttribute("data-highlight", "true")
            } else {
              super.format(name, value)
            }
          }
        }

        // Register the format
        Quill.register(HighlightBlot, true)

        const quillOptions: QuillOptionsStatic = {
          theme: "snow",
          modules: {
            toolbar: [["bold", "italic", "underline", "strike"]],
          },
          readOnly,
          formats: ["bold", "italic", "underline", "strike", "highlight"],
        }

        const quill = new Quill(editorRef.current!, quillOptions)
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

    // Initial count
    updateWordCount()

    // Listen for changes
    quill.on("text-change", updateWordCount)

    return () => {
      quill.off("text-change", updateWordCount)
    }
  }, [quill])

  // Handle prop changes separately
  useEffect(() => {
    if (quillRef.current) {
      applyHighlights(quillRef.current, highlightPatterns)
    }
  }, [highlightPatterns])

  // Enable/disable readonly dynamically
  useEffect(() => {
    quillRef.current?.enable(!readOnly)
  }, [readOnly])

  return (
    <div>
      <div ref={editorRef} />
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
