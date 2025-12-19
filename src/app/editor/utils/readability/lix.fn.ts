import Quill from "quill"
import { RefObject } from "react"

/**
 * Calculates readability scores (ARI and LIX) for text in a Quill editor.
 *
 * **ARI Formula**: `4.71 × (characters/words) + 0.5 × (words/sentences) - 21.43`
 * - Characters: Letters and numbers only
 * - Scores rounded up per ARI specification
 *
 * **LIX Formula** (Swedish Readability Index): `words/sentences + (longWords × 100)/words`
 * - Long words: 6+ characters
 * - Reference scores:
 *   - Children's books: ≤27
 *   - Adult fiction: ≤33
 *   - Newspapers: ≤39
 *   - Non-fiction: ≤47
 *   - Technical: ≤56
 *
 * @param quill - Active Quill editor instance
 * @returns Readability metrics object
 *
 * @example
 * ```
 * const scores = calculateReadabilityScore(quillInstance)
 * console.log(scores.ari) // 11
 * console.log(scores.lix) // 42
 * ```
 */
export const calculateReadabilityScore = (
  quill: Quill
): { ari: number; lix: number } => {
  // The formula for calculating the automated readability index is given below:
  // 4.71 ( characters / words ) + 0.5 ( words / sentences ) − 21.43
  // where characters is the number of letters and numbers, words is the number of spaces, and sentences is the number of sentences, which were counted manually by the typist when the above formula was developed. Non-integer scores are always rounded up to the nearest whole number, so a score of 10.1 or 10.6 would be converted to 11.
  const text = quill.getText().trim()
  const characters = text.split("").filter((c) => /[a-zA-Z0-9]/.test(c)).length
  const words = text.split(/\s+/).filter(Boolean).length || 1
  const sentences = text.match(/(?:\.|\!|\?)/g)?.length ?? 1
  const rawAri = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43

  //LIX = Läsbarhetsindex, indice di leggibilità
  // Barn- och ungdomsböcker = 27
  // Skönlitteratur = 33 letteratura e narrativa per adulti
  // Dags- och veckopress = 39 giornali e informazione
  // Saklitteratur = 47 letteratura scentifica
  // Facklitteratur = 56 letteratura tecnica

  const longWords = text
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => w.length >= 6).length
  //https://sv.wikipedia.org/wiki/L%C3%A4sbarhetsindex
  const swedishindex = words / sentences + (longWords * 100) / words
  return { ari: Math.ceil(rawAri), lix: Math.ceil(swedishindex) } // Round up per ARI spec
}

/**
 * Calculates dialogue word density percentage in Quill editor content.
 *
 * **Formula**: `(dialogueWords / totalWords) × 100`
 * - Extracts all dialogue between quotes (`""`, `""`, `""`)
 * - Counts words within dialogue vs total document words
 * - Returns percentage rounded to nearest integer
 *
 * **Use Cases**:
 * - Writing balance analysis (dialogue vs description)
 * - Genre-specific targets (e.g., 60%+ dialogue for YA fiction)
 *
 * @param quill - Active Quill editor instance
 * @returns Dialogue density as percentage (0-100)
 *
 * @example
 * ```
 * const density = calculateWordDensity(quillInstance)
 * console.log(density) // 67 (67% dialogue)
 *
 * // With sample text:
 * // "Hello," said Alice. She walked away.
 * // Returns ~50% (2 dialogue words / 4 total words)
 * ```
 *
 * @todo Move to API endpoint with dialogue highlighting toggle
 */
export const calculateWordDensity = (quill: Quill): number => {
  const text = quill.getText().trim()
  const words = text.split(/\s+/).filter(Boolean).length || 1

  const dialogueLines = [...text.matchAll(/[""“”][^""“”]*?[""“”]/gim)]
    .flat()
    .map((line) => line.replaceAll(/[""“”]/g, ""))
  const wordsInDialogue = dialogueLines.join().split(" ").length
  return Math.ceil((wordsInDialogue / words) * 100)
  //TODO: move to API and add highlighting of dialogue in subtle color + toggle
}
