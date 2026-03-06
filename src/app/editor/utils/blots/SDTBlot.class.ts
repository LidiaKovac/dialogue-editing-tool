import type QuillType from "quill"

export const registerSdtBlot = (Quill: typeof QuillType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Inline: any = Quill.import("blots/inline")

  class SDTHighlight extends Inline {
    static readonly blotName = "sdt_highlight"
    static readonly tagName = "SPAN"
    static readonly className = "sdt-highlight"

    static create(value: boolean | string) {
      const node = super.create()
      if (value) {
        node.dataset.sdt_highlight = "true"
      }
      return node
    }

    static formats(domNode: HTMLElement) {
      return domNode.dataset.sdt_highlight || true
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    format(name: string, value: boolean | string) {
      const constructor = this.constructor as typeof SDTHighlight
      if (name === constructor.blotName && value) {
        this.domNode.dataset.sdt_highlight = "true"
      } else {
        super.format(name, value)
      }
    }
  }
  Quill.register(SDTHighlight, true)
}
