import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { RegisterCredentials } from '../types';

export const useRegister = () => {
  const [showPass, setShowPass] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>();

  const onSubmitRegister = async (data: RegisterCredentials) => {
    setApiError(null);
    try {
      await registerUser(data);
      navigate('/chat');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao criar conta. Tente novamente.";
      setApiError(errorMessage);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPass,
    setShowPass,
    apiError,
    isLoading,
    onSubmitRegister,
  };
};