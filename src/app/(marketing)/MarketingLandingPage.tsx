import Link from "next/link"

import type { MarketingPage } from "./marketing-pages"

type Props = {
  page: MarketingPage
}

export default function MarketingLandingPage({ page }: Readonly<Props>) {
  return (
    <main
      className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 text-[var(--primary)] md:pt-28"
      style={{ width: "min(1200px, calc(100% - 2rem))" }}
      id="landing"
    >
      <section className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-75">
            {page.heroEyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-[var(--primary)] md:text-5xl">
            {page.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 opacity-85 md:text-lg">
            {page.heroText}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--bg)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
              href={page.primaryCta.href}
            >
              {page.primaryCta.label}
            </Link>
            {page.secondaryCta && (
              <Link
                className="inline-flex items-center justify-center border-2 border-[var(--primary)] bg-[var(--bg)] px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-[6px_6px_0_var(--primary)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)] focus:outline-none focus:ring-4 focus:ring-[color:var(--primary)]"
                href={page.secondaryCta.href}
              >
                {page.secondaryCta.label}
              </Link>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
            {page.heroBadges.map((badge) => (
              <span
                key={badge}
                className="border-2 border-[var(--primary)] bg-[var(--bg)] px-3 py-2 shadow-[4px_4px_0_var(--primary)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <aside className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[8px_8px_0_var(--primary)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
            {page.sidebarEyebrow}
          </p>
          <h2 className="mt-3 text-2xl text-[var(--primary)]">
            {page.sidebarTitle}
          </h2>
          <p className="mt-4 text-sm leading-6 opacity-85">
            {page.sidebarText}
          </p>
          {/* keywordSummary intentionally omitted to avoid SEO-focused copy */}
        </aside>
      </section>

      <section aria-labelledby={`${page.slug}-highlights`}>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-75">
            {page.sectionsEyebrow}
          </p>
          <h2
            id={`${page.slug}-highlights`}
            className="mt-3 text-3xl text-[var(--primary)] md:text-4xl"
          >
            {page.sectionsTitle}
          </h2>
          <p className="mt-4 text-base leading-7 opacity-85">
            {page.sectionsText}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="flex h-full flex-col border-2 border-[var(--primary)] bg-[var(--bg)] p-5 shadow-[6px_6px_0_var(--primary)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-75">
                {section.eyebrow}
              </p>
              <h3 className="mt-3 text-xl text-[var(--primary)]">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-6 opacity-85">
                {section.text}
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--primary)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-2 border-[var(--primary)] bg-[var(--primary)] p-6 text-[var(--bg)] shadow-[8px_8px_0_var(--primary)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-80">
            {page.closingEyebrow}
          </p>
          <h2 className="mt-3 text-3xl text-[var(--bg)]">
            {page.closingTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 opacity-90">
            {page.closingText}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <Link
              className="underline decoration-[var(--bg)] underline-offset-4"
              href={page.primaryCta.href}
            >
              {page.primaryCta.label}
            </Link>
            {page.secondaryCta && (
              <Link
                className="underline decoration-[var(--bg)] underline-offset-4"
                href={page.secondaryCta.href}
              >
                {page.secondaryCta.label}
              </Link>
            )}
            <Link
              className="underline decoration-[var(--bg)] underline-offset-4"
              href="/blog"
            >
              Read the editing blog
            </Link>
          </div>
        </div>

        <div className="border-2 border-[var(--primary)] bg-[var(--bg)] p-6 shadow-[6px_6px_0_var(--primary)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-75">
            {page.faqEyebrow}
          </p>
          <h2 className="mt-3 text-2xl text-[var(--primary)]">
            {page.faqTitle}
          </h2>
          <p className="mt-4 text-sm leading-6 opacity-85">{page.faqText}</p>
          <div className="mt-5 space-y-5">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="border-b border-[color:var(--primary)] pb-4 last:border-b-0"
              >
                <summary className="cursor-pointer text-lg font-semibold text-[var(--primary)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 opacity-85">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}