import Rules from "@/app/editor/utils/regex/regex.utils";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST handler to scan text and find matching substrings based on configured regex rules.
 *
 * @param {NextRequest} body - The Next.js request object containing the text to analyze
 * @returns {Promise<NextResponse>} JSON response with array of match objects containing `start` and `length`.
 */
export const POST = async (body: NextRequest) => {
  const text = await body.text();
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/v2/names", {
    method: "POST", 
    body: text
  })

  const chars = await res.json()

  let match;
  const matches: { start: number; length: number }[] = [];

  Rules.setCharacters(chars);

  const rules = Rules.getRules();

  for (const { regex } of rules) {
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const length = match[0].length;

      if (length === 0) {
        regex.lastIndex++;
        continue;
      }

      matches.push({ start, length });
    }
  }

  return NextResponse.json({matches, chars});
};
