import type QuillType from "quill";
import { type Op } from "quill";
import Rules from "./regex.utils";

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
export async function applyHighlights(
  quill: QuillType | null,
  patterns: { id: string; regex: RegExp }[]
) {
  if (!quill || !patterns?.length) return;

  try {
    const currentSelection = quill.getSelection();
    const currentContents = quill.getContents();
    if (currentContents.length() < 1 || quill.getText() === "\n") {
      return;
    }
    // Create a new delta without highlights
    const newDelta = {
      ops: currentContents.ops.map(removeHighlightFromOp),
    };

    const res = await fetch(process.env.NEXT_PUBLIC_URL + "api/highlights", {
      method: "POST",
      body: JSON.stringify({ text: quill.getText(), chars: Rules.CHARACTERS }),
    });
    const highlights = await res.json();

    // Set the content without highlights
    quill.setContents(newDelta.ops, "silent");
    quill?.updateContents(
      await buildHighlightDelta(quill.getText().length, highlights),
      "silent"
    );

    // Restore selection if it existed
    if (currentSelection) {
      quill.setSelection(currentSelection, "silent");
    }
  } catch (error) {
    console.error("Error in applyHighlights:", error);
  }
}
