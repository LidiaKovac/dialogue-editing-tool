import { ChangeEventHandler } from "react"
import Rules from "../../utils/regex.utils"

export const Options = () => {
  let timeout: NodeJS.Timeout | null = null
  const handleCharChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (timeout) {
      clearTimeout(timeout)
    } else {
      timeout = setTimeout(() => {
        Rules.setCharacters(e.target.value.split(",").map((t) => t.trim()))
      }, 150)
    }
  }

  const handleTagsChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (timeout) {
      clearTimeout(timeout)
    } else {
      timeout = setTimeout(() => {
        Rules.setCharacters(e.target.value.split(",").map((t) => t.trim()))
      }, 150)
    }
  }
  return (
    <div className="editor__options">
      <h3 className="text-xl"> Options </h3>
      <h4>Character names</h4>
      <div className="textarea__wrap">
        <textarea
          rows={5}
          defaultValue={Rules.CHARACTERS.join(", ")}
          onChange={handleCharChange}
        ></textarea>
      </div>
      <h4>Dialogue tags</h4>
      <div className="textarea__wrap">
        <textarea
          rows={5}
          defaultValue={Rules.DIALOGUE_TAGS.join(", ")}
          onChange={handleTagsChange}
        ></textarea>
      </div>
      <button>Apply</button>
    </div>
  )
}
