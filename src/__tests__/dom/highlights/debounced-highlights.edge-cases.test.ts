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
describe('useDebouncedHighlights - Edge Cases', () => {
  let quill: ReturnType<typeof createMockQuill>

  beforeEach(() => {
    quill = createMockQuill()
    jest.clearAllMocks()
    jest.useFakeTimers()
    Rules.setCharacters([])
    Rules.setDialogueTags(['said', 'asked'])
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should handle null quill gracefully', () => {
    const { result } = renderHook(() => useDebouncedHighlights(null, false))

    expect(result.current.isApplyingHighlights).toBe(false)
  })

  it('should handle empty text gracefully', async () => {
    quill._setText('')

    const { result } = renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current.isApplyingHighlights).toBe(false)
  })

  it('should handle text with no rule matches', async () => {
    quill._setText('This is plain text without any dialogue.')
    Rules.setCharacters([])
    Rules.setDialogueTags(['said'])

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })

    const formatCalls = (quill.formatText as jest.Mock).mock.calls
    expect(formatCalls.length).toBeLessThanOrEqual(0)
  })
})
