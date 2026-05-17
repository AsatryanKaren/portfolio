import { useState } from "react";
import {
  Alert,
  App,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd";

import { sendContactMessage } from "@/api/emailjs";

import { PAGE_LEAD, PAGE_TITLE, SUCCESS_MESSAGE } from "./consts";
import styles from "./styles.module.css";

const { Paragraph, Title } = Typography;

type ContactFormValues = {
  fromName: string;
  message: string;
};

export function ContactPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const onFinish = async (values: ContactFormValues) => {
    setLoading(true);
    setApiError(null);
    try {
      await sendContactMessage({
        fromName: values.fromName.trim(),
        message: values.message.trim(),
      });
      form.resetFields();
      message.success(SUCCESS_MESSAGE);
    } catch (error) {
      console.error(error);
      const description =
        error instanceof Error ? error.message : "Email could not be sent.";
      setApiError(description);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <Space direction="vertical" size="large" className={styles.stack}>
          <div>
            <Title level={2} className={styles.title}>
              {PAGE_TITLE}
            </Title>
            <Paragraph className={styles.lead}>{PAGE_LEAD}</Paragraph>
          </div>

          <Alert
            type="warning"
            showIcon
            message="Configure EmailJS in .env.local"
            description={
              <Paragraph className={styles.lead}>
                Create a service and template at{" "}
                <Typography.Link
                  href="https://www.emailjs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  emailjs.com
                </Typography.Link>
                , then set{" "}
                <Typography.Text code>VITE_EMAILJS_SERVICE_ID</Typography.Text>
                ,{" "}
                <Typography.Text code>VITE_EMAILJS_TEMPLATE_ID</Typography.Text>
                , and{" "}
                <Typography.Text code>VITE_EMAILJS_PUBLIC_KEY</Typography.Text>{" "}
                (see <Typography.Text code>.env.example</Typography.Text>).
                Template variables:{" "}
                <Typography.Text code>from_name</Typography.Text>,{" "}
                <Typography.Text code>message</Typography.Text>.
              </Paragraph>
            }
          />

          {apiError ? (
            <Alert
              type="error"
              showIcon
              closable
              message="Could not send message"
              description={<pre className={styles.errorPre}>{apiError}</pre>}
              onClose={() => setApiError(null)}
            />
          ) : null}

          <Form<ContactFormValues>
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="fromName"
              rules={[{ required: true, message: "Enter your name." }]}
            >
              <Input autoComplete="name" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Enter a message." }]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item>
              <Flex gap="small" wrap>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Send message
                </Button>
                <Button
                  htmlType="button"
                  disabled={loading}
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
