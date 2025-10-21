import { NextRequest, NextResponse } from "next/server";
import { __TEST__resetCache, POST } from "../app/api/names/route"; // Adjust path to your endpoint
import { LRUCache } from "lru-cache";
import * as nlpUtils from "../app/lib/nlp/nlp.utils";
import { getTaggerSingleton } from "../app/api/lib/tagger.singleton";
// Mock the dependencies
jest.mock("lru-cache");
jest.mock("../app/api/lib/tagger.singleton");
jest.mock("../app/lib/nlp/nlp.utils");

describe("POST /api/names", () => {
  let mockCache: {
    has: jest.Mock;
    get: jest.Mock;
    set: jest.Mock;
  };
  let mockTagger: {
    tag: jest.Mock;
  };

  beforeEach(() => {
    jest.resetAllMocks();

    // Mock LRUCache
    mockCache = { has: jest.fn(), get: jest.fn(), set: jest.fn() };
    (LRUCache as jest.MockedClass<typeof LRUCache>).mockImplementation(
      () => mockCache as any
    );
    __TEST__resetCache();
    // Mock tagger
    mockTagger = { tag: jest.fn() };
    // Ensure tagger.tag always returns an object with taggedWords
    mockTagger.tag.mockReturnValue({ taggedWords: [] });

    // Mock NLP utilities
    (getTaggerSingleton as jest.Mock).mockReturnValue(mockTagger);
    (nlpUtils.preprocessText as jest.Mock).mockImplementation((text) => text);
  });

  function createMockRequest(body: string): NextRequest {
    return new NextRequest(process.env.NEXT_PUBLIC_URL + "api/names", {
      method: "POST",
      body,
    });
  }

  async function getResponseJson(response: NextResponse) {
    return await response.json();
  }

  describe("Cache functionality", () => {
    it("returns cached result when text exists in cache", async () => {
      const cachedNames = new Set(["Alice", "Bob", "Charlie"]);
      mockCache.has.mockReturnValue(true);
      mockCache.get.mockReturnValue(cachedNames);

      const request = createMockRequest("some cached text");
      const response = await POST(request);
      const result = await getResponseJson(response);

      expect(mockCache.has).toHaveBeenCalledWith("some cached text");
      expect(mockCache.get).toHaveBeenCalledWith("some cached text");
      expect(result).toEqual(["Alice", "Bob", "Charlie"]);
      expect(getTaggerSingleton).not.toHaveBeenCalled();
    });

    it("processes text and caches result when not in cache", async () => {
      mockCache.has.mockReturnValue(false);
      mockTagger.tag.mockReturnValue({
        taggedWords: [
          { token: "john", tag: "NNP" },
          { token: "john", tag: "NNP" },
          { token: "smith", tag: "NNP" },
          { token: "smith", tag: "NNP" },
        ],
      });

      const request = createMockRequest("John John Smith Smith");
      const response = await POST(request);
      const result = await getResponseJson(response);

      expect(mockCache.has).toHaveBeenCalledWith("John John Smith Smith");
      expect(getTaggerSingleton).toHaveBeenCalled();
      expect(nlpUtils.preprocessText).toHaveBeenCalledWith(
        "John John Smith Smith"
      );
      expect(mockTagger.tag).toHaveBeenCalled();
      expect(mockCache.set).toHaveBeenCalledWith(
        "John John Smith Smith",
        new Set(["John", "Smith"])
      );
      expect(result).toEqual(["John", "Smith"]);
    });
  });

  describe("Name extraction logic", () => {
    beforeEach(() => {
      mockCache.has.mockReturnValue(false);
    });

    it("returns empty array when no proper nouns found", async () => {
      mockTagger.tag.mockReturnValue({
        taggedWords: [
          { token: "the", tag: "DT" },
          { token: "quick", tag: "JJ" },
          { token: "brown", tag: "JJ" },
          { token: "fox", tag: "NN" },
        ],
      });

      const request = createMockRequest("the quick brown fox");
      const response = await POST(request);
      const result = await getResponseJson(response);

      expect(result).toEqual([]);
      expect(mockCache.set).toHaveBeenCalledWith(
        "the quick brown fox",
        new Set()
      );
    });

    it("extracts names from repeated proper nouns only", async () => {
      mockTagger.tag.mockReturnValue({
        taggedWords: [
          { token: "mary", tag: "NNP" },
          { token: "mary", tag: "NNP" },
          { token: "had", tag: "VBD" },
          { token: "a", tag: "DT" },
          { token: "little", tag: "JJ" },
          { token: "lamb", tag: "NN" },
          { token: "john", tag: "NNP" }, // Single occurrence, should be ignored
        ],
      });

      const request = createMockRequest("Mary Mary had a little lamb John");
      const response = await POST(request);
      const result = await getResponseJson(response);

      expect(result).toEqual(["Mary"]);
      expect(mockCache.set).toHaveBeenCalledWith(
        "Mary Mary had a little lamb John",
        new Set(["Mary"])
      );
    });

    it("handles case-insensitive grouping and proper capitalization", async () => {
      mockTagger.tag.mockReturnValue({
        taggedWords: [
          { token: "ALICE", tag: "NNP" },
          { token: "alice", tag: "NNP" },
          { token: "BOB", tag: "NNP" },
          { token: "bob", tag: "NNP" },
          { token: "charlie", tag: "NNP" },
        ],
      });

      const request = createMockRequest("ALICE alice BOB bob charlie");
      const response = await POST(request);
      const result = await getResponseJson(response);

      // Should group case-insensitively and return properly capitalized
      expect(result).toEqual(["Alice", "Bob"]);
      expect(mockCache.set).toHaveBeenCalledWith(
        "ALICE alice BOB bob charlie",
        new Set(["Alice", "Bob"])
      );
    });

    it("ignores mixed tags for same token", async () => {
      mockTagger.tag.mockReturnValue({
        taggedWords: [
          { token: "will", tag: "NNP" }, // Proper noun
          { token: "will", tag: "MD" }, // Modal verb - mixed tags, should be ignored
          { token: "sarah", tag: "NNP" },
          { token: "sarah", tag: "NNP" }, // All NNP, should be included
        ],
      });

      const request = createMockRequest("Will will Sarah Sarah");
      const response = await POST(request);
      const result = await getResponseJson(response);

      expect(result).toEqual(["Sarah"]);
      expect(mockCache.set).toHaveBeenCalledWith(
        "Will will Sarah Sarah",
        new Set(["Sarah"])
      );
    });
  });

  describe("Edge cases", () => {
    beforeEach(() => {
      mockCache.has.mockReturnValue(false);
    });

    it("handles empty text input", async () => {
      mockTagger.tag.mockReturnValue({ taggedWords: [] });

      const request = createMockRequest("");
      const response = await POST(request);
      const result = await getResponseJson(response);

      expect(result).toEqual([]);
      expect(mockCache.set).toHaveBeenCalledWith("", new Set());
    });

    it("handles preprocessing effects", async () => {
      // Mock preprocessText to remove punctuation
      (nlpUtils.preprocessText as jest.Mock).mockReturnValue("Hello world");
      mockTagger.tag.mockReturnValue({
        taggedWords: [
          { token: "hello", tag: "NNP" },
          { token: "hello", tag: "NNP" },
          { token: "world", tag: "NN" },
        ],
      });

      const request = createMockRequest("Hello, world!");
      await POST(request);

      expect(nlpUtils.preprocessText).toHaveBeenCalledWith("Hello, world!");
      expect(mockTagger.tag).toHaveBeenCalledWith("Hello world");
    });
  });
});
