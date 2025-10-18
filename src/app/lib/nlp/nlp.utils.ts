import { BrillPOSTagger, Lexicon, RuleSet, ruleTemplates, Sentence, TransformationRule } from "natural";
import countries from "../../api/countries.json";
import names from "../../api/names.json";

const ruleFactory = (rule: [string, string, string, string], cb: (s: Sentence, i: number, p?: any) => boolean) => {
    ruleTemplates[rule[2]] = {
        function: cb,
        window: [0, 1], nrParameters: 0
    }

    const r = {
        literal: rule as string[],
        predicate: {
            name: rule[2],
            meta: {
                function: cb,
                window: [0, 1], nrParameters: 0
            }
        },
        old_category: rule[0],
        new_category: rule[1],
        key: () => rule[2],
        apply(sentence, position) {
            if (cb(sentence, position)) {
                sentence.taggedWords[position].tag = this.new_category;
            }
        },
    } as TransformationRule
    return r
}

const generateCountryRule = (lexicon: Lexicon) => {

    const predicate = (sentence: Sentence, i: number) => {
        const token = sentence.taggedWords[i].token;
        return lexicon.tagWord(token).includes("GPE");
    }
    const rule = ruleFactory(["NNP", "GPE", "CURRENT-WORD-IS-GPE-WORD", "YES"], predicate)
    return rule
}

const generateNameRule = (lexicon: Lexicon) => {

    const predicate = (sentence: Sentence, i: number) => {
        const token = sentence.taggedWords[i].token;
        return lexicon.tagWord(token).includes("CPPN");
    }
    const rule = ruleFactory(["CPPN", "NNP", "CURRENT_WORD_IS_LY_NAME", "YES"], predicate)
    return rule
}


export const generateTagger = () => {
    const lexicon = new Lexicon("EN", "UK", "UK")

    for (const word of countries) {
        lexicon.addWord(word, ["GPE"])
    }
    for (const name of names) {
        lexicon.addWord(name, ["CPPN"])
    }
    const ruleset = new RuleSet("EN")
    const rule = generateCountryRule(lexicon)
    ruleset.addRule(rule)
    const rule2 = generateNameRule(lexicon)
    ruleset.addRule(rule2)

    const tagger = new BrillPOSTagger(lexicon, ruleset)
    return tagger
}


export const preprocessText = (text: string) => {
    let preprocessedText = text.replaceAll(/[a-zA-Z]+-(?: |\u00A0|”|"|')/gmi, "");
    
    const arr = [...countries.filter(w => w.includes(' ')), ...names.filter(n => n.includes(" "))]

    for (const spaced of arr) {
        const escaped = spaced.replaceAll(/[.*+?^${}()|[\]\\]/gm, '\\$&'); //escapes special chars
        const re = /\\b$/ + escaped + /\\b/gim; //takes word with word boundary (\b)
        preprocessedText = preprocessedText.replaceAll(re, spaced.replace(/ /g, '_'));
    }
    return preprocessedText.replaceAll(new RegExp(/[\n,."'’”“\t?0-9-]/, "gmi"), " ")
        .split(" ")
        .filter(Boolean)
}