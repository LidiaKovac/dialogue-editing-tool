import { useRef } from "react"
import { useQuillInstance } from "./quill-instance.hook"
import { useDebouncedHighlights } from "./debounced-highlights.hook"
import { useEditorMetrics } from "../metrics/metrics.hook"

export const useQuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { quill, isQuillCreated } = useQuillInstance(editorRef)
  const { isApplyingHighlights } = useDebouncedHighlights(quill)
  const { words, lix, dialogueDensity } = useEditorMetrics(quill)

  return {
    editorRef,
    quill,
    loading: !isQuillCreated && !isApplyingHighlights,
    words,
    lix,
    dialogueDensity,
    text: quill?.getText(),
  }
}