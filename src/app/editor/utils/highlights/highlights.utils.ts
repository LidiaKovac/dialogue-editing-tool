import type QuillType from "quill";
import Quill, { Delta, type Op } from "quill";
import Rules from "../regex/regex.utils";

/**
 * Remove highlight attributes from an operation
 */
function removeHighlightFromOp(op: Op): Op {
  if (op.insert && typeof op.insert === "string") {
    const attributes = { ...op.attributes };
    delete attributes.highlight;
    delete attributes.adv_highlight;
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
  className: "adv_highlight" | "highlight" | "sdt_highlight",
  s: number,
  e: number,
  highlights: { start: number; length: number }[]
) {
  const Delta = (await import("quill")).Delta;
  const delta = new Delta();
  let currentPos = s;
  console.log(highlights)
  // Sort highlights by start position to process in order
  highlights?.sort((a, b) => a.start - b.start);

  for (const { start, length } of highlights) {
    // Retain text before highlight (unformatted)
    if (start > currentPos) {
      delta.retain(start - currentPos);
      currentPos = start;
    }

    // Retain the highlight range with the highlight attribute
    delta.retain(length, { [className]: true });
    currentPos += length;
  }

  // Retain rest of the text unformatted
  if (currentPos < e) {
    delta.retain(e - currentPos);
  }
console.log(delta)
  return delta;
}


export const resetDelta = (content: Delta) => {
  return {
    ops: content.ops.map(removeHighlightFromOp),
  };
};

export async function applyHighlights(
  quill: Quill,
  chunk: string,
  chunkStart: number,
  chunkEnd: number,
  adv: boolean,
  tense: "past" | "present" = "past"
) {
  // if (!quill || !patterns?.length) return
  //TODO: make the tre requests concurrent with each applying highlights when it ends instead of waiting
  try {
    quill.disable()
    const currentSelection = quill.getSelection();
    const currentContents = quill.getContents();
    if (currentContents.length() < 1 || quill.getText() === "\n") {
      return;
    }
    //Create a new delta without highlights
    // const newDelta = resetDelta(currentContents);

    const promises = [
      "api/v2/dialogue",
      adv ? "api/v2/adverbs" : "",
      `api/v2/show-dont-tell?tense=${tense}`,
    ]
      .filter((url) => url.length > 0)
      .map((url) =>
        fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
          method: "POST",
          body: chunk,
        })
      );

    const responses = await Promise.all(promises);
    console.log(responses);
    const highlights = await responses[0]?.json();
    const highlightsAdv = adv ? await responses[1]?.json() : null;
    const highlightsSDT = adv
      ? await responses[2]?.json()
      : await responses[1]?.json();

    // quill.setContents(newDelta.ops, "silent");
    const updateContentsCBs = await Promise.all([
      buildHighlightDelta("highlight", chunkStart, chunkEnd, highlights.matches),
      buildHighlightDelta(
        "adv_highlight",
        chunkStart,
        chunkEnd,
        highlightsAdv
      ),
      buildHighlightDelta("sdt_highlight", chunkStart, chunkEnd, highlightsSDT),
    ]);
    const delta = updateContentsCBs[0]
      .compose(updateContentsCBs[1])
      .compose(updateContentsCBs[2]);
    quill?.updateContents(delta, "silent");

    // Restore selection if it existed
    if (currentSelection) {
      quill.setSelection(currentSelection, "silent");
    }
  } catch (error) {
    console.error("Error in applyHighlights:", error);
  }
  finally {
    quill.enable(true)
  }
}
