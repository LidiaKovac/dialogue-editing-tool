import type QuillType from "quill"
import type { Op } from "quill"

export const STOP_WORDS = [
  "A", "An", "The", "And", "But", "Or", "Nor", "So", "For", "Yet",
  "At", "By", "From", "In", "Into", "Near", "Of", "On", "To", "With",
  "About", "After", "Against", "Among", "Before", "Between", "During",
  "Since", "Through", "Throughout", "Within", "Without",
  "Is", "Are", "Was", "Were", "Be", "Been", "Being", "Do", "Does", "Did",
  "Has", "Have", "Had", "Am", "Can", "Could", "Will", "Would", "Shall", "Should",
  "May", "Might", "Must", "Ought",
  "I", "You", "He", "She", "It", "We", "They", "Me", "Him", "Her", "Us", "Them",
  "My", "Your", "His", "Her", "Its", "Our", "Their",
  "Mine", "Yours", "Hers", "Ours", "Theirs",
  "This", "That", "These", "Those",
  "Here", "There", "Where",
  "When", "Who", "Whom", "Which", "What",
  "All", "Any", "Both", "Each", "Few", "More", "Most", "Other", "Some", "Such",
  "Not", "No", "Yes", "If", "Then", "Else", "Than",
  "Also", "Very", "Too", "Just", "Only", "Even",
  "Once", "Still", "Yet", "So",
  "Because", "Since", "Although", "Though", "While", "Whereas"
];


/**
 * Remove highlight attributes from an operation
 */
function removeHighlightFromOp(op: Op): Op {
    if (op.insert && typeof op.insert === "string") {
        const attributes = { ...op.attributes }
        delete attributes.highlight
        return {
            insert: op.insert,
            attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
        }
    }
    return op
}

/**
 * Apply a single highlight pattern to the text
 */
function applyPattern(quill: QuillType, regex: RegExp, text: string): void {
    regex.lastIndex = 0
    let match
    while ((match = regex.exec(text)) !== null) {
        const start = match.index
        const length = match[0].length

        if (length === 0) {
            regex.lastIndex++
            continue
        }

        try {
            quill.formatText(start, length, "highlight", true, "silent")
        } catch (error) {
            console.error("Error applying format:", error)
        }
    }
}

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

        // Create a new delta without highlights
        const newDelta = {
            ops: currentContents.ops.map(removeHighlightFromOp)
        }

        // Set the content without highlights
        quill.setContents(newDelta.ops, "silent")

        // Apply all highlight patterns
        const updatedText = quill.getText()
        patterns.forEach(({ regex }) => {
            applyPattern(quill, regex, updatedText)
        })

        // Restore selection if it existed
        if (currentSelection) {
            quill.setSelection(currentSelection, "silent")
        }
    } catch (error) {
        console.error("Error in applyHighlights:", error)
    }
}