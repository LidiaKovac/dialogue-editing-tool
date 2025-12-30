import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import nlp from "compromise/three";
import { TaggerResponse } from "../../api";

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
    size: 500,
    max: 2000 * 60 * 60,
  });

  const text = await body.text();

  if (cache.has(text)) {
    return NextResponse.json([...(cache.get(text) ?? [])]);
  }
  
  const res = nlp(text.toLowerCase());
  const tagged = res
    .people().unique().match("!#Possessive")
    .json()
    .flatMap((sentence: TaggerResponse) => sentence.terms)
    .map((name: TaggerResponse["terms"][number]) => {
      return name.normal.slice(0, 1).toLocaleUpperCase() + name.normal.slice(1);
    });

  cache.set(text, new Set(tagged));

  return NextResponse.json([...new Set(tagged)]);
}
