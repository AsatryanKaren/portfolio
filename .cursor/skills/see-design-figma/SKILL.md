---
name: see-design-figma
description: >-
  Connects the Figma MCP to read a frame or component, summarize design context, then suggest and (on request) implement code in this repo. Use when the user says **See design**, **see the design**, asks to read or summarize a Figma design, or pastes a figma.com link for design-to-code. Triggers also include "Figma context", "what does this design show", and "implement from Figma" after sharing a link.
---

# See design (Figma MCP)

Use this workflow whenever the user invokes **See design** (or equivalent) and points at a Figma file, or when they share a Figma URL and want context plus implementation guidance.

## Prerequisites

- **Figma MCP** is enabled in Cursor; the agent has access to the official Figma server tools (e.g. `get_design_context`, `get_screenshot`, `get_metadata`).
- The user must provide a **Figma URL** (or `fileKey` + `nodeId`). If they only say "See design" without a link, ask for the link or the file key and node id.

## 1. Read the design (MCP)

1. **Read the tool schema** for the Figma MCP tool you will call (required parameters, optional flags) before invoking it.
2. **Parse the URL** (if a URL was given):
   - `figma.com/design/:fileKey/...?node-id=1-2` → `nodeId` is `1:2` (replace `-` between the two numbers with `:`).
   - `figma.com/design/:fileKey/branch/:branchKey/...` → use **branchKey** as `fileKey`.
   - `figma.com/make/:makeFileKey/...` → use `makeFileKey` as the file key (Figma Make).
3. **Primary read**: call **`get_design_context`** with `fileKey` and `nodeId`. It returns reference code, asset URLs, and usually a **screenshot**—keep the screenshot for layout and visual fidelity unless the user asked to drop it.
4. Set `clientLanguages` and `clientFrameworks` to match this project when the tool asks (e.g. `typescript` and `react` for this Vite/React codebase) or `unknown` if unclear.
5. **Optional**: `get_screenshot` if a fresh image is needed; `get_metadata` if the user needs structure/names only before a heavy pull.

**Interpretation rule:** `get_design_context` output is **reference material**, not drop-in code. Adapt naming, structure, and libraries to this repository (see [§4](#4-suggest-implementation)).

## 2. Summarize context for the user

After the MCP response, give a **short, structured summary** the user can scan in under a minute:

1. **What it is** — screen/section name, purpose, main regions (header, list, CTA, etc.).
2. **Layout** — hierarchy, spacing feel, grid or stacks, responsive hints if obvious from the frame.
3. **UI building blocks** — repeated components, tables, forms, modals, icons, imagery.
4. **Content & states** — titles, labels, empty/error/success if visible; locale or brand notes if relevant.
5. **Visual tokens** — primary emphasis, text styles, surfaces, key colors (map to this app’s theme/tokens, not only raw hex).
6. **Open questions** — only what would block a faithful implementation (missing states, target breakpoint, real copy).

Use bullet lists; avoid pasting long generated code into the summary unless the user asks for the raw output.

## 3. Suggest implementation

1. Propose a **concrete plan**: files or components to add/change, Ant Design building blocks that fit, and any shared tokens or layout primitives already in the repo.
2. Call out **fidelity** explicitly: what can match 1:1, what will be approximate, and what needs product/design sign-off.
3. If the task is **strict visual parity** from Figma, load the **`figma-implement-design` skill** (if available) and follow its project conventions for 1:1 work.
4. Reuse **existing** components, routes, and CSS-module patterns; do not introduce one-off inline styles if project rules forbid them.

## 4. Implement (when the user wants code)

- Proceed to implementation in the same thread if the user asked to **implement** or **apply** the design.
- **Map** the MCP reference to this stack: **React**, **TypeScript**, **Ant Design 5**, **CSS Modules**, no `style={{}}` except where the project already allows; respect `AppThemeProvider` / `ConfigProvider`.
- **Keep the diff focused** on the feature; avoid unrelated refactors.
- After substantive edits, run **`npm run lint`** and fix new issues in touched files.

## Quick reference — URL to MCP args

| URL segment | Use as |
|------------|--------|
| Path `.../design/ABC123/...` | `fileKey` = `ABC123` |
| Branch URL `.../branch/XYZ/...` | `fileKey` = `XYZ` (branch key) |
| Query `node-id=12-34` | `nodeId` = `12:34` |

## Related skills

- **`figma-use`**: required before **`use_figma`** (Plugin API / canvas writes). "See design" is usually **read-only** via `get_design_context`, not `use_figma`.
- **`figma-implement-design`**: full Figma-to-code implementation workflow when fidelity and component mapping are the main goal.
