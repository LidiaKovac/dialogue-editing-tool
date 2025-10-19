/* eslint-disable no-restricted-globals */

import { applyHighlights, computeHighlightPositions } from ".";

self.onmessage = (
  e: MessageEvent<{ text: string; patterns: { id: string; regex: RegExp }[] }>
) => {
  const res = computeHighlightPositions(e.data.text, e.data.patterns);
  self.postMessage(res);
};
