import { CodeOutlined, GlobalOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

import type { ExperienceWatermark } from "./types";

export function watermarkIcon(kind: ExperienceWatermark): ReactNode {
  return kind === "global" ? <GlobalOutlined /> : <CodeOutlined />;
}
