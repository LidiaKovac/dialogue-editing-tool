import { useCallback, useEffect, useRef, useState } from "react";
import { useQuillSingleton } from "./editor-singleton.hooks";
import type QuillType from "quill";
import { registerBlot } from "../utils/HighlightBlot.class";
import { QuillOptions } from "quill";
import { applyHighlights } from "../utils";
import Rules from "../utils/regex.utils";
import { quillOptions } from "@/app/lib/quill/quill.options";

export const useQuillEditor = () => {
  const [words, setWords] = useState<number>(0);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<QuillType | null>(null);
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  const isQuillCreated = useRef(false);
  const { quill, setQuill } = useQuillSingleton();

  const applyHighlightsCB = useCallback(
    async (quill: QuillType | null) => applyHighlights(quill, Rules.getRules()),
    [quill, Rules.getRules()]
  );

  useEffect(() => {
    if (!editorRef.current) return;

    let isMounted = true;
    isQuillCreated.current = true;

    import("quill")
      .then(({ default: Quill }) => {
        if (!isMounted || !editorRef.current) return;

        registerBlot(Quill);

        initializeQuill(Quill, quillOptions);
      })
      .catch(console.error);

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
    setTimeout(() => applyHighlightsCB(quillRef.current), 100);

    quill.on("text-change", onTextChange);
  }

  function onTextChange(delta: any, oldDelta: any, source: string) {
    if (source !== "user") return;

    if (highlightTimer.current) clearTimeout(highlightTimer.current);

    highlightTimer.current = setTimeout(() => {
      if (quillRef.current) {
        applyHighlightsCB(quillRef.current);
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
      applyHighlightsCB(quillRef.current);
    }
  }, [Rules.getRules(), applyHighlightsCB]);

  return { editorRef, words, text: quill?.getText() };
};
