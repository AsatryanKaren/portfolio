import axios from "axios";

import {
  DEFAULT_MAX_POLL_ATTEMPTS,
  DEFAULT_POLL_INTERVAL_MS,
  DID_API_BASE,
  DID_CREATE_TALK_PATH,
} from "./consts";
import type {
  DidCreateTalkRequest,
  DidCreateTalkResponse,
  DidGetTalkResponse,
  DidTalkStatus,
} from "./types";
import { getDidErrorMessage, sleep } from "./utils";

const readDidApiKey = (): string => {
  const key = import.meta.env.VITE_DID_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "Missing VITE_DID_API_KEY. Add it to .env.local (see .env.example).",
    );
  }
  return key;
};

const authHeaders = (): { Authorization: string } => {
  const apiKey = readDidApiKey();
  const token = globalThis.btoa(`${apiKey}:`);
  return { Authorization: `Basic ${token}` };
};

export const createTalk = async (
  body: DidCreateTalkRequest,
): Promise<DidCreateTalkResponse> => {
  try {
    const { data } = await axios.post<DidCreateTalkResponse>(
      `${DID_API_BASE}${DID_CREATE_TALK_PATH}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(getDidErrorMessage(error));
  }
};

export const getTalk = async (id: string): Promise<DidGetTalkResponse> => {
  try {
    const { data } = await axios.get<DidGetTalkResponse>(
      `${DID_API_BASE}${DID_CREATE_TALK_PATH}/${encodeURIComponent(id)}`,
      {
        headers: {
          ...authHeaders(),
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(getDidErrorMessage(error));
  }
};

const TERMINAL_STATUSES: readonly DidTalkStatus[] = [
  "done",
  "error",
  "rejected",
] as const;

export const pollTalkUntilTerminal = async (
  id: string,
  options?: {
    intervalMs?: number;
    maxAttempts?: number;
    onProgress?: (talk: DidGetTalkResponse) => void;
  },
): Promise<DidGetTalkResponse> => {
  const intervalMs = options?.intervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  const maxAttempts = options?.maxAttempts ?? DEFAULT_MAX_POLL_ATTEMPTS;
  const onProgress = options?.onProgress;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const talk = await getTalk(id);
    onProgress?.(talk);
    if (TERMINAL_STATUSES.includes(talk.status)) {
      if (talk.status === "done") {
        return talk;
      }
      throw new Error(
        `Talk finished with status "${talk.status}". No video URL is available.`,
      );
    }
    await sleep(intervalMs);
  }

  throw new Error(
    "Timed out waiting for the talk to finish. Try again or check the talk in the D-ID dashboard.",
  );
};
