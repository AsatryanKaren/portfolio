import { GlobalOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";

import { COPYRIGHT, SOCIAL_LINKS } from "./consts";
import styles from "./styles.module.css";
import { socialKey } from "./utils";

const ICONS = {
  site: <GlobalOutlined />,
  mail: <MailOutlined />,
  linkedin: <LinkedinOutlined />,
} as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>{COPYRIGHT}</p>
      <div className={styles.social}>
        {SOCIAL_LINKS.map((link) => {
          const openInNewTab = link.href.startsWith("http");
          return (
            <a
              key={socialKey(link)}
              className={styles.iconLink}
              href={link.href}
              aria-label={link.label}
              target={openInNewTab ? "_blank" : undefined}
              rel={openInNewTab ? "noreferrer" : undefined}
            >
              {ICONS[link.id]}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
