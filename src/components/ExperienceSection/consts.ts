import type { ExperienceItem } from "./types";

export const SECTION_EYEBROW = "Trajectory";

export const SECTION_TITLE = "Experience";

export const SECTION_CAPTION =
  "A chronicle of engineering challenges and architectural solutions.";

export const EXPERIENCES: readonly ExperienceItem[] = [
  {
    id: "freelance",
    roleLabel: "Frontend developer",
    company: "Freelance",
    period: "Sep 2025 — Present",
    modality: "Full-time · Remote",
    description:
      "Shipping performant marketing sites and dashboards with React, TypeScript, and modern build pipelines. Partnering with teams on accessibility reviews, bundle budgets, and pragmatic design systems.",
    watermark: "global",
  },
  {
    id: "product",
    roleLabel: "Software engineer",
    company: "Product studio",
    period: "Jan 2023 — Aug 2025",
    modality: "Full-time · Hybrid",
    description:
      "Led feature delivery across web clients, integrating REST and real-time channels, improving observability, and mentoring peers on testing strategy with Jest and React Testing Library.",
    watermark: "code",
  },
];
