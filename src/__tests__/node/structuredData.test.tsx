import { renderToStaticMarkup } from "react-dom/server"
import { StructuredData } from "@/app/components/StructuredData/StructuredData"
import metadata from "@/app/metadata"
import { SITE_URL } from "@/lib/site"

test("renders linked site and person data as JSON-LD", () => {
  const html = renderToStaticMarkup(<StructuredData />)
  const content = html.match(
    /^<script type="application\/ld\+json">(.+)<\/script>$/
  )?.[1]

  if (!content) {
    throw new Error("Expected a JSON-LD script")
  }
  const data = JSON.parse(content)
  const person = data.find((item: { "@type": string }) => item["@type"] === "Person")
  const organization = data.find((item: { "@type": string }) => item["@type"] === "Organization")
  const application = data.find((item: { "@type": string }) => item["@type"] === "SoftwareApplication")
  const website = data.find((item: { "@type": string }) => item["@type"] === "WebSite")

  expect(person).toEqual(expect.objectContaining({
    "@id": `${SITE_URL}/#lidia-kovac`,
    name: "Lidia Kovac",
    url: "https://lidiakovac.it/",
    jobTitle: "Web developer and teacher",
    sameAs: ["https://medium.com/@lidiacodes", "https://www.youtube.com/@lidiacodes"],
  }))
  expect(organization.founder["@id"]).toBe(person["@id"])
  expect(application.author["@id"]).toBe(person["@id"])
  expect(application.creator["@id"]).toBe(person["@id"])
  expect(website).toBeDefined()
  expect(metadata.other?.["application/ld+json"]).toBeUndefined()
})
