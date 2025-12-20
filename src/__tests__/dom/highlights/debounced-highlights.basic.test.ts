/**
 * @jest-environment jsdom
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { createMockQuill } from '../mocks/quill.mock'
import { useDebouncedHighlights } from '../../../app/editor/hooks/quill/debounced-highlights.hook'
import Rules from "../../../app/editor/utils/regex/regex.utils"

jest.mock("../../../app/editor/utils/highlights/highlights.utils", () => ({
  applyHighlights: jest.fn(async (quill, rules) => {
    // Mock implementation that doesn't use Delta
    // Just track that it was called
    return Promise.resolve()
  }),
}))
describe('useDebouncedHighlights - Basic Highlighting', () => {
  let quill: ReturnType<typeof createMockQuill>

  beforeEach(() => {
    quill = createMockQuill()
    jest.clearAllMocks()
    jest.useFakeTimers()
    Rules.setCharacters([])
    Rules.setDialogueTags(['said', 'asked', 'whispered', 'cried', 'shouted'])
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should apply highlights on hook initialization with non-empty text', async () => {
    const testText = `"Hello," Emily said.`
    quill._setText(testText)
    Rules.setCharacters(['Emily'])

    const { result } = renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(quill.disable).toHaveBeenCalled()
    })
  })

  it('should not apply highlights on initialization with empty text', async () => {
    quill._setText('')

    const { result } = renderHook(() => useDebouncedHighlights(quill as any, false))

    expect(result.current.isApplyingHighlights).toBe(false)
  })

  it('should detect comma-without-dialogue-tag errors', async () => {
    const testText = `"Hello," someone spoke.`
    quill._setText(testText)
    Rules.setCharacters([])
    Rules.setDialogueTags(['said'])

    renderHook(() => useDebouncedHighlights(quill as any, false))

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      const rules = Rules.getRules()
      const commaRule = rules.find((r) => r.id === 'comma-no-dialogue')
      expect(commaRule).toBeDefined()
      expect(commaRule?.regex.test(testText)).toBe(true)
    })
  })
})
