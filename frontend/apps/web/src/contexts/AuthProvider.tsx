import React, { useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser } from '../services/auth.service';
import type { LoginCredentials, User } from '../types';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleAuthResponse = (data: { token: string; user: User }) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('authToken', data.token);
  };
  
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const data = await loginUser(credentials);
      handleAuthResponse(data);
    } catch (error) {
      console.error("Falha no login", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const data = await registerUser(credentials);
      handleAuthResponse(data);
    } catch (error) {
      console.error("Falha no registro", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};