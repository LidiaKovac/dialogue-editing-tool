/* eslint-disable no-restricted-globals */

self.onmessage = (e: MessageEvent<{ regex: {id: string, regex: RegExp}[]; text: string }>) => {
  let match;
  const matches: { start: number; length: number }[] = [];
  e.data.regex.forEach((pair) => {
    while ((match = pair.regex.exec(e.data.text)) !== null) {
      const start = match.index;
      const length = match[0].length;

      if (length === 0) {
        pair.regex.lastIndex++;
        continue;
      }
      matches.push({ start, length });
    }
  });

  self.postMessage({textLength: e.data.text.length, highlights: matches});
};
