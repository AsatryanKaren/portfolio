import type { TechCard } from "./types";

export function techCardKey(card: TechCard): string {
  return card.id;
}
