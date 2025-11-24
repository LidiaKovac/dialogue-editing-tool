import type { Metadata } from "next"
import "./globals.scss"
import "quill/dist/quill.snow.css"

import { Roboto_Mono } from "next/font/google"
import { Navbar } from "./components/Navbar/Navbar.component"
import { Footer } from "./components/Footer/Footer"
const font = Roboto_Mono({
  variable: "--roboto_mono-font",
})
const jsonld = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Dialogue Thing",
  url: "https://editingthing.com",
  logo: "https://editingthing.com/favicon-32x32.png",
  applicationCategory: "WritingTool",
  operatingSystem: "Web",
  softwareVersion: "1.0",
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: "Lidia Kovac",
  },
  creator: {
    "@type": "Person",
    name: "Lidia Kovac",
  },
  description:
    "The Dialogue Thing is a free dialogue editor with real-time grammar validation, character tracking, and intelligent formatting suggestions—perfect for novelists, screenwriters, and content creators.",
  datePublished: "2025-10-01",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Real-time grammar validation",
    "Character dialogue tracking",
    "Intelligent formatting suggestions",
    "Speech attribution checking",
    "Punctuation error detection",
  ],
}
export const metadata: Metadata = {
  alternates: {
    canonical: "https://editingthing.com",
  },
  // Basic Meta Tags
  title: "The Dialogue Thing - Edit your dialogue for free!",
  description:
    "Dialogue editor with real-time grammar validation, character tracking, and intelligent formatting suggestions. Perfect for novelists, screenwriters, and content creators.",
  keywords: [
    "dialogue editor",
    "writing tool",
    "grammar checker",
    "novel writing",
    "screenwriting",
    "character dialogue",
    "writing assistant",
    "punctuation checker",
    "dialogue formatting",
    "creative writing",
    "author tools",
    "manuscript editor",
    "writing software",
    "dialogue validation",
    "speech attribution",
  ],
  authors: [{ name: "Lidia Kovac" }], // Replace with actual author
  creator: "Lidia Kovac",
  publisher: "Lidia Kovac", // Replace with your company/name

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://editingthing.com", // Replace with your domain
    siteName: "The Dialogue Thing",
    title: "The Dialogue Thing - Edit your dialogue for free!",
    description:
      "Dialogue editor with real-time validation and formatting suggestions. Write better dialogue with intelligent grammar checking and character tracking.",
    images: [
      {
        url: "https://editingthing.com/ogimage.png", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "The Dialogue Thing - Smart Writing Assistant",
        type: "image/png",
      },
    ],
  },

  // Additional Meta Tags
  applicationName: "The Dialogue Thing",
  referrer: "origin-when-cross-origin",
  category: "Writing Tools",
  classification: "Writing Software",

  // Robots and SEO
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

  // Additional structured data
  other: {
    "application/ld+json": JSON.stringify(jsonld),
    // App-specific meta tags
    "application-name": "The Dialogue Thing",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "The Dialogue Thing",

    // Theme colors
    "theme-color": "#ffffff", // Adjust to match your app's theme
    "msapplication-TileColor": "#ffffff",
    "msapplication-navbutton-color": "#ffffff",

    // Content type and language
    "content-language": "en",
    "content-type": "text/html; charset=utf-8",

    // Cache control
    "cache-control": "public, max-age=31536000",

    // Additional SEO tags
    rating: "General",
    distribution: "Global",
    "revisit-after": "7 days",
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],

    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#ffffff", // Adjust to your brand color
      },
    ],
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="rE38Kd_bfIAsyV3_C-Bb5HVD75iG09H12kCa2Olwkfg" />
      </head>
      <body className={`${font.variable}  antialiased`}>
        <Navbar/>
        {children}
        <Footer/>
        </body>

    </html>
  )
}
