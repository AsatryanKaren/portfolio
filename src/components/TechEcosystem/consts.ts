import type { TechCard } from "./types";

export const SECTION_EYEBROW = "Inventory";

export const SECTION_TITLE = "Technical ecosystem";

export const TECH_CARDS: readonly TechCard[] = [
  {
    id: "languages",
    eyebrow: "Languages & frameworks",
    title: "Core stack",
    presentation: "tags",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
    ],
  },
  {
    id: "tools",
    eyebrow: "Tools & infrastructure",
    title: "Delivery",
    presentation: "tags",
    items: ["Git", "ElasticSearch", "Kibana", "Twilio", "Strapi", "Contentful"],
  },
  {
    id: "data",
    eyebrow: "Databases & testing",
    title: "Persistence & quality",
    presentation: "bullets",
    items: ["MongoDB / PostgreSQL", "Jest / React Testing Library"],
  },
  {
    id: "state",
    eyebrow: "State & UI",
    title: "Interaction layer",
    presentation: "bullets",
    items: ["Redux / Context API", "Tailwind / Material UI / SASS"],
  },
];
