"use client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import {
  BtnBold,
  BtnItalic,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

export default function Home() {
  const [html, setHTML] = useState<string>("");
  const [wordCounter, setWordCounter] = useState<number>(0);
  const onChange = (e: ContentEditableEvent) => {
    const stripped = e.target.value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    setWordCounter(stripped.split(" ").length);
    setHTML(e.target.value);
  };
  return (
    <EditorProvider>
      <Editor value={html} onChange={onChange} className="text-white-500">
        <Toolbar>
          <BtnBold />
          <BtnItalic />
        </Toolbar>
      </Editor>

      <small className={wordCounter > 5000 ? "text-red-500" : ""}>Words: {wordCounter} / 5k</small>

    </EditorProvider>
  );
}
