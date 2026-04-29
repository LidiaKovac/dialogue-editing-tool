import Script from "next/script"
import CharacterSheetBuilder from "./CharacterSheetBuilder"
import structuredData from "./structuredData"

export default function CharacterSheetBuilderPage() {
  return (
    <>
      <Script id="character-sheet-builder-ld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <CharacterSheetBuilder />
    </>
  )
}
