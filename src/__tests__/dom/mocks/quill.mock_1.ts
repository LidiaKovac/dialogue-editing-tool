/**
 * Quill Mock Factory
 * Reusable Quill instance mock and helpers for all tests
 */

export interface MockQuillInstance {
  getText: jest.Mock
  getContents: jest.Mock
  setContents: jest.Mock
  getSelection: jest.Mock
  formatText: jest.Mock
  disable: jest.Mock
  enable: jest.Mock
  blur: jest.Mock
  on: jest.Mock
  off: jest.Mock
  _listeners: Record<string, Function[]>
  _setText: (text: string) => void
  _triggerTextChange: () => void
}

export function createMockQuill(): MockQuillInstance {
  let text = ''
  const listeners: Record<string, Function[]> = {}

  return {
    getText: jest.fn(() => text),
    getContents: jest.fn(() => ({
      ops: [{ insert: text }],
      length: jest.fn(() => text.length), // Add length() method
    })),
    setContents: jest.fn((delta) => {
      // Extract text from delta if needed
      if (delta && delta.ops) {
        text = delta.ops.map((op: any) => op.insert || "").join("")
      }
      return delta
    }),
    getSelection: jest.fn(() => ({ index: 0, length: 0 })),
    formatText: jest.fn(
      (index: number, length: number, format: string, value: any) => {
        // Track formatting calls
      }
    ),
    disable: jest.fn(),
    enable: jest.fn(),
    blur: jest.fn(),
    on: jest.fn((event: string, callback: Function) => {
      if (!listeners[event]) listeners[event] = []
      listeners[event].push(callback)
    }),
    off: jest.fn((event: string, callback: Function) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((cb) => cb !== callback)
      }
    }),
    _listeners: listeners,
    _setText: (newText: string) => {
      text = newText
    },
    _triggerTextChange: function () {
      if (listeners["text-change"]) {
        listeners["text-change"].forEach((cb) => cb())
      }
    },
  }
}

/**
 * Generate a long dialogue sample with specified word count
 */
export function generateLongDialogue(
  wordCount: number,
  characters: string[],
  tags: string[]
): string {
  const sentences = [
    'This is an important dialogue.',
    'We need to discuss this matter.',
    'I agree with your point.',
    'That makes sense to me.',
    'Let me think about it.',
    'What do you mean?',
    'I do not understand.',
    'Please clarify that.',
    'That is interesting.',
    'Tell me more about it.',
  ]

  let dialogue = ''
  let currentWords = 0

  while (currentWords < wordCount) {
    const char = characters[Math.floor(Math.random() * characters.length)]
    const tag = tags[Math.floor(Math.random() * tags.length)]
    const sentence = sentences[Math.floor(Math.random() * sentences.length)]

    const line = `"${sentence}" ${char} ${tag}.\n`
    dialogue += line
    currentWords += line.split(/\s+/).length
  }

  return dialogue
}

/**
 * Mock for highlights utility
 */
export const mockApplyHighlights = jest.fn(async (quill, rules) => {
  const text = quill.getText()

  for (const rule of rules) {
    let match
    rule.regex.lastIndex = 0
    while ((match = rule.regex.exec(text)) !== null) {
      if (match[1]) {
        quill.formatText(match.index, match[0].length, `rule-${rule.id}`, true)
      }
    }
  }
})

/**
 * Setup mocks (call this in test setup)
 */
export function setupMocks() {
  jest.mock('@/app/utils/highlights/highlights.utils', () => ({
    applyHighlights: mockApplyHighlights,
  }))

  jest.mock('@/app/lib/quill/quill.options', () => ({
    QUILL_DEBOUNCE_TIMER: 500,
  }))
}
