import { useRef } from "react"
import { useQuillInstance } from "./quill-instance.hook"
import { useDebouncedHighlights } from "./debounced-highlights.hook"
import { useEditorMetrics } from "../metrics/metrics.hook"
import { useOptions } from "../../components/Options/options.hook"

export const useQuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { quill, isQuillCreated } = useQuillInstance(editorRef)
  const options = useOptions()
  const { isApplyingHighlights } = useDebouncedHighlights(
    quill,
    options.enableAdv
  )
  const { words, lix, dialogueDensity } = useEditorMetrics(quill)

  return {
    editorRef,
    quill,
    loading: !isQuillCreated && !isApplyingHighlights,
    words,
    lix,
    dialogueDensity,
    options,
    text: quill?.getText(),
  }
}