import Rules from "@/app/editor/utils/regex/regex.utils";
import nlp from "compromise/three";
import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";
import { TaggerResponse } from "../../api";

type Match = { start: number; length: number };
// type AnalyzeCache = {
//   dialogue: Match[];
//   names: string[];
//   adverbs: Match[];
//   showdonttell: Match[];
// };

// let cache: LRUCache<string, AnalyzeCache> | undefined;

/**
 * POST handler to scan text and find matching substrings based on configured regex rules.
 *
 * @param {NextRequest} body - The Next.js request object containing the text to analyze
 * @returns {Promise<NextResponse>} JSON response with array of match objects containing `start` and `length`.
 */
export const POST = async (body: NextRequest) => {
  const text = await body.text();

  //!FIND NAMES
  const doc = nlp(text.toLowerCase());
  const tagged = doc
    .people()
    .unique()
    .match("!#Possessive")
    .json()
    .flatMap((sentence: TaggerResponse) => sentence.terms)
    .map((name: TaggerResponse["terms"][number]) => {
      return name.normal.slice(0, 1).toLocaleUpperCase() + name.normal.slice(1);
    });

  //!FIND DIALOGUE RULES:
  const rules = Rules.getRules();

  let match;
  const matches: { start: number; length: number }[] = [];
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
  matches.sort((a, b) => a.start - b.start);
  const adverbsEnabled = body.nextUrl.searchParams.get("adverbs") === "true";
  let matchesAdv: Match[] = [];

  if (adverbsEnabled) {
    const adverbs = doc
      .match("#Adverb")
      .unique()
      .json()
      .flatMap((adv: TaggerResponse) => adv.terms)
      .filter((term: TaggerResponse["terms"][0]) => term.normal.endsWith("ly"));

    const adverbPatterns = adverbs.join("|");
    const combinedAdverbRegex = new RegExp(`\\b${adverbPatterns}\\b`, "g");

    while ((match = combinedAdverbRegex.exec(text)) !== null) {
      matchesAdv.push({ start: match.index, length: match[0].length });
    }
    matchesAdv.sort((a, b) => a.start - b.start);
  }

  const feltStatements = doc.match("#Person (felt|seemed|feel|seem) #Adverb? #Adjective");

  const basicStatements = doc.match("#Person #Copula #Adverb? #Adjective");

  const sdt = [feltStatements, basicStatements]
    .flatMap((view) => view.out("offset"))
    .map((row: { offset: { start: number; length: number } }) => ({
      start: row.offset.start,
      length: row.offset.length,
    }));

  sdt.sort((a, b) => a.start - b.start);

  return NextResponse.json({
    dialogue: matches,
    names: tagged,
    adverbs: matchesAdv ?? [],
    showdonttell: sdt,
  });
};
