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
