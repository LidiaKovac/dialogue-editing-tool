import type QuillType from "quill";
import { type Op } from "quill";

/**
 * Remove highlight attributes from an operation
 */
function removeHighlightFromOp(op: Op): Op {
  if (op.insert && typeof op.insert === "string") {
    const attributes = { ...op.attributes };
    delete attributes.highlight;
    return {
      insert: op.insert,
      attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
    };
  }
  return op;
}

/**
 * Build a Delta that applies highlight attributes for given ranges.
 * @param textLength Length of the whole text
 * @param highlights Array of { start: number, length: number } to highlight
 */
export async function buildHighlightDelta(
  textLength: number,
  highlights: { start: number; length: number }[]
) {
  highlights;
  const Delta = (await import("quill")).Delta;
  const delta = new Delta();
  let currentPos = 0;
  // Sort highlights by start position to process in order
  highlights.sort((a, b) => a.start - b.start);

  highlights.forEach(({ start, length }) => {
    // Retain text before highlight (unformatted)
    if (start > currentPos) {
      delta.retain(start - currentPos);
      currentPos = start;
    }

    // Retain the highlight range with the highlight attribute
    delta.retain(length, { highlight: true });
    currentPos += length;
  });

  // Retain rest of the text unformatted
  if (currentPos < textLength) {
    delta.retain(textLength - currentPos);
  }

  return delta;
}

/**
 * Apply highlights using a different approach - directly manipulating the Delta
 */
export function applyHighlights(
  worker: Worker,
  quill: QuillType,
  patterns: { id: string; regex: RegExp }[]
) {
  if (!quill || !patterns?.length) return;

  try {
    const currentSelection = quill.getSelection();
    const currentContents = quill.getContents();

    // Create a new delta without highlights
    const newDelta = {
      ops: currentContents.ops.map(removeHighlightFromOp),
    };

    // Set the content without highlights
    quill.setContents(newDelta.ops, "silent");

    // Apply all highlight patterns
    const updatedText = quill.getText();
    worker.postMessage({ regex: patterns, text: updatedText });
    // Restore selection if it existed
    if (currentSelection) {
      quill.setSelection(currentSelection, "silent");
    }
  } catch (error) {
    console.error("Error in applyHighlights:", error);
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
