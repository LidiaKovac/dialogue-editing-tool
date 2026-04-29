"use client"
import { useEffect, useMemo, useState } from "react"
import type { RelationshipDeepDive } from "./types"
import {
  SECTIONS,
  RELATIONSHIP_DEEP_DIVE_FIELDS,
  DEFAULT_FORM_DATA,
  DEFAULT_OPTIONAL,
  EMPTY_DEEP_DIVE,
  downloadBlob,
} from "./config"
import { STORAGE_KEY } from "./types"

const AUTOSAVE_MS = 300

export default function useCharacterSheetBuilder() {
  const [formData, setFormData] = useState<Record<string, string>>(() => ({ ...DEFAULT_FORM_DATA }))
  const [optionalSections, setOptionalSections] = useState<Record<string, boolean>>(() => ({ ...DEFAULT_OPTIONAL }))
  const [relationshipDeepDives, setRelationshipDeepDives] = useState<RelationshipDeepDive[]>([])
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.formData) setFormData(parsed.formData)
        if (parsed.optionalSections) setOptionalSections(parsed.optionalSections)
        if (parsed.relationshipDeepDives) setRelationshipDeepDives(parsed.relationshipDeepDives)
      }
    } catch (e) {
        console.error(e)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const t = setTimeout(() => {
      const payload = { formData, optionalSections, relationshipDeepDives }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      setLastSavedAt(Date.now())
    }, AUTOSAVE_MS)
    return () => clearTimeout(t)
  }, [formData, optionalSections, relationshipDeepDives, hydrated])

  const visibleSections = useMemo(() => SECTIONS.filter((s) => {
    if (s.optionalKey) return !!optionalSections[s.optionalKey as keyof typeof optionalSections]
    return true
  }), [optionalSections])

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleToggleOptional = (optKey: string) => {
    setOptionalSections((prev) => ({ ...prev, [optKey]: !prev[optKey] }))
  }

  const addDeepDive = (data?: Partial<RelationshipDeepDive>) => {
    setRelationshipDeepDives((prev) => {
      const id = `r${Date.now().toString(36)}`
      return [...prev, { id, ...EMPTY_DEEP_DIVE, ...data } as RelationshipDeepDive]
    })
  }

  const updateDeepDive = (id: string, patch: Partial<RelationshipDeepDive>) => {
    setRelationshipDeepDives((prev) => prev.map((d) => d.id === id ? { ...d, ...patch } : d))
  }

  const removeDeepDive = (id: string) => setRelationshipDeepDives((prev) => prev.filter((d) => d.id !== id))

  const buildMarkdown = () => {
    const lines: string[] = []
    lines.push(`# Character Sheet\n`)
    SECTIONS.forEach((section) => {
      if (section.optionalKey && !optionalSections[section.optionalKey as keyof typeof optionalSections]) return
      lines.push(`## ${section.title}\n`)
      if (section.description) lines.push(`${section.description}\n`)
      section.fields.forEach((f) => {
        const val = formData[f.key] || ""
        lines.push(`- **${f.label}**: ${val}`)
      })
      lines.push("\n")
    })
    if (relationshipDeepDives.length) {
      lines.push(`## Relationships\n`)
      relationshipDeepDives.forEach((r) => {
        lines.push(`### ${r.relationshipName || "Unnamed"}\n`)
        Object.keys(r).forEach((k) => {
          if (k === "id") return
          // @ts-ignore
          lines.push(`- **${k}**: ${r[k]}`)
        })
        lines.push("\n")
      })
    }
    return lines.join("\n")
  }

  const handleExportPdf = () => window.print()

  const handleExportMarkdown = () => {
    const md = buildMarkdown()
    const blob = new Blob([md], { type: "text/markdown" })
    downloadBlob(blob, "character-sheet.md")
  }

  const handleCopyToNotion = async () => {
    const md = buildMarkdown()
    try {
      if (navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(md)
      } else {
        const ta = document.createElement("textarea")
        ta.value = md
        ta.style.position = "fixed"
        ta.style.left = "-9999px"
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        document.execCommand("copy")
       ta.remove()
      }
      window.alert("Markdown copied to clipboard. Paste into Notion.")
    } catch (e) {
        console.error(e)
      window.alert("Failed to copy Markdown to clipboard.")
    }
  }

  const handleExportDocx = async () => {
    try {
      const { Document, Packer, Paragraph } = await import("docx")
      const doc = new Document({ sections: [{ children: [new Paragraph("Character Sheet") ] }] })
      const packer = new Packer()
      const blob = await packer.toBlob(doc)
      downloadBlob(blob, "character-sheet.docx")
    } catch (e) {
      console.error("Docx export failed", e)
    }
  }

  const handleClear = () => {
    setFormData({ ...DEFAULT_FORM_DATA })
    setOptionalSections({ ...DEFAULT_OPTIONAL })
    setRelationshipDeepDives([])
    localStorage.removeItem(STORAGE_KEY)
    setLastSavedAt(Date.now())
  }

  const savedLabel = lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : "Not saved yet"

  return {
    formData,
    optionalSections,
    relationshipDeepDives,
    visibleSections,
    RELATIONSHIP_DEEP_DIVE_FIELDS,
    handleFieldChange,
    handleToggleOptional,
    addDeepDive,
    updateDeepDive,
    removeDeepDive,
    handleExportPdf,
    handleExportDocx,
    handleExportMarkdown,
    handleCopyToNotion,
    handleClear,
    savedLabel,
    hydrated,
  }
}
