export const getAriLabel = (ari: number) => {
  switch (ari) {
    case 1:
      return "Kindergarten"
    case 2:
      return "First grade"
    case 3:
      return "Second grade"
    case 4:
      return "Third grade"
    case 5:
      return "Fourth grade"
    case 6:
      return "Fifth grade"
    case 7:
    case 8:
    case 9:
      return "Middle school"
    case 10:
    case 11:
    case 12:
    case 13:
      return "High school"
    case 14:
      return "College / University"
    default:
      return "Invalid ARI score"
  }
}

export const getLIXLabel = (lix: number | null) => {
  if (!lix) return "Invalid LIX score"
  if (lix <= 25) {
    return "Children level"
  }
  if (lix <= 30) {
    return "Simple text"
  }
  if (lix <= 40) {
    return "Fiction level"
  }
  if (lix <= 50) {
    return "Informative text"
  }
  if (lix <= 60) {
    return "Non fiction text"
  }
  return "Scientific text"
}
