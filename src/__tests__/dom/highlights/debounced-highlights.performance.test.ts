/**
 * @jest-environment jsdom
 */

import { renderHook, act, waitFor } from "@testing-library/react"
import { createMockQuill } from "../mocks/quill.mock"
import { useDebouncedHighlights } from "../../../app/editor/hooks/quill/debounced-highlights.hook"
import Rules from "../../../app/editor/utils/regex/regex.utils"
import { generateLongDialogue } from "../mocks/quill.mock_1"
jest.mock("../../../app/editor/utils/highlights/highlights.utils", () => ({
  applyHighlights: jest.fn(async (quill, rules) => {
    // Mock implementation that doesn't use Delta
    // Just track that it was called
    return Promise.resolve()
  }),
}))
describe('useDebouncedHighlights - Performance', () => {
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

  it('should handle 30k words of dialogue without hanging', async () => {
    jest.setTimeout(10000)

    const characters = ['Emily', 'Jesse', 'Tom', 'Sarah', 'Alex']
    const tags = ['said', 'asked', 'whispered', 'cried', 'shouted']
    const longText = generateLongDialogue(30000, characters, tags)

    quill._setText(longText)
    Rules.setCharacters(characters)
    Rules.setDialogueTags(tags)

    const startTime = performance.now()

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    const endTime = performance.now()
    const executionTime = endTime - startTime

    expect(executionTime).toBeLessThan(5000)

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })
  })

  it('should still debounce correctly with large documents', async () => {
    const characters = ['Emily', 'Jesse', 'Tom']
    const tags = ['said', 'asked', 'replied']
    const longText = generateLongDialogue(10000, characters, tags)

    quill._setText(longText)
    Rules.setCharacters(characters)
    Rules.setDialogueTags(tags)

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    const initialCallCount = (quill.disable as jest.Mock).mock.calls.length

    act(() => {
      quill._triggerTextChange()
    })

    act(() => {
      jest.advanceTimersByTime(250)
    })

    expect((quill.disable as jest.Mock).mock.calls.length).toBe(initialCallCount)

    act(() => {
      jest.advanceTimersByTime(250)
    })

    await waitFor(() => {
      expect((quill.disable as jest.Mock).mock.calls.length).toBeGreaterThan(initialCallCount)
    })
  })
})
