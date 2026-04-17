import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";

import { childPath } from "./utils";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={childPath("about")} element={<AboutPage />} />
        <Route path={childPath("projects")} element={<ProjectsPage />} />
        <Route path={childPath("contact")} element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
