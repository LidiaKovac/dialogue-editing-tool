import Script from "next/script"

import MarketingLandingPage from "../MarketingLandingPage"
import { buildMarketingJsonLd, buildMarketingMetadata, getMarketingPage } from "../marketing-pages"

const page = getMarketingPage("dialogue-editing")

export const metadata = buildMarketingMetadata(page)

export default function DialogueEditingPage() {
  return (
    <>
      <Script id="dialogue-editing-jsonld" type="application/ld+json">
        {JSON.stringify(buildMarketingJsonLd(page))}
      </Script>
      <MarketingLandingPage page={page} />
    </>
  )
}