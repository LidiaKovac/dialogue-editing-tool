import nlp from "compromise/two"
import { LRUCache } from "lru-cache"
import { NextRequest, NextResponse } from "next/server"
import { TaggerResponse } from "../../api"
let cache:
  | LRUCache<
      string,
      {
        start: number
        length: number
      }[]
    >
  | undefined

/**
 * Resets the internal cache with the given LRUCache instance.
 * Used for testing purposes.
 * @param {LRUCache<string, { start: number; length: number; }[]>}} [to] - Optional cache instance to set.
 */
export function __TEST__resetCache(
  to?: LRUCache<
    string,
    {
      start: number
      length: number
    }[]
  >
) {
  cache = to
}
export async function POST(body: NextRequest) {
  cache ??= new LRUCache<
    string,
    {
      start: number
      length: number
    }[]
  >({
    size: 500,
    max: 2000 * 60 * 60,
  })

  const tense = body.nextUrl.searchParams.get("tense")
  const text = await body.text()

  if (cache.has(text)) {
    // return NextResponse.json(cache.get(text))
  }
  const res = nlp(text.toLowerCase())
  const matches1 = res.match("#Noun #Copula #Adverb? #Adjective")
  const clean = matches1.match("#Adjective").not("#Verb #Gerund").not("#Adverb")
  const copulas = clean
    .lookBehind("#Copula")
    .match(tense === "past" ? "#PastTense" : "#PresentTense") //TODO: make sure dialogues are checked even if present tense
  const matches = copulas
    .out("offset")
    .map((row) => ({ start: row.offset.start, length: row.offset.length }))
  //TODO: only match non dialogue text
  //TODO: refine
  cache.set(text, matches)
  return NextResponse.json(matches)
}
