# Performance Improvement Plan: Editor Highlighting Features

## Overview

Optimize the highlighting system to improve speed of detection, make requests concurrent, and accelerate the overall app. These changes will reduce latency from ~250-755ms per keystroke to ~100-200ms and prevent UI blocking.

---

## Performance Issues Summary

### Current Bottlenecks:
- Sequential API response handling: waits for all 3 requests before applying any highlights (30-50% latency overhead)
- Character names API called on every text change without debouncing (redundant NLP processing)
- Metrics calculations recalculated on every text change without memoization
- Regex patterns compiled fresh on every highlighting pass (5 complex patterns with lookaheads)
- Inefficient readability algorithm: double-filtering and character-by-character iteration
- Quill editor locked during entire highlighting operation (causes UI freezing)
- No request cancellation: stale responses can overwrite recent changes

### Current Performance Metrics:
- Per keystroke: ~250-755ms latency
- Regex compilation: ~1-5ms
- API name extraction: ~50-200ms
- 3x Highlight API calls: ~100-300ms (concurrent)
- Readability calculation: ~2-10ms
- Word density calculation: ~5-20ms
- Delta composition: ~10-30ms
- Quill update: ~50-150ms

---

## Implementation Plan

### 1. Implement Streaming Highlight Application
**File:** `src/app/editor/utils/highlights/highlights.utils.ts`

**Current:** All 3 API responses are awaited in `Promise.all()`, then highlights applied together
**Goal:** Apply each highlight set independently as responses arrive

**Benefits:**
- 30-50% reduction in perceived latency
- User sees partial results immediately rather than waiting for slowest API
- Better perceived performance

**Steps:**
- Refactor `applyHighlights()` to handle streaming results
- Create separate promise chains for dialogue, adverbs, and show-dont-tell highlights
- Apply each Delta independently via `quill.updateContents()`
- Remove `Promise.all()` wait

---

### 2. Add Debouncing to Character Names API
**File:** `src/app/editor/components/Editor/Editor.component.tsx`

**Current:** `fetchNames()` called on every text change after useEffect dependency updates
**Goal:** Debounce the character names fetch call with 1000ms timer

**Benefits:**
- Reduce redundant NLP processing by 70-80%
- Align with highlighting debounce timing
- Reduce network requests

**Steps:**
- Move `fetchNames()` to use same debounce mechanism as highlighting
- Share debounce timer with `useDebouncedHighlights` hook
- Cache NLP results per debounce cycle

---

### 3. Memoize Metrics Calculations
**Files:** 
- `src/app/editor/hooks/metrics/metrics.hook.ts`
- `src/app/editor/components/Options/components/Metrics.component.tsx`

**Current:** Metrics recalculated on every text change; Metrics component re-renders unnecessarily
**Goal:** Memoize calculation results and component renders

**Benefits:**
- Eliminate redundant readability/density calculations (2-10ms saved per change)
- Prevent unnecessary component re-renders
- Reduce CPU usage

**Steps:**
- Wrap metrics calculations in `useMemo()` keyed by text content
- Consolidate `calculateReadabilityScore()` and `calculateWordDensity()` into single memoized calculation
- Wrap `Metrics.component.tsx` with `React.memo()`

---

### 4. Cache and Reuse Compiled Regex Patterns
**File:** `src/app/editor/utils/regex/regex.utils.ts`

**Current:** Regex patterns compiled on every `getRules()` call; existing LRUCache only helps when character/tag config unchanged
**Goal:** Compile patterns once per character/tag configuration and reuse

**Benefits:**
- Reduce regex compilation overhead (1-5ms per change)
- Better memory efficiency
- Faster rule generation

**Steps:**
- Add compiled pattern cache separate from rule cache
- Store compiled RegExp objects keyed by character/tag config
- Reuse compiled patterns in `getRules()` without recompilation
- Invalidate pattern cache when config changes

---

### 5. Optimize Readability Algorithms
**File:** `src/app/editor/utils/readability/lix.fn.ts`

**Current:** 
- Character filter uses character-by-character iteration
- LIX calculation double-filters word array
- Quote regex uses global flag with string method

**Goal:** Implement single-pass, efficient algorithms

