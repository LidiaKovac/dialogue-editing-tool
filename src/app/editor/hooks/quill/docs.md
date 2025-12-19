# Quill Editor Hooks Documentation

## Overview

This documentation covers a refactored suite of React custom hooks for managing a Quill rich text editor. The original monolithic `useQuillEditor` hook (~150 lines) has been split into four focused, single-responsibility hooks following React best practices for separation of concerns and testability.

## Table of Contents
- [useQuillInstance](#usequillinstance) - Editor lifecycle & initialization
- [useDebouncedHighlights](#usedebouncedhighlights) - Syntax highlighting with debouncing
- [useEditorMetrics](#useeditormetrics) - Word count & readability analytics
- [useQuillEditor](#usequilleditor) - Main composed hook


## `useQuillInstance`

**Purpose**: Handles Quill editor creation, dynamic import, custom blot registration, and lifecycle management.

### Props
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `editorRef` | `React.RefObject<HTMLDivElement>` | ✅ | Ref to the container div where Quill mounts |

### Returns
```tsx
{
  quill: QuillType | null,        // Active Quill instance (singleton)
  isQuillCreated: boolean         // True when editor is fully initialized
}
```

### Features
- Dynamic `quill` import (code splitting)
- Registers `DialogueBlot` and `AdverbBlot` custom blots
- Sets `spellcheck="false"` on editor root
- Proper cleanup on unmount
- Integrates with `useQuillSingleton()` for shared instance

### Usage
```tsx
const { quill, isQuillCreated } = useQuillInstance(editorRef)
```

## `useDebouncedHighlights`

**Purpose**: Manages syntax highlighting with 500ms debounce on `text-change` events.

### Props
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quill` | `QuillType \| null` | ✅ | Quill instance from `useQuillInstance` |

### Returns
```tsx
{
  isApplyingHighlights: boolean    // True during highlight application
}
```

### Features
- Debounced highlighting (500ms after user stops typing)
- Disables editor during highlight application
- Uses `Rules.getRules()` and `enableAdv` from options
- Prevents recursive highlights with guard flag
- Cleans up timers and event listeners

### Usage
```tsx
const { isApplyingHighlights } = useDebouncedHighlights(quill)
```

## `useEditorMetrics`

**Purpose**: Tracks word count, LIX readability score, and dialogue density with shared debouncing.

### Props
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quill` | `QuillType \| null` | ✅ | Quill instance |

### Returns
```tsx
{
  words: number,                   // Word count from quill.getText()
  lix: Record<string, number> | null,  // LIX readability metrics
  dialogueDensity: number          // Dialogue word density ratio
}
```

### Features
- Single debounced handler for all metrics (500ms)
- Eliminates duplicate `text-change` listeners
- Uses `calculateReadabilityScore()` and `calculateWordDensity()`

### Usage
```tsx
const { words, lix, dialogueDensity } = useEditorMetrics(quill)
```

## `useQuillEditor` (Main Hook)

**Purpose**: Composes all sub-hooks into the complete editor API.

### Returns
```tsx
{
  editorRef: React.RefObject<HTMLDivElement>,  // Mount ref
  quill: QuillType | null,                     // Editor instance
  isReady: boolean,                            // Editor fully initialized
  isBusy: boolean,                             // Currently applying highlights
  words: number,
  lix: Record<string, number> | null,
  dialogueDensity: number,
  text: string | undefined                     // quill?.getText()
}
```

### Complete Usage Example
```tsx
export const QuillEditorComponent = () => {
  const {
    editorRef,
    quill,
    isReady,
    isBusy,
    words,
    lix,
    dialogueDensity,
    text
  } = useQuillEditor()

  return (
    <div className="editor-container">
      <div ref={editorRef} className="quill-editor" />
      {isBusy && <div>Applying highlights...</div>}
      <div>Words: {words}</div>
      <div>LIX: {lix?.score ?? 0}</div>
    </div>
  )
}
```

## Dependencies

| Hook | External Dependencies |
|------|----------------------|
| `useQuillInstance` | `useQuillSingleton()`, `quillOptions` |
| `useDebouncedHighlights` | `useOptions()`, `Rules`, `applyHighlights` |
| `useEditorMetrics` | `calculateReadabilityScore`, `calculateWordDensity` |

## Performance Improvements

| Before (Monolith) | After (Split Hooks) |
|-------------------|---------------------|
| ~150 lines | Main hook: ~20 lines |
| 3x duplicate `text-change` listeners | Single listener per feature |
| 3x separate timers | Shared debouncing |
| Unclear cleanup | Explicit cleanup per hook |
| Hard to test | Each hook independently testable |

## Testing Strategy

```tsx
// Test individual hooks
describe('useEditorMetrics', () => {
  it('calculates word count correctly', () => {
    const { result } = renderHook(() => useEditorMetrics(mockQuill))
    expect(result.current.words).toBe(42)
  })
})
```

## Migration Guide

1. Replace `useQuillEditor()` with new composed version
2. Update component to use `editorRef` instead of inline div
3. No changes needed for existing `quillOptions` or utils
4. Test highlighting and metrics independently

***

*Last updated: December 19, 2025*  
*Refactored from original 150-line monolithic hook*
*A big thanks to Perplexity AI for writing this docs :)*