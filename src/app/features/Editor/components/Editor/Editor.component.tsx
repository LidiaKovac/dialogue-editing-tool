"use client";
import "quill/dist/quill.snow.css";
import { useQuillEditor } from "../../hooks/editor-init.hooks";
import { useEffect, useState } from "react";
import Rules from "../../utils/regex.utils";
import { STOP_WORDS } from "../../utils";

export default function Editor() {
  const { editorRef, words, text } = useQuillEditor();
  const [names, setNames] = useState<Map<string, number>>(new Map());
  useEffect(() => {
    if (!text) return;

    // const regex = /(?<=^|[\.\!?\:"“”\n]\s)[A-Z][a-zA-Z]+/g;
    const regex = /[A-Z][a-zA-Z]+/g;
    const stopWords = new Set(STOP_WORDS);

    const matches = text.match(regex) || [];
    const filteredNames = matches.filter((name) => !stopWords.has(name));

    const nameMap = new Map();
    filteredNames.forEach((name) => {
      nameMap.set(name, (nameMap.get(name) || 0) + 1);
    });
    console.log(nameMap);
    setNames(nameMap);
  }, [text]);
  return (
    <div>
      <div
        ref={editorRef}
        role="textbox"
        aria-label="Dialogue text editor"
        aria-multiline="true"
        tabIndex={0}
      />
      <small>
        Words: {words} / 30k{" "}
        {words > 30_000 && (
          <span>
            Warning, text over 30k words might make the app slow. Consider
            editing fewer words at the time.
          </span>
        )}
      </small>
    </div>
  );
}
