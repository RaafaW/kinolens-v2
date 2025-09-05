import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ChatPage = lazy(() => import("../pages/Chat"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">Carregando…</div>}>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* 2. Adicione a rota aqui */}

        {/* Rota Protegida */}
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