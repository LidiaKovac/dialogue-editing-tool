"use client"
import Link from "next/link"
import { Toggle } from "../Toggle/Toggle.component"
import { useOptions } from "./options.hook"
import { useQuillEditor } from "../../hooks/editor-init.hooks"
import { ToolTip } from "@/app/components/Tooltip/Tooltip.component"

export const Options = () => {
  const {
    chars,
    handleCharChange,
    tags,
    handleTagsChange,
    enableAdv,
    setEnableAdv,
  } = useOptions()
  const { lix } = useQuillEditor()
  const getAriLabel = () => {
    switch (lix?.ari) {
      case 1:
        return "Kindergarten"
      case 2:
        return "First grade"
      case 3:
        return "Second grade"
      case 4:
        return "Third grade"
      case 5:
        return "Fourth grade"
      case 6:
        return "Fifth grade"
      case 7:
      case 8:
      case 9:
        return "Middle school"
      case 10:
      case 11:
      case 12:
      case 13:
        return "High school"
      case 14:
        return "College / University"
      default:
        "Invalid ARI score"
    }
  }

  const getLIXLabel = () => {
    if (!lix) return "Invalid LIX score"
    if (lix?.lix <= 25) {
      return "Children level"
    }
    if (lix?.lix <= 30) {
      return "Simple text"
    }
    if (lix?.lix <= 40) {
      return "Fiction level"
    }
    if (lix?.lix <= 50) {
      return "Informative text"
    }
    if (lix?.lix <= 60) {
      return "Non fiction text"
    }
    return "Scientific text"
  }

  return (
    <div className="editor__options" tabIndex={0}>
      <h3>Readability scores</h3>
      {lix && (
        <>
          ARI{" "}
          <ToolTip
            data={
              "Automated Readability Index, approximate representation of the US grade level needed to comprehend the text."
            }
          />
          : {lix.ari} - {getAriLabel()} <br />
          LIX{" "}
          <ToolTip
            data={
              "Läsbarhetsindex, based on number of sentences and number of words, with particular weight on long words."
            }
          />
          : {lix.lix} - {getLIXLabel()}
        </>
      )}
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
}
