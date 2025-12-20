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
describe('useDebouncedHighlights - Dynamic Configuration', () => {
  let quill: ReturnType<typeof createMockQuill>

  beforeEach(() => {
    quill = createMockQuill()
    jest.clearAllMocks()
    jest.useFakeTimers()
    Rules.setCharacters([])
    Rules.setDialogueTags(['said', 'asked', 'whispered'])
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Character Configuration', () => {
    it('should add pronouns automatically when characters are set', async () => {
      Rules.setCharacters(['Emily'])
      const characters = Rules.CHARACTERS

      expect(characters).toContain('he')
      expect(characters).toContain('she')
      expect(characters).toContain('they')
      expect(characters).toContain('Emily')
    })

    it('should generate correct regex for multiple characters', async () => {
      Rules.setCharacters(['Alice', 'Bob', 'Charlie'])
      const rules = Rules.getRules()

      expect(rules.length).toBeGreaterThan(0)
      expect(rules[0]).toHaveProperty('id')
      expect(rules[0]).toHaveProperty('regex')
      expect(rules[0].regex).toBeInstanceOf(RegExp)
    })

    it('should detect capital-after-comma errors with unregistered characters', async () => {
      const testText = `"Hello," Tom walked away.`
      quill._setText(testText)
      Rules.setCharacters([]) // Tom not registered
      Rules.setDialogueTags(['said'])

      renderHook(() => useDebouncedHighlights(quill as any, false))

      act(() => {
        jest.runAllTimers()
      })

      await waitFor(() => {
        const rules = Rules.getRules()
        const capitalRule = rules.find((r) => r.id === 'capital-after-comma')
        expect(capitalRule).toBeDefined()
        expect(capitalRule?.regex.test(testText)).toBe(true)
      })
    })
  })

  describe('Dialogue Tag Configuration', () => {
    it('should update rules when dialogue tags are changed', async () => {
      const testText = `"Hello," Tom whispered.`
      quill._setText(testText)
      Rules.setCharacters(['Tom'])

      renderHook(() => useDebouncedHighlights(quill as any, false))

      Rules.setDialogueTags(['said', 'asked'])

      act(() => {
        jest.runAllTimers()
      })

      const initialRules = Rules.getRules()

      Rules.setDialogueTags(['whispered', 'shouted', 'muttered'])

      const updatedRules = Rules.getRules()

      expect(initialRules[0].regex.toString()).not.toEqual(updatedRules[0].regex.toString())
    })

    it('should use default dialogue tags if none provided', () => {
      Rules.setDialogueTags([])
      const tags = Rules.DIALOGUE_TAGS

      expect(tags.length).toBeGreaterThan(0)
      expect(tags).toContain('said')
    })
  })

  describe('Cache Behavior', () => {
    it('should use cached rules when same config is used', () => {
      Rules.setCharacters(['Alice', 'Bob'])
      Rules.setDialogueTags(['said', 'asked'])

      const rules1 = Rules.getRules()
      const rules2 = Rules.getRules()

      expect(rules1.length).toBe(rules2.length)
      rules1.forEach((rule, i) => {
        expect(rule.id).toBe(rules2[i].id)
      })
    })

    it('should clear cache when characters are updated', () => {
      Rules.setCharacters(['Alice'])
      const rules1 = Rules.getRules()

      Rules.setCharacters(['Bob', 'Charlie'])
      const rules2 = Rules.getRules()

      expect(rules1[0].regex.toString()).not.toBe(rules2[0].regex.toString())
    })

    it('should clear cache when dialogue tags are updated', () => {
      Rules.setDialogueTags(['said', 'asked'])
      const rules1 = Rules.getRules()

      Rules.setDialogueTags(['whispered', 'shouted'])
      const rules2 = Rules.getRules()

      expect(rules1[0].regex.toString()).not.toBe(rules2[0].regex.toString())
    })

    it('should provide all required rule IDs', () => {
      Rules.setCharacters(['Alice'])
      Rules.setDialogueTags(['said', 'asked'])

      const rules = Rules.getRules()
      const ruleIds = rules.map((r) => r.id)

      expect(ruleIds).toContain('comma-no-dialogue')
      expect(ruleIds).toContain('capital-after-comma')
      expect(ruleIds).toContain('lowercase-after-stop')
      expect(ruleIds).toContain('no-dialogue-after-punctuation')
      expect(ruleIds).toContain('capital-after-punctuation')
    })
  })
})
