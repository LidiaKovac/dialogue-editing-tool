import { SITE_URL as siteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "../lib/site"
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "The Dialogue Thing",
  url: siteUrl,
  logo: `${siteUrl}/favicon-32x32.png`,
  founder: {
    "@type": "Person",
    name: "Lidia Kovac",
  },
}
const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: siteUrl,
  logo: `${siteUrl}${DEFAULT_OG_IMAGE}`,
  applicationCategory: "WritingTool",
  operatingSystem: "Web",
  softwareVersion: "1.0",
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Lidia Kovac",
  },
  creator: {
    "@type": "Person",
    name: "Lidia Kovac",
  },
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  description:
    "The Dialogue Thing is a privacy-first web app for writers that supports character sheets for writers, novel editing, how to edit dialogue, and how to format dialogue without collecting user writing data.",
  datePublished: "2025-10-01",
  dateModified: "2026-03-19",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isAccessibleForFree: true,
  applicationSubCategory: "TextEditor",
  audience: {
    "@type": "Audience",
    audienceType: "Writers",
  },
  keywords: [
    "character sheets for writers",
    "character sheet for writers",
    "writer character sheet",
    "novel editing",
    "how to edit dialogue",
    "how to format dialogue",
    "dialogue editor",
    "fanfiction editing",
    "edit dialogue online",
    "novel dialogue formatting",
    "dialogue tags",
    "action beats",
    "adverb checker",
    "AI-free writing tool",
  ],
  featureList: [
    "Helps writers edit dialogue and spot punctuation issues",
    "Supports character sheets for writers and cast notes",
    "Guides novel editing workflows in the browser",
    "Explains how to format dialogue consistently",
    "Works entirely AI-free in the browser",
    "Privacy-first with no collection of user writing data",
  ],
}

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
  description:
    "A privacy-first web app for writers focused on character sheets for writers, novel editing, and dialogue formatting without collecting user writing data.",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

export default [organization, softwareApplication, webSite]
