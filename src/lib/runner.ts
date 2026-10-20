import { SECTION_DEFINITIONS } from "@/app/character-sheet-builder/config";
import { db } from "@/prisma/db";
const runner = async () => {
  await db.orm.public.CharacterSection.createAll(
    SECTION_DEFINITIONS.map((s) => ({
      name: s.title,
      description: s.description ?? "",
    })),
    { onConflict: "skip" },
  );

  const sections = await db.orm.public.CharacterSection.all();

  const ENUMS = [
    "MBTI personality type",
    "Pronouns",
    "Enneagram personality type",
  ];
  const ENUMS_OPTIONS = {
    [ENUMS[0]]: [
      "INTJ",
      "INTP",
      "ENTJ",
      "ENTP",
      "INFJ",
      "INFP",
      "ENFJ",
      "ENFP",
      "ISTJ",
      "ISFJ",
      "ESTJ",
      "ESFJ",
      "ISTP",
      "ISFP",
      "ESTP",
      "ESFP",
    ],
    [ENUMS[1]]: ["she/her", "he/him", "they/them", "custom"],
    [ENUMS[2]]: [
      "Type 1 (The Reformer / Perfectionist)",
      "Type 2 (The Helper / Giver)",
      "Type 3 (The Achiever / Performer)",
      "Type 4 (The Individualist / Romantic)",
      "Type 5 (The Investigator / Observer)",
      "Type 6 (The Loyalist / Skeptic)",
      "Type 7 (The Enthusiast / Adventurer)",
      "Type 8 (The Challenger / Protector)",
      "Type 9 (The Peacemaker / Mediator)",
    ],
  };
  for (const section of SECTION_DEFINITIONS) {
    await db.orm.public.CharacterTrait.createAll(
      section.fields.map((f) => {
        
        return {
          character_section_id: sections.find((s) => s.name == section.title)!
            .id,
          name: f.label,
          type: !f.type ? "text" : ENUMS.includes(f.label) ? "enum" : f.type,
          enum_values: ENUMS_OPTIONS[f.label],
        };
      }),
      { onConflict: "skip" },
    );
  }
  const arcs = [
    {
      name: "The Setup",
      struct_type: "three_act_story_structure" as const,
      beats: [
        "Hook",
        "Inciting Incident",
        "Impossible Choice",
        "First pinch point",
      ],
    },
    {
      name: "The Conflict",
      struct_type: "three_act_story_structure" as const,
      beats: [
        "Pre-midpoint reactionary protagonist",
        "Game-changing midpoint",
        "Post-midpoint action protagonist",
        "Second pinch point",
      ],
    },
    {
      name: "The Resolution",
      struct_type: "three_act_story_structure" as const,
      beats: [
        "Supposed victory",
        "Disaster",
        "Dark moment / temptation",
        "Climactic confrontation",
        "Victory / resolution",
      ],
    },
  ];

  for (const arc of arcs) {
    const a = await db.orm.public.Arc.upsert({
      create: { name: arc.name, struct_type: arc.struct_type },
      update: {},
    });
    await db.orm.public.Arc.createAll(
      arc.beats.map((b) => ({
        struct_type: "beat" as const,
        name: b,
        act_id: a.id,
      })), {onConflict: "skip"}
    );
  }
};

runner()
  .then(() => console.log("Runner done :)"))
  .catch((err) => console.log(err));
