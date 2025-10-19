import { BrillPOSTagger, Lexicon, RuleSet, ruleTemplates, Sentence, TransformationRule } from "natural";
import countries from "../../api/countries.json";
import names from "../../api/names.json";

/**
 * Factory function to create a transformation rule for POS tagging.
 * @param rule Tuple defining [old category, new category, rule name, identifier]
 * @param cb Predicate function to determine if the rule applies at a given token position.
 * @returns A TransformationRule object configured with the predicate and categories.
 */
const ruleFactory = (rule: [string, string, string, string], cb: (s: Sentence, i: number, p?: any) => boolean) => {
    // Registers the predicate function in the ruleTemplates for the given rule name
    ruleTemplates[rule[2]] = {
        function: cb,
        window: [0, 1], 
        nrParameters: 0
    }

    const r = {
        literal: rule as string[],
        predicate: {
            name: rule[2],
            meta: {
                function: cb,
                window: [0, 1], 
                nrParameters: 0
            }
        },
        old_category: rule[0],
        new_category: rule[1],
        key: () => rule[2],

        /**
         * Applies the transformation rule to a token in a sentence.
         * If the predicate returns true, the token's tag is changed.
         * @param sentence - The sentence containing tagged words.
         * @param position - Index of the token in the sentence to check.
         */
        apply(sentence, position) {
            if (cb(sentence, position)) {
                sentence.taggedWords[position].tag = this.new_category;
            }
        },
    } as TransformationRule;
    return r;
}

/**
 * Generates a transformation rule that retags proper nouns ('NNP') as geopolitical entities ('GPE')
 * when the token matches a country in the lexicon.
 * @param lexicon The Lexicon instance containing country names.
 * @returns TransformationRule detecting countries in text.
 */
const generateCountryRule = (lexicon: Lexicon) => {
    // Predicate checks if current token is recognized as a GPE word by the lexicon
    const predicate = (sentence: Sentence, i: number) => {
        const token = sentence.taggedWords[i].token;
        return lexicon.tagWord(token).includes("GPE");
    }
    const rule = ruleFactory(["NNP", "GPE", "CURRENT-WORD-IS-GPE-WORD", "YES"], predicate);
    return rule;
}

/**
 * Generates a transformation rule that retags custom proper names ('CPPN') as proper nouns ('NNP')
 * when the token matches a name in the lexicon.
 * @param lexicon The Lexicon instance containing name entries.
 * @returns TransformationRule detecting custom proper names.
 */
const generateNameRule = (lexicon: Lexicon) => {
    // Predicate checks if current token is recognized as a CPPN word by the lexicon
    const predicate = (sentence: Sentence, i: number) => {
        const token = sentence.taggedWords[i].token;
        return lexicon.tagWord(token).includes("CPPN");
    }
    const rule = ruleFactory(["CPPN", "NNP", "CURRENT_WORD_IS_LY_NAME", "YES"], predicate);
    return rule;
}

/**
 * Creates a POS tagger with a lexicon enriched with country and name entries,
 * and custom transformation rules to correctly tag these entities.
 * @returns Configured BrillPOSTagger instance.
 */
export const generateTagger = () => {
    // Create a new lexicon with default parameters for English (UK)
    const lexicon = new Lexicon("EN", "UK", "UK");

    // Add countries as geographic/political entities (GPE) to lexicon
    for (const word of countries) {
        lexicon.addWord(word, ["GPE"]);
    }
    // Add names as custom proper names (CPPN) to lexicon
    for (const name of names) {
        lexicon.addWord(name, ["CPPN"]);
    }

    const ruleset = new RuleSet("EN");

    // Generate and add country rule to ruleset
    const rule = generateCountryRule(lexicon);
    ruleset.addRule(rule);

    // Generate and add name rule to ruleset
    const rule2 = generateNameRule(lexicon);
    ruleset.addRule(rule2);

    // Create and return a BrillPOSTagger with the prepared lexicon and ruleset
    const tagger = new BrillPOSTagger(lexicon, ruleset);
    return tagger;
}

/**
 * Preprocesses text to prepare it for tagging.
 * Removes certain patterns and replaces spaces in multi-word country or name entries with underscores.
 * Cleans punctuation and splits into words.
 * @param text Raw input text string.
 * @returns Array of cleaned tokens suitable for tagging.
 */
export const preprocessText = (text: string) => {
    // Remove tokens with up to 10 letters followed by a hyphen and special trailing characters (some cleaning)
    let preprocessedText = text.replaceAll(/[a-zA-Z]{0,10}-[\u00A0”"']/gmi, "");

    // Gather multi-word country and name entries to replace spaces with underscores
    const arr = [...countries.filter(w => w.includes(' ')), ...names.filter(n => n.includes(" "))];

    for (const spaced of arr) {
        // Escape regex special characters in multi-word entries for safe regex use
        const escaped = spaced.replaceAll(/[.*+?^${}()|[\]\\]/gm, String.raw`\$&`);
        // Create a regex to find exact whole-word match for the multi-word string
        const re = new RegExp(`\\b${escaped}\\b`, "gim");
        // Replace spaces with underscores in matched phrases
        preprocessedText = preprocessedText.replaceAll(re, spaced.replaceAll(/ /g, '_'));
    }

    // Remove various punctuation, digits, newlines, tabs, and split on spaces, filtering out empty strings
    return preprocessedText.replaceAll(new RegExp(/[\n,."'’”“\t?0-9-]/, "gmi"), " ")
        .split(" ")
        .filter(Boolean);
}
