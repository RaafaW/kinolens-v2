import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Carregando…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}