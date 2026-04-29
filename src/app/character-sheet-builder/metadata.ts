import type { Metadata } from "next"

const pageUrl = "https://editingthing.com/character-sheet-builder"
const siteUrl = "https://editingthing.com"

const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: pageUrl,
  },
  title: "Character Sheet Builder - Free Writer Template | The Dialogue Thing",
  description:
    "Build a detailed character sheet in one place. Combine demographics, appearance, psychology, relationships, and a full character arc, then export a polished PDF.",
  keywords: [
    "character sheet builder",
    "character profile template",
    "character arc builder",
    "writer character worksheet",
    "character questionnaire",
    "character planning tool",
    "novel character template",
    "screenplay character sheet",
    "writing tool",
    "AI-free writing tools",
  ],
  applicationName: "The Dialogue Thing",
  category: "Writing Tools",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: pageUrl,
    siteName: "The Dialogue Thing",
    title: "Character Sheet Builder - Free Writer Template",
    description:
      "Build a full character profile with guided prompts and a character arc builder. Optional magic and tech sections included.",
    images: [
      {
        url: `${siteUrl}/ogimage.jpg`,
        width: 1200,
        height: 630,
        alt: "The Dialogue Thing - Character Sheet Builder",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Character Sheet Builder - The Dialogue Thing",
    description:
      "Build a character sheet from multiple writer templates and export to PDF. Free and AI-free.",
    images: [`${siteUrl}/ogimage.jpg`],
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

export default metadata
