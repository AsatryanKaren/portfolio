import { NavLink } from "react-router-dom";

import { ThemeToggle } from "@/components/ThemeToggle";

import { BRAND_NAME, NAV_ITEMS } from "./consts";
import styles from "./styles.module.css";
import { joinNavClassNames } from "./utils";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          {BRAND_NAME}
        </NavLink>
        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                joinNavClassNames(styles.link, isActive && styles.linkActive)
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
