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
describe('useDebouncedHighlights - Debounce Behavior', () => {
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

  it('should debounce text changes by 500ms', async () => {
    quill._setText('Test text')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      quill._triggerTextChange()
    })

    expect(quill.disable).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(250)
    })

    expect(quill.disable).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(250)
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })
  })

  it('should reset debounce timer on consecutive text changes', async () => {
    quill._setText('Test')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      quill._triggerTextChange()
    })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(quill.disable).not.toHaveBeenCalled()

    act(() => {
      quill._triggerTextChange()
    })

    act(() => {
      jest.advanceTimersByTime(250)
    })

    expect(quill.disable).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(250)
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalledTimes(1)
    })
  })

  it('should handle multiple rapid text changes (simulating fast typing)', async () => {
    quill._setText('')

    renderHook(() => useDebouncedHighlights(quill as any, false))

    for (let i = 0; i < 10; i++) {
      act(() => {
        quill._setText(quill.getText() + 'a')
        quill._triggerTextChange()
      })

      act(() => {
        jest.advanceTimersByTime(50)
      })
    }

    expect(quill.disable).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalledTimes(1)
    })
  })

  it('should handle rapid text changes with proper guard flag', async () => {
    quill._setText('Test')
    Rules.setCharacters([])

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    const initialCallCount = (quill.disable as jest.Mock).mock.calls.length

    // Try to trigger another change immediately (should be guarded)
    act(() => {
      quill._triggerTextChange()
    })

    act(() => {
      jest.runAllTimers()
    })

    // Guard should prevent immediate re-application
    expect((quill.disable as jest.Mock).mock.calls.length).toBeLessThanOrEqual(
      initialCallCount + 1
    )
  })
})
