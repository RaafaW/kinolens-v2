import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // 1. Importe o protetor de rotas

const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const ChatPage = lazy(() => import("../pages/Chat"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Carregando…</div>}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 3. Rota Protegida */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* Rota para qualquer outro caminho não encontrado */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}