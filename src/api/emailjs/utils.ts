import type { EmailJsErrorBody } from "./types";

export const getEmailJsErrorMessage = (unknown: unknown): string => {
  if (
    typeof unknown === "object" &&
    unknown !== null &&
    "text" in unknown &&
    typeof unknown.text === "string" &&
    unknown.text.trim().length > 0
  ) {
    return unknown.text.trim();
  }

  if (unknown instanceof Error) {
    return unknown.message;
  }

  if (
    typeof unknown === "object" &&
    unknown !== null &&
    "message" in unknown
  ) {
    const body = unknown as EmailJsErrorBody;
    if (typeof body.message === "string" && body.message.trim().length > 0) {
      return body.message.trim();
    }
  }

  return "Email could not be sent.";
};
