import Rules from "../../app/editor/utils/regex/regex.utils"

it("cached regexes reuse same object when input unchanged", () => {
  Rules.setCharacters(["Alice", "Bob"])
  Rules.setDialogueTags(["said"])
  const rules1 = Rules.getRules()
  const rules2 = Rules.getRules()
  expect(rules1).toBe(rules2) // Same reference from cache
})

it("cache clears on characters change", () => {
  Rules.setCharacters(["Alice", "Bob"])
  const rules1 = Rules.getRules()
  Rules.setCharacters(["Charlie"])
  const rules2 = Rules.getRules()
  expect(rules1).not.toBe(rules2) // Cache invalidated, new object returned
})
