import {
  EXPERIENCES,
  SECTION_CAPTION,
  SECTION_EYEBROW,
  SECTION_TITLE,
} from "./consts";
import styles from "./styles.module.css";
import { watermarkIcon } from "./utils";

export function ExperienceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.headRow}>
        <div>
          <p className={styles.eyebrow}>{SECTION_EYEBROW}</p>
          <h2 className={styles.title}>{SECTION_TITLE}</h2>
        </div>
        <p className={styles.caption}>{SECTION_CAPTION}</p>
      </div>
      <div className={styles.list}>
        {EXPERIENCES.map((job) => (
          <article key={job.id} className={styles.card}>
            <div className={styles.watermark} aria-hidden>
              {watermarkIcon(job.watermark)}
            </div>
            <div className={styles.cardInner}>
              <div>
                <div className={styles.roleLabel}>{job.roleLabel}</div>
                <h3 className={styles.company}>{job.company}</h3>
                <p className={styles.description}>{job.description}</p>
              </div>
              <div className={styles.meta}>
                {job.period}
                <span className={styles.metaMuted}>{job.modality}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
