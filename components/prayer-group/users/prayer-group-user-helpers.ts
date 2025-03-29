export const normalizeText = (text: string | undefined): string => {
  if (!text) {
    return "";
  }
  return text.toLocaleLowerCase().replaceAll(" ", "");
};
