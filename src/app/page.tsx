import Editor from "./features/Editor/components/Editor/Editor.component"
import { RulesCollapsable } from "./components/Rules/Rules.component"
import { Options } from "./features/Editor/components/Options/Options.component"
import { FalsePositives } from "./components/FalsePositives/FalsePositives.component"

export default function Home() {
  return (
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
          <FalsePositives />
        </header>
        <div className="editor__wrap">
          <Editor />
        </div>
      </div>
      <Options />
    </main>
  )
}
