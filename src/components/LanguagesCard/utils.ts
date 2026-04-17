import type { LanguageItem } from "./types";

export function languageKey(item: LanguageItem): string {
  return item.id;
}
