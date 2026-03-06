import type QuillType from "quill"

  export const registerAdvBlot = (Quill: typeof QuillType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Inline:any = Quill.import("blots/inline") 

  class HighlightBlotAdverb extends Inline {
    static readonly blotName = "adv_highlight"
    static readonly tagName = "SPAN"
    static readonly className = "adv-highlight"

    static create(value: boolean | string) {
      const node = super.create()
      if (value) {
        node.dataset.adv_highlight = "true"
      }
      return node
    }

    static formats(domNode: HTMLElement) {
      return domNode.dataset.adv_highlight || true
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    format(name: string, value: boolean | string) {
      const constructor = this.constructor as typeof HighlightBlotAdverb
      if (name === constructor.blotName && value) {
        this.domNode.dataset.adv_highlight = "true"
      } else {
        super.format(name, value)
      }
    }
  }
  Quill.register(HighlightBlotAdverb, true)
}
