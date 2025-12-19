import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useQuillSingleton } from "../../hooks/quill/editor-singleton.hooks";
import type QuillType from "quill";
import { applyHighlights } from "../../utils/highlights/highlights.utils";
import Rules from "../../utils/regex/regex.utils";

export const useOptions = () => {
  const [chars, setChars] = useState<string>(Rules.CHARACTERS.join(", "));
  const [tags, setTags] = useState<string>(Rules.DIALOGUE_TAGS.join(", "));
  const [enableAdv, setEnableAdv] = useState<boolean>(true)
  const { quill } = useQuillSingleton();
  const applyHighlightsCB = useCallback(
    async (quill: QuillType) => applyHighlights(quill, Rules.getRules(), enableAdv),
    [quill]
  );

  useEffect(() => {
    if(quill)
      applyHighlights(quill, Rules.getRules(), enableAdv)
  }, [enableAdv]) 

  const charTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tagTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    Rules.subscribeToChars(handleChars);
  }, [quill]);

  const handleChars = (cs: string[]) => {
    setChars(cs.join(", "));
    if (quill) {
      applyHighlightsCB(quill);
    }
  };

  const handleCharChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setChars(e.target.value);

    if (charTimeoutRef.current) {
      clearTimeout(charTimeoutRef.current);
    }

    charTimeoutRef.current = setTimeout(() => {
      const newChars = e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      Rules.setCharacters(newChars);

      if (quill) {
        applyHighlights(quill, Rules.getRules(), enableAdv);
      }
      charTimeoutRef.current = null;
    }, 500);
  };

  const handleTagsChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTags(e.target.value);

    if (tagTimeoutRef.current) {
      clearTimeout(tagTimeoutRef.current);
    }

    tagTimeoutRef.current = setTimeout(() => {
      const newTags = e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      Rules.setDialogueTags(newTags);

      if (quill) {
        applyHighlights(quill, Rules.getRules(), enableAdv);
      }
      tagTimeoutRef.current = null;
    }, 500);
  };

  return {chars, handleCharChange,tags, handleTagsChange, enableAdv, setEnableAdv}
};
