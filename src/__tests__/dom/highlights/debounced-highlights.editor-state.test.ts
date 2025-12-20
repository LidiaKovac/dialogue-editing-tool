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
describe('useDebouncedHighlights - Editor State Management', () => {
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

  it('should disable editor during highlight application', async () => {
    quill._setText('Test')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })
  })

  it('should re-enable editor after highlights are applied', async () => {
    quill._setText('Test')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.enable).toHaveBeenCalled()
    })
  })

  it('should blur editor during highlight application', async () => {
    quill._setText('Test')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.blur).toHaveBeenCalled()
    })
  })
})
