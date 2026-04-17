export function joinLayoutClasses(
  ...parts: (string | false | undefined)[]
): string {
  return parts.filter(Boolean).join(" ");
}
