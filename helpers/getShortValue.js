export const getShortString = (string, maxLength) => {
  const indexOfEnd = string.indexOf(' ', +maxLength);

  if (indexOfEnd !== -1) return string.slice(0, +maxLength) + '...';
  return string;
};