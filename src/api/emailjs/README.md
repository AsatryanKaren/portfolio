# EmailJS contact form

Send a contact form from the browser without a backend.

## 1. Install

```bash
pnpm add @emailjs/browser
```

## 2. EmailJS account

1. Sign up at [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → add a service → copy **Service ID** (`service_...`).
3. **Email Templates** → create a template → copy **Template ID** (`template_...`).
4. **Account → API Keys** → copy **Public Key**.

Template body:

```
From: {{from_name}}

{{message}}
```

## 3. Env variables

Create `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Add types in `vite-env.d.ts`:

```ts
interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}
```

Restart the dev server after saving.

## 4. Send function

Create `src/api/emailjs/index.ts`:

```ts
import emailjs from "@emailjs/browser";

type ContactMessagePayload = {
  fromName: string;
  message: string;
};

export const sendContactMessage = async (
  payload: ContactMessagePayload,
): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Missing EmailJS env variables.");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: payload.fromName,
      message: payload.message,
    },
    { publicKey },
  );
};
```

## 5. Contact form page

Create a page with **Name** and **Message** fields. On submit, call `sendContactMessage()`.

Example with Ant Design:

```tsx
import { useState } from "react";
import { App, Button, Form, Input } from "antd";
import { sendContactMessage } from "@/api/emailjs";

type ContactFormValues = {
  fromName: string;
  message: string;
};

export function ContactPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      await sendContactMessage({
        fromName: values.fromName.trim(),
        message: values.message.trim(),
      });
      form.resetFields();
      message.success("Message sent.");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Could not send message.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="fromName"
        rules={[{ required: true, message: "Enter your name." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: "Enter a message." }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Send message
      </Button>
    </Form>
  );
}
```

Wrap your app with Ant Design `<App>` so `message.success()` works:

```tsx
import { App, ConfigProvider } from "antd";

<ConfigProvider>
  <App>{children}</App>
</ConfigProvider>
```

Add a route (e.g. `/contact`) and link to it from your nav.

## 6. Test

1. Open the contact page.
2. Fill name + message.
3. Click **Send message**.
4. Check your inbox.
