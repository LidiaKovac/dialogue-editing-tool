let _analysisWorker: Worker | null = null;
let latestRequestId = 0;
import type QuillType from "quill"

export function getAnalysisWorker(quill:QuillType): Worker {
  if (typeof window === 'undefined') {
    throw new Error("Workers unavailable server-side");
  }
  if (!_analysisWorker) {
    console.log("Initializing analysis worker...");
    _analysisWorker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });

    _analysisWorker.onmessage = (e) => {
      console.log("Analysis worker message:", e.data);
      const msg = e.data;
      if (msg?.delta) {
        quill.updateContents(msg.delta, "silent");
      }
    };

    _analysisWorker.onerror = (err) => {
      console.error("Analysis worker error:", err);
    };
  }
  return _analysisWorker;
}