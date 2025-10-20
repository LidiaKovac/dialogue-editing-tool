"use client";
import { useEffect, useState } from "react";

export const Typewriter = () => {
  const words = ["novel", "fanfiction", "prose", "book", "short story"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
          setTypingSpeed(75);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        }
      } else {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, words]);

  return (
    <span className="text-black">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
