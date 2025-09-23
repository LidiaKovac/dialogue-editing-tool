"use client"
import { ChangeEventHandler, useRef } from "react"
import Rules from "../../utils/regex.utils"
import { applyHighlights } from "../../utils"
import { useQuillSingleton } from "../../hooks/editor.hooks"

export const Options = () => {
  const { quill } = useQuillSingleton()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null) // Fixed: use ref for timeout
  const handleCharChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      Rules.setCharacters(
        e.target.value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
      console.log("going")

      if (quill) {
        applyHighlights(quill, Rules.getRules())
      }
      timeoutRef.current = null
    }, 150)
  }

  const handleTagsChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      Rules.setDialogueTags(
        e.target.value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
      console.log("going")
      if (quill) {
        applyHighlights(quill, Rules.getRules())
      }
      timeoutRef.current = null
    }, 150)
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
          placeholder="Emily, Dean, Sam, John, he, she, they"
        ></textarea>
      </div>
      <h4>Dialogue tags</h4>
      <div className="textarea__wrap">
        <textarea
          rows={5}
          defaultValue={Rules.DIALOGUE_TAGS.join(", ")}
          onChange={handleTagsChange}
          placeholder="said, asked, replied, whispered, shouted"
        ></textarea>
      </div>
      {/* <button>Apply</button> */}
    </div>
  )
}
