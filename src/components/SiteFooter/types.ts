export type SocialId = "site" | "mail" | "linkedin";

export type SocialLink = {
  readonly id: SocialId;
  readonly href: string;
  readonly label: string;
};
