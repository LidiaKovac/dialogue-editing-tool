import type { Metadata } from "next"
import { SITE_URL as siteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "../../lib/site"

const editorUrl = `${siteUrl}/editor`

const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: editorUrl,
  },

  title:
    "Free Dialogue Editor - Fix Tags, Punctuation & Adverbs | The Dialogue Thing",
  description:
    "Paste your chapter and instantly spot dialogue tag errors, punctuation mistakes, and overused adverbs. Free, AI-free, privacy first, and it does not collect your writing data.",
  keywords: [
    "free dialogue editor online",
    "dialogue tag checker",
    "edit dialogue tags",
    "punctuation checker for dialogue",
    "adverb checker for writers",
    "fanfiction editor online",
    "novel dialogue editor",
    "action beats vs dialogue tags",
    "AI-free editing tool",
    "dialogue formatting tool",
  ],
  applicationName: "The Dialogue Thing",
  category: "Writing Tools",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: editorUrl,
    siteName: "The Dialogue Thing",
    title: "Free Dialogue Editor - Fix Tags, Punctuation & Adverbs",
    description:
      "Paste your chapter and instantly highlight dialogue tag issues, punctuation errors, and adverbs. No AI, no sign-up, no word limit.",
    images: [
      {
        url: `${siteUrl}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – Free dialogue editing tool`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Dialogue Editor – The Dialogue Thing",
    description:
      "Paste your chapter and fix dialogue tags, punctuation, and adverbs for free. No AI, privacy first, and it does not collect your writing data.",
    images: [`${siteUrl}${DEFAULT_OG_IMAGE}`],
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

  // extra meta / structured data
  other: {
    "application-name": "The Dialogue Thing",
    "content-language": "en",
  },
}

export default metadata
