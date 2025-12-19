import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import Rules from "../../utils/regex/regex.utils"

export const useOptions = () => {
  const [chars, setChars] = useState<string>(Rules.CHARACTERS.join(", "))
  const [tags, setTags] = useState<string>(Rules.DIALOGUE_TAGS.join(", "))
  const [enableAdv, setEnableAdv] = useState<boolean>(true)

  const charTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tagTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handleChars = useCallback((cs: string[]) => {
    setChars(cs.join(", "))
  }, [])
  let mountCount = 0

  useEffect(() => {
    Rules.subscribeToChars(handleChars)
  }, [handleChars])


  const handleCharChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setChars(e.target.value)
    const value = e.target.value

    if (charTimeoutRef.current) {
      clearTimeout(charTimeoutRef.current)
    }

    charTimeoutRef.current = setTimeout(() => {
      const newChars = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      Rules.setCharacters(newChars)

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

      tagTimeoutRef.current = null
    }, 500)
  }

  return {
    chars,
    handleCharChange,
    tags,
    handleTagsChange,
    enableAdv,
    setEnableAdv,
  }
}
