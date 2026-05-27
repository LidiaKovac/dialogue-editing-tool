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
    "The Dialogue Thing is a free, AI-free dialogue editor that highlights dialogue tag issues, punctuation mistakes, and overused adverbs for fanfiction writers and novelists.",
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
    "Highlights incorrect dialogue patterns and tags",
    "Checks punctuation around dialogue and quotation marks",
    "Flags action verbs incorrectly used as dialogue tags",
    "Detects adverbs in dialogue and narration",
    "Works entirely AI-free in the browser",
    "No account, tracking, or word limit for typical chapters",
  ],
}

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
  description:
    "A free, AI-free dialogue editing tool for fanfiction writers and novelists.",
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
