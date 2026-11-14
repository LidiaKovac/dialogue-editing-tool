import { renderToStaticMarkup } from "react-dom/server"
import { Footer } from "@/app/components/Footer/Footer"

test("renders a descriptive, crawlable link to Archivolto", () => {
  const html = renderToStaticMarkup(<Footer />)
  const link = html.match(
    /<a\b[^>]*href="https:\/\/archivolto\.hahahahahangst\.com\/"[^>]*>[^<]*<\/a>/
  )?.[0]

  expect(link).toBeDefined()
  expect(link).toContain("Archivolto - Fanfiction library and reading tracker")
  expect(link).toContain('target="_blank"')
  expect(link).toContain('rel="noopener"')
  expect(link).not.toMatch(/\b(?:nofollow|sponsored|ugc)\b/)
})
