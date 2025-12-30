import nlp from "compromise/two";
import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";
let cache:
  | LRUCache<
      string,
      {
        start: number;
        length: number;
      }[]
    >
  | undefined;

/**
 * Resets the internal cache with the given LRUCache instance.
 * Used for testing purposes.
 * @param {LRUCache<string, { start: number; length: number; }[]>}} [to] - Optional cache instance to set.
 */
export function __TEST__resetCache(
  to?: LRUCache<
    string,
    {
      start: number;
      length: number;
    }[]
  >
) {
  cache = to;
}
export async function POST(body: NextRequest) {
  cache ??= new LRUCache<
    string,
    {
      start: number;
      length: number;
    }[]
  >({
    size: 500,
    max: 2000 * 60 * 60,
  });

  const tense = body.nextUrl.searchParams.get("tense");
  const text = await body.text();

  if (cache.has(text)) {
    // return NextResponse.json(cache.get(text))
  }
  const res = nlp(text.toLowerCase());
  const feltStatements = res.match("(felt|seemed) #Adjective")
  .out("offset").map((row:{offset: {start: number, length: number}}) => ({ start: row.offset.start, length: row.offset.length }));
  const mindTells = res.match('(thought|wondered|knew|realized) #Quote?')
  .out("offset").map((row:{offset: {start: number, length: number}}) => ({ start: row.offset.start, length: row.offset.length }));

//   const matches = copulas
//     .out("offset")
//     .map((row) => ({ start: row.offset.start, length: row.offset.length }));
  cache.set(text, [...feltStatements, ...mindTells]);
  return NextResponse.json([...feltStatements, ...mindTells]);
}
