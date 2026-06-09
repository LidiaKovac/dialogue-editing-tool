import Script from "next/script"

import MarketingLandingPage from "../MarketingLandingPage"
import { buildMarketingJsonLd, buildMarketingMetadata, getMarketingPage } from "../marketing-pages"

const page = getMarketingPage("how-to-format-dialogue")

export const metadata = buildMarketingMetadata(page)

export default function HowToFormatDialoguePage() {
  return (
    <>
      <Script id="how-to-format-dialogue-jsonld" type="application/ld+json">
        {JSON.stringify(buildMarketingJsonLd(page))}
      </Script>
      <MarketingLandingPage page={page} />
    </>
  )
}