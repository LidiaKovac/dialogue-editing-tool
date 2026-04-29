"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import "./character-sheet-builder.scss";

type FieldType = "text" | "textarea";
type OptionalKey = "magic" | "tech";

type FieldDefinition = {
  label: string;
  type?: FieldType;
  rows?: number;
  placeholder?: string;
};

type SectionDefinition = {
  id: string;
  title: string;
  description?: string;
  optionalKey?: OptionalKey;
  fields: FieldDefinition[];
};

type Field = FieldDefinition & { key: string };
type Section = Omit<SectionDefinition, "fields"> & { fields: Field[] };

type RelationshipDeepDive = {
  id: string;
  relationshipName: string;
  relationshipSummary: string;
  conflicts: string;
  agreements: string;
  secrets: string;
  howMet: string;
  changes: string;
};

type StoredState = {
  version: 1;
  formData: Record<string, string>;
  optionalSections: Record<OptionalKey, boolean>;
  relationshipDeepDives: RelationshipDeepDive[];
};

const STORAGE_KEY = "character-sheet-builder:v1";

const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    id: "identity",
    title: "Identity and Demographics",
    description:
      "Names, identifiers, and baseline demographics that ground the character.",
    fields: [
      { label: "Full name" },
      { label: "Character name (if different)" },
      { label: "Reason for name" },
      { label: "Nickname / alias / code name" },
      { label: "Reason for nickname" },
      { label: "Age" },
      { label: "Sex / gender" },
      { label: "Orientation" },
      { label: "Ethnicity" },
      { label: "Religion / moral philosophy" },
      { label: "Political party" },
      { label: "Role in story" },
      { label: "MBTI personality type" },
      { label: "Enneagram personality type" },
      { label: "Socioeconomic status / economic class" },
      { label: "Education / schooling", type: "textarea", rows: 3 },
      { label: "Other demographics notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "current-situation",
    title: "Current Situation and Occupation",
    description:
      "Where they are now, what they do, and their day-to-day responsibilities.",
    fields: [
      { label: "Occupation / job title / school level" },
      { label: "Roles" },
      { label: "Responsibilities" },
      { label: "Lives (where they live)" },
      { label: "Current situation / status", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "appearance",
    title: "Physical Appearance",
    description: "Visual details, body language, and style cues.",
    fields: [
      { label: "Physical description", type: "textarea", rows: 4 },
      { label: "Eye color" },
      { label: "Skin color" },
      { label: "Hair color" },
      { label: "Hair style / length" },
      { label: "Height" },
      { label: "Weight" },
      { label: "Body type" },
      { label: "Face" },
      { label: "Body" },
      { label: "Fitness level" },
      { label: "Dominant hand" },
      { label: "Tattoos" },
      { label: "Scars / birthmarks" },
      { label: "Other distinguishing features" },
      { label: "Fashion / clothing style" },
      { label: "Accessories" },
      { label: "Typical outfit from top to bottom", type: "textarea", rows: 3 },
      { label: "Posture / gait" },
      { label: "Tics" },
      { label: "Coordination (or lack thereof)" },
    ],
  },
  {
    id: "communication",
    title: "Voice and Communication",
    description: "How they speak, gesture, and communicate with others.",
    fields: [
      {
        label:
          "Diction formality (do they talk in a fancy way? Do they use slang?)",
      },
      { label: "Speech patterns" },
      { label: "Jargon and idiom usage" },
      { label: "Accent / dialect / regional language" },
      { label: "Languages known" },
      { label: "Preferred communication methods" },
      { label: "Style and pacing of speech" },
      { label: "Pitch" },
      { label: "Laughter" },
      { label: "Smile" },
      { label: "Use of gestures" },
      { label: "Facial expressions" },
      { label: "Verbal expressions" },
      { label: "Other communication notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "history",
    title: "Background and History",
    description: "Origins, milestones, and formative events.",
    fields: [
      { label: "Birth date" },
      { label: "Place of birth" },
      { label: "Hometown" },
      { label: "Cultural heritage" },
      { label: "First language" },
      { label: "Family history", type: "textarea", rows: 3 },
      { label: "Personal history / backstory", type: "textarea", rows: 4 },
      { label: "Important life events", type: "textarea", rows: 3 },
      { label: "Criminal record" },
      { label: "Affiliations" },
      { label: "Skeletons in the closet" },
      { label: "Regrets" },
      { label: "Accomplishments" },
      { label: "Memories" },
      { label: "Other history notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "skills",
    title: "Skills and Abilities",
    description: "Training, talents, and capabilities they can rely on.",
    fields: [
      { label: "Professional qualifications" },
      { label: "Talents" },
      { label: "Distinctive skills / abilities" },
      { label: "Hidden talents" },
      { label: "Physical abilities" },
      { label: "Magical abilities (if any)" },
      { label: "Other skills notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "health",
    title: "Health, Strengths, Weaknesses",
    description: "Limits, vulnerabilities, and strengths that shape behavior.",
    fields: [
      { label: "Strengths" },
      { label: "Weaknesses" },
      { label: "Physical strengths" },
      { label: "Physical weaknesses" },
      { label: "Intellectual strengths" },
      { label: "Intellectual weaknesses" },
      { label: "Interpersonal strengths" },
      { label: "Interpersonal weaknesses" },
      { label: "Disabilities / Chronic illnesses" },
      { label: "Allergies" },
      { label: "Physical and mental illnesses / conditions" },
      { label: "Other health notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "psychology",
    title: "Psychology and Personality",
    description: "Mindset, habits, fears, and worldview.",
    fields: [
      { label: "Personality type" },
      { label: "Temperament" },
      { label: "Introvert / extrovert" },
      { label: "Mannerisms" },
      { label: "Self-esteem" },
      { label: "Morals / virtues" },
      { label: "Quirks" },
      { label: "Obsessed with" },
      { label: "Angered by" },
      { label: "Pet peeves" },
      { label: "Bad habits" },
      { label: "Routines" },
      { label: "Flaws" },
      { label: "Secrets" },
      { label: "Phobias / fears" },
      { label: "Misbelief about the world" },
      {
        label: "What happened in the past to create this misbelief",
        type: "textarea",
        rows: 3,
      },
      { label: "Love language" },
      { label: "How they respond to emotional pain" },
      { label: "Method of manipulation" },
      { label: "Emotional traits" },
      { label: "Attitude towards society / general perspective" },
      {
        label: "Personal experiences that shaped their worldview",
        type: "textarea",
        rows: 3,
      },
      { label: "Other psychological notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "desires",
    title: "Desires, Motivations, Values",
    description: "What they want, value, and pursue.",
    fields: [
      { label: "Primary desire / goal" },
      { label: "Other desires / goals" },
      { label: "Dream job" },
      { label: "Motivations" },
      {
        label: "Top three things they value most in life",
        type: "textarea",
        rows: 3,
      },
      {
        label: "Object they cannot bear to part with and why",
        type: "textarea",
        rows: 3,
      },
      { label: "Other desires notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "favorites",
    title: "Favorites and Interests",
    description: "Likes, hobbies, and small delights.",
    fields: [
      { label: "Favorites (freeform)", type: "textarea", rows: 3 },
      { label: "Hobbies" },
      { label: "Interests" },
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Key people, loyalties, and social connections.",
    fields: [
      { label: "Parents / guardians" },
      { label: "Siblings" },
      { label: "Children" },
      { label: "Grandparents" },
      { label: "Grandchildren" },
      { label: "Pets" },
      { label: "Best friends" },
      { label: "Friends" },
      { label: "Significant other / partner" },
      { label: "Lover(s)" },
      { label: "Romantic interests" },
      { label: "Exes" },
      { label: "Rivals" },
      { label: "Enemies" },
      { label: "Mentors / teachers" },
      { label: "Idols / role models" },
      { label: "Followers" },
      { label: "Clubs / memberships" },
      { label: "Team dynamics" },
      { label: "Other relationship notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "growth",
    title: "Character Growth",
    description: "Arc beats, conflicts, and change over time.",
    fields: [
      { label: "Character arc (short summary)" },
      { label: "Core values" },
      { label: "Goals (growth arc focus)" },
      { label: "Motivations (growth arc focus)" },
      { label: "Internal conflicts" },
      { label: "External conflicts" },
      { label: "Moral dilemma" },
      { label: "With society (external conflict)" },
      { label: "Significant events / plot points" },
      { label: "Epiphanies" },
      { label: "Other growth notes", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "character-goals",
    title: "Character Goals",
    description: "Goal-focused prompts that pressure their current path.",
    fields: [
      {
        label: "How is your character dissatisfied with their life?",
        type: "textarea",
        rows: 3,
      },
      {
        label: "What do they believe will bring them happiness?",
        type: "textarea",
        rows: 3,
      },
      {
        label:
          "What definitive step could they take to turn their dream into a reality?",
        type: "textarea",
        rows: 3,
      },
      {
        label: "How has their fear kept them from taking this action already?",
        type: "textarea",
        rows: 3,
      },
      {
        label:
          "How do they think they can accomplish their goal while steering clear of what they are afraid of?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "character-arc",
    title: "Character Arc Builder",
    description: "Full arc scaffolding from desire to transformation.",
    fields: [
      {
        label:
          "Why do you want to write this story, and why is the theme important to you?",
        type: "textarea",
        rows: 3,
      },
      { label: "Protagonist desire", type: "textarea", rows: 3 },
      { label: "Protagonist misbelief", type: "textarea", rows: 3 },
      { label: "Protagonist fear", type: "textarea", rows: 3 },
      {
        label:
          "Opening: How is their fear standing in the way of what they think will make them happy?",
        type: "textarea",
        rows: 4,
      },
      {
        label:
          "Inciting incident: Why does it matter, how does it push them outside their comfort zone, and how do they respond based on fear?",
        type: "textarea",
        rows: 4,
      },
      {
        label:
          "Middle: Describe the fear-based decision after the inciting incident and the consequences until the midpoint.",
        type: "textarea",
        rows: 4,
      },
      {
        label:
          "Dark moment: What does the disaster mean personally, and how does it force them to face fear and misbelief?",
        type: "textarea",
        rows: 4,
      },
      {
        label:
          "Aha moment: What revelation do they have, how will they overcome fear and continue to the climax, and what lesson do they learn and teach?",
        type: "textarea",
        rows: 4,
      },
      {
        label:
          "Ending: How do they face their most difficult challenge, and how does their response prove change?",
        type: "textarea",
        rows: 4,
      },
      {
        label:
          "Conclusion: How has the character transformed as a result of the journey?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "magic",
    title: "Magic (Optional)",
    description: "Only if your world uses magic. Define scope and history.",
    optionalKey: "magic",
    fields: [
      { label: "Tier level" },
      { label: "Specialty spells" },
      { label: "Amount of allied magic" },
      { label: "First spell" },
      { label: "Arrested for" },
    ],
  },
  {
    id: "tech",
    title: "Tech (Optional)",
    description: "Only if the story uses advanced tech or modifications.",
    optionalKey: "tech",
    fields: [{ label: "Implants" }, { label: "Genetic modifications" }],
  },
];

const RELATIONSHIP_DEEP_DIVE_FIELDS: Array<{
  key: keyof Omit<RelationshipDeepDive, "id">;
  label: string;
  type?: FieldType;
  rows?: number;
}> = [
  { key: "relationshipName", label: "Relationship name / who is this about?" },
  {
    key: "relationshipSummary",
    label: "Relationship description (in a few words)",
    type: "textarea",
    rows: 2,
  },
  {
    key: "conflicts",
    label: "Points of conflict in their relationship",
    type: "textarea",
    rows: 3,
  },
  {
    key: "agreements",
    label: "What do they agree on? What do they disagree on?",
    type: "textarea",
    rows: 3,
  },
  {
    key: "secrets",
    label: "Secrets kept from each other and why",
    type: "textarea",
    rows: 3,
  },
  {
    key: "howMet",
    label: "How did they meet and how long have they known each other?",
    type: "textarea",
    rows: 3,
  },
  {
    key: "changes",
    label: "How will the relationship change over the story?",
    type: "textarea",
    rows: 3,
  },
];

const EMPTY_DEEP_DIVE: Omit<RelationshipDeepDive, "id"> = {
  relationshipName: "",
  relationshipSummary: "",
  conflicts: "",
  agreements: "",
  secrets: "",
  howMet: "",
  changes: "",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildSections = (definitions: SectionDefinition[]): Section[] =>
  definitions.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      key: `${section.id}.${slugify(field.label)}`,
    })),
  }));

const SECTIONS = buildSections(SECTION_DEFINITIONS);
const FIELD_KEYS = SECTIONS.flatMap((section) =>
  section.fields.map((field) => field.key),
);

const DEFAULT_FORM_DATA = FIELD_KEYS.reduce<Record<string, string>>(
  (acc, key) => {
    acc[key] = "";
    return acc;
  },
  {},
);

const DEFAULT_OPTIONAL: Record<OptionalKey, boolean> = {
  magic: false,
  tech: false,
};

const createDeepDiveId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `rel-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
};

export default function CharacterSheetBuilder() {
  const [formData, setFormData] =
    useState<Record<string, string>>(DEFAULT_FORM_DATA);
  const [optionalSections, setOptionalSections] =
    useState<Record<OptionalKey, boolean>>(DEFAULT_OPTIONAL);
  const [relationshipDeepDives, setRelationshipDeepDives] = useState<
    RelationshipDeepDive[]
  >([]);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<StoredState>;
        if (parsed.formData) {
          setFormData({ ...DEFAULT_FORM_DATA, ...parsed.formData });
        }
        if (parsed.optionalSections) {
          setOptionalSections({
            ...DEFAULT_OPTIONAL,
            ...parsed.optionalSections,
          });
        }
        if (Array.isArray(parsed.relationshipDeepDives)) {
          setRelationshipDeepDives(parsed.relationshipDeepDives);
        }
      } catch {
        setFormData(DEFAULT_FORM_DATA);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    const handle = window.setTimeout(() => {
      const payload: StoredState = {
        version: 1,
        formData,
        optionalSections,
        relationshipDeepDives,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(new Date());
    }, 300);
    return () => window.clearTimeout(handle);
  }, [formData, optionalSections, relationshipDeepDives, hydrated]);

  const visibleSections = useMemo(
    () =>
      SECTIONS.filter(
        (section) =>
          !section.optionalKey || optionalSections[section.optionalKey],
      ),
    [optionalSections],
  );

  const handleFieldChange =
    (key: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

  const handleToggleOptional =
    (key: OptionalKey) => (event: ChangeEvent<HTMLInputElement>) => {
      setOptionalSections((prev) => ({ ...prev, [key]: event.target.checked }));
    };

  const addDeepDive = () => {
    setRelationshipDeepDives((prev) => [
      ...prev,
      { id: createDeepDiveId(), ...EMPTY_DEEP_DIVE },
    ]);
  };

  const updateDeepDive = (
    id: string,
    key: keyof Omit<RelationshipDeepDive, "id">,
    value: string,
  ) => {
    setRelationshipDeepDives((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  const removeDeepDive = (id: string) => {
    setRelationshipDeepDives((prev) => prev.filter((item) => item.id !== id));
  };

  const buildMarkdown = () => {
    const lines: string[] = [];
    const today = new Date().toLocaleDateString();
    lines.push("# Character Sheet");
    lines.push(`Generated on ${today}`);
    lines.push("");

    visibleSections.forEach((section) => {
      lines.push(`## ${section.title}`);
      if (section.description) {
        lines.push(section.description);
      }
      lines.push("");
      section.fields.forEach((field) => {
        const rawValue = (formData[field.key] ?? "").trim();
        if (!rawValue) {
          lines.push(`- **${field.label}:**`);
          return;
        }
        const valueLines = rawValue.split(/\r?\n/);
        if (valueLines.length === 1) {
          lines.push(`- **${field.label}:** ${valueLines[0]}`);
          return;
        }
        lines.push(`- **${field.label}:**`);
        valueLines.forEach((line) => lines.push(`  ${line}`));
      });
      lines.push("");
    });

    if (relationshipDeepDives.length > 0) {
      lines.push("## Relationship Deep Dives");
      lines.push("");
      relationshipDeepDives.forEach((entry, index) => {
        const name = entry.relationshipName.trim();
        lines.push(`### Relationship ${index + 1}${name ? `: ${name}` : ""}`);
        RELATIONSHIP_DEEP_DIVE_FIELDS.forEach((field) => {
          const rawValue = (entry[field.key] ?? "").trim();
          if (!rawValue) {
            lines.push(`- **${field.label}:**`);
            return;
          }
          const valueLines = rawValue.split(/\r?\n/);
          if (valueLines.length === 1) {
            lines.push(`- **${field.label}:** ${valueLines[0]}`);
            return;
          }
          lines.push(`- **${field.label}:**`);
          valueLines.forEach((line) => lines.push(`  ${line}`));
        });
        lines.push("");
      });
    }

    return lines.join("\n");
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    const markdown = buildMarkdown();
    downloadBlob(
      new Blob([markdown], { type: "text/markdown" }),
      "character-sheet.md",
    );
  };

  const handleExportDocx = async () => {
    const { Document, HeadingLevel, Packer, Paragraph, TextRun } =
      await import("docx");
    const paragraphs: InstanceType<typeof Paragraph>[] = [];
    const today = new Date().toLocaleDateString();

    paragraphs.push(
      new Paragraph({
        text: "Character Sheet",
        heading: HeadingLevel.TITLE,
      }),
    );
    paragraphs.push(new Paragraph(`Generated on ${today}`));
    paragraphs.push(new Paragraph(""));

    const addFieldParagraph = (label: string, value: string) => {
      const children = [new TextRun({ text: `${label}: `, bold: true })];
      if (value.trim()) {
        const lines = value.split(/\r?\n/);
        lines.forEach((line, index) => {
          if (index === 0) {
            children.push(new TextRun({ text: line }));
            return;
          }
          children.push(new TextRun({ text: line, break: 1 }));
        });
      }
      paragraphs.push(new Paragraph({ children }));
    };

    visibleSections.forEach((section) => {
      paragraphs.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.HEADING_1,
        }),
      );
      if (section.description) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({ text: section.description, italics: true }),
            ],
          }),
        );
      }
      section.fields.forEach((field) => {
        addFieldParagraph(field.label, formData[field.key] ?? "");
      });
      paragraphs.push(new Paragraph(""));
    });

    if (relationshipDeepDives.length > 0) {
      paragraphs.push(
        new Paragraph({
          text: "Relationship Deep Dives",
          heading: HeadingLevel.HEADING_1,
        }),
      );
      relationshipDeepDives.forEach((entry, index) => {
        const name = entry.relationshipName.trim();
        paragraphs.push(
          new Paragraph({
            text: `Relationship ${index + 1}${name ? `: ${name}` : ""}`,
            heading: HeadingLevel.HEADING_2,
          }),
        );
        RELATIONSHIP_DEEP_DIVE_FIELDS.forEach((field) => {
          addFieldParagraph(field.label, entry[field.key] ?? "");
        });
        paragraphs.push(new Paragraph(""));
      });
    }

    const doc = new Document({
      sections: [{ children: paragraphs }],
    });
    const blob = await Packer.toBlob(doc);
    downloadBlob(blob, "character-sheet.docx");
  };

  const handleClear = () => {
    const confirmed = window.confirm(
      "Clear the entire character sheet? This will remove locally saved data.",
    );
    if (!confirmed) {
      return;
    }
    setFormData(DEFAULT_FORM_DATA);
    setOptionalSections(DEFAULT_OPTIONAL);
    setRelationshipDeepDives([]);
    localStorage.removeItem(STORAGE_KEY);
    setLastSavedAt(null);
  };

  const savedLabel = !hydrated
    ? "Loading saved data..."
    : lastSavedAt
      ? `Saved at ${lastSavedAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "Not saved yet";

  return (
    <main className="character-sheet-builder">
      <header className="csb__header">
        <div>
          <h1>Character Sheet Builder</h1>
          <p>
            This character sheet is a combination of multiple character sheets I
            found on the internet. I consulted the following links:{" "}
            <a target="_blank" href="https://abbieemmonsauthor.com/templates">
              Abbie Emmons' templates
            </a>
            ,{" "}
            <a href="https://www.reddit.com/r/writing/comments/1h6c2p8/character_sheet_template/">
              This Reddit post by u/questionable_android
            </a>
            ,{" "}
            <a href="https://shannonfallon.com/2022/07/02/my-character-sheet-template/">
              Shannon Fallon's blog post
            </a>
            ,{" "}
            <a href="https://www.dabblewriter.com/articles/character-template">
              Dabble's blog post by Doug Landsborough
            </a>
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
          <button
            type="button"
            className="csb__button"
            onClick={handleExportDocx}
          >
            Export DOCX
          </button>
          <button
            type="button"
            className="csb__button"
            onClick={handleExportMarkdown}
          >
            Export Markdown (.md)
          </button>
          <button
            type="button"
            className="csb__button csb__button--ghost"
            onClick={handleClear}
          >
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
              checked={optionalSections.magic}
              onChange={handleToggleOptional("magic")}
            />
            Include magic section
          </label>
          <label className="csb__toggle">
            <input
              type="checkbox"
              checked={optionalSections.tech}
              onChange={handleToggleOptional("tech")}
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

        <form
          className="csb__form"
          onSubmit={(event) => event.preventDefault()}
        >
          {visibleSections.map((section) => (
            <section id={section.id} className="csb__section" key={section.id}>
              <fieldset>
                <legend>{section.title}</legend>
                {section.description && (
                  <p className="csb__section-desc">{section.description}</p>
                )}
                <div className="csb__fields">
                  {section.fields.map((field) => {
                    const value = formData[field.key] ?? "";
                    const isWide = field.type === "textarea";
                    return (
                      <div
                        key={field.key}
                        className={`csb__field${isWide ? " csb__field--wide" : ""}`}
                      >
                        <label htmlFor={field.key}>{field.label}</label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={field.key}
                            name={field.key}
                            rows={field.rows ?? 3}
                            value={value}
                            onChange={handleFieldChange(field.key)}
                          />
                        ) : (
                          <input
                            id={field.key}
                            name={field.key}
                            type="text"
                            value={value}
                            onChange={handleFieldChange(field.key)}
                            autoComplete="off"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </section>
          ))}

          <section id="relationship-deep-dives" className="csb__section">
            <fieldset>
              <legend>Relationship Deep Dives</legend>
              <p className="csb__section-desc">
                Use this repeatable section for each character the main
                character has a direct relationship with.
              </p>
              <div className="csb__deep-dive-controls no-print">
                <button
                  type="button"
                  className="csb__button"
                  onClick={addDeepDive}
                >
                  Add relationship deep dive
                </button>
              </div>
              {relationshipDeepDives.length === 0 && (
                <p className="csb__empty">No deep dives added yet.</p>
              )}
              <div className="csb__deep-dives">
                {relationshipDeepDives.map((entry, index) => (
                  <div key={entry.id} className="csb__deep-dive">
                    <div className="csb__deep-dive-header">
                      <h3>Relationship {index + 1}</h3>
                      <button
                        type="button"
                        className="csb__button csb__button--ghost"
                        onClick={() => removeDeepDive(entry.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="csb__fields">
                      {RELATIONSHIP_DEEP_DIVE_FIELDS.map((field) => {
                        const value = entry[field.key] ?? "";
                        const isWide = field.type === "textarea";
                        const fieldId = `${entry.id}-${field.key}`;
                        return (
                          <div
                            key={field.key}
                            className={`csb__field${isWide ? " csb__field--wide" : ""}`}
                          >
                            <label htmlFor={fieldId}>{field.label}</label>
                            {field.type === "textarea" ? (
                              <textarea
                                id={fieldId}
                                name={fieldId}
                                rows={field.rows ?? 3}
                                value={value}
                                onChange={(event) =>
                                  updateDeepDive(
                                    entry.id,
                                    field.key,
                                    event.target.value,
                                  )
                                }
                              />
                            ) : (
                              <input
                                id={fieldId}
                                name={fieldId}
                                type="text"
                                value={value}
                                onChange={(event) =>
                                  updateDeepDive(
                                    entry.id,
                                    field.key,
                                    event.target.value,
                                  )
                                }
                                autoComplete="off"
                              />
                            )}
                          </div>
                        );
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
                const value = formData[field.key] ?? "";
                const isEmpty = value.trim().length === 0;
                return (
                  <div key={field.key} className="csb__print-field">
                    <div className="csb__print-label">{field.label}</div>
                    <div
                      className={`csb__print-value${
                        isEmpty ? " csb__print-empty" : ""
                      }`}
                    >
                      {isEmpty ? " " : value}
                    </div>
                  </div>
                );
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
                    const value = entry[field.key] ?? "";
                    const isEmpty = value.trim().length === 0;
                    return (
                      <div key={field.key} className="csb__print-field">
                        <div className="csb__print-label">{field.label}</div>
                        <div
                          className={`csb__print-value${
                            isEmpty ? " csb__print-empty" : ""
                          }`}
                        >
                          {isEmpty ? " " : value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
