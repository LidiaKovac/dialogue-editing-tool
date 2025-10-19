import type QuillType from "quill"
import type { Op } from "quill"

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




/**
 * Worker function: Given text and regex patterns, return highlight ranges
 */
export function computeHighlightPositions(
  text: string,
  patterns: { id: string; regex: RegExp }[]
): { start: number; length: number }[] {
  const highlights: { start: number; length: number }[] = [];

  patterns.forEach(({ regex }) => {
    const r = new RegExp(regex, "g");
    let match;
    while ((match = r.exec(text)) !== null) {
      const start = match.index;
      const length = match[0].length;
      if (length > 0) {
        highlights.push({ start, length });
      }
      // avoid infinite zero-length match
      if (r.lastIndex === match.index) {
        r.lastIndex++;
      }
    }
  });

  return highlights;
}