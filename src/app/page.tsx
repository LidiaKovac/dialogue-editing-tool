import Link from "next/link";

export default function Landing() {
  const features = [
    {
      title: "Character sheets for writers",
      text: "Build a living writer character sheet for your cast, with notes, relationships, goals, and voice in one browser workspace.",
      href: "/character-sheet-builder",
      cta: "Open character sheet builder",
    },
    {
      title: "How to edit dialogue",
      text: "Use the editor to catch punctuation issues, dialogue tag problems, and awkward action beats while you revise.",
      href: "/editor",
      cta: "Start editing dialogue",
    },
    {
      title: "How to format dialogue",
      text: "Keep formatting consistent across scenes, chapters, and long-form fiction without handing your draft to AI.",
      href: "/blog",
      cta: "Read the writing guides",
    },
    {
      title: "Novel editing",
      text: "Bring dialogue cleanup, character notes, and revision support together for a smoother novel editing workflow.",
      href: "/faq",
      cta: "See how it works",
    },
  ]

  const workflow = [
    "Draft dialogue in the editor and spot issues as you revise.",
    "Keep a character sheet for writers alongside your novel notes.",
    "Learn the rules behind dialogue formatting without leaving the app.",
  ]

  return (
    <main
      className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 overflow-hidden px-6 pb-20 pt-24 text-[var(--primary)] md:pt-28"
      style={{ width: "min(1200px, calc(100% - 2rem))", minHeight: "auto" }}
      id="landing"
    >
      <section className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="relative">
          <div className="badge absolute">
            <div>beta</div>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] opacity-80">
            Web app for writers
          </p>
          <h1 className="max-w-3xl">
            Character sheets, dialogue editing, and novel revision in one place.
          </h1>
          <p className="max-w-2xl text-base leading-7 opacity-85 md:text-lg">
            The Dialogue Thing is a web app for writers who want to work faster
            on character sheets for writers, novel editing, how to edit dialogue,
            and how to format dialogue without handing the draft to AI.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--bg)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href="/editor"
            >
              Start editing for free
            </Link>
            <Link
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href="/character-sheet-builder"
            >
              Build a character sheet
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="border-2 border-[var(--primary)] bg-[var(--bg)] px-3 py-2 shadow-[4px_4px_0_var(--primary)]">
              AI-free
            </span>
            <span className="border-2 border-[var(--primary)] bg-[var(--bg)] px-3 py-2 shadow-[4px_4px_0_var(--primary)]">
              No word limit
            </span>
            <span className="border-2 border-[var(--primary)] bg-[var(--bg)] px-3 py-2 shadow-[4px_4px_0_var(--primary)]">
              Dialogue tags
            </span>
            <span className="border-2 border-[var(--primary)] bg-[var(--bg)] px-3 py-2 shadow-[4px_4px_0_var(--primary)]">
              Character notes
            </span>
          </div>
        </div>

        <aside className="relative border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[8px_8px_0_var(--primary)]">
          <div className="absolute inset-x-8 top-0 h-px bg-[var(--primary)] opacity-20" />
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
            What writers use it for
          </p>
          <h2 className="mt-3 text-2xl text-[var(--primary)]">
            A tighter workflow for drafts, cast notes, and dialogue cleanup.
          </h2>
          <p className="mt-4 text-sm leading-6 opacity-85">
            Keep your writer character sheet, revision notes, and dialogue checks
            close together so you can move from drafting to novel editing without
            bouncing between tools.
          </p>
          <dl className="mt-8 grid gap-4 text-sm">
            <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-4 shadow-[4px_4px_0_var(--primary)]">
              <dt className="font-semibold text-[var(--primary)]">Dialogue focus</dt>
              <dd className="mt-1 opacity-85">
                Spot punctuation, tags, and formatting issues while you write.
              </dd>
            </div>
            <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-4 shadow-[4px_4px_0_var(--primary)]">
              <dt className="font-semibold text-[var(--primary)]">Character planning</dt>
              <dd className="mt-1 opacity-85">
                Keep character sheets for writers organized around goals and voice.
              </dd>
            </div>
            <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-4 shadow-[4px_4px_0_var(--primary)]">
              <dt className="font-semibold text-[var(--primary)]">Revision support</dt>
              <dd className="mt-1 opacity-85">
                Use the app while editing novels, fanfiction, and long-form scenes.
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section aria-labelledby="feature-grid">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-75">
            Built for search intent and real writing work
          </p>
          <h2 id="feature-grid" className="mt-3 text-3xl text-[var(--primary)] md:text-4xl">
            Everything a writer needs to edit dialogue and manage character notes.
          </h2>
          <p className="mt-4 text-base leading-7 opacity-85">
            If you are looking for a character sheet for writers, guidance on how
            to edit dialogue, or a cleaner way to handle novel editing, the home
            page should make that clear immediately. This landing page is built to
            answer those searches with useful sections, not filler.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex h-full flex-col border-2 border-[var(--primary)] bg-[var(--bg)] p-5 shadow-[6px_6px_0_var(--primary)]"
            >
              <h3 className="text-xl text-[var(--primary)]">{feature.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 opacity-85">
                {feature.text}
              </p>
              <Link
                className="mt-5 inline-flex items-center text-sm font-semibold text-[var(--primary)] underline decoration-[var(--primary)] underline-offset-4 transition hover:bg-[var(--primary)] hover:text-[var(--bg)]"
                href={feature.href}
              >
                {feature.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-2 border-[var(--primary)] bg-[var(--primary)] p-6 text-[var(--bg)] shadow-[8px_8px_0_var(--primary)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-80">
            How the app fits into your edit
          </p>
          <h2 className="mt-3 text-3xl text-[var(--bg)]">
            The quickest way to move from messy dialogue to publishable prose.
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6">
            {workflow.map((step) => (
              <li key={step} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 bg-[var(--bg)]" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[6px_6px_0_var(--primary)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
              How to edit dialogue
            </p>
            <p className="mt-3 text-sm leading-6 opacity-85">
              Learn the common editing patterns that make dialogue easier to read,
              from tag placement to punctuation and action beats.
            </p>
          </div>
          <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[6px_6px_0_var(--primary)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
              How to format dialogue
            </p>
            <p className="mt-3 text-sm leading-6 opacity-85">
              Use the app as a guide while you format spoken lines consistently
              across chapters, scenes, and longer projects.
            </p>
          </div>
          <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[6px_6px_0_var(--primary)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
              Writer character sheet
            </p>
            <p className="mt-3 text-sm leading-6 opacity-85">
              Keep a writer character sheet on hand so your cast details stay
              aligned while you revise.
            </p>
          </div>
          <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[6px_6px_0_var(--primary)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
              Novel editing
            </p>
            <p className="mt-3 text-sm leading-6 opacity-85">
              Handle dialogue cleanup and scene-level edits inside a web app made
              for writers, not a generic text generator.
            </p>
          </div>
        </div>
      </section>

      <section className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[8px_8px_0_var(--primary)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
              Ready to write
            </p>
            <h2 className="mt-3 text-3xl text-[var(--primary)]">
              Start with dialogue editing, then expand into character sheets and
              novel revision.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 opacity-85">
              The homepage now speaks to the exact searches writers make when they
              need help with character sheets for writers, novel editing, how to
              edit dialogue, and how to format dialogue.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--bg)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href="/editor"
            >
              Open the editor
            </Link>
            <Link
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href="/blog"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
