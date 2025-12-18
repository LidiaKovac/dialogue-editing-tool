import { useCallback, useEffect, useRef, useState } from "react"
import { useQuillSingleton } from "./editor-singleton.hooks"
import type QuillType from "quill"
import { registerDialogueBlot } from "../utils/DialogueBlot.class"
import { QuillOptions } from "quill"
import { applyHighlights } from "../utils"
import Rules from "../utils/regex.utils"
import { quillOptions } from "@/app/lib/quill/quill.options"
import { registerAdvBlot } from "../utils/AdverbBlot.class"
import { useOptions } from "../components/Options/options.hook"

/**
 * Custom hook to initialize and manage a Quill rich text editor with syntax highlighting and word count.
 *
 * Handles editor initialization, text-change event subscriptions, applying highlights using custom rules,
 * and word counting with debouncing.
 *
 * @returns {{
 *   editorRef: React.RefObject<HTMLDivElement>,
 *   words: number,
 *   text: string | undefined
 * }} An object containing a ref for the editor container, the current word count, and the editor text content.
 */
export const useQuillEditor = () => {
  // State to store current word count
  const [words, setWords] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [lix, setLix] = useState<Record<string, number> | null>(null)
  const [dialogueDensity, setDialogueDensity] = useState<number>(0)

  // Ref to the editor container div
  const editorRef = useRef<HTMLDivElement | null>(null)
  // Ref to Quill editor instance
  const quillRef = useRef<QuillType | null>(null)
  // Ref holding timer ID for delayed highlight application to debounce rapid typing
  const highlightTimer = useRef<NodeJS.Timeout | null>(null)
  // Ref holding timer ID for debounced word count updates
  const wordCountTime = useRef<NodeJS.Timeout>(null)
  //Ref holding timer ID for debounced ARI value
  const ariTimer = useRef<NodeJS.Timeout>(null)
  // Ref holding timer ID for debounced dialogue density
  const dialogueDensityTimer = useRef<NodeJS.Timeout>(null)
  // Flag to track whether Quill instance was created
  const isQuillCreated = useRef(false)
  // Shared singleton Quill instance and setter method from custom hook
  const { quill, setQuill } = useQuillSingleton()
  const { enableAdv } = useOptions()

  const isApplyingHighlights = useRef(false)
  // Memoized callback to apply syntax highlights using rules
  const applyHighlightsCB = useCallback(
    async (quill: QuillType | null) => {
      try {
        setLoading(true)
        quill?.disable()
        quill?.blur()
        await applyHighlights(quill, Rules.getRules(), enableAdv)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        quill?.enable(true)
      }
    },
    [quill, Rules.getRules()]
  )

  // Effect to initialize Quill editor when the component mounts and editorRef is assigned
  useEffect(() => {
    if (!editorRef.current) return

    let isMounted = true
    isQuillCreated.current = true

    import("quill")
      .then(({ default: Quill }) => {
        if (!isMounted || !editorRef.current) return

        // Register custom highlight blot for rich text highlighting
        registerDialogueBlot(Quill)
        registerAdvBlot(Quill)

        // Initialize Quill instance with provided options
        initializeQuill(Quill, quillOptions)
      })
      .catch(console.error)

    // Cleanup function runs on unmount - reset flag and perform cleanup
    return () => {
      isMounted = false
      cleanUp()
    }
  }, [setQuill])

  /**
   * Initializes the Quill editor on the target container with options.
   * Sets up event listeners and triggers initial highlight application.
   *
   * @param {typeof QuillType} Quill - The Quill editor class.
   * @param {QuillOptions} options - Configuration options for Quill.
   */
  function initializeQuill(Quill: typeof QuillType, options: QuillOptions) {
    const quill = new Quill(editorRef.current!, options)
    setQuill(quill)
    quillRef.current = quill

    // Disable native spellcheck while editing
    quill.root.setAttribute("spellcheck", "false")

    // Apply highlights shortly after editor is initialized
    setTimeout(() => applyHighlightsCB(quillRef.current), 100)

    // Listen for user text changes to trigger re-highlighting with debounce
    quill.on("text-change", onTextChange)
  }

  /**
   * Event handler for Quill `text-change` events.
   * Applies highlighting after user stops typing for 500ms.
   *
   * @param {any} delta - Change delta.
   * @param {any} oldDelta - Previous delta.
   * @param {string} source - Origin of change, e.g., "user".
   */
  function onTextChange(delta: any, oldDelta: any, source: string) {
    if (source !== "user") return
    if (isApplyingHighlights.current) return // Prevent recursive highlights
    if (highlightTimer.current) clearTimeout(highlightTimer.current)

    highlightTimer.current = setTimeout(() => {
      if (quillRef.current) {
        isApplyingHighlights.current = true
        applyHighlightsCB(quillRef.current).finally(
          () => (isApplyingHighlights.current = false)
        )
      }
    }, 500)
  }

  /**
   * Cleans up editor instance and event subscriptions.
   * Called on component unmount to prevent memory leaks.
   */
  function cleanUp() {
    setQuill(null)

    if (highlightTimer.current) {
      clearTimeout(highlightTimer.current)
      highlightTimer.current = null
    }

    if (editorRef.current) {
      editorRef.current.innerHTML = ""
    }

    if (quillRef.current) {
      quillRef.current.off("text-change", onTextChange)
      quillRef.current = null
    }
  }

  // Effect to update word count with debounce whenever editor text changes
  useEffect(() => {
    if (!quill) return

    // Debounced function to count words and update state
    const updateWordCount = () => {
      if (wordCountTime.current) clearTimeout(wordCountTime.current)
      wordCountTime.current = setTimeout(() => {
        const text = quill.getText()
        const count = text.trim().split(/\s+/).filter(Boolean).length
        setWords(count)
      }, 500)
    }

    updateWordCount()
    quill.on("text-change", updateWordCount)

    return () => {
      quill.off("text-change", updateWordCount)
      if (wordCountTime.current) clearTimeout(wordCountTime.current)
      wordCountTime.current = null
    }
  }, [quill])

  useEffect(() => {
    if (!quill) return
    if (words < 1) return

    // Debounced function to count words and update state
    const calculateWordDensity = () => {
      if (dialogueDensityTimer.current)
        clearTimeout(dialogueDensityTimer.current)
      dialogueDensityTimer.current = setTimeout(() => {
        const text = quill.getText().trim()

        const dialogueLines = [...text.matchAll(/[""“”][^""“”]*?[""“”]/gim)]
          .flat()
          .map((line) => line.replaceAll(/[""“”]/g, ""))
        const wordsInDialogue = dialogueLines.join().split(" ").length
        setDialogueDensity(Math.ceil((wordsInDialogue / words) * 100))
      }, 500)
      //TODO: move to API and add highlighting of dialogue in subtle color + toggle
    }

    const calculateReadabilityScore = () => {
      if (ariTimer.current) clearTimeout(ariTimer.current)
      // The formula for calculating the automated readability index is given below:
      // 4.71 ( characters / words ) + 0.5 ( words / sentences ) − 21.43
      // where characters is the number of letters and numbers, words is the number of spaces, and sentences is the number of sentences, which were counted manually by the typist when the above formula was developed. Non-integer scores are always rounded up to the nearest whole number, so a score of 10.1 or 10.6 would be converted to 11.
      ariTimer.current = setTimeout(() => {
        const text = quill.getText().trim()
        const characters = text
          .split("")
          .filter((c) => /[a-zA-Z0-9]/.test(c)).length
        const words = text.split(/\s+/).filter(Boolean).length || 1
        const sentences = text.match(/(?:\.|\!|\?)/g)?.length ?? 1
        const rawAri =
          4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43

        //LIX = Läsbarhetsindex, indice di leggibilità
        // Barn- och ungdomsböcker = 27
        // Skönlitteratur = 33 letteratura e narrativa per adulti
        // Dags- och veckopress = 39 giornali e informazione
        // Saklitteratur = 47 letteratura scentifica
        // Facklitteratur = 56 letteratura tecnica

        const longWords = text
          .split(/\s+/)
          .filter(Boolean)
          .filter((w) => w.length >= 6).length
        //https://sv.wikipedia.org/wiki/L%C3%A4sbarhetsindex
        const swedishindex = words / sentences + (longWords * 100) / words
        setLix({ ari: Math.ceil(rawAri), lix: Math.ceil(swedishindex) }) // Round up per ARI spec
      }, 500)
    }
    calculateReadabilityScore()
    calculateWordDensity()
    quill.on("text-change", calculateWordDensity)
    quill.on("text-change", calculateReadabilityScore)
    return () => {
      quill.off("text-change", calculateReadabilityScore)
      if (ariTimer.current) clearTimeout(ariTimer.current)
      ariTimer.current = null
      quill.off("text-change", calculateWordDensity)
      if (dialogueDensityTimer.current)
        clearTimeout(dialogueDensityTimer.current)
      dialogueDensityTimer.current = null
    }
  }, [words])
  // Effect to apply highlighting whenever rules change or the callback updates
  useEffect(() => {
    if (quillRef.current) {
      applyHighlightsCB(quillRef.current)
    }
  }, [Rules.getRules(), applyHighlightsCB])

  // Return editor div ref, current word count, and text content getter
  return {
    editorRef,
    words,
    text: quill?.getText(),
    loading,
    lix,
    dialogueDensity,
  }
}
