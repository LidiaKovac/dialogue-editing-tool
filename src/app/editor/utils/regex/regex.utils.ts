import { LRUCache } from "lru-cache";

type Subscriber = (cs: string[]) => void;
type TagSubscriber = (tags: string[]) => void;

const cache = new LRUCache<string, Array<{ id: string; regex: RegExp }>>({
  size: 500,
  max: 2000 * 60 * 60,
});

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getKey(chars: string[], tags: string[]): string {
  return [...chars].sort((a,b) => a.localeCompare(b)).join(",") + "|" + [...tags].sort((a,b) => a.localeCompare(b)).join(",");
}

export default class Rules {
  private static readonly _subs: Subscriber[] = [];
  private static readonly _tagSubs: TagSubscriber[] = [];
  private static _characters: string[] = [];
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
  ];

  private static _dialogueString: string = this._dialogueTags.map(escapeRegex).join("|");
  private static _charString: string = this._characters.map(escapeRegex).join("|");

  static get CHARACTERS(): string[] {
    return [...this._characters];
  }

  static get DIALOGUE_TAGS(): string[] {
    return [...this._dialogueTags];
  }

  private static get START_WITH_PUNCTUATION_AND_QUOTES(): string {
    return `[,?!]\\s*["“”]\\s`;
  }

  private static get START_WITH_COMMA_AND_QUOTES(): string {
    return `,\\s*["“”]\\s`;
  }

  private static get NON_CAPTURING_GROUP_CHARS(): string {
    // Word boundaries added here for safety
    return `\\b(?:${this._charString})\\b`;
  }

  private static get NON_CAPTURING_GROUP_TAGS(): string {
    return `(?:${this._dialogueString})`;
  }

  private static get NEGATIVE_LOOKAHEAD_TAGS(): string {
    // Properly escaped with word boundary as string
    return `(?!${this._dialogueTags.map(t => escapeRegex(t) + "\\b").join("|")})`;
  }

  private static get NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS(): string {
    return `(?!(?:${this._charString})\\b)`;
  }

  private static negativeLookahead(first: string, second: string): string {
    return `(?!${first}\\s+(?:${second})\\b)`;
  }

  static get COMMA_WITH_NO_DIALOGUE_TAG(): RegExp {
    return new RegExp(
      `${this.START_WITH_COMMA_AND_QUOTES}${this.negativeLookahead(
        this.NON_CAPTURING_GROUP_CHARS,
        this.NON_CAPTURING_GROUP_TAGS
      )}${this.NEGATIVE_LOOKAHEAD_TAGS}([A-Za-z]+)`,
      "gm"
    );
  }

  static get CAPITAL_AFTER_COMMA(): RegExp {
    return new RegExp(
      `${this.START_WITH_COMMA_AND_QUOTES}${this.NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS}([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*)`,
      "gm"
    );
  }

  static get LOWERCASE_AFTER_FULL_STOP(): RegExp {
    return /\.\s*["“”]\s([a-z]+)/gm;
  }

  static get NO_DIALOGUE_TAG_AFTER_PUNCTUATION(): RegExp {
    return new RegExp(
      `${this.START_WITH_PUNCTUATION_AND_QUOTES}` +
      `(\\b(?:he|she|they)\\b)\\s+` +
      `${this.NEGATIVE_LOOKAHEAD_TAGS}[A-Za-z]+`,
      "gm"
    );
  }

  static get CAPITAL_AFTER_PUNCTUATION(): RegExp {
    //[,?!]\s*["“”]\s*(?!Emily\b|Jesse\b)([A-Z][a-z]+)\b(?!\s+(?:said|yelled)\b)
    return new RegExp(
      `${this.START_WITH_PUNCTUATION_AND_QUOTES}${this.NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS}([A-Z][a-z]+)\b(${this.NEGATIVE_LOOKAHEAD_TAGS}\b)`,
      "gm"
    );
  }

  public static setCharacters(chars: string[]): void {
    const pronouns = ["he", "she", "they"];
    const withPronouns = new Set([...(chars.length ? chars : []), ...pronouns]);
    this._characters = Array.from(withPronouns);
    this._charString = this._characters.map(escapeRegex).join("|");
    for (const sub of this._subs) {
      sub(this._characters);
    }
    cache.clear();
  }

  public static setDialogueTags(tags: string[]): void {
    this._dialogueTags = [...tags];
    this._dialogueString = this._dialogueTags.map(escapeRegex).join("|");
    for (const sub of this._tagSubs) {
      sub(this._dialogueTags);
    }
    cache.clear();
  }

  public static getRules(): Array<{ id: string; regex: RegExp }> {
    const key = getKey(this._characters, this._dialogueTags);
    const cached = cache.get(key);
    if (cached) return cached;
    const rules = [
      { id: "comma-no-dialogue", regex: this.COMMA_WITH_NO_DIALOGUE_TAG },
      { id: "capital-after-comma", regex: this.CAPITAL_AFTER_COMMA },
      { id: "lowercase-after-stop", regex: this.LOWERCASE_AFTER_FULL_STOP },
      {
        id: "no-dialogue-after-punctuation",
        regex: this.NO_DIALOGUE_TAG_AFTER_PUNCTUATION,
      },
      {
        id: "capital-after-punctuation",
        regex: this.CAPITAL_AFTER_PUNCTUATION,
      },
    ];

    cache.set(key, rules);
    return rules;
  }

  public static subscribeToChars(s: Subscriber) {
    this._subs.push(s);
  }

  public static subscribeToTags(s: TagSubscriber) {
    this._tagSubs.push(s);
  }
}
