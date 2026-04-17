import { Outlet } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

import { MAIN_LANDMARK_ID } from "./consts";
import styles from "./styles.module.css";
import { joinLayoutClasses } from "./utils";

export function MainLayout() {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main
        id={MAIN_LANDMARK_ID}
        className={joinLayoutClasses(styles.main)}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
