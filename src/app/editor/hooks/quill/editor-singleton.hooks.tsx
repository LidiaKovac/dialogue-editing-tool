// hooks/useQuillSingleton.ts
import { useRef, useCallback, useState, useEffect } from "react";
import type QuillType from "quill";

// Module-level singleton - not global, but scoped to this module
class QuillSingleton {
  private instance: QuillType | null = null;
  private readonly subscribers: Set<() => void> = new Set();

  setInstance(quill: QuillType | null) {
    this.instance = quill;
    // Notify all subscribers of the change
    for (const cb of this.subscribers) {
      cb()
    }
  }

  getInstance(): QuillType | null {
    return this.instance;
  }

  subscribe(callback: (() => void) | null) {
    if(callback) {

      this.subscribers.add(callback);
      return () => {
        this.subscribers.delete(callback);
      };
    }
  }
}

const quillSingleton = new QuillSingleton();

export const useQuillSingleton = () => {
  const forceUpdate = useRef<() => void>(null);

  // Force re-render when quill instance changes
  const [tick, setTick] = useState(0);
  forceUpdate.current = () => setTick((prev) => prev + 1);

  useEffect(() => {
    const unsubscribe = quillSingleton.subscribe(forceUpdate.current);
    return unsubscribe;
  }, []);

  const setQuill = useCallback((quill: QuillType | null) => {
    quillSingleton.setInstance(quill);
  }, []);

  const getQuill = useCallback((): QuillType | null => {
    return quillSingleton.getInstance();
  }, []);

  return {
    quill: quillSingleton.getInstance(),
    setQuill,
    getQuill,
  };
};
