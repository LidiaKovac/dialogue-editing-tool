import { NextRequest, NextResponse } from "next/server"
import { generateTagger, preprocessText } from "../lib/nlp/nlp.utils";
export async function POST(body: NextRequest) {
    const text = await body.text()
    const names = new Set()
    const tagger = generateTagger()
    const clean = preprocessText(text)
    const tagged = tagger.tag(clean)
    const grouped = Object.groupBy(tagged.taggedWords, (t) => t.token.toLocaleLowerCase())
    for (const key in grouped) {
        if (!Object.hasOwn(grouped, key)) continue;

        const word = grouped[key];
        if (word?.every(e => e.tag === "NNP") && word.length > 1) {
            names.add(key.at(0)?.toLocaleUpperCase() + key.substring(1).toLocaleLowerCase())
        }
    }
    return NextResponse.json([...names])
}