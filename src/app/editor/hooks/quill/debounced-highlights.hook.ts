import { useCallback, useEffect, useRef, useState } from "react";
import type QuillType from "quill";
import { applyHighlights } from "../../utils/highlights/highlights.utils";
import { QUILL_DEBOUNCE_TIMER } from "../../../../app/lib/quill/quill.options";
import { Delta } from "quill";

export const useDebouncedHighlights = (quill: QuillType | null, enableAdv: boolean) => {
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  const isApplyingHighlights = useRef(false);

  const latestChunk = useRef("");
  const latestStart = useRef(0);
  const latestEnd = useRef(0);

  const applyHighlightsCB = useCallback(async () => {
    if (!quill || isApplyingHighlights.current) return false;

    try {
      isApplyingHighlights.current = true;
      await applyHighlights(
        quill,
        latestChunk.current,
        enableAdv
      );
      return true;
    } finally {
      isApplyingHighlights.current = false;
    }
  }, [quill, enableAdv, latestChunk, latestStart, latestEnd]);
  // useEffect(() => {
  //   if (latestChunk) {
  //     applyHighlightsCB();
  //   }
  // }, [enableAdv, quill, applyHighlightsCB, latestChunk]);
  useEffect(() => {
    if (!quill) return;

    const onTextChange = (delta: Delta, oldDelta: Delta, source: string) => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
      if (source !== "user") return;

      // Get post-change selection for precise bounds
      const sel = quill.getSelection();
      let index = sel?.index ?? 0; // Use selection if available

      // Fallback: accumulate retain (your original logic)
      if (!sel) {
        index = 0;
        delta.ops.forEach((op) => {
          if (op.retain) index += op.retain as number;
        });
      }

      let inserted = 0,
        deleted = 0;
      delta.ops.forEach((op) => {
        if (typeof op.insert === "string") inserted += op.insert!.length;
        if (op.delete) deleted += op.delete as number;
      });

      const newText = quill.getText();
      latestStart.current = Math.max(0, index - 200);
      latestEnd.current = Math.min(newText.length, index + inserted + 200); // Use inserted, not deleted

      const chunkForAnalysis = newText.slice(latestStart.current, latestEnd.current);
      latestChunk.current = chunkForAnalysis;

      highlightTimer.current = setTimeout(async () => {
        if (quill.getText()) {
          await applyHighlightsCB();
        }
      }, QUILL_DEBOUNCE_TIMER);
    };

    quill.on("text-change", onTextChange);

    return () => {
      quill.off("text-change", onTextChange);
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current);
        highlightTimer.current = null;
      }
    };
  }, [quill, applyHighlightsCB, enableAdv]);

  return { isApplyingHighlights: isApplyingHighlights.current };
};
