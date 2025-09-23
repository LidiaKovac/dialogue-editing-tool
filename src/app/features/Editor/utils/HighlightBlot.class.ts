export const registerBlot = (Quill: any) => {
    const Inline: any = Quill.import("blots/inline")

    class HighlightBlot extends Inline {
        static readonly blotName = "highlight"
        static readonly tagName = "SPAN"
        static readonly className = "ql-highlight"

        static create(value: boolean | string) {
            const node = super.create()
            if (value) {
                node.dataset.highlight = "true"
            }
            return node
        }

        static formats(domNode: HTMLElement) {
            return domNode.dataset.highlight || true
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        format(name: string, value: any) {
            const constructor = this.constructor as typeof HighlightBlot
            if (name === constructor.blotName && value) {

                this.domNode.dataset.highlight = "true"
            } else {
                super.format(name, value)
            }
        }
    }
    Quill.register(HighlightBlot, true)

}