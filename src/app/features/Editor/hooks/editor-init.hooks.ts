import { useEffect, useRef, useState } from "react";
import { useQuillSingleton } from "./editor-singleton.hooks";
import type QuillType from "quill";
import { registerBlot } from "../utils/HighlightBlot.class";
import { QuillOptions } from "quill";
import { applyHighlights } from "../utils";
import Rules from "../utils/regex.utils";

export const useQuillEditor = () => {
  const [words, setWords] = useState<number>(0);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<QuillType | null>(null);
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  const isQuillCreated = useRef(false);

  const { quill, setQuill } = useQuillSingleton();

  useEffect(() => {
    if (!editorRef.current) return;
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

        const quill = new Quill(editorRef.current, quillOptions);
        setQuill(quill);
        quillRef.current = quill;
        quillRef.current.root.setAttribute("spellcheck", "false");

        setTimeout(() => {
          applyHighlights(quill, Rules.getRules());
        }, 100);

        quill.on("text-change", (delta, oldDelta, source) => {
          if (source === "user") {
            if (highlightTimer.current) clearTimeout(highlightTimer.current);
            highlightTimer.current = setTimeout(() => {
              applyHighlights(quill, Rules.getRules());
            }, 300);
          }
        });
      })
      .catch(console.error);

    return () => {
      isMounted = false;
      setQuill(null);
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current);
        highlightTimer.current = null;
      }
      if (editorRef.current) editorRef.current.innerHTML = "";
      quillRef.current = null;
    };
  }, [setQuill]);
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
      applyHighlights(quillRef.current, Rules.getRules());
    }
  }, [Rules.getRules()]);
  return { editorRef, words, text: quill?.getText() };
};
