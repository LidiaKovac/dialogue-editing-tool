"use client"
import { Toggle } from "../Toggle/Toggle.component";
import { useOptions } from "./options.hook";

export const Options = () => {
  const { chars, handleCharChange, tags, handleTagsChange, enableAdv, setEnableAdv } = useOptions()


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
      {/* <button>Apply</button> */}
    </div>
  )
};
