export interface TaggerResponse {
  text: string
  terms: Term[]
}

export interface Term {
  text: string
  pre: Pre
  post: string
  tags: string[]
  normal: string
  index: number[]
  id: string
  dirty?: boolean
  chunk: Chunk
  confidence?: number
  switch?: string
}

export enum Chunk {
  Noun = "Noun",
  Pivot = "Pivot",
  Verb = "Verb",
}

export enum Pre {
  Empty = "“",
  Pre = "",
}
