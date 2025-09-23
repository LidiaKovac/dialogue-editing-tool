export const RulesCollapsable = () => {
  return (
    <details>
      <summary>See the rules</summary>
      <ul>
        <li>
          <h5>Comma With No Dialogue Tag</h5>
          <div className="rule-description">
            Flags when a character name after dialogue is followed by an action
            word instead of a proper dialogue tag.
          </div>
          <div className="examples">
            <div className="good">✅ &quot;Hello,&quot; Sam said</div>
            <div className="bad">❌ &quot;Hello,&quot; Sam walked</div>
          </div>
        </li>

        <li>
          <h5>Capital After Comma</h5>
          <div className="rule-description">
            Catches incorrect capitalization of dialogue tags after commas.
            Dialogue tags should be lowercase when continuing the same sentence.
          </div>
          <div className="examples">
            <div className="good">✅ &quot;Hello,&quot; she said</div>
            <div className="bad">❌ &quot;Hello,&quot; She said</div>
          </div>
        </li>

        <li>
          <h5>Lowercase After Full Stop</h5>
          <div className="rule-description">
            Identifies words that should be capitalized after a period in
            dialogue, as they start a new sentence.
          </div>
          <div className="examples">
            <div className="good">✅ &quot;Hello.&quot; She turned away</div>
            <div className="bad">❌ &quot;Hello.&quot; she turned away</div>
          </div>
        </li>

        <li>
          <h5>No Dialogue Tag After Punctuation</h5>
          <div className="rule-description">
            Flags when a character name is followed by an action word instead of
            a dialogue tag after any punctuation (comma, question mark,
            exclamation).
          </div>
          <div className="examples">
            <div className="good">✅ &quot;Are you okay?&quot; he asked</div>
            <div className="bad">❌ &quot;Are you okay?&quot; he ran</div>
          </div>
        </li>

        <li>
          <h5>Capital After Punctuation</h5>
          <div className="rule-description">
            Catches dialogue tags that are incorrectly capitalized after
            punctuation marks. Most dialogue tags should remain lowercase.
          </div>
          <div className="examples">
            <div className="good">✅ &quot;Really?&quot; said Kevin</div>
            <div className="bad">❌ &quot;Really?&quot; Said Kevin</div>
          </div>
        </li>
      </ul>
    </details>
  )
}
