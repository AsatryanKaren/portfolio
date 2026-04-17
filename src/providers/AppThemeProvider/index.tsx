import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

import { ThemeContext } from "./context";
import { oppositeMode, persistTheme, readStoredTheme } from "./utils";
import type { ThemeMode } from "./types";

const darkTokens = {
  colorPrimary: "#a78bfa",
  colorInfo: "#a78bfa",
  colorBgBase: "#050a14",
  colorBgContainer: "#0f172a",
  colorText: "#f8fafc",
  colorTextSecondary: "#94a3b8",
  colorBorder: "#1e293b",
  borderRadiusLG: 14,
};

const lightTokens = {
  colorPrimary: "#7c3aed",
  colorInfo: "#7c3aed",
  colorBgBase: "#f8fafc",
  colorBgContainer: "#ffffff",
  colorText: "#0f172a",
  colorTextSecondary: "#475569",
  colorBorder: "#e2e8f0",
  borderRadiusLG: 14,
};

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredTheme() ?? "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    persistTheme(mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((m) => oppositeMode(m));
  }, []);

  const context = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  const antdThemeConfig = useMemo(
    () => ({
      algorithm:
        mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: mode === "dark" ? darkTokens : lightTokens,
      components: {
        Card: {
          colorBgContainer: mode === "dark" ? "#0f172a" : "#ffffff",
        },
      },
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={context}>
      <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}
