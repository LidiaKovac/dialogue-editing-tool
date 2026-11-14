import structuredData from "../../structuredData"

export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
    }}
  />
)
