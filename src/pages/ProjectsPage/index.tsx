import { Card, Empty, Typography } from "antd";

import { PAGE_TITLE } from "./consts";
import styles from "./styles.module.css";
import { emptyProjectsDescription } from "./utils";

const { Title, Paragraph } = Typography;

export function ProjectsPage() {
  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <Title level={3}>{PAGE_TITLE}</Title>
        <Paragraph>
          Showcase selected work here. Consider a grid of <code>Card</code>{" "}
          components or a <code>List</code> with links to demos and repositories.
        </Paragraph>
        <Empty description={emptyProjectsDescription()} />
      </Card>
    </div>
  );
}
