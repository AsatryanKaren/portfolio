export const PAGE_TITLE = "D-ID talk (image → video)";

/** Example portrait URL from D-ID docs; replace with your own hosted image. */
export const DEFAULT_SOURCE_URL =
  "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg";

export const DEFAULT_SCRIPT =
  "Hello — this is a quick test of animating a photo with D-ID.";

/** D-ID `script.provider` with `type: "microsoft"` uses Azure neural voices (`voice_id`). */
export const DEFAULT_AZURE_VOICE_ID = "en-US-JennyNeural";

export type AzureVoiceOption = {
  value: string;
  label: string;
  /**
   * When set, D-ID accepts `provider.voice_config.style` for this `voice_id`
   * (see [Microsoft TTS](https://docs.d-id.com/reference/tts-microsoft)).
   */
  styles?: readonly string[];
};

/** Talk styles for `en-US-June:MAI-Voice-1` (Microsoft multi-style / MAI). */
export const JUNE_MAI_TALK_STYLES = [
  "anger",
  "callcenter",
  "confusion",
  "customerservice",
  "disgust",
  "embarrassment",
  "fear",
  "generalconversation",
  "happiness",
  "jealous",
  "joy",
  "learning",
  "professional",
  "regret",
  "sadness",
  "surprise",
] as const;

/** Curated Azure neural voices; full catalog is larger (see Microsoft docs). */
export const AZURE_VOICE_OPTIONS: readonly AzureVoiceOption[] = [
  { value: "en-US-JennyNeural", label: "English (US) — Jenny" },
  { value: "en-US-GuyNeural", label: "English (US) — Guy" },
  { value: "en-US-AriaNeural", label: "English (US) — Aria" },
  { value: "en-US-DavisNeural", label: "English (US) — Davis" },
  {
    value: "en-US-June:MAI-Voice-1",
    label: "English (US) — June (MAI, multi-style)",
    styles: JUNE_MAI_TALK_STYLES,
  },
  { value: "en-GB-RyanNeural", label: "English (UK) — Ryan" },
  { value: "en-GB-SoniaNeural", label: "English (UK) — Sonia" },
  { value: "de-DE-KatjaNeural", label: "German — Katja" },
  { value: "fr-FR-DeniseNeural", label: "French — Denise" },
  { value: "es-ES-ElviraNeural", label: "Spanish (Spain) — Elvira" },
  { value: "hy-AM-HaykNeural", label: "Armenian (Armenia) — Hayk" },
  { value: "ja-JP-NanamiNeural", label: "Japanese — Nanami" },
] as const;
