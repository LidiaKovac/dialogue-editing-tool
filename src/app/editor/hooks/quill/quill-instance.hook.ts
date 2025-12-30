import { useEffect, useRef, useCallback } from "react"
import type QuillType from "quill"
import { QuillOptions } from "quill"
import { registerDialogueBlot } from "../../utils/blots/DialogueBlot.class"
import { registerAdvBlot } from "../../utils/blots/AdverbBlot.class"
import { useQuillSingleton } from "./editor-singleton.hooks"
import { quillOptions } from "@/app/lib/quill/quill.options"
import { registerSdtBlot } from "../../utils/blots/SDTBlot.class"

export const useQuillInstance = (
  editorRef: React.RefObject<HTMLDivElement | null>
) => {
  const quillRef = useRef<QuillType | null>(null)
  const { quill, setQuill } = useQuillSingleton()
  const isQuillCreated = useRef(false)

  const initializeQuill = useCallback(
    (Quill: typeof QuillType) => {
      if (!editorRef.current || quillRef.current) return

      registerDialogueBlot(Quill)
      registerAdvBlot(Quill)
      registerSdtBlot(Quill)

      const instance = new Quill(
        editorRef.current,
        quillOptions as QuillOptions
      )
      quillRef.current = instance
      setQuill(instance)
      isQuillCreated.current = true
    },
    [editorRef, setQuill]
  )

  useEffect(() => {
    if (!editorRef.current || isQuillCreated.current) return

    let isMounted = true
    import("quill")
      .then(({ default: Quill }) => {
        if (isMounted) initializeQuill(Quill)
      })
      .catch(console.error)

    return () => {
      isMounted = false
      if (quillRef.current) {
        setQuill(null)
        quillRef.current = null
      }
    }
  }, [initializeQuill])

  return { quill, isQuillCreated: isQuillCreated.current }
}
