"use client";
import { Details } from "../Details/Details.component";
import { DetailItem } from "../Details/DetailsItem.component";

export const RulesCollapsable = () => {
  const rules = [
    {
      title: "Comma with No Dialogue Tag",
      description:
        "Flags when a character name after dialogue is followed by an action word instead of a proper dialogue tag.",
      goodExample: `"Hello,"; Sam said`,
      badExample: "'Hello,' Sam walked",
    },
    {
      title: "Capital After Comma",
      description:
        "Catches incorrect capitalization of dialogue tags after commas. Dialogue tags should be lowercase when continuing the same sentence.",
      goodExample: "'Hello,' she said",
      badExample: "'Hello,' She said",
    },
    {
      title: "Lowercase After Full Stop",
      description:
        "Identifies words that should be capitalized after a period in dialogue, as they start a new sentence.",
      goodExample: "'Hello.' She turned away",
      badExample: "'Hello.' she turned away",
    },
    {
      title: "No Dialogue Tag After Punctuation",
      description:
        "Flags when a character name is followed by an action word instead of a dialogue tag after any punctuation (comma, question mark, exclamation).",
      goodExample: "'Are you okay?' he asked",
      badExample: "'Are you okay?' he ran",
    },
    {
      title: "Capital After Punctuation",
      description:
        " Catches dialogue tags that are incorrectly capitalized after punctuation marks. Most dialogue tags should remain lowercase.",
      goodExample: "'Really?' said Kevin",
      badExample: "'Really?' Said Kevin",
    },
  ];
  return (
    <Details title="See the rules">
      <>
        {rules.map((rule) => (
          <DetailItem key={rule.title}  title={rule.title}>
            <>
              <div className="rule-description">{rule.description}</div>
              <div className="examples">
                <div className="good">✅ {rule.goodExample}</div>
                <div className="bad">❌ {rule.badExample}</div>
              </div>
            </>
          </DetailItem>
        ))}
      </>
    </Details>
  );
};
