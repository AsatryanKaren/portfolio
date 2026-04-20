import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { GeminiPage } from "@/pages/GeminiPage";
import { HomePage } from "@/pages/HomePage";

import { childPath } from "./utils";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={childPath("gemini")} element={<GeminiPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
