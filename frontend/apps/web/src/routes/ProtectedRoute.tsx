import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Se o estado de autenticação ainda está sendo carregado (ex: lendo do localStorage),
  // é uma boa prática não renderizar nada para evitar um "flash" da página de login.
  if (isLoading) {
    return null; // ou um componente de Spinner/Loading
  }

  // Se não estiver autenticado, redireciona para a página de login.
  if (!isAuthenticated) {
    // O `state={{ from: location }}` é um bônus: ele guarda a página que o usuário
    // tentou acessar, para que possamos redirecioná-lo de volta para lá após o login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver autenticado, renderiza o componente filho (a página protegida).
  return <>{children}</>;
};

export default ProtectedRoute;