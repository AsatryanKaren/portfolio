import { ROUTES } from "./consts";

export function childPath(segment: keyof typeof ROUTES): string {
  return ROUTES[segment];
}
