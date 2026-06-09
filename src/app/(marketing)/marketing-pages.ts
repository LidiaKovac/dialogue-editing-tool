import type { Metadata } from "next"

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/site"

export type MarketingCta = {
  label: string
  href: string
}

export type MarketingSection = {
  eyebrow: string
  title: string
  text: string
  bullets: string[]
}

export type MarketingFaq = {
  question: string
  answer: string
}

export type MarketingPage = {
  slug: string
  title: string
  description: string
  heroEyebrow: string
  heroTitle: string
  heroText: string
  sidebarEyebrow: string
  sidebarTitle: string
  sidebarText: string
  keywordSummary: string
  keywords: string[]
  heroBadges: string[]
  primaryCta: MarketingCta
  secondaryCta?: MarketingCta
  sectionsEyebrow: string
  sectionsTitle: string
  sectionsText: string
  sections: MarketingSection[]
  closingEyebrow: string
  closingTitle: string
  closingText: string
  faqEyebrow: string
  faqTitle: string
  faqText: string
  faqs: MarketingFaq[]
}

const ogImage = `${SITE_URL}${DEFAULT_OG_IMAGE}`

export const marketingPages: Record<string, MarketingPage> = {
  "character-sheet-for-writers": {
    slug: "character-sheet-for-writers",
    title: "Character Sheet for Writers | Free Checklist, Example, and Builder",
    description:
      "Create a character sheet for writers that keeps goals, backstory, relationships, voice, and arc notes in one place.",
    heroEyebrow: "For writers building cast notes",
    heroTitle:
      "Character sheet for writers that keeps cast details, goals, and voice in one place.",
    heroText:
      "Build a writer-friendly character sheet that goes beyond appearance lists. Track backstory, relationships, internal conflict, voice, and scene-specific notes while you draft.",
    sidebarEyebrow: "Cast planning",
    sidebarTitle: "Keep the character details that matter on the page.",
    sidebarText:
      "Use the sheet to track the details that shape behavior, choices, and dialogue, especially when you are juggling a large cast or multiple arcs.",
    keywordSummary:
      "This page speaks to people searching for a character sheet for writers, a writer character sheet, or a character sheet template they can use while drafting.",
    keywords: [
      "character sheet for writers",
      "writer character sheet",
      "character sheet example",
      "character checklist for writers",
      "character traits list for writers",
      "character sheet ideas",
      "character sheet template",
      "character sheet for writing",
    ],
    heroBadges: [
      "writer character sheet",
      "character sheet example",
      "character checklist for writers",
      "character traits list",
    ],
    primaryCta: {
      label: "Open the character sheet builder",
      href: "/character-sheet-builder",
    },

    sectionsEyebrow: "What writers use it for",
    sectionsTitle: "A character sheet that supports drafting, revision, and dialogue.",
    sectionsText:
      "The strongest sheets are the ones you can return to while the story changes, so the notes stay useful from first draft to final pass.",
    sections: [
      {
        eyebrow: "What to include",
        title: "A useful character sheet covers more than age and appearance.",
        text:
          "A good sheet gives you the details that actually change how a character behaves on the page.",
        bullets: [
          "Keep core identity details like age, role, setting, and occupation together in one character sheet for writers page.",
          "Capture motivation, fear, and secrets so the character sheet example still feels useful during revisions.",
          "Add voice notes and relationship details so the writer character sheet supports dialogue consistency.",
          "Update the sheet as scenes change so your character checklist for writers still matches the draft.",
        ],
      },
      {
        eyebrow: "Why writers use it",
        title: "Character sheets prevent continuity drift in longer drafts.",
        text:
          "They help you keep track of who knows what, what a character wants, and how they sound when they speak.",
        bullets: [
          "Keep side characters distinct instead of flattening them into background roles.",
          "Track arc changes as the draft moves from chapter to chapter.",
          "Make beta feedback easier to apply without losing track of notes.",
          "Use the same sheet while drafting, revising, and editing dialogue.",
        ],
      },
      {
        eyebrow: "Best next step",
        title: "Move from idea to a working character sheet quickly.",
        text:
          "If you want a faster setup, start with a template and expand it only where your story needs more depth.",
        bullets: [
          "Open the builder to create a detailed profile.",
          "Copy the template into your notes app or document.",
          "Pair the sheet with dialogue editing while you revise.",
          "Reuse the same structure for every main character.",
        ],
      },
    ],
    closingEyebrow: "Writer workflow",
    closingTitle: "Use the sheet as a living reference while you revise.",
    closingText:
      "When the draft changes, update the sheet so character motivation, relationship shifts, and dialogue details stay in sync.",
    faqEyebrow: "Writer questions",
    faqTitle: "Questions about using a character sheet for writers.",
    faqText:
      "These answers cover the most common planning questions so writers can move from idea to a usable sheet faster.",
    faqs: [
      {
        question: "What should a character sheet for writers include?",
        answer:
          "Start with the essentials: name, role, backstory, goals, relationships, habits, and voice notes. Then add any fields your story needs, like powers, timeline facts, or scene-specific reminders.",
      },
      {
        question: "Is a character sheet useful for short stories?",
        answer:
          "Yes. Even short stories benefit from a lightweight character sheet when you want clearer voice, tighter motivation, and cleaner continuity.",
      },
      {
        question: "Can I use this for fanfiction?",
        answer:
          "Yes. Fanfiction writers often need a character sheet to track canon details, headcanons, and relationship changes.",
      },
    ],
  },
  "character-sheet-template": {
    slug: "character-sheet-template",
    title: "Character Sheet Template for Writers | Google Docs, PDF, and Copy-and-Paste",
    description:
      "Find a character sheet template for writers in a format you can copy, print, or adapt for Google Docs, PDF, and online use.",
    heroEyebrow: "For writers who want a reusable template",
    heroTitle:
      "Character sheet template for writers who want a clean starting point.",
    heroText:
      "Need a template you can copy into Google Docs, PDF, or a notes app? This page is for writers looking for a simple, fillable character sheet template they can adapt quickly.",
    sidebarEyebrow: "Template formats",
    sidebarTitle: "Use the format that matches your workflow.",
    sidebarText:
      "Some writers want a printable sheet. Others want a copy-and-paste version or a version that lives entirely online.",
    keywordSummary:
      "This page matches searches for a character sheet template, character sheet for writers template, and printable or fillable versions for Google Docs and PDF.",
    keywords: [
      "character sheet template",
      "character sheet for writers template",
      "character sheet for writers google docs",
      "character sheet for writers pdf",
      "character sheet for writers free",
      "printable character sheet for writers",
      "fillable character sheet for writers",
      "character sheets for writers copy and paste",
      "character sheet online",
    ],
    heroBadges: ["Google Docs", "PDF", "copy and paste", "fillable template"],
    primaryCta: {
      label: "Open the free builder",
      href: "/character-sheet-builder",
    },
    secondaryCta: {
      label: "See the full guide",
      href: "/character-sheet-for-writers",
    },
    sectionsEyebrow: "Template ideas",
    sectionsTitle: "A flexible character sheet template for books, novels, and fanfiction.",
    sectionsText:
      "Choose the version that fits your process, then trim it down to only the fields you actually need.",
    sections: [
      {
        eyebrow: "Template formats",
        title: "Use the format that matches your workflow.",
        text:
          "Some writers want a printable sheet. Others want a copy-and-paste version or a version that lives entirely online.",
        bullets: [
          "Use Google Docs when you want a character sheet template you can share and revise quickly.",
          "Choose PDF when you need a printable character sheet for writers reference.",
          "Keep a copy-and-paste version for notes apps and other writing tools.",
          "Use online templates when you want a fillable character sheet for writers page close to the draft.",
        ],
      },
      {
        eyebrow: "Template fields",
        title: "A strong template keeps the high-signal fields front and center.",
        text:
          "The best templates ask for the information you will actually check again during drafting.",
        bullets: [
          "Appearance, age, role, and relationships.",
          "Goals, fears, flaws, and what they want in the scene.",
          "Voice, habits, and recurring expressions.",
          "Arc notes that keep the character moving forward.",
        ],
      },
      {
        eyebrow: "Who it helps",
        title: "Templates are useful when you want speed more than structure.",
        text:
          "A template gives you the framework without forcing you to invent the structure from scratch.",
        bullets: [
          "New writers can start with a simple character sheet example and expand it later.",
          "Novelists can reuse the same character sheet template for every major character.",
          "Fanfiction writers can keep a fast canon-reference page alongside the draft.",
          "Writers can use the template as a checklist before drafting dialogue.",
        ],
      },
    ],
    closingEyebrow: "Copy-friendly",
    closingTitle: "A template should be easy to reuse on the next character.",
    closingText:
      "Once you find a structure that works, copy it into every new profile so your notes stay consistent across projects.",
    faqEyebrow: "Template questions",
    faqTitle: "Questions about choosing a character sheet template.",
    faqText:
      "These answers help writers pick the right format for the way they actually draft and revise.",
    faqs: [
      {
        question: "Is there a free character sheet template for writers?",
        answer:
          "Yes. This page is meant to help writers find a free, adaptable template they can reuse across projects.",
      },
      {
        question: "Can I use a character sheet template in Google Docs?",
        answer:
          "Yes. Google Docs is one of the easiest ways to adapt a template and keep it alongside your draft.",
      },
      {
        question: "Should I use a printable or online template?",
        answer:
          "Use printable if you like fixed reference pages. Use online if you want the sheet to stay close to your drafting and editing workflow.",
      },
    ],
  },
  "dialogue-editing": {
    slug: "dialogue-editing",
    title: "Dialogue Editing Tool | Fix Tags, Punctuation, and Adverbs",
    description:
      "Edit dialogue online with a tool that checks dialogue tags, punctuation, adverbs, and formatting issues for writers.",
    heroEyebrow: "For dialogue-heavy drafts",
    heroTitle: "Dialogue editing tool for tags, punctuation, and adverbs.",
    heroText:
      "Paste a scene and check dialogue tags, punctuation, and overly repetitive adverbs without sending your draft to AI.",
    sidebarEyebrow: "Editing focus",
    sidebarTitle: "Check the lines that most often slow a chapter down.",
    sidebarText:
      "Use the editor to catch punctuation slips, tag clutter, and weak lines before they reach a beta reader or the final draft.",
    keywordSummary:
      "This page is for writers searching for a dialogue editor, a dialogue tag checker, or a tool to edit dialogue online without handing the draft to AI.",
    keywords: [
      "dialogue editor",
      "edit dialogue online",
      "dialogue tag checker",
      "punctuation checker for dialogue",
      "adverb checker for writers",
      "fanfiction dialogue editor",
      "novel dialogue formatting",
      "AI-free writing tool",
      "dialogue tags and action beats",
    ],
    heroBadges: [
      "dialogue tag checker",
      "punctuation checker for dialogue",
      "adverb checker",
      "fanfiction dialogue editor",
    ],
    primaryCta: {
      label: "Start editing dialogue",
      href: "/editor",
    },
    secondaryCta: {
      label: "Read formatting rules",
      href: "/how-to-format-dialogue",
    },
    sectionsEyebrow: "What it helps with",
    sectionsTitle: "A dialogue editor built for chapters, scenes, and long drafts.",
    sectionsText:
      "The editor is most useful when you are moving through a real chapter and want quick, practical feedback on the dialogue itself.",
    sections: [
      {
        eyebrow: "What it checks",
        title: "The editor focuses on the issues writers actually search for.",
        text:
          "It is built around the common searches that map to real editing work, not generic rewriting.",
        bullets: [
          "Check dialogue tag placement and repeated tags to get more from the dialogue editor.",
          "Catch quotation mark and punctuation issues with a dialogue tag checker mindset.",
          "Spot overused adverbs and weak sentence patterns while you edit dialogue online.",
          "Review scene-level readability so the novel dialogue formatting stays clear across chapters.",
        ],
      },
      {
        eyebrow: "Who it is for",
        title: "Writers who need fast feedback on spoken lines.",
        text:
          "It works well for fanfiction, novels, web serials, and any draft with a lot of dialogue.",
        bullets: [
          "Fanfiction writers can clean up spoken lines quickly with the fanfiction dialogue editor.",
          "Novelists can check punctuation before publishing and keep the novel dialogue formatting consistent.",
          "Writers can revise action beats and dialogue tags together in one pass.",
          "Anyone can use the privacy-first editing workflow without sharing the draft with AI.",
        ],
      },
      {
        eyebrow: "Why it ranks",
        title: "The page matches high-intent dialogue editing searches.",
        text:
          "The page language targets the exact phrases writers use when they want a dialogue checker, punctuation help, or an adverb checker.",
        bullets: [
          "Clear title and description for search intent.",
          "Specific keywords tied to editing tasks.",
          "Direct links to the editor and supporting guides.",
          "Schema that tells search engines what the page does.",
        ],
      },
    ],
    closingEyebrow: "Revision workflow",
    closingTitle: "Use the editor before you start polishing line by line.",
    closingText:
      "A fast pass through the dialogue can reveal the lines that need the most work, which makes the rest of the revision easier.",
    faqEyebrow: "Editing questions",
    faqTitle: "Questions writers ask before using a dialogue editor.",
    faqText:
      "These answers cover the most common concerns about dialogue tags, punctuation, and privacy.",
    faqs: [
      {
        question: "Does the dialogue editor use AI?",
        answer:
          "No. The tool is designed to flag patterns and issues so you can decide how to revise the line yourself.",
      },
      {
        question: "Can I use it for fanfiction dialogue?",
        answer:
          "Yes. It is a strong fit for fanfiction, original fiction, and any project where dialogue formatting matters.",
      },
      {
        question: "What is the main benefit of a dialogue editing tool?",
        answer:
          "It helps you catch formatting problems faster so you can focus on voice, pacing, and scene clarity.",
      },
    ],
  },
  "how-to-format-dialogue": {
    slug: "how-to-format-dialogue",
    title: "How to Format Dialogue | Rules for Novels and Fanfiction",
    description:
      "Learn how to format dialogue in novels and fanfiction with punctuation rules, tags, action beats, and practical examples.",
    heroEyebrow: "For writers learning dialogue rules",
    heroTitle: "How to format dialogue in a novel or fanfiction scene.",
    heroText:
      "Learn the rules for quotation marks, paragraph breaks, dialogue tags, action beats, and punctuation so spoken lines read naturally.",
    sidebarEyebrow: "Formatting basics",
    sidebarTitle: "Keep the rules simple enough to use while drafting.",
    sidebarText:
      "This page is for writers who want a clear explanation they can apply right away, without losing the rhythm of the scene.",
    keywordSummary:
      "This guide answers how to format dialogue, how to edit dialogue, and how to punctuate dialogue for novels and fanfiction.",
    keywords: [
      "how to format dialogue",
      "how to edit dialogue",
      "dialogue rules for books",
      "how to punctuate dialogue",
      "novel dialogue formatting",
      "dialogue punctuation checker",
      "dialogue tags and action beats",
      "fanfiction dialogue rules",
      "how to write dialogue",
    ],
    heroBadges: [
      "how to edit dialogue",
      "dialogue rules for books",
      "dialogue punctuation checker",
      "action beats",
    ],
    primaryCta: {
      label: "Use the dialogue editor",
      href: "/editor",
    },
    secondaryCta: {
      label: "Read the blog",
      href: "/blog/dialogue-rules-for-books",
    },
    sectionsEyebrow: "What to remember",
    sectionsTitle: "Practical dialogue rules for fiction writers.",
    sectionsText:
      "The goal is not abstract theory. It is to make spoken lines easier to read, easier to revise, and easier to keep consistent.",
    sections: [
      {
        eyebrow: "Core rules",
        title: "Formatting dialogue becomes easier when you keep the rules consistent.",
        text:
          "The page is designed for writers who want a practical summary of the most useful dialogue formatting rules.",
        bullets: [
          "Start a new paragraph when the speaker changes so how to format dialogue stays easy to follow.",
          "Keep quotation marks and punctuation consistent when you format dialogue in a novel or fanfiction scene.",
          "Use dialogue tags only when they add clarity instead of repeating the same rhythm.",
          "Let action beats do some of the work when you are learning how to edit dialogue.",
        ],
      },
      {
        eyebrow: "Common mistakes",
        title: "Most dialogue problems are small, repeated, and easy to fix.",
        text:
          "A focused checklist helps you catch the same errors before they spread across the draft.",
        bullets: [
          "Avoid overusing said-bookisms and adverbs in tags when you format dialogue.",
          "Break paragraphs when the speaker changes so the dialogue rules for books stay clear.",
          "Avoid stacking too many actions on top of one line if you want a cleaner read.",
          "Keep punctuation styles consistent inside the same scene.",
        ],
      },
      {
        eyebrow: "Use the tool",
        title: "Pair the rules with a dialogue checker while you revise.",
        text:
          "A guide teaches the rule. The editor helps you apply it quickly to the actual scene.",
        bullets: [
          "Check the draft in the editor after you revise a chapter.",
          "Compare the result against your character notes.",
          "Read the blog guides when you want more detailed examples.",
          "Use the same process for novels, fanfiction, and web fiction.",
        ],
      },
    ],
    closingEyebrow: "Next step",
    closingTitle: "Use the guide and the editor together.",
    closingText:
      "Read the rule when you are unsure, then check the scene in the editor so you can apply the guidance directly to your draft.",
    faqEyebrow: "Formatting questions",
    faqTitle: "Questions about formatting dialogue in fiction.",
    faqText:
      "These answers keep the rules practical so writers can format scenes without getting stuck in theory.",
    faqs: [
      {
        question: "How do you format dialogue in a novel?",
        answer:
          "Use consistent quotation marks, break paragraphs when the speaker changes, and keep punctuation aligned with your style guide or house rules.",
      },
      {
        question: "Should dialogue tags come before or after the line?",
        answer:
          "Either can work. Choose the placement that keeps the sentence clear and avoids repeating the same rhythm too often.",
      },
      {
        question: "Can this page help with fanfiction dialogue rules?",
        answer:
          "Yes. The guidance applies to fanfiction and original fiction whenever you want cleaner, easier-to-read dialogue.",
      },
    ],
  },
}

export const marketingPageEntries = Object.values(marketingPages)

export const getMarketingPage = (slug: string) => marketingPages[slug]

export const getMarketingPaths = () => marketingPageEntries.map((page) => `/${page.slug}`)

export const buildMarketingMetadata = (page: MarketingPage): Metadata => {
  const canonical = `${SITE_URL}/${page.slug}`

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    applicationName: SITE_NAME,
    category: "Writing Tools",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${page.title}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export const buildMarketingJsonLd = (page: MarketingPage) => {
  const canonical = `${SITE_URL}/${page.slug}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: "en-US",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@type": "Thing",
          name: page.heroTitle,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }
}