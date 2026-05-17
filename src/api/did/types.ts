export type DidTalkStatus =
  | "created"
  | "started"
  | "done"
  | "error"
  | "rejected";

/**
 * Microsoft (Azure) neural TTS — see D-ID `script.provider` and
 * [Azure voice list](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts).
 */
export type DidMicrosoftTtsProvider = {
  type: "microsoft";
  voice_id: string;
  voice_config?: {
    style?: string;
    rate?: string;
    pitch?: string;
  };
  language?: string;
};

export type DidTtsProvider = DidMicrosoftTtsProvider;

export type DidTextScript = {
  type: "text";
  input: string;
  subtitles?: boolean;
  ssml?: boolean;
  provider?: DidTtsProvider;
};

export type DidCreateTalkRequest = {
  source_url: string;
  script: DidTextScript;
  name?: string;
};

export type DidCreateTalkResponse = {
  id: string;
  object: string;
  created_at: string;
  created_by: string;
  status: DidTalkStatus;
};

export type DidGetTalkResponse = {
  id: string;
  user_id: string;
  source_url: string;
  created_at: string;
  modified_at: string;
  status: DidTalkStatus;
  result_url?: string;
  started_at?: string;
  audio_url?: string;
};

export type DidJsonError = {
  kind: string;
  description: string;
};
