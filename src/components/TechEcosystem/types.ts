type TechCardBase = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly items: readonly string[];
};

export type TechCard =
  | (TechCardBase & { readonly presentation: "tags" })
  | (TechCardBase & { readonly presentation: "bullets" });
