import { NextRequest, NextResponse } from "next/server"
import { LRUCache } from "lru-cache"
import type { TaggerResponse } from "../api"
import nlp from "compromise/two"
import Rules from "../../../app/editor/utils/regex/regex.utils"

let cache: LRUCache<string, Set<string>> | undefined

/**
 * Creates a composite cache key from text, characters, and dialogue tags.
 * This ensures cache hits only when all three components match.
 */
function getCacheKey(text: string): string {
  const chars = Rules.CHARACTERS.sort().join(",")
  const tags = Rules.DIALOGUE_TAGS.sort().join(",")
  return JSON.stringify({ text, chars, tags })
}

/**
 * Resets the internal cache with the given LRUCache instance.
 * Used for testing purposes.
 * @param {LRUCache<string, Set<string>>} [to] - Optional cache instance to set.
 */
export function __TEST__resetCache(to?: LRUCache<string, Set<string>>) {
  cache = to
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

  const text = await body.text()
  const cacheKey = getCacheKey(text)

  if (cache.has(cacheKey)) {
    return NextResponse.json([...(cache.get(cacheKey) ?? [])])
  }
  const res = nlp(text.toLowerCase())
  const tagged = res
    .match("#Person")
    .match("#FirstName")
    .unique()
    .json()
    .flatMap((sentence: TaggerResponse) => sentence.terms)
    .map((name: TaggerResponse["terms"][number]) => {
      return name.normal.slice(0, 1).toLocaleUpperCase() + name.normal.slice(1)
    })

  cache.set(cacheKey, new Set(tagged))

  return NextResponse.json([...new Set(tagged)])
}
