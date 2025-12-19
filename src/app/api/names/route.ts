import { NextRequest, NextResponse } from "next/server";
import { preprocessText } from "../../lib/nlp/nlp.utils";
import { LRUCache } from "lru-cache";
import { getTaggerSingleton } from "../lib/tagger.singleton";

let cache: LRUCache<string, Set<string>> | undefined;

/**
 * Resets the internal cache with the given LRUCache instance.
 * Used for testing purposes.
 * @param {LRUCache<string, Set<string>>} [to] - Optional cache instance to set.
 */
export function __TEST__resetCache(to?: LRUCache<string, Set<string>>) {
  cache = to;
}

/**
 * POST handler accepting text input, processing it to extract Named Proper Nouns
 * with caching for improved performance.
 *
 * @param {NextRequest} body - The Next.js request object containing the text body.
 * @returns {Promise<NextResponse>} JSON response with extracted proper names.
 */
export async function POST(body: NextRequest) {
  cache ??= new LRUCache<string, Set<string>>({
    max: 500,
    ttl: 2000 * 60 * 60,
  })

  const text = await body.text();

  if (cache.has(text)) {
    return NextResponse.json([...(cache.get(text) ?? [])]);
  }

  const names = new Set<string>();
  const clean = preprocessText(text);
  const tagger = getTaggerSingleton()
  const tagged = tagger.tag(clean);

  const grouped = Object.groupBy(tagged?.taggedWords, (t) =>
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
