import type { SectionDefinition, RelationshipDeepDive } from "./types"

export const SECTION_DEFINITIONS: SectionDefinition[] = [
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
      { label: "What happened in the past to create this misbelief", type: "textarea", rows: 3 },
      { label: "Love language" },
      { label: "How they respond to emotional pain" },
      { label: "Method of manipulation" },
      { label: "Emotional traits" },
      { label: "Attitude towards society / general perspective" },
      { label: "Personal experiences that shaped their worldview", type: "textarea", rows: 3 },
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
      { label: "Top three things they value most in life", type: "textarea", rows: 3 },
      { label: "Object they cannot bear to part with and why", type: "textarea", rows: 3 },
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
      { label: "How is your character dissatisfied with their life?", type: "textarea", rows: 3 },
      { label: "What do they believe will bring them happiness?", type: "textarea", rows: 3 },
      { label: "What definitive step could they take to turn their dream into a reality?", type: "textarea", rows: 3 },
      { label: "How has their fear kept them from taking this action already?", type: "textarea", rows: 3 },
      { label: "How do they think they can accomplish their goal while steering clear of what they are afraid of?", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "character-arc",
    title: "Character Arc Builder",
    description: "Full arc scaffolding from desire to transformation.",
    fields: [
      { label: "Why do you want to write this story, and why is the theme important to you?", type: "textarea", rows: 3 },
      { label: "Protagonist desire", type: "textarea", rows: 3 },
      { label: "Protagonist misbelief", type: "textarea", rows: 3 },
      { label: "Protagonist fear", type: "textarea", rows: 3 },
      { label: "Opening: How is their fear standing in the way of what they think will make them happy?", type: "textarea", rows: 4 },
      { label: "Inciting incident: Why does it matter, how does it push them outside their comfort zone, and how do they respond based on fear?", type: "textarea", rows: 4 },
      { label: "Middle: Describe the fear-based decision after the inciting incident and the consequences until the midpoint.", type: "textarea", rows: 4 },
      { label: "Dark moment: What does the disaster mean personally, and how does it force them to face fear and misbelief?", type: "textarea", rows: 4 },
      { label: "Aha moment: What revelation do they have, how will they overcome fear and continue to the climax, and what lesson do they learn and teach?", type: "textarea", rows: 4 },
      { label: "Ending: How do they face their most difficult challenge, and how does their response prove change?", type: "textarea", rows: 4 },
      { label: "Conclusion: How has the character transformed as a result of the journey?", type: "textarea", rows: 3 },
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
]

export const RELATIONSHIP_DEEP_DIVE_FIELDS: Array<{
  key: keyof Omit<RelationshipDeepDive, "id">
  label: string
  type?: "text" | "textarea"
  rows?: number
}> = [
  { key: "relationshipName", label: "Relationship name / who is this about?" },
  { key: "relationshipSummary", label: "Relationship description (in a few words)", type: "textarea", rows: 2 },
  { key: "conflicts", label: "Points of conflict in their relationship", type: "textarea", rows: 3 },
  { key: "agreements", label: "What do they agree on? What do they disagree on?", type: "textarea", rows: 3 },
  { key: "secrets", label: "Secrets kept from each other and why", type: "textarea", rows: 3 },
  { key: "howMet", label: "How did they meet and how long have they known each other?", type: "textarea", rows: 3 },
  { key: "changes", label: "How will the relationship change over the story?", type: "textarea", rows: 3 },
]

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export const buildSections = (definitions: SectionDefinition[]) =>
  definitions.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({ ...field, key: `${section.id}.${slugify(field.label)}` })),
  }))

export const SECTIONS = buildSections(SECTION_DEFINITIONS)

export const FIELD_KEYS = SECTIONS.flatMap((s) => s.fields.map((f) => f.key))

export const DEFAULT_FORM_DATA: Record<string, string> = FIELD_KEYS.reduce((acc, k) => { acc[k] = ""; return acc }, {} as Record<string,string>)

export const DEFAULT_OPTIONAL: Record<"magic"|"tech", boolean> = { magic: false, tech: false }

export const EMPTY_DEEP_DIVE: Omit<RelationshipDeepDive, "id"> = {
  relationshipName: "",
  relationshipSummary: "",
  conflicts: "",
  agreements: "",
  secrets: "",
  howMet: "",
  changes: "",
}

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
