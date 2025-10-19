import { NextRequest, NextResponse } from "next/server";
import { generateTagger, preprocessText } from "../lib/nlp/nlp.utils";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, Set<string>>({
  size: 500,
  max: 2000 * 60 * 60,
});

export async function POST(body: NextRequest) {
  const text = await body.text();
  if (cache.has(text)) {
    return NextResponse.json([...(cache.get(text) ?? [])]);
  }
  const names = new Set<string>();
  const tagger = generateTagger();
  const clean = preprocessText(text);
  const tagged = tagger.tag(clean);
  const grouped = Object.groupBy(tagged.taggedWords, (t) =>
    t.token.toLocaleLowerCase()
  );
  for (const key in grouped) {
    if (!Object.hasOwn(grouped, key)) continue;

    const word = grouped[key];
    if (word?.every((e) => e.tag === "NNP") && word.length > 1) {
      names.add(
        key.at(0)?.toLocaleUpperCase() + key.substring(1).toLocaleLowerCase()
      );
    }
  }
  cache.set(text, names);
  return NextResponse.json([...names]);
}
