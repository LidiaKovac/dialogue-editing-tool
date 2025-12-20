import {
  getAriLabel,
  getLIXLabel,
} from "@/app/editor/components/Options/options.fn"
import { calculateReadabilityScore } from "@/app/editor/utils/readability/lix.fn"

describe("calculateReadabilityScore", () => {
  test("calculates ARI correctly", () => {
    const result = calculateReadabilityScore(
      `"Hello," said Alice. "How are you today?" She walked slowly through the garden. The implementation requires sophisticated algorithms and careful consideration of edge cases in readability analysis.`
    )
    expect(result.ari).toBeDefined()
    expect(result.lix).toBeDefined()

    expect(result.ari).toBe(11)
    expect(getAriLabel(result.ari ?? 0)).toBe("High school")
    expect(result.lix).toBe(52)
    expect(getLIXLabel(result.lix ?? 0)).toBe("Non fiction text")
  })

  test("empty text returns undefined", () => {
    const result = calculateReadabilityScore("")

    expect(result.ari).toBeUndefined() // Formula with defaults -> returns undefined values
  })

  test("no sentences uses fallback", () => {
    const result = calculateReadabilityScore("Hello world")

    expect(result.ari).toBe(1) // 1 sentence fallback
  })
})
