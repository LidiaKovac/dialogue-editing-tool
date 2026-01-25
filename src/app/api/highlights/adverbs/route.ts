import { NextRequest, NextResponse } from "next/server";
import nlp from "compromise/two"
import type { TaggerResponse } from "../../api"

/**
 * POST handler to scan text and find matching substrings based on configured regex rules.
 *
 * @param {NextRequest} body - The Next.js request object containing JSON with `text` and `chars`.
 * @returns {Promise<NextResponse>} JSON response with array of match objects containing `start` and `length`.
 */
export const POST = async (body: NextRequest) => {
  const text = await body.text()
  const doc = nlp(text)
  const adverbs = doc
    .match("#Adverb")
    .unique()
    .json()
    .flatMap((adv: TaggerResponse) => adv.terms)
    .filter((term: TaggerResponse["terms"][0]) => term.normal.endsWith("ly"))
  const matches: { start: number; length: number }[] = []
  for (const adv of adverbs) {
    
    const escaped = adv.normal.replaceAll(/[.*+?^${}()|[\]\\]/g, /\$&/)  
    const regex = new RegExp(`\\b${escaped}\\b`, "gi")
    let match
    while ((match = regex.exec(text)) !== null) {
      if (match[0].length === 0) {  
        regex.lastIndex++  
        continue  
      }  
      matches.push({ start: match.index, length: match[0].length })
    }
  }
  return NextResponse.json({
    matches,
    percentage: ((100 * adverbs.length) / (doc.wordCount() ?? 1)).toFixed(2),
  })
}