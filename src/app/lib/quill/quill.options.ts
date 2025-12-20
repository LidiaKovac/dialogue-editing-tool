import { QuillOptions } from "quill";

export const quillOptions: QuillOptions = {
  theme: "snow",
  modules: {
    toolbar: [["bold", "italic", "underline", "strike"]],
  },
  readOnly: false,
  formats: ["bold", "italic", "underline", "strike", "highlight", "adv_highlight"],
};


export const QUILL_DEBOUNCE_TIMER = 1000