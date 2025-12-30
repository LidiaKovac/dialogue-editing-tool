import dynamic from "next/dynamic"
import "./editor.scss"
const Options = dynamic(
  () => import("./components/Options/Options.component").then((m) => m.Options),
  { loading: () => <div>Loading options...</div> }
)
const RulesCollapsable = dynamic(
  () =>
    import("../components/Rules/Rules.component").then(
      (m) => m.RulesCollapsable
    ),
  { loading: () => <div>Loading rules...</div> }
)
const FalsePositives = dynamic(
  () =>
    import("../components/FalsePositives/FalsePositives.component").then(
      (m) => m.FalsePositives
    ),
  { loading: () => <div>Loading false positives...</div> }
)
const Editor = dynamic(() => import("./components/Editor/Editor.component"), {
  loading: () => <div>Loading editor...</div>,
})
export default function Home() {
  return (
    <main className="flex gap-4">

      <Editor />
      <Options />
    </main>
  )
}
