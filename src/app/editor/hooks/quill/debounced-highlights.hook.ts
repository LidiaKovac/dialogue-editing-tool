import { useCallback, useEffect, useRef } from "react"
import type QuillType from "quill"
import { applyHighlights } from "../../utils/highlights/highlights.utils"
import Rules from "../../utils/regex/regex.utils"

export const useDebouncedHighlights = (
  quill: QuillType | null,
  enableAdv: boolean
) => {
  const highlightTimer = useRef<NodeJS.Timeout | null>(null)
  const isApplyingHighlights = useRef(false)
  const tagsVersionRef = useRef(0)

  const applyHighlightsCB = useCallback(async () => {
    if (!quill || isApplyingHighlights.current) return false

    try {
      isApplyingHighlights.current = true
      quill.disable()
      quill.blur()

      await applyHighlights(quill, Rules.getRules(), enableAdv)
      return true
    } finally {
      isApplyingHighlights.current = false
      quill.enable(true)
    }
  }, [quill, enableAdv])

  useEffect(() => {
    if (quill?.getText()) {
      applyHighlightsCB()
    }
  }, [enableAdv, quill, applyHighlightsCB])

  // Re-run analysis when dialogue tags change
  useEffect(() => {
    const handleTagsChange = () => {
      tagsVersionRef.current++
      if (quill?.getText()) {
        applyHighlightsCB()
      }
    }

    Rules.subscribeToTags(handleTagsChange)
  }, [quill, applyHighlightsCB])

  useEffect(() => {
    if (!quill) return

    const onTextChange = () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current)

      highlightTimer.current = setTimeout(async () => {
        await applyHighlightsCB()
      }, 500)
    }

    quill.on("text-change", onTextChange)

    return () => {
      quill.off("text-change", onTextChange)
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current)
        highlightTimer.current = null
      }
    }
  }, [quill, applyHighlightsCB, enableAdv])

  return { isApplyingHighlights: isApplyingHighlights.current }
}
