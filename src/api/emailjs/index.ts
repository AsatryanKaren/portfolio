import emailjs from "@emailjs/browser";

import { EMAILJS_TEMPLATE_FIELDS } from "./consts";
import type { ContactMessagePayload } from "./types";
import { getEmailJsErrorMessage } from "./utils";

type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

const readEmailJsConfig = (): EmailJsConfig => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Missing EmailJS config. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.local (see .env.example).",
    );
  }

  return { serviceId, templateId, publicKey };
};

export const sendContactMessage = async (
  payload: ContactMessagePayload,
): Promise<void> => {
  const { serviceId, templateId, publicKey } = readEmailJsConfig();

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        [EMAILJS_TEMPLATE_FIELDS.fromName]: payload.fromName,
        [EMAILJS_TEMPLATE_FIELDS.message]: payload.message,
      },
      { publicKey },
    );
  } catch (error) {
    throw new Error(getEmailJsErrorMessage(error));
  }
};
