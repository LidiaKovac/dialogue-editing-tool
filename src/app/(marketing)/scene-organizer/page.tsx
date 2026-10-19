import type { Metadata } from "next"
import Link from "next/link"

import { SITE_NAME, SITE_URL } from "../../lib/site"

const title = "Scene Organizer for Writers | The Dialogue Thing"
const description =
  "Plan a story scene by scene and connect each one to its story arc, characters, and defining character traits."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/scene-organizer`,
  },
  applicationName: SITE_NAME,
  category: "Writing Tools",
  openGraph: {
    type: "website",
    url: `${SITE_URL}/scene-organizer`,
    siteName: SITE_NAME,
    title,
    description,
  },
}

const features = [
  {
    number: "01",
    eyebrow: "Story structure",
    title: "See which arc a scene moves forward.",
    text: "Connect scenes to the story arc they serve, so every beat has a place in the larger narrative.",
  },
  {
    number: "02",
    eyebrow: "Cast in context",
    title: "Keep track of who is in each scene.",
    text: "Link characters to the scenes they appear in and keep a clearer view of how your cast moves through the story.",
  },
  {
    number: "03",
    eyebrow: "One defining trait",
    title: "Give each character a scene-specific trait.",
    text: "Capture the single trait that matters for a character in that moment, without turning scene planning into another sprawling character sheet.",
  },
]

export default function SceneOrganizerPage() {
  return (
    <main
      id="landing"
      className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-28 text-[var(--primary)] md:pt-36"
      style={{ width: "min(1200px, calc(100% - 2rem))" }}
    >
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-75">
            In development · for story planners
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-[var(--primary)] md:text-6xl">
            Bring every scene, arc, and character into view.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 opacity-85 md:text-lg">
            A full scene organizer for connecting the moments in your story to
            the arcs they advance, the characters in them, and each character&apos;s
            defining trait in that scene.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--bg)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href="#how-it-fits-together"
            >
              Explore the idea
            </a>
            <Link
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href="/character-sheet-builder"
            >
              Try the character sheet builder
            </Link>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
            Upcoming tool
          </p>
        </div>

        <aside
          aria-label="Example of a scene connected to its story arc and characters"
          className="rotate-1 border-2 border-[var(--primary)] bg-[var(--bg)] p-5 shadow-[8px_8px_0_var(--primary)] md:p-7"
        >
          <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-75">
              Scene 08
            </p>
            <span className="border-2 border-[var(--primary)] px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider">
              Turning point
            </span>
          </div>
          <h2 className="mt-5 text-2xl text-[var(--primary)]">
            The truth comes out
          </h2>
          <div className="mt-6 space-y-4">
            <div className="border-2 border-[var(--primary)] p-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] opacity-70">
                Story arc
              </p>
              <p className="mt-2 font-semibold">Mara learns to trust</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border-2 border-[var(--primary)] p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] opacity-70">
                  Character
                </p>
                <p className="mt-2 font-semibold">Mara</p>
                <p className="mt-1 text-sm opacity-80">Guarded</p>
              </div>
              <div className="border-2 border-[var(--primary)] p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] opacity-70">
                  Character
                </p>
                <p className="mt-2 font-semibold">Ivo</p>
                <p className="mt-1 text-sm opacity-80">Impulsive</p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs leading-5 opacity-70">
            An example of how a scene could connect to its arc and cast.
          </p>
        </aside>
      </section>

      <section id="how-it-fits-together" aria-labelledby="organizer-features">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-75">
            From outline to story
          </p>
          <h2
            id="organizer-features"
            className="mt-3 text-3xl text-[var(--primary)] md:text-4xl"
          >
            A story is more than a list of scenes.
          </h2>
          <p className="mt-4 text-base leading-7 opacity-85">
            Keep the relationships between story pieces visible as you plan,
            draft, and revise. The organizer is being built around the way those
            pieces affect one another.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="border-2 border-[var(--primary)] bg-[var(--bg)] p-5 shadow-[6px_6px_0_var(--primary)]"
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] opacity-70">
                {feature.number} / {feature.eyebrow}
              </p>
              <h3 className="mt-4 text-xl text-[var(--primary)]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 opacity-85">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-2 border-[var(--primary)] bg-[var(--primary)] p-6 text-[var(--bg)] shadow-[8px_8px_0_var(--primary)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-80">
            Part of The Dialogue Thing
          </p>
          <h2 className="mt-3 text-2xl text-[var(--bg)] md:text-3xl">
            Plan your cast while the scene organizer takes shape.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 opacity-90">
            The character sheet builder is available now for organizing
            character details, goals, relationships, and voice notes.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center border-2 border-[var(--bg)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:bg-[var(--bg)] hover:text-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--bg)]"
          href="/character-sheet-builder"
        >
          Open the character sheet builder
        </Link>
      </section>
    </main>
  )
}
