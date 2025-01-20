export const HEADERS_PATH_KEY = "x-url";

export function getShortenedText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + "...";
}

export function toTitleCase(text: string): string {
  if (!text) return text; // Return as-is if the string is empty or undefined
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function trimAfterChar(text: string, char: string): string {
  const index = text.indexOf(char);
  return index !== -1 ? text.substring(0, index) : text;
}
