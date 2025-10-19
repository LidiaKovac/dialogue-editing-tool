import { useEffect, useRef, useState } from "react";
import { useQuillSingleton } from "./editor-singleton.hooks";
import type QuillType from "quill";
import { registerBlot } from "../utils/HighlightBlot.class";
import { QuillOptions } from "quill";
import { applyHighlights, buildHighlightDelta } from "../utils";
import Rules from "../utils/regex.utils";

export const useQuillEditor = () => {
  const [words, setWords] = useState<number>(0);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<QuillType | null>(null);
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  const isQuillCreated = useRef(false);
  const worker = useRef<Worker>(null);
  const { quill, setQuill } = useQuillSingleton();

  useEffect(() => {
    if (!editorRef.current) return;
    worker.current = new Worker(
      new URL("../utils/analyze.ts", import.meta.url)
    );
    let isMounted = true;
    isQuillCreated.current = true;

    import("quill")
      .then(({ default: Quill }) => {
        if (!isMounted || !editorRef.current) return;

        registerBlot(Quill);

        const quillOptions: QuillOptions = {
          theme: "snow",
          modules: {
            toolbar: [["bold", "italic", "underline", "strike"]],
          },
          readOnly: false,
          formats: ["bold", "italic", "underline", "strike", "highlight"],
        };

        initializeQuill(Quill, quillOptions);
      })
      .catch(console.error);
    const handleWorkerMsg = (
      e: MessageEvent<{
        textLength: number;
        highlights: { start: number; length: number }[];
      }>
    ) => {
      buildHighlightDelta(e.data.textLength, e.data.highlights).then(
        (delta) => {
          quillRef.current?.updateContents(delta, "silent");
        }
      );
    };

    worker.current?.addEventListener("message", handleWorkerMsg);
    return () => {
      isMounted = false;
      cleanUp();
    };
  }, [setQuill]);

  function initializeQuill(Quill: typeof QuillType, options: QuillOptions) {
    const quill = new Quill(editorRef.current!, options);
    setQuill(quill);
    quillRef.current = quill;

    quill.root.setAttribute("spellcheck", "false");

    // Delay to ensure highlights apply after initialization
    setTimeout(
      () => applyHighlights(worker.current!, quill, Rules.getRules()),
      100
    );

    quill.on("text-change", onTextChange);
  }

  function onTextChange(delta: any, oldDelta: any, source: string) {
    if (source !== "user") return;

    if (highlightTimer.current) clearTimeout(highlightTimer.current);

    highlightTimer.current = setTimeout(() => {
      if (quillRef.current) {
        applyHighlights(worker.current!, quillRef.current, Rules.getRules());
      }
    }, 500);
  }

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
    worker.current?.terminate();
    // worker.current?.removeEventListener("message", handleWorkerMsg);
  }

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

  useEffect(() => {
    if (quillRef.current) {
      applyHighlights(worker.current!, quillRef.current, Rules.getRules());
    }
  }, [Rules.getRules()]);

  return { editorRef, words, text: quill?.getText() };
};
