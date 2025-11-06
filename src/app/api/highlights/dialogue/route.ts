import Rules from "@/app/features/Editor/utils/regex.utils";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST handler to scan text and find matching substrings based on configured regex rules.
 *
 * @param {NextRequest} body - The Next.js request object containing JSON with `text` and `chars`.
 * @returns {Promise<NextResponse>} JSON response with array of match objects containing `start` and `length`.
 */
export const POST = async (body: NextRequest) => {
  const { text, chars } = await body.json();

  let match;
  const matches: { start: number; length: number }[] = [];

  Rules.setCharacters(chars);

  const rules = Rules.getRules();

  for (const pair of rules) {
    while ((match = pair.regex.exec(text)) !== null) {
      const start = match.index;
      const length = match[0].length;

      if (length === 0) {
        pair.regex.lastIndex++;
        continue;
      }

      matches.push({ start, length });
    }
  }

  return NextResponse.json(matches);
};
