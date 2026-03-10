import { QuillOptions } from "quill";

export const quillOptions: QuillOptions = {
  theme: "snow",
  modules: {
  },
  readOnly: false,
  placeholder: "Start typing your dialogue here...",
  formats: [
    "bold",
    "italic",
    "underline",
    "strike",
    "highlight",
    "adv_highlight",
    "sdt_highlight",
  ],
}


export const QUILL_DEBOUNCE_TIMER = 1000