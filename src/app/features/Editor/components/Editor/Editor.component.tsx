"use client"

import React, { useEffect, useRef } from "react"
import type QuillType from "quill"
import type { Delta, RangeStatic, Sources, QuillOptionsStatic } from "quill"
import "quill/dist/quill.snow.css"
import Rules from "../../utils/regex.utils"
import { applyHighlights } from "../../utils"

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
  // Initialize Quill
  useEffect(() => {
    if (!editorRef.current) return
    let isMounted = true

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
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current)
        highlightTimer.current = null
      }
      if (editorRef.current) editorRef.current.innerHTML = ""
      quillRef.current = null
    }
  }, [])

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
      <style jsx>{`
        .ql-highlight {
          background-color: #ffff00 !important;
          padding: 1px 2px;
          border-radius: 2px;
        }
      `}</style>
      <div ref={editorRef} style={{ minHeight: "200px" }} />
    </div>
  )
}
