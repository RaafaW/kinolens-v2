import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

type FormVals = { email: string; password: string; remember: boolean };

export function useLogin() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormVals>({ defaultValues: { remember: true } });
  
  const [showPass, setShowPass] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { login, register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmitLogin = async (data: FormVals) => {
    setApiError(null);
    try {
      await login({ email: data.email, password: data.password });
      navigate("/chat");
    } catch (error: any) {
      setApiError(error.message || "Ocorreu um erro. Tente novamente.");
    }
  };
  
  const onSubmitRegister = async (data: FormVals) => {
    setApiError(null);
    try {
      await registerUser({ email: data.email, password: data.password });
      alert("Conta criada com sucesso! Agora você pode fazer o login.");
    } catch (error: any) {
      setApiError(error.message || "Ocorreu um erro ao criar a conta.");
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
    onSubmitLogin,
    onSubmitRegister,
  };
}