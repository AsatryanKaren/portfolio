import type { NavItem } from "./types";

export const BRAND_NAME = "Karen Asatryan";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Gemini", to: "/gemini" },
  { label: "D-ID talk", to: "/did" },
] as const;
