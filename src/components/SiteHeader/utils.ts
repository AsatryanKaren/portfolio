export function joinNavClassNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
