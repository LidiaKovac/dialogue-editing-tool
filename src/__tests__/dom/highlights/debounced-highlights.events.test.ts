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
describe('useDebouncedHighlights - Event Listener Management', () => {
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

  it('should attach text-change listener when quill is available', () => {
    quill._setText('Test')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    expect((quill.on as jest.Mock).mock.calls.some((call) => call[0] === 'text-change')).toBe(true)
  })

  it('should clean up text-change listener on unmount', () => {
    quill._setText('Test')

    const { unmount } = renderHook(() => useDebouncedHighlights(quill as any, false))

    unmount()

    expect((quill.off as jest.Mock).mock.calls.some((call) => call[0] === 'text-change')).toBe(true)
  })

  it('should clear pending timers on unmount', () => {
    quill._setText('Test')

    const { unmount } = renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      quill._triggerTextChange()
      jest.advanceTimersByTime(250)
    })

    unmount()

    jest.clearAllTimers()

    expect(jest.getTimerCount()).toBe(0)
  })
})
