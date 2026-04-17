import type { SocialLink } from "./types";

export function socialKey(link: SocialLink): string {
  return link.id;
}
