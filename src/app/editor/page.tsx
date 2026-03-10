"use client"
import dynamic from "next/dynamic"
import "./editor.scss"
const Options = dynamic(
  () => import("./components/Options/Options.component").then((m) => m.Options),
  { loading: () => <div>Loading options...</div>, ssr: false }
)
const RulesCollapsable = dynamic(
  () =>
    import("../components/Rules/Rules.component").then(
      (m) => m.RulesCollapsable
    ),
  { loading: () => <div>Loading rules...</div>, ssr: false }
)
const FalsePositives = dynamic(
  () =>
    import("../components/FalsePositives/FalsePositives.component").then(
      (m) => m.FalsePositives
    ),
  { loading: () => <div>Loading false positives...</div>, ssr: false }
)
const Editor = dynamic(() => import("./components/Editor/Editor.component"), {
  loading: () => <div>Loading editor...</div>,
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex items-start gap-4 mt-10">
      <Editor />
      <Options />
    </main>
  )
}
