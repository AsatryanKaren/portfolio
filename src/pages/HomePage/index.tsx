import { DemoTimer } from "@/components/DemoTimer";
import { EducationCard } from "@/components/EducationCard";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { LanguagesCard } from "@/components/LanguagesCard";
import { TechEcosystem } from "@/components/TechEcosystem";

import styles from "./styles.module.css";
import { homeScreenReaderSummary } from "./utils";

export function HomePage() {
  return (
    <div className={styles.page}>
      <p className={styles.srOnly}>{homeScreenReaderSummary()}</p>
      <Hero />
      <DemoTimer />
      <ExperienceSection />
      <div className={styles.lower}>
        <TechEcosystem />
        <aside className={styles.side}>
          <EducationCard />
          <LanguagesCard />
        </aside>
      </div>
    </div>
  );
}
