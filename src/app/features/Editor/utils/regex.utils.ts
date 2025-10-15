type Subscriber = ((cs: string[]) => any)

/**
* A reactive utility class for managing dialogue formatting rules and validation patterns.
* This class automatically updates all regular expressions when characters or dialogue tags change.
*/
export default class Rules {
    private static _subs: Subscriber[] = []
    /**
     * Internal storage for character names and pronouns used in dialogue validation.
     * @type {string[]}
     * @private
     * @static
     */
    private static _characters: string[] = ["Emily", "Dean", "Sam", "John", "he", "she", "they"]

    /**
     * Internal storage for dialogue tags used to indicate speech attribution.
     * @type {string[]}
     * @private
     * @static
     */
    private static _dialogueTags: string[] = [
        "said",
        "asked",
        "replied",
        "whispered",
        "shouted",
        "cried",
        "muttered",
        "exclaimed",
        "answered",
        "yelled",
        "remarked",
        "added",
        "called",
        "announced",
        "huffed",
        "repeated",
    ]

    /**
     * Get the current list of character names and pronouns.
     * @returns {string[]} Array of character names and pronouns
     * @static
     */
    static get CHARACTERS(): string[] {
        return [...this._characters] // Return a copy to prevent external mutation
    }

    /**
     * Get the current list of dialogue tags.
     * @returns {string[]} Array of dialogue tags
     * @static
     */
    static get DIALOGUE_TAGS(): string[] {
        return [...this._dialogueTags] // Return a copy to prevent external mutation
    }

    // Common regex pattern components (automatically reactive)
    private static get START_WITH_PUNCTUATION_AND_QUOTES(): string {
        return `[,?!]\\s*["“”]\\s`
    }

    private static get START_WITH_COMMA_AND_QUOTES(): string {
        return `,\\s*["“”]\\s`
    }

    private static get NON_CAPTURING_GROUP_CHARS(): string {
        return `(?:${this._characters.join("|")})`
    }

    private static get NON_CAPTURING_GROUP_PRONOUNS(): string {
        return `(?:he|she|they)`
    }

    private static get NON_CAPTURING_GROUP_TAGS(): string {
        return `(?:${this._dialogueTags.join("|")})`
    }

    private static get NEGATIVE_LOOKAHEAD_TAGS(): string {
        return `(?!${this._dialogueTags.map(t => t + `\\b`).join("|")})`

    }

    private static get NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS(): string {
        return `(?!(?:${this._characters.join("|")})\\b)`
    }

    /**
     * Helper method to create negative lookahead patterns.
     * @param {string} first - First pattern
     * @param {string} second - Second pattern  
     * @returns {string} Negative lookahead pattern
     * @private
     * @static
     */
    private static negativeLookahead(first: string, second: string): string {
        return `(?!${first}\\s+(?:${second})\\b)`
    }

    /**
     * Regex to catch cases like: "something," Sam walked (where "walked" should be flagged)
     * Automatically updates when characters or dialogue tags change.
     * @returns {RegExp} Regular expression for comma with no dialogue tag
     * @static
     */
    static get COMMA_WITH_NO_DIALOGUE_TAG(): RegExp {
        return new RegExp(
            `${this.START_WITH_COMMA_AND_QUOTES}${this.negativeLookahead(
                this.NON_CAPTURING_GROUP_CHARS,
                this.NON_CAPTURING_GROUP_TAGS
            )}${this.NEGATIVE_LOOKAHEAD_TAGS}([A-Za-z]+)`,
            "gm"
        )
    }

    /**
     * Regex to catch incorrect capitalization after commas.
     * Matches cases like: "Hello," She said (where "She" should be "she")
     * @returns {RegExp} Regular expression for capital after comma
     * @static
     */
    static get CAPITAL_AFTER_COMMA(): RegExp {
        return new RegExp(
            `${this.START_WITH_COMMA_AND_QUOTES}${this.NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS}([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*)`,
            "gm"
        )
    }

    /**
     * Regex to catch lowercase words that should be capitalized after full stops.
     * Matches cases like: "Hello." she said (where "she" should be "She")
     * @returns {RegExp} Regular expression for lowercase after full stop
     * @static
     */
    static get LOWERCASE_AFTER_FULL_STOP(): RegExp {
        return new RegExp(`\\.\\s*["“”]\\s([a-z]+)`, "gm")
    }

    /**
     * Regex to catch missing dialogue tags after punctuation.
     * Matches cases like: "Hello?" He ran (where "ran" should be flagged)
     * @returns {RegExp} Regular expression for no dialogue tag after punctuation
     * @static
     */
    static get NO_DIALOGUE_TAG_AFTER_PUNCTUATION(): RegExp {
        return new RegExp(
            `${this.START_WITH_PUNCTUATION_AND_QUOTES}(${this.NON_CAPTURING_GROUP_PRONOUNS}\\s+${this.NEGATIVE_LOOKAHEAD_TAGS}[A-Za-z]+)`,
            "gm"
        )
    }

    /**
     * Regex to catch capitalized words after any punctuation that should be lowercase.
     * Matches cases like: "Hello?" Said Kevin (where "Said" should be "said")
     * @returns {RegExp} Regular expression for capital after punctuation
     * @static
     */
    static get CAPITAL_AFTER_PUNCTUATION(): RegExp {
        return new RegExp(
            `${this.START_WITH_PUNCTUATION_AND_QUOTES}${this.NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS}([A-Z][a-z]+)`,
            "gm"
        )
    }

    /**
     * Updates the character list. All regex patterns automatically update.
     * @param {string[]} chars - Array of character names and pronouns to recognize
     * @static
     * @public
     */
    public static setCharacters(chars: string[]): void {
        this._characters = [...chars] // Create a copy to prevent external mutation
        this._subs.forEach(s => s(this._characters))
    }

    /**
     * Updates the dialogue tags list. All regex patterns automatically update.
     * @param {string[]} tags - Array of dialogue tags to recognize
     * @static
     * @public
     */
    public static setDialogueTags(tags: string[]): void {
        this._dialogueTags = [...tags] // Create a copy to prevent external mutation
    }

    /**
       * Returns an array of rule objects containing regular expressions for dialogue validation.
       * All regex patterns are automatically up-to-date with current characters and dialogue tags.
       * @returns {Array<{id: string, regex: RegExp}>} Array of rule objects with IDs and regex patterns
       * @static
       * @public
       */
    public static getRules(): Array<{ id: string; regex: RegExp }> {
        return [
            { id: "comma-no-dialogue", regex: this.COMMA_WITH_NO_DIALOGUE_TAG },
            { id: "capital-after-comma", regex: this.CAPITAL_AFTER_COMMA },
            { id: "lowercase-after-stop", regex: this.LOWERCASE_AFTER_FULL_STOP },
            { id: "no-dialogue-after-punctuation", regex: this.NO_DIALOGUE_TAG_AFTER_PUNCTUATION },
            { id: "capital-after-punctuation", regex: this.CAPITAL_AFTER_PUNCTUATION },
        ]
    }

    public static subscribeToChars(s: Subscriber) {
        this._subs.push(s)
    }
}
