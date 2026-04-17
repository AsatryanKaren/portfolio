import { ENTRIES, SECTION_EYEBROW, SECTION_TITLE } from "./consts";
import styles from "./styles.module.css";
import { educationKey } from "./utils";

export function EducationCard() {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.eyebrow}>{SECTION_EYEBROW}</p>
        <h2 className={styles.title}>{SECTION_TITLE}</h2>
      </div>
      {ENTRIES.map((entry) => (
        <div key={educationKey(entry)} className={styles.item}>
          <p className={styles.degree}>{entry.degree}</p>
          <p className={styles.school}>{entry.school}</p>
          <p className={styles.period}>{entry.period}</p>
        </div>
      ))}
    </section>
  );
}
