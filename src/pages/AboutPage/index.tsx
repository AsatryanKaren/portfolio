import { Card, Typography } from "antd";

import { ABOUT_BODY, PAGE_TITLE } from "./consts";
import styles from "./styles.module.css";
import { pageFolderLabel } from "./utils";

const { Title, Paragraph } = Typography;

export function AboutPage() {
  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <Title level={3}>{PAGE_TITLE}</Title>
        <Paragraph>
          {ABOUT_BODY} <code>{pageFolderLabel()}</code>.
        </Paragraph>
      </Card>
    </div>
  );
}
