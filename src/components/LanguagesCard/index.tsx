import { LANGUAGES, SECTION_EYEBROW, SECTION_TITLE } from "./consts";
import styles from "./styles.module.css";
import { languageKey } from "./utils";

export function LanguagesCard() {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.eyebrow}>{SECTION_EYEBROW}</p>
        <h2 className={styles.title}>{SECTION_TITLE}</h2>
      </div>
      <div className={styles.tags}>
        {LANGUAGES.map((lang) => (
          <span key={languageKey(lang)} className={styles.tag}>
            {lang.label}
          </span>
        ))}
      </div>
    </section>
  );
}
