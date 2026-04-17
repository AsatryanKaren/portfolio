export type ExperienceWatermark = "global" | "code";

export type ExperienceItem = {
  readonly id: string;
  readonly roleLabel: string;
  readonly company: string;
  readonly period: string;
  readonly modality: string;
  readonly description: string;
  readonly watermark: ExperienceWatermark;
};
