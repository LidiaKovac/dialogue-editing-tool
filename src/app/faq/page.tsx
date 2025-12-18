// app/faq/page.tsx

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 bg-white text-black">
      <h1 className="mb-6 border-b-4 border-black pb-2 text-3xl font-extrabold uppercase tracking-tight">
        FAQ – The Dialogue Thing
      </h1>

      <p className="mb-8 text-sm leading-relaxed">
        Welcome! This is the quick reference page for{" "}
        <strong>The Dialogue Thing</strong> – the tiny gremlin tool that points
        at messy dialogue so you can fix it and get back to torturing your
        characters.
      </p>

      <section aria-labelledby="what-is-tdt" className="mb-8 border-2 border-black p-4">
        <h2 id="what-is-tdt" className="mb-2 text-xl font-bold uppercase">
          What is The Dialogue Thing?
        </h2>
        <p className="text-sm leading-relaxed">
          The Dialogue Thing is a free, AI‑free editing tool that helps you spot
          dialogue formatting issues, weird tags, and overused adverbs in your
          stories. It’s built for fanfiction writers, novelists, and anyone who
          wants cleaner dialogue without handing their work to an AI model.
        </p>
      </section>

      <section aria-labelledby="who-is-for" className="mb-8 border-2 border-black p-4">
        <h2 id="who-is-for" className="mb-2 text-xl font-bold uppercase">
          Who is The Dialogue Thing for?
        </h2>
        <p className="text-sm leading-relaxed">
          If you write people talking on a page, it’s for you. The tool works
          well for fanfiction chapters, original novels, web serials, and
          shorter stories where dialogue, character voice, and pacing matter.
        </p>
      </section>

      <section aria-labelledby="what-checks" className="mb-8 border-2 border-black p-4">
        <h2 id="what-checks" className="mb-2 text-xl font-bold uppercase">
          What does the tool actually check?
        </h2>
        <p className="mb-2 text-sm leading-relaxed">
          Right now, the focus is on the places writers most often trip:
        </p>
        <ul className="mb-2 list-disc pl-5 text-sm leading-relaxed">
          <li>Dialogue tags versus action beats.</li>
          <li>
            Commas, periods, question marks, and capitalization around quotes.
          </li>
          <li>
            Patterns like <code>&quot;Hello,&quot; she walked</code> or{" "}
            <code>&quot;Hello.&quot; she said</code>.
          </li>
          <li>Adverbs in dialogue and narration so you can trim or keep them.</li>
        </ul>
        <p className="text-sm leading-relaxed">
          The Dialogue Thing highlights the questionable bits and lets you
          decide what to fix and what to keep on purpose.
        </p>
      </section>

      <section aria-labelledby="ai-question" className="mb-8 border-2 border-black p-4">
        <h2 id="ai-question" className="mb-2 text-xl font-bold uppercase">
          Does The Dialogue Thing use AI?
        </h2>
        <p className="text-sm leading-relaxed">
          No. There’s no AI rewriting your voice in the background and no hidden
          model training on your fic. The tool simply runs pattern checks in
          your browser and surfaces potential issues so you stay fully in
          control of the edit.
        </p>
      </section>

      <section aria-labelledby="privacy" className="mb-8 border-2 border-black p-4">
        <h2 id="privacy" className="mb-2 text-xl font-bold uppercase">
          Is my fanfiction or book text saved or tracked?
        </h2>
        <p className="text-sm leading-relaxed">
          The goal is to be as low‑creepy as possible. Your text isn’t stored
          for model training, isn’t sold, and isn’t used to build writer
          profiles. You paste, edit, and leave. That’s it.
        </p>
      </section>

      <section aria-labelledby="word-limit" className="mb-8 border-2 border-black p-4">
        <h2 id="word-limit" className="mb-2 text-xl font-bold uppercase">
          Is there a word limit?
        </h2>
        <p className="text-sm leading-relaxed">
          There’s no strict word cap. Single chapters and shorter fics up to
          roughly twenty to thirty thousand words run comfortably. Extremely
          long documents may feel slower, so for full novels it’s usually easier
          to paste chapter by chapter.
        </p>
      </section>

      <section aria-labelledby="fanfic-vs-book" className="mb-8 border-2 border-black p-4">
        <h2 id="fanfic-vs-book" className="mb-2 text-xl font-bold uppercase">
          Can I use it to edit a whole book or just fanfiction?
        </h2>
        <p className="text-sm leading-relaxed">
          You can absolutely use it on both. The same dialogue rules apply to
          fanfiction, original novels, and everything in between. If your
          project has quotation marks and people arguing in them, the tool can
          help.
        </p>
      </section>

      <section aria-labelledby="tags-vs-beats" className="mb-8 border-2 border-black p-4">
        <h2 id="tags-vs-beats" className="mb-2 text-xl font-bold uppercase">
          What’s the difference between a dialogue tag and an action beat?
        </h2>
        <p className="mb-2 text-sm leading-relaxed">
          A dialogue tag is the little verb that tells us who’s speaking, like{" "}
          <em>said</em> or <em>asked</em>. An action beat is what the character
          is doing while they talk.
        </p>
        <p className="mb-2 text-sm leading-relaxed">
          Example tag:{" "}
          <code>&quot;I&apos;m fine,&quot; she said.</code>
          <br />
          Example beat:{" "}
          <code>&quot;I&apos;m fine.&quot; She shoved the letter in her bag.</code>
        </p>
        <p className="text-sm leading-relaxed">
          The Dialogue Thing helps you catch cases where an action verb sneaks
          into tag space, which is how you end up with lines like{" "}
          <code>&quot;Hello,&quot; she walked</code>.
        </p>
      </section>

      <section aria-labelledby="grammar" className="mb-8 border-2 border-black p-4">
        <h2 id="grammar" className="mb-2 text-xl font-bold uppercase">
          Will this fix all my grammar?
        </h2>
        <p className="text-sm leading-relaxed">
          No. It’s not a full grammar checker and it won’t catch every typo or
          tense slip. Think of it as a focused helper for dialogue formatting
          and rhythm. You can pair it with a spellchecker or a human beta reader
          for a more complete edit.
        </p>
      </section>

      <section aria-labelledby="pricing" className="mb-8 border-2 border-black p-4">
        <h2 id="pricing" className="mb-2 text-xl font-bold uppercase">
          Do I have to pay to use The Dialogue Thing?
        </h2>
        <p className="text-sm leading-relaxed">
          No. The tool is free. There’s an optional Ko‑fi link if you want to
          tip, but there are no locked features and no subscription wall waiting
          for you after a few chapters.
        </p>
      </section>

      <section aria-labelledby="workflow" className="mb-8 border-2 border-black p-4">
        <h2 id="workflow" className="mb-2 text-xl font-bold uppercase">
          How can I use The Dialogue Thing in my editing workflow?
        </h2>
        <ol className="mb-2 list-decimal pl-5 text-sm leading-relaxed">
          <li>Write your draft normally. Don’t stress about rules mid‑scene.</li>
          <li>Paste a chapter into the editor.</li>
          <li>
            Scan the highlights for dialogue tag issues, punctuation oddities,
            and adverbs.
          </li>
          <li>
            Fix what improves clarity and voice; ignore what doesn’t fit your
            style.
          </li>
          <li>Repeat for the next chapter.</li>
        </ol>
        <p className="text-sm leading-relaxed">
          The idea is to let the tool spot the boring stuff so you can focus on
          character voice, pacing, and emotional damage (the fun parts).
        </p>
      </section>

      <section aria-labelledby="language" className="mb-8 border-2 border-black p-4">
        <h2 id="language" className="mb-2 text-xl font-bold uppercase">
          Does it work for every language?
        </h2>
        <p className="text-sm leading-relaxed">
          The Dialogue Thing is built around English dialogue conventions:
          English quotation marks, commas, and capitalization rules. You’re
          welcome to experiment with other languages, but the feedback will make
          the most sense if you’re writing in English.
        </p>
      </section>

      <section aria-labelledby="learn-more" className="mb-8 border-2 border-black p-4">
        <h2 id="learn-more" className="mb-2 text-xl font-bold uppercase">
          Where can I learn more about dialogue and editing?
        </h2>
        <p className="text-sm leading-relaxed">
          The blog includes guides on editing fanfiction, dialogue rules for
          books and fanfic, and step‑by‑step walkthroughs for editing a book or
          novel. They use the same patterns the tool checks, but with concrete
          examples drawn from fic‑style scenes instead of textbook sentences.
        </p>
      </section>
    </main>
  );
}
