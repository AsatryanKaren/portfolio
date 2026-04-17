import { Card, Empty, Typography } from "antd";

const { Title, Paragraph } = Typography;

export function ProjectsPage() {
  return (
    <Card style={{ maxWidth: 960 }}>
      <Title level={3}>Projects</Title>
      <Paragraph>
        Showcase selected work here. Consider a grid of <code>Card</code> components or
        a <code>List</code> with links to demos and repositories.
      </Paragraph>
      <Empty description="No projects yet — add your first one in this file." />
    </Card>
  );
}
