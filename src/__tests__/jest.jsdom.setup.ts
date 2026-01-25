import "@testing-library/jest-dom"

// Add fetch polyfill
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([]), // Empty array or whatever your API returns
    text: () => Promise.resolve(""),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  } as Response)
)

// Configure fake timers for all tests
beforeEach(() => {
  jest.useFakeTimers()

  // Reset fetch mock
  ;(global.fetch as jest.Mock).mockClear()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
  jest.clearAllMocks()
})
