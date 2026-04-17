import { THEME_STORAGE_KEY } from "./consts";
import type { ThemeMode } from "./types";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "dark" || value === "light";
}

export function readStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(raw) ? raw : null;
}

export function persistTheme(mode: ThemeMode): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
}

export function oppositeMode(mode: ThemeMode): ThemeMode {
  return mode === "dark" ? "light" : "dark";
}
