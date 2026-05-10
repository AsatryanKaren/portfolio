import { isAxiosError } from "axios";

import type { DidJsonError } from "./types";

export const getDidErrorMessage = (unknown: unknown): string => {
  if (isAxiosError(unknown)) {
    const data = unknown.response?.data as DidJsonError | undefined;
    const fromApi =
      typeof data?.description === "string" && data.description.trim().length > 0
        ? `${data.kind ?? "Error"}: ${data.description.trim()}`
        : undefined;
    if (fromApi) {
      return fromApi;
    }
    if (typeof unknown.message === "string" && unknown.message.length > 0) {
      return unknown.message;
    }
  }
  if (unknown instanceof Error) {
    return unknown.message;
  }
  return "D-ID request failed.";
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
