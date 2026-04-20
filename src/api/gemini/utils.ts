import { isAxiosError } from "axios";

import type { GeminiApiErrorBody } from "./types";

export const getGeminiErrorMessage = (unknown: unknown): string => {
  if (isAxiosError(unknown)) {
    const data = unknown.response?.data as GeminiApiErrorBody | undefined;
    const apiMessage = data?.error?.message;
    if (typeof apiMessage === "string" && apiMessage.trim().length > 0) {
      return apiMessage.trim();
    }
    if (typeof unknown.message === "string" && unknown.message.length > 0) {
      return unknown.message;
    }
  }
  if (unknown instanceof Error) {
    return unknown.message;
  }
  return "Gemini request failed.";
};
