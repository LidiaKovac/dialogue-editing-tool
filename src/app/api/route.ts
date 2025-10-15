import { BrillPOSTagger, Lexicon, RuleSet } from "natural"
import { NextRequest, NextResponse } from "next/server"

export async function POST(body: NextRequest) {
    const names = new Set()
    const lexicon = new Lexicon("EN", "UH", "UH")
    const ruleset = new RuleSet("EN")
    const tagger = new BrillPOSTagger(lexicon, ruleset)

    const clean = (await body.text()).replaceAll(new RegExp(/[\n,."'’”““?-]/, "gmi"), " ")
        .split(" ")
        .filter(Boolean)


    const tagged = tagger.tag(clean)
    const grouped = new Map()
    for (const word of tagged.taggedWords) {
        if(word.tag === "NNP") {
            names.add(word.token)
        } else if(word.tag === "UH" || word.tag === "RB") {
            const llcw = word.token.toLocaleLowerCase()
            grouped.set(llcw, [...grouped.get(llcw) ?? [], word.token])
        }
    }
    console.log(grouped)
    grouped.forEach((value, key) => {
        if (value?.length !== 1) {   
            if (value?.every((w) => w.at(0) === key.at(0)?.toUpperCase())) {
                names.add(key)
            }
        }
    })

    return NextResponse.json([...names])
}