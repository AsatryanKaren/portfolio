import { Button, Card, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export function HomePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 720 }}>
      <div>
        <Title level={2}>Hi, I am a frontend developer.</Title>
        <Paragraph style={{ fontSize: 16 }}>
          This is your portfolio starter. Replace this copy, add your projects, and
          tune the layout in <code>src/layouts/MainLayout.tsx</code>.
        </Paragraph>
      </div>
      <Card title="Next steps">
        <Space wrap>
          <Link to="/about">
            <Button type="primary">Edit About</Button>
          </Link>
          <Link to="/projects">
            <Button>Add projects</Button>
          </Link>
        </Space>
      </Card>
    </Space>
  );
}
