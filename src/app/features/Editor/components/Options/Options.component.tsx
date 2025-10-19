"use client"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import Rules from "../../utils/regex.utils"
import { applyHighlights } from "../../utils"
import { useQuillSingleton } from "../../hooks/editor-singleton.hooks"
import { useQuillEditor } from "../../hooks/editor-init.hooks"

export const Options = () => {
  const [chars, setChars] = useState<string>(Rules.CHARACTERS.join(", "))
  const [tags, setTags] = useState<string>(Rules.DIALOGUE_TAGS.join(", "))
  const { quill } = useQuillSingleton()
  const {workerRef} = useQuillEditor()
  // Separate timeout refs for each input
  const charTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tagTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    Rules.subscribeToChars(handleChars)
  }, [quill, workerRef.current])

  const handleChars = (cs: string[]) => {
    setChars(cs.join(", "))
    if (quill && workerRef.current) {
      console.log("My dude is firing")
      applyHighlights(workerRef.current, quill, Rules.getRules())
    }
  }

  const handleCharChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setChars(e.target.value)

    if (charTimeoutRef.current) {
      clearTimeout(charTimeoutRef.current)
    }

    charTimeoutRef.current = setTimeout(() => {
      const newChars = e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      Rules.setCharacters(newChars)

      if (quill && workerRef.current) {
        applyHighlights(workerRef.current, quill, Rules.getRules())
      }
      charTimeoutRef.current = null
    }, 500)
  }

  const handleTagsChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTags(e.target.value)

    if (tagTimeoutRef.current) {
      clearTimeout(tagTimeoutRef.current)
    }

    tagTimeoutRef.current = setTimeout(() => {
      const newTags = e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      Rules.setDialogueTags(newTags)

      if (quill && workerRef.current) {
        applyHighlights(workerRef.current, quill, Rules.getRules())
      }
      tagTimeoutRef.current = null
    }, 500)
  }
  return (
    <div className="editor__options">
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
          placeholder="Emily, Dean, Sam, John, he, she, they"
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
      {/* <button>Apply</button> */}
    </div>
  )
}
