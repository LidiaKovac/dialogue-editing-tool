import { useEffect, useRef, useState } from "react";
import { useQuillSingleton } from "./editor-singleton.hooks";
import type QuillType from "quill";
import { registerBlot } from "../utils/HighlightBlot.class";
import { QuillOptions } from "quill";
import Rules from "../utils/regex.utils";

/**
 * Custom React hook for managing a Quill rich text editor
 * with non-blocking text highlighting using a Web Worker.
 *
 * @returns {Object} - Contains refs and word count for the Quill editor instance
 * @property {React.RefObject<HTMLDivElement>} editorRef - Reference for the editor DOM element
 * @property {number} words - Current word count in the editor
 * @property {string | undefined} text - Current text content of the editor
 */
export const useQuillEditor = () => {
  // Tracks the editor's word count
  const [words, setWords] = useState<number>(0);
  // Ref to the editor DOM element
  const editorRef = useRef<HTMLDivElement | null>(null);
  // Ref to the Quill editor instance
  const quillRef = useRef<QuillType | null>(null);
  // Ref to the debounce timer for highlighting
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  // Ref to the Web Worker instance
  const workerRef = useRef<Worker | null>(null);
  // Internal flag for controlling Quill instance creation
  const isQuillCreated = useRef(false);
  // Provided by shared quill singleton hook
  const { quill, setQuill } = useQuillSingleton();

  /**
   * Sets up the Web Worker for background text analysis.
   * Cleans up the worker on unmount.
   */
  useEffect(() => {
    // Initialize the worker (ensure correct loader/config in your bundler)
    workerRef.current = new Worker("../../utils/analyze.ts");
    /**
     * Handles highlight ranges received from the worker and applies them to the editor.
     */
    const handleWorkerMessage = (
      event: MessageEvent<{ start: number; length: number }[]>
    ) => {
      const highlights = event.data;
      if (!quillRef.current) return;
      const quill = quillRef.current;

      // Remove any previous highlight attributes in the editor's contents
      const currentContents = quill.getContents();
      const newDelta = {
        ops: currentContents.ops.map((op) => {
          if (
            op.insert &&
            typeof op.insert === "string" &&
            op.attributes?.highlight
          ) {
            const attrs = { ...op.attributes };
            delete attrs.highlight;
            return {
              insert: op.insert,
              attributes: Object.keys(attrs).length ? attrs : undefined,
            };
          }
          return op;
        }),
      };
      quill.setContents(newDelta.ops, "silent");

      // Apply new highlights as specified by the worker
      highlights.forEach(({ start, length }) => {
        quill.formatText(start, length, "highlight", true, "silent");
      });
    };

    // Attach worker message listener
    workerRef.current.addEventListener("message", handleWorkerMessage);

    // Cleanup on unmount
    return () => {
      workerRef.current?.removeEventListener("message", handleWorkerMessage);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  /**
   * Handles Quill library dynamic import and editor initialization.
   */
  useEffect(() => {
    if (!editorRef.current) return;

    let isMounted = true;
    isQuillCreated.current = true;

    import("quill")
      .then(({ default: Quill }) => {
        if (!isMounted || !editorRef.current) return;

        // Register any custom Quill blots (formats)
        registerBlot(Quill);

        // Quill editor configuration
        const quillOptions: QuillOptions = {
          theme: "snow",
          modules: {
            toolbar: [["bold", "italic", "underline", "strike"]],
          },
          readOnly: false,
          formats: ["bold", "italic", "underline", "strike", "highlight"],
        };

        // Create and set the Quill instance
        initializeQuill(Quill, quillOptions);
      })
      .catch(console.error);

    return () => {
      isMounted = false;
      cleanUp();
    };
  }, [setQuill]);

  /**
   * Initializes the Quill editor instance, sets up initial highlights and event listeners.
   * @param {typeof QuillType} Quill - The imported Quill constructor
   * @param {QuillOptions} options - Quill editor configuration options
   */
  function initializeQuill(Quill: typeof QuillType, options: QuillOptions) {
    const quill = new Quill(editorRef.current!, options);
    setQuill(quill);
    quillRef.current = quill;
    quill.root.setAttribute("spellcheck", "false");
    // Listen for any text changes in the editor
    quill.on("text-change", onTextChange);
    // Trigger initial highlighting after the editor loads
    setTimeout(() => {
      triggerWorkerHighlight();
    }, 100);
  }

  /**
   * Handles text changes in the editor, debouncing worker highlight calls.
   */
  function onTextChange(delta: any, oldDelta: any, source: string) {
    // Always trigger for any text change
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(triggerWorkerHighlight, 300);
  }

  /**
   * Sends the current text and regex patterns to the worker for highlight analysis.
   */
  function triggerWorkerHighlight() {
    if (quillRef.current && workerRef.current) {
      const text = quillRef.current.getText();
      const patterns = Rules.getRules().map((rule) => ({
        id: rule.id,
        regexString: rule.regex.source,
      }));
      workerRef.current.postMessage({ text, patterns });
    }
  }

  /**
   * Cleans up the Quill editor instance, event handlers, and timers.
   */
  function cleanUp() {
    setQuill(null);
    if (highlightTimer.current) {
      clearTimeout(highlightTimer.current);
      highlightTimer.current = null;
    }
    if (editorRef.current) editorRef.current.innerHTML = "";
    if (quillRef.current) {
      quillRef.current.off("text-change", onTextChange);
      quillRef.current = null;
    }
  }

  /**
   * Updates and tracks word count whenever the editor's text changes.
   */
  useEffect(() => {
    if (!quill) return;
    const updateWordCount = () => {
      const text = quill.getText();
      const count = text.trim().split(/\s+/).filter(Boolean).length;
      setWords(count);
    };
    updateWordCount();
    quill.on("text-change", updateWordCount);
    return () => {
      quill.off("text-change", updateWordCount);
    };
  }, [quill]);

  // DO NOT call applyHighlights directly; everything goes through the worker.

  return { editorRef, words, text: quill?.getText() };
};
