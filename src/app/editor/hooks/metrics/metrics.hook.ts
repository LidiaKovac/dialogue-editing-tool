import { useEffect, useRef, useCallback, useState } from "react"
import type QuillType from "quill"
import {
  calculateReadabilityScore,
  calculateWordDensity,
} from "../../utils/readability/lix.fn"
import { QUILL_DEBOUNCE_TIMER } from "@/app/lib/quill/quill.options"

export const useEditorMetrics = (quill: QuillType | null) => {
  const [metrics, setMetrics] = useState({
    words: 0,
    lix: null as Record<string, number> | null,
    dialogueDensity: 0,
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const updateMetrics = useCallback(() => {
    if (!quill || timerRef.current) clearTimeout(timerRef.current!)

    timerRef.current = setTimeout(() => {
      if (!quill) return

      const text = quill.getText().trim()
      const words = text.split(/\s+/).filter(Boolean).length
      setMetrics({
        words,
        lix: calculateReadabilityScore(text),
        dialogueDensity: calculateWordDensity(text),
      })
    }, QUILL_DEBOUNCE_TIMER)
  }, [quill])

  useEffect(() => {
    if (!quill) return

    quill.on("text-change", updateMetrics)

    return () => {
      quill.off("text-change", updateMetrics)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [quill, updateMetrics])

  return metrics
}
