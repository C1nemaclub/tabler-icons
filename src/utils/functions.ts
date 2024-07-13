type TermParts = {
  before: string;
  searchTerm: string;
  after: string;
};

export const extractTermParts = (
  searchTerm: string,
  value: string
): TermParts | null => {
  const lowerCaseName = value.toLowerCase();
  const lowerCaseTerm = searchTerm.toLowerCase();
  const startIndex = lowerCaseName.indexOf(lowerCaseTerm);

  if (startIndex !== -1) {
    const before = value.slice(0, startIndex);
    const termPart = value.slice(startIndex, startIndex + searchTerm.length);
    const after = value.slice(startIndex + searchTerm.length);
    return { before, searchTerm: termPart, after };
  } else {
    return null;
  }
};
