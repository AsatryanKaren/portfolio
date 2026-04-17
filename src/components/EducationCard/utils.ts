import type { EducationEntry } from "./types";

export function educationKey(entry: EducationEntry): string {
  return entry.id;
}
