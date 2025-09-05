import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "../components/layout"; 

const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ChatPage = lazy(() => import("../pages/Chat"));

const AppLayout = () => {
  return (
    <Layout>
      <Outlet /> 
    </Layout>
  );
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">Carregando…</div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}