import Script from "next/script"

import MarketingLandingPage from "../MarketingLandingPage"
import { buildMarketingJsonLd, buildMarketingMetadata, getMarketingPage } from "../marketing-pages"

const page = getMarketingPage("character-sheet-for-writers")

export const metadata = buildMarketingMetadata(page)

export default function CharacterSheetForWritersPage() {
  return (
    <>
      <Script id="character-sheet-for-writers-jsonld" type="application/ld+json">
        {JSON.stringify(buildMarketingJsonLd(page))}
      </Script>
      <MarketingLandingPage page={page} />
    </>
  )
}