export type FieldType = "text" | "textarea"
export type OptionalKey = "magic" | "tech"

export type FieldDefinition = {
  label: string
  type?: FieldType
  rows?: number
  placeholder?: string
}

export type SectionDefinition = {
  id: string
  title: string
  description?: string
  optionalKey?: OptionalKey
  fields: FieldDefinition[]
}

export type Field = FieldDefinition & { key: string }
export type Section = Omit<SectionDefinition, "fields"> & { fields: Field[] }

export type RelationshipDeepDive = {
  id: string
  relationshipName: string
  relationshipSummary: string
  conflicts: string
  agreements: string
  secrets: string
  howMet: string
  changes: string
}

export type StoredState = {
  version: 1
  formData: Record<string, string>
  optionalSections: Record<OptionalKey, boolean>
  relationshipDeepDives: RelationshipDeepDive[]
}

export const STORAGE_KEY = "character-sheet-builder:v1"
