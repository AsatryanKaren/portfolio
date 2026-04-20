import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import {
  HEADLINE_HIGHLIGHT,
  HEADLINE_LEAD,
  HEADLINE_TAIL,
  HERO_IMAGE_ALT,
  GEMINI_BUTTON,
  INTRO,
  RESUME_BUTTON,
  RESUME_HREF,
  ROLE_BADGE,
} from "./consts";
import styles from "./styles.module.css";
import { heroImageSrc } from "./utils";

export function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div>
          <div className={styles.badge}>{ROLE_BADGE}</div>
          <h1 className={styles.headline}>
            {HEADLINE_LEAD}
            <span className={styles.highlight}>{HEADLINE_HIGHLIGHT}</span>
            {HEADLINE_TAIL}
          </h1>
          <p className={styles.lead}>{INTRO}</p>
          <div className={styles.actions}>
            <a
              className={`${styles.btn} ${styles.btnPrimarySolid}`}
              href={RESUME_HREF}
            >
              <DownloadOutlined />
              {RESUME_BUTTON}
            </a>
            <Link
              className={`${styles.btn} ${styles.btnAccent}`}
              to="/gemini"
            >
              {GEMINI_BUTTON}
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <img src={heroImageSrc()} alt={HERO_IMAGE_ALT} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