**Benefits:**
- 20-30% faster readability calculations
- Reduced memory allocations
- More maintainable code

**Steps:**
- Refactor character counting to use single regex pass without iteration
- Eliminate double-filtering in LIX calculation (combine `filter()` calls)
- Pre-compile quote regex to avoid recreating on each call
- Consider using `match()` array length instead of `split()/filter()` chains

---

### 6. Add Request Cancellation
**File:** `src/app/editor/utils/highlights/highlights.utils.ts`

**Current:** No cancellation of in-flight requests; stale responses can overwrite recent changes
**Goal:** Implement abort controllers for concurrent requests

**Benefits:**
- Prevent stale data corruption
- Reduce unnecessary processing
- Improve reliability with rapid text changes

**Steps:**
- Create AbortController for each highlighting pass
- Pass abort signal to all fetch calls
- Cancel previous requests when new text arrives
- Handle AbortError gracefully

---

## Additional Considerations

### A. Quill Editor Lock Strategy
**Current:** `quill.disable()` locks editor during entire highlighting operation
**Options:**
1. Keep lock to prevent input corruption during highlights (safest)
2. Use granular locking for specific operations only
3. Defer highlighting to next tick to reduce blocking

**Decision needed:** Prioritize user experience (responsive input) vs. data consistency?

---

### B. Metrics Debounce Consolidation
**Current:** `useEditorMetrics` duplicates the 1000ms debounce from `useDebouncedHighlights`
**Option:** Consolidate into single debounce that emits both highlighting rules and metrics together

**Benefit:** Reduce duplicate timer setup; cleaner state management

---

### C. Cache Key Optimization
**Current:** Character names API caches by full document text (unbounded growth)
**Options:**
1. Switch to hash-based keys (MD5/SHA-256 of text)
2. Implement sliding window approach (only cache last N characters)
3. Use document length as additional cache factor

**Benefit:** Better cache hit rates for large documents; bounded memory usage

---

## Testing & Validation

After implementing changes:

1. **Performance benchmarking:**
   - Measure keystroke-to-highlight latency before/after
   - Profile memory usage during long editing sessions
   - Measure CPU usage over time

2. **Functional testing:**
   - Run existing test suite: `npm test`
   - Manual testing of all highlight types (dialogue, adverbs, show-dont-tell)
   - Test rapid text changes and cancellation behavior
   - Verify character names are detected correctly

3. **Edge case testing:**
   - Large documents (10k+ words)
   - Rapid pasting of large text blocks
   - Network slowness simulation
   - Switching character configurations rapidly

---

## Priority & Effort Estimate

| Task | Priority | Effort | Impact |
|------|----------|--------|--------|
| Streaming highlights | HIGH | 2-3h | 30-50% latency reduction |
| Debounce names API | HIGH | 1-2h | 70-80% fewer API calls |
| Memoize metrics | MEDIUM | 1.5-2h | 10-15% latency reduction |
| Cache regex patterns | MEDIUM | 1-1.5h | 5-10% latency reduction |
| Optimize readability | MEDIUM | 2-3h | 5-10% latency reduction |
| Request cancellation | MEDIUM | 1.5-2h | Reliability improvement |

**Total Effort:** ~9-15 hours
**Total Latency Improvement Target:** 50-65% reduction (250-755ms → 100-200ms)

---

## References

### Key Files
- `src/app/editor/utils/highlights/highlights.utils.ts` - Highlight application logic
- `src/app/editor/components/Editor/Editor.component.tsx` - Character names fetch
- `src/app/editor/hooks/metrics/metrics.hook.ts` - Metrics calculations
- `src/app/editor/utils/regex/regex.utils.ts` - Regex pattern management
- `src/app/editor/utils/readability/lix.fn.ts` - Readability algorithms
- `src/app/editor/hooks/quill/debounced-highlights.hook.ts` - Debounce mechanism

### TODO Comments in Code
- `src/app/editor/utils/highlights/highlights.utils.ts`: "make the three requests concurrent with each applying highlights when it ends instead of waiting"
- `src/app/editor/utils/highlights/highlights.utils.ts`: "move to API and add highlighting of dialogue"
