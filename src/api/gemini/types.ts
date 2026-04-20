export type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export type GeminiApiErrorBody = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};
