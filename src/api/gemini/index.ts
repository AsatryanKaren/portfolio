import axios from "axios";

import { GEMINI_API_BASE, GEMINI_MODEL } from "./consts";
import type { GeminiGenerateContentResponse } from "./types";
import { getGeminiErrorMessage } from "./utils";

const readGeminiApiKey = (): string => {
  const key = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY. Add it to .env.local (see .env.example).",
    );
  }
  return key;
};

export const generateGeminiContent = async (
  prompt: string,
): Promise<string> => {
  const apiKey = readGeminiApiKey();
  const url = `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent`;

  try {
    const { data } = await axios.post<GeminiGenerateContentResponse>(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: apiKey },
      },
    );

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return typeof text === "string" ? text : "";
  } catch (error) {
    throw new Error(getGeminiErrorMessage(error));
  }
};
