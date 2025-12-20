/**
 * @jest-environment jsdom
 */

import { renderHook, act, waitFor } from "@testing-library/react"
import { createMockQuill } from "../mocks/quill.mock"
import { useDebouncedHighlights } from "../../../app/editor/hooks/quill/debounced-highlights.hook"
import Rules from "../../../app/editor/utils/regex/regex.utils"
jest.mock("../../../app/editor/utils/highlights/highlights.utils", () => ({
  applyHighlights: jest.fn(async (quill, rules) => {
    // Mock implementation that doesn't use Delta
    // Just track that it was called
    return Promise.resolve()
  }),
}))
describe('useDebouncedHighlights - Complex Dialogue Scenarios', () => {
  let quill: ReturnType<typeof createMockQuill>

  beforeEach(() => {
    quill = createMockQuill()
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should handle valid screenplay dialogue without errors', async () => {
    const testText = `"Hello," Emily said.\n"Hi there," Jesse asked.\n"Nice to meet you," Tom replied.`
    quill._setText(testText)
    Rules.setCharacters(['Emily', 'Jesse', 'Tom'])
    Rules.setDialogueTags(['said', 'asked', 'replied'])

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })

    const rules = Rules.getRules()
    expect(rules.length).toBeGreaterThan(0)
  })

  it('should detect multiple errors in complex dialogue', async () => {
    const testText = `"Stop," Tom ran.\n"Wait!" she was confused.\n"Come back," Jessica ignored.`
    quill._setText(testText)
    Rules.setCharacters(['Jessica'])
    Rules.setDialogueTags(['said'])

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      const rules = Rules.getRules()
      expect(rules.length).toBeGreaterThan(0)

      const hasCommaRule = rules.some((r) => r.id === 'comma-no-dialogue')
      const hasCapitalRule = rules.some((r) => r.id === 'capital-after-punctuation')

      expect(hasCommaRule).toBe(true)
      expect(hasCapitalRule).toBe(true)
    })
  })
})
