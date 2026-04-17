import {
  SECTION_EYEBROW,
  SECTION_TITLE,
  TECH_CARDS,
} from "./consts";
import styles from "./styles.module.css";
import { techCardKey } from "./utils";

export function TechEcosystem() {
  return (
    <section className={styles.section}>
      <div className={styles.eyebrowRow}>
        <p className={styles.eyebrow}>{SECTION_EYEBROW}</p>
        <h2 className={styles.title}>{SECTION_TITLE}</h2>
      </div>
      <div className={styles.grid}>
        {TECH_CARDS.map((card) => (
          <article key={techCardKey(card)} className={styles.card}>
            <p className={styles.cardEyebrow}>{card.eyebrow}</p>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            {card.presentation === "tags" ? (
              <div className={styles.tags}>
                {card.items.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <ul className={styles.list}>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
