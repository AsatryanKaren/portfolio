import type { ThemeMode } from "@/providers/AppThemeProvider/types";

export function nextThemeAriaLabel(mode: ThemeMode): string {
  return mode === "dark" ? "Switch to light theme" : "Switch to dark theme";
}
