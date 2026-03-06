"use client"
import Link from "next/link"
import { Toggle } from "../Toggle/Toggle.component"
import { useQuillEditor } from "../../hooks/quill/editor-init.hooks"
import { ToolTip } from "@/app/components/Tooltip/Tooltip.component"
import { Metrics } from "./components/Metrics.component"

export const Options = () => {
  const {
    lix,
    dialogueDensity,
    options: {
      chars,
      handleCharChange,
      tags,
      handleTagsChange,
      enableAdv,
      setEnableAdv,
    },
  } = useQuillEditor()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAdvChange = (checked: any) => {
    setEnableAdv(checked)
  }
  return (
    <div className="editor__options" tabIndex={0}>
      <Metrics dialogueDensity={dialogueDensity} lix={lix} />
      <h3 className="text-xl mt-3"> Options </h3>
      <h4>
        <label htmlFor="characters">
          Character names
          <ToolTip
            data={
              "This is not perfect. Some names that are also nouns (e.g. Dean, which could be Dean Winchester or the Dean of a school), might not be recognized. Feel free to add them manually."
            }
          />
        </label>
      </h4>
      <div className="textarea__wrap">
        <textarea
          rows={5}
          value={chars}
          name="characters"
          onChange={handleCharChange}
          placeholder="he, she, they"
        ></textarea>
      </div>
      <h4>
        <label htmlFor="tags">Dialogue tags</label>
      </h4>
      <div className="textarea__wrap">
        <textarea
          rows={5}
          name="tags"
          value={tags}
          onChange={handleTagsChange}
          placeholder="said, asked, replied, whispered, shouted"
        ></textarea>
      </div>
      <div className="features">
        <Toggle
          checked={enableAdv}
          label="Highlight Adverbs"
          onChange={handleAdvChange}
        />
      </div>
      <Link
        className="inline-block mt-5 option-cta-btn hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        href={"https://form.typeform.com/to/OEauYMEz"}
        target="blank"
      >
        Report a bug 🪲🐛{" "}
      </Link>
      <div className="donate mt-5 ">Like the app? </div>
      <Link
        href={"https://ko-fi.com/lidiacodes"}
        target="blank"
        className="inline-block mt-2 option-cta-btn hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Buy me a coffee ☕🍵
      </Link>
      {/* <button>Apply</button> */}
    </div>
  )
}
