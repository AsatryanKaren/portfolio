import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export function AboutPage() {
  return (
    <Card style={{ maxWidth: 720 }}>
      <Title level={3}>About</Title>
      <Paragraph>
        Describe your experience, stack, and what you are looking for. This page lives
        in <code>src/pages/AboutPage.tsx</code>.
      </Paragraph>
    </Card>
  );
}
