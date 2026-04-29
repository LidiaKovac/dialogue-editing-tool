"use client"

import "./character-sheet-builder.scss"
import useCharacterSheetBuilder from "./useCharacterSheetBuilder"
export default function CharacterSheetBuilder() {
  const {
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
  } = useCharacterSheetBuilder()

  return (
    <main className="character-sheet-builder">
      <header className="csb__header">
        <div>
          <h1>Character Sheet Builder</h1>
          <p>
            Build a complete character sheet by combining multiple writer
            templates. Your progress is saved locally in your browser, and you
            can export a PDF, DOCX, or Markdown file when ready.
          </p>
          <p className="csb__helper">
            PDF export uses the browser print dialog. DOCX and Markdown download
            instantly. Markdown works well in Notion.
          </p>
        </div>
        <div className="csb__actions no-print">
          <button
            type="button"
            className="csb__button csb__button--primary"
            onClick={handleExportPdf}
          >
            Export PDF
          </button>
          <button type="button" className="csb__button" onClick={handleExportDocx}>
            Export DOCX
          </button>
          <button type="button" className="csb__button" onClick={handleExportMarkdown}>
            Export Markdown (.md)
          </button>
          <button type="button" className="csb__button" onClick={handleCopyToNotion}>
            Copy to Notion
          </button>
          <button type="button" className="csb__button csb__button--ghost" onClick={handleClear}>
            Clear all
          </button>
          <span className="csb__saved" aria-live="polite">
            {savedLabel}
          </span>
        </div>
        <div className="csb__toggles no-print">
          <label className="csb__toggle">
            <input
              type="checkbox"
              checked={!!optionalSections.magic}
              onChange={() => handleToggleOptional("magic")}
            />
            Include magic section
          </label>
          <label className="csb__toggle">
            <input
              type="checkbox"
              checked={!!optionalSections.tech}
              onChange={() => handleToggleOptional("tech")}
            />
            Include tech section
          </label>
        </div>
      </header>

      <div className="csb__layout">
        <aside className="csb__toc no-print">
          <h2>Jump to section</h2>
          <ul>
            {visibleSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
            <li>
              <a href="#relationship-deep-dives">Relationship Deep Dives</a>
            </li>
          </ul>
        </aside>

        <form className="csb__form" onSubmit={(e) => e.preventDefault()}>
          {visibleSections.map((section) => (
            <section id={section.id} className="csb__section" key={section.id}>
              <fieldset>
                <legend>{section.title}</legend>
                {section.description && <p className="csb__section-desc">{section.description}</p>}
                <div className="csb__fields">
                  {section.fields.map((field) => {
                    const value = formData[field.key] ?? ""
                    const isWide = field.type === "textarea"
                    return (
                      <div key={field.key} className={`csb__field${isWide ? " csb__field--wide" : ""}`}>
                        <label htmlFor={field.key}>{field.label}</label>
                        {field.type === "textarea" ? (
                          <textarea id={field.key} name={field.key} rows={field.rows ?? 3} value={value} onChange={(e) => handleFieldChange(field.key, e.target.value)} />
                        ) : (
                          <input id={field.key} name={field.key} type="text" value={value} onChange={(e) => handleFieldChange(field.key, e.target.value)} autoComplete="off" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </section>
          ))}

          <section id="relationship-deep-dives" className="csb__section">
            <fieldset>
              <legend>Relationship Deep Dives</legend>
              <p className="csb__section-desc">Use this repeatable section for each character the main character has a direct relationship with.</p>
              <div className="csb__deep-dive-controls no-print">
                <button type="button" className="csb__button" onClick={() => addDeepDive()}>Add relationship deep dive</button>
              </div>
              {relationshipDeepDives.length === 0 && <p className="csb__empty">No deep dives added yet.</p>}
              <div className="csb__deep-dives">
                {relationshipDeepDives.map((entry, index) => (
                  <div key={entry.id} className="csb__deep-dive">
                    <div className="csb__deep-dive-header">
                      <h3>Relationship {index + 1}</h3>
                      <button type="button" className="csb__button csb__button--ghost" onClick={() => removeDeepDive(entry.id)}>Remove</button>
                    </div>
                    <div className="csb__fields">
                      {RELATIONSHIP_DEEP_DIVE_FIELDS.map((field) => {
                        const value = entry[field.key] ?? ""
                        const isWide = field.type === "textarea"
                        const fieldId = `${entry.id}-${field.key}`
                        return (
                          <div key={field.key} className={`csb__field${isWide ? " csb__field--wide" : ""}`}>
                            <label htmlFor={fieldId}>{field.label}</label>
                            {field.type === "textarea" ? (
                              <textarea id={fieldId} name={fieldId} rows={field.rows ?? 3} value={value} onChange={(e) => updateDeepDive(entry.id, { [field.key]: e.target.value } as any)} />
                            ) : (
                              <input id={fieldId} name={fieldId} type="text" value={value} onChange={(e) => updateDeepDive(entry.id, { [field.key]: e.target.value } as any)} autoComplete="off" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </section>
        </form>
      </div>

      <div className="csb__print print-only">
        <div className="csb__print-header">
          <h1>Character Sheet</h1>
          <p>Generated on {new Date().toLocaleDateString()}</p>
        </div>
        {visibleSections.map((section) => (
          <div key={section.id} className="csb__print-section">
            <h2>{section.title}</h2>
            <div className="csb__print-grid">
              {section.fields.map((field) => {
                const value = formData[field.key] ?? ""
                const isEmpty = value.trim().length === 0
                return (
                  <div key={field.key} className="csb__print-field">
                    <div className="csb__print-label">{field.label}</div>
                    <div className={`csb__print-value${isEmpty ? " csb__print-empty" : ""}`}>{isEmpty ? " " : value}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {relationshipDeepDives.length > 0 && (
          <div className="csb__print-section">
            <h2>Relationship Deep Dives</h2>
            {relationshipDeepDives.map((entry, index) => (
              <div key={entry.id} className="csb__print-subsection">
                <h3>Relationship {index + 1}</h3>
                <div className="csb__print-grid">
                  {RELATIONSHIP_DEEP_DIVE_FIELDS.map((field) => {
                    const value = entry[field.key] ?? ""
                    const isEmpty = value.trim().length === 0
                    return (
                      <div key={field.key} className="csb__print-field">
                        <div className="csb__print-label">{field.label}</div>
                        <div className={`csb__print-value${isEmpty ? " csb__print-empty" : ""}`}>{isEmpty ? " " : value}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}