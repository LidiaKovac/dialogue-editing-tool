import { NextRequest, NextResponse } from "next/server"
import { __TEST__resetCache, POST } from "../../app/api/names/route" // Adjust path to your endpoint
import { LRUCache } from "lru-cache"
// Mock the dependencies
jest.mock("lru-cache")

function createMockRequest(body: string): NextRequest {
  return new NextRequest(process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000/" + "api/names", {
    method: "POST",
    body,
  })
}

async function getResponseJson(response: NextResponse) {
  return await response.json()
}

describe("POST /api/names", () => {
  let mockCache: {
    has: jest.Mock
    get: jest.Mock
    set: jest.Mock
  }

  beforeEach(() => {
    jest.resetAllMocks()

    // Mock LRUCache
    mockCache = { has: jest.fn(), get: jest.fn(), set: jest.fn() }
    ;(LRUCache as jest.MockedClass<typeof LRUCache>).mockImplementation(
      () => mockCache as any
    )
    __TEST__resetCache()
    // Mock tagger

    // Mock NLP utilities
  })

  describe("Cache functionality", () => {
    it("returns cached result when text exists in cache", async () => {
      const cachedNames = new Set(["Alice", "Bob", "Charlie"])
      mockCache.has.mockReturnValue(true)
      mockCache.get.mockReturnValue(cachedNames)

      const request = createMockRequest("some cached text")
      const response = await POST(request)
      const result = await getResponseJson(response)

      expect(mockCache.has).toHaveBeenCalledWith("some cached text")
      expect(mockCache.get).toHaveBeenCalledWith("some cached text")
      expect(result).toEqual(["Alice", "Bob", "Charlie"])
    })

    it("processes text and caches result when not in cache", async () => {
      mockCache.has.mockReturnValue(false)

      const request = createMockRequest("John John Smith Smith")
      const response = await POST(request)
      const result = await getResponseJson(response)

      expect(mockCache.has).toHaveBeenCalledWith("John John Smith Smith")

      expect(mockCache.set).toHaveBeenCalledWith(
        "John John Smith Smith",
        new Set(["John"])
      )
      expect(result).toEqual(["John"])
    })
  })

  describe("Name extraction logic", () => {
    beforeEach(() => {
      mockCache.has.mockReturnValue(false)
    })

    it("returns empty array when no proper nouns found", async () => {
      const request = createMockRequest("the quick brown fox")
      const response = await POST(request)
      const result = await getResponseJson(response)

      expect(result).toEqual([])
      expect(mockCache.set).toHaveBeenCalledWith(
        "the quick brown fox",
        new Set()
      )
    })

    it("find unique names", async () => {
      const request = createMockRequest("Mary Mary had a little lamb John")
      const response = await POST(request)
      const result = await getResponseJson(response)

      expect(result).toEqual(["Mary", "John"])
      expect(mockCache.set).toHaveBeenCalledWith(
        "Mary Mary had a little lamb John",
        new Set(["Mary", "John"])
      )
    })

    it("handles all uppercase names names", async () => {
      const request = createMockRequest("ALICE alice BOB bob charlie")
      const response = await POST(request)
      const result = await getResponseJson(response)

      // Should group case-insensitively and return properly capitalized
      expect(result).toEqual(["Alice", "Bob"])
      expect(mockCache.set).toHaveBeenCalledWith(
        "ALICE alice BOB bob charlie",
        new Set(["Alice", "Bob"])
      )
    })
  })

  describe("Edge cases", () => {
    beforeEach(() => {
      mockCache.has.mockReturnValue(false)
    })

    it("handles empty text input", async () => {
      const request = createMockRequest("")
      const response = await POST(request)
      const result = await getResponseJson(response)

      expect(result).toEqual([])
      expect(mockCache.set).toHaveBeenCalledWith("", new Set())
    })
  })
})
