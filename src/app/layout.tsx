import type { Metadata } from "next"
import "./globals.scss"
import "quill/dist/quill.snow.css"

import { Roboto_Mono } from "next/font/google"
import { Navbar } from "./components/Navbar/Navbar.component"
import { Footer } from "./components/Footer/Footer"
import metadataObj from "./metadata"
const font = Roboto_Mono({
  variable: "--roboto_mono-font",
})

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
      </body>
    </html>
  )
}
