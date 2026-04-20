import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd";

import { generateGeminiContent } from "@/api/gemini";

import { DEFAULT_PROMPT, PAGE_TITLE } from "./consts";
import styles from "./styles.module.css";

const { Paragraph, Text, Title } = Typography;

type GeminiFormValues = {
  prompt: string;
};

export function GeminiPage() {
  const [form] = Form.useForm<GeminiFormValues>();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const onFinish = async (values: GeminiFormValues) => {
    setLoading(true);
    setOutput("");
    setApiError(null);
    try {
      const text = await generateGeminiContent(values.prompt);
      setOutput(text.length > 0 ? text : "(Empty response)");
    } catch (error) {
      console.error(error);
      const description =
        error instanceof Error ? error.message : "Gemini request failed.";
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
            <Paragraph className={styles.lead}>
              Calls the Google Generative Language REST API with{" "}
              <Typography.Text code>axios</Typography.Text>. Put your key in{" "}
              <Typography.Text code>.env.local</Typography.Text> as{" "}
              <Typography.Text code>VITE_GEMINI_API_KEY</Typography.Text>{" "}
              (see <Typography.Text code>.env.example</Typography.Text>).
            </Paragraph>
          </div>

          <Alert
            type="warning"
            showIcon
            message="Client-side keys are visible in the browser"
            description={
              <Paragraph className={styles.lead}>
                This setup is for local experimentation. For production, call
                Gemini from your own server so the key stays private.
              </Paragraph>
            }
          />

          <Alert
            type="info"
            showIcon
            message="429 / quota exceeded"
            description={
              <Paragraph className={styles.lead}>
                That response comes from Google, not this app: your project hit
                rate or free-tier limits for the chosen model. Check{" "}
                <Typography.Link
                  href="https://ai.google.dev/gemini-api/docs/rate-limits"
                  target="_blank"
                  rel="noreferrer"
                >
                  rate limits
                </Typography.Link>
                , your usage in{" "}
                <Typography.Link
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google AI Studio
                </Typography.Link>
                , and billing if free tier shows limit 0. You can point{" "}
                <Typography.Text code>VITE_GEMINI_MODEL</Typography.Text> at
                another model your key supports (confirm names via the ListModels
                API).
              </Paragraph>
            }
          />

          {apiError ? (
            <Alert
              type="error"
              showIcon
              closable
              message="Last request failed"
              description={
                <pre className={styles.errorPre}>{apiError}</pre>
              }
              onClose={() => setApiError(null)}
            />
          ) : null}

          <Form<GeminiFormValues>
            form={form}
            layout="vertical"
            initialValues={{ prompt: DEFAULT_PROMPT }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Prompt"
              name="prompt"
              rules={[{ required: true, message: "Enter a prompt." }]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item>
              <Flex gap="small" wrap>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Send
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

          {output ? (
            <Card size="small" className={styles.outputCard} title="Response">
              <pre className={styles.pre}>{output}</pre>
            </Card>
          ) : (
            <Text type="secondary">Response will appear here.</Text>
          )}
        </Space>
      </Card>
    </div>
  );
}
