"use client"
import Link from "next/link"
import { Toggle } from "../Toggle/Toggle.component"
import { useOptions } from "./options.hook"

export const Options = () => {
  const {
    chars,
    handleCharChange,
    tags,
    handleTagsChange,
    enableAdv,
    setEnableAdv,
  } = useOptions()
  return (
    <div className="editor__options" tabIndex={0}>
      <h3 className="text-xl"> Options </h3>
      <h4>
        <label htmlFor="characters"> Character names</label>
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
          label="Highlight Adverbs"
          checked={enableAdv}
          onChange={setEnableAdv}
        />
      </div>
      <Link
        className="inline-block mt-5 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        href={"https://form.typeform.com/to/OEauYMEz"}
        target="blank"
      >
        Report a bug 🪲🐛{" "}
      </Link>
      <div className="donate mt-5 ">Like the app? </div>
      <Link
        href={"https://ko-fi.com/lidiacodes"}
        target="blank"
        className="inline-block mt-2 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Buy me a coffee ☕🍵
      </Link>
      {/* <button>Apply</button> */}
    </div>
  )
};
