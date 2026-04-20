export const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta" as const;

/** Override with VITE_GEMINI_MODEL in .env.local if Google changes IDs. */
const envModel = import.meta.env.VITE_GEMINI_MODEL?.trim();

export const GEMINI_MODEL =
  envModel && envModel.length > 0 ? envModel : "gemini-2.5-flash";
