import { QuillOptions } from "quill";

export const quillOptions: QuillOptions = {
  theme: "snow",
  modules: {
    toolbar: [["bold", "italic", "underline", "strike"]],
  },
  readOnly: false,
  formats: ["bold", "italic", "underline", "strike", "highlight", "adv_highlight"],
};
