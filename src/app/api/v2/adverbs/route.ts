import { NextRequest, NextResponse } from "next/server";
import { TaggerResponse } from "../../api";
import nlp from "compromise/two"

export async function POST(body: NextRequest) {
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
    // const escaped = adv.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(`\\b${adv.normal}\\b`, "gi")
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push({ start: match.index, length: match[0].length })
    }
  }
  return NextResponse.json(matches)
} 