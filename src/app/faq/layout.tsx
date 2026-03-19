// app/faq/layout.tsx
import type { Metadata } from "next"
import Script from "next/script"

const siteUrl = "https://editingthing.com"
const faqUrl = `${siteUrl}/faq`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FAQ - The Dialogue Thing | AI-Free Dialogue Editor",
  description:
    "Frequently asked questions about The Dialogue Thing, the AI-free dialogue editor for fanfiction and novel writers. Learn how it works, privacy details, and how to use it in your editing workflow.",
  keywords: [
    "dialogue editor",
    "fanfiction editing",
    "novel editing tool",
    "dialogue formatting",
    "writing software",
    "edit dialogue online",
    "AI-free writing tool",
  ],
  openGraph: {
    type: "website",
    url: faqUrl,
    title: "FAQ - The Dialogue Thing",
    description:
      "Answers to common questions about The Dialogue Thing: features, privacy, pricing, and how to use the dialogue editing tool for fanfiction and novels.",
    siteName: "The Dialogue Thing",
    images: [
      {
        url: `${siteUrl}/ogimage.jpg`,
        width: 1200,
        height: 630,
        alt: "The Dialogue Thing - FAQ",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - The Dialogue Thing",
    description:
      "Answers to common questions about The Dialogue Thing: features, privacy, pricing, and how to use the dialogue editing tool.",
    images: [`${siteUrl}/ogimage.jpg`],
  },
  alternates: {
    canonical: faqUrl,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is The Dialogue Thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Dialogue Thing is a free, AI-free editing tool that highlights dialogue formatting issues, odd tags, and overused adverbs for fanfiction and novel writers.",
      },
    },
    {
      "@type": "Question",
      name: "Who is The Dialogue Thing for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is designed for fanfiction writers, original fiction authors, and anyone who wants cleaner, clearer dialogue without giving their text to an AI model.",
      },
    },
    {
      "@type": "Question",
      name: "Does The Dialogue Thing use AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Dialogue Thing does not use AI to rewrite your text. It simply flags patterns so you can decide what to change.",
      },
    },
    {
      "@type": "Question",
      name: "Is my writing saved or tracked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The tool is built to avoid storing or tracking your text. Your writing is not used for training, analytics, or resold to third parties.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use it to edit a whole book or just fanfiction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use it on fanfiction, novels, web serials, and any other fiction project that includes dialogue.",
      },
    },
  ],
}

export default function FaqLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
