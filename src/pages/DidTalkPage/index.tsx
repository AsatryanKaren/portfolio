import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
} from "antd";

import { createTalk, pollTalkUntilTerminal } from "@/api/did";
import type { DidMicrosoftTtsProvider } from "@/api/did/types";

import {
  AZURE_VOICE_OPTIONS,
  DEFAULT_AZURE_VOICE_ID,
  DEFAULT_SCRIPT,
  DEFAULT_SOURCE_URL,
  PAGE_TITLE,
} from "./consts";
import styles from "./styles.module.css";

const { Paragraph, Text, Title } = Typography;

type DidTalkFormValues = {
  sourceUrl: string;
  script: string;
  voiceId: string;
  talkStyle?: string;
};

export function DidTalkPage() {
  const [form] = Form.useForm<DidTalkFormValues>();
  const [loading, setLoading] = useState(false);
  const [pollStatus, setPollStatus] = useState<string | null>(null);
  const [talkId, setTalkId] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const sourceUrlWatch = Form.useWatch("sourceUrl", form);
  const voiceIdWatch = Form.useWatch("voiceId", form);
  const displayPreviewUrl =
    typeof sourceUrlWatch === "string" && sourceUrlWatch.trim().length > 0
      ? sourceUrlWatch.trim()
      : null;

  const selectedVoice = AZURE_VOICE_OPTIONS.find((o) => o.value === voiceIdWatch);
  const talkStyleChoices = selectedVoice?.styles;

  const onFinish = async (values: DidTalkFormValues) => {
    setLoading(true);
    setApiError(null);
    setResultUrl(null);
    setTalkId(null);
    setPollStatus(null);

    try {
      const voiceId = values.voiceId.trim();
      const voiceMeta = AZURE_VOICE_OPTIONS.find((o) => o.value === voiceId);
      const provider: DidMicrosoftTtsProvider = {
        type: "microsoft",
        voice_id: voiceId,
      };
      if (
        voiceMeta?.styles &&
        voiceMeta.styles.length > 0 &&
        typeof values.talkStyle === "string" &&
        values.talkStyle.trim().length > 0
      ) {
        provider.voice_config = { style: values.talkStyle.trim() };
      }

      const created = await createTalk({
        source_url: values.sourceUrl.trim(),
        script: {
          type: "text",
          input: values.script.trim(),
          provider,
        },
      });
      setTalkId(created.id);
      setPollStatus(`Created talk ${created.id} (status: ${created.status}). Waiting…`);

      const final = await pollTalkUntilTerminal(created.id, {
        onProgress: (t) => {
          setPollStatus(`Talk ${t.id}: ${t.status}`);
        },
      });

      if (!final.result_url?.trim()) {
        throw new Error("Talk completed but the API did not return a result URL.");
      }
      setResultUrl(final.result_url.trim());
      void message.success("Video is ready.");
    } catch (error) {
      console.error(error);
      const description =
        error instanceof Error ? error.message : "D-ID request failed.";
      setApiError(description);
    } finally {
      setLoading(false);
      setPollStatus(null);
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
              Uses{" "}
              <Typography.Link
                href="https://docs.d-id.com/reference/createtalk"
                target="_blank"
                rel="noreferrer"
              >
                Create talk
              </Typography.Link>{" "}
              and{" "}
              <Typography.Link
                href="https://docs.d-id.com/reference/gettalk"
                target="_blank"
                rel="noreferrer"
              >
                Get talk
              </Typography.Link>
              : a public HTTPS image URL (jpg/png) plus text for TTS/lip-sync (Azure neural
              voice via <Typography.Text code>provider.type: microsoft</Typography.Text>). Set{" "}
              <Typography.Text code>VITE_DID_API_KEY</Typography.Text> in{" "}
              <Typography.Text code>.env.local</Typography.Text> (see{" "}
              <Typography.Text code>.env.example</Typography.Text>).
            </Paragraph>
          </div>

          <Alert
            type="warning"
            showIcon
            message="Client-side keys are visible in the browser"
            description={
              <Paragraph className={styles.lead}>
                Fine for local demos. For production, proxy D-ID through your own
                backend so the key stays private.
              </Paragraph>
            }
          />

          {apiError ? (
            <Alert
              type="error"
              showIcon
              closable
              message="Request failed"
              description={<pre className={styles.errorPre}>{apiError}</pre>}
              onClose={() => setApiError(null)}
            />
          ) : null}

          {pollStatus ? (
            <Alert
              type="info"
              showIcon
              message="Processing"
              description={<p className={styles.statusLine}>{pollStatus}</p>}
            />
          ) : null}

          <Form<DidTalkFormValues>
            form={form}
            layout="vertical"
            initialValues={{
              sourceUrl: DEFAULT_SOURCE_URL,
              script: DEFAULT_SCRIPT,
              voiceId: DEFAULT_AZURE_VOICE_ID,
            }}
            onFinish={(v) => void onFinish(v)}
          >
            <Form.Item
              label="Source image URL"
              name="sourceUrl"
              extra="Must be a reachable https (or s3) URL ending in .jpg, .jpeg, or .png."
              rules={[
                { required: true, message: "Enter an image URL." },
                { type: "url", message: "Enter a valid URL." },
              ]}
            >
              <Input placeholder="https://…/photo.jpg" />
            </Form.Item>

            {displayPreviewUrl ? (
              <div className={styles.previewRow}>
                <Text type="secondary">Preview</Text>
                <div>
                  <img
                    className={styles.previewImg}
                    src={displayPreviewUrl}
                    alt="Portrait loaded from the source URL"
                  />
                </div>
              </div>
            ) : null}

            <Form.Item
              label="Voice (Microsoft TTS)"
              name="voiceId"
              extra={
                <>
                  D-ID passes this as Microsoft TTS; standard ids match{" "}
                  <Typography.Link
                    href="https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Azure neural voices
                  </Typography.Link>
                  . Multi-style MAI voices use the id from the D-ID / Microsoft gallery (see{" "}
                  <Typography.Link
                    href="https://docs.d-id.com/reference/tts-microsoft"
                    target="_blank"
                    rel="noreferrer"
                  >
                    D-ID Microsoft TTS
                  </Typography.Link>
                  ).
                </>
              }
              rules={[{ required: true, message: "Choose a voice." }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={AZURE_VOICE_OPTIONS.map((o) => ({
                  value: o.value,
                  label: `${o.label} (${o.value})`,
                }))}
                placeholder="Select voice"
              />
            </Form.Item>

            {talkStyleChoices && talkStyleChoices.length > 0 ? (
              <Form.Item
                label="Talk style"
                name="talkStyle"
                initialValue="anger"
                preserve={false}
                extra="Sent as provider.voice_config.style (Microsoft expressive / MAI)."
                rules={[{ required: true, message: "Choose a talk style." }]}
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  options={talkStyleChoices.map((s) => ({
                    value: s,
                    label: `${s.charAt(0).toUpperCase()}${s.slice(1)}`,
                  }))}
                  placeholder="Select style"
                />
              </Form.Item>
            ) : null}

            <Form.Item
              label="What should the avatar say?"
              name="script"
              rules={[
                { required: true, message: "Enter what to say." },
                { min: 3, message: "Use at least 3 characters (D-ID API minimum)." },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item>
              <Flex gap="small" wrap>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create video
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

          {talkId && !resultUrl && !loading ? (
            <Text type="secondary">
              Last talk id: <Typography.Text code>{talkId}</Typography.Text>
            </Text>
          ) : null}

          {resultUrl ? (
            <Card size="small" title="Result">
              <Space direction="vertical" size="middle" className={styles.stack}>
                <video
                  className={styles.video}
                  controls
                  src={resultUrl}
                >
                  Your browser cannot play this URL inline. Open the link below.
                </video>
                <Paragraph className={styles.lead}>
                  <Typography.Link href={resultUrl} target="_blank" rel="noreferrer">
                    Open video in a new tab
                  </Typography.Link>
                </Paragraph>
              </Space>
            </Card>
          ) : (
            <Text type="secondary">The rendered video appears here when ready.</Text>
          )}
        </Space>
      </Card>
    </div>
  );
}
