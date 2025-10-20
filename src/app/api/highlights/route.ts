import Rules from "@/app/features/Editor/utils/regex.utils";
import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (body: NextRequest) => {
  const {text, chars} = await body.json();
  let match;
  const matches: { start: number; length: number }[] = [];
  Rules.setCharacters(chars)
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
