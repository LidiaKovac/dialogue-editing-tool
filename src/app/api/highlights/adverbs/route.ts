import Rules from "@/app/features/Editor/utils/regex.utils";
import { NextRequest, NextResponse } from "next/server";
import { getTaggerSingleton } from "../../lib/tagger.singleton";
import { preprocessText } from "@/app/lib/nlp/nlp.utils";

/**
 * POST handler to scan text and find matching substrings based on configured regex rules.
 *
 * @param {NextRequest} body - The Next.js request object containing JSON with `text` and `chars`.
 * @returns {Promise<NextResponse>} JSON response with array of match objects containing `start` and `length`.
 */
export const POST = async (body: NextRequest) => {
  const { text } = await body.json();

  const clean = preprocessText(text);
  const tagger = getTaggerSingleton();
  const tagged = tagger.tag(clean);
  const adverbs = new Set<string>();
  const matches: { start: number; length: number }[] = [];

  tagged.taggedWords.forEach((word) => {
    if (word.tag == "RB" && word.token.endsWith("ly")) adverbs.add(word.token);
  });
  const percentage = ((100 * adverbs.size) / text.length).toFixed(2);
  
  for (const adv of adverbs) {
    let searchPos = 0;
    while (true) {
      // Find adverb in the cleaned text (could use original text if you want exact original indices)
      const idx = text.indexOf(adv, searchPos);
      if (idx === -1) break;
      matches.push({ start: idx, length: adv.length });
      searchPos = idx + adv.length;
    }
  }


  return NextResponse.json({ matches, percentage });
};
