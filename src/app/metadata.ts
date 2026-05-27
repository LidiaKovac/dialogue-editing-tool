import type { Metadata } from "next"
import structuredData from "./structuredData"
import { SITE_URL as siteUrl, SITE_NAME, TWITTER_HANDLE, DEFAULT_OG_IMAGE } from "./lib/site"

const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },

  // Basic meta
  title: {
    default:
      "The Dialogue Thing - Free AI-free Dialogue Editor for Fanfiction and Novels",
    template: "%s | The Dialogue Thing",
  },
  description:
    "The Dialogue Thing is a privacy-first web app for writers that helps with character sheets for writers, novel editing, how to edit dialogue, and how to format dialogue without collecting user writing data.",
  keywords: [
    "dialogue editor",
    "fanfiction editing",
    "edit dialogue online",
    "novel dialogue formatting",
    "fanfiction dialogue editor",
    "dialogue punctuation checker",
    "dialogue tag checker",
    "dialogue tags and action beats",
    "punctuation checker for dialogue",
    "adverb checker",
    "writing tool for authors",
    "AI-free writing tool",
    "edit fanfiction dialogue",
    "character sheet for writers",
    "character sheet maker for writers"
  ],
  authors: [{ name: "Lidia Kovac", url: siteUrl }],
  creator: "Lidia Kovac",
  publisher: "Lidia Kovac",
  applicationName: "The Dialogue Thing",
  referrer: "origin-when-cross-origin",
  category: "Writing Tools",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Dialogue Thing",
    title: "The Dialogue Thing - Edit Your Dialogue for Free",
    description:
      "A privacy-first web app for writers that helps with character sheets for writers, novel editing, how to edit dialogue, and how to format dialogue without collecting user writing data.",
    images: [
      {
        url: `${siteUrl}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – Smart dialogue editing tool`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Dialogue Thing - Free AI-free Dialogue Editor",
    description:
      "Clean up dialogue, build character sheets, and handle novel editing in a privacy-first web app made for writers.",
    images: [`${siteUrl}${DEFAULT_OG_IMAGE}`],
    creator: TWITTER_HANDLE, // set your Twitter handle in src/lib/site.ts
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
    "application/ld+json": JSON.stringify(structuredData),
    "application-name": "The Dialogue Thing",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "The Dialogue Thing",

    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "msapplication-navbutton-color": "#ffffff",

    "content-language": "en",
    "content-type": "text/html; charset=utf-8",

    rating: "General",
    distribution: "Global",
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "256x256", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon-32x32.png",
        color: "#000000",
      },
    ],
  },
}

export default metadata
