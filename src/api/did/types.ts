export type DidTalkStatus =
  | "created"
  | "started"
  | "done"
  | "error"
  | "rejected";

export type DidTextScript = {
  type: "text";
  input: string;
  subtitles?: boolean;
  ssml?: boolean;
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
