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
describe('useDebouncedHighlights - Integration', () => {
  let quill: ReturnType<typeof createMockQuill>

  beforeEach(() => {
    quill = createMockQuill()
    jest.clearAllMocks()
    jest.useFakeTimers()
    Rules.setCharacters([])
    Rules.setDialogueTags(['said', 'asked', 'replied', 'whispered', 'shouted'])
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should handle complete editing workflow: empty → content → update → clear', async () => {
    const { rerender } = renderHook(
      ({ text, characters }) => {
        quill._setText(text)
        Rules.setCharacters(characters)
        return useDebouncedHighlights(quill as any, false)
      },
      { initialProps: { text: '', characters: [] as string[] } }
    )

    act(() => {
      jest.runAllTimers()
    })

    // Start with empty (no highlights)
    expect(quill.disable).not.toHaveBeenCalled()

    // Add dialogue content
    jest.clearAllMocks()
    rerender({ text: `"Hello," Alice said.`, characters: ['Alice'] })

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })

    // Update character list
    jest.clearAllMocks()
    rerender({
      text: `"Hello," Alice said.\n"Hi," Bob replied.`,
      characters: ['Alice', 'Bob'],
    })

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })

    const rules = Rules.getRules()
    expect(rules.length).toBeGreaterThan(0)

    // Clear content
    jest.clearAllMocks()
    rerender({ text: '', characters: [] })

    act(() => {
      jest.runAllTimers()
    })

    // No highlights on empty
    expect(quill.disable).not.toHaveBeenCalled()
  })
})
