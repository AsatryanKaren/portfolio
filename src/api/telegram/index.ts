import type { ContactMessagePayload } from "@/api/emailjs/types";

import { formatContactMessageHtml } from "./utils";

type TelegramSendResponse = {
  ok: boolean;
  description?: string;
};

type TelegramConfig = {
  botToken: string;
  chatId: string;
};

const readTelegramConfig = (): TelegramConfig => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.trim();
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    throw new Error(
      "Missing Telegram config. Set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env.local (see .env.example).",
    );
  }

  return { botToken, chatId };
};

const parseSendMessageError = (data: unknown): string | undefined => {
  if (typeof data !== "object" || data === null) {
    return undefined;
  }
  const record = data as Record<string, unknown>;
  const description = record.description;
  return typeof description === "string" ? description : undefined;
};

export const isTelegramConfigured = (): boolean => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.trim();
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim();
  return Boolean(botToken && chatId);
};

export const sendContactMessageViaTelegram = async (
  payload: ContactMessagePayload,
): Promise<void> => {
  const { botToken, chatId } = readTelegramConfig();
  const text = formatContactMessageHtml(payload.fromName, payload.message);

  const url = `https://api.telegram.org/bot${encodeURIComponent(botToken)}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  let data: unknown;
  try {
    data = (await response.json()) as unknown;
  } catch {
    throw new Error("Telegram returned an invalid response.");
  }

  const parsed = data as TelegramSendResponse;
  if (!response.ok || !parsed.ok) {
    const fromBody = parseSendMessageError(data);
    throw new Error(
      fromBody ?? `Telegram request failed (${String(response.status)}).`,
    );
  }
};
