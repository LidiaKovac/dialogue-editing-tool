import { QuillOptions } from "quill";

export const quillOptions: QuillOptions = {
  theme: "snow",

  readOnly: false,
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