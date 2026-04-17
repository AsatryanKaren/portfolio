import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useAppTheme } from "@/providers/AppThemeProvider/context";

import { THEME_TOGGLE_LABEL } from "./consts";
import styles from "./styles.module.css";
import { nextThemeAriaLabel } from "./utils";

export function ThemeToggle() {
  const { mode, toggle } = useAppTheme();

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={THEME_TOGGLE_LABEL}
      title={nextThemeAriaLabel(mode)}
      onClick={toggle}
    >
      {mode === "dark" ? <MoonOutlined /> : <SunOutlined />}
    </button>
  );
}
