"use client"
import "quill/dist/quill.snow.css"
import { useQuillEditor } from "../../hooks/editor-init.hooks"
import { useEffect, useMemo, useState } from "react"
import Rules from "../../utils/regex.utils"

export default function Editor() {
  const { editorRef, words, text } = useQuillEditor()
const [names, setNames] = useState([]);

useEffect(() => {
  if (!text) return; // guard clause if text is empty

  const fetchNames = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "api", {
      method: "POST",
      body: text,
    });
    const result = await res.json();
    setNames(result);
  };

  fetchNames();
}, [text]);
useEffect(() => {
  if(!names) return 
  Rules.setCharacters(names)
}, [names])
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
  )
}
