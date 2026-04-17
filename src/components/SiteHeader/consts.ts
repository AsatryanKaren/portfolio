import type { NavItem } from "./types";

export const BRAND_NAME = "Karen Asatryan";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
] as const;
