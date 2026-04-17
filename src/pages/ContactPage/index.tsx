import { MailOutlined } from "@ant-design/icons";

import { DIRECT_EMAIL, PAGE_LEAD, PAGE_TITLE } from "./consts";
import styles from "./styles.module.css";
import { mailtoHref } from "./utils";

export function ContactPage() {
  return (
    <div className={styles.wrap}>
      <section className={styles.card}>
        <h1 className={styles.title}>{PAGE_TITLE}</h1>
        <p className={styles.lead}>{PAGE_LEAD}</p>
        <a className={styles.link} href={mailtoHref()}>
          <MailOutlined />
          {DIRECT_EMAIL}
        </a>
      </section>
    </div>
  );
}
