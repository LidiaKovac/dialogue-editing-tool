# Rules Engine Documentation

## Overview

`Rules` is a singleton class that generates dynamic regular expressions for detecting common dialogue and punctuation errors in writing. It uses an LRU cache for performance and supports customizable character names and dialogue tags.

## Table of Contents
- [Installation](#installation)
- [Core Concepts](#core-concepts)
- [Public API](#public-api)
- [Rules Catalog](#rules-catalog)
- [Configuration](#configuration)
- [Cache Management](#cache-management)
- [Usage Examples](#usage-examples)

## Installation

```bash
npm install lru-cache
```

## Core Concepts

### Dynamic Rule Generation
Rules are generated on-demand based on:
- **Characters**: Story character names (e.g., "Emily", "Jesse")
- **Dialogue Tags**: Verbs like "said", "asked", "whispered"

### LRU Cache
- **Size limit**: 500 entries
- **TTL**: 2 hours (2000 * 60 * 60 ms)
- **Key**: Sorted `characters|tags` combination

## Public API

### Getters
| Method | Returns | Description |
|--------|---------|-------------|
| `Rules.CHARACTERS` | `string[]` | Current character names (read-only copy) |
| `Rules.DIALOGUE_TAGS` | `string[]` | Current dialogue tags (read-only copy) |
| `Rules.getRules()` | `Array<{id: string, regex: RegExp}>` | All active rules with cache |

### Configuration
| Method | Parameters | Description |
|--------|------------|-------------|
| `Rules.setCharacters(chars: string[])` | `string[]` | Update character names, clears cache |
| `Rules.setDialogueTags(tags: string[])` | `string[]` | Update dialogue tags, clears cache |

### Events
| Method | Parameters | Description |
|--------|------------|-------------|
| `Rules.subscribeToChars(subscriber: Subscriber)` | `(chars: string[]) => any` | Subscribe to character changes |

## Rules Catalog

| Rule ID | Pattern | Detects |
|---------|---------|---------|
| `comma-no-dialogue` | `, "..." Character` | Comma + dialogue without tag |
| `capital-after-comma` | `, "..." CapitalName` | Capitalized name after comma |
| `lowercase-after-stop` | `. "... "lowercase` | Lowercase after period + quotes |
| `no-dialogue-after-punctuation` | `[,?!] "... "he/ she/ they Word` | Pronouns without dialogue tags |
| `capital-after-punctuation` | `[,?!] "... "CapitalWord` | Capitalization after punctuation |

## Configuration

### Default Dialogue Tags
```tsx
[
  "said", "asked", "replied", "whispered", "shouted", "cried",
  "muttered", "exclaimed", "answered", "yelled", "remarked",
  "added", "called", "announced", "huffed", "repeated"
]
```

### Setup Characters
```tsx
Rules.setCharacters(["Emily", "Jesse", "Tom"]);
// Automatically adds pronouns: ["Emily", "Jesse", "Tom", "he", "she", "they"]
```

## Cache Management

**Cache Key Format**: `sortedChars|sortedTags`
```tsx
// Example key: "Emily,Jesse,Tom,he,she,they|asked,cried,said"
```

**Automatic Invalidation**:
- `setCharacters()` → clears cache
- `setDialogueTags()` → clears cache
- Triggers subscribers

## Usage Examples

### Basic Usage
```tsx
import Rules from "./Rules";

// Configure
Rules.setCharacters(["Alice", "Bob"]);
Rules.setDialogueTags(["whispered", "shouted"]);

// Get rules for highlighting
const rules = Rules.getRules();
// [
//   { id: "comma-no-dialogue", regex: /,.../ },
//   ...
// ]
```

### React Integration
```tsx
// Subscribe to character changes
Rules.subscribeToChars((chars) => {
  setCharacters(chars);
  // Re-apply highlights
});

// Dynamic rules in Quill hook
useEffect(() => {
  if (quillRef.current) {
    applyHighlights(quillRef.current, Rules.getRules());
  }
}, [Rules.getRules()]);
```

### Testing Rules
```tsx
const rules = Rules.getRules();

const testText = '," said Alice", "Hello," Bob';
const matches = testText.match(rules[0].regex);
expect(matches).toBeDefined();
```

## Performance Characteristics

| Operation | Time Complexity | Cache Hit |
|-----------|----------------|-----------|
| `getRules()` | O(1) cached, O(n) cold | 500 entries |
| `setCharacters()` | O(n log n) sort + clear | Always miss |
| Regex compilation | O(1) per rule | Cached |

## Advanced Patterns Explained

### Negative Lookaheads
```tsx
// Matches CapitalName NOT followed by dialogue tag
NEGATIVE_LOOKAHEAD_TAGS: (?!said\b|asked\b|...)

// Matches text NOT starting with known character
NEGATIVE_NOT_CAPTURING_LOOKAHEAD_CHARS: (?!(?:Emily|Jesse)\b)
```

### Word Boundaries
All character/tag patterns use `\b` boundaries for precision:
```
\bEmily\b - matches "Emily" but not "Semily" or "Emily's"
```

## Migration Guide

**From Static Rules**:
```tsx
// OLD: Hardcoded regexes
const dialogueRegex = /said\b|asked\b/gi;

// NEW: Dynamic with cache
Rules.setDialogueTags(["said", "asked"]);
const rules = Rules.getRules();
```

***

*Last updated: December 19, 2025*  
*Powers Quill editor syntax highlighting system*
*A big thanks to Perplexity AI for writing this docs :)*
