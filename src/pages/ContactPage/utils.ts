import { DIRECT_EMAIL } from "./consts";

export function mailtoHref(): string {
  return `mailto:${DIRECT_EMAIL}`;
}
