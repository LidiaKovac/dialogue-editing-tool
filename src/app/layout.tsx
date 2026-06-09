import type { Metadata } from "next"
import "./globals.scss"
import "quill/dist/quill.snow.css"

import { CookieConsent } from "./components/CookieConsent/CookieConsent.component"
import { Navbar } from "./components/Navbar/Navbar.component"
import { Footer } from "./components/Footer/Footer"
import metadataObj from "./metadata"
import { font } from "./lib/fonts"

export const metadata: Metadata = metadataObj

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="rE38Kd_bfIAsyV3_C-Bb5HVD75iG09H12kCa2Olwkfg"
        />
      </head>
      <body className={`${font.variable}  antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
