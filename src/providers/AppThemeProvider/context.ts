import { createContext, useContext } from "react";

import type { ThemeMode } from "./types";

export type ThemeContextValue = {
  mode: ThemeMode;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useAppTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return value;
}
