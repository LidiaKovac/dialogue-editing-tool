import type QuillType from "quill";
import Quill, { Delta, type Op } from "quill";
import { getAnalysisWorker } from "./highlight.worker";
import Rules from "../regex/regex.utils";

/**
 * Build a Delta that applies highlight attributes for given ranges.
 * @param textLength Length of the whole text
 * @param highlights Array of { start: number, length: number } to highlight
 */
export async function buildHighlightDelta(
  highlightsMap: Record<string, { start: number; length: number }[]>, // e.g. {highlight: [...], adv_highlight: [...]}
  s: number,
  e: number
) {
  const Delta = (await import("quill")).Delta;
  const delta = new Delta();
  let currentPos = 0;
  console.log(highlightsMap);
  // Flatten and sort all absolute positions
  const allHighlights = Object.entries(highlightsMap).flatMap(([className, hs]) =>
    hs.map((h) => ({ start: h.start + s, length: h.length, className }))
  );

  allHighlights.sort((a, b) => a.start - b.start);

  for (const h of allHighlights) {
    if (h.start > currentPos) {
      delta.retain(h.start - currentPos);
      currentPos = h.start;
    }
    const attrs: Record<string, true> = { [h.className]: true };
    delta.retain(h.length, attrs);
    currentPos += h.length;
  }
  if (currentPos < e) delta.retain(e - currentPos);
  console.log(delta);
  return delta;
}

export const resetDelta = async (chunkStart: number, chunkEnd: number) => {
  const Delta = (await import("quill")).Delta;
  const resetDelta = new Delta().retain(chunkStart).retain(chunkEnd - chunkStart, {
    highlight: null,
    adv_highlight: null,
    sdt_highlight: null,
  });
  console.log(chunkStart);
  return resetDelta;
};
let latestRequestId = 0;

export const highlightChunk = async (
  quill: QuillType,
  adv: boolean,
  names: string[],
  chunk: string,
  chunkStart: number,
  chunkEnd: number
) => {


  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/v2/analyze?adverb=${adv ? "true" : "false"}`,
    {
      method: "POST",
      body: JSON.stringify({ chunk, names }),
    }
  );
  const json = await responses.json();
  const highlights = json.dialogue;
  const highlightsAdv = json.adverbs;
  const highlightsSDT = json.showdonttell;
  const resetChunkDelta = await resetDelta(chunkStart, chunkEnd);
  quill.updateContents(resetChunkDelta, "silent");
  if ([highlights, highlightsAdv, highlightsSDT].some((h) => h.length > 0)) {
    const highlightMap = {
      highlight: highlights,
      adv_highlight: highlightsAdv,
      sdt_hightlight: highlightsSDT,
    };
    const delta = await buildHighlightDelta(highlightMap, chunkStart, chunkEnd);
    // quill.updateContents(delta, "silent");
    return delta;
  }
};

export async function applyHighlights(quill: Quill, chunk: string, adv: boolean) {
  // if (!quill || !patterns?.length) return
  //TODO: make the tre requests concurrent with each applying highlights when it ends instead of waiting
  try {
    const requestId = Date.now();
    latestRequestId = requestId;
    if (requestId !== latestRequestId) {
      console.log("Stale request, discarding highlights");
      return;
    }

    const currentSelection = quill.getSelection();
    if (quill.getLength() < 1 || quill.getText() === "\n") {
      return;
    }

    //call worker
    const worker = getAnalysisWorker(quill);
    console.log(worker);
    worker.postMessage({ chunk, adv });

    // Restore selection if it existed
    if (currentSelection) {
      quill.setSelection(currentSelection, "silent");
    }
  } catch (error) {
    console.error("Error in applyHighlights:", error);
  }
}
