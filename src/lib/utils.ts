import { technologies } from "./static-data";

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

export function getServiceIcon(serviceName: string): {
  name: string;
  icon: string;
} {
  // Split the service name into words
  const serviceWords = serviceName.toLowerCase().split(" ");

  // Find the first match in the services array
  const matchingService = technologies.find((service) => {
    // Split the service item's name into words
    const serviceItemWords = service.name.toLowerCase().split(" ");
    // Check if any word matches
    return serviceWords.some((word) => serviceItemWords.includes(word));
  });

  // Return the matching service or null if not found
  return matchingService ?? technologies[0];
}
