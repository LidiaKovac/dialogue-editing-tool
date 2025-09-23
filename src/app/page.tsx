<<<<<<< Updated upstream
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
=======
"use client"
import Editor from "./features/Editor/components/Editor/Editor.component"
import { useRef, useState } from "react"
import Rules from "./features/Editor/utils/regex.utils"
import { RulesCollapsable } from "./components/Rules/Rules.component"
import { Options } from "./features/Editor/components/Options/Options.component"
>>>>>>> Stashed changes

export default function Home() {
  const [html, setHTML] = useState<string>("");
  const [wordCounter, setWordCounter] = useState<number>(0);
  const onChange = (e: ContentEditableEvent) => {
    const stripped = e.target.value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    setWordCounter(stripped.split(" ").length);
    setHTML(e.target.value);
  };
  return (
<<<<<<< Updated upstream
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
=======
    <main className="flex gap-4">
      <div className="editor">
        <header>
          <h1>The Dialogue Thing</h1>
          <p>
            Paste your chapter in the area below ⬇️ and see everything that
            doesn&apos;t match the default dialogue rules.
          </p>
          <small>
            💡 Tip: when pasting back to google docs, use CTRL+SHIFT+V, or
            &quot;Paste without formatting&quot;
          </small>
          <RulesCollapsable />
          <details>
            <summary>On false positives</summary>
            <div className="callout">
              This is an AI-free tool. It&apos;s based on pattern recognition
              and it is not infallible. This means it can create false
              positives. <br /> For example, this phrase would be marked like
              this:
              <blockquote>
                “Emily,” Dean said, “can you cut it out with the bitch act{" "}
                <span>?” She turned </span>towards Dean, a hint of surprise in
                her eyes.
              </blockquote>
              This is a false positive. The phrase is said by Dean, so the word
              &quot;she&quot; is <i>supposed</i> to be capitalized.
              <br />
              Remember: you know your work better than a bunch of computerized
              rules! 💕
            </div>
          </details>
        </header>
        <div className="editor__wrap">
          <Editor />
        </div>
      </div>
      <Options />
    </main>
  )
>>>>>>> Stashed changes
}
