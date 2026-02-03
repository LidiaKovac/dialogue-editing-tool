import { useCallback, useEffect, useRef } from "react"
import type QuillType from "quill"
import { applyHighlights } from "../../utils/highlights/highlights.utils"
import Rules from "../../utils/regex/regex.utils"
import { QUILL_DEBOUNCE_TIMER } from "../../../../app/lib/quill/quill.options"

export const useDebouncedHighlights = (
  quill: QuillType | null,
  enableAdv: boolean,
) => {
  const highlightTimer = useRef<NodeJS.Timeout | null>(null)
  const isApplyingHighlights = useRef(false)
  const tagsVersionRef = useRef(0)
  const charsVersionRef = useRef(0)

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

  // Re-run analysis when characters change
  useEffect(() => {
    const handleCharsChange = () => {
      charsVersionRef.current++
      if (quill?.getText()) {
        applyHighlightsCB()
      }
    }

    Rules.subscribeToChars(handleCharsChange)
  }, [quill, applyHighlightsCB])

  useEffect(() => {
    if (!quill) return

    const onTextChange = () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current)

      highlightTimer.current = setTimeout(async () => {
        await applyHighlightsCB()
      }, QUILL_DEBOUNCE_TIMER)
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
