import type { Metadata } from "next"
import structuredData from "./structuredData"

const siteUrl = "https://editingthing.com"

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
    "Edit your dialogue for free with The Dialogue Thing - an AI-free tool that spots dialogue tag issues, punctuation mistakes, and overused adverbs. Built for fanfiction writers and novelists.",
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
      "A free, AI-free dialogue editor that highlights dialogue tag problems, formatting issues, and adverbs so you stay in control of your fanfiction or novel edits.",
    images: [
      {
        url: `${siteUrl}/ogimage.jpg`,
        width: 1200,
        height: 630,
        alt: "The Dialogue Thing - Smart dialogue editing tool",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Dialogue Thing - Free AI-free Dialogue Editor",
    description:
      "Clean up your dialogue tags, action beats, and adverbs with a free AI-free editor made for fanfiction writers and novelists.",
    images: [`${siteUrl}/ogimage.jpg`],
    creator: "@", // add handle if you have one
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
