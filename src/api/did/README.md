# D-ID talks (image → video)

Short guide for how this app creates a talk and reads the finished video. Official reference: [Create talk](https://docs.d-id.com/reference/createtalk), [Get talk](https://docs.d-id.com/reference/gettalk).

## Setup

1. Create an API key in [D-ID Studio](https://studio.d-id.com/).
2. In `.env.local` (not committed), set:

   `VITE_DID_API_KEY=<your key>`

   See `.env.example` for the variable name.

## What the API expects

- **`source_url`** — Public URL to a portrait image (`.jpg`, `.jpeg`, or `.png`). Must be reachable by D-ID’s servers (`https://` or `s3://`).
- **`script`** — For text-driven audio, send `{ "type": "text", "input": "…" }` with at least 3 characters. Default TTS provider is Microsoft unless you configure another in the full API.

## Flow in this codebase

1. **`createTalk(body)`** — `POST /talks`. Returns `{ id, status, … }`. The job is asynchronous; `status` is usually `created` or `started` at first.
2. **`getTalk(id)`** — `GET /talks/{id}`. Read `status` and, when finished successfully, **`result_url`** (video).
3. **`pollTalkUntilTerminal(id, options?)`** — Calls `getTalk` on an interval until `status` is `done`, or throws if it becomes `error` / `rejected`, or times out. On success, the returned object includes **`result_url`** for playback or download.

Auth for all calls: **HTTP Basic**, username = API key, password empty (see D-ID docs). With **axios**, use `auth: { username: apiKey, password: "" }` so the client sets the `Authorization` header for you.

## Example calls with axios

```ts
import axios from "axios";

const apiKey = "YOUR_API_KEY"; // e.g. from process.env on a server

const didAuth = { username: apiKey, password: "" } as const;

// 1) Create a talk — 201 response with id + initial status (often "created")
const { data: created } = await axios.post<{
  id: string;
  status: string;
}>(
  "https://api.d-id.com/talks",
  {
    source_url:
      "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg",
    script: {
      type: "text",
      input: "Hello, this is a short line for the avatar to speak.",
    },
  },
  {
    auth: didAuth,
    headers: { "Content-Type": "application/json" },
  },
);
// created.id, created.status

// 2) Get talk — call again on an interval until status is "done" (or "error" / "rejected")
const { data: talk } = await axios.get<{
  id: string;
  status: string;
  result_url?: string;
}>(`https://api.d-id.com/talks/${encodeURIComponent(created.id)}`, {
  auth: didAuth,
});

// When talk.status === "done", use talk.result_url for the video
```

Example shape of the **create** response body (fields may vary):

```json
{
  "id": "tlk_xxxxxxxx",
  "object": "talk",
  "created_at": "2020-09-03T13:56:54.995",
  "created_by": "123",
  "status": "created"
}
```

While the job runs, **get** responses usually have `status` of `created` or `started`; when finished successfully they include **`result_url`**.

## Same flow via this repo’s helpers

`src/api/did/index.ts` wraps the same axios pattern (including reading `VITE_DID_API_KEY`):

```ts
import { createTalk, pollTalkUntilTerminal } from "@/api/did";

const { id } = await createTalk({
  source_url: "https://example.com/face.png",
  script: { type: "text", input: "Hello from D-ID." },
});

const talk = await pollTalkUntilTerminal(id);
// talk.status === "done" → talk.result_url
```

## UI demo

Run the app and open **`/did`** (“D-ID talk” in the header): enter image URL + script, submit, wait for polling to finish, then the page shows the video using `result_url`.

## Notes

- The Vite key is **public to the browser**—only for local demos; production should call D-ID from your backend.
- If the browser shows a **CORS** error to `api.d-id.com`, use a server-side proxy instead of calling the API directly from the page.
