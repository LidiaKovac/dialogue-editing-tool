import { useCallback, useEffect, useRef, useState } from "react";
import { useQuillSingleton } from "./editor-singleton.hooks";
import type QuillType from "quill";
import { registerDialogueBlot } from "../utils/DialogueBlot.class";
import { QuillOptions } from "quill";
import { applyHighlights } from "../utils";
import Rules from "../utils/regex.utils";
import { quillOptions } from "@/app/lib/quill/quill.options";
import { registerAdvBlot } from "../utils/AdverbBlot.class";

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
  const [words, setWords] = useState<number>(0);

  // Ref to the editor container div
  const editorRef = useRef<HTMLDivElement | null>(null);
  // Ref to Quill editor instance
  const quillRef = useRef<QuillType | null>(null);
  // Ref holding timer ID for delayed highlight application to debounce rapid typing
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  // Ref holding timer ID for debounced word count updates
  const wordCountTime = useRef<NodeJS.Timeout>(null);
  // Flag to track whether Quill instance was created
  const isQuillCreated = useRef(false);
  // Shared singleton Quill instance and setter method from custom hook
  const { quill, setQuill } = useQuillSingleton();


  const isApplyingHighlights = useRef(false);
  // Memoized callback to apply syntax highlights using rules
  const applyHighlightsCB = useCallback(
    async (quill: QuillType | null) => applyHighlights(quill, Rules.getRules()),
    [quill, Rules.getRules()]
  );

  // Effect to initialize Quill editor when the component mounts and editorRef is assigned
  useEffect(() => {
    if (!editorRef.current) return;

    let isMounted = true;
    isQuillCreated.current = true;

    import("quill")
      .then(({ default: Quill }) => {
        if (!isMounted || !editorRef.current) return;

        // Register custom highlight blot for rich text highlighting
        registerDialogueBlot(Quill);
        registerAdvBlot(Quill);

        // Initialize Quill instance with provided options
        initializeQuill(Quill, quillOptions);
      })
      .catch(console.error);

    // Cleanup function runs on unmount - reset flag and perform cleanup
    return () => {
      isMounted = false;
      cleanUp();
    };
  }, [setQuill]);

  /**
   * Initializes the Quill editor on the target container with options.
   * Sets up event listeners and triggers initial highlight application.
   *
   * @param {typeof QuillType} Quill - The Quill editor class.
   * @param {QuillOptions} options - Configuration options for Quill.
   */
  function initializeQuill(Quill: typeof QuillType, options: QuillOptions) {
    const quill = new Quill(editorRef.current!, options);
    setQuill(quill);
    quillRef.current = quill;

    // Disable native spellcheck while editing
    quill.root.setAttribute("spellcheck", "false");

    // Apply highlights shortly after editor is initialized
    setTimeout(() => applyHighlightsCB(quillRef.current), 100);

    // Listen for user text changes to trigger re-highlighting with debounce
    quill.on("text-change", onTextChange);
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
    if (source !== "user") return;
if (isApplyingHighlights.current) return; // Prevent recursive highlights
    if (highlightTimer.current) clearTimeout(highlightTimer.current);

    highlightTimer.current = setTimeout(() => {
      if (quillRef.current) {
        isApplyingHighlights.current = true;
        applyHighlightsCB(quillRef.current).finally(() => isApplyingHighlights.current = false);
      }
    }, 500);
  }

  /**
   * Cleans up editor instance and event subscriptions.
   * Called on component unmount to prevent memory leaks.
   */
  function cleanUp() {
    setQuill(null);

    if (highlightTimer.current) {
      clearTimeout(highlightTimer.current);
      highlightTimer.current = null;
    }

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    if (quillRef.current) {
      quillRef.current.off("text-change", onTextChange);
      quillRef.current = null;
    }
  }

  // Effect to update word count with debounce whenever editor text changes
  useEffect(() => {
    if (!quill) return;

    // Debounced function to count words and update state
    const updateWordCount = () => {
      if (wordCountTime.current) clearTimeout(wordCountTime.current);
      wordCountTime.current = setTimeout(() => {
        const text = quill.getText();
        const count = text.trim().split(/\s+/).filter(Boolean).length;
        setWords(count);
      }, 500);
    };

    updateWordCount();
    quill.on("text-change", updateWordCount);

    return () => {
      quill.off("text-change", updateWordCount);
      if (wordCountTime.current) clearTimeout(wordCountTime.current);
      wordCountTime.current = null;
    };
  }, [quill]);

  // Effect to apply highlighting whenever rules change or the callback updates
  useEffect(() => {
    if (quillRef.current) {
      applyHighlightsCB(quillRef.current);
    }
  }, [Rules.getRules(), applyHighlightsCB]);

  // Return editor div ref, current word count, and text content getter
  return { editorRef, words, text: quill?.getText() };
};
