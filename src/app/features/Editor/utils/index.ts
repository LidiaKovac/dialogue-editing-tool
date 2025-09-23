import type QuillType from "quill"
import type { Op } from "quill"
/**
 * Apply highlights using a different approach - directly manipulating the Delta
 */
export function applyHighlights(
    quill: QuillType,
    patterns: { id: string; regex: RegExp }[]
) {
    if (!quill || !patterns.length) return

    try {
        const currentSelection = quill.getSelection()
        const text = quill.getText()
        const currentContents = quill.getContents()

        console.log("Current text:", text)
        console.log("Applying highlights...")

        // Create a new delta without highlights
        const newDelta = { ops: [] as Op[] }

        // First, remove all existing highlights by rebuilding the delta
        for (const op of currentContents.ops) {
            if (op.insert && typeof op.insert === "string") {
                const attributes = { ...op.attributes }
                delete attributes.highlight
                newDelta.ops.push({
                    insert: op.insert,
                    attributes:
                        Object.keys(attributes).length > 0 ? attributes : undefined,
                })
            } else {
                newDelta.ops.push(op)
            }
        }


        // Set the content without highlights
        quill.setContents(newDelta.ops, "silent")

        // Now apply highlights
        const updatedText = quill.getText()
        for (const { regex } of patterns) {
            regex.lastIndex = 0
            let match

            while ((match = regex.exec(updatedText)) !== null) {
                const start = match.index
                const length = match[0].length

                console.log(
                    `Highlighting "${match[0]}" at position ${start}-${start + length}`
                )

                if (length === 0) {
                    regex.lastIndex++
                    continue
                }

                // Apply the highlight format
                try {
                    quill.formatText(start, length, "highlight", true, "silent")
                } catch (error) {
                    console.error("Error applying format:", error)
                }
            }
        }


        // Restore selection if it existed
        if (currentSelection) {
            quill.setSelection(currentSelection, "silent")
        }

        // Debug: log the final contents
        console.log("Final delta:", quill.getContents())
    } catch (error) {
        console.error("Error in applyHighlights:", error)
    }
}
